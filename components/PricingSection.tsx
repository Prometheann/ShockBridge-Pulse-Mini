import Link from "next/link";
import { Button } from "@/components/ui/Button";

const snapshotFeatures = [
  "Test the memo flow",
  "See how shocks are structured",
  "Preview the output format",
  "Evaluate the logic before upgrading",
];

const bridgeFeatures = [
  "5 structured transmission memos",
  "Macro and earnings shock framing",
  "First-order effects",
  "Second-order risks",
  "Bullish path + Bearish path",
  "Key uncertainties",
  "What to watch next",
];

const analystExtras = [
  "Everything in Bridge",
  "15 structured transmission memos",
  "Deep earnings shock breakdown (EPS vs consensus, guidance, sector rotation)",
  "Scenario brief — X format",
  "Scenario brief — LinkedIn format",
  "PDF memo for distribution or filing",
];

export function PricingSection() {
  const bridgeLink = process.env.NEXT_PUBLIC_BASIC_LINK ?? "/generate";
  const analystLink = process.env.NEXT_PUBLIC_CREATOR_LINK ?? "/generate";

  return (
    <section id="pricing" className="py-20 bg-[#1a1d27] border-y border-[#2d3148]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#f0f0f0] mb-3">
            Start with the engine. Move up with the signal.
          </h2>
          <p className="text-[#9ca3af]">
            Start with the transmission engine. Move to deeper interpretation when the stakes demand it.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Snapshot — Free */}
          <div className="flex flex-col bg-[#0f1117] border border-[#2d3148] rounded-2xl p-8">
            <p className="text-xs text-[#6b7280] uppercase tracking-wider mb-2">Snapshot</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-4xl font-bold text-[#f0f0f0]">Free</span>
            </div>
            <p className="text-[#9ca3af] text-sm mb-6">A first look at the transmission engine</p>

            <ul className="space-y-3 mb-8 flex-1">
              {snapshotFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[#9ca3af]">
                  <span className="text-amber-500 mt-0.5 shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <Link href="/generate" className="mt-auto">
              <Button variant="secondary" className="w-full">Try Snapshot</Button>
            </Link>
          </div>

          {/* Bridge */}
          <div className="flex flex-col bg-[#0f1117] border border-[#2d3148] rounded-2xl p-8">
            <p className="text-xs text-[#6b7280] uppercase tracking-wider mb-2">Bridge</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-4xl font-bold text-[#f0f0f0]">$9</span>
            </div>
            <p className="text-[#9ca3af] text-sm mb-6">Essential access for structured market memos</p>

            <ul className="space-y-3 mb-8 flex-1">
              {bridgeFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[#9ca3af]">
                  <span className="text-amber-500 mt-0.5 shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <a href={bridgeLink} target="_blank" rel="noopener noreferrer" className="mt-auto">
              <Button variant="secondary" className="w-full">Get Bridge</Button>
            </a>
          </div>

          {/* Analyst */}
          <div className="relative flex flex-col bg-[#0f1117] border-2 border-amber-500/50 rounded-2xl p-8">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </span>
            </div>

            <p className="text-xs text-amber-400 uppercase tracking-wider mb-2">Analyst</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-4xl font-bold text-[#f0f0f0]">$19</span>
            </div>
            <p className="text-[#9ca3af] text-sm mb-6">Deeper interpretation for professionals who need to brief, position, and act under pressure</p>

            <ul className="space-y-3 mb-8 flex-1">
              {analystExtras.map((f, i) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[#f0f0f0]">
                  <span className="text-amber-500 mt-0.5 shrink-0">{i === 0 ? "★" : "+"}</span>
                  {f}
                </li>
              ))}
            </ul>

            <a href={analystLink} target="_blank" rel="noopener noreferrer" className="mt-auto">
              <Button className="w-full">Get Analyst</Button>
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-[#6b7280] mt-6">
          One payment. No recurring subscription at launch. After purchase you receive an access
          code by email. Redeem it in the app to unlock your memos.
        </p>
        <p className="text-center text-xs text-[#4b5563] mt-2">
          ShockBridge Pulse is a research and writing tool. It does not provide financial advice.
        </p>
      </div>
    </section>
  );
}
