"use client";

import { useState } from "react";

export default function PreviewActions() {
  const [status, setStatus] = useState("Idle");

  const handleGenerate = async () => {
    setStatus("Queueing preview...");
    try {
      const response = await fetch("/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conceptId: "concept-a",
          durationSeconds: 8,
          aspectRatio: "9:16",
        }),
      });

      if (!response.ok) {
        throw new Error("Preview failed");
      }

      setStatus("Preview queued. Check progress panel.");
    } catch {
      setStatus("Unable to queue preview. Try again.");
    }
  };

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3 text-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-semibold">Generate new preview</p>
          <p className="text-xs text-[var(--ink-muted)]">Uses Runway for motion</p>
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
