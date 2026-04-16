/**
 * Seed script — generates 1,000 Bridge codes and 1,000 Analyst codes
 * and loads them into Upstash Redis.
 *
 * Run once from the web/ directory:
 *   node scripts/seed-codes.mjs
 *
 * Safe to re-run — only adds NEW codes, never duplicates.
 */

import { createRequire } from "module";
import { randomBytes } from "crypto";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Load .env.local manually ────────────────────────────────────────────────
const envPath = resolve(__dirname, "../.env.local");
const envLines = readFileSync(envPath, "utf-8").split("\n");
for (const line of envLines) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) process.env[match[1].trim()] = match[2].trim().replace(/^"|"$/g, "");
}

const { Redis } = createRequire(import.meta.url)("@upstash/redis");

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

// ── Code generator ───────────────────────────────────────────────────────────
const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I, O, 0, 1 — avoids confusion

function randomCode(prefix) {
  const part1 = Array.from({ length: 4 }, () => CHARS[randomBytes(1)[0] % CHARS.length]).join("");
  const part2 = Array.from({ length: 4 }, () => CHARS[randomBytes(1)[0] % CHARS.length]).join("");
  return `${prefix}-${part1}-${part2}`;
}

function generateCodes(prefix, count) {
  const set = new Set();
  while (set.size < count) set.add(randomCode(prefix));
  return [...set];
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function seed() {
  const COUNT = 1000;

  // Check existing pool sizes
  const existingBridge = await redis.llen("sbp:pool:bridge");
  const existingAnalyst = await redis.llen("sbp:pool:analyst");

  console.log(`\nExisting pool:`);
  console.log(`  Bridge:  ${existingBridge} codes`);
  console.log(`  Analyst: ${existingAnalyst} codes`);

  // Generate new codes
  console.log(`\nGenerating ${COUNT} Bridge codes...`);
  const bridgeCodes = generateCodes("SBP-BRIDGE", COUNT);

  console.log(`Generating ${COUNT} Analyst codes...`);
  const analystCodes = generateCodes("SBP-ANALYST", COUNT);

  // Push to Redis in batches of 100
  const BATCH = 100;

  console.log(`\nLoading Bridge codes into Redis...`);
  for (let i = 0; i < bridgeCodes.length; i += BATCH) {
    await redis.rpush("sbp:pool:bridge", ...bridgeCodes.slice(i, i + BATCH));
    process.stdout.write(`  ${Math.min(i + BATCH, bridgeCodes.length)}/${COUNT}\r`);
  }

  console.log(`\nLoading Analyst codes into Redis...`);
  for (let i = 0; i < analystCodes.length; i += BATCH) {
    await redis.rpush("sbp:pool:analyst", ...analystCodes.slice(i, i + BATCH));
    process.stdout.write(`  ${Math.min(i + BATCH, analystCodes.length)}/${COUNT}\r`);
  }

  // Final count
  const finalBridge = await redis.llen("sbp:pool:bridge");
  const finalAnalyst = await redis.llen("sbp:pool:analyst");

  console.log(`\n✓ Done!`);
  console.log(`  Bridge pool:  ${finalBridge} codes`);
  console.log(`  Analyst pool: ${finalAnalyst} codes`);
  console.log(`\nSample Bridge codes:`);
  bridgeCodes.slice(0, 3).forEach(c => console.log(`  ${c}`));
  console.log(`\nSample Analyst codes:`);
  analystCodes.slice(0, 3).forEach(c => console.log(`  ${c}`));

  process.exit(0);
}

seed().catch(err => {
  console.error("Seed failed:", err);
  process.exit(1);
});
