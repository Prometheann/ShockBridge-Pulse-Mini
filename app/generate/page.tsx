"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GeneratorForm } from "@/components/GeneratorForm";
import { MemoResult } from "@/components/MemoResult";
import { Button } from "@/components/ui/Button";
import { MemoInput, MemoOutput, CreditState, Plan } from "@/types/memo";

type Step = "form" | "loading" | "result" | "paywall";

const PLAN_MEMOS: Record<Plan, number> = { free: 1, basic: 5, creator: 15 };
const PLAN_DISPLAY: Record<Plan, string> = { free: "Free", basic: "Bridge", creator: "Analyst" };
const FREE_MEMO_KEY = "sbp_free_used_at";
const FREE_WINDOW_MS = 24 * 60 * 60 * 1000;

export default function GeneratePage() {
  const [step, setStep] = useState<Step>("form");
  const [memo, setMemo] = useState<MemoOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [credits, setCredits] = useState<CreditState>({ plan: "free", memosRemaining: 1, memosTotal: 1 });
  const [accessCode, setAccessCode] = useState<string>("");
  const [lastInput, setLastInput] = useState<MemoInput | null>(null);

  // On mount: check free memo 24h window only
  useEffect(() => {
    const usedAt = localStorage.getItem(FREE_MEMO_KEY);
    if (usedAt) {
      const elapsed = Date.now() - parseInt(usedAt);
      if (elapsed < FREE_WINDOW_MS) {
        setCredits(prev => prev.plan === "free" ? { ...prev, memosRemaining: 0 } : prev);
        setStep("paywall");
      } else {
        localStorage.removeItem(FREE_MEMO_KEY);
      }
    }
  }, []);

  // Code redeem state
  const [code, setCode] = useState("");
  const [codeStatus, setCodeStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [codeMessage, setCodeMessage] = useState("");

  async function handleGenerate(input: MemoInput) {
    if (credits.memosRemaining <= 0) {
      setStep("paywall");
      return;
    }

    setStep("loading");
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, code: accessCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.code === "RATE_LIMIT" || data.code === "QUOTA_EXCEEDED") {
          setStep("paywall");
          return;
        }
        throw new Error(data.error || "Generation failed.");
      }

      setCredits(prev => ({
        ...prev,
        memosRemaining: data.memosRemaining ?? Math.max(0, prev.memosRemaining - 1),
      }));
      // Mark free memo as used so refresh shows paywall
      if (!accessCode) {
        localStorage.setItem(FREE_MEMO_KEY, String(Date.now()));
      }
      setLastInput(input);
      setMemo(data.memo);
      setStep("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStep("form");
    }
  }

  async function handleRedeem() {
    if (!code.trim()) return;
    setCodeStatus("loading");
    try {
      const res = await fetch("/api/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        const plan = data.plan as Plan;
        const normalizedCode = code.trim().toUpperCase();
        setCredits({ plan, memosRemaining: data.memosRemaining, memosTotal: data.memosTotal, unlockedAt: Date.now() });
        setAccessCode(normalizedCode);
        setCodeStatus("success");
        setCodeMessage(data.message);
        setStep("form");
      } else {
        setCodeStatus("error");
        setCodeMessage(data.error || "Invalid code.");
      }
    } catch {
      setCodeStatus("error");
      setCodeMessage("Server error. Please try again.");
    }
  }

  const currentPlan: Plan = credits.plan;

  return (
    <div className="min-h-screen bg-[#0f1117] flex flex-col">
      <Header />

      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-12">
        {/* Credit counter */}
        <div className="flex items-center justify-between mb-8 bg-[#1a1d27] border border-[#2d3148] rounded-xl px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#9ca3af] uppercase tracking-wider">Plan</span>
            <span className="text-sm font-semibold text-amber-500">{PLAN_DISPLAY[currentPlan]}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#9ca3af]">Memos remaining</span>
            <span className={`text-sm font-bold ${credits.memosRemaining > 0 ? "text-[#f0f0f0]" : "text-red-400"}`}>
              {credits.memosRemaining}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#f0f0f0]">Generate a Market Memo</h1>
          <p className="text-[#9ca3af] text-sm mt-1">
            Enter your event details and get a cited scenario note in seconds.
          </p>
        </div>

        {/* FORM */}
        {step === "form" && (
          <div>
            {error && (
              <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">
                {error}{" "}
                <span className="text-[#9ca3af]">
                  If this keeps happening, contact{" "}
                  <a href="mailto:help@shockbridgepulse.com" className="underline hover:text-[#f0f0f0] transition-colors">
                    help@shockbridgepulse.com
                  </a>.
                </span>
              </div>
            )}
            {codeStatus === "success" && (
              <div className="mb-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-emerald-400 text-sm">
                {codeMessage}
              </div>
            )}
            <div className="bg-[#1a1d27] border border-[#2d3148] rounded-2xl p-6">
              <GeneratorForm onSubmit={handleGenerate} loading={false} />
            </div>

            {/* Redeem code */}
            <div className="mt-6 bg-[#1a1d27] border border-[#2d3148] rounded-2xl p-5">
              <p className="text-sm font-medium text-[#f0f0f0] mb-3">Redeem an access code</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="SBP-BRIDGE-XXXXX or SBP-ANALYST-XXXXX"
                  className="flex-1 bg-[#0f1117] border border-[#2d3148] rounded-xl px-4 py-2.5 text-sm text-[#f0f0f0] placeholder-[#6b7280] focus:outline-none focus:border-amber-500/50"
                />
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleRedeem}
                  disabled={codeStatus === "loading"}
                  className="w-full sm:w-auto"
                >
                  {codeStatus === "loading" ? "..." : "Redeem"}
                </Button>
              </div>
              {codeStatus === "error" && (
                <p className="text-red-400 text-xs mt-2">{codeMessage}</p>
              )}
              <p className="text-xs text-[#6b7280] mt-2">
                Received a code after purchase? Enter it here.
              </p>
            </div>
          </div>
        )}

        {/* LOADING */}
        {step === "loading" && (
          <div className="bg-[#1a1d27] border border-[#2d3148] rounded-2xl p-12 text-center">
            <div className="inline-block w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-[#9ca3af] text-sm">Analyzing transmission chains...</p>
          </div>
        )}

        {/* RESULT */}
        {step === "result" && memo && (
          <div className="bg-[#1a1d27] border border-[#2d3148] rounded-2xl p-6">
            <MemoResult
              memo={memo}
              plan={currentPlan}
              input={lastInput ?? undefined}
              onReset={() => {
                setMemo(null);
                setStep("form");
              }}
            />
          </div>
        )}

        {/* PAYWALL */}
        {step === "paywall" && (
          <div className="bg-[#1a1d27] border border-[#2d3148] rounded-2xl p-8 text-center">
            <p className="text-2xl font-bold text-[#f0f0f0] mb-3">
              {currentPlan === "free" ? "Free demo memo used" : "All memos used"}
            </p>
            <p className="text-[#9ca3af] mb-6 leading-relaxed">
              {currentPlan === "free"
                ? "You've used your free demo. Purchase a plan to generate more memos, or redeem an existing access code below."
                : "You've used all your memos for this session. Enter your code again to continue."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link href="/#pricing" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">See Plans</Button>
              </Link>
              <Button size="lg" variant="secondary" onClick={() => setStep("form")} className="w-full sm:w-auto">
                Redeem a Code
              </Button>
            </div>
            <p className="text-xs text-[#6b7280]">
              After purchasing, you receive an access code by email.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
