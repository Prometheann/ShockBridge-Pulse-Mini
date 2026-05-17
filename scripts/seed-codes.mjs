/**
 * Seed script — generates 1,000 Snapshot codes and 1,000 Bridge codes
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
  const existingSnapshot = await redis.llen("sbp:pool:snapshot");
  const existingBridge   = await redis.llen("sbp:pool:bridge");

  console.log(`\nExisting pool:`);
  console.log(`  Snapshot: ${existingSnapshot} codes`);
  console.log(`  Bridge:   ${existingBridge} codes`);

  // Generate new codes
  console.log(`\nGenerating ${COUNT} Snapshot codes...`);
  const snapshotCodes = generateCodes("SBP-SNAPSHOT", COUNT);

  console.log(`Generating ${COUNT} Bridge codes...`);
  const bridgeCodes = generateCodes("SBP-BRIDGE", COUNT);

  // Push to Redis in batches of 100
  const BATCH = 100;

  console.log(`\nLoading Snapshot codes into Redis...`);
  for (let i = 0; i < snapshotCodes.length; i += BATCH) {
    await redis.rpush("sbp:pool:snapshot", ...snapshotCodes.slice(i, i + BATCH));
    process.stdout.write(`  ${Math.min(i + BATCH, snapshotCodes.length)}/${COUNT}\r`);
  }

  console.log(`\nLoading Bridge codes into Redis...`);
  for (let i = 0; i < bridgeCodes.length; i += BATCH) {
    await redis.rpush("sbp:pool:bridge", ...bridgeCodes.slice(i, i + BATCH));
    process.stdout.write(`  ${Math.min(i + BATCH, bridgeCodes.length)}/${COUNT}\r`);
  }

  // Final count
  const finalSnapshot = await redis.llen("sbp:pool:snapshot");
  const finalBridge   = await redis.llen("sbp:pool:bridge");

  console.log(`\n✓ Done!`);
  console.log(`  Snapshot pool: ${finalSnapshot} codes`);
  console.log(`  Bridge pool:   ${finalBridge} codes`);
  console.log(`\nSample Snapshot codes:`);
  snapshotCodes.slice(0, 3).forEach(c => console.log(`  ${c}`));
  console.log(`\nSample Bridge codes:`);
  bridgeCodes.slice(0, 3).forEach(c => console.log(`  ${c}`));

  process.exit(0);
}

seed().catch(err => {
  console.error("Seed failed:", err);
  process.exit(1);
});
