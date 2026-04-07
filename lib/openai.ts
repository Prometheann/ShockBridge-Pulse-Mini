import OpenAI from "openai";
import { MemoInput } from "@/types/memo";

let _client: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (!_client) {
    _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _client;
}

// ─── FREE PLAN ────────────────────────────────────────────────────────────────
// Brief, accessible snapshot — enough to show the product works

export const FREE_SYSTEM_PROMPT = `You are ShockBridge Pulse, a market intelligence tool.
Generate a brief, clear market snapshot from the event provided.
Focus only on the most immediate, obvious first-order effects.
Write plainly and directly — no jargon, no depth required.
Do not speculate beyond what the event directly implies.
Output valid JSON only — no markdown, no extra text.`;

export function buildFreePrompt(input: MemoInput): string {
  return `Event type: ${input.eventType}
Region: ${input.region}
Sector or asset: ${input.sectorAsset}
Time horizon: ${input.horizon}
Tone: ${input.tone}
Optional note: ${input.optionalNote || "None"}

Return exactly this JSON — nothing else:
{
  "title": "clear descriptive title (max 10 words)",
  "summary": "1-2 sentence plain-language overview of what this event means",
  "first_order_effects": ["immediate effect 1", "immediate effect 2", "immediate effect 3"],
  "watch_next": ["key thing to monitor 1", "key thing to monitor 2", "key thing to monitor 3"]
}`;
}

// ─── BASIC PLAN ───────────────────────────────────────────────────────────────
// Full structured memo — all sections, solid analytical depth

export const BASIC_SYSTEM_PROMPT = `You are ShockBridge Pulse, a market-intelligence writing engine.
Transform a macro shock, earnings event, or market surprise into a complete analyst-style scenario note.

Rules:
1. Do not give direct buy or sell advice.
2. Focus on causal logic, transmission paths, exposure, and uncertainty.
3. Use precise financial language — keep it readable but substantive.
4. Clearly distinguish first-order effects from second-order effects.
5. The bullish and bearish paths must be concrete and specific, not generic.
6. Key uncertainties must be genuinely uncertain — avoid stating the obvious.
7. Be direct. Cut filler. Every sentence must carry information.
8. Output valid JSON only — no markdown, no extra text.`;

export function buildBasicPrompt(input: MemoInput): string {
  return `Event type: ${input.eventType}
Region: ${input.region}
Sector or asset: ${input.sectorAsset}
Time horizon: ${input.horizon}
Tone: ${input.tone}
Optional thesis: ${input.optionalNote || "None provided"}

Return exactly this JSON — nothing else:
{
  "title": "sharp analytical title (max 12 words)",
  "summary": "2-3 sentences. State what happened, why it matters, and what the key tension is.",
  "first_order_effects": [
    "specific effect with brief reasoning",
    "specific effect with brief reasoning",
    "specific effect with brief reasoning",
    "specific effect with brief reasoning"
  ],
  "second_order_effects": [
    "downstream consequence with logic",
    "downstream consequence with logic",
    "downstream consequence with logic"
  ],
  "bullish_path": "One focused paragraph. What specific conditions would make this shock resolve favorably? Name sectors, assets, or catalysts.",
  "bearish_path": "One focused paragraph. What specific conditions would cause this shock to amplify? Name the transmission mechanism.",
  "key_uncertainties": [
    "specific open question that determines direction",
    "specific open question that determines direction",
    "specific open question that determines direction"
  ],
  "watch_next": ["indicator or event 1", "indicator or event 2", "indicator or event 3", "indicator or event 4"]
}`;
}

// ─── SYSTEM PROMPT (shared alias for API route) ───────────────────────────────
export const SYSTEM_PROMPT = BASIC_SYSTEM_PROMPT;
export const buildUserPrompt = buildBasicPrompt;
