"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item, i) => (
        <div
          key={i}
          className="border border-[#2d3148] rounded-xl overflow-hidden"
        >
          <button
            className="w-full flex justify-between items-center px-6 py-4 text-left text-[#f0f0f0] font-medium hover:bg-[#1a1d27] transition-colors"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span>{item.question}</span>
            <span className="ml-4 text-amber-500 text-xl leading-none">
              {openIndex === i ? "−" : "+"}
            </span>
          </button>
          {openIndex === i && (
            <div className="px-6 pb-4 text-[#9ca3af] text-sm leading-relaxed">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
