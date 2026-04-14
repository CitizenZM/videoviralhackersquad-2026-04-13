import ProjectForm from "./ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="glass-panel rounded-[28px] p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
              New project
            </p>
            <h1 className="font-display text-2xl">Create a research sprint</h1>
          </div>
          <span className="rounded-full bg-[var(--accent-2)]/20 px-3 py-1 text-xs text-[var(--accent-2)]">
            3 min setup
          </span>
        </div>
        <div className="mt-6">
          <ProjectForm />
        </div>
      </section>

      <aside className="space-y-4">
        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
            What happens next
          </p>
          <ul className="mt-4 space-y-3 text-sm text-[var(--ink-muted)]">
            <li>Website crawl + SEO extraction</li>
            <li>YouTube discovery and scoring</li>
            <li>Public mentions clustering</li>
            <li>Creative insights summary</li>
          </ul>
        </div>
        <div className="rounded-[28px] border border-[var(--line)] bg-white/80 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
            Permissions
          </p>
          <p className="mt-3 text-sm text-[var(--ink-muted)]">
            Data sources are labeled by permission level. Official APIs and public web capture are
            clearly separated from AI-inferred insights.
          </p>
          <div className="mt-4 rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3 text-sm">
            Workspace keys stored securely
          </div>
        </div>
      </aside>
    </div>
  );
}
