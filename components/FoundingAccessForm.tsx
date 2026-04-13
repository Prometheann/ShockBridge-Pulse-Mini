"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function FoundingAccessForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/founding-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-500/30 bg-amber-500/5">
        <span className="text-amber-500 mt-0.5">✓</span>
        <div className="space-y-1">
          <p className="text-sm text-[#f0f0f0]">Application received.</p>
          <p className="text-xs text-[#6b7280]">I'll be in touch directly.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        disabled={status === "loading"}
        className="w-full bg-[#0a0d16] border border-[#2d3148] rounded-xl px-4 py-3 text-sm text-[#f0f0f0] placeholder-[#4b5563] focus:outline-none focus:border-amber-500/60 transition-colors disabled:opacity-50"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Brief context — what draws you to Founding Access? (optional)"
        rows={3}
        disabled={status === "loading"}
        className="w-full bg-[#0a0d16] border border-[#2d3148] rounded-xl px-4 py-3 text-sm text-[#f0f0f0] placeholder-[#4b5563] focus:outline-none focus:border-amber-500/60 transition-colors disabled:opacity-50 resize-none"
      />
      <button
        type="submit"
        disabled={status === "loading" || !email.trim()}
        className="w-full py-3 rounded-xl bg-amber-500 text-[#0a0d16] text-sm font-semibold hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Sending…" : "Apply for Founding Access"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-400">{errorMsg}</p>
      )}
    </form>
  );
}
