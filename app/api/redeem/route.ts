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

    // Reject fully-exhausted codes
    if (memosRemaining === 0) {
      return NextResponse.json(
        { valid: false, error: "This code has been fully used. All briefs have been consumed." },
        { status: 400 }
      );
    }

    const planLabel = plan === "creator" ? "Analyst" : "Bridge";
    const message =
      memosRemaining < memosTotal
        ? `${planLabel} plan — ${memosRemaining} brief${memosRemaining !== 1 ? "s" : ""} remaining.`
        : plan === "creator"
          ? "Analyst plan unlocked! 15 Intelligence Briefs available."
          : "Bridge plan unlocked! 4 Intelligence Briefs available.";

    return NextResponse.json({ valid: true, plan, memosRemaining, memosTotal, message });
  } catch (err) {
    console.error("[/api/redeem]", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
