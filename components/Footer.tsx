import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-[#2d3148] py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Image src="/logo-icon.png" alt="ShockBridge Pulse" width={32} height={32} className="h-8 w-8 object-contain" style={{ filter: "brightness(0) saturate(100%) invert(68%) sepia(74%) saturate(500%) hue-rotate(2deg) brightness(103%) contrast(98%)" }} />
              <p className="font-bold text-[#f0f0f0]">
                ShockBridge{" "}<span className="text-amber-500">Pulse</span>
              </p>
            </div>
            <p className="text-[#6b7280] text-sm mt-1">
              Structured market logic for fast movers.
            </p>
            <p className="text-[#4b5563] text-xs mt-3">
              Research and writing tool only. Not financial advice.
            </p>
          </div>

          <nav className="flex gap-6 text-sm text-[#6b7280]">
            <Link href="/#pricing" className="hover:text-[#f0f0f0] transition-colors">
              Pricing
            </Link>
            <Link href="/#faq" className="hover:text-[#f0f0f0] transition-colors">
              FAQ
            </Link>
            <Link href="/#about" className="hover:text-[#f0f0f0] transition-colors">
              About
            </Link>
            <Link href="/research/from-spot-to-stress" className="hover:text-[#f0f0f0] transition-colors">
              Research
            </Link>
            <a href="mailto:help@shockbridgepulse.com" className="hover:text-[#f0f0f0] transition-colors">
              Help
            </a>
            <Link href="/generate" className="hover:text-[#f0f0f0] transition-colors">
              Generate
            </Link>
          </nav>
        </div>

        <div className="border-t border-[#1e2130] pt-6">
          <p className="text-[#4b5563] text-xs">
            © ShockBridge Pulse 2026. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
