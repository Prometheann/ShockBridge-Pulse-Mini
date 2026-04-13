const points = [
  {
    title: "Not just output. Structure.",
    description: "The tool is built around market logic, not generic rewriting.",
  },
  {
    title: "Not just reaction. Transmission.",
    description:
      "It maps what hits first, what spills over next, and what deserves attention.",
  },
  {
    title: "Not just analysis. Workflow-ready formats.",
    description: "Analyst plan extends one event into multiple communication formats for faster professional use.",
  },
];

const chain = ["Shock", "Pressure", "Spillover", "Exposure", "Watchpoints"];

export function WhyDifferentSection() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-[#f0f0f0] mb-4" style={{ textWrap: "balance" } as React.CSSProperties}>
          Because it thinks in chains, not fragments.
        </h2>
        <div className="flex items-center gap-2 flex-wrap">
          {chain.map((item, i) => (
            <span key={item} className="flex items-center gap-2">
              <span className="text-amber-500 font-medium">{item}</span>
              {i < chain.length - 1 && <span className="text-[#2d3148]">→</span>}
            </span>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {points.map((p) => (
          <div
            key={p.title}
            className="bg-[#1a1d27] border border-[#2d3148] rounded-2xl p-6"
          >
            <h3 className="text-[#f0f0f0] font-semibold mb-2">{p.title}</h3>
            <p className="text-[#9ca3af] text-sm leading-relaxed">{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
