import { requireAuthContext } from "@/lib/auth";
import { getLatestProjectRepo, listPreviewAssetsRepo } from "@/lib/repository";
import PreviewActions from "./PreviewActions";

const previewJobs = [
  { title: "Concept A: 5s run-through", status: "Rendering", eta: "3m" },
  { title: "Concept B: 10s demo", status: "Queued", eta: "7m" },
  { title: "Concept C: 6s hook test", status: "Queued", eta: "9m" },
];

export default async function PreviewPage() {
  const context = await requireAuthContext();
  const project = await getLatestProjectRepo(context.workspaceId);
  const previewAssets = project
    ? await listPreviewAssetsRepo(context.workspaceId, project.id)
    : [];
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="glass-panel rounded-[28px] p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
              AI preview studio
            </p>
            <h1 className="font-display text-2xl">Preview queue</h1>
          </div>
          <span className="rounded-full bg-[var(--accent-2)]/20 px-3 py-1 text-xs text-[var(--accent-2)]">
            Runway active
          </span>
        </div>
        <div className="mt-6 space-y-3">
          {previewJobs.map((job) => (
            <div
              key={job.title}
              className="rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">{job.title}</span>
                <span className="text-xs text-[var(--ink-muted)]">ETA {job.eta}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-[var(--ink-muted)]">
                <span>{job.status}</span>
                <span className="h-2 w-24 rounded-full bg-[var(--paper-strong)]">
                  <span className="block h-full w-2/3 rounded-full bg-[var(--accent)]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <aside className="space-y-4">
        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
            Generated frames
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {previewAssets.map((asset) => (
              <div
                key={asset.id}
                className="relative aspect-[4/5] rounded-2xl bg-[linear-gradient(160deg,_#d1f1e6,_#f7d9c4)]"
              >
                <span className="absolute left-2 top-2 rounded-full bg-white/80 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                  {asset.type.replace("_", " ")}
                </span>
                <span className="absolute bottom-2 left-2 rounded-full bg-[var(--accent)]/15 px-2 py-1 text-[10px] text-[var(--accent)]">
                  {asset.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[28px] border border-[var(--line)] bg-white/80 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
            Preview settings
          </p>
          <div className="mt-4 space-y-2 text-sm text-[var(--ink-muted)]">
            <div className="rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3">
              Output length: 5-10 seconds
            </div>
            <div className="rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3">
              Aspect ratio: 9:16
            </div>
            <div className="rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3">
              Model: Runway Gen-3
            </div>
          </div>
        </div>
        <PreviewActions />
      </aside>
    </div>
  );
}
