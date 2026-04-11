import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";

const redis = Redis.fromEnv();
const resend = new Resend(process.env.RESEND_API_KEY);

const STAGES = [
  "Stage 1 — Conceptual framework locked",
  "Stage 2 — Data construction complete",
  "Stage 3 — First empirical results in",
  "Stage 4 — Monte Carlo calibration done",
  "Stage 5 — Paper draft complete",
];

export async function POST(req: NextRequest) {
  try {
    const { secret, stage, message } = await req.json();

    // Auth check
    if (!secret || secret !== process.env.RESEARCH_UPDATE_SECRET) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    if (!stage || !message) {
      return NextResponse.json({ error: "Stage and message are required." }, { status: 400 });
    }

    // Fetch all subscribers from Redis
    const subscribers = await redis.smembers("research_subscribers");

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ ok: true, sent: 0, message: "No subscribers yet." });
    }

    const stageLabel = STAGES[Number(stage) - 1] || stage;
    const isFinal = Number(stage) === 5;

    // Send to all subscribers in batches of 50 (Resend limit)
    const batchSize = 50;
    let totalSent = 0;

    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);

      await Promise.all(
        batch.map((email) =>
          resend.emails.send({
            from: "Rodolfo Pereira <research@shockbridgepulse.com>",
            to: email,
            subject: `Research update: ${stageLabel}`,
            html: `
              <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; background: #ffffff; color: #0f172a;">
                <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #f59e0b; margin: 0 0 24px 0;">
                  ShockBridge Pulse · Research Update
                </p>

                <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #6b7280; margin: 0 0 6px 0;">
                  ${stageLabel}
                </p>

                <h1 style="font-size: 22px; font-weight: 700; margin: 0 0 8px 0; color: #0f172a; line-height: 1.3;">
                  From Spot to Stress
                </h1>
                <p style="font-size: 13px; color: #6b7280; font-style: italic; margin: 0 0 28px 0;">
                  Multiscale Contagion in High-Dimensional Brazilian Equities
                </p>

                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 0 0 28px 0;" />

                <p style="font-size: 15px; color: #374151; line-height: 1.75; margin: 0 0 28px 0; white-space: pre-line;">
                  ${message}
                </p>

                ${isFinal ? `
                <a href="https://shockbridgepulse.com/research/from-spot-to-stress"
                   style="display: inline-block; padding: 12px 20px; background: #f59e0b; color: #0a0f1e; font-size: 13px; font-weight: 700; text-decoration: none; border-radius: 8px; margin-bottom: 28px;">
                  Read the Paper
                </a>
                ` : `
                <a href="https://shockbridgepulse.com/research/from-spot-to-stress"
                   style="display: inline-block; padding: 12px 20px; background: #0f172a; color: #ffffff; font-size: 13px; font-weight: 700; text-decoration: none; border-radius: 8px; margin-bottom: 28px;">
                  Follow the Research
                </a>
                `}

                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 28px 0 20px 0;" />
                <p style="font-size: 11px; color: #9ca3af; line-height: 1.6; margin: 0;">
                  ShockBridge Pulse · shockbridgepulse.com<br />
                  You subscribed to research updates on From Spot to Stress.<br />
                  Research and writing tool only. Not financial advice.
                </p>
              </div>
            `,
          })
        )
      );

      totalSent += batch.length;
    }

    // Log the update in Redis for your own records
    await redis.lpush("research_update_log", JSON.stringify({
      stage: stageLabel,
      message,
      sentTo: totalSent,
      sentAt: new Date().toISOString(),
    }));

    return NextResponse.json({ ok: true, sent: totalSent });
  } catch (err) {
    console.error("Research update error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
