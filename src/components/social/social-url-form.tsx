"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export function SocialUrlForm({
  onSubmit,
  loading,
}: {
  onSubmit: (url: string) => void;
  loading: boolean;
}) {
  const [url, setUrl] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (url.trim()) onSubmit(url.trim());
      }}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        type="url"
        required
        placeholder="Paste video URL"
        disabled={loading}
        className="flex-1 rounded-md border border-ink-100 bg-surface-light-raised px-4 py-3 font-body text-body text-ink-900 shadow-xs transition duration-fast ease-standard placeholder:text-ink-400 focus-visible:outline-none focus-visible:shadow-focus disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-surface-dark-raised dark:text-ink-0"
      />
      <button
        type="submit"
        disabled={loading || !url.trim()}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-naze-500 px-6 py-3 font-body text-button text-white shadow-sm transition duration-fast ease-standard hover:bg-naze-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-ink-100 disabled:text-ink-400 disabled:active:scale-100"
      >
        {loading && <Loader2 size={16} className="animate-spin" aria-hidden />}
        {loading ? "Processing" : "Process"}
      </button>
    </form>
  );
}
