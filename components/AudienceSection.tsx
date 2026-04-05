const audiences = [
  {
    icon: "📈",
    title: "Traders",
    description: "Get cleaner scenario framing when the market moves fast.",
  },
  {
    icon: "✍️",
    title: "Finance creators",
    description: "Turn one event into a usable angle, memo, and post.",
  },
  {
    icon: "📰",
    title: "Newsletter writers",
    description: "Reduce blank-page time and speed up your workflow.",
  },
  {
    icon: "🎓",
    title: "Analysts & students",
    description: "Organize cause and effect more clearly across markets.",
  },
];

export function AudienceSection() {
  return (
    <section className="py-20 bg-[#1a1d27] border-y border-[#2d3148]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#f0f0f0] mb-3">
            Built for people who think in markets.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {audiences.map((a) => (
            <div
              key={a.title}
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
