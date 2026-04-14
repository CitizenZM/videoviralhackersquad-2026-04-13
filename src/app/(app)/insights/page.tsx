import { storyBreakdown } from "@/lib/sample-data";
import { requireAuthContext } from "@/lib/auth";
import {
  getLatestProjectRepo,
  listContentAssetsRepo,
  listInsightsRepo,
} from "@/lib/repository";

export default async function InsightsPage() {
  const context = await requireAuthContext();
  const project = await getLatestProjectRepo(context.workspaceId);
  const contentAssets = project
    ? await listContentAssetsRepo(context.workspaceId, project.id)
    : [];
  const insights = project
    ? await listInsightsRepo(context.workspaceId, project.id)
    : [];
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="glass-panel rounded-[28px] p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
          Storytelling analysis
        </p>
        <h1 className="font-display text-2xl">{contentAssets[0]?.title}</h1>
        <p className="mt-2 text-sm text-[var(--ink-muted)]">
          Why it worked and how to replicate it.
        </p>
        <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">Hook</p>
            <p className="mt-2 text-[var(--ink)]">{contentAssets[0]?.hookText}</p>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">CTA</p>
            <p className="mt-2 text-[var(--ink)]">{contentAssets[0]?.ctaText}</p>
          </div>
        </div>
        <div className="mt-6 space-y-3">
          {storyBreakdown.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3"
            >
              <p className="text-sm font-semibold">{item.label}</p>
              <p className="text-xs text-[var(--ink-muted)]">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <aside className="space-y-4">
        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
            Key takeaways
          </p>
          <div className="mt-4 space-y-3 text-sm">
            {insights.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3"
              >
                <p className="font-semibold">{item.title}</p>
                <p className="text-xs text-[var(--ink-muted)]">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[28px] border border-[var(--line)] bg-white/80 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
            Replication plan
          </p>
          <p className="mt-3 text-sm text-[var(--ink-muted)]">
            Use creator confession hook, introduce product in 5 seconds, and show proof at second 10
            with demo close-ups.
          </p>
        </div>
      </aside>
    </div>
  );
}
