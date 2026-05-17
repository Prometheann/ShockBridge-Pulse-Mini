const includes = [
  "Intake and context collection",
  "Tailored risk analysis",
  "Exposure interpretation",
  "Scenario-based analysis: 3 scenarios",
  "Mitigation direction and response options",
  "Founder-led judgment",
  "Custom PDF report",
  "Optional short call",
];

export function AnalystSection() {
  return (
    <section id="analyst" className="py-24 bg-[#0d0f18]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left — copy */}
          <div>
            <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-4">
              Custom Engagement
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f0f0] leading-tight mb-4">
              Need this applied to your business or portfolio?
            </h2>
            <div className="w-12 h-1 bg-amber-500 rounded-full mb-6" />
            <p className="text-[#9ca3af] text-base leading-relaxed mb-4">
              The Analyst Report is a custom engagement, not a plan, not a subscription.
              ShockBridge intelligence applied directly to a real business, portfolio,
              sector, or specific exposure.
            </p>
            <p className="text-amber-400/80 text-sm font-medium italic mb-8">
              Products deliver briefs. Analyst delivers judgment.
            </p>

            <ul className="space-y-3">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#9ca3af]">
                  <span className="text-amber-500 mt-0.5 shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — CTA card */}
          <div className="bg-[#0a0d16] border border-amber-500/20 rounded-2xl p-8">
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
              Analyst Report
            </p>
            <p className="text-[#f0f0f0] font-bold text-3xl mb-1">Starting at $199</p>
            <p className="text-[#6b7280] text-sm mb-8">
              Each report is tailored. Pricing depends on scope and complexity.
            </p>

            <a
              href="mailto:help@shockbridgepulse.com?subject=Analyst Report Request"
              className="block w-full"
            >
              <button className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 transition-colors text-black font-semibold text-sm cursor-pointer">
                Request Analyst Report
              </button>
            </a>

            <p className="text-[#4b5563] text-xs mt-5 leading-relaxed">
              Send a short note on your business, portfolio, or the specific exposure
              you want analyzed. I review each request personally.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
