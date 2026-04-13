const steps = [
  {
    number: "01",
    title: "Enter the event",
    description:
      "Choose your event type: macro shock, earnings surprise, or geopolitical rupture. Set region, asset or sector, time horizon, and tone.",
  },
  {
    number: "02",
    title: "Generate the memo",
    description:
      "Get a structured scenario note built around cause, pressure, spillover, and watchpoints.",
  },
  {
    number: "03",
    title: "Use it immediately",
    description:
      "Read it, brief from it, export it, or use it immediately in your market workflow.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="features" className="py-20 max-w-6xl mx-auto px-6">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-[#f0f0f0] mb-3">Simple in. Sharp out.</h2>
        <p className="text-[#9ca3af]">Three steps from market noise to structured conviction.</p>
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
