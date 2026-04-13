import { competitors } from "@/lib/sample-data";

const comparisonRows = [
  { label: "Content volume", values: [74, 92, 58] },
  { label: "Posting cadence", values: [64, 88, 52] },
  { label: "Winning topics", values: [81, 76, 63] },
  { label: "Creator mix", values: [69, 84, 55] },
  { label: "Offer strategy", values: [72, 66, 60] },
  { label: "Sentiment strength", values: [78, 74, 61] },
];

const opportunityNotes = [
  "Competitors lean heavily on founder authority. Opportunity: UGC proof blends.",
  "Glowmate dominates texture demos. Opportunity: routine simplification narrative.",
  "AuraLab underutilizes creator seeding for US market.",
];

export default function CompetitorsPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="glass-panel rounded-[28px] p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
              Competitor comparison
            </p>
            <h1 className="font-display text-2xl">Brand vs competitors</h1>
          </div>
          <span className="rounded-full bg-[var(--accent-2)]/20 px-3 py-1 text-xs text-[var(--accent-2)]">
            Live snapshot
          </span>
        </div>
        <div className="mt-6 space-y-4">
          {comparisonRows.map((row) => (
            <div
              key={row.label}
              className="rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3"
            >
              <p className="text-sm font-semibold">{row.label}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {row.values.map((value, index) => (
                  <div key={`${row.label}-${index}`}>
                    <div className="flex justify-between text-xs text-[var(--ink-muted)]">
                      <span>{competitors[index]?.name}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-[var(--paper-strong)]">
                      <div
                        className="h-2 rounded-full bg-[var(--accent)]"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <aside className="space-y-4">
        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
            Opportunity gaps
          </p>
          <div className="mt-4 space-y-3 text-sm">
            {opportunityNotes.map((note) => (
              <div
                key={note}
                className="rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3"
              >
                {note}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[28px] border border-[var(--line)] bg-white/80 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
            Recommended next moves
          </p>
          <p className="mt-3 text-sm text-[var(--ink-muted)]">
            Shift toward demo-heavy hooks, lean into creator confession, and test routine swap offers
            against founder authority angles.
          </p>
        </div>
      </aside>
    </div>
  );
}
