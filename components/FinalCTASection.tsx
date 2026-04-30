import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function FinalCTASection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#f0f0f0] mb-4">
          Structured intelligence for what happens next.
        </h2>
        <p className="text-[#9ca3af] text-lg mb-8">
          Whether a macro shock, geopolitical rupture, or sudden market stress —
          ShockBridge Pulse turns scattered reaction into a disciplined transmission view.
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
        <p className="mt-6 text-xs text-[#4b5563]">From market shock to transmission to signal.</p>
      </div>
    </section>
  );
}
