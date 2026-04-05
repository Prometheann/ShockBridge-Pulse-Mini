import Anthropic from "@anthropic-ai/sdk";
import { MemoInput } from "@/types/memo";

let _client: Anthropic | null = null;

export function getAnthropicClient(): Anthropic {
  if (!_client) {
    _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return _client;
}

// ─── CREATOR PLAN ─────────────────────────────────────────────────────────────
// In-depth, publication-quality macro analysis

export const CREATOR_SYSTEM_PROMPT = `You are ShockBridge Pulse, a senior macro analyst and financial writer with 20 years of experience at a tier-1 investment bank.

Your task is to produce a publication-quality scenario note — the kind that goes into a morning macro brief or investor letter. It must be precise, layered, and genuinely insightful. Not a summary. An analysis.

Standards:
1. Every effect you list must have a clear causal mechanism, not just a statement.
2. First-order effects are immediate price/flow reactions. Second-order effects are structural repricing, behavioral shifts, and cross-asset spillovers.
3. The bullish and bearish paths must read like actual scenarios — name specific assets, rates, spreads, currencies, or sectors that would move and why.
4. Key uncertainties must be the real fork-in-the-road questions that determine the outcome.
5. Write with authority. Be specific. Avoid hedging everything into meaninglessness.
6. No financial advice. Frame as scenario analysis, not recommendations.
7. The X post must be immediately engaging — punchy, opinionated, and provocative enough to make someone stop scrolling. Max 280 characters.
8. The LinkedIn post must read like genuine insight from a senior practitioner — not a summary. Lead with the non-obvious angle. 3-4 sharp sentences. Professional but not corporate.
9. Output valid JSON only — no markdown fences, no preamble, no trailing text.`;

export function buildCreatorPrompt(input: MemoInput): string {
  return `Event type: ${input.eventType}
Region: ${input.region}
Sector or asset: ${input.sectorAsset}
Time horizon: ${input.horizon}
Tone: ${input.tone}
Analyst thesis / additional context: ${input.optionalNote || "None provided"}

Produce a deep, publication-quality scenario note. Return exactly this JSON — nothing else:
{
  "title": "precise, authoritative title that captures the core tension (max 14 words)",
  "summary": "3-4 sentences. Open with the non-obvious angle. State the core mechanism, the key tension, and what makes this event different from the obvious read. Write for a sophisticated reader.",
  "first_order_effects": [
    "effect + mechanism: who moves, what reprices, and why — immediately",
    "effect + mechanism: who moves, what reprices, and why — immediately",
    "effect + mechanism: who moves, what reprices, and why — immediately",
    "effect + mechanism: who moves, what reprices, and why — immediately",
    "effect + mechanism: who moves, what reprices, and why — immediately"
  ],
  "second_order_effects": [
    "structural or cross-asset consequence with full causal chain",
    "structural or cross-asset consequence with full causal chain",
    "structural or cross-asset consequence with full causal chain",
    "structural or cross-asset consequence with full causal chain"
  ],
  "bullish_path": "Two paragraphs. First: the conditions that must hold for a favorable resolution — specific policy moves, data prints, or market signals. Second: how the scenario plays out across assets, naming specific instruments or sectors and the magnitude of expected moves.",
  "bearish_path": "Two paragraphs. First: the transmission mechanism that turns this shock into something worse — what breaks, what contagion looks like. Second: the assets and sectors that bear the brunt, with specific logic for each.",
  "key_uncertainties": [
    "the most critical open question — what one variable determines the outcome most",
    "second key fork in the road — a structural unknown",
    "third uncertainty — policy, geopolitical, or data-dependent",
    "fourth uncertainty — cross-asset or macro feedback loop"
  ],
  "watch_next": [
    "specific indicator or event with timeframe",
    "specific indicator or event with timeframe",
    "specific indicator or event with timeframe",
    "specific indicator or event with timeframe",
    "specific indicator or event with timeframe"
  ],
  "x_post": "Max 280 characters. Lead with the sharpest, most provocative insight from the analysis. Make someone stop scrolling. Opinionated, direct, no hashtag spam.",
  "linkedin_post": "3-4 sentences. Lead with the non-obvious angle — not a summary of the event, but a genuine analytical insight a senior practitioner would share. Professional voice, not corporate speak. No emojis. End with the key question or implication."
}`;
}
