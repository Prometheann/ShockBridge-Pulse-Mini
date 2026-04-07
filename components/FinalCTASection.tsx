import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function FinalCTASection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#f0f0f0] mb-4">
          Stop staring at noise.
          <br />
          Start reading signal.
        </h2>
        <p className="text-[#9ca3af] text-lg mb-8">
          ShockBridge Pulse helps you turn market movement into usable structure, faster.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/generate" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto">Get Creator — $19</Button>
          </Link>
          <Link href="/generate" className="w-full sm:w-auto">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              Try a Sample Free
            </Button>
          </Link>
        </div>
        <p className="mt-6 text-xs text-[#4b5563]">From market shock to clean signal.</p>
      </div>
    </section>
  );
}
