import OpenAI from "openai";
import { MemoInput } from "@/types/memo";

let _client: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (!_client) {
    _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _client;
}

export const SYSTEM_PROMPT = `You are ShockBridge Pulse Mini, a market-intelligence writing engine.

Your task is to transform a macro shock, earnings event, or market surprise into a concise, useful analyst-style memo.

Rules:
1. Do not give direct buy or sell advice.
2. Do not pretend to know live market data unless explicitly provided.
3. Focus on causal logic, transmission paths, exposure, and uncertainty.
4. Use clear financial language, but keep it readable.
5. Distinguish between first-order effects and second-order effects.
6. Include both a bullish path and a bearish path.
7. Keep the tone sharp, intelligent, and practical.
8. Avoid vague filler. Be concrete.
9. If the input is thin, state what assumptions you are making.
10. Output valid JSON only — no markdown, no extra text, just the JSON object.`;

export function buildUserPrompt(input: MemoInput): string {
  return `Event type: ${input.eventType}
Region: ${input.region}
Sector or asset: ${input.sectorAsset}
Time horizon: ${input.horizon}
Tone: ${input.tone}
Optional thesis: ${input.optionalNote || "None provided"}

Return exactly this JSON structure — nothing else:
{
  "title": "sharp descriptive title (max 12 words)",
  "summary": "2–3 sentence concise summary",
  "first_order_effects": ["effect 1", "effect 2", "effect 3", "effect 4"],
  "second_order_effects": ["effect 1", "effect 2", "effect 3"],
  "bullish_path": "One paragraph. Concrete scenario where the shock resolves favorably.",
  "bearish_path": "One paragraph. Concrete scenario where the shock amplifies negatively.",
  "key_uncertainties": ["uncertainty 1", "uncertainty 2", "uncertainty 3"],
  "watch_next": ["item 1", "item 2", "item 3", "item 4"],
  "x_post": "Ready-to-post X thread (max 280 chars, punchy, no hashtag spam)",
  "linkedin_post": "Ready-to-post LinkedIn paragraph (2–3 sentences, professional, no emojis)"
}`;
}
