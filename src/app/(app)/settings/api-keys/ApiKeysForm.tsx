"use client";

import { useEffect, useState } from "react";

type ProviderKey = {
  provider: "google_ai_studio" | "runway";
  masked: string | null;
  updatedAt: string | null;
};

const providerLabels: Record<ProviderKey["provider"], string> = {
  google_ai_studio: "Google AI Studio",
  runway: "Runway",
};

export default function ApiKeysForm() {
  const [keys, setKeys] = useState<ProviderKey[]>([]);
  const [status, setStatus] = useState<string>("Idle");
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/api/keys");
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      setKeys(data.items ?? []);
    };
    load();
  }, []);

  const handleSave = async (provider: ProviderKey["provider"]) => {
    setStatus(`Saving ${providerLabels[provider]}...`);
    const value = values[provider];
    if (!value) {
      setStatus("Enter a key before saving.");
      return;
    }
    const response = await fetch("/api/keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider, value }),
    });

    if (response.ok) {
      setStatus("Key saved.");
      const updated = await response.json();
      setKeys((prev) =>
        prev.map((item) =>
          item.provider === provider
            ? { ...item, masked: updated.masked, updatedAt: updated.updatedAt }
            : item
        )
      );
      setValues((prev) => ({ ...prev, [provider]: "" }));
      return;
    }

    setStatus("Unable to save key. Try again.");
  };

  return (
    <div className="space-y-4">
      {keys.map((provider) => (
        <div
          key={provider.provider}
          className="rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{providerLabels[provider.provider]}</p>
              <p className="text-xs text-[var(--ink-muted)]">
                {provider.masked ? `Stored: ${provider.masked}` : "Not connected"}
              </p>
            </div>
            <span className="rounded-full bg-[var(--accent-2)]/20 px-3 py-1 text-xs text-[var(--accent-2)]">
              {provider.updatedAt ? "Connected" : "Pending"}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <input
              className="flex-1 rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-xs"
              placeholder="Paste new key"
              value={values[provider.provider] ?? ""}
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  [provider.provider]: event.target.value,
                }))
              }
            />
            <button
              onClick={() => handleSave(provider.provider)}
              className="rounded-full bg-[var(--ink)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-white"
            >
              Save
            </button>
          </div>
        </div>
      ))}
      <p className="text-xs text-[var(--ink-muted)]">{status}</p>
    </div>
  );
}
