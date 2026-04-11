"use client";

import { useState } from "react";

const STAGES = [
  { value: "1", label: "Stage 1 — Conceptual framework locked" },
  { value: "2", label: "Stage 2 — Data construction complete" },
  { value: "3", label: "Stage 3 — First empirical results in" },
  { value: "4", label: "Stage 4 — Monte Carlo calibration done" },
  { value: "5", label: "Stage 5 — Paper draft complete" },
];

export default function ResearchUpdateAdmin() {
  const [secret, setSecret] = useState("");
  const [stage, setStage] = useState("1");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState("");

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/research-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, stage, message }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setResult(`✓ Sent to ${data.sent} subscriber${data.sent !== 1 ? "s" : ""}.`);
        setMessage("");
      } else {
        setStatus("error");
        setResult(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setResult("Network error. Try again.");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0f1117", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ width: "100%", maxWidth: "520px" }}>

        <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#f59e0b", marginBottom: "8px" }}>
          ShockBridge Pulse
        </p>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#f0f0f0", marginBottom: "4px" }}>
          Send Research Update
        </h1>
        <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "32px" }}>
          Notifies all subscribers of From Spot to Stress.
        </p>

        <form onSubmit={handleSend} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Secret */}
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b7280", marginBottom: "6px" }}>
              Password
            </label>
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              required
              placeholder="Your admin password"
              style={{ width: "100%", background: "#0d0f1a", border: "1px solid #2d3148", borderRadius: "10px", padding: "12px 14px", fontSize: "14px", color: "#f0f0f0", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          {/* Stage */}
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b7280", marginBottom: "6px" }}>
              Stage
            </label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              style={{ width: "100%", background: "#0d0f1a", border: "1px solid #2d3148", borderRadius: "10px", padding: "12px 14px", fontSize: "14px", color: "#f0f0f0", outline: "none", boxSizing: "border-box" }}
            >
              {STAGES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b7280", marginBottom: "6px" }}>
              Update message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              placeholder="Write a short update for your subscribers — what was completed, what it means for the paper, what comes next."
              style={{ width: "100%", background: "#0d0f1a", border: "1px solid #2d3148", borderRadius: "10px", padding: "12px 14px", fontSize: "14px", color: "#f0f0f0", outline: "none", resize: "vertical", boxSizing: "border-box", lineHeight: 1.6 }}
            />
          </div>

          {/* Send button */}
          <button
            type="submit"
            disabled={status === "loading"}
            style={{ padding: "14px", background: "#f59e0b", color: "#0a0f1e", fontSize: "14px", fontWeight: 700, borderRadius: "10px", border: "none", cursor: status === "loading" ? "not-allowed" : "pointer", opacity: status === "loading" ? 0.6 : 1 }}
          >
            {status === "loading" ? "Sending…" : "Send Update to All Subscribers"}
          </button>

        </form>

        {/* Result */}
        {result && (
          <div style={{ marginTop: "16px", padding: "12px 16px", borderRadius: "10px", background: status === "success" ? "rgba(245,158,11,0.08)" : "rgba(239,68,68,0.08)", border: `1px solid ${status === "success" ? "rgba(245,158,11,0.3)" : "rgba(239,68,68,0.3)"}` }}>
            <p style={{ fontSize: "14px", color: status === "success" ? "#f59e0b" : "#f87171", margin: 0 }}>
              {result}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
