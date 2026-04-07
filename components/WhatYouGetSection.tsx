const baseItems = [
  "Sharp title",
  "Concise summary",
  "Macro shock + earnings shock analysis",
  "First-order effects",
  "Second-order risks",
  "Bullish path",
  "Bearish path",
  "Key uncertainties",
  "What to watch next",
];

const creatorExtras = ["X post (ready to publish)", "LinkedIn post (ready to publish)", "PDF export"];

export function WhatYouGetSection() {
  return (
    <section className="py-20 bg-[#1a1d27] border-y border-[#2d3148]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <h2 className="text-3xl font-bold text-[#f0f0f0] mb-4">
              One input. Multiple usable outputs.
            </h2>
            <p className="text-[#9ca3af] leading-relaxed">
              Each generation gives you a sharp memo built for speed and clarity, not vague
              market noise. Creator plan also gives you content you can publish immediately.
            </p>
          </div>

          {/* Right */}
          <div className="space-y-4">
            <div className="bg-[#0f1117] rounded-xl p-5 border border-[#2d3148]">
              <p className="text-xs text-[#9ca3af] uppercase tracking-wider mb-3">Every memo includes</p>
              <ul className="space-y-2">
                {baseItems.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#f0f0f0]">
                    <span className="text-amber-500">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-500/5 rounded-xl p-5 border border-amber-500/20">
              <p className="text-xs text-amber-400 uppercase tracking-wider mb-3">
                Creator plan also includes
              </p>
              <ul className="space-y-2">
                {creatorExtras.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-amber-300">
                    <span className="text-amber-500">★</span>
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
