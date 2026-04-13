"use client";

import { useState } from "react";

export default function LoginForm() {
  const [name, setName] = useState("Demo User");
  const [email, setEmail] = useState("demo@videoviralhackersquad.com");
  const [status, setStatus] = useState("Idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Signing in...");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    if (response.ok) {
      setStatus("Redirecting...");
      window.location.href = "/dashboard";
      return;
    }

    setStatus("Unable to sign in. Try again.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3 text-sm">
        <span className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
          Name
        </span>
        <input
          className="mt-2 w-full bg-transparent text-[var(--ink)] outline-none"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label className="block rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3 text-sm">
        <span className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
          Email
        </span>
        <input
          className="mt-2 w-full bg-transparent text-[var(--ink)] outline-none"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <button
        type="submit"
        className="w-full rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white"
      >
        Sign in
      </button>
      <p className="text-xs text-[var(--ink-muted)]">{status}</p>
    </form>
  );
}
