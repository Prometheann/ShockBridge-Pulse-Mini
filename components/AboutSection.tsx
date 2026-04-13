export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#0d0f18]">
      <div className="max-w-4xl mx-auto px-6">

        {/* Label */}
        <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-4 text-center">
          About
        </p>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f0f0] leading-tight mb-6 text-center"
          style={{ textWrap: "balance" } as React.CSSProperties}>
          Built for people who read macro events<br className="hidden sm:block" /> and need to think fast.
        </h2>

        {/* Divider */}
        <div className="w-12 h-1 bg-amber-500 rounded-full mb-10 mx-auto" />

        {/* Body */}
        <div className="space-y-6 text-[#9ca3af] text-base leading-relaxed">
          <p>
            ShockBridge Pulse was built from a simple frustration: when a major market event hits,
            most tools stop at the headline. What serious operators need is structure.
          </p>
          <p>
            I built ShockBridge Pulse to map the transmission chain behind a shock. What tends to
            move first. What may spill over next. Where exposure can hide before it becomes obvious.
          </p>
          <p>
            The result is a structured scenario memo designed to help professionals think more
            clearly under pressure. It is not financial advice. It is an intelligence layer for
            turning fast-moving conditions into usable logic.
          </p>
          <p>
            Phase 1 is live today through ShockBridge Pulse. In parallel, the broader SaaS layer
            is being developed to expand this framework into a more advanced macro transmission system.
          </p>
        </div>

        {/* Stat strip */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-6">
          {[
            { value: "3 plans", label: "Snapshot · Bridge · Analyst" },
            { value: "No subscription", label: "One payment, full access" },
            { value: "< 30s", label: "From event to structured memo" },
          ].map((s) => (
            <div key={s.value} className="border-l-2 border-amber-500 pl-4">
              <p className="text-[#f0f0f0] text-xl font-bold">{s.value}</p>
              <p className="text-[#6b7280] text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="mt-10 text-[#4b5563] text-xs leading-relaxed border-t border-[#1e2130] pt-6 text-center">
          Research and writing tool only. Not financial advice. No positions are recommended.
          All outputs should be verified before any investment decision.
        </p>
      </div>
    </section>
  );
}
