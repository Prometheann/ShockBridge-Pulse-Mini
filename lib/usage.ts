import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export const PLAN_MEMOS: Record<string, number> = { basic: 4, creator: 15 };

const FREE_WINDOW_SECONDS = 24 * 60 * 60; // 24 hours

const FREE_IP_LIMIT = 3; // briefs per IP per 24h window

/**
 * Redis-based free-tier rate limiter.
 * Allows up to FREE_IP_LIMIT briefs per IP per 24-hour window.
 * Returns true if the request is allowed.
 */
export async function checkAndConsumeFreeLimit(ip: string): Promise<boolean> {
  const key = `sbp:free:ip:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) {
    // First use — set TTL for the window
    await redis.expire(key, FREE_WINDOW_SECONDS);
  }
  return count <= FREE_IP_LIMIT;
}

/**
 * Called on code redemption.
 * Sets total only on first redemption (NX). Returns current remaining.
 */
export async function initCode(
  code: string,
  plan: "basic" | "creator"
): Promise<{ memosRemaining: number; memosTotal: number }> {
  const total = PLAN_MEMOS[plan];
  // Only write total/plan if this code has never been redeemed
  await redis.set(`sbp:total:${code}`, total, { nx: true });
  await redis.set(`sbp:plan:${code}`, plan, { nx: true });
  const used = (await redis.get<number>(`sbp:used:${code}`)) ?? 0;
  return { memosRemaining: Math.max(0, total - used), memosTotal: total };
}

/**
 * Called before each generation.
 * Atomically increments usage and returns whether generation is allowed.
 */
export async function consumeMemo(
  code: string
): Promise<{ allowed: boolean; memosRemaining: number }> {
  const total = await redis.get<number>(`sbp:total:${code}`);

  if (!total) {
    // Code was never redeemed through the proper flow
    return { allowed: false, memosRemaining: 0 };
  }

  const newUsed = await redis.incr(`sbp:used:${code}`);

  if (newUsed > total) {
    // Over limit — roll back
    await redis.decr(`sbp:used:${code}`);
    return { allowed: false, memosRemaining: 0 };
  }

  return { allowed: true, memosRemaining: total - newUsed };
}
