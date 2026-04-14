import { creativeTestMatrix } from "@/lib/sample-data";
import { requireAuthContext } from "@/lib/auth";
import {
  getLatestProjectRepo,
  listScriptsRepo,
  listStoryboardsRepo,
} from "@/lib/repository";
import CreativeActions from "./CreativeActions";

const angles = [
  "Authority proof: dermatologist-backed glow in 7 days",
  "Routine swap: replace 3 products with 1",
  "Texture demo: instant absorption on camera",
  "Founder insight: why the formula exists",
  "UGC confession: stopped using filters",
];

export default async function CreativePage() {
  const context = await requireAuthContext();
  const project = await getLatestProjectRepo(context.workspaceId);
  const scripts = project
    ? await listScriptsRepo(context.workspaceId, project.id)
    : [];
  const storyboards = project
    ? await listStoryboardsRepo(context.workspaceId, project.id)
    : [];
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="glass-panel rounded-[28px] p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
                Creative generator
              </p>
              <h1 className="font-display text-2xl">UGC conversion sprint</h1>
            </div>
            <span className="rounded-full bg-[var(--accent)]/15 px-3 py-1 text-xs text-[var(--accent)]">
              10 angles
            </span>
          </div>
          <div className="mt-6 space-y-3 text-sm">
            {angles.map((angle) => (
              <div
                key={angle}
                className="rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3"
              >
                {angle}
              </div>
            ))}
          </div>
          <CreativeActions />
        </section>

        <aside className="space-y-4">
          <div className="glass-panel rounded-[28px] p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
              Scripts
            </p>
            <div className="mt-4 space-y-3 text-sm">
              {scripts.map((script) => (
                <div
                  key={script.title}
                  className="rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3"
                >
                  <p className="font-semibold">{script.title}</p>
                  <p className="text-xs text-[var(--ink-muted)]">{script.scriptText}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] border border-[var(--line)] bg-white/80 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
              Storyboard output
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {Array.from({ length: storyboards[0]?.frames ?? 6 }).map((_, index) => (
                <div
                  key={`story-${index}`}
                  className="aspect-[4/5] rounded-2xl bg-[linear-gradient(135deg,_#f9e6d5,_#f7c9a8)]"
                />
              ))}
            </div>
          </div>
        </aside>
      </div>
      <div className="glass-panel rounded-[28px] p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
              Creative test matrix
            </p>
            <h2 className="font-display text-xl">Predictive creative scoring</h2>
            <p className="text-xs text-[var(--ink-muted)]">
              These are directional scores to help prioritize variants, not actual media performance.
            </p>
          </div>
          <span className="rounded-full bg-[var(--accent-2)]/20 px-3 py-1 text-xs text-[var(--accent-2)]">
            {creativeTestMatrix.length} variants
          </span>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="text-[var(--ink-muted)]">
              <tr>
                <th className="py-2 pr-4">Hook</th>
                <th className="py-2 pr-4">Narrative</th>
                <th className="py-2 pr-4">CTA</th>
                <th className="py-2 pr-4">Structure</th>
                <th className="py-2 pr-4">Platform</th>
                <th className="py-2 pr-4">Funnel</th>
                <th className="py-2 pr-4">CTR</th>
                <th className="py-2 pr-4">Hold</th>
                <th className="py-2">Intent</th>
              </tr>
            </thead>
            <tbody>
              {creativeTestMatrix.map((variant) => (
                <tr key={variant.id} className="border-t border-[var(--line)]">
                  <td className="py-2 pr-4">{variant.hook}</td>
                  <td className="py-2 pr-4">{variant.narrative}</td>
                  <td className="py-2 pr-4">{variant.cta}</td>
                  <td className="py-2 pr-4">{variant.structure}</td>
                  <td className="py-2 pr-4">{variant.platformFit}</td>
                  <td className="py-2 pr-4">{variant.funnelStage}</td>
                  <td className="py-2 pr-4">{variant.predictedCtr.toFixed(2)}</td>
                  <td className="py-2 pr-4">{variant.predictedHoldRate.toFixed(2)}</td>
                  <td className="py-2">{variant.predictedIntent.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
