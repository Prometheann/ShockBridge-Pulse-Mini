"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#0f1117]/90 backdrop-blur-sm border-b border-[#2d3148]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-[#f0f0f0] text-lg tracking-tight">
          ShockBridge{" "}
          <span className="text-amber-500">Pulse</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-[#9ca3af]">
          <Link href="#features" className="hover:text-[#f0f0f0] transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="hover:text-[#f0f0f0] transition-colors">
            Pricing
          </Link>
          <Link href="#faq" className="hover:text-[#f0f0f0] transition-colors">
            FAQ
          </Link>
          <Link href="#about" className="hover:text-[#f0f0f0] transition-colors">
            About
          </Link>
        </nav>

        <Link href="/generate">
          <Button size="sm">Get Creator</Button>
        </Link>
      </div>
    </header>
  );
}
