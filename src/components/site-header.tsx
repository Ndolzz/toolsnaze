import Link from "next/link";
import { Settings } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-surface-light/80 backdrop-blur dark:border-white/10 dark:bg-surface-dark/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-h3 tracking-tight text-ink-900 transition-colors duration-fast hover:text-naze-500 dark:text-ink-0"
        >
          NAZE <span className="text-naze-500">TOOLS</span>
        </Link>

        <Link
          href="/settings"
          aria-label="Pengaturan"
          className="rounded-md p-2 text-ink-600 transition duration-fast ease-standard hover:bg-ink-50 hover:text-ink-900 focus-visible:outline-none dark:text-ink-400 dark:hover:bg-white/5 dark:hover:text-ink-0"
        >
          <Settings size={20} />
        </Link>
      </div>
    </header>
  );
}
