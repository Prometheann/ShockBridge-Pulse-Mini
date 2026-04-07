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
        <div className="space-y-6 text-[#9ca3af] text-base leading-relaxed sm:[text-align:justify]"
          style={{ hyphens: "auto", wordBreak: "break-word" } as React.CSSProperties}
          lang="en">
          <p>
            ShockBridge Pulse was built out of a simple frustration: when a major macro event
            hits (a central bank surprise, an earnings shock, a geopolitical rupture), most tools
            give you headlines. What you actually need is structure. You need to know what breaks
            first, what follows, and where the real exposure sits.
          </p>
          <p>
            This tool does that. You enter the event. The AI maps the transmission chain: first-order
            price effects, second-order spillovers, the bullish interpretation, the bearish one, and
            what you should be watching over the next two to four weeks. The output reads like a
            scenario note from a senior analyst, not like a search engine summary.
          </p>
          <p>
            The three-tier model reflects how macro thinking actually scales. The{" "}
            <span className="text-[#d1d5db] font-medium">Free snapshot</span> gives you a fast
            orientation. The{" "}
            <span className="text-[#d1d5db] font-medium">Basic memo</span> gives you the full
            structured analysis: effects, paths, uncertainties, watchpoints. The{" "}
            <span className="text-amber-400 font-medium">Creator memo</span> goes deeper into causal
            chains with mechanisms, multi-paragraph scenario paths, and publication-ready social
            content for X and LinkedIn, formatted, opinionated, and ready to share.
          </p>
          <p>
            ShockBridge Pulse is a research and writing tool. It accelerates thinking, not replaces
            it. Everything it produces is a starting point, yours to challenge, refine, and act on.
          </p>
        </div>

        {/* Stat strip */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-6">
          {[
            { value: "3 plans", label: "Free · Basic · Creator" },
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
        <p className="mt-10 text-[#4b5563] text-xs leading-relaxed border-t border-[#1e2130] pt-6 sm:[text-align:justify]"
          style={{ hyphens: "auto", wordBreak: "break-word" } as React.CSSProperties}
          lang="en">
          Research and writing tool only. Not financial advice. No positions are recommended.
          All outputs should be verified before any investment decision.
        </p>
      </div>
    </section>
  );
}
