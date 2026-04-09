import { NextRequest, NextResponse } from "next/server";
import { getOpenAIClient, FREE_SYSTEM_PROMPT, buildFreePrompt, BASIC_SYSTEM_PROMPT, buildBasicPrompt } from "@/lib/openai";
import { getAnthropicClient, CREATOR_SYSTEM_PROMPT, buildCreatorPrompt } from "@/lib/anthropic";
import { MemoInput, MemoOutput } from "@/types/memo";

// Simple in-memory rate limiter (resets on server restart — fine for v1)
const freeUsage = new Map<string, { count: number; resetAt: number }>();

function checkFreeLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 24 * 60 * 60 * 1000;
  const rec = freeUsage.get(ip);
  if (!rec || now > rec.resetAt) {
    freeUsage.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (rec.count >= 1) return false;
  rec.count++;
  return true;
}

function getIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function resolveServerPlan(code: string): "free" | "basic" | "creator" {
  if (!code) return "free";
  const normalized = code.trim().toUpperCase();
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

    // Input length limits — prevent abuse / runaway token usage
    if (
      input.eventType.length > 300 ||
      input.region.length > 100 ||
      input.sectorAsset.length > 100
    ) {
      return NextResponse.json({ error: "Input too long." }, { status: 400 });
    }

    // Derive plan from code server-side — never trust client-sent plan
    const safePlan = resolveServerPlan(code ?? "");

    const isPaid = safePlan === "basic" || safePlan === "creator";

    if (!isPaid) {
      const ip = getIP(request);
      if (!checkFreeLimit(ip)) {
        return NextResponse.json(
          { error: "Free demo limit reached. Purchase a plan to generate more memos.", code: "RATE_LIMIT" },
          { status: 429 }
        );
      }
    }

    let content: string | null = null;

    if (safePlan === "creator") {
      // Creator → Claude Sonnet 4.6 — deep, publication-quality analysis
      const anthropic = getAnthropicClient();
      const response = await anthropic.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 8000,
        system: CREATOR_SYSTEM_PROMPT,
        messages: [{ role: "user", content: buildCreatorPrompt(input) }],
      });
      content = (response.content[0] as { type: string; text: string }).text;
    } else if (safePlan === "basic") {
      // Basic → GPT-4.1 — full structured memo
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
      // Free → GPT-4.1 — simple snapshot
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

    const memo = JSON.parse(content) as MemoOutput;
    return NextResponse.json({ memo });
  } catch (err) {
    console.error("[/api/generate]", err);
    return NextResponse.json(
      { error: "Failed to generate memo. Please try again." },
      { status: 500 }
    );
  }
}
