import { FoundingAccessForm } from "@/components/FoundingAccessForm";

const includes = [
  "Full Bridge access",
  "Priority product updates",
  "Early visibility into upcoming features",
  "Founder notes and selected product insights",
  "Optional feedback channel for early adopters",
  "Future priority for deeper beta releases",
];

export function FoundingAccessSection() {
  return (
    <section className="py-24 bg-[#0d0f18]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left — copy */}
          <div>
            <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-4">
              Founding Access
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f0f0] leading-tight mb-4">
              For early serious users.
            </h2>
            <div className="w-12 h-1 bg-amber-500 rounded-full mb-6" />
            <p className="text-[#9ca3af] text-base leading-relaxed mb-6">
              ShockBridge Founding Access is a limited early layer for people who want closer
              visibility into the product as it evolves beyond the current intelligence engine.
            </p>
            <p className="text-[#9ca3af] text-base leading-relaxed mb-8">
              It is designed for users who see the direction, value the framework, and want
              earlier access to what comes next.
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

          {/* Right — form */}
          <div className="bg-[#0a0d16] border border-[#2d3148] rounded-2xl p-8">
            <p className="text-[#f0f0f0] font-semibold text-lg mb-2">Apply for Founding Access</p>
            <p className="text-[#6b7280] text-sm mb-6">
              Limited availability. I review each application personally.
            </p>
            <FoundingAccessForm />
          </div>

        </div>
      </div>
    </section>
  );
}
