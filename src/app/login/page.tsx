import Link from "next/link";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen px-6 py-16 sm:px-10">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
            VideoViralHackerSquad
          </p>
          <h1 className="font-display text-4xl">Welcome back to your creative OS.</h1>
          <p className="text-[var(--ink-muted)]">
            Sign in to access workspace intelligence, preview pipelines, and export-ready
            deliverables.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--ink)]"
          >
            ← Back to overview
          </Link>
        </div>
        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
            Sign in
          </p>
          <h2 className="font-display text-2xl">Workspace access</h2>
          <div className="mt-6">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
