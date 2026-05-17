"use client";

import { useState } from "react";

type ResultData = {
  code: string;
  plan: string;
  total?: number;
  newTotal?: number;
  used: number;
  remaining?: number;
  newRemaining?: number;
  added?: number;
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#0d0f1a",
  border: "1px solid #2d3148",
  borderRadius: "10px",
  padding: "12px 14px",
  fontSize: "14px",
  color: "#f0f0f0",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#6b7280",
  marginBottom: "6px",
};

export default function TopUpAdmin() {
  const [secret, setSecret]   = useState("");
  const [code, setCode]       = useState("");
  const [amount, setAmount]   = useState("4");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [result, setResult]   = useState<ResultData | null>(null);

  async function call(action: "check" | "topup") {
    setLoading(true);
    setMessage("");
    setResult(null);
    try {
      const res = await fetch("/api/admin/topup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, code, amount: parseInt(amount), action }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsError(false);
        setResult(data as ResultData);
        setMessage(action === "check" ? "Code found." : `Added ${data.added} brief${data.added !== 1 ? "s" : ""} successfully.`);
      } else {
        setIsError(true);
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setIsError(true);
      setMessage("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const resultRows = result
    ? [
        { label: "Code",           value: result.code },
        { label: "Plan",           value: result.plan === "creator" ? "Bridge" : "Snapshot" },
        { label: "Total allocated", value: String(result.newTotal ?? result.total ?? 0) },
        { label: "Used",           value: String(result.used) },
        { label: "Remaining",      value: String(result.newRemaining ?? result.remaining ?? 0) },
        ...(result.added ? [{ label: "Just added", value: `+${result.added}` }] : []),
      ]
    : [];

  return (
    <div style={{ minHeight: "100vh", background: "#0f1117", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ width: "100%", maxWidth: "520px" }}>

        <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#f59e0b", marginBottom: "8px" }}>
          ShockBridge Pulse · Admin
        </p>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#f0f0f0", marginBottom: "4px" }}>
          Credit Top-Up
        </h1>
        <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "32px" }}>
          Check a subscriber&apos;s balance or add briefs after a monthly Bridge renewal.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Admin password */}
          <div>
            <label style={labelStyle}>Admin Password</label>
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Your admin password"
              style={inputStyle}
            />
          </div>

          {/* Code */}
          <div>
            <label style={labelStyle}>Subscriber Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase().trim())}
              placeholder="e.g. BRIDGE-ABC123"
              style={{ ...inputStyle, fontFamily: "monospace", letterSpacing: "0.06em" }}
            />
          </div>

          {/* Amount */}
          <div>
            <label style={labelStyle}>Briefs to Add</label>
            <select
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={inputStyle}
            >
              <option value="1">1 brief</option>
              <option value="2">2 briefs</option>
              <option value="4">4 briefs (standard monthly renewal)</option>
              <option value="8">8 briefs (two months)</option>
            </select>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => call("check")}
              disabled={loading}
              style={{
                flex: 1, padding: "13px",
                background: "transparent", color: "#f59e0b",
                fontSize: "13px", fontWeight: 700,
                borderRadius: "10px", border: "1px solid rgba(245,158,11,0.35)",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.5 : 1,
                transition: "border-color 0.15s",
              }}
            >
              Check Balance
            </button>
            <button
              onClick={() => call("topup")}
              disabled={loading}
              style={{
                flex: 1, padding: "13px",
                background: "#f59e0b", color: "#0a0f1e",
                fontSize: "13px", fontWeight: 700,
                borderRadius: "10px", border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.5 : 1,
              }}
            >
              {loading ? "Working…" : "Add Credits"}
            </button>
          </div>
        </div>

        {/* Result panel */}
        {message && (
          <div style={{
            marginTop: "24px",
            padding: "16px 18px",
            borderRadius: "10px",
            background: isError ? "rgba(239,68,68,0.06)" : "rgba(245,158,11,0.06)",
            border: `1px solid ${isError ? "rgba(239,68,68,0.25)" : "rgba(245,158,11,0.25)"}`,
          }}>
            <p style={{ fontSize: "13px", fontWeight: 700, color: isError ? "#f87171" : "#f59e0b", margin: "0 0 12px 0" }}>
              {message}
            </p>
            {resultRows.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                {resultRows.map((row) => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "12px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {row.label}
                    </span>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: row.label === "Just added" ? "#f59e0b" : "#f0f0f0", fontFamily: "monospace" }}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <p style={{ marginTop: "32px", fontSize: "11px", color: "#374151", textAlign: "center" }}>
          /admin/topup · Authorized access only
        </p>

      </div>
    </div>
  );
}
