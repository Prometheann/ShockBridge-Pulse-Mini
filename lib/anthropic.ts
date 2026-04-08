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
7. If the event is an earnings shock: go deep — address EPS vs consensus magnitude, revenue beat or miss, guidance raise/maintain/cut, analyst upgrade and downgrade triggers, options market positioning implications, short interest and covering dynamics, sector rotation effects, and how peer stocks are likely to reprice. This is a core differentiator of Creator quality.
8. The X post must be immediately engaging — punchy, opinionated, and provocative enough to make someone stop scrolling. Max 280 characters.
9. The LinkedIn post must read like genuine insight from a senior practitioner — not a summary. Lead with the non-obvious angle. 3-4 sharp sentences. Professional but not corporate.
10. Output valid JSON only — no markdown fences, no preamble, no trailing text.`;

export function buildCreatorPrompt(input: MemoInput): string {
  return `Event type: ${input.eventType}
Region: ${input.region}
Sector or asset: ${input.sectorAsset}
Time horizon: ${input.horizon}
Tone: ${input.tone}
Analyst thesis / additional context: ${input.optionalNote || "None provided"}

Produce a deep, publication-quality scenario note. Return exactly this JSON — nothing else:
{
  "title": "full title combining all parts below, separated by ' — '",
  "title_hook": "2-3 words MAX — the event type only, no company name (e.g. 'EARNINGS MISS' or 'RATE SHOCK' or 'OIL SPIKE'). ALL CAPS.",
  "title_asset": "1-3 words — the company, ticker, or asset name only (e.g. 'NVIDIA' or 'FED' or 'BRL'). ALL CAPS.",
  "title_bridge": "4-8 words — the mechanism or collision (e.g. 'Collides With Middle East Risk' or 'Hits an Overextended Market'). No trailing colon.",
  "title_theme": "3-6 words — the core analytical theme (e.g. 'AI Premium Under Siege' or 'Dollar Breaks Its Anchor'). No trailing punctuation.",
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
  "x_post_headline": "5-8 word punchy hook — the sharpest possible frame for this post",
  "x_post": "Max 280 characters. Lead with the sharpest, most provocative insight from the analysis. Make someone stop scrolling. Opinionated, direct, no hashtag spam.",
  "linkedin_post_headline": "The precise analytical thesis this post is built on — max 12 words, statement form",
  "linkedin_post": "3-4 sentences. Lead with the non-obvious angle — not a summary of the event, but a genuine analytical insight a senior practitioner would share. Professional voice, not corporate speak. No emojis. End with the key question or implication."
}`;
}
