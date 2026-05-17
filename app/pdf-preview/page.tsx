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
        li { display: flex; gap: 12px; padding: 10px 0; border-bottom: 1px solid #1a2540; font-size: 12pt; line-height: 1.8; color: #cbd5e1; text-align: justify; hyphens: auto; }
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
        .closing { text-align: center; font-size: 9pt; font-weight: 400; color: #64748b; letter-spacing: 0.08em; padding-top: 0; position: absolute; left: 24mm; right: 24mm; bottom: 14mm; }
        /* Cover */
        .cover { display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding-top: 44mm; width: 210mm; height: 297mm; background: #0a0f1e; position: relative; margin: 12px auto; }
        .cover-accent { position: absolute; top: 0; left: 0; right: 0; height: 5px; background: #f59e0b; }
        .cover-icon { width: 500px; height: 296px; object-fit: cover; object-position: center 38%; display: block; margin-bottom: 0; }
        .cover-rule { width: 52px; height: 3px; background: #f59e0b; margin-top: 28px; margin-bottom: 10px; }
        .cover-type { font-size: 22pt; font-weight: 300; color: #f1f5f9; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 6px; }
        .cover-plan { font-size: 13pt; font-weight: 700; color: #f59e0b; letter-spacing: 0.22em; text-transform: uppercase; margin-bottom: 10px; }
        .cover-date { font-size: 8.5pt; color: #475569; letter-spacing: 0.06em; margin-bottom: 0; }
        .cover-creator-gap { height: 12px; display: block; }
        .cover-creator { font-size: 9.5pt; color: #64748b; letter-spacing: 0.08em; }
        .cover-disc { position: absolute; bottom: 18mm; left: 0; right: 0; text-align: center; font-size: 11pt; color: #475569; letter-spacing: 0.04em; }
        .page-label { position: absolute; top: 4px; right: 8px; font-size: 9px; background: #f59e0b; color: #000; padding: 2px 6px; border-radius: 3px; font-weight: 700; z-index: 999; }
      `}</style>

      {/* PAGE 1 — Cover */}
      <div className="cover">
        <span className="page-label">PAGE 1 · COVER</span>
        <div className="cover-accent" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-transparent.png" alt="ShockBridge Pulse" className="cover-icon" />
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
          <p className="summary">The real danger here is not the earnings miss itself: it is the timing. NVIDIA&apos;s valuation has been functioning as a single-stock proxy for the entire AI capex supercycle narrative, and a shortfall against consensus hits that narrative precisely when Middle East escalation is already compressing risk appetite and raising the cost of capital for long-duration growth assets. A miss in isolation is an event; a miss layered on top of geopolitical risk premium expansion is a structural repricing trigger.</p>
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
            <li><span className="arrow">→</span><span>NVDA gaps down 8–12% at the open as EPS misses consensus by more than 5%, triggering forced selling from quant funds with momentum overlays, stop-loss cascades in the options market, and systematic de-grossing from multi-strategy funds that have been running NVDA as their largest single-name long. The initial gap is amplified by thin pre-market liquidity and elevated put open interest that dealers must hedge into, creating a feedback loop in the first 30 minutes of trading.</span></li>
            <li><span className="arrow">→</span><span>Hyperscaler stocks reprice 3–5% lower as the market recalibrates AI capex cycle expectations — MSFT, GOOGL, META, and AMZN all see negative sympathy moves driven by investor concern that the infrastructure buildout is hitting a demand absorption ceiling. The sell-off in hyperscalers is not indiscriminate: names with the largest disclosed AI capex commitments and the least near-term revenue visibility underperform peers, creating intra-group dispersion that signals a selective rather than wholesale de-rating.</span></li>
            <li><span className="arrow">→</span><span>The Philadelphia Semiconductor Index (SOXX) sells off 4–6%, dragging AMD, Broadcom, and AMAT into the correction as sector rotation accelerates out of AI infrastructure names and into defensive and value exposures. Taiwan Semiconductor faces additional pressure on export control read-across, with the market pricing a non-trivial probability of incremental restrictions on advanced node capacity allocations tied to Middle East customers.</span></li>
            <li><span className="arrow">→</span><span>VIX spikes 15–20% intraday as the combination of an earnings shock in the most widely-held equity name and a geopolitical backdrop that is already elevated compresses risk appetite simultaneously across equities, credit, and EM. The vol move is self-reinforcing: options dealers who are short gamma from elevated put selling activity are forced to sell equities into the decline to delta-hedge, extending the drawdown beyond what the fundamental miss alone would justify.</span></li>
            <li><span className="arrow">→</span><span>Treasury yields fall 8–12bps on a flight-to-safety bid as equity volatility spills into the rates market, with the 10-year breaking below its near-term support level and the 2s10s curve flattening as short-end rates remain anchored by Fed policy expectations. The move is concentrated in real yields rather than breakevens, suggesting the market is repricing growth risk rather than inflation risk — a distinction that matters for how long the bond rally can be sustained if risk assets stabilize.</span></li>
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
            <li><span className="arrow">→</span><span>Analyst downgrades cascade over 48–72 hours as sell-side teams revise their models to reflect the miss and any guidance reduction. Price target cuts from Tier 1 banks compound the initial move mechanically — index funds that track analyst consensus weightings are forced to reduce exposure as the average target falls below current price. Consensus EPS estimates for FY25 are revised down 8–12%, extending the de-rating cycle well beyond the initial session and creating a headwind for any attempted recovery rally in the first week.</span></li>
            <li><span className="arrow">→</span><span>AI infrastructure spending narratives are challenged broadly across the entire capex supply chain. Cloud providers face immediate investor pressure to justify their stated capex commitments — MSFT, GOOGL, and META each have multi-billion dollar annual AI infrastructure pledges that the market will scrutinize more aggressively at the next earnings call. Any language softening on spend timelines, even if framed as phasing rather than cuts, is likely to be read as a directional signal that the hyperscaler AI buildout is approaching a demand absorption inflection point.</span></li>
            <li><span className="arrow">→</span><span>Emerging market tech exposure sells off as dollar-funding costs rise and global risk appetite contracts simultaneously. Taiwan Semiconductor faces sympathy pressure on two vectors: export control read-across from the NVIDIA miss, and the underlying semiconductor demand cycle signal. South Korean memory names (Samsung and SK Hynix) are also repriced lower as HBM demand expectations are revised in line with reduced NVDA production targets. The EM tech basket underperforms DM tech by 150–200bps as currency hedging costs add an additional layer of friction for international holders.</span></li>
            <li><span className="arrow">→</span><span>Investment-grade and high-yield credit spreads widen 15–25bps in the technology segment as leverage concerns resurface for capital-intensive AI infrastructure companies. The spread widening is most acute for issuers that have recently raised debt to fund data center build-outs against a revenue visibility horizon that now looks less certain. Refinancing risk for sub-investment-grade AI infrastructure names increases materially, as the equity de-rating compresses the collateral base against which covenants are tested — a structural tightening of financial conditions in the exact cohort of companies most exposed to the AI capex cycle.</span></li>
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
          <p className="body-p" style={{textAlign:"justify",hyphens:"auto"}}>The bullish resolution requires three conditions to hold simultaneously within the one-week window. First, the earnings miss must be quantifiably small — EPS within 3% of consensus with no guidance cut on the data center segment. A small miss against already-cautious whisper numbers can be absorbed if the narrative around forward demand remains intact. Second, management must explicitly address the Middle East export control angle on the earnings call, confirming that H100 and H200 backlog is not materially exposed to incremental BIS licensing restrictions. A clear, quantified statement — rather than a hedge — removes the structural demand ceiling overhang that would otherwise sustain the selling pressure beyond the initial session. Third, hyperscaler capex commentary from MSFT or GOOGL in the days following must reinforce rather than soften AI infrastructure spend commitments, providing an independent data point that validates the demand side of NVIDIA&apos;s forward model.</p>
          <p className="body-p" style={{marginTop:"20px",textAlign:"justify",hyphens:"auto"}}>In this scenario, NVDA recovers 60–70% of the initial gap within five trading sessions as short covering, momentum re-entry, and systematic rebalancing flows combine to drive a sharp reversal. The 35x forward multiple finds technical and fundamental support at the 30x level — the floor implied by a normalized AI capex growth rate that the market has already priced through hyperscaler earnings. The Philadelphia Semiconductor Index outperforms the broader market by 300–400bps on the week, and the AI infrastructure complex re-establishes its leadership position within the Nasdaq. The Treasury rally reverses as risk appetite recovers, with the 10-year yield retracing 6–8bps of its initial flight-to-safety move as equity vol compresses and the growth narrative is reaffirmed.</p>
        </div>
        <div className="page-footer"><span className="disc">ShockBridge Pulse · shockbridgepulse.com · Not financial advice</span><span className="num">6</span></div>
      </div>

      {/* PAGE 7 — Bearish path */}
      <div className="page">
        <span className="page-label">PAGE 7</span>
        <div className="page-header"><span>ShockBridge Pulse · Scenario Note</span></div>
        <div className="content" style={{paddingTop:"16mm"}}>
          <span className="section-label">Bearish path</span>
          <p className="body-p" style={{textAlign:"justify",hyphens:"auto"}}>The bearish transmission begins if guidance is cut or withheld — particularly on the data center segment, which has been the primary driver of NVIDIA&apos;s revenue re-rating over the past six quarters. A revenue miss exceeding 5% against consensus triggers model breaks across the sell-side simultaneously: EPS estimates are slashed, price targets fall below current market price, and the analyst community shifts from buy to neutral in a compressed window that forces passive and active funds to reduce their positioning in tandem. The Middle East export control angle becomes the dominant narrative if management hedges on H100 and H200 shipment timelines, because it reframes the miss from a cyclical event into a structural demand ceiling — a categorically different investment thesis that justifies a lower steady-state multiple regardless of near-term demand recovery. Once the structural ceiling narrative takes hold, it is extremely difficult to dislodge within a single earnings cycle.</p>
          <p className="body-p" style={{marginTop:"20px",textAlign:"justify",hyphens:"auto"}}>In the full bear scenario, NVDA re-rates to 22–24x forward earnings — a compression of roughly 30% from its pre-earnings multiple — implying a 35–40% drawdown from pre-earnings price levels as both the earnings estimate and the multiple contract simultaneously. The contagion spreads to the entire AI capex trade with differentiated severity: MSFT, META, and GOOGL each give back 8–12% of YTD gains as investors reconsider the return on AI capex investment, while pure-play AI infrastructure names such as Arista Networks and Super Micro Computer face steeper declines of 15–20% on direct revenue exposure. The 10-year Treasury rallies through 4.0% as equity vol sustains above 25 and risk-off positioning extends into the following week, tightening financial conditions and removing one of the key supports — the implicit Fed put on growth assets — that had been underwriting the high-multiple tech trade since the start of the year.</p>
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
            <li><span className="arrow">→</span><span>Magnitude of the EPS miss relative to whisper numbers — a 3% miss is recoverable and may even trigger a short-squeeze given elevated put open interest; a 7%+ miss against whisper estimates breaks the growth narrative entirely, forcing a structural de-rating of the AI premium that cannot be reversed within a single earnings cycle. The delta between the official consensus and the buy-side whisper number is itself informative: a wide gap suggests the market had already partially priced a miss, reducing the incremental shock, while a narrow gap implies the selloff has further to run as models are rebuilt from scratch.</span></li>
            <li><span className="arrow">→</span><span>Management&apos;s commentary on H100 and H200 export restrictions to Middle East customers is the single highest-stakes variable on the earnings call. Any incremental restriction signal — even hedged language around BIS licensing timelines — transforms the NVIDIA investment thesis from a cyclical miss story into a structural demand ceiling story. These are categorically different outcomes: the first is priced and recovered within weeks; the second requires a full re-evaluation of the total addressable market, the forward earnings model, and the appropriate valuation multiple, each of which takes multiple quarters to reset.</span></li>
            <li><span className="arrow">→</span><span>The Federal Reserve&apos;s response function becomes a critical macro overlay if the earnings shock lands simultaneously with a deteriorating inflation print. In that scenario, the Fed&apos;s ability to provide a policy backstop to risk assets narrows significantly — the implicit put that has supported high-multiple tech since the rate pivot of late 2023 is rendered ineffective when the central bank faces a stagflationary trade-off. Without the policy put, the floor for NVDA&apos;s multiple compression shifts lower and the duration of the drawdown extends beyond what equity volatility alone would imply.</span></li>
            <li><span className="arrow">→</span><span>Positioning and options market dynamics represent the most non-linear uncertainty in the scenario. Elevated put/call ratios and heavy short interest — built up in anticipation of exactly this kind of miss — create the conditions for a violent short-squeeze recovery if the actual print is smaller than feared and management&apos;s tone is constructive. Conversely, if dealers are long puts and the miss exceeds expectations, the delta-hedging flow amplifies the initial move significantly beyond what fundamental repricing alone would produce. The direction of this dynamic is binary and not knowable in advance, making it the primary source of intraday volatility regardless of the headline outcome.</span></li>
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
            <li><span className="arrow">→</span><span>NVDA options implied volatility term structure — watch the front-month vs. back-month IV spread in the 24–48 hours post-earnings. A sharp front-month crush with back-month persistence signals the market treats this as a contained event risk; sustained elevated vol across the curve signals structural repricing that will extend the drawdown. The term structure also informs whether dealers are still net short gamma, which would amplify directional moves in either direction through the first week of trading. (Next 48h)</span></li>
            <li><span className="arrow">→</span><span>Hyperscaler capex commentary — MSFT, GOOGL, and META earnings calls scheduled over the following two weeks are the most important independent data source for validating or invalidating the AI demand thesis. Any language softening on data center capex spend commitments — even framed as phasing or efficiency optimization rather than cuts — will be read by the market as directional confirmation that NVIDIA&apos;s demand ceiling is structural rather than cyclical, extending the re-rating pressure across the full AI infrastructure complex. (Next 2 weeks)</span></li>
            <li><span className="arrow">→</span><span>Bureau of Industry and Security export control register — monitor for any new Middle East licensing restriction filings or amendments to existing Entity List designations that would quantify the revenue at risk from H100 and H200 shipment constraints. A concrete BIS action in the weeks following the earnings miss would transform the narrative from speculative export risk to confirmed structural demand ceiling, resetting analyst models and triggering a second wave of sell-side price target reductions. (Ongoing)</span></li>
            <li><span className="arrow">→</span><span>SOXX/QQQ ratio — the relative performance of the Philadelphia Semiconductor Index against the broader Nasdaq 100 is the cleanest daily signal for whether the de-rating remains sector-specific or has become systemic. A sustained SOXX underperformance of more than 150bps per day indicates the market is treating this as a semiconductor-specific structural issue; convergence of the ratio signals that the broader tech complex is absorbing and moving past the shock. (Daily)</span></li>
            <li><span className="arrow">→</span><span>10-year Treasury yield vs. NDX correlation — the directional relationship between yields and equities in the days following the miss is the most informative macro signal available. If yields fall while the NDX also falls, the risk-off is credit-driven and growth-fear-driven rather than rotation-driven — implying a deeper and more sustained drawdown ahead as the Fed put is being discounted simultaneously. Conversely, if yields rise while equities recover, the market is repricing as a pure sector rotation event, which is historically resolved faster and with less systemic damage. (Daily)</span></li>
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
              <span className="post-label">X Post · 278 characters</span>
              <p className="post-text">NVDA misses. But the real question isn&apos;t the EPS gap: it&apos;s whether mgmt hedges on Middle East H100/H200 shipments tonight. If yes: 35x doesn&apos;t hold at 30x. It finds 22x. That&apos;s not a dip. That&apos;s a thesis break. SOX doesn&apos;t bounce. It reprices. Watch the call.</p>
            </div>
            <div className="social-box">
              <span className="post-label">LinkedIn Post</span>
              <p className="headline">The NVIDIA miss isn&apos;t an earnings event; it&apos;s a structural demand ceiling test.</p>
              <p className="post-text" style={{textAlign:"justify",hyphens:"auto"}}>The market is framing tonight as a cyclical miss. That&apos;s the wrong lens. The real variable is whether Middle East AI infrastructure demand, a material portion of H100 and H200 backlog, — is sitting inside a BIS export control gray zone that management can no longer credibly dismiss. A 5% EPS miss against consensus is recoverable within two weeks if the demand narrative stays intact. Management hedging on shipment timelines is not recoverable on the same horizon — it reframes the entire investment thesis from a cyclical event into a structural demand ceiling, and those are priced differently.</p>
              <p className="post-text" style={{marginTop:"12px",textAlign:"justify",hyphens:"auto"}}>The number that matters most tonight is not the EPS print. It is the data center revenue guidance for next quarter. If NVIDIA maintains or raises data center guidance while acknowledging the export control noise, the 35x forward multiple finds support and the selloff is contained. If guidance is cut or withheld, sell-side models break simultaneously across Tier 1 banks, triggering a cascade of price target reductions that mechanically extend the drawdown over the following 48–72 hours — regardless of where the stock opens tomorrow.</p>
              <p className="post-text" style={{marginTop:"12px",textAlign:"justify",hyphens:"auto"}}>The question for the next week is not how fast NVDA bounces. It is whether this is the moment the AI capex supercycle narrative absorbs its first structural challenge — and whether the hyperscalers, reporting over the next two weeks, will start softening their own capex language in response. That is the second-order risk the market is not fully pricing tonight.</p>
            </div>
          </div>
          <p className="closing">ShockBridge Pulse · From market shock to clean signal</p>
        </div>
        <div className="page-footer"><span className="disc">ShockBridge Pulse · shockbridgepulse.com · Not financial advice</span><span className="num">10</span></div>
      </div>
    </>
  );
}
