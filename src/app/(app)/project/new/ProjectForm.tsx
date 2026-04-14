"use client";

import { useState } from "react";

const fields = [
  { id: "brandName", label: "Brand name", placeholder: "LumenSkin" },
  { id: "websiteUrl", label: "Website URL", placeholder: "https://lumenskin.com" },
  { id: "category", label: "Category", placeholder: "Skincare" },
  { id: "competitors", label: "Competitors", placeholder: "Glowmate, AuraLab, PureHalo" },
  { id: "market", label: "Market", placeholder: "United States" },
  { id: "goal", label: "Campaign goal", placeholder: "UGC conversion launch" },
];

const filters = [
  "Short-form only",
  "Last 90 days",
  "US market only",
  "Ads vs organic",
];

type StatusState = "idle" | "submitting" | "success" | "error";

export default function ProjectForm() {
  const [formData, setFormData] = useState({
    brandName: "LumenSkin",
    websiteUrl: "https://lumenskin.com",
    category: "Skincare",
    competitors: "Glowmate, AuraLab, PureHalo",
    market: "United States",
    goal: "UGC conversion launch",
  });
  const [status, setStatus] = useState<{
    state: StatusState;
    message: string;
  }>({ state: "idle", message: "" });

  const handleChange = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [id]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ state: "submitting", message: "Creating project..." });

    try {
      const projectResponse = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!projectResponse.ok) {
        throw new Error("Project creation failed");
      }

      const projectData = await projectResponse.json();

      const ingestResponse = await fetch("/api/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: projectData.project?.id,
          ...formData,
        }),
      });

      if (!ingestResponse.ok) {
        throw new Error("Ingestion failed");
      }

      setStatus({ state: "success", message: "Research started. Redirecting..." });
      window.location.href = "/project/progress";
    } catch {
      setStatus({
        state: "error",
        message: "Unable to start research. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <label
            key={field.id}
            className="rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3 text-sm"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
              {field.label}
            </span>
            <input
              className="mt-2 w-full bg-transparent text-[var(--ink)] outline-none"
              value={formData[field.id as keyof typeof formData]}
              onChange={handleChange(field.id)}
              placeholder={field.placeholder}
            />
          </label>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <span
            key={filter}
            className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-2 text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]"
          >
            {filter}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white"
        >
          {status.state === "submitting" ? "Starting..." : "Start research"}
        </button>
        <button
          type="button"
          className="rounded-full border border-[var(--ink)] px-6 py-3 text-sm font-semibold text-[var(--ink)]"
        >
          Save draft
        </button>
        {status.message ? (
          <span className="text-sm text-[var(--ink-muted)]">{status.message}</span>
        ) : null}
      </div>
    </form>
  );
}
