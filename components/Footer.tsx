import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#2d3148] py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <p className="font-bold text-[#f0f0f0]">
            ShockBridge <span className="text-amber-500">Pulse</span> Mini
          </p>
          <p className="text-[#6b7280] text-sm mt-1">
            Structured market logic for people who move fast.
          </p>
          <p className="text-[#4b5563] text-xs mt-3">
            Research and writing tool only. Not financial advice.
          </p>
        </div>

        <nav className="flex gap-6 text-sm text-[#6b7280]">
          <Link href="#pricing" className="hover:text-[#f0f0f0] transition-colors">
            Pricing
          </Link>
          <Link href="#faq" className="hover:text-[#f0f0f0] transition-colors">
            FAQ
          </Link>
          <Link href="/generate" className="hover:text-[#f0f0f0] transition-colors">
            Generate
          </Link>
        </nav>
      </div>
    </footer>
  );
}
