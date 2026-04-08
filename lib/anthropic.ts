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

CONTENT LENGTH AND DEPTH STANDARDS (non-negotiable):
- Summary: 3 full paragraphs. First opens with the non-obvious angle. Second goes deeper on the structural mechanism. Third covers the cross-asset or macro implication. Each paragraph 3-5 sentences.
- First-order effects: each bullet is 3-5 sentences — state the effect, the precise causal mechanism, which specific names/instruments are affected, and the likely magnitude range. Not one-liners.
- Second-order effects: each bullet is 3-5 sentences — full causal chain from the first shock to the structural consequence, naming specific cohorts, spreads, or cross-asset links.
- Bullish path: two full paragraphs. Dense, specific, named instruments and magnitude ranges.
- Bearish path: two full paragraphs. Dense, specific, named instruments and magnitude ranges.
- Key uncertainties: each bullet is 3-5 sentences — explain why this variable is the real fork-in-the-road, what each outcome implies, and what distinguishes recoverable from structural.
- Watch next: each bullet is 3-5 sentences — explain what signal to watch, why it matters, how to interpret each direction, and the timeframe.

ANALYTICAL STANDARDS:
1. Every effect must have a clear causal mechanism — not a statement, but a chain of causality.
2. First-order effects are immediate price/flow reactions. Second-order effects are structural repricing, behavioral shifts, and cross-asset spillovers.
3. The bullish and bearish paths must read like actual scenarios — name specific assets, rates, spreads, currencies, or sectors that would move and by how much.
4. Key uncertainties must be the real fork-in-the-road questions that determine the outcome, not generic hedges.
5. Write with authority. Be specific. Avoid hedging everything into meaninglessness.
6. No financial advice. Frame as scenario analysis, not recommendations.
7. If the event is an earnings shock: go deep — address EPS vs consensus magnitude, guidance raise/maintain/cut, analyst upgrade and downgrade triggers, options market positioning implications (dealer gamma, put/call ratios), short interest and covering dynamics, sector rotation effects, and how peer stocks reprice. This is a core differentiator of Creator quality.
8. The X post must be immediately engaging — punchy, opinionated, provocative. Max 280 characters. Use the full character allowance.
9. The LinkedIn post must be 3 full paragraphs of genuine insight from a senior practitioner — not a summary. Lead with the non-obvious angle. Paragraph 1: the frame. Paragraph 2: the key mechanism. Paragraph 3: the implication or open question. Professional but not corporate.
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
  "summary": "3 full paragraphs separated by \\n\\n. Para 1: open with the non-obvious angle and the core tension. Para 2: the structural mechanism — why this event is different from the obvious read, what the real variable is. Para 3: the cross-asset or macro implication. Each paragraph 3-5 sentences. Write for a sophisticated reader.",
  "first_order_effects": [
    "3-5 sentences: state the effect, the precise causal mechanism, which specific names/instruments/sectors are affected, likely magnitude range, and any self-reinforcing dynamic",
    "3-5 sentences: state the effect, the precise causal mechanism, which specific names/instruments/sectors are affected, likely magnitude range, and any self-reinforcing dynamic",
    "3-5 sentences: state the effect, the precise causal mechanism, which specific names/instruments/sectors are affected, likely magnitude range, and any self-reinforcing dynamic",
    "3-5 sentences: state the effect, the precise causal mechanism, which specific names/instruments/sectors are affected, likely magnitude range, and any self-reinforcing dynamic",
    "3-5 sentences: state the effect, the precise causal mechanism, which specific names/instruments/sectors are affected, likely magnitude range, and any self-reinforcing dynamic"
  ],
  "second_order_effects": [
    "3-5 sentences: full causal chain from first shock to structural consequence, naming specific cohorts, spreads, or cross-asset links and why they are connected",
    "3-5 sentences: full causal chain from first shock to structural consequence, naming specific cohorts, spreads, or cross-asset links and why they are connected",
    "3-5 sentences: full causal chain from first shock to structural consequence, naming specific cohorts, spreads, or cross-asset links and why they are connected",
    "3-5 sentences: full causal chain from first shock to structural consequence, naming specific cohorts, spreads, or cross-asset links and why they are connected"
  ],
  "bullish_path": "Two dense paragraphs separated by \\n\\n. Para 1: the specific conditions that must hold — name the exact data prints, management statements, or market signals required, with thresholds. Para 2: exactly how assets reprice — name specific instruments, sectors, spreads, or currencies and the magnitude of expected moves. Each paragraph 4-6 sentences.",
  "bearish_path": "Two dense paragraphs separated by \\n\\n. Para 1: the transmission mechanism that turns this shock into something worse — what breaks first, how contagion spreads, what the self-reinforcing loop looks like. Para 2: the assets and sectors that bear the brunt — name specific names, spreads, and drawdown magnitudes, with logic for each. Each paragraph 4-6 sentences.",
  "key_uncertainties": [
    "3-5 sentences: name the variable, explain why it is the real fork-in-the-road, what each outcome implies for the scenario, and what distinguishes a recoverable outcome from a structural one",
    "3-5 sentences: name the variable, explain why it is the real fork-in-the-road, what each outcome implies for the scenario, and what distinguishes a recoverable outcome from a structural one",
    "3-5 sentences: name the variable, explain why it is the real fork-in-the-road, what each outcome implies for the scenario, and what distinguishes a recoverable outcome from a structural one",
    "3-5 sentences: name the variable, explain why it is the real fork-in-the-road, what each outcome implies for the scenario, and what distinguishes a recoverable outcome from a structural one"
  ],
  "watch_next": [
    "3-5 sentences: name the specific indicator or event, explain why it matters for this scenario, how to interpret each direction of the signal, and the exact timeframe for monitoring",
    "3-5 sentences: name the specific indicator or event, explain why it matters for this scenario, how to interpret each direction of the signal, and the exact timeframe for monitoring",
    "3-5 sentences: name the specific indicator or event, explain why it matters for this scenario, how to interpret each direction of the signal, and the exact timeframe for monitoring",
    "3-5 sentences: name the specific indicator or event, explain why it matters for this scenario, how to interpret each direction of the signal, and the exact timeframe for monitoring",
    "3-5 sentences: name the specific indicator or event, explain why it matters for this scenario, how to interpret each direction of the signal, and the exact timeframe for monitoring"
  ],
  "x_post_headline": "5-8 word punchy hook — the sharpest possible frame for this post",
  "x_post": "Use close to the full 280 characters. Lead with the sharpest, most provocative insight. Make someone stop scrolling. Opinionated, direct, specific — name the asset, the mechanism, the implication. No hashtag spam.",
  "linkedin_post_headline": "The precise analytical thesis this post is built on — max 12 words, statement form",
  "linkedin_post": "3 full paragraphs separated by \\n\\n. Para 1: the frame — what the market is missing and why. Para 2: the key mechanism — the non-obvious variable that changes the outcome. Para 3: the implication or open question that a serious practitioner would be tracking. Professional voice, not corporate speak. No emojis. Each paragraph 3-4 sentences."
}`;
}
