import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
    if (!code || typeof code !== "string") {
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

    if (creatorCodes.includes(normalized)) {
      return NextResponse.json({
        valid: true,
        plan: "creator",
        message: "Creator plan unlocked! 20 memos + X post + LinkedIn post + PDF export.",
      });
    }

    if (basicCodes.includes(normalized)) {
      return NextResponse.json({
        valid: true,
        plan: "basic",
        message: "Basic plan unlocked! 5 memos.",
      });
    }

    return NextResponse.json({ valid: false, error: "Invalid code." }, { status: 400 });
  } catch (err) {
    console.error("[/api/redeem]", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
