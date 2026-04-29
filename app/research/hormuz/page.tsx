import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const C = "min(1180px, calc(100% - 32px))";
const SH = "0 20px 50px rgba(0,0,0,.35)";

const btnPrimary: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  padding: "13px 22px", borderRadius: "999px", border: "1px solid transparent",
  fontWeight: 600, background: "linear-gradient(180deg, #f4c978, #d8a145)",
  color: "#15110a", boxShadow: "0 12px 30px rgba(216,161,69,.18)",
  textDecoration: "none", whiteSpace: "nowrap", cursor: "pointer", fontSize: "15px",
};

const btnSecondary: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  padding: "13px 22px", borderRadius: "999px",
  border: "1px solid rgba(255,255,255,.08)",
  fontWeight: 600, background: "rgba(255,255,255,.03)", color: "#f2f4f8",
  textDecoration: "none", whiteSpace: "nowrap",
};

const metrics = [
  { label: "Panel window", value: "2020–2026", note: "Seventeen public daily series, no synthetic inputs" },
  { label: "Long-horizon structure", value: "ρ = 0.825", note: "Sparse scale-64 Brent↔SOX direction" },
  { label: "Transmission clock", value: "2 layers", note: "Immediate energy repricing, slower helium channel" },
  { label: "Tail frame", value: "26 weeks", note: "Designed for the quarterly horizon, not only day zero" },
];

const cards = [
  { num: "01", title: "Real data, no synthetic inputs", body: "The framework uses a public daily panel from January 2020 to April 2026, built to study cross-block transmission under live geopolitical stress rather than only abstract macro shock." },
  { num: "02", title: "Two-layer transmission", body: "The first layer is immediate and visible: energy, freight, rates, FX, volatility. The second layer is slower: helium pressure feeding semiconductor stress and downstream compute constraints." },
  { num: "03", title: "Long-horizon bottleneck", body: "At the 64-day scale, the structure sharpens rather than disappears. Sparse CCA collapses the quarterly regime into a single Brent↔SOX direction with a held-out correlation of 0.825." },
];

const watchlist = [
  { item: "Tanker and LNG stress signals", note: "visible first-order repricing" },
  { item: "New Hormuz escalation windows", note: "changes event intensity" },
  { item: "Helium-window pressure", note: "delayed industrial propagation" },
  { item: "SOX / SMH long-horizon weakness", note: "quarterly bottleneck expression" },
];

const checklist = [
  "The two-layer transmission model",
  "The long-horizon Brent↔SOX bottleneck in plain English",
  "What to watch next week, not just what happened today",
  "A cleaner lens for semiconductors and AI-compute risk",
];

export default function HormuzPage() {
  return (
    <>
      <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />

      <style>{`
        @media (max-width: 980px) {
          .hz-hero    { grid-template-columns: 1fr !important; }
          .hz-cards   { grid-template-columns: 1fr !important; }
          .hz-brief   { grid-template-columns: 1fr !important; }
          .hz-news    { grid-template-columns: 1fr !important; }
          .hz-signal  { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .hz-h1      { font-size: 42px !important; max-width: none !important; }
          .hz-signal  { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: `
          radial-gradient(1000px 500px at 82% -10%, rgba(216,161,69,.11), transparent 55%),
          radial-gradient(800px 400px at 0% 20%, rgba(199,100,72,.07), transparent 50%),
          linear-gradient(180deg, #0a0c11 0%, #0d1016 100%)
        `,
        color: "#f2f4f8",
        fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
        lineHeight: 1.55,
      }}>
        <Header />

        <main>

          {/* ─────────────── HERO ─────────────── */}
          <section style={{ padding: "72px 0 40px", position: "relative", overflow: "hidden" }}>
            <div style={{ width: C, margin: "0 auto" }}>
              <div className="hz-hero" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "28px", alignItems: "stretch" }}>

                {/* Copy */}
                <div style={{ padding: "22px 0 10px" }}>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "10px",
                    padding: "8px 14px", border: "1px solid rgba(216,161,69,.22)",
                    borderRadius: "999px", background: "rgba(216,161,69,.06)",
                    color: "#f4c978", fontSize: "12px", textTransform: "uppercase",
                    letterSpacing: ".12em", fontWeight: 700, marginBottom: "4px",
                  }}>
                    ShockBridge Pulse Research · Crisis Extension
                  </div>

                  <h1 className="hz-h1" style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "clamp(42px, 6vw, 72px)", lineHeight: ".96",
                    letterSpacing: "-.03em", margin: "18px 0 18px", maxWidth: "13ch",
                  }}>
                    Oil is the Headline.<br />Helium is the Hidden Bottleneck.
                  </h1>

                  <p style={{ color: "#a9b2c3", fontSize: "clamp(17px, 2vw, 21px)", maxWidth: "660px", margin: "0 0 24px" }}>
                    A real-data, high-dimensional framework for tracking how Hormuz stress moves
                    from energy into semiconductors and AI compute.
                  </p>

                  <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", margin: "24px 0 18px" }}>
                    {/* Primary CTA — opens Tally popup */}
                    <button
                      data-tally-open="XxBvBg"
                      data-tally-align-left="1"
                      data-tally-overlay="1"
                      data-tally-emoji-animation="none"
                      data-tally-auto-close="25000"
                      data-tally-form-events-forwarding="1"
                      style={btnPrimary}
                    >
                      Get the Crisis Brief
                    </button>
                    <a href="#research" style={btnSecondary}>Read the Research Summary</a>
                  </div>

                  <p style={{ color: "#7f8aa0", fontSize: "13px", maxWidth: "600px" }}>
                    Built on a real public daily panel, local projections, generalized Morse wavelets,
                    scale-by-scale CCA, and Monte Carlo tail diagnostics.
                  </p>
                </div>

                {/* Signal card */}
                <aside aria-label="Key signals" style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.015))",
                  border: "1px solid rgba(255,255,255,.08)", borderRadius: "28px",
                  boxShadow: SH, overflow: "hidden",
                  display: "flex", flexDirection: "column",
                }}>
                  <div style={{
                    padding: "22px 22px 14px", borderBottom: "1px solid rgba(255,255,255,.05)",
                    display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "18px",
                  }}>
                    <h3 style={{ margin: 0, fontSize: "13px", textTransform: "uppercase", letterSpacing: ".14em", color: "#a9b2c3" }}>
                      What the framework says
                    </h3>
                    <span style={{
                      padding: "6px 10px", borderRadius: "999px",
                      background: "rgba(216,161,69,.08)", color: "#f4c978",
                      fontSize: "11px", textTransform: "uppercase", letterSpacing: ".12em",
                      fontWeight: 700, border: "1px solid rgba(216,161,69,.18)", whiteSpace: "nowrap",
                    }}>Real Data</span>
                  </div>

                  <div className="hz-signal" style={{ padding: "22px", display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "14px" }}>
                    {metrics.map((m) => (
                      <div key={m.label} style={{
                        padding: "16px", background: "rgba(255,255,255,.025)",
                        border: "1px solid rgba(255,255,255,.06)", borderRadius: "18px",
                      }}>
                        <div style={{ color: "#7f8aa0", fontSize: "12px", textTransform: "uppercase", letterSpacing: ".11em", marginBottom: "8px" }}>
                          {m.label}
                        </div>
                        <div style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-.03em", marginBottom: "4px" }}>
                          {m.value}
                        </div>
                        <div style={{ color: "#a9b2c3", fontSize: "12px" }}>{m.note}</div>
                      </div>
                    ))}
                  </div>

                  {/* Transmission timing bar */}
                  <div style={{
                    margin: "0 22px 22px", padding: "18px 18px 16px",
                    background: "linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))",
                    border: "1px solid rgba(255,255,255,.06)", borderRadius: "22px",
                  }}>
                    <h4 style={{ margin: "0 0 14px", fontSize: "13px", textTransform: "uppercase", letterSpacing: ".12em", color: "#a9b2c3" }}>
                      Transmission timing
                    </h4>
                    <div aria-hidden="true" style={{
                      position: "relative", height: "88px", borderRadius: "14px", overflow: "hidden",
                      background: "linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))",
                      border: "1px solid rgba(255,255,255,.05)",
                    }}>
                      <div style={{ position: "absolute", left: "2%", top: "16%", width: "34%", height: "22px", background: "linear-gradient(90deg, rgba(199,100,72,.8), rgba(216,161,69,.72))", borderRadius: "999px", filter: "blur(.2px)" }} />
                      <div style={{ position: "absolute", left: "39%", top: "42%", width: "18%", height: "14px", background: "rgba(255,255,255,.09)", borderRadius: "999px" }} />
                      <div style={{ position: "absolute", left: "58%", bottom: "18%", width: "34%", height: "24px", background: "linear-gradient(90deg, rgba(216,161,69,.38), rgba(244,201,120,.88))", borderRadius: "999px" }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginTop: "10px", color: "#7f8aa0", fontSize: "11px" }}>
                      <span>Energy, LNG, freight</span>
                      <span>Ambiguous window</span>
                      <span>Industrial bottleneck</span>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </section>

          {/* ─────────────── RESEARCH SECTION ─────────────── */}
          <section id="research" style={{ padding: "48px 0" }}>
            <div style={{ width: C, margin: "0 auto" }}>
              <h2 style={{
                margin: "0 0 10px", fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(26px, 4vw, 42px)", lineHeight: "1.06", letterSpacing: "-.03em",
              }}>
                What the market sees first is not the whole transmission.
              </h2>
              <p style={{ color: "#a9b2c3", maxWidth: "780px", fontSize: "18px", margin: "0 0 22px" }}>
                Most coverage stops at oil, LNG, freight, and volatility. This research tracks the slower,
                easier-to-miss industrial channel: helium logistics into semiconductor fabrication, and from
                there into AI-compute capacity.
              </p>

              <div className="hz-cards" style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "18px", marginTop: "18px" }}>
                {cards.map((c) => (
                  <article key={c.num} style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.015))",
                    border: "1px solid rgba(255,255,255,.08)", borderRadius: "22px",
                    padding: "22px", boxShadow: SH,
                  }}>
                    <div style={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      width: "34px", height: "34px", borderRadius: "50%",
                      background: "rgba(216,161,69,.12)", color: "#f4c978",
                      fontSize: "14px", fontWeight: 800,
                      border: "1px solid rgba(216,161,69,.22)", marginBottom: "14px",
                    }}>
                      {c.num}
                    </div>
                    <h3 style={{ margin: "0 0 8px", fontSize: "20px", lineHeight: "1.15", letterSpacing: "-.02em" }}>{c.title}</h3>
                    <p style={{ margin: 0, color: "#a9b2c3", fontSize: "15px" }}>{c.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ─────────────── NEWS STRIP ─────────────── */}
          <section style={{ padding: "10px 0 48px" }}>
            <div style={{ width: C, margin: "0 auto" }}>
              <div className="hz-news" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "20px" }}>
                <div style={{
                  padding: "28px", borderRadius: "24px",
                  border: "1px solid rgba(255,255,255,.08)",
                  background: "linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.015))",
                  boxShadow: SH,
                }}>
                  <div style={{ color: "#7f8aa0", textTransform: "uppercase", letterSpacing: ".12em", fontSize: "12px", marginBottom: "12px" }}>
                    Today's live framing
                  </div>
                  <h3 style={{ margin: "0 0 14px", fontSize: "clamp(24px, 3vw, 32px)", lineHeight: "1.04", letterSpacing: "-.03em" }}>
                    Hormuz is not only an oil story. The delayed risk may be in chips and AI compute.
                  </h3>
                  <p style={{ margin: 0, color: "#a9b2c3", fontSize: "16px" }}>
                    The visible shock reprices fast. The industrial bottleneck arrives later, when helium logistics,
                    fab allocation, and downstream technology risk start to matter more than the first headline.
                  </p>
                </div>

                <div style={{
                  padding: "24px", borderRadius: "24px",
                  border: "1px solid rgba(255,255,255,.08)",
                  background: "linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.015))",
                  boxShadow: SH,
                }}>
                  <h4 style={{ margin: "0 0 16px", fontSize: "13px", textTransform: "uppercase", letterSpacing: ".13em", color: "#a9b2c3" }}>
                    What I'm watching next
                  </h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "14px" }}>
                    {watchlist.map((w, i) => (
                      <li key={i} style={{
                        display: "flex", justifyContent: "space-between", gap: "16px",
                        alignItems: "flex-start", paddingBottom: "14px",
                        borderBottom: i < watchlist.length - 1 ? "1px solid rgba(255,255,255,.05)" : "none",
                        fontSize: "15px",
                      }}>
                        <span>{w.item}</span>
                        <span style={{ color: "#7f8aa0", fontSize: "13px", textAlign: "right", flexShrink: 0, maxWidth: "16ch" }}>{w.note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ─────────────── BRIEF / CTA ─────────────── */}
          <section id="brief" style={{ padding: "10px 0 72px" }}>
            <div style={{ width: C, margin: "0 auto" }}>
              <div className="hz-brief" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "24px", alignItems: "start" }}>

                {/* Left: what's inside */}
                <div style={{
                  background: "linear-gradient(180deg, rgba(216,161,69,.07), rgba(255,255,255,.02))",
                  border: "1px solid rgba(216,161,69,.15)", borderRadius: "24px",
                  padding: "28px", boxShadow: SH,
                }}>
                  <h3 style={{ margin: "0 0 12px", fontSize: "clamp(22px, 3vw, 28px)", lineHeight: "1.08", letterSpacing: "-.03em" }}>
                    Get the 1-Page Hormuz Transmission Brief
                  </h3>
                  <p style={{ margin: "0 0 20px", color: "#a9b2c3", fontSize: "17px" }}>
                    A sharp, research-driven note for people tracking what may happen after the visible oil shock:
                    the slower industrial path into semiconductors, AI hardware, and compute capacity.
                  </p>
                  <div style={{ display: "grid", gap: "14px" }}>
                    {checklist.map((line) => (
                      <div key={line} style={{ display: "flex", gap: "12px", alignItems: "flex-start", color: "#a9b2c3" }}>
                        <span style={{
                          flexShrink: 0, width: "22px", height: "22px", borderRadius: "50%",
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                          background: "rgba(216,161,69,.12)", border: "1px solid rgba(216,161,69,.2)",
                          color: "#f4c978", fontSize: "12px",
                        }}>✓</span>
                        <span style={{ fontSize: "15px" }}>{line}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Tally CTA */}
                <div style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.015))",
                  border: "1px solid rgba(255,255,255,.08)", borderRadius: "24px",
                  padding: "28px", boxShadow: SH,
                  display: "flex", flexDirection: "column", gap: "20px",
                }}>
                  <div>
                    <h3 style={{ margin: "0 0 8px", fontSize: "24px", letterSpacing: "-.02em" }}>
                      Send me the brief
                    </h3>
                    <p style={{ margin: 0, color: "#a9b2c3", fontSize: "15px" }}>
                      Takes 30 seconds. I'll send the Hormuz Transmission Brief directly to your inbox.
                    </p>
                  </div>

                  <button
                    data-tally-open="XxBvBg"
                    data-tally-align-left="1"
                    data-tally-overlay="1"
                    data-tally-emoji-animation="none"
                    data-tally-auto-close="25000"
                    data-tally-form-events-forwarding="1"
                    style={{ ...btnPrimary, width: "100%", justifyContent: "center", padding: "15px 22px", fontSize: "16px" }}
                  >
                    Get the Crisis Brief
                  </button>

                  <p style={{ margin: 0, color: "#7f8aa0", fontSize: "13px" }}>
                    I'll only email major updates, new crisis notes, and research releases.
                  </p>
                </div>

              </div>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  );
}
