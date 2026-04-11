import Link from "next/link";
import { ResearchSubscribeForm } from "@/components/ResearchSubscribeForm";

export function ResearchSection() {
  return (
    <section id="research" className="py-24 bg-[#0a0d16]">
      <div className="max-w-4xl mx-auto px-6">

        {/* Label */}
        <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-4 text-center">
          Research
        </p>

        {/* Headline */}
        <h2
          className="text-3xl sm:text-4xl font-bold text-[#f0f0f0] leading-tight mb-6 text-center"
          style={{ textWrap: "balance" } as object}
        >
          Research the chain before contagion becomes obvious.
        </h2>

        {/* Divider */}
        <div className="w-12 h-1 bg-amber-500 rounded-full mb-10 mx-auto" />

        {/* Intro */}
        <p
          className="text-[#9ca3af] text-base leading-relaxed mb-12 text-center max-w-2xl mx-auto [text-align:justify] sm:text-center"
          style={{ hyphens: "auto" } as object}
          lang="en"
        >
          ShockBridge Pulse goes one layer deeper: from structured market logic into original
          research on contagion, option-implied stress, and hidden transmission across financial
          markets.
        </p>

        {/* Featured paper card */}
        <div className="border border-[#2d3148] rounded-2xl p-8 bg-[#0d0f1a]">

          {/* Card label */}
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">
            Featured Working Paper
          </p>

          {/* Paper title */}
          <h3 className="text-xl sm:text-2xl font-bold text-[#f0f0f0] leading-snug mb-2">
            From Spot to Stress
          </h3>

          {/* Subtitle */}
          <p className="text-[#6b7280] text-sm italic mb-5 leading-relaxed">
            Multiscale Contagion in High-Dimensional Brazilian Equities with Airy Wavelets
            and Option-Implied Signals
          </p>

          {/* Amber rule */}
          <div className="w-8 h-0.5 bg-amber-500 mb-5" />

          {/* Summary */}
          <p
            className="text-[#9ca3af] text-base leading-relaxed mb-6 [text-align:justify]"
            style={{ hyphens: "auto" } as object}
            lang="en"
          >
            This working paper studies how stress spreads across Brazilian equities before
            broad contagion becomes obvious. It combines Airy wavelets, regularized canonical
            dependence, Monte Carlo calibration, and option-implied stress signals to map latent
            transmission channels across sectors and horizons — asking whether derivatives begin
            signaling deterioration before spot-return networks fully reprice.
          </p>

          {/* Status + CTA row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <span className="inline-flex items-center gap-2 text-xs font-medium text-[#6b7280] border border-[#2d3148] rounded-full px-3 py-1 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
              Working paper in progress
            </span>

            <Link
              href="/research/from-spot-to-stress"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-500 hover:text-amber-400 transition-colors group"
            >
              See the Research Note
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          </div>
        </div>

        {/* Subscribe strip */}
        <div className="mt-8 border-t border-[#2d3148] pt-8">
          <p className="text-[#4b5563] text-xs text-center mb-4">
            Get notified when the paper is released. One email, no spam.
          </p>
          <div className="max-w-md mx-auto">
            <ResearchSubscribeForm />
          </div>
        </div>

      </div>
    </section>
  );
}
