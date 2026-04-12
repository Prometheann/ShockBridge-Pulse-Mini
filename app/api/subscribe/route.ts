import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";

const redis = Redis.fromEnv();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const normalised = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalised)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }

    // Store in Redis set — no duplicates
    const added = await redis.sadd("research_subscribers", normalised);

    // Store signup timestamp
    await redis.hset("research_subscriber_dates", {
      [normalised]: new Date().toISOString(),
    });

    // Send confirmation email (only for new subscribers)
    if (added > 0) {
      await resend.emails.send({
        from: "Rodolfo Pereira <research@shockbridgepulse.com>",
        to: normalised,
        subject: "You're on the list — From Spot to Stress",
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; background: #ffffff; color: #1a1a2e;">
            <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #f59e0b; margin: 0 0 24px 0;">
              ShockBridge Pulse · Research
            </p>
            <h1 style="font-size: 22px; font-weight: 700; margin: 0 0 8px 0; color: #0f172a; line-height: 1.3;">
              From Spot to Stress
            </h1>
            <p style="font-size: 13px; color: #6b7280; font-style: italic; margin: 0 0 28px 0;">
              Multiscale Contagion in High-Dimensional Brazilian Equities with Airy Wavelets and Option-Implied Signals
            </p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 0 0 28px 0;" />
            <p style="font-size: 15px; color: #374151; line-height: 1.7; margin: 0 0 16px 0;">
              You're on the list.
            </p>
            <p style="font-size: 15px; color: #374151; line-height: 1.7; margin: 0 0 28px 0;">
              I'll send you one email when the working paper is released — no newsletter, no recurring updates. Just a notification when it's done.
            </p>
            <a href="https://shockbridgepulse.com/research/from-spot-to-stress"
               style="display: inline-block; padding: 12px 20px; background: #f59e0b; color: #0a0f1e; font-size: 13px; font-weight: 700; text-decoration: none; border-radius: 8px;">
              View the Research Note
            </a>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 36px 0 20px 0;" />
            <p style="font-size: 11px; color: #9ca3af; line-height: 1.6; margin: 0;">
              ShockBridge Pulse · shockbridgepulse.com<br />
              Research and writing tool only. Not financial advice.
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
