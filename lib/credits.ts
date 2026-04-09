"use client";

import { CreditState, Plan } from "@/types/memo";

const STORAGE_KEY = "sbp_credits";
const FREE_MEMOS = 1;
const BASIC_MEMOS = 5;
const CREATOR_MEMOS = 15;

export function getCredits(): CreditState {
  if (typeof window === "undefined") {
    return { plan: "free", memosRemaining: FREE_MEMOS, memosTotal: FREE_MEMOS };
  }
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const initial: CreditState = {
      plan: "free",
      memosRemaining: FREE_MEMOS,
      memosTotal: FREE_MEMOS,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  try {
    return JSON.parse(stored) as CreditState;
  } catch {
    return { plan: "free", memosRemaining: FREE_MEMOS, memosTotal: FREE_MEMOS };
  }
}

export function decrementCredit(): CreditState {
  const credits = getCredits();
  const updated: CreditState = {
    ...credits,
    memosRemaining: Math.max(0, credits.memosRemaining - 1),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function applyCode(plan: Plan, code: string): CreditState {
  const memos = plan === "creator" ? CREATOR_MEMOS : BASIC_MEMOS;
  const credits: CreditState = {
    plan,
    memosRemaining: memos,
    memosTotal: memos,
    unlockedAt: Date.now(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(credits));
  localStorage.setItem("sbp_code", code.trim().toUpperCase());
  return credits;
}

export function getStoredCode(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sbp_code") ?? "";
}

export function hasCredits(): boolean {
  return getCredits().memosRemaining > 0;
}

export function isCreator(): boolean {
  return getCredits().plan === "creator";
}
