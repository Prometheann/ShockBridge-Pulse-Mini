"use client";

import { useEffect, useState } from "react";
import { MemoOutput, MemoInput, Plan } from "@/types/memo";

interface PrintData {
  memo: MemoOutput;
  input: MemoInput;
  plan: Plan;
  date: string;
  filename?: string;
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { background: #555; min-width: 210mm; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .page {
    width: 210mm; height: 297mm; background: #0a0f1e;
    margin: 12px auto; position: relative; overflow: hidden;
    font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
    color: #f1f5f9; font-size: 10.5pt; line-height: 1.75;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  @media print {
    @page { size: A4 portrait; margin: 0; }
    @page :first { margin: 0; }
    html, body { background: #0a0f1e !important; }
    .page { margin: 0 !important; page-break-after: always; page-break-inside: avoid; }
    .page:last-child { page-break-after: auto; }
    .cover { margin: 0 !important; }
    .no-print { display: none !important; }
  }
  .page-header {
    position: absolute; top: 0; left: 0; right: 0; height: 14mm;
    background: #0a0f1e; border-bottom: 2px solid #f59e0b;
    display: flex; align-items: center; justify-content: center;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  .page-header span {
    font-size: 6.5pt; font-weight: 700; letter-spacing: 0.24em;
    color: #f59e0b; text-transform: uppercase;
  }
  .page-footer {
    position: absolute; bottom: 0; left: 0; right: 0; height: 12mm;
    background: #0a0f1e; border-top: 2px solid #f59e0b;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 24mm; -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  .page-footer .disc { font-size: 7pt; color: #475569; }
  .page-footer .num { font-size: 10pt; font-weight: 700; color: #f59e0b; }
  .content {
    position: absolute;
    top: 14mm; bottom: 12mm; left: 0; right: 0;
    overflow: hidden;
    padding: 3mm 24mm 18mm 24mm;
  }
  .content-top { padding-top: 8mm; }
  .section-label {
    color: #f59e0b; background: #0f172a; font-size: 11pt; font-weight: 800;
    letter-spacing: 0.26em; text-transform: uppercase; display: block;
    margin: 0 -24mm 40px -24mm; padding: 12px 24mm;
    border-bottom: 2px solid #f59e0b;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  ul { padding: 0; list-style: none; }
  li {
    display: flex; gap: 12px; padding: 10px 0; border-bottom: 1px solid #1a2540;
    font-size: 12pt; line-height: 1.8; color: #cbd5e1; text-align: justify;
    hyphens: auto; word-break: normal; overflow-wrap: normal;
  }
  li:last-child { border-bottom: none; }
  li .arrow { color: #f59e0b; font-weight: 700; flex-shrink: 0; margin-top: 2px; }
  .body-p {
    color: #cbd5e1; font-size: 12pt; line-height: 1.9;
    text-align: justify; hyphens: auto; word-break: normal; overflow-wrap: normal;
  }
  .body-p + .body-p { margin-top: 20px; }
  .summary {
    font-size: 12pt; color: #94a3b8; line-height: 1.95; text-align: justify;
    hyphens: auto; word-break: normal; overflow-wrap: normal;
    border-left: 3px solid #f59e0b; padding-left: 14px;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  .summary + .summary { margin-top: 20px; }
  .t-hook  { display: block; color: #f59e0b; font-size: 17pt; font-weight: 800; text-transform: uppercase; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .t-asset { display: block; color: #f59e0b; font-size: 22pt; font-weight: 800; text-transform: uppercase; margin-top: 12px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .t-bridge{ display: block; color: #f59e0b; font-size: 13pt; font-weight: 600; opacity: 0.85; margin-top: 10px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .t-sub   { display: block; color: #f8fafc; font-size: 15pt; font-weight: 800; margin-top: 10px; margin-bottom: 14px; }
  .if-plan    { font-size: 22pt; font-weight: 800; color: #f59e0b; letter-spacing: 0.18em; text-transform: uppercase; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .if-gap-lg  { height: 32px; display: block; }
  .if-section { font-size: 18pt; font-weight: 800; color: #f59e0b; letter-spacing: 0.16em; text-transform: uppercase; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .if-gap-sm  { height: 48px; display: block; }
  .if-row     { display: flex; gap: 14px; padding: 7px 0; border-bottom: 1px solid #1e293b; }
  .if-row:last-child { border-bottom: none; }
  .if-label   { font-size: 12pt; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.08em; min-width: 200px; flex-shrink: 0; }
  .if-value   { font-size: 12pt; font-weight: 500; color: #f1f5f9; }
  .social-box {
    background: #111827; border: 1px solid #1e293b; border-left: 4px solid #f59e0b;
    border-radius: 4px; padding: 10px 14px; margin-bottom: 14px;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  .social-box .post-label { font-size: 7pt; font-weight: 700; color: #f59e0b; letter-spacing: 0.18em; text-transform: uppercase; display: block; margin-bottom: 7px; }
  .social-box .headline { font-size: 10.5pt; font-weight: 700; color: #f8fafc; margin-bottom: 8px; }
  .social-box .post-text { font-size: 10.5pt; color: #94a3b8; text-align: justify; line-height: 1.75; hyphens: auto; word-break: normal; overflow-wrap: normal; }
  .post-text + .post-text { margin-top: 9px; }
  .closing {
    text-align: center; font-size: 9pt; font-weight: 400; color: #64748b;
    letter-spacing: 0.08em; white-space: nowrap;
    position: absolute; left: 24mm; right: 24mm; bottom: 14mm;
  }
  .cover {
    display: flex; flex-direction: column; align-items: center;
    justify-content: flex-start; padding-top: 44mm;
    width: 210mm; height: 297mm; background: #0a0f1e;
    position: relative; margin: 12px auto;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  .cover-accent { position: absolute; top: 0; left: 0; right: 0; height: 5px; background: #f59e0b; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .cover-icon { width: 500px; height: 296px; object-fit: cover; object-position: center 38%; display: block; margin-bottom: 0; }
  .cover-rule { width: 52px; height: 3px; background: #f59e0b; margin-top: 28px; margin-bottom: 10px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .cover-type { font-size: 22pt; font-weight: 300; color: #f1f5f9; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 6px; }
  .cover-plan { font-size: 13pt; font-weight: 700; color: #f59e0b; letter-spacing: 0.22em; text-transform: uppercase; margin-bottom: 10px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .cover-date { font-size: 8.5pt; color: #475569; letter-spacing: 0.06em; margin-bottom: 0; }
  .cover-creator-gap { height: 12px; display: block; }
  .cover-creator { font-size: 9.5pt; color: #64748b; letter-spacing: 0.08em; }
  .cover-disc { position: absolute; bottom: 18mm; left: 0; right: 0; text-align: center; font-size: 11pt; color: #475569; letter-spacing: 0.04em; }
  /* Print button bar */
  .print-bar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 9999;
    background: #1a1d27; border-bottom: 1px solid #2d3148;
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 24px; font-family: Inter, sans-serif;
  }
  .print-bar span { font-size: 12px; color: #9ca3af; }
  .print-btn {
    background: #f59e0b; color: #000; font-size: 13px; font-weight: 700;
    border: none; border-radius: 8px; padding: 8px 20px; cursor: pointer;
    letter-spacing: 0.04em;
  }
  .print-btn:hover { background: #fbbf24; }
`;

function Header() {
  return (
    <div className="page-header">
      <span>ShockBridge Pulse · Scenario Note</span>
    </div>
  );
}

function Footer({ n }: { n: number }) {
  return (
    <div className="page-footer">
      <span className="disc">ShockBridge Pulse · shockbridgepulse.com · Not financial advice</span>
      <span className="num">{n}</span>
    </div>
  );
}

export default function PdfPrint() {
  const [data, setData] = useState<PrintData | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("sbp_print_data");
    if (raw) {
      setData(JSON.parse(raw) as PrintData);
    }
  }, []);

  if (!data) {
    return (
      <div style={{ color: "#f0f0f0", background: "#0f1117", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
        Loading...
      </div>
    );
  }

  const { memo, input, plan, date } = data;
  const summaryParas   = memo.summary.split("\n\n").filter(Boolean);
  const bullishParas   = (memo.bullish_path || "").split("\n\n").filter(Boolean);
  const bearishParas   = (memo.bearish_path || "").split("\n\n").filter(Boolean);
  const linkedinParas  = (memo.linkedin_post || "").split("\n\n").filter(p => !p.toLowerCase().includes("from market shock to clean signal")).filter(Boolean);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Print bar — hidden when printing */}
      <div className="print-bar no-print">
        <span>ShockBridge Pulse · Memo PDF — Click Save as PDF in the print dialog</span>
        <button className="print-btn" onClick={() => window.print()}>Save as PDF</button>
      </div>

      {/* Spacer so pages don't hide behind the bar */}
      <div className="no-print" style={{ height: "52px" }} />

      {/* PAGE 1 — Cover */}
      <div className="cover" lang="en">
        <div className="cover-accent" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-transparent.png" alt="ShockBridge Pulse" className="cover-icon" />
        <div className="cover-rule" />
        <div className="cover-type">Scenario Note</div>
        <div className="cover-plan">{plan}</div>
        <div className="cover-date">{date}</div>
        <span className="cover-creator-gap" />
        <div className="cover-creator">Created by Rodolfo Pereira</div>
        <div className="cover-disc">For research and writing purposes only. Not financial advice.</div>
      </div>

      {/* PAGE 2 — Scenario */}
      <div className="page" lang="en">
        <Header />
        <div className="content" style={{ paddingTop: "17mm" }}>
          <p className="if-plan">{plan.toUpperCase()}</p>
          <span className="if-gap-lg" />
          <p className="if-section">Scenario</p>
          <span className="if-gap-sm" />
          <div>
            <div className="if-row"><span className="if-label">Event type</span><span className="if-value">{input.eventType}</span></div>
            <div className="if-row"><span className="if-label">Region</span><span className="if-value">{input.region}</span></div>
            <div className="if-row"><span className="if-label">Sector or asset</span><span className="if-value">{input.sectorAsset}</span></div>
            <div className="if-row"><span className="if-label">Horizon</span><span className="if-value">{input.horizon}</span></div>
            <div className="if-row"><span className="if-label">Tone</span><span className="if-value">{input.tone}</span></div>
            {input.optionalNote && (
              <div className="if-row"><span className="if-label">Context</span><span className="if-value">{input.optionalNote}</span></div>
            )}
          </div>
        </div>
        <Footer n={2} />
      </div>

      {/* PAGE 3 — Title + Summary */}
      <div className="page" lang="en">
        <Header />
        <div className="content content-top">
          <h2>
            <span className="t-hook">{memo.title_hook || memo.title}</span>
            {memo.title_asset  && <span className="t-asset">{memo.title_asset}</span>}
            {memo.title_bridge && <span className="t-bridge">{memo.title_bridge}</span>}
            {memo.title_theme  && <span className="t-sub">{memo.title_theme}</span>}
          </h2>
          {summaryParas.map((p, i) => (
            <p key={i} className="summary">{p}</p>
          ))}
        </div>
        <Footer n={3} />
      </div>

      {/* PAGE 4 — First-order effects */}
      <div className="page" lang="en">
        <Header />
        <div className="content">
          <span className="section-label">First-order effects</span>
          <ul>
            {memo.first_order_effects.map((item, i) => (
              <li key={i}><span className="arrow">→</span><span>{item}</span></li>
            ))}
          </ul>
        </div>
        <Footer n={4} />
      </div>

      {/* PAGE 5 — Second-order effects */}
      {memo.second_order_effects && (
        <div className="page" lang="en">
          <Header />
          <div className="content">
            <span className="section-label">Second-order effects</span>
            <ul>
              {memo.second_order_effects.map((item, i) => (
                <li key={i}><span className="arrow">→</span><span>{item}</span></li>
              ))}
            </ul>
          </div>
          <Footer n={5} />
        </div>
      )}

      {/* PAGE 6 — Bullish path */}
      {memo.bullish_path && (
        <div className="page" lang="en">
          <Header />
          <div className="content">
            <span className="section-label">Bullish path</span>
            {bullishParas.map((p, i) => (
              <p key={i} className="body-p">{p}</p>
            ))}
          </div>
          <Footer n={6} />
        </div>
      )}

      {/* PAGE 7 — Bearish path */}
      {memo.bearish_path && (
        <div className="page" lang="en">
          <Header />
          <div className="content">
            <span className="section-label">Bearish path</span>
            {bearishParas.map((p, i) => (
              <p key={i} className="body-p">{p}</p>
            ))}
          </div>
          <Footer n={7} />
        </div>
      )}

      {/* PAGE 8 — Key uncertainties */}
      {memo.key_uncertainties && (
        <div className="page" lang="en">
          <Header />
          <div className="content">
            <span className="section-label">Key uncertainties</span>
            <ul>
              {memo.key_uncertainties.map((item, i) => (
                <li key={i}><span className="arrow">→</span><span>{item}</span></li>
              ))}
            </ul>
          </div>
          <Footer n={8} />
        </div>
      )}

      {/* PAGE 9 — Watch next */}
      <div className="page" lang="en">
        <Header />
        <div className="content">
          <span className="section-label">Watch next</span>
          <ul>
            {memo.watch_next.map((item, i) => (
              <li key={i}><span className="arrow">→</span><span>{item}</span></li>
            ))}
          </ul>
        </div>
        <Footer n={9} />
      </div>

      {/* PAGE 10 — X Post */}
      {memo.x_post && (
        <div className="page" lang="en">
          <Header />
          <div className="content">
            <span className="section-label">Content Outputs: Social</span>
            <div style={{ marginTop: "18px" }}>
              <div className="social-box" style={{ marginBottom: 0 }}>
                <span className="post-label">X Post · {memo.x_post.length} characters</span>
                <p className="post-text">{memo.x_post}</p>
              </div>
            </div>
          </div>
          <Footer n={10} />
        </div>
      )}

      {/* PAGE 11 — LinkedIn Post */}
      {memo.linkedin_post && (
        <div className="page" lang="en">
          <Header />
          <div className="content">
            <span className="section-label">LinkedIn Post</span>
            <div style={{ marginTop: "18px" }}>
              <div className="social-box" style={{ marginBottom: 0 }}>
                <span className="post-label">LinkedIn Post</span>
                {memo.linkedin_post_headline && (
                  <p className="headline">{memo.linkedin_post_headline}</p>
                )}
                {linkedinParas.map((p, i) => (
                  <p key={i} className="post-text">{p}</p>
                ))}
              </div>
            </div>
          </div>
          <p className="closing">ShockBridge Pulse — From market shock to clean signal</p>
          <Footer n={11} />
        </div>
      )}
    </>
  );
}
