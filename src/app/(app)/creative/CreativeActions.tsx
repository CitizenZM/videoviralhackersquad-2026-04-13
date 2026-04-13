"use client";

import { useState } from "react";

export default function CreativeActions() {
  const [status, setStatus] = useState("Idle");

  const handleGenerate = async () => {
    setStatus("Generating creative...");
    try {
      const response = await fetch("/api/creative", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal: "UGC conversion",
          channel: "YouTube",
          audience: "Skincare buyers",
          tone: "Confident, proof-driven",
        }),
      });

      if (!response.ok) {
        throw new Error("Creative generation failed");
      }

      setStatus("Creative output refreshed.");
    } catch {
      setStatus("Unable to generate creative. Try again.");
    }
  };

  return (
    <div className="mt-6 rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3 text-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-semibold">Generate new creative</p>
          <p className="text-xs text-[var(--ink-muted)]">Uses current inputs and goals</p>
        </div>
        <button
          onClick={handleGenerate}
          className="rounded-full bg-[var(--accent)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-white"
        >
          Generate
        </button>
      </div>
      <p className="mt-2 text-xs text-[var(--ink-muted)]">{status}</p>
    </div>
  );
}
