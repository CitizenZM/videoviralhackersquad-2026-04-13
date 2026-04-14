import { exportFormatLabels } from "@/lib/exports";
import { requireAuthContext } from "@/lib/auth";
import { getLatestProjectRepo, listExportJobsRepo } from "@/lib/repository";
import ExportActions from "./ExportActions";

export default async function ExportsPage() {
  const context = await requireAuthContext();
  const project = await getLatestProjectRepo(context.workspaceId);
  const exportJobs = project
    ? await listExportJobsRepo(context.workspaceId, project.id)
    : [];
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="glass-panel rounded-[28px] p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">Exports</p>
        <h1 className="font-display text-2xl">Deliverables ready for clients</h1>
        <div className="mt-6">
          <ExportActions />
        </div>
      </section>

      <aside className="space-y-4">
        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
            Export history
          </p>
          <div className="mt-4 space-y-3 text-sm">
            {exportJobs.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{exportFormatLabels[item.format]}</span>
                  <span className="text-xs text-[var(--ink-muted)]">{item.status}</span>
                </div>
                <p className="text-xs text-[var(--ink-muted)]">{item.createdAt}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[28px] border border-[var(--line)] bg-white/80 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
            Compliance
          </p>
          <p className="mt-3 text-sm text-[var(--ink-muted)]">
            All exports include source-permission labels and AI inference markers for transparency.
          </p>
        </div>
      </aside>
    </div>
  );
}
