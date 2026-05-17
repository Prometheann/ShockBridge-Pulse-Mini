"use client";

import { useState, useEffect } from "react";
import { MemoInput, MemoOutput, Plan } from "@/types/memo";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
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
      <p className="text-xs text-amber-500 uppercase tracking-wider mb-2 font-semibold pdf-section-label">{title}</p>
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

function buildMemoText(memo: MemoOutput, isBasicOrCreator: boolean): string {
  const parts: string[] = [];
  parts.push(`${memo.title}\n\n${memo.summary}`);
  if (memo.first_order_effects?.length)
    parts.push(`First-order effects:\n${memo.first_order_effects.map(e => `• ${e}`).join("\n")}`);
  if (isBasicOrCreator && memo.second_order_effects?.length)
    parts.push(`Second-order effects:\n${memo.second_order_effects.map(e => `• ${e}`).join("\n")}`);
  if (isBasicOrCreator && memo.bullish_path)
    parts.push(`Bullish path:\n${memo.bullish_path}`);
  if (isBasicOrCreator && memo.bearish_path)
    parts.push(`Bearish path:\n${memo.bearish_path}`);
  if (isBasicOrCreator && memo.key_uncertainties?.length)
    parts.push(`Key uncertainties:\n${memo.key_uncertainties.map(e => `• ${e}`).join("\n")}`);
  if (memo.watch_next?.length)
    parts.push(`Watch next:\n${memo.watch_next.map(e => `• ${e}`).join("\n")}`);
  return parts.join("\n\n");
}

function CopyFullMemo({ memo, isBasicOrCreator, label }: { memo: MemoOutput; isBasicOrCreator: boolean; label: string }) {
  const [copied, setCopied] = useState(false);
  async function handleCopy() {
    await navigator.clipboard.writeText(buildMemoText(memo, isBasicOrCreator));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <button
      onClick={handleCopy}
      className="w-full py-3 rounded-xl border border-amber-500/40 bg-amber-500/5 text-amber-400 font-semibold text-sm tracking-wide hover:bg-amber-500/10 hover:border-amber-500/70 transition-all"
    >
      {copied ? "✓ Copied to clipboard" : label}
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
        <br className="pdf-title-break" />
        <span className="pdf-title-asset">{asset}</span>
        <br className="pdf-title-break" />
        <span className="pdf-title-bridge">{bridge}</span>
        <br className="pdf-title-break" />
        <span className="pdf-title-sub">{theme}</span>
      </>
    );
  }
  // Fallback: split at " · "
  const parts = title.split(" · ");
  if (parts.length < 2) return <>{title}</>;
  return (
    <>
      <span className="pdf-title-hook">{parts[0]}</span>
      <br className="pdf-title-break" />
      <span className="pdf-title-bridge">{parts[1]}</span>
      {parts[2] && <><br className="pdf-title-break" /><span className="pdf-title-sub">{parts[2]}</span></>}
    </>
  );
}

export function MemoResult({ memo, plan, input, onReset }: MemoResultProps) {
  const isCreator = plan === "creator";
  const isBasicOrCreator = plan === "basic" || plan === "creator";

  const printDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  function handlePrint() {
    const count = Math.min(parseInt(localStorage.getItem("sbp_memo_count") || "0") + 1, 15);
    localStorage.setItem("sbp_memo_count", String(count));
    const filename = `ShockBridge-Pulse-Brief-${String(count).padStart(2, "0")}`;
    const printData = { memo, input, plan, date: printDate, filename };
    sessionStorage.setItem("sbp_print_data", JSON.stringify(printData));
    window.open("/pdf-print", "_blank");
  }

  return (
    <div id="memo-output">

      {/* ── PDF Running header — hidden on screen, fixed top every print page ── */}
      <div id="pdf-run-header" aria-hidden="true">
        <span id="pdf-run-header-text">ShockBridge Pulse · Scenario Brief</span>
      </div>

      {/* ── PDF Running footer — hidden on screen, fixed bottom every print page ── */}
      <div id="pdf-run-footer" aria-hidden="true">
        <span id="pdf-run-footer-disc">ShockBridge Pulse · shockbridgepulse.com · Not financial advice</span>
        <span id="pdf-run-footer-page" />
      </div>

      {/* ── PDF Cover Page — hidden on screen, page 1 in print ── */}
      <div id="pdf-cover">
        <div id="pdf-cover-accent" />
        <div id="pdf-cover-inner">
          {/* Full logo — transparent background, large */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-transparent.png" alt="ShockBridge Pulse" id="pdf-cover-logo-icon" />
          <div id="pdf-cover-rule" />
          <p id="pdf-cover-type">Scenario Brief</p>
          <p id="pdf-cover-plan">Analyst</p>
          <p id="pdf-cover-date">{printDate}</p>
          <span id="pdf-cover-creator-gap" />
          <p id="pdf-cover-creator">Created by Rodolfo Pereira</p>
        </div>
        <p id="pdf-cover-disclaimer">For research and writing purposes only. Not financial advice.</p>
      </div>

      {/* ── Memo content — screen view + pages 2+ in print ── */}
      <div id="memo-content" className="space-y-6">

        {/* Input framework — PDF only, top of page 2 */}
        {input && (
          <div id="pdf-input-framework">
            <p className="pdf-if-plan">{plan.toUpperCase()}</p>
            <div className="pdf-if-gap-lg" />
            <p className="pdf-if-section">Scenario</p>
            <div className="pdf-if-gap-sm" />
            <div className="pdf-if-fields">
              <div className="pdf-if-row"><span className="pdf-if-label">Event type</span><span className="pdf-if-value">{input.eventType}</span></div>
              <div className="pdf-if-row"><span className="pdf-if-label">Region</span><span className="pdf-if-value">{input.region}</span></div>
              <div className="pdf-if-row"><span className="pdf-if-label">Sector or asset</span><span className="pdf-if-value">{input.sectorAsset}</span></div>
              <div className="pdf-if-row"><span className="pdf-if-label">Horizon</span><span className="pdf-if-value">{input.horizon}</span></div>
              <div className="pdf-if-row"><span className="pdf-if-label">Tone</span><span className="pdf-if-value">{input.tone}</span></div>
              {input.optionalNote && (
                <div className="pdf-if-row"><span className="pdf-if-label">Optional thesis / context</span><span className="pdf-if-value">{input.optionalNote}</span></div>
              )}
            </div>
            <div className="pdf-if-gap-xl" />
          </div>
        )}

        {/* Header — page 3 in print */}
        <div id="pdf-section-title" className="border-b border-[#2d3148] pb-5">
          <div id="pdf-badge-row" className="flex items-center gap-2 mb-3">
            <Badge variant="accent">Scenario Brief</Badge>
            <Badge variant="muted">{{ free: "Free", basic: "Snapshot", creator: "Bridge" }[plan]}</Badge>
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

        {/* First-order effects — page 4 in print */}
        <div className="pdf-page-section">
          <Section title="First-order effects">
            <BulletList items={memo.first_order_effects} />
          </Section>
        </div>

        {/* Basic + Creator: full memo */}
        {isBasicOrCreator && memo.second_order_effects && (
          <div className="pdf-page-section">
            <Section title="Second-order effects">
              <BulletList items={memo.second_order_effects} />
            </Section>
          </div>
        )}

        {isBasicOrCreator && memo.bullish_path && memo.bearish_path && (
          <div id="pdf-paths">
            <div className="pdf-page-section">
              <Section title="Bullish path">
                <p className="text-sm text-[#f0f0f0] leading-relaxed sm:[text-align:justify] [hyphens:auto]">{memo.bullish_path}</p>
              </Section>
            </div>
            <div className="pdf-page-section">
              <Section title="Bearish path">
                <p className="text-sm text-[#f0f0f0] leading-relaxed sm:[text-align:justify] [hyphens:auto]">{memo.bearish_path}</p>
              </Section>
            </div>
          </div>
        )}

        {isBasicOrCreator && memo.key_uncertainties && (
          <div className="pdf-page-section">
            <Section title="Key uncertainties">
              <BulletList items={memo.key_uncertainties} />
            </Section>
          </div>
        )}

        {/* Watch next — own page */}
        <div className="pdf-page-section">
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

        {/* Creator: Beta Research Desk Methodology */}
        {isCreator && memo.methodology_frame && (
          <>
            <div className="pdf-page-section">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs text-amber-500 uppercase tracking-wider font-semibold pdf-section-label">
                    Research Desk
                  </p>
                  <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider no-print">
                    Beta
                  </span>
                </div>
                <p className="text-xs text-[#9ca3af] uppercase tracking-wider font-medium mb-4">The Hidden Variable</p>
                {memo.methodology_frame.split("\n\n").map((p, i) => (
                  <p key={i} className="text-sm text-[#f0f0f0] leading-relaxed mb-3 sm:[text-align:justify] [hyphens:auto]">{p}</p>
                ))}
              </div>
            </div>
            {memo.hidden_variable_analysis && memo.hidden_variable_analysis.length > 0 && (
              <div className="pdf-page-section">
                <Section title="Research Desk · Findings">
                  <BulletList items={memo.hidden_variable_analysis} />
                </Section>
              </div>
            )}
            {/* Closing text — PDF only */}
            <p id="pdf-closing-text">ShockBridge Pulse · From market shock to clean signal</p>
            {/* PDF export */}
            <Button variant="secondary" size="lg" onClick={handlePrint} className="no-print w-full mt-4">
              Export PDF Brief
            </Button>
          </>
        )}

        {/* Creator: legacy social posts (backward compat for old memos) */}
        {isCreator && !memo.methodology_frame && memo.x_post && memo.linkedin_post && (
          <div className="pdf-page-section space-y-5" id="pdf-social-section">
            <p className="text-xs text-amber-500 uppercase tracking-wider font-semibold pdf-section-label">
              Content outputs: Social
            </p>
            <div className="bg-[#0f1117] rounded-xl p-4 border border-[#2d3148]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#9ca3af] font-medium uppercase tracking-wider">X Brief</span>
                <CopyButton text={memo.x_post} label="X post" />
              </div>
              <p className="text-sm text-[#f0f0f0] leading-relaxed whitespace-pre-line sm:[text-align:justify] [hyphens:auto]">{memo.x_post}</p>
              <p className="text-xs text-[#4b5563] mt-2">{memo.x_post.length} / 280 characters</p>
            </div>
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
            <p id="pdf-closing-text">ShockBridge Pulse · From market shock to clean signal</p>
            <Button variant="secondary" size="lg" onClick={handlePrint} className="no-print w-full">
              Export PDF Brief
            </Button>
          </div>
        )}

        {/* Analyst Report CTA — Bridge vs Free/Snapshot */}
        {isCreator ? (
          <div className="border-t border-[#2d3148] pt-6">
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5 text-center">
              <p className="text-amber-400 font-bold mb-1">
                Have a specific situation that needs dedicated analysis?
              </p>
              <p className="text-[#9ca3af] text-sm mb-4">
                The <span className="font-bold text-[#f0f0f0]">Analyst Report</span> delivers customized intelligence built around your portfolio, business, or real exposure. Founder-led. Starting at $199.
              </p>
              <a href="mailto:help@shockbridgepulse.com?subject=Analyst Report Request">
                <Button size="sm">Request Analyst Report</Button>
              </a>
            </div>
          </div>
        ) : (
          <div className="border-t border-[#2d3148] pt-6">
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5 text-center">
              <p className="text-amber-400 font-bold mb-1">
                This brief is general. Your situation isn't.
              </p>
              <p className="text-[#9ca3af] text-sm mb-4">
                The <span className="font-bold text-[#f0f0f0]">Analyst Report</span> applies ShockBridge intelligence directly to your business, portfolio, or specific exposure. Custom. Founder-led. Starting at $199.
              </p>
              <a href="mailto:help@shockbridgepulse.com?subject=Analyst Report Request">
                <Button size="sm">Request Analyst Report</Button>
              </a>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="pt-4 no-print space-y-3">
          {plan === "creator" ? (
            /* Bridge: small secondary copy button — PDF is the primary output */
            <CopyButton text={buildMemoText(memo, isBasicOrCreator)} label="brief" />
          ) : (
            /* Free & Snapshot: full-width amber button — only way to get the brief */
            <CopyFullMemo
              memo={memo}
              isBasicOrCreator={isBasicOrCreator}
              label={plan === "free" ? "Copy Brief" : "Copy Full Brief"}
            />
          )}
          <button
            onClick={onReset}
            className="text-xs text-[#6b7280] hover:text-[#f0f0f0] transition-colors block"
          >
            ← Generate another
          </button>
        </div>

      </div>
    </div>
  );
}
