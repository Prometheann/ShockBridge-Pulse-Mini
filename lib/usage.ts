import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const PLAN_MEMOS: Record<string, number> = { basic: 5, creator: 15 };

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
