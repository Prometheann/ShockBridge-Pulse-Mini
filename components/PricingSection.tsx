import { Button } from "@/components/ui/Button";

const freeFeatures = [
  "1 free Intelligence Brief",
  "See how shocks are structured",
  "Preview the transmission output",
  "Evaluate the logic before upgrading",
];

const snapshotFeatures = [
  "1 Risk Snapshot",
  "1 short follow-up update",
  "Compact transmission view",
  "Quick market/risk signal",
];

const bridgeFeatures = [
  "4 Intelligence Briefs per month",
  "Event-driven alerts",
  "Transmission watchpoints",
  "Risk flags",
  "Structured macro-intelligence output",
  "Ongoing monitoring layer",
  "X post Intelligence Brief",
  "LinkedIn Intelligence Post",
  "PDF for distribution or filing",
];

export function PricingSection() {
  const snapshotLink = process.env.NEXT_PUBLIC_SNAPSHOT_LINK ?? "/generate";
  const bridgeLink = process.env.NEXT_PUBLIC_BASIC_LINK ?? "/generate";

  return (
    <section id="pricing" className="py-20 bg-[#1a1d27] border-y border-[#2d3148]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#f0f0f0] mb-3">
            One entry. One recurring intelligence layer.
          </h2>
          <p className="text-[#9ca3af]">
            Start free to test the signal. Move to Snapshot for your first paid brief.
            Join Bridge for ongoing macro-intelligence and decision support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

          {/* Free */}
          <div className="flex flex-col bg-[#0f1117] border border-[#2d3148] rounded-2xl p-8">
            <p className="text-xs text-[#6b7280] uppercase tracking-wider mb-2">Free</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-4xl font-bold text-[#f0f0f0]">Free</span>
            </div>
            <p className="text-[#9ca3af] text-sm mb-6">A first look at the intelligence engine</p>

            <ul className="space-y-3 mb-8 flex-1">
              {freeFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[#9ca3af]">
                  <span className="text-amber-500 mt-0.5 shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <a href="/generate" className="mt-auto">
              <Button variant="secondary" className="w-full">Try Free</Button>
            </a>
          </div>

          {/* Snapshot */}
          <div className="flex flex-col bg-[#0f1117] border border-[#2d3148] rounded-2xl p-8">
            <p className="text-xs text-[#6b7280] uppercase tracking-wider mb-2">Snapshot</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-4xl font-bold text-[#f0f0f0]">$9</span>
            </div>
            <p className="text-[#9ca3af] text-sm mb-6">Fast entry into ShockBridge intelligence</p>

            <ul className="space-y-3 mb-8 flex-1">
              {snapshotFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[#9ca3af]">
                  <span className="text-amber-500 mt-0.5 shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <a href={snapshotLink} className="mt-auto">
              <Button variant="secondary" className="w-full">Get Snapshot</Button>
            </a>
          </div>

          {/* Bridge — featured */}
          <div className="relative flex flex-col bg-[#0f1117] border-2 border-amber-500/50 rounded-2xl p-8">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                MAIN PRODUCT
              </span>
            </div>

            <p className="text-xs text-amber-400 uppercase tracking-wider mb-2">Bridge</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-4xl font-bold text-[#f0f0f0]">$29.90</span>
              <span className="text-[#9ca3af] text-sm mb-1.5">/month</span>
            </div>
            <p className="text-[#9ca3af] text-sm mb-6">
              Recurring macro-intelligence for ongoing decision support
            </p>

            <ul className="space-y-3 mb-8 flex-1">
              {bridgeFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[#f0f0f0]">
                  <span className="text-amber-500 mt-0.5 shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <a href={bridgeLink} target="_blank" rel="noopener noreferrer" className="mt-auto">
              <Button className="w-full">Join Bridge</Button>
            </a>

            <p className="text-xs text-[#6b7280] mt-3 text-center leading-relaxed">
              Founding price while ShockBridge expands its proprietary modeling layer.
            </p>
          </div>

        </div>

        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-[#6b7280] mt-6">
            Snapshot is a one-time entry product. Bridge is a monthly subscription.
            After purchase you receive an access code by email — redeem it in the app
            to unlock your briefs immediately.
          </p>
          <p className="text-xs text-[#4b5563] mt-2">
            Research & Market Risk Transmission Analysis · Not investment advice.
          </p>
        </div>
      </div>
    </section>
  );
}
