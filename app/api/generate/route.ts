import { NextRequest, NextResponse } from "next/server";
import { getOpenAIClient, FREE_SYSTEM_PROMPT, buildFreePrompt, BASIC_SYSTEM_PROMPT, buildBasicPrompt } from "@/lib/openai";
import { getAnthropicClient, CREATOR_SYSTEM_PROMPT, buildCreatorPrompt } from "@/lib/anthropic";
import { consumeMemo, checkAndConsumeFreeLimit } from "@/lib/usage";
import { MemoInput, MemoOutput } from "@/types/memo";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

function getIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

async function resolveServerPlan(code: string): Promise<"free" | "basic" | "creator"> {
  if (!code) return "free";
  const normalized = code.trim().toUpperCase();

  // Check Redis first — production codes have their plan stored here
  const redisPlan = await redis.get<string>(`sbp:plan:${normalized}`);
  if (redisPlan === "basic" || redisPlan === "creator") return redisPlan;

  // Fallback: env var lists (manual/emergency codes)
  const basicCodes = (process.env.BASIC_CODES || "").split(",").map(c => c.trim().toUpperCase()).filter(Boolean);
  const creatorCodes = (process.env.CREATOR_CODES || "").split(",").map(c => c.trim().toUpperCase()).filter(Boolean);
  if (creatorCodes.includes(normalized)) return "creator";
  if (basicCodes.includes(normalized)) return "basic";
  return "free";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { input, code } = body as { input: MemoInput; code?: string };

    if (!input?.eventType || !input?.region || !input?.sectorAsset || !input?.horizon || !input?.tone) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (
      input.eventType.length > 300 ||
      input.region.length > 100 ||
      input.sectorAsset.length > 100
    ) {
      return NextResponse.json({ error: "Input too long." }, { status: 400 });
    }

    // Derive plan server-side — never trust client
    const safePlan = await resolveServerPlan(code ?? "");
    const isPaid = safePlan === "basic" || safePlan === "creator";

    // Paid plans: enforce quota via Redis
    let memosRemaining: number | undefined;
    if (isPaid) {
      const normalizedCode = (code ?? "").trim().toUpperCase();
      const { allowed, memosRemaining: remaining } = await consumeMemo(normalizedCode);
      if (!allowed) {
        return NextResponse.json(
          { error: "All briefs used. Enter your code to check remaining balance.", code: "QUOTA_EXCEEDED" },
          { status: 403 }
        );
      }
      memosRemaining = remaining;
    }

    // Free plan: IP-based rate limit (3 briefs per IP per 24h) — covers shared home networks
    if (!isPaid) {
      const ip = getIP(request);
      const allowed = await checkAndConsumeFreeLimit(ip);
      if (!allowed) {
        return NextResponse.json(
          { error: "Free demo limit reached. Purchase a plan to generate more briefs.", code: "RATE_LIMIT" },
          { status: 429 }
        );
      }
    }

    let content: string | null = null;

    if (safePlan === "creator") {
      const anthropic = getAnthropicClient();
      const response = await anthropic.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 16000,
        system: CREATOR_SYSTEM_PROMPT,
        messages: [{ role: "user", content: buildCreatorPrompt(input) }],
      });
      content = (response.content[0] as { type: string; text: string }).text;
    } else if (safePlan === "basic") {
      const openai = getOpenAIClient();
      const response = await openai.chat.completions.create({
        model: "gpt-4.1",
        messages: [
          { role: "system", content: BASIC_SYSTEM_PROMPT },
          { role: "user", content: buildBasicPrompt(input) },
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 2000,
      });
      content = response.choices[0]?.message?.content ?? null;
    } else {
      const openai = getOpenAIClient();
      const response = await openai.chat.completions.create({
        model: "gpt-4.1",
        messages: [
          { role: "system", content: FREE_SYSTEM_PROMPT },
          { role: "user", content: buildFreePrompt(input) },
        ],
        response_format: { type: "json_object" },
        temperature: 0.6,
        max_tokens: 800,
      });
      content = response.choices[0]?.message?.content ?? null;
    }

    if (!content) throw new Error("Empty response from model");

    const jsonStart = content.indexOf("{");
    const jsonEnd = content.lastIndexOf("}");
    if (jsonStart === -1 || jsonEnd === -1) {
      console.error("[/api/generate] No JSON found. Content:", content.slice(0, 300));
      throw new Error("Model returned no JSON");
    }
    let memo: MemoOutput;
    try {
      memo = JSON.parse(content.slice(jsonStart, jsonEnd + 1)) as MemoOutput;
    } catch {
      console.error("[/api/generate] JSON parse failed. Content length:", content.length, "Last 200 chars:", content.slice(-200));
      throw new Error("Model returned invalid JSON");
    }

    return NextResponse.json({ memo, memosRemaining });
  } catch (err) {
    console.error("[/api/generate]", err);
    return NextResponse.json(
      { error: "Failed to generate brief. Please try again." },
      { status: 500 }
    );
  }
}
