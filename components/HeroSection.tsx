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
            Structured market logic
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f0] leading-tight mb-6">
            From market shock
            <br />
            to clean signal.
          </h1>
          <p className="text-[#9ca3af] text-lg leading-relaxed mb-8 [text-align:justify]"
            style={{ hyphens: "auto", wordBreak: "break-word" } as React.CSSProperties}
            lang="en">
            Turn a macro event, earnings surprise, or market shock into a sharp
            analyst-style memo in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/generate" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">Generate a Sample</Button>
            </Link>
            <Link href="#pricing" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Get Creator — $19
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-xs text-[#6b7280]">
            Built for traders, creators, analysts, and serious market thinkers.
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
