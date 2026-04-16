"use client";

import { MemoInput, MemoOutput, Plan } from "@/types/memo";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface MemoResultProps {
  memo: MemoOutput;
  plan: Plan;
  input?: MemoInput;
  onReset: () => void;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <p className="text-xs text-amber-500 uppercase tracking-wider mb-2 font-semibold">{title}</p>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="text-amber-500 shrink-0 mt-0.5">→</span>
          <span className="text-sm text-[#f0f0f0] leading-relaxed flex-1 memo-text">{item}</span>
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

/** Four-part title: hook → asset → bridge → theme */
function PrintTitle({ title, hook, asset, bridge, theme }: {
  title: string;
  hook?: string;
  asset?: string;
  bridge?: string;
  theme?: string;
}) {
  if (hook && asset && bridge && theme) {
    return (
      <>
        <span className="pdf-title-hook">{hook}</span>
        <span className="pdf-title-asset">{asset}</span>
        <span className="pdf-title-bridge">{bridge}</span>
        <span className="pdf-title-sub">{theme}</span>
      </>
    );
  }
  const parts = title.split(" — ");
  if (parts.length < 2) return <>{title}</>;
  return (
    <>
      <span className="pdf-title-hook">{parts[0]}</span>
      <span className="pdf-title-bridge">{parts[1]}</span>
      {parts[2] && <span className="pdf-title-sub">{parts[2]}</span>}
    </>
  );
}

export function MemoResult({ memo, plan, input, onReset }: MemoResultProps) {
  const isCreator = plan === "creator";
  const isBasicOrCreator = plan === "basic" || plan === "creator";

  return (
    <div id="memo-output">
      <div className="space-y-6">

        {/* Header */}
        <div className="border-b border-[#2d3148] pb-5">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="accent">Scenario Note</Badge>
            <Badge variant="muted">{{ free: "Free", basic: "Bridge", creator: "Analyst" }[plan]}</Badge>
          </div>
          <h2 className="text-xl font-bold text-[#f0f0f0] leading-snug">
            <PrintTitle
              title={memo.title}
              hook={memo.title_hook}
              asset={memo.title_asset}
              bridge={memo.title_bridge}
              theme={memo.title_theme}
            />
          </h2>
          <p className="text-[#9ca3af] text-sm mt-3 leading-relaxed sm:[text-align:justify] [hyphens:auto]">{memo.summary}</p>
        </div>

        {/* First-order effects */}
        <div>
          <Section title="First-order effects">
            <BulletList items={memo.first_order_effects} />
          </Section>
        </div>

        {/* Bridge + Analyst: full memo */}
        {isBasicOrCreator && memo.second_order_effects && (
          <div>
            <Section title="Second-order effects">
              <BulletList items={memo.second_order_effects} />
            </Section>
          </div>
        )}

        {isBasicOrCreator && memo.bullish_path && memo.bearish_path && (
          <div>
            <div>
              <Section title="Bullish path">
                <p className="text-sm text-[#f0f0f0] leading-relaxed sm:[text-align:justify] [hyphens:auto]">{memo.bullish_path}</p>
              </Section>
            </div>
            <div>
              <Section title="Bearish path">
                <p className="text-sm text-[#f0f0f0] leading-relaxed sm:[text-align:justify] [hyphens:auto]">{memo.bearish_path}</p>
              </Section>
            </div>
          </div>
        )}

        {isBasicOrCreator && memo.key_uncertainties && (
          <div>
            <Section title="Key uncertainties">
              <BulletList items={memo.key_uncertainties} />
            </Section>
          </div>
        )}

        {/* Watch next */}
        <div>
          <Section title="Watch next">
            {memo.watch_next.some((item) => item.length > 40) ? (
              <BulletList items={memo.watch_next} />
            ) : (
              <div>
                {memo.watch_next.map((item, i) => (
                  <span
                    key={i}
                    className="inline-block text-xs bg-[#232636] text-[#9ca3af] border border-[#2d3148] px-2.5 py-1 rounded-full mr-1.5 mb-1.5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </Section>
        </div>

        {/* Analyst: X brief + LinkedIn brief */}
        {isCreator && memo.x_post && memo.linkedin_post ? (
          <div className="space-y-5">
            <p className="text-xs text-amber-500 uppercase tracking-wider font-semibold">
              Briefing outputs
            </p>

            {/* X post */}
            <div className="bg-[#0f1117] rounded-xl p-4 border border-[#2d3148]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#9ca3af] font-medium uppercase tracking-wider">X Brief</span>
                <CopyButton text={memo.x_post} label="X post" />
              </div>
              <p className="text-sm text-[#f0f0f0] leading-relaxed whitespace-pre-line sm:[text-align:justify] [hyphens:auto]">{memo.x_post}</p>
              <p className="text-xs text-[#4b5563] mt-2">{memo.x_post.length} / 280 characters</p>
            </div>

            {/* LinkedIn */}
            <div className="bg-[#0f1117] rounded-xl p-4 border border-[#2d3148]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#9ca3af] font-medium uppercase tracking-wider">LinkedIn Brief</span>
                <CopyButton text={memo.linkedin_post} label="LinkedIn" />
              </div>
              {memo.linkedin_post_headline && (
                <p className="text-sm font-bold text-[#f0f0f0] mb-2 leading-snug">{memo.linkedin_post_headline}</p>
              )}
              <p className="text-sm text-[#f0f0f0] leading-relaxed whitespace-pre-line sm:[text-align:justify] [hyphens:auto]">
                {memo.linkedin_post.split("\n\n").filter(p => !p.toLowerCase().includes("from market shock to clean signal")).join("\n\n")}
              </p>
            </div>
          </div>
        ) : !isCreator ? (
          <div className="border-t border-[#2d3148] pt-6">
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5 text-center">
              <p className="text-amber-400 font-bold mb-1">
                In-Depth Market Intelligence Output
              </p>
              <p className="text-[#9ca3af] text-sm mb-4">
                Upgrade to <span className="font-bold text-[#f0f0f0]">Analyst</span> for deeper transmission analysis, sharper scenario framing, and stronger decision support.
              </p>
              <Link href="/#pricing">
                <Button size="sm">Get Analyst</Button>
              </Link>
            </div>
          </div>
        ) : null}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <CopyButton
            text={`${memo.title}\n\n${memo.summary}${memo.first_order_effects ? `\n\nFirst-order effects:\n${memo.first_order_effects.map((e) => `• ${e}`).join("\n")}` : ""}`}
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
    </div>
  );
}
