import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export function ToolPageShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-body text-body-sm text-ink-600 transition-colors duration-fast hover:text-naze-500 dark:text-ink-400"
        >
          <ArrowLeft size={14} />
          Semua tools
        </Link>

        <h1 className="mt-6 font-display text-h2 text-ink-900 dark:text-ink-0">{title}</h1>
        <p className="mt-2 font-body text-body text-ink-600 dark:text-ink-400">{description}</p>

        <div className="mt-8">{children}</div>
      </main>
    </>
  );
}
