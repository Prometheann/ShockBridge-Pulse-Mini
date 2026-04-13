import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ResearchSubscribeForm } from "@/components/ResearchSubscribeForm";

export const metadata: Metadata = {
  title: "From Spot to Stress — ShockBridge Pulse Research",
  description:
    "A working paper on multiscale contagion in Brazilian equities using Airy wavelets, regularized canonical dependence, and option-implied stress signals.",
};

export default function FromSpotToStressPage() {
  return (
    <div className="min-h-screen bg-[#0f1117]">
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-20">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#4b5563] mb-12">
          <Link href="/#research" className="hover:text-amber-500 transition-colors">
            Research
          </Link>
          <span>→</span>
          <span className="text-[#6b7280]">Working Papers</span>
          <span>→</span>
          <span className="text-[#9ca3af]">From Spot to Stress</span>
        </div>

        {/* Label */}
        <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-4">
          Working Paper · Research Note
        </p>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#f0f0f0] leading-tight mb-4">
          From Spot to Stress
        </h1>

        {/* Subtitle */}
        <p className="text-[#6b7280] text-base italic leading-relaxed mb-6">
          Multiscale Contagion in High-Dimensional Brazilian Equities with Airy Wavelets
          and Option-Implied Signals
        </p>

        {/* Status badge */}
        <div className="inline-flex items-center gap-2 text-xs font-medium text-[#6b7280] border border-[#2d3148] rounded-full px-3 py-1 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
          Working paper in progress
        </div>

        {/* Amber rule */}
        <div className="w-12 h-1 bg-amber-500 rounded-full mb-12" />

        {/* Body */}
        <div
          className="space-y-7 text-[#9ca3af] text-base leading-relaxed [text-align:justify]"
          style={{ hyphens: "auto" } as React.CSSProperties}
          lang="en"
        >
          <p>
            Contagion is usually recognized too late. Stress begins in fragments: one sector
            weakens, short-horizon dependence tightens, option-implied fear rises, and only later
            does the broader market start to look systemically unstable. By the time that full
            picture becomes visible, most of the transmission has already occurred.
          </p>
          <p>
            This working paper develops a high-dimensional multiscale framework to study that
            process in Brazilian equities. The model combines Airy wavelets, regularized canonical
            dependence, and Monte Carlo calibration to identify latent transmission channels across
            sectors and horizons. It also introduces an option-implied stress block designed to test
            whether derivatives begin to signal deterioration before spot-return networks fully
            reprice.
          </p>
          <p>
            The purpose of the framework is not to produce another market-stress indicator. It is
            to detect the hidden structure of contagion more precisely: where stress begins, how it
            spreads, at which horizons it intensifies, and whether the options market starts speaking
            before the cash market finishes reacting.
          </p>
          <p>
            In practical terms, the research sits at the intersection of financial econometrics,
            derivatives, and systemic risk. It is being developed as the first paper in a broader
            research program on multiscale transmission, option-implied stress, and the behavior of
            hedging structures under contagion regimes.
          </p>
        </div>

        {/* Two-column cards */}
        <div className="grid sm:grid-cols-2 gap-5 mt-14">
          <div className="border border-[#2d3148] rounded-2xl p-6 bg-[#0d0f1a]">
            <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">
              Why it matters
            </p>
            <p
              className="text-[#9ca3af] text-sm leading-relaxed [text-align:justify]"
              style={{ hyphens: "auto" } as React.CSSProperties}
              lang="en"
            >
              Most market commentary names stress after it is already visible. A stronger
              framework should separate ordinary interdependence from crisis-sensitive propagation
              and show whether contagion is emerging at short, medium, or longer horizons. That
              distinction matters for risk monitoring, portfolio construction, sector allocation,
              and forward-looking market intelligence.
            </p>
          </div>

          <div className="border border-[#2d3148] rounded-2xl p-6 bg-[#0d0f1a]">
            <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">
              What is new
            </p>
            <p
              className="text-[#9ca3af] text-sm leading-relaxed [text-align:justify]"
              style={{ hyphens: "auto" } as React.CSSProperties}
              lang="en"
            >
              The contribution is not just wavelets applied to finance. The framework connects
              multiscale localization, high-dimensional block dependence, and forward-looking
              option-implied stress within one contagion architecture, moving from descriptive
              turbulence to disciplined detection of hidden transmission channels.
            </p>
          </div>
        </div>

        {/* Current stage */}
        <div className="mt-10 border border-[#2d3148] rounded-2xl p-6 bg-[#0d0f1a]">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-4">
            Current stage
          </p>
          <ul className="space-y-3">
            {[
              { label: "Conceptual framework", status: "complete" },
              { label: "Literature architecture and methodological design", status: "complete" },
              { label: "Data construction", status: "active" },
              { label: "Empirical implementation", status: "active" },
              { label: "Monte Carlo calibration and testing", status: "pending" },
              { label: "Paper draft", status: "pending" },
            ].map((item) => (
              <li key={item.label} className="flex items-center gap-3 text-sm">
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    item.status === "complete"
                      ? "bg-amber-500"
                      : item.status === "active"
                      ? "bg-amber-500/40"
                      : "bg-[#2d3148]"
                  }`}
                />
                <span
                  className={
                    item.status === "complete"
                      ? "text-[#d1d5db]"
                      : item.status === "active"
                      ? "text-[#9ca3af]"
                      : "text-[#4b5563]"
                  }
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Subscribe block */}
        <div className="mt-14 border border-[#2d3148] rounded-2xl p-8 bg-[#0d0f1a]">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">
            Follow this research
          </p>
          <h3 className="text-lg font-bold text-[#f0f0f0] mb-2">
            Get notified when the paper is released.
          </h3>
          <p className="text-[#6b7280] text-sm leading-relaxed mb-6">
            Leave your email and I'll send one notification when the working paper is published.
            No newsletter. No recurring emails.
          </p>
          <ResearchSubscribeForm />
        </div>

        {/* Bottom rule + tagline */}
        <div className="mt-16 pt-8 border-t border-[#1e2130]">
          <p className="text-[#4b5563] text-xs text-center">
            ShockBridge Pulse Research — market structure, stress transmission, and financial intelligence.
          </p>
          <p className="text-[#4b5563] text-xs text-center mt-2">
            Market-interpretation and research tool only. Not financial advice.
          </p>
        </div>

      </main>

      <Footer />
    </div>
  );
}
