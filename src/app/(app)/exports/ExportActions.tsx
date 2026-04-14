"use client";

import { useState } from "react";
import { exportFormatLabels } from "@/lib/exports";

const exportOptions = [
  { label: "Executive report", format: "pdf" },
  { label: "Client presentation", format: "slides" },
  { label: "Content library", format: "csv" },
  { label: "Notion workspace", format: "notion" },
] as const;

export default function ExportActions() {
  const [status, setStatus] = useState("Idle");

  const handleExport = async (format: (typeof exportOptions)[number]["format"]) => {
    setStatus(`Queueing ${format.toUpperCase()} export...`);
    try {
      const response = await fetch("/api/exports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          format,
          projectId: "project-001",
        }),
      });

      if (!response.ok) {
        throw new Error("Export failed");
      }

      setStatus(`Export queued: ${exportFormatLabels[format]}`);
    } catch {
      setStatus("Unable to queue export. Try again.");
    }
  };

  return (
    <div className="space-y-4">
      {exportOptions.map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-between rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3"
        >
          <div>
            <p className="font-semibold">{item.label}</p>
            <p className="text-xs text-[var(--ink-muted)]">
              Format: {exportFormatLabels[item.format]}
            </p>
          </div>
          <button
            onClick={() => handleExport(item.format)}
            className="rounded-full bg-[var(--ink)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-white"
          >
            Export
          </button>
        </div>
      ))}
      <p className="text-xs text-[var(--ink-muted)]">{status}</p>
    </div>
  );
}
