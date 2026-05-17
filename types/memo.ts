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
  title_hook?: string;
  title_asset?: string;
  title_bridge?: string;
  title_theme?: string;
  summary: string;
  first_order_effects: string[];
  // Basic + Creator only
  second_order_effects?: string[];
  bullish_path?: string;
  bearish_path?: string;
  key_uncertainties?: string[];
  watch_next: string[];
  // Creator only — legacy social (kept for backward compat)
  x_post?: string;
  x_post_headline?: string;
  linkedin_post?: string;
  linkedin_post_headline?: string;
  // Creator only — Beta Research Desk Methodology
  methodology_frame?: string;
  hidden_variable_analysis?: string[];
  // Creator only — Extended Horizon Assessment (Phase 2)
  horizon_assessment?: {
    six_month: string;
    twelve_month: string;
  };
}

export type Plan = "free" | "basic" | "creator";

export interface CreditState {
  plan: Plan;
  memosRemaining: number;
  memosTotal: number;
  unlockedAt?: number;
}
