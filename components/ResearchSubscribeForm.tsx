"use client";

import { useState } from "react";

export function ResearchSubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("You're on the list. I'll notify you when the paper is released.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-500/30 bg-amber-500/5">
        <span className="text-amber-500 mt-0.5">✓</span>
        <p className="text-sm text-[#9ca3af]">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === "loading"}
          className="flex-1 bg-[#0a0d16] border border-[#2d3148] rounded-xl px-4 py-3 text-sm text-[#f0f0f0] placeholder-[#4b5563] focus:outline-none focus:border-amber-500/60 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading" || !email.trim()}
          className="px-5 py-3 rounded-xl bg-amber-500 text-[#0a0d16] text-sm font-semibold hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === "loading" ? "Saving…" : "Notify me"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-xs text-red-400">{message}</p>
      )}
      <p className="text-xs text-[#4b5563]">
        No spam. One email when the paper is released.
      </p>
    </form>
  );
}
