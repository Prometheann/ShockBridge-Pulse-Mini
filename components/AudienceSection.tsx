import React from "react";

const audiences: { icon: string; title: React.ReactNode; description: string }[] = [
  {
    icon: "📊",
    title: "Investors & allocators",
    description: "Get cleaner scenario framing when market pressure distorts the surface narrative.",
  },
  {
    icon: "🧭",
    title: "Advisors & research professionals",
    description: "Turn fast-moving events into structured interpretation clients and teams can understand.",
  },
  {
    icon: "🏦",
    title: <>Treasury &<br />risk-minded operators</>,
    description: "See how pressure can move from rates, FX, or commodities into real business exposure.",
  },
  {
    icon: "🎓",
    title: "Analysts",
    description: "Organize cause, pressure, spillover, and watchpoints more clearly across markets.",
  },
];

export function AudienceSection() {
  return (
    <section className="py-20 bg-[#1a1d27] border-y border-[#2d3148]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#f0f0f0] mb-3">
            Built for serious market operators.
          </h2>
          <p className="text-[#9ca3af]">
            People who need structure under pressure, not just headlines.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {audiences.map((a, i) => (
            <div
              key={i}
              className="bg-[#0f1117] border border-[#2d3148] rounded-2xl p-5 hover:border-amber-500/30 transition-colors flex sm:block items-start gap-4"
            >
              <span className="text-2xl shrink-0">{a.icon}</span>
              <div>
                <h3 className="text-[#f0f0f0] font-semibold sm:mt-3 mb-1">{a.title}</h3>
                <p className="text-[#9ca3af] text-sm leading-relaxed">{a.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
