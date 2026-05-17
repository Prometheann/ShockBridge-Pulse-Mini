import crypto from "crypto";

const SECRET = process.env.TOKEN_SECRET;
if (!SECRET) throw new Error("TOKEN_SECRET env var is not set");

export interface UsageToken {
  code: string;
  plan: "basic" | "creator";
  memosUsed: number;
  memosTotal: number;
}

export function signToken(payload: UsageToken): string {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
  return `${data}.${sig}`;
}

export function verifyToken(token: string): UsageToken | null {
  try {
    const dot = token.lastIndexOf(".");
    if (dot === -1) return null;
    const data = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    const expected = crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
    if (sig !== expected) return null;
    return JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as UsageToken;
  } catch {
    return null;
  }
}
