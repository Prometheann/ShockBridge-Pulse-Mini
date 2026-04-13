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
import { AboutSection } from "@/components/AboutSection";
import { FaqSection } from "@/components/FaqSection";
import { FinalCTASection } from "@/components/FinalCTASection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0f1117]">
      <Header />
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
        <AboutSection />
        <FaqSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
