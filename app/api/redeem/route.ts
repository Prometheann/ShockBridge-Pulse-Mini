import { NextRequest, NextResponse } from "next/server";
import { initCode } from "@/lib/usage";

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
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

    // Server-side usage — reads real remaining count from Redis
    const { memosRemaining, memosTotal } = await initCode(normalized, plan);

    const message =
      plan === "creator"
        ? memosRemaining < memosTotal
          ? `Creator plan — ${memosRemaining} memo${memosRemaining !== 1 ? "s" : ""} remaining.`
          : "Creator plan unlocked! 15 memos + X post + LinkedIn post + PDF export."
        : memosRemaining < memosTotal
          ? `Basic plan — ${memosRemaining} memo${memosRemaining !== 1 ? "s" : ""} remaining.`
          : "Basic plan unlocked! 5 memos.";

    return NextResponse.json({ valid: true, plan, memosRemaining, memosTotal, message });
  } catch (err) {
    console.error("[/api/redeem]", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
