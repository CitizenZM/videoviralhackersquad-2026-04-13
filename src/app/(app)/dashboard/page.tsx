import { requireAuthContext } from "@/lib/auth";
import { getLatestProjectRepo, listContentAssetsRepo } from "@/lib/repository";

const kpis = [
  { label: "Brand health", value: "Strong", detail: "+14% vs last quarter" },
  { label: "Content opportunity", value: "82", detail: "Score out of 100" },
  { label: "Competitor gap", value: "37", detail: "Missed narratives" },
  { label: "Top channels", value: "YouTube", detail: "UGC + demo" },
];

const angles = [
  "Transformation proof in 7 days",
  "Derm-backed routine swap",
  "Morning glow ritual",
  "Visible texture demo",
  "Founder credibility story",
];

const themes = [
  "Hydration",
  "Barrier repair",
  "Sensitive skin",
  "Routine simplification",
  "Night-time ritual",
];

export default async function DashboardPage() {
  const context = await requireAuthContext();
  const project = await getLatestProjectRepo(context.workspaceId);
  const contentAssets = project
    ? await listContentAssetsRepo(context.workspaceId, project.id)
    : [];
  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-[28px] p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
              Executive overview
            </p>
            <h1 className="font-display text-2xl">Market snapshot</h1>
          </div>
          <span className="rounded-full bg-[var(--accent-2)]/20 px-3 py-1 text-xs text-[var(--accent-2)]">
            {project ? "Updated recently" : "No project yet"}
          </span>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {kpis.map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-2xl border border-[var(--line)] bg-white/85 px-4 py-4"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                    {kpi.label}
                  </p>
                  <p className="mt-2 font-display text-2xl">{kpi.value}</p>
                  <p className="text-xs text-[var(--ink-muted)]">{kpi.detail}</p>
                </div>
              ))}
              <div className="rounded-2xl border border-[var(--line)] bg-white/85 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                  Assets indexed
                </p>
                <p className="mt-2 font-display text-2xl">{contentAssets.length}</p>
                <p className="text-xs text-[var(--ink-muted)]">From latest project</p>
              </div>
            </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
            Top winning angles
          </p>
          <div className="mt-4 space-y-3 text-sm">
            {angles.map((angle) => (
              <div
                key={angle}
                className="rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3"
              >
                {angle}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[28px] border border-[var(--line)] bg-white/80 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
            Category themes
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {themes.map((theme) => (
              <div
                key={theme}
                className="rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3 text-sm"
              >
                {theme}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3 text-sm">
            Recommended next 5 ad angles ready in Creative Generator
          </div>
        </div>
      </section>
    </div>
  );
}
