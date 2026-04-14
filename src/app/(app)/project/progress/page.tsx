import { requireAuthContext } from "@/lib/auth";
import { getLatestProjectRepo, listJobsRepo } from "@/lib/repository";

const progressItems = [
  { label: "Websites crawled", value: "12 pages", status: "Complete" },
  { label: "YouTube videos indexed", value: "48 videos", status: "Running" },
  { label: "Mentions clustered", value: "122 mentions", status: "Queued" },
  { label: "Insights generated", value: "28 insights", status: "Queued" },
];

const pipeline = [
  "Homepage + category pages",
  "Product pages + FAQs",
  "Competitor channel scan",
  "Hook and CTA scoring",
  "Narrative clustering",
];

export default async function ResearchProgressPage() {
  const context = await requireAuthContext();
  const project = await getLatestProjectRepo(context.workspaceId);
  const jobs = await listJobsRepo(context.workspaceId, "ingest");
  const latestJob = jobs[0];
  const jobStatus = latestJob?.status ?? "queued";
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="glass-panel rounded-[28px] p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
              Research progress
            </p>
            <h1 className="font-display text-2xl">
              {project?.name ?? "Research sprint"}
            </h1>
          </div>
          <span className="rounded-full bg-[var(--accent-3)]/40 px-3 py-1 text-xs text-[var(--ink)]">
            {jobStatus}
          </span>
        </div>
        <div className="mt-6 space-y-3">
          {progressItems.map((item, index) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-2xl border border-[var(--line)] bg-white/85 px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="text-xs text-[var(--ink-muted)]">{item.value}</p>
              </div>
              <span className="rounded-full bg-[var(--accent)]/15 px-3 py-1 text-xs text-[var(--accent)]">
                {index === 0 ? jobStatus : item.status}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
            Active pipeline
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--ink)]">
            {pipeline.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--accent-2)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <aside className="space-y-4">
        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
            Next updates
          </p>
          <div className="mt-4 space-y-3 text-sm">
            <div className="rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3">
              Competitive narrative map ready in 6 min
            </div>
            <div className="rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3">
              10 angles + 3 scripts ready in 10 min
            </div>
          </div>
        </div>
        <div className="rounded-[28px] border border-[var(--line)] bg-white/80 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
            Notifications
          </p>
          <p className="mt-3 text-sm text-[var(--ink-muted)]">
            Alerts will be sent when new winning content is detected for your competitor set.
          </p>
        </div>
      </aside>
    </div>
  );
}
