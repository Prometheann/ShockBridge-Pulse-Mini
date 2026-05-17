export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#0d0f18]">
      <div className="max-w-4xl mx-auto px-6">

        {/* Label */}
        <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-4">
          About
        </p>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f0f0] leading-tight mb-6">
          Built for people who read macro events and need to think fast.
        </h2>

        {/* Divider */}
        <div className="w-12 h-1 bg-amber-500 rounded-full mb-10" />

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
            The result is a structured Intelligence Brief designed to help professionals think more
            clearly under pressure. It is not investment advice. It is an intelligence layer for
            turning fast-moving conditions into usable, decision-ready logic.
          </p>
          <p>
            ShockBridge Pulse is live today as a productized intelligence layer: Snapshot for
            fast entry, Bridge for recurring macro-intelligence. In parallel, the broader
            proprietary modeling framework is being developed to deepen the analytical capabilities.
          </p>
        </div>

        {/* Stat strip */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-6">
          {[
            { value: "2 products", label: "Snapshot · Bridge" },
            { value: "From $29.90/mo", label: "Bridge founding price" },
            { value: "< 30s", label: "From event to Intelligence Brief" },
          ].map((s) => (
            <div key={s.value} className="border-l-2 border-amber-500 pl-4">
              <p className="text-[#f0f0f0] text-xl font-bold">{s.value}</p>
              <p className="text-[#6b7280] text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="mt-10 text-[#4b5563] text-xs leading-relaxed border-t border-[#1e2130] pt-6">
          Research & Market Risk Transmission Analysis · Not investment advice. No positions are recommended.
          All outputs should be independently verified before any investment decision.
        </p>
      </div>
    </section>
  );
}
