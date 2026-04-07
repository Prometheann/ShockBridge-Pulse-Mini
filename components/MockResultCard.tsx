import { Badge } from "@/components/ui/Badge";

export function MockResultCard() {
  return (
    <div className="relative bg-[#1a1d27] border border-[#2d3148] rounded-2xl p-6 shadow-2xl">
      {/* Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-500/10 to-transparent rounded-2xl -z-10" />

      <div className="flex items-center justify-between mb-4">
        <Badge variant="accent">Scenario Note</Badge>
        <span className="text-xs text-[#6b7280]">1 week · Balanced</span>
      </div>

      <p className="text-[#f0f0f0] font-semibold text-sm mb-4 leading-snug">
        Oil Pressure Reprices Brazil&apos;s Inflation and Equity Sensitivity
      </p>

      <div className="space-y-3 mb-4">
        <div>
          <p className="text-[#9ca3af] text-xs uppercase tracking-wider mb-1">
            First-order effects
          </p>
          <ul className="space-y-1">
            {[
              "Energy-linked names gain narrative support",
              "Inflation expectations may rise",
              "Rate-sensitive sectors face pressure",
            ].map((e) => (
              <li key={e} className="flex items-start gap-2 text-xs text-[#f0f0f0]">
                <span className="text-amber-500 mt-0.5">→</span>
                {e}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[#9ca3af] text-xs uppercase tracking-wider mb-1">
            Watch next
          </p>
          <div>
            {["Rate curve", "BRL reaction", "Petrobras guidance", "Domestic cyclicals"].map(
              (tag) => (
                <span
                  key={tag}
                  className="inline-block text-xs bg-[#232636] text-[#9ca3af] border border-[#2d3148] px-2 py-0.5 rounded-full mr-1 mb-1"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-[#2d3148] pt-3 flex items-center gap-2">
        <Badge variant="green">X post generated</Badge>
        <Badge variant="muted">LinkedIn post</Badge>
        <Badge variant="muted">PDF</Badge>
      </div>
    </div>
  );
}
