import Link from "next/link";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { PositioningStrip } from "@/components/PositioningStrip";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { WhatYouGetSection } from "@/components/WhatYouGetSection";
import { ExampleSection } from "@/components/ExampleSection";
import { WhyDifferentSection } from "@/components/WhyDifferentSection";
import { AudienceSection } from "@/components/AudienceSection";
import { PricingSection } from "@/components/PricingSection";
import { FoundingAccessSection } from "@/components/FoundingAccessSection";
import { ResearchSection } from "@/components/ResearchSection";
import { AnalystSection } from "@/components/AnalystSection";
import { AboutSection } from "@/components/AboutSection";
import { FaqSection } from "@/components/FaqSection";
import { FinalCTASection } from "@/components/FinalCTASection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0f1117]">
      <Header />

      {/* ── Live Research Banner ── */}
      <Link
        href="/research/hormuz"
        className="block w-full bg-amber-500/[0.07] border-b border-amber-500/[0.14] hover:bg-amber-500/[0.11] transition-colors"
      >
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-center gap-2.5 text-sm">
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
          </span>
          <span className="text-amber-400 font-semibold whitespace-nowrap">Live: Hormuz Crisis Research</span>
          <span className="text-[#6b7280] hidden sm:inline">—</span>
          <span className="text-[#d1d5db] hidden sm:inline">
            Oil is the Headline. Helium is the Hidden Bottleneck.
          </span>
          <span className="text-amber-400/70 ml-1">→</span>
        </div>
      </Link>

      <main>
        <HeroSection />
        <PositioningStrip />
        <HowItWorksSection />
        <WhatYouGetSection />
        <ExampleSection />
        <WhyDifferentSection />
        <AudienceSection />
        <PricingSection />
        <FoundingAccessSection />
        <ResearchSection />
        <AnalystSection />
        <AboutSection />
        <FaqSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
