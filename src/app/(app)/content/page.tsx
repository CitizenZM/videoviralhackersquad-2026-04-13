import { requireAuthContext } from "@/lib/auth";
import { getLatestProjectRepo, listContentAssetsRepo } from "@/lib/repository";

export default async function ContentPage() {
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
              Content intelligence
            </p>
            <h1 className="font-display text-2xl">Top winning content</h1>
          </div>
          <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
            <span className="rounded-full border border-[var(--line)] bg-white/80 px-3 py-2">
              YouTube
            </span>
            <span className="rounded-full border border-[var(--line)] bg-white/80 px-3 py-2">
              Last 90 days
            </span>
            <span className="rounded-full border border-[var(--line)] bg-white/80 px-3 py-2">
              US market
            </span>
          </div>
        </div>
        <div className="mt-6 grid gap-4">
          {contentAssets.map((asset) => (
            <div
              key={asset.title}
              className="rounded-2xl border border-[var(--line)] bg-white/90 px-5 py-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">{asset.title}</p>
                  <p className="text-xs text-[var(--ink-muted)]">
                    {asset.creatorName ?? "Unknown creator"} · {asset.views?.toLocaleString() ?? 0} views
                  </p>
                </div>
                <span className="rounded-full bg-[var(--accent-2)]/20 px-3 py-1 text-xs text-[var(--accent-2)]">
                  Score {asset.aiQualityScore ?? "--"}
                </span>
              </div>
              <div className="mt-3 grid gap-3 text-sm text-[var(--ink-muted)] sm:grid-cols-2">
                <p>
                  Hook: <span className="text-[var(--ink)]">{asset.hookText ?? "--"}</span>
                </p>
                <p>
                  Narrative: <span className="text-[var(--ink)]">{asset.narrativeType ?? "--"}</span>
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-[var(--ink-muted)]">
                <span className="rounded-full border border-[var(--line)] bg-white/80 px-3 py-1">
                  Source: {asset.sourceType.replace("_", " ")}
                </span>
                <span className="rounded-full border border-[var(--line)] bg-white/80 px-3 py-1">
                  Platform: {asset.sourcePlatform}
                </span>
                <span className="rounded-full border border-[var(--line)] bg-white/80 px-3 py-1">
                  Ad fit: {asset.adSuitabilityScore ?? "--"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
