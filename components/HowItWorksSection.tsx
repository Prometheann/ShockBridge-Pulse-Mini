const steps = [
  {
    number: "01",
    title: "Identify the shock",
    description:
      "Select the event type: macro shock, geopolitical rupture, or earnings surprise. Set the region, sector, asset, and time horizon.",
  },
  {
    number: "02",
    title: "Map the transmission",
    description:
      "The engine traces how the shock moves: first-order effects, second-order risks, spillover paths, and structured watchpoints.",
  },
  {
    number: "03",
    title: "Act on the brief",
    description:
      "Receive a structured Intelligence Brief, formatted for speed, clarity, and immediate use in your decision workflow.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="features" className="py-20 max-w-6xl mx-auto px-6">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-[#f0f0f0] mb-3">Simple in. Sharp out.</h2>
        <p className="text-[#9ca3af]">Three steps from event to structured intelligence.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <div
            key={step.number}
            className="bg-[#1a1d27] border border-[#2d3148] rounded-2xl p-6 hover:border-amber-500/30 transition-colors"
          >
            <span className="text-amber-500 font-bold text-2xl">{step.number}</span>
            <h3 className="text-[#f0f0f0] font-semibold text-lg mt-3 mb-2">{step.title}</h3>
            <p className="text-[#9ca3af] text-sm leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
