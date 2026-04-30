import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MockResultCard } from "@/components/MockResultCard";

export function HeroSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-12 pb-10 md:pt-20 md:pb-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <p className="text-amber-500 text-sm font-medium tracking-wider uppercase mb-4">
            Macro transmission intelligence
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f0] leading-tight mb-6">
            From market shock
            <br />
            to transmission
            <br />
            to signal.
          </h1>
          <p className="text-[#9ca3af] text-lg leading-relaxed mb-8">
            ShockBridge Pulse maps how macro events, geopolitical shocks, and market stress
            transmit across exposures — and turns that into structured Intelligence Briefs
            for faster, clearer decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/generate" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">Get Snapshot</Button>
            </Link>
            <Link href="#pricing" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Join Bridge
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-xs text-[#6b7280]">
            Built for investors, advisors, treasury thinkers, and serious market operators.
          </p>
        </div>

        {/* Right — mock result card */}
        <div className="lg:flex justify-end hidden">
          <div className="w-full max-w-sm">
            <MockResultCard />
          </div>
        </div>
      </div>
    </section>
  );
}
