import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const ADMIN_SECRET = process.env.RESEARCH_UPDATE_SECRET ?? "";

export async function POST(req: NextRequest) {
  try {
    const { secret, code, amount, action } = await req.json();

    if (!secret || secret !== ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const normalized = (code ?? "").trim().toUpperCase();
    if (!normalized) {
      return NextResponse.json({ error: "Code is required." }, { status: 400 });
    }

    // Verify code exists in Redis
    const plan = await redis.get<string>(`sbp:plan:${normalized}`);
    if (!plan) {
      return NextResponse.json(
        { error: `Code "${normalized}" not found. Check the code and try again.` },
        { status: 404 }
      );
    }

    const used  = (await redis.get<number>(`sbp:used:${normalized}`))  ?? 0;
    const total = (await redis.get<number>(`sbp:total:${normalized}`)) ?? 0;

    // Check-only — no mutation
    if (action === "check") {
      return NextResponse.json({
        code: normalized,
        plan,
        total,
        used,
        remaining: Math.max(0, total - used),
      });
    }

    // Top-up — clamp between 1 and 20
    const add = Math.max(1, Math.min(20, parseInt(amount) || 4));
    const newTotal = await redis.incrby(`sbp:total:${normalized}`, add);

    return NextResponse.json({
      code: normalized,
      plan,
      added: add,
      newTotal,
      used,
      newRemaining: Math.max(0, newTotal - used),
    });

  } catch {
    return NextResponse.json({ error: "Server error. Try again." }, { status: 500 });
  }
}
