import Link from "next/link";
import { getAuthContext } from "@/lib/auth";

const navItems = [
  { label: "New project", href: "/project/new" },
  { label: "Research progress", href: "/project/progress" },
  { label: "Market overview", href: "/dashboard" },
  { label: "Winning content", href: "/content" },
  { label: "Insights explainer", href: "/insights" },
  { label: "Competitor comparison", href: "/competitors" },
  { label: "Creative generator", href: "/creative" },
  { label: "Preview studio", href: "/preview" },
  { label: "Exports", href: "/exports" },
  { label: "API keys", href: "/settings/api-keys" },
];

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = await getAuthContext();
  return (
    <div className="min-h-screen bg-transparent">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-6 lg:flex-row">
        <aside className="glass-panel w-full rounded-[28px] p-6 lg:w-[280px] lg:sticky lg:top-6 lg:self-start">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent)] text-white font-semibold">
              VV
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
                {context?.workspaceName ?? "VideoViralHackerSquad"}
              </p>
              <p className="font-display text-lg">Workspace</p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                Active project
              </p>
              <p className="text-sm font-semibold">LumenSkin Q3 Launch</p>
              <p className="text-xs text-[var(--ink-muted)]">UGC conversion sprint</p>
            </div>

            <nav className="space-y-2 text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between rounded-2xl border border-transparent px-3 py-2 text-[var(--ink-muted)] transition hover:border-[var(--line)] hover:bg-white/70 hover:text-[var(--ink)]"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-[var(--ink-muted)]">→</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <div className="flex-1 space-y-6">
          <header className="glass-panel flex flex-wrap items-center justify-between gap-4 rounded-[28px] px-6 py-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
                Workspace intelligence
              </p>
              <p className="font-display text-2xl">Strategy Command Center</p>
              {context ? (
                <p className="text-xs text-[var(--ink-muted)]">
                  {context.userName} · {context.userEmail}
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-full border border-[var(--line)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                Add brand
              </button>
              <button className="rounded-full bg-[var(--ink)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-white">
                Start new run
              </button>
            </div>
          </header>
          <div className="space-y-6 px-2 pb-12 lg:px-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
