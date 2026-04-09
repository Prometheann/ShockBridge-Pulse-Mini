import { NextRequest, NextResponse } from "next/server";
import { signToken, verifyToken } from "@/lib/token";

const PLAN_MEMOS: Record<string, number> = { basic: 5, creator: 15 };

export async function POST(request: NextRequest) {
  try {
    const { code, token } = await request.json();
    if (!code || typeof code !== "string" || code.length > 100) {
      return NextResponse.json({ error: "Invalid code." }, { status: 400 });
    }

    const normalized = code.trim().toUpperCase();

    const basicCodes = (process.env.BASIC_CODES || "")
      .split(",")
      .map((c) => c.trim().toUpperCase())
      .filter(Boolean);

    const creatorCodes = (process.env.CREATOR_CODES || "")
      .split(",")
      .map((c) => c.trim().toUpperCase())
      .filter(Boolean);

    let plan: "basic" | "creator" | null = null;
    if (creatorCodes.includes(normalized)) plan = "creator";
    else if (basicCodes.includes(normalized)) plan = "basic";

    if (!plan) {
      return NextResponse.json({ valid: false, error: "Invalid code." }, { status: 400 });
    }

    const memosTotal = PLAN_MEMOS[plan];

    // If client sends a valid token for this same code, restore existing usage
    if (token && typeof token === "string") {
      const existing = verifyToken(token);
      if (existing && existing.code === normalized && existing.plan === plan) {
        const memosRemaining = Math.max(0, existing.memosTotal - existing.memosUsed);
        const message =
          plan === "creator"
            ? `Creator plan — ${memosRemaining} memo${memosRemaining !== 1 ? "s" : ""} remaining.`
            : `Basic plan — ${memosRemaining} memo${memosRemaining !== 1 ? "s" : ""} remaining.`;
        return NextResponse.json({
          valid: true,
          plan,
          memosRemaining,
          memosTotal: existing.memosTotal,
          token, // return same token unchanged
          message,
        });
      }
    }

    // New redemption — issue fresh token
    const newToken = signToken({ code: normalized, plan, memosUsed: 0, memosTotal });
    const message =
      plan === "creator"
        ? "Creator plan unlocked! 15 memos + X post + LinkedIn post + PDF export."
        : "Basic plan unlocked! 5 memos.";

    return NextResponse.json({
      valid: true,
      plan,
      memosRemaining: memosTotal,
      memosTotal,
      token: newToken,
      message,
    });
  } catch (err) {
    console.error("[/api/redeem]", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
