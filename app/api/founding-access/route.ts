import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";

const redis = Redis.fromEnv();
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const normalised = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalised)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }

    // Store email in SET
    await redis.sadd("founding_access_applicants", normalised);

    // Store full application in HASH
    await redis.hset("founding_access_applications", {
      [normalised]: JSON.stringify({
        name: name?.trim() || "",
        email: normalised,
        message: message?.trim() || "",
        date: new Date().toISOString(),
      }),
    });

    // Notify Rodolfo
    await resend.emails.send({
      from: "ShockBridge Pulse <research@shockbridgepulse.com>",
      to: "research@shockbridgepulse.com",
      subject: `New Founding Access application: ${normalised}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #ffffff; color: #1a1a2e;">
          <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #f59e0b; margin: 0 0 16px 0;">
            ShockBridge Pulse · Founding Access
          </p>
          <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 16px 0; color: #0f172a;">
            New application
          </h2>
          <p style="font-size: 14px; color: #374151; margin: 0 0 8px 0;"><strong>Name:</strong> ${name?.trim() || "(not provided)"}</p>
          <p style="font-size: 14px; color: #374151; margin: 0 0 8px 0;"><strong>Email:</strong> ${normalised}</p>
          ${message?.trim() ? `<p style="font-size: 14px; color: #374151; margin: 0 0 8px 0;"><strong>Message:</strong> ${message.trim()}</p>` : ""}
          <p style="font-size: 12px; color: #9ca3af; margin: 24px 0 0 0;">${new Date().toISOString()}</p>
        </div>
      `,
    });

    // Confirmation to applicant
    await resend.emails.send({
      from: "Rodolfo Pereira <research@shockbridgepulse.com>",
      to: normalised,
      subject: "Founding Access: application received",
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; background: #ffffff; color: #1a1a2e;">
          <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #f59e0b; margin: 0 0 24px 0;">
            ShockBridge Pulse · Founding Access
          </p>
          <h1 style="font-size: 22px; font-weight: 700; margin: 0 0 16px 0; color: #0f172a; line-height: 1.3;">
            Application received${name?.trim() ? `, ${name.trim()}` : ""}.
          </h1>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 0 0 24px 0;" />
          <p style="font-size: 15px; color: #374151; line-height: 1.7; margin: 0 0 16px 0;">
            Thank you for applying for Founding Access.
          </p>
          <p style="font-size: 15px; color: #374151; line-height: 1.7; margin: 0 0 28px 0;">
            I'll review your application and be in touch directly. Founding Access is limited and I take each application seriously.
          </p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 0 0 20px 0;" />
          <p style="font-size: 11px; color: #9ca3af; line-height: 1.6; margin: 0;">
            ShockBridge Pulse · shockbridgepulse.com<br />
            Market-interpretation and research tool only. Not financial advice.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Founding access error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
