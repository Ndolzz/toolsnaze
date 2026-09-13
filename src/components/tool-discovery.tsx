"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { CATEGORIES, TOOLS, searchTools, type CategoryId } from "@/lib/tools";
import { ToolCard } from "@/components/tool-card";

export function ToolDiscovery() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

  const results = useMemo(() => {
    const base = query.trim() ? searchTools(query) : TOOLS;
    return activeCategory ? base.filter((t) => t.category === activeCategory) : base;
  }, [query, activeCategory]);

  return (
    <div>
      {/* Search */}
      <div className="relative mx-auto max-w-xl">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          inputMode="search"
          placeholder="Cari tool — misalnya “compress video” atau “json”"
          className="w-full rounded-md border border-ink-100 bg-surface-light-raised py-3 pl-11 pr-11 font-body text-body text-ink-900 shadow-xs transition duration-fast ease-standard placeholder:text-ink-400 focus-visible:outline-none focus-visible:shadow-focus dark:border-white/10 dark:bg-surface-dark-raised dark:text-ink-0"
        />
        {query && (
          <button
            type="button"
            aria-label="Hapus pencarian"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm p-1.5 text-ink-400 transition duration-fast hover:text-ink-900 dark:hover:text-ink-0"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Category chips */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={`rounded-pill px-4 py-1.5 font-body text-button transition duration-fast ease-standard ${
            activeCategory === null
              ? "bg-naze-500 text-white"
              : "bg-ink-50 text-ink-600 hover:bg-ink-100 dark:bg-white/5 dark:text-ink-400"
          }`}
        >
          Semua
        </button>
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const active = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(active ? null : cat.id)}
              aria-pressed={active}
              className={`flex items-center gap-1.5 rounded-pill px-4 py-1.5 font-body text-button transition duration-fast ease-standard ${
                active
                  ? "bg-naze-500 text-white"
                  : "bg-ink-50 text-ink-600 hover:bg-ink-100 dark:bg-white/5 dark:text-ink-400"
              }`}
            >
              <Icon size={14} />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Results */}
      <div className="mt-10">
        {results.length === 0 ? (
          <p className="text-center font-body text-body-sm text-ink-400">
            Tidak ada tool yang cocok dengan pencarian itu.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
