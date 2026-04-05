"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { MemoInput } from "@/types/memo";

interface GeneratorFormProps {
  onSubmit: (input: MemoInput) => void;
  loading: boolean;
}

const EVENT_TYPES = [
  "Oil spike / drop",
  "CPI surprise",
  "Fed rate decision",
  "Tariff shock",
  "Earnings beat",
  "Earnings miss",
  "Currency move",
  "Credit event",
  "Growth data surprise",
  "Geopolitical shock",
  "Other",
];

const REGIONS = ["Brazil / B3", "United States", "Global", "Europe", "China / EM Asia", "Latin America"];
const HORIZONS = ["24 hours", "1 week", "1 month", "3 months"];
const TONES = ["Conservative", "Balanced", "Aggressive"];

export function GeneratorForm({ onSubmit, loading }: GeneratorFormProps) {
  const [form, setForm] = useState<MemoInput>({
    eventType: "",
    region: "",
    sectorAsset: "",
    horizon: "1 week",
    tone: "Balanced",
    optionalNote: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.eventType || !form.region || !form.sectorAsset) return;
    onSubmit(form);
  }

  const inputClass =
    "w-full bg-[#0f1117] border border-[#2d3148] rounded-xl px-4 py-3 text-[#f0f0f0] text-sm placeholder-[#6b7280] focus:outline-none focus:border-amber-500/50 transition-colors";

  const labelClass = "block text-sm font-medium text-[#9ca3af] mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Event Type */}
      <div>
        <label className={labelClass}>Event type *</label>
        <select name="eventType" value={form.eventType} onChange={handleChange} className={inputClass} required>
          <option value="">Select event...</option>
          {EVENT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Region */}
      <div>
        <label className={labelClass}>Region *</label>
        <select name="region" value={form.region} onChange={handleChange} className={inputClass} required>
          <option value="">Select region...</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Sector / Asset */}
      <div>
        <label className={labelClass}>Sector or asset *</label>
        <input
          name="sectorAsset"
          value={form.sectorAsset}
          onChange={handleChange}
          placeholder="e.g. Energy, Banks, BRL, Semis, Crypto..."
          className={inputClass}
          required
        />
      </div>

      {/* Horizon + Tone */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Horizon</label>
          <select name="horizon" value={form.horizon} onChange={handleChange} className={inputClass}>
            {HORIZONS.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Tone</label>
          <select name="tone" value={form.tone} onChange={handleChange} className={inputClass}>
            {TONES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Optional note */}
      <div>
        <label className={labelClass}>
          Optional thesis / context{" "}
          <span className="text-[#6b7280] font-normal">(optional)</span>
        </label>
        <textarea
          name="optionalNote"
          value={form.optionalNote}
          onChange={handleChange}
          placeholder="Add any specific angle, assumption, or context you want the memo to consider..."
          className={`${inputClass} h-20 resize-none`}
        />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Generating..." : "Generate Memo"}
      </Button>
    </form>
  );
}
