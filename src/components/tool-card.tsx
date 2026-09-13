"use client";

import { useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { CATEGORIES, type Tool } from "@/lib/tools";
import { useFavoriteTool } from "@/lib/use-favorite-tool";

const CARD_CLASS =
  "group rounded-lg border border-ink-100 bg-surface-light-raised p-5 shadow-xs transition duration-fast ease-standard hover:-translate-y-0.5 hover:border-naze-200 hover:shadow-md active:translate-y-0 active:scale-[0.99] dark:border-white/10 dark:bg-surface-dark-raised";

function FavoriteButton({ slug }: { slug: string }) {
  const { isFavorite, toggle } = useFavoriteTool(slug);
  return (
    <button
      type="button"
      aria-label={isFavorite ? "Hapus dari favorit" : "Tandai favorit"}
      aria-pressed={isFavorite}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle();
      }}
      className="rounded-sm p-1.5 text-ink-400 transition duration-fast hover:text-naze-500 focus-visible:outline-none"
    >
      <Star
        size={18}
        strokeWidth={2}
        fill={isFavorite ? "currentColor" : "none"}
        className={isFavorite ? "text-naze-500" : ""}
      />
    </button>
  );
}

function CardHeader({ tool }: { tool: Tool }) {
  const category = CATEGORIES.find((c) => c.id === tool.category)!;
  const Icon = category.icon;
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-naze-50 text-naze-600 transition-colors duration-fast group-hover:bg-naze-100 dark:bg-naze-900/40 dark:text-naze-300">
          <Icon size={18} strokeWidth={2} aria-hidden />
        </span>
        <div>
          <p className="font-display text-h3 leading-tight text-ink-900 dark:text-ink-0">
            {tool.name}
          </p>
          <p className="font-mono text-caption text-ink-400">{category.label}</p>
        </div>
      </div>
      <FavoriteButton slug={tool.slug} />
    </div>
  );
}

/** Kartu untuk tool yang sudah punya halaman/fungsi nyata — seluruh kartu adalah link. */
function LinkedToolCard({ tool, href }: { tool: Tool; href: string }) {
  return (
    <Link href={href} className={`block ${CARD_CLASS}`}>
      <CardHeader tool={tool} />
      <p className="mt-3 font-body text-body-sm text-ink-600 dark:text-ink-400">
        {tool.description}
      </p>
    </Link>
  );
}

/** Kartu untuk tool yang belum punya halaman (belum masuk phase-nya) — klik hanya expand detail singkat. */
function DiscoveryOnlyToolCard({ tool }: { tool: Tool }) {
  const [expanded, setExpanded] = useState(false);
  const category = CATEGORIES.find((c) => c.id === tool.category)!;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onClick={() => setExpanded((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setExpanded((v) => !v);
        }
      }}
      className={`cursor-pointer ${CARD_CLASS}`}
    >
      <CardHeader tool={tool} />
      <p className="mt-3 font-body text-body-sm text-ink-600 dark:text-ink-400">
        {tool.description}
      </p>
      <div
        className={`grid transition-[grid-template-rows] duration-slow ease-emphasized ${
          expanded ? "mt-3 grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="font-mono text-caption text-ink-400">
            kategori: {category.label.toLowerCase()} · belum tersedia di phase saat ini
          </p>
        </div>
      </div>
    </div>
  );
}

export function ToolCard({ tool }: { tool: Tool }) {
  return tool.href ? (
    <LinkedToolCard tool={tool} href={tool.href} />
  ) : (
    <DiscoveryOnlyToolCard tool={tool} />
  );
}
