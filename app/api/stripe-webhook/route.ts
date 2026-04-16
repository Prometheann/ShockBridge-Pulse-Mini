import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";

// ── Clients ──────────────────────────────────────────────────────────────────
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const resend = new Resend(process.env.RESEND_API_KEY!);

// ── Product/Price → plan mapping ──────────────────────────────────────────────
type PlanMeta = { pool: string; internalPlan: "basic" | "creator"; label: string; memos: number };

const PRODUCT_PLAN: Record<string, PlanMeta> = {
  // by product ID
  [process.env.STRIPE_BRIDGE_PRODUCT_ID!]:  { pool: "sbp:pool:bridge",  internalPlan: "basic",   label: "Bridge",  memos: 5  },
  [process.env.STRIPE_ANALYST_PRODUCT_ID!]: { pool: "sbp:pool:analyst", internalPlan: "creator", label: "Analyst", memos: 15 },
  // by price ID (fallback)
  [process.env.STRIPE_BRIDGE_PRICE_ID!]:    { pool: "sbp:pool:bridge",  internalPlan: "basic",   label: "Bridge",  memos: 5  },
  [process.env.STRIPE_ANALYST_PRICE_ID!]:   { pool: "sbp:pool:analyst", internalPlan: "creator", label: "Analyst", memos: 15 },
};

// ── Required: raw body for Stripe signature verification ─────────────────────
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  // ── Verify webhook signature ──────────────────────────────────────────────
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("[stripe-webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // ── Only handle successful checkouts ─────────────────────────────────────
  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  try {
    // ── Get customer email ──────────────────────────────────────────────────
    const customerEmail = session.customer_details?.email ?? session.customer_email;
    const customerName  = session.customer_details?.name ?? "there";

    if (!customerEmail) {
      console.error("[stripe-webhook] No customer email in session:", session.id);
      return NextResponse.json({ error: "No customer email" }, { status: 400 });
    }

    // ── Identify product ────────────────────────────────────────────────────
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ["data.price.product"],
    });

    const lineItem  = lineItems.data[0];
    const productId = (lineItem?.price?.product as Stripe.Product)?.id;
    const priceId   = lineItem?.price?.id;
    const plan      = PRODUCT_PLAN[productId] ?? PRODUCT_PLAN[priceId ?? ""];

    if (!plan) {
      console.error("[stripe-webhook] Unknown product ID:", productId);
      // Still return 200 so Stripe doesn't retry
      return NextResponse.json({ received: true });
    }

    // ── Pop a code from Redis pool ──────────────────────────────────────────
    const code = await redis.lpop<string>(plan.pool);

    if (!code) {
      // Pool empty — alert owner immediately
      console.error(`[stripe-webhook] POOL EMPTY for plan: ${plan.label}`);
      await resend.emails.send({
        from: "ShockBridge Pulse <research@shockbridgepulse.com>",
        to:   "research@shockbridgepulse.com",
        subject: `⚠️ Code pool empty — ${plan.label} plan`,
        html: `
          <p>A customer just purchased the <strong>${plan.label}</strong> plan but the code pool is empty.</p>
          <p><strong>Customer email:</strong> ${customerEmail}</p>
          <p><strong>Session ID:</strong> ${session.id}</p>
          <p>Run <code>node scripts/seed-codes.mjs</code> immediately and manually send a code to the customer.</p>
        `,
      });
      return NextResponse.json({ error: "Code pool empty" }, { status: 500 });
    }

    // ── Register code in Redis tracking ────────────────────────────────────
    await redis.set(`sbp:total:${code}`, plan.memos, { nx: true });
    await redis.set(`sbp:plan:${code}`,  plan.internalPlan, { nx: true });

    // ── Send code to customer via Resend ────────────────────────────────────
    const firstName = customerName.split(" ")[0];

    await resend.emails.send({
      from: "ShockBridge Pulse <research@shockbridgepulse.com>",
      to:   customerEmail,
      subject: `Your ShockBridge Pulse ${plan.label} access code`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 520px; margin: 0 auto; background: #0f1117; color: #f0f0f0; padding: 40px 32px; border-radius: 12px;">
          <p style="color: #f59e0b; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 24px;">ShockBridge Pulse</p>

          <h1 style="font-size: 22px; font-weight: 700; margin: 0 0 8px; color: #f0f0f0;">
            Your ${plan.label} plan is ready.
          </h1>

          <p style="color: #9ca3af; font-size: 15px; margin: 0 0 32px; line-height: 1.6;">
            Hi ${firstName}, your payment was confirmed. Here is your access code:
          </p>

          <div style="background: #1a1d27; border: 1px solid #f59e0b33; border-radius: 10px; padding: 20px 24px; text-align: center; margin-bottom: 32px;">
            <p style="margin: 0 0 6px; font-size: 11px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.12em;">Access code</p>
            <p style="margin: 0; font-size: 22px; font-weight: 700; color: #f59e0b; letter-spacing: 0.08em;">${code}</p>
          </div>

          <p style="color: #9ca3af; font-size: 14px; margin: 0 0 8px; line-height: 1.6;">
            To use it:
          </p>
          <ol style="color: #9ca3af; font-size: 14px; margin: 0 0 32px; padding-left: 20px; line-height: 1.8;">
            <li>Go to <a href="https://shockbridgepulse.com/generate" style="color: #f59e0b;">shockbridgepulse.com/generate</a></li>
            <li>Click <strong style="color: #f0f0f0;">Redeem a code</strong></li>
            <li>Enter the code above and click <strong style="color: #f0f0f0;">Redeem</strong></li>
          </ol>

          <div style="border-top: 1px solid #2d3148; padding-top: 24px;">
            <p style="color: #6b7280; font-size: 12px; margin: 0; line-height: 1.6;">
              Your code gives you <strong style="color: #9ca3af;">${plan.memos} memos</strong> on the ${plan.label} plan.
              Memos are tracked server-side — they persist across devices and browser resets.<br><br>
              Keep this email. If you need help, reply here or contact
              <a href="mailto:help@shockbridgepulse.com" style="color: #f59e0b;">help@shockbridgepulse.com</a>.
            </p>
          </div>
        </div>
      `,
    });

    // ── Notify owner of sale ────────────────────────────────────────────────
    const remaining = await redis.llen(plan.pool);
    await resend.emails.send({
      from: "ShockBridge Pulse <research@shockbridgepulse.com>",
      to:   "research@shockbridgepulse.com",
      subject: `✅ New ${plan.label} sale — code sent`,
      html: `
        <p><strong>Plan:</strong> ${plan.label}</p>
        <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
        <p><strong>Code sent:</strong> ${code}</p>
        <p><strong>Pool remaining:</strong> ${remaining} codes</p>
        <p><strong>Session:</strong> ${session.id}</p>
      `,
    });

    console.log(`[stripe-webhook] ✓ ${plan.label} code sent to ${customerEmail} — ${remaining} left in pool`);
    return NextResponse.json({ received: true });

  } catch (err) {
    console.error("[stripe-webhook] Error processing event:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
