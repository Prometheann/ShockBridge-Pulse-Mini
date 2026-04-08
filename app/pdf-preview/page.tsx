"use client";
// PDF PREVIEW — development only, shows all 10 pages on screen with print styles applied
export default function PdfPreview() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #555; }
        .page {
          width: 210mm;
          min-height: 297mm;
          background: #0a0f1e;
          margin: 12px auto;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
          color: #f1f5f9;
          font-size: 10.5pt;
          line-height: 1.75;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        /* Header bar */
        .page-header {
          position: absolute; top: 0; left: 0; right: 0; height: 14mm;
          background: #0a0f1e; border-bottom: 2px solid #f59e0b;
          display: flex; align-items: center; justify-content: center;
        }
        .page-header span {
          font-size: 6.5pt; font-weight: 700; letter-spacing: 0.24em;
          color: #f59e0b; text-transform: uppercase;
        }
        /* Footer bar */
        .page-footer {
          position: absolute; bottom: 0; left: 0; right: 0; height: 12mm;
          background: #0a0f1e; border-top: 2px solid #f59e0b;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 24mm;
        }
        .page-footer .disc { font-size: 7pt; color: #475569; }
        .page-footer .num { font-size: 10pt; font-weight: 700; color: #f59e0b; }
        /* Content area */
        .content { padding: 17mm 24mm 14mm 24mm; }
        /* Section label */
        .section-label {
          color: #f59e0b; background: #0f172a; font-size: 11pt; font-weight: 800;
          letter-spacing: 0.26em; text-transform: uppercase; display: block;
          margin: 0 -24mm 40px -24mm; padding: 12px 24mm;
          border-bottom: 2px solid #f59e0b;
        }
        /* Bullet list */
        ul { padding: 0; list-style: none; }
        li { display: flex; gap: 12px; padding: 10px 0; border-bottom: 1px solid #1a2540; font-size: 12pt; line-height: 1.8; color: #cbd5e1; }
        li:last-child { border-bottom: none; }
        li .arrow { color: #f59e0b; font-weight: 700; flex-shrink: 0; margin-top: 2px; }
        /* Body paragraph */
        .body-p { color: #cbd5e1; font-size: 12pt; line-height: 1.9; text-align: justify; }
        /* Summary */
        .summary { font-size: 12pt; color: #94a3b8; line-height: 1.95; text-align: justify; border-left: 3px solid #f59e0b; padding-left: 14px; }
        /* Title parts */
        .t-hook  { display: block; color: #f59e0b; font-size: 24pt; font-weight: 800; text-transform: uppercase; }
        .t-asset { display: block; color: #f59e0b; font-size: 28pt; font-weight: 800; text-transform: uppercase; margin-top: 40px; }
        .t-bridge{ display: block; color: #f59e0b; font-size: 16pt; font-weight: 600; opacity: 0.85; margin-top: 40px; }
        .t-sub   { display: block; color: #f8fafc; font-size: 20pt; font-weight: 800; margin-top: 40px; margin-bottom: 32px; }
        /* Input framework */
        .if-plan    { font-size: 22pt; font-weight: 800; color: #f59e0b; letter-spacing: 0.18em; text-transform: uppercase; }
        .if-gap-lg  { height: 32px; display: block; }
        .if-section { font-size: 18pt; font-weight: 800; color: #f59e0b; letter-spacing: 0.16em; text-transform: uppercase; }
        .if-gap-sm  { height: 48px; display: block; }
        .if-row     { display: flex; gap: 14px; padding: 7px 0; border-bottom: 1px solid #1e293b; }
        .if-row:last-child { border-bottom: none; }
        .if-label   { font-size: 12pt; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.08em; min-width: 200px; flex-shrink: 0; }
        .if-value   { font-size: 12pt; font-weight: 500; color: #f1f5f9; }
        /* Social box */
        .social-box { background: #111827; border: 1px solid #1e293b; border-left: 4px solid #f59e0b; border-radius: 4px; padding: 16px 18px; margin-bottom: 40px; }
        .social-box .post-label { font-size: 7pt; font-weight: 700; color: #f59e0b; letter-spacing: 0.18em; text-transform: uppercase; display: block; margin-bottom: 10px; }
        .social-box .headline { font-size: 11.5pt; font-weight: 700; color: #f8fafc; margin-bottom: 10px; }
        .social-box .post-text { font-size: 12pt; color: #94a3b8; text-align: justify; line-height: 1.85; }
        /* Closing text */
        .closing { text-align: center; font-size: 12pt; font-weight: 500; color: #94a3b8; letter-spacing: 0.06em; padding-top: 24px; border-top: 1px solid #1e293b; position: absolute; left: 24mm; right: 24mm; bottom: 20mm; }
        /* Cover */
        .cover { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 210mm; height: 297mm; background: #0a0f1e; position: relative; margin: 12px auto; }
        .cover-accent { position: absolute; top: 0; left: 0; right: 0; height: 5px; background: #f59e0b; }
        .cover-icon { width: 200px; height: auto; margin-bottom: 32px; filter: brightness(0) saturate(100%) invert(64%) sepia(100%) saturate(700%) hue-rotate(356deg) brightness(96%) contrast(106%); }
        .cover-brand { font-size: 38pt; font-weight: 800; white-space: nowrap; margin-bottom: 36px; text-align: center; }
        .cover-brand .w { color: #f8fafc; }
        .cover-brand .a { color: #f59e0b; }
        .cover-rule { width: 52px; height: 3px; background: #f59e0b; margin-bottom: 28px; }
        .cover-type { font-size: 22pt; font-weight: 300; color: #f1f5f9; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 10px; }
        .cover-plan { font-size: 13pt; font-weight: 700; color: #f59e0b; letter-spacing: 0.22em; text-transform: uppercase; margin-bottom: 36px; }
        .cover-date { font-size: 8.5pt; color: #475569; letter-spacing: 0.06em; margin-bottom: 0; }
        .cover-creator-gap { height: 48px; display: block; }
        .cover-creator { font-size: 9.5pt; color: #64748b; letter-spacing: 0.08em; }
        .cover-disc { position: absolute; bottom: 18mm; left: 0; right: 0; text-align: center; font-size: 11pt; color: #475569; letter-spacing: 0.04em; }
        .page-label { position: absolute; top: 4px; right: 8px; font-size: 9px; background: #f59e0b; color: #000; padding: 2px 6px; border-radius: 3px; font-weight: 700; z-index: 999; }
      `}</style>

      {/* PAGE 1 — Cover */}
      <div className="cover">
        <span className="page-label">PAGE 1 — COVER</span>
        <div className="cover-accent" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-icon.png" alt="ShockBridge Pulse" className="cover-icon" />
        <div className="cover-brand"><span className="w">ShockBridge</span><span className="a"> Pulse</span></div>
        <div className="cover-rule" />
        <div className="cover-type">Scenario Note</div>
        <div className="cover-plan">Creator</div>
        <div className="cover-date">April 8, 2026</div>
        <span className="cover-creator-gap" />
        <div className="cover-creator">Created by Rodolfo Pereira</div>
        <div className="cover-disc">For research and writing purposes only. Not financial advice.</div>
      </div>

      {/* PAGE 2 — Input Framework */}
      <div className="page">
        <span className="page-label">PAGE 2</span>
        <div className="page-header"><span>ShockBridge Pulse · Scenario Note</span></div>
        <div className="content">
          <div style={{paddingTop:"17mm"}}>
            <p className="if-plan">Creator</p>
            <span className="if-gap-lg" />
            <p className="if-section">Scenario</p>
            <span className="if-gap-sm" />
            <div>
              <div className="if-row"><span className="if-label">Event type</span><span className="if-value">Earnings miss</span></div>
              <div className="if-row"><span className="if-label">Region</span><span className="if-value">United States</span></div>
              <div className="if-row"><span className="if-label">Sector or asset</span><span className="if-value">NVIDIA / Semiconductors</span></div>
              <div className="if-row"><span className="if-label">Horizon</span><span className="if-value">1 week</span></div>
              <div className="if-row"><span className="if-label">Tone</span><span className="if-value">Balanced</span></div>
              <div className="if-row"><span className="if-label">Optional thesis / context</span><span className="if-value">Middle East conflict angle</span></div>
            </div>
          </div>
        </div>
        <div className="page-footer"><span className="disc">ShockBridge Pulse · shockbridgepulse.com · Not financial advice</span><span className="num">2</span></div>
      </div>

      {/* PAGE 3 — Title */}
      <div className="page">
        <span className="page-label">PAGE 3</span>
        <div className="page-header"><span>ShockBridge Pulse · Scenario Note</span></div>
        <div className="content" style={{paddingTop:"16mm"}}>
          <h2>
            <span className="t-hook">Earnings Miss</span>
            <span className="t-asset">NVIDIA</span>
            <span className="t-bridge">Collides With Middle East Risk</span>
            <span className="t-sub">AI Premium Under Siege</span>
          </h2>
          <p className="summary">The real danger here is not the earnings miss itself — it is the timing. NVIDIA&apos;s valuation has been functioning as a single-stock proxy for the entire AI capex supercycle narrative, and a shortfall against consensus hits that narrative precisely when Middle East escalation is already compressing risk appetite and raising the cost of capital for long-duration growth assets. A miss in isolation is an event; a miss layered on top of geopolitical risk premium expansion is a structural repricing trigger.</p>
          <p className="summary" style={{marginTop:"20px"}}>The non-obvious angle is the export control dimension. A material portion of NVIDIA&apos;s H100 and H200 backlog is tied to Middle East AI infrastructure build-outs — sovereign wealth fund-backed data center programs that sit in a Bureau of Industry and Security licensing gray zone. If management is forced to hedge on shipment timelines during the earnings call, the consensus revenue model breaks not just for this quarter but for the next two. That transforms a cyclical miss into a forward guidance problem, and guidance problems in high-multiple stocks are structurally more damaging than a single earnings print.</p>
          <p className="summary" style={{marginTop:"20px"}}>The cross-asset implication is equally important: NVDA has been the single most widely held AI infrastructure long across systematic and discretionary funds. Forced de-grossing at this position size does not stay contained to the semiconductor sector — it transmits to the entire AI capex trade, repricing hyperscalers, networking names, and energy infrastructure companies that had been bid up on data center power demand. The question for the next week is not whether NVDA bounces. It is whether this is the event that forces the market to finally put a discount rate on the AI supercycle.</p>
        </div>
        <div className="page-footer"><span className="disc">ShockBridge Pulse · shockbridgepulse.com · Not financial advice</span><span className="num">3</span></div>
      </div>

      {/* PAGE 4 — First-order effects */}
      <div className="page">
        <span className="page-label">PAGE 4</span>
        <div className="page-header"><span>ShockBridge Pulse · Scenario Note</span></div>
        <div className="content" style={{paddingTop:"16mm"}}>
          <span className="section-label">First-order effects</span>
          <ul>
            <li><span className="arrow">→</span><span>NVDA gaps down 8–12% at open as EPS misses consensus by more than 5%, triggering forced selling from quant funds with momentum overlays and stop-loss cascades in options.</span></li>
            <li><span className="arrow">→</span><span>Hyperscaler stocks reprice 3–5% lower as the market recalibrates AI capex cycle expectations — MSFT, GOOGL, META all see negative sympathy moves.</span></li>
            <li><span className="arrow">→</span><span>Semiconductor ETF (SOXX) sells off 4–6%, dragging AMD, AVGO, and AMAT into the correction as sector rotation accelerates out of AI infrastructure names.</span></li>
            <li><span className="arrow">→</span><span>VIX spikes 15–20% intraday as the combination of earnings shock and geopolitical backdrop compresses risk appetite across asset classes simultaneously.</span></li>
            <li><span className="arrow">→</span><span>Treasury yields fall 8–12bps on flight-to-safety bid as equity vol spills into rates, with the 10-year breaking below its near-term support level.</span></li>
          </ul>
        </div>
        <div className="page-footer"><span className="disc">ShockBridge Pulse · shockbridgepulse.com · Not financial advice</span><span className="num">4</span></div>
      </div>

      {/* PAGE 5 — Second-order effects */}
      <div className="page">
        <span className="page-label">PAGE 5</span>
        <div className="page-header"><span>ShockBridge Pulse · Scenario Note</span></div>
        <div className="content" style={{paddingTop:"16mm"}}>
          <span className="section-label">Second-order effects</span>
          <ul>
            <li><span className="arrow">→</span><span>Analyst downgrades cascade over 48–72 hours, with price target cuts compounding the initial move; consensus EPS estimates for FY25 revised down 8–12%, extending the de-rating cycle.</span></li>
            <li><span className="arrow">→</span><span>AI infrastructure spending narratives are challenged broadly — cloud providers face investor pressure to justify capex commitments, potentially pulling forward guidance cuts at next earnings.</span></li>
            <li><span className="arrow">→</span><span>Emerging market tech exposure sells off as dollar-funding costs rise and global risk appetite contracts; Taiwan Semiconductor faces sympathy pressure on export control concerns.</span></li>
            <li><span className="arrow">→</span><span>Credit spreads widen 15–25bps in the high-yield tech segment as leverage concerns resurface for capital-intensive AI build-out companies with stretched balance sheets.</span></li>
          </ul>
        </div>
        <div className="page-footer"><span className="disc">ShockBridge Pulse · shockbridgepulse.com · Not financial advice</span><span className="num">5</span></div>
      </div>

      {/* PAGE 6 — Bullish path */}
      <div className="page">
        <span className="page-label">PAGE 6</span>
        <div className="page-header"><span>ShockBridge Pulse · Scenario Note</span></div>
        <div className="content" style={{paddingTop:"16mm"}}>
          <span className="section-label">Bullish path</span>
          <p className="body-p">The bullish resolution requires three conditions to hold simultaneously within the one-week window: first, the earnings miss must be quantifiably small — EPS within 3% of consensus with no guidance cut. Second, management must explicitly address the Middle East export angle on the call, confirming no incremental restriction impact on H100/H200 backlog. Third, hyperscaler commentary must reinforce capex commitment.</p>
          <p className="body-p" style={{marginTop:"20px"}}>In this scenario, NVDA recovers 60–70% of the initial gap within 5 trading sessions as short covering and momentum re-entry accelerate. The 35x forward multiple finds support at the 30x level, and the sector rotation reverses as AI infrastructure thesis is reaffirmed. SOX outperforms the broader market by 300–400bps on the week.</p>
        </div>
        <div className="page-footer"><span className="disc">ShockBridge Pulse · shockbridgepulse.com · Not financial advice</span><span className="num">6</span></div>
      </div>

      {/* PAGE 7 — Bearish path */}
      <div className="page">
        <span className="page-label">PAGE 7</span>
        <div className="page-header"><span>ShockBridge Pulse · Scenario Note</span></div>
        <div className="content" style={{paddingTop:"16mm"}}>
          <span className="section-label">Bearish path</span>
          <p className="body-p">The bearish transmission begins if guidance is cut or withheld — particularly on the data center segment. A revenue miss exceeding 5% against consensus triggers model breaks across the sell-side, forcing price target reductions that mechanically extend the selloff. The Middle East export angle becomes the dominant narrative if management hedges on H200 shipment timelines.</p>
          <p className="body-p" style={{marginTop:"20px"}}>In the full bear scenario, NVDA re-rates to 22–24x forward earnings, implying a 35–40% drawdown from pre-earnings levels. The contagion spreads to the entire AI capex trade: MSFT, META, and GOOGL each give back 8–12% of YTD gains. The 10-year Treasury rallies through 4.0% as equity vol sustains and risk-off positioning extends into the following week.</p>
        </div>
        <div className="page-footer"><span className="disc">ShockBridge Pulse · shockbridgepulse.com · Not financial advice</span><span className="num">7</span></div>
      </div>

      {/* PAGE 8 — Key uncertainties */}
      <div className="page">
        <span className="page-label">PAGE 8</span>
        <div className="page-header"><span>ShockBridge Pulse · Scenario Note</span></div>
        <div className="content" style={{paddingTop:"16mm"}}>
          <span className="section-label">Key uncertainties</span>
          <ul>
            <li><span className="arrow">→</span><span>Magnitude of the EPS miss relative to whisper numbers — a 3% miss is recoverable; a 7%+ miss breaks the growth narrative and forces structural de-rating of the AI premium.</span></li>
            <li><span className="arrow">→</span><span>Management's commentary on H100/H200 export restrictions to Middle East customers — any incremental restriction signal transforms a cyclical story into a structural demand ceiling.</span></li>
            <li><span className="arrow">→</span><span>Federal Reserve response function — if CPI data deteriorates simultaneously, the Fed's ability to provide a put narrows, removing the policy backstop that has supported high-multiple tech.</span></li>
            <li><span className="arrow">→</span><span>Positioning and options market dynamics — elevated put/call ratios and heavy short interest could create a violent short-squeeze recovery if the miss is smaller than feared.</span></li>
          </ul>
        </div>
        <div className="page-footer"><span className="disc">ShockBridge Pulse · shockbridgepulse.com · Not financial advice</span><span className="num">8</span></div>
      </div>

      {/* PAGE 9 — Watch next */}
      <div className="page">
        <span className="page-label">PAGE 9</span>
        <div className="page-header"><span>ShockBridge Pulse · Scenario Note</span></div>
        <div className="content" style={{paddingTop:"16mm"}}>
          <span className="section-label">Watch next</span>
          <ul>
            <li><span className="arrow">→</span><span>NVDA options implied volatility term structure — front-month crush vs. back-month persistence signals whether market sees this as event risk or structural repricing (next 48h)</span></li>
            <li><span className="arrow">→</span><span>Hyperscaler capex commentary — MSFT, GOOGL, META earnings calls over the next 2 weeks for any language softening AI infrastructure spend commitments</span></li>
            <li><span className="arrow">→</span><span>BIS export control register — any new Middle East licensing restriction filings that would confirm the structural demand ceiling narrative (ongoing)</span></li>
            <li><span className="arrow">→</span><span>SOXX/QQQ ratio — semiconductor relative performance vs. broad tech as a signal of whether the de-rating is sector-specific or systemic (daily)</span></li>
            <li><span className="arrow">→</span><span>10-year Treasury yield vs. NDX correlation — if yields fall while NDX also falls, the risk-off is credit-driven not rotation-driven, implying deeper drawdown ahead (daily)</span></li>
          </ul>
        </div>
        <div className="page-footer"><span className="disc">ShockBridge Pulse · shockbridgepulse.com · Not financial advice</span><span className="num">9</span></div>
      </div>

      {/* PAGE 10 — Content Outputs: Social */}
      <div className="page">
        <span className="page-label">PAGE 10</span>
        <div className="page-header"><span>ShockBridge Pulse · Scenario Note</span></div>
        <div className="content" style={{paddingTop:"16mm", position:"relative", minHeight:"calc(297mm - 14mm - 12mm)"}}>
          <span className="section-label">Content Outputs: Social</span>
          <div style={{marginTop:"40px"}}>
            <div className="social-box">
              <span className="post-label">X Post</span>
              <p className="post-text">NVDA misses, but the real shock is what management says about Middle East AI orders sitting in a BIS export gray zone. If they hedge on H100/H200 shipment timelines, the 35x forward multiple doesn&apos;t find support at 30x — it re-rates to 22x. This isn&apos;t a cyclical blip. SOX doesn&apos;t bounce. It reprices.</p>
            </div>
            <div className="social-box">
              <span className="post-label">LinkedIn Post</span>
              <p className="headline">The NVIDIA miss isn&apos;t an earnings event — it&apos;s a structural demand ceiling test.</p>
              <p className="post-text">The market is framing tonight as a cyclical miss. That&apos;s the wrong lens. The real variable is whether Middle East AI infrastructure demand — a material portion of H100/H200 backlog — is sitting inside a BIS export control gray zone that management can no longer ignore. A 5% EPS miss is recoverable. Management hedging on shipment timelines is not. That&apos;s when the 35x forward multiple stops finding support at 30x and discovers 22x. The question for the next week isn&apos;t how fast NVDA bounces. It&apos;s whether this is the moment the AI capex supercycle narrative absorbs its first structural challenge — and whether the hyperscalers will start softening capex language in response.</p>
            </div>
          </div>
          <p className="closing">ShockBridge Pulse — From market shock to clean signal</p>
        </div>
        <div className="page-footer"><span className="disc">ShockBridge Pulse · shockbridgepulse.com · Not financial advice</span><span className="num">10</span></div>
      </div>
    </>
  );
}
