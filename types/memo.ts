export interface MemoInput {
  eventType: string;
  region: string;
  sectorAsset: string;
  horizon: string;
  tone: string;
  optionalNote?: string;
}

export interface MemoOutput {
  title: string;
  summary: string;
  first_order_effects: string[];
  second_order_effects: string[];
  bullish_path: string;
  bearish_path: string;
  key_uncertainties: string[];
  watch_next: string[];
  x_post: string;
  linkedin_post: string;
}

export type Plan = "free" | "basic" | "creator";

export interface CreditState {
  plan: Plan;
  memosRemaining: number;
  memosTotal: number;
  unlockedAt?: number;
}
