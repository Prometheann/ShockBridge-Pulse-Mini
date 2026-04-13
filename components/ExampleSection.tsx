export function ExampleSection() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-[#f0f0f0] mb-3">See it in action</h2>
        <p className="text-[#9ca3af]">One input turns into a full research-grade scenario note.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        {/* Input */}
        <div className="bg-[#1a1d27] border border-[#2d3148] rounded-2xl p-6">
          <p className="text-xs text-[#9ca3af] uppercase tracking-wider mb-4">Example input</p>
          <div className="space-y-3">
            {[
              ["Event", "Oil spikes 8%"],
              ["Region", "Brazil"],
              ["Asset / Sector", "Energy & equities"],
              ["Horizon", "1 week"],
              ["Tone", "Balanced"],
            ].map(([label, value]) => (
              <div key={label} className="flex gap-4">
                <span className="text-[#6b7280] text-sm w-28 shrink-0">{label}</span>
                <span className="text-[#f0f0f0] text-sm font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Output */}
        <div className="bg-[#1a1d27] border border-[#2d3148] rounded-2xl p-6">
          <p className="text-xs text-[#9ca3af] uppercase tracking-wider mb-4">Example output</p>

          <p className="text-[#f0f0f0] font-semibold mb-4">
            Oil Pressure Reprices Brazil&apos;s Inflation and Equity Sensitivity
          </p>

          <p className="text-[#9ca3af] text-sm leading-relaxed mb-5">
            An oil spike can strengthen the earnings narrative for energy-linked names while
            reviving inflation pressure and complicating the rate outlook for domestic cyclicals.
          </p>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-amber-500 uppercase tracking-wider mb-2">
                First-order effects
              </p>
              <ul className="space-y-1.5">
                {[
                  "Energy-linked names gain narrative support",
                  "Inflation expectations may rise",
                  "Rate-sensitive sectors face renewed pressure",
                ].map((e) => (
                  <li key={e} className="flex items-start gap-2 text-sm text-[#f0f0f0]">
                    <span className="text-amber-500 mt-0.5 shrink-0">→</span>
                    {e}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs text-amber-500 uppercase tracking-wider mb-2">Watch next</p>
              <div className="flex flex-wrap gap-1.5">
                {["Rate curve reaction", "BRL behavior", "Petrobras guidance", "Domestic cyclicals"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-[#232636] text-[#9ca3af] border border-[#2d3148] px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
