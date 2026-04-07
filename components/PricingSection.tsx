import Link from "next/link";
import { Button } from "@/components/ui/Button";

const basicFeatures = [
  "5 memos",
  "Macro shock + earnings shock analysis",
  "First-order effects",
  "Second-order risks",
  "Bullish path + Bearish path",
  "Key uncertainties",
  "What to watch next",
];

const creatorExtras = [
  "Everything in Basic",
  "20 memos",
  "Deep earnings shock breakdown (EPS vs consensus, guidance, sector rotation)",
  "X post (ready to publish)",
  "LinkedIn post (ready to publish)",
  "PDF export",
];

export function PricingSection() {
  // NEXT_PUBLIC_ vars are inlined at build time — safe to read here
  const basicLink = process.env.NEXT_PUBLIC_BASIC_LINK ?? "/generate";
  const creatorLink = process.env.NEXT_PUBLIC_CREATOR_LINK ?? "/generate";

  return (
    <section id="pricing" className="py-20 bg-[#1a1d27] border-y border-[#2d3148]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#f0f0f0] mb-3">
            Simple pricing. Sharp output.
          </h2>
          <p className="text-[#9ca3af]">
            Start small or choose the plan built for people who publish and share.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Basic */}
          <div className="flex flex-col bg-[#0f1117] border border-[#2d3148] rounded-2xl p-8">
            <p className="text-xs text-[#6b7280] uppercase tracking-wider mb-2">Basic</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-4xl font-bold text-[#f0f0f0]">$9</span>
            </div>
            <p className="text-[#9ca3af] text-sm mb-6">Test the engine</p>

            <ul className="space-y-3 mb-8 flex-1">
              {basicFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[#9ca3af]">
                  <span className="text-amber-500 mt-0.5 shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <a href={basicLink} target="_blank" rel="noopener noreferrer" className="mt-auto">
              <Button variant="secondary" className="w-full">
                Get Basic
              </Button>
            </a>
          </div>

          {/* Creator */}
          <div className="relative flex flex-col bg-[#0f1117] border-2 border-amber-500/50 rounded-2xl p-8">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </span>
            </div>

            <p className="text-xs text-amber-400 uppercase tracking-wider mb-2">Creator</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-4xl font-bold text-[#f0f0f0]">$19</span>
            </div>
            <p className="text-[#9ca3af] text-sm mb-6">Build and publish faster</p>

            <ul className="space-y-3 mb-8 flex-1">
              {creatorExtras.map((f, i) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[#f0f0f0]">
                  <span className="text-amber-500 mt-0.5 shrink-0">{i === 0 ? "★" : "+"}</span>
                  {f}
                </li>
              ))}
            </ul>

            <a href={creatorLink} target="_blank" rel="noopener noreferrer" className="mt-auto">
              <Button className="w-full">Get Creator</Button>
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-[#6b7280] mt-6">
          One payment. No recurring subscription at launch. After purchase you receive an access
          code by email — redeem it in the app to unlock your memos.
        </p>
        <p className="text-center text-xs text-[#4b5563] mt-2">
          ShockBridge Pulse is a research and writing tool. It does not provide financial
          advice.
        </p>
      </div>
    </section>
  );
}
