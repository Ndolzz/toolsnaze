import { SiteHeader } from "@/components/site-header";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SettingsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-xl px-6 py-16">
        <h1 className="font-display text-h2 text-ink-900 dark:text-ink-0">Settings</h1>

        <section className="mt-10 flex items-center justify-between border-b border-ink-100 pb-6 dark:border-white/10">
          <div>
            <p className="font-body text-body text-ink-900 dark:text-ink-0">Appearance</p>
            <p className="font-body text-body-sm text-ink-600 dark:text-ink-400">
              Pilih tampilan terang, gelap, atau ikuti pengaturan perangkat.
            </p>
          </div>
          <ThemeToggle />
        </section>
      </main>
    </>
  );
}
