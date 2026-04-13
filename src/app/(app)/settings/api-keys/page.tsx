import { requireAuthContext } from "@/lib/auth";
import { getLatestProjectRepo, listPreviewAssetsRepo } from "@/lib/repository";
import ApiKeysForm from "./ApiKeysForm";

export default async function ApiKeysPage() {
  const context = await requireAuthContext();
  const project = await getLatestProjectRepo(context.workspaceId);
  const previewAssets = project
    ? await listPreviewAssetsRepo(context.workspaceId, project.id)
    : [];
  const previewCount = previewAssets.filter((asset) => asset.type === "video_preview").length;
  const frameCount = previewAssets.filter((asset) => asset.type === "frameboard").length;
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="glass-panel rounded-[28px] p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
          Workspace API keys
        </p>
        <h1 className="font-display text-2xl">Manage generation providers</h1>
        <div className="mt-6">
          <ApiKeysForm />
        </div>
      </section>

      <aside className="space-y-4">
        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
            Key usage
          </p>
          <div className="mt-4 space-y-3 text-sm">
            <div className="rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3">
              Frameboards generated: {frameCount}
            </div>
            <div className="rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3">
              Preview videos generated: {previewCount}
            </div>
          </div>
        </div>
        <div className="rounded-[28px] border border-[var(--line)] bg-white/80 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
            Security
          </p>
          <p className="mt-3 text-sm text-[var(--ink-muted)]">
            Keys are stored at workspace level and only accessible by admins.
          </p>
        </div>
      </aside>
    </div>
  );
}
