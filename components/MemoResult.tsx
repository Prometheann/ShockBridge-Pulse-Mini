"use client";

import { MemoOutput, Plan } from "@/types/memo";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface MemoResultProps {
  memo: MemoOutput;
  plan: Plan;
  onReset: () => void;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <p className="text-xs text-amber-500 uppercase tracking-wider mb-2">{title}</p>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-[#f0f0f0]">
          <span className="text-amber-500 shrink-0 mt-0.5">→</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  async function copy() {
    await navigator.clipboard.writeText(text);
  }
  return (
    <button
      onClick={copy}
      className="text-xs text-[#6b7280] hover:text-amber-500 transition-colors border border-[#2d3148] px-3 py-1 rounded-lg"
    >
      Copy {label}
    </button>
  );
}

export function MemoResult({ memo, plan, onReset }: MemoResultProps) {
  const isCreator = plan === "creator";

  function handlePrint() {
    window.print();
  }

  return (
    <div className="space-y-6" id="memo-output">
      {/* Title */}
      <div className="border-b border-[#2d3148] pb-5">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="accent">Scenario Note</Badge>
          <Badge variant="muted">{plan}</Badge>
        </div>
        <h2 className="text-xl font-bold text-[#f0f0f0] leading-snug">{memo.title}</h2>
        <p className="text-[#9ca3af] text-sm mt-3 leading-relaxed">{memo.summary}</p>
      </div>

      {/* Effects */}
      <div className="grid md:grid-cols-2 gap-6">
        <Section title="First-order effects">
          <BulletList items={memo.first_order_effects} />
        </Section>
        <Section title="Second-order effects">
          <BulletList items={memo.second_order_effects} />
        </Section>
      </div>

      {/* Paths */}
      <div className="grid md:grid-cols-2 gap-6">
        <Section title="Bullish path">
          <p className="text-sm text-[#f0f0f0] leading-relaxed">{memo.bullish_path}</p>
        </Section>
        <Section title="Bearish path">
          <p className="text-sm text-[#f0f0f0] leading-relaxed">{memo.bearish_path}</p>
        </Section>
      </div>

      {/* Uncertainties + Watch */}
      <div className="grid md:grid-cols-2 gap-6">
        <Section title="Key uncertainties">
          <BulletList items={memo.key_uncertainties} />
        </Section>
        <Section title="Watch next">
          <div className="flex flex-wrap gap-1.5">
            {memo.watch_next.map((item, i) => (
              <span
                key={i}
                className="text-xs bg-[#232636] text-[#9ca3af] border border-[#2d3148] px-2.5 py-1 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        </Section>
      </div>

      {/* Social posts — Creator only */}
      {isCreator ? (
        <div className="border-t border-[#2d3148] pt-6 space-y-5">
          <p className="text-xs text-amber-500 uppercase tracking-wider">
            Content outputs (Creator)
          </p>

          {/* X post */}
          <div className="bg-[#0f1117] rounded-xl p-4 border border-[#2d3148]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#9ca3af] font-medium">X post</span>
              <CopyButton text={memo.x_post} label="X post" />
            </div>
            <p className="text-sm text-[#f0f0f0] leading-relaxed">{memo.x_post}</p>
          </div>

          {/* LinkedIn */}
          <div className="bg-[#0f1117] rounded-xl p-4 border border-[#2d3148]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#9ca3af] font-medium">LinkedIn post</span>
              <CopyButton text={memo.linkedin_post} label="LinkedIn" />
            </div>
            <p className="text-sm text-[#f0f0f0] leading-relaxed">{memo.linkedin_post}</p>
          </div>

          {/* PDF */}
          <Button variant="secondary" size="sm" onClick={handlePrint}>
            Export PDF
          </Button>
        </div>
      ) : (
        <div className="border-t border-[#2d3148] pt-6">
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5 text-center">
            <p className="text-amber-400 font-medium mb-1">
              X post + LinkedIn post + PDF export
            </p>
            <p className="text-[#9ca3af] text-sm mb-4">
              Upgrade to Creator to unlock publish-ready social content and PDF export.
            </p>
            <Link href="#pricing">
              <Button size="sm">Get Creator — $19</Button>
            </Link>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <CopyButton
          text={`${memo.title}\n\n${memo.summary}\n\nFirst-order effects:\n${memo.first_order_effects.map((e) => `• ${e}`).join("\n")}`}
          label="memo"
        />
        <button
          onClick={onReset}
          className="text-xs text-[#6b7280] hover:text-[#f0f0f0] transition-colors"
        >
          ← Generate another
        </button>
      </div>
    </div>
  );
}
