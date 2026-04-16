/**
 * One-time test endpoint — simulates a Bridge or Analyst purchase
 * and sends the code email to the provided address.
 *
 * Protected by RESEARCH_UPDATE_SECRET.
 *
 * Usage:
 *   POST /api/admin/test-webhook
 *   { "secret": "sbp-research-2026", "plan": "bridge", "email": "you@example.com", "name": "Rodolfo" }
 *
 * DELETE THIS FILE before going to full production.
 */

import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const resend = new Resend(process.env.RESEND_API_KEY!);

type Plan = "bridge" | "analyst";

const PLAN_META = {
  bridge:  { pool: "sbp:pool:bridge",  internalPlan: "basic",   label: "Bridge",  memos: 5  },
  analyst: { pool: "sbp:pool:analyst", internalPlan: "creator", label: "Analyst", memos: 15 },
};

export async function POST(request: NextRequest) {
  const { secret, plan, email, name } = await request.json();

  if (secret !== process.env.RESEARCH_UPDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!PLAN_META[plan as Plan]) {
    return NextResponse.json({ error: "plan must be 'bridge' or 'analyst'" }, { status: 400 });
  }

  const meta = PLAN_META[plan as Plan];
  const firstName = (name || "there").split(" ")[0];

  // Pop a code from Redis pool
  const code = await redis.lpop<string>(meta.pool);
  if (!code) {
    return NextResponse.json({ error: "Pool empty — run seed-codes.mjs" }, { status: 500 });
  }

  // Register code in Redis
  await redis.set(`sbp:total:${code}`, meta.memos, { nx: true });
  await redis.set(`sbp:plan:${code}`, meta.internalPlan, { nx: true });

  // Send email
  await resend.emails.send({
    from: "ShockBridge Pulse <research@shockbridgepulse.com>",
    to: email,
    subject: `[TEST] Your ShockBridge Pulse ${meta.label} access code`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 520px; margin: 0 auto; background: #0f1117; color: #f0f0f0; padding: 40px 32px; border-radius: 12px;">
        <p style="color: #f59e0b; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 24px;">ShockBridge Pulse — TEST EMAIL</p>

        <h1 style="font-size: 22px; font-weight: 700; margin: 0 0 8px; color: #f0f0f0;">
          Your ${meta.label} plan is ready.
        </h1>

        <p style="color: #9ca3af; font-size: 15px; margin: 0 0 32px; line-height: 1.6;">
          Hi ${firstName}, your payment was confirmed. Here is your access code:
        </p>

        <div style="background: #1a1d27; border: 1px solid #f59e0b33; border-radius: 10px; padding: 20px 24px; text-align: center; margin-bottom: 32px;">
          <p style="margin: 0 0 6px; font-size: 11px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.12em;">Access code</p>
          <p style="margin: 0; font-size: 22px; font-weight: 700; color: #f59e0b; letter-spacing: 0.08em;">${code}</p>
        </div>

        <p style="color: #9ca3af; font-size: 14px; margin: 0 0 8px; line-height: 1.6;">To use it:</p>
        <ol style="color: #9ca3af; font-size: 14px; margin: 0 0 32px; padding-left: 20px; line-height: 1.8;">
          <li>Go to <a href="https://shockbridgepulse.com/generate" style="color: #f59e0b;">shockbridgepulse.com/generate</a></li>
          <li>Click <strong style="color: #f0f0f0;">Redeem a code</strong></li>
          <li>Enter the code above and click <strong style="color: #f0f0f0;">Redeem</strong></li>
        </ol>

        <div style="border-top: 1px solid #2d3148; padding-top: 24px;">
          <p style="color: #6b7280; font-size: 12px; margin: 0; line-height: 1.6;">
            Your code gives you <strong style="color: #9ca3af;">${meta.memos} memos</strong> on the ${meta.label} plan.
            Keep this email. Questions? <a href="mailto:help@shockbridgepulse.com" style="color: #f59e0b;">help@shockbridgepulse.com</a>
          </p>
        </div>
      </div>
    `,
  });

  const remaining = await redis.llen(meta.pool);

  return NextResponse.json({
    success: true,
    code,
    plan: meta.label,
    emailSentTo: email,
    poolRemaining: remaining,
  });
}
