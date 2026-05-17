const baseItems = [
  "Sharp transmission title",
  "Concise macro summary",
  "First-order effects",
  "Second-order risks",
  "Bullish path",
  "Bearish path",
  "Key uncertainties",
  "Watchpoints",
];

export function WhatYouGetSection() {
  return (
    <section className="py-20 bg-[#1a1d27] border-y border-[#2d3148]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <h2 className="text-3xl font-bold text-[#f0f0f0] mb-4">
              One event. A complete Intelligence Brief.
            </h2>
            <p className="text-[#9ca3af] leading-relaxed">
              Each generation delivers a structured transmission brief built for speed, clarity,
              and disciplined market interpretation, readable under pressure and built
              for fast decision cycles.
            </p>
          </div>

          {/* Right */}
          <div>
            <div className="bg-[#0f1117] rounded-xl p-5 border border-[#2d3148]">
              <p className="text-xs text-[#9ca3af] uppercase tracking-wider mb-3">Every Brief includes</p>
              <ul className="space-y-2">
                {baseItems.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#f0f0f0]">
                    <span className="text-amber-500">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
