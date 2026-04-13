import Link from "next/link";

const modules = [
  {
    title: "Research engine",
    tag: "Ingest",
    description:
      "Collect brand, competitor, and social signals across the web to form a clean market snapshot.",
    points: [
      "Website crawl and SEO metadata",
      "YouTube top content discovery",
      "Public mentions and reviews",
    ],
  },
  {
    title: "Analysis dashboard",
    tag: "Explain",
    description:
      "Rank content, extract narrative patterns, and identify selling points that move performance.",
    points: [
      "Hook and CTA scoring",
      "Narrative clustering",
      "Audience reaction highlights",
    ],
  },
  {
    title: "Creative planning",
    tag: "Generate",
    description:
      "Turn insights into production-ready angles, scripts, and storyboards for each goal.",
    points: ["10 angles", "3 scripts", "Storyboard + shot list"],
  },
  {
    title: "AI preview studio",
    tag: "Preview",
    description:
      "Produce frameboards and 5-10s previews to validate ideas before production.",
    points: ["Google AI Studio frames", "Runway motion tests", "Retry + fallback"],
  },
];

const workflow = [
  {
    step: "01",
    title: "New project",
    detail: "Brand, URL, category, competitors, market, goal.",
  },
  {
    step: "02",
    title: "Research progress",
    detail: "Crawler, YouTube, and mentions pipeline status.",
  },
  {
    step: "03",
    title: "Market overview",
    detail: "Category map, top claims, and competitor gaps.",
  },
  {
    step: "04",
    title: "Winning content",
    detail: "Top posts with hooks, scores, and why they work.",
  },
  {
    step: "05",
    title: "Insights explainer",
    detail: "Storytelling and selling point breakdowns.",
  },
  {
    step: "06",
    title: "Generate creative",
    detail: "Angles, scripts, storyboards, and variants.",
  },
  {
    step: "07",
    title: "Preview studio",
    detail: "Frameboards and 5-10s preview clips.",
  },
];

const outputs = [
  {
    title: "Brand intelligence report",
    detail: "Positioning, category map, and audience signals.",
  },
  {
    title: "Content winner analysis",
    detail: "Ranked library with hooks, narratives, and CTAs.",
  },
  {
    title: "Creative briefs",
    detail: "Angles, scripts, storyboards, and shot lists.",
  },
  {
    title: "AI preview assets",
    detail: "Frameboards, moodboards, and short previews.",
  },
];

const provenance = [
  "Official API data",
  "Public web observed data",
  "User-connected owned account data",
  "AI-inferred creative insights",
];

const exportFormats = ["PDF", "Slides", "CSV", "Notion"];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,107,53,0.35),_transparent_65%)] blur-3xl animate-[glow-pulse_10s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute top-[35%] left-[-10%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(31,138,112,0.3),_transparent_70%)] blur-3xl animate-[glow-pulse_12s_ease-in-out_infinite]" />

      <header className="relative z-10 px-6 pt-8 sm:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-[var(--line)] bg-white/70 px-5 py-3 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-white font-semibold">
              VV
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                VideoViralHackerSquad
              </p>
              <p className="font-display text-lg">Brand-to-Creative OS</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-[var(--ink-muted)] md:flex">
            <a className="transition hover:text-[var(--ink)]" href="#intelligence">
              Intelligence
            </a>
            <a className="transition hover:text-[var(--ink)]" href="#dashboard">
              Dashboard
            </a>
            <a className="transition hover:text-[var(--ink)]" href="#creative">
              Creative
            </a>
            <a className="transition hover:text-[var(--ink)]" href="#preview">
              Preview
            </a>
            <a className="transition hover:text-[var(--ink)]" href="#exports">
              Exports
            </a>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <button className="rounded-full border border-[var(--line)] px-4 py-2 text-sm text-[var(--ink-muted)] transition hover:border-[var(--ink)] hover:text-[var(--ink)]">
              View demo
            </button>
            <Link
              href="/project/new"
              className="rounded-full bg-[var(--ink)] px-4 py-2 text-sm text-white transition hover:bg-black"
            >
              Start project
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="px-6 pt-20 sm:px-10">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
                Brand intelligence for brands and agencies
              </div>
              <h1 className="font-display text-4xl leading-tight text-[var(--ink)] sm:text-5xl lg:text-6xl">
                Turn competitor content into winning ads in days, not weeks.
              </h1>
              <p className="max-w-xl text-lg text-[var(--ink-muted)]">
                VideoViralHackerSquad connects research, analysis, and creative output in one flow.
                Discover what wins, explain why it works, and generate scripts, storyboards, and AI previews
                tailored to each campaign goal.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/project/new"
                  className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:translate-y-[-1px]"
                >
                  Launch first project
                </Link>
                <button className="rounded-full border border-[var(--ink)] px-6 py-3 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--ink)] hover:text-white">
                  See output library
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-4">
                  <p className="text-sm text-[var(--ink-muted)]">Average time to insight</p>
                  <p className="font-display text-2xl">9 minutes</p>
                </div>
                <div className="rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-4">
                  <p className="text-sm text-[var(--ink-muted)]">Creative variants per goal</p>
                  <p className="font-display text-2xl">24+</p>
                </div>
                <div className="rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-4">
                  <p className="text-sm text-[var(--ink-muted)]">Channels supported</p>
                  <p className="font-display text-2xl">Web + YouTube</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="glass-panel grid-halo rounded-3xl p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                    New project
                  </p>
                  <span className="rounded-full bg-[var(--accent-3)]/40 px-3 py-1 text-xs text-[var(--ink)]">
                    Brand + Agency
                  </span>
                </div>
                <div className="mt-6 space-y-4 text-sm">
                  <div className="rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3">
                    <p className="text-[var(--ink-muted)]">Brand</p>
                    <p className="font-semibold">LumenSkin</p>
                  </div>
                  <div className="rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3">
                    <p className="text-[var(--ink-muted)]">Competitors</p>
                    <p className="font-semibold">Glowmate, AuraLab, PureHalo</p>
                  </div>
                  <div className="rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3">
                    <p className="text-[var(--ink-muted)]">Goal</p>
                    <p className="font-semibold">UGC conversion for Q3 launch</p>
                  </div>
                </div>
                <button className="mt-6 w-full rounded-2xl bg-[var(--ink)] py-3 text-sm font-semibold text-white">
                  Start research
                </button>
              </div>
              <div className="rounded-3xl border border-[var(--line)] bg-white/80 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                    Live snapshot
                  </p>
                  <span className="text-xs text-[var(--accent-2)]">Research running</span>
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    "12 landing pages analyzed",
                    "48 YouTube videos indexed",
                    "122 mentions clustered",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3 text-sm"
                    >
                      <span>{item}</span>
                      <span className="h-2 w-24 rounded-full bg-[var(--paper-strong)]">
                        <span className="block h-full w-[70%] rounded-full bg-[var(--accent)]" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="intelligence" className="px-6 pb-16 pt-24 sm:px-10">
          <div className="mx-auto max-w-6xl space-y-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--ink-muted)]">
                  Core modules
                </p>
                <h2 className="font-display text-3xl text-[var(--ink)] sm:text-4xl">
                  A single flow from research to preview assets.
                </h2>
              </div>
              <p className="max-w-md text-[var(--ink-muted)]">
                Built for strategists and agency teams who need to align research, creative, and
                production without waiting on disconnected tools.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-4">
              {modules.map((module) => (
                <div
                  key={module.title}
                  className="glass-panel flex h-full flex-col gap-4 rounded-3xl p-6"
                >
                  <span className="w-fit rounded-full bg-[var(--accent-2)]/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--accent-2)]">
                    {module.tag}
                  </span>
                  <h3 className="font-display text-xl text-[var(--ink)]">
                    {module.title}
                  </h3>
                  <p className="text-sm text-[var(--ink-muted)]">
                    {module.description}
                  </p>
                  <ul className="mt-auto space-y-2 text-sm text-[var(--ink)]">
                    {module.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent)]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 sm:px-10">
          <div className="mx-auto max-w-6xl rounded-[32px] border border-[var(--line)] bg-white/80 p-8 shadow-sm">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--ink-muted)]">
                  Smart UX flow
                </p>
                <h3 className="font-display text-2xl">7-screen journey to launch-ready ideas.</h3>
                <p className="text-[var(--ink-muted)]">
                  Every project follows the same proven flow so teams can quickly align on research,
                  insights, and creative output without losing context.
                </p>
              </div>
              <div className="grid gap-3">
                {workflow.map((item) => (
                  <div
                    key={item.step}
                    className="flex items-center justify-between rounded-2xl border border-[var(--line)] bg-white px-4 py-3"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                        {item.step}
                      </p>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-[var(--ink-muted)]">{item.detail}</p>
                    </div>
                    <span className="hidden rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs text-[var(--accent)] sm:inline">
                      Ready
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="dashboard" className="px-6 pb-20 sm:px-10">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--ink-muted)]">
                  Analysis dashboard
                </p>
                <h2 className="font-display text-3xl sm:text-4xl">
                  Explain why content wins, not just what wins.
                </h2>
              </div>
              <div className="flex gap-2">
                {["Overview", "Content", "Narratives", "Competitors"].map((tab) => (
                  <span
                    key={tab}
                    className="rounded-full border border-[var(--line)] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]"
                  >
                    {tab}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="grid gap-4">
                {[
                  {
                    title: "Glowmate serum review",
                    hook: "It erased my dull skin in 7 days",
                    score: "91",
                    narrative: "Before/after proof",
                  },
                  {
                    title: "AuraLab founder story",
                    hook: "I built this because nothing else worked",
                    score: "88",
                    narrative: "Founder authority",
                  },
                  {
                    title: "PureHalo demo",
                    hook: "Watch the texture melt instantly",
                    score: "84",
                    narrative: "Product demo",
                  },
                ].map((asset) => (
                  <div
                    key={asset.title}
                    className="glass-panel flex flex-col gap-3 rounded-3xl p-5"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{asset.title}</p>
                      <span className="rounded-full bg-[var(--accent-2)]/20 px-3 py-1 text-xs text-[var(--accent-2)]">
                        Score {asset.score}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--ink-muted)]">
                      Hook: <span className="text-[var(--ink)]">{asset.hook}</span>
                    </p>
                    <p className="text-sm text-[var(--ink-muted)]">
                      Narrative: <span className="text-[var(--ink)]">{asset.narrative}</span>
                    </p>
                  </div>
                ))}
              </div>
              <div className="glass-panel rounded-3xl p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--ink-muted)]">
                  Storytelling patterns
                </p>
                <div className="mt-6 space-y-4">
                  {[
                    ["Problem agitation", 78],
                    ["Founder authority", 64],
                    ["Lifestyle aspiration", 59],
                    ["UGC testimonial", 82],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <div className="flex justify-between text-sm">
                        <span>{label}</span>
                        <span className="text-[var(--ink-muted)]">{value}%</span>
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
            </div>
          </div>
        </section>

        <section id="creative" className="px-6 pb-20 sm:px-10">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--ink-muted)]">
                  Creative generator
                </p>
                <h2 className="font-display text-3xl sm:text-4xl">
                  Generate briefs, scripts, and variants on demand.
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-[var(--ink-muted)]">
                {["Direct conversion", "UGC seeding", "Seasonal sale"].map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-[var(--line)] bg-white/80 px-3 py-2"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="glass-panel rounded-3xl p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                    Creative brief
                  </p>
                  <span className="rounded-full bg-[var(--accent)]/15 px-3 py-1 text-xs text-[var(--accent)]">
                    10 angles
                  </span>
                </div>
                <div className="mt-5 space-y-4 text-sm">
                  {[
                    "Authority: dermatologist-backed proof",
                    "Transformation: 7-day glow reveal",
                    "Routine swap: replace 3 products with 1",
                  ].map((angle) => (
                    <div
                      key={angle}
                      className="rounded-2xl border border-[var(--line)] bg-white/85 px-4 py-3"
                    >
                      {angle}
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-[var(--line)] bg-white/90 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                    Script sample
                  </p>
                  <p className="mt-2 text-sm text-[var(--ink)]">
                    &quot;I stopped hiding under filters after week one. Here is what changed, and how I
                    use it on camera in 30 seconds.&quot;
                  </p>
                  <p className="mt-3 text-xs text-[var(--ink-muted)]">CTA: See your glow routine</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="glass-panel rounded-3xl p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                    Storyboard
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={`frame-${index}`}
                        className="aspect-[4/5] rounded-2xl bg-[linear-gradient(135deg,_#f9e6d5,_#f7c9a8)]"
                      />
                    ))}
                  </div>
                </div>
                <div className="rounded-3xl border border-[var(--line)] bg-white/80 p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                    Variant matrix
                  </p>
                  <div className="mt-4 grid gap-3 text-sm">
                    {[
                      "Hook: bold claim vs curiosity",
                      "Narrative: demo vs founder story",
                      "CTA: shop now vs learn more",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="preview" className="px-6 pb-20 sm:px-10">
          <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--ink-muted)]">
                AI preview studio
              </p>
              <h2 className="font-display text-3xl sm:text-4xl">
                Validate concepts with frames and motion previews.
              </h2>
              <p className="text-[var(--ink-muted)]">
                Use Google AI Studio for high-quality frameboards and Runway for 5-10 second motion
                previews. Each concept can be tested before production spend.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  "Frameboards",
                  "Moodboards",
                  "Short previews",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3 text-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-panel rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                  Preview queue
                </p>
                <span className="rounded-full bg-[var(--accent-2)]/20 px-3 py-1 text-xs text-[var(--accent-2)]">
                  In progress
                </span>
              </div>
              <div className="mt-4 space-y-4">
                {[
                  "Concept A: 5s run-through",
                  "Concept B: 10s demo",
                  "Concept C: 6s hook test",
                ].map((job) => (
                  <div
                    key={job}
                    className="rounded-2xl border border-[var(--line)] bg-white/85 px-4 py-3 text-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span>{job}</span>
                      <span className="text-xs text-[var(--ink-muted)]">ETA 3m</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-[var(--paper-strong)]">
                      <div className="h-2 w-2/3 rounded-full bg-[var(--accent)]" />
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-3 gap-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={`preview-${index}`}
                      className="aspect-[9/16] rounded-2xl bg-[linear-gradient(160deg,_#d1f1e6,_#f7d9c4)] animate-[float-soft_9s_ease-in-out_infinite]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="exports" className="px-6 pb-20 sm:px-10">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--ink-muted)]">
                  Outputs and compliance
                </p>
                <h2 className="font-display text-3xl sm:text-4xl">
                  Export-ready deliverables with source clarity.
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {exportFormats.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[var(--line)] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="grid gap-4">
                {outputs.map((output) => (
                  <div
                    key={output.title}
                    className="glass-panel rounded-3xl p-5"
                  >
                    <p className="font-semibold">{output.title}</p>
                    <p className="text-sm text-[var(--ink-muted)]">
                      {output.detail}
                    </p>
                  </div>
                ))}
              </div>
              <div className="rounded-3xl border border-[var(--line)] bg-white/80 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                  Source-permission model
                </p>
                <p className="mt-3 text-sm text-[var(--ink-muted)]">
                  Every insight is labeled by source type to keep teams compliant and confident in
                  their decision making.
                </p>
                <div className="mt-5 space-y-3">
                  {provenance.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3 text-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--line)] bg-white/80 px-6 py-10 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-display text-2xl">VideoViralHackerSquad</p>
            <p className="text-sm text-[var(--ink-muted)]">
              Brand intelligence, creative strategy, and AI previews in one platform.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              "Launch project",
              "Book agency demo",
              "Get pricing",
            ].map((cta) => (
              <button
                key={cta}
                className="rounded-full border border-[var(--ink)] px-5 py-2 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--ink)] hover:text-white"
              >
                {cta}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
