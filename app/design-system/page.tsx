/**
 * Halaman ini adalah style guide internal untuk Phase 1 (Design System).
 * Home sebenarnya (tool discovery, search, kategori) dibangun di Phase 3.
 * Menampilkan token asli dari tailwind.config.ts — bukan nilai hardcoded.
 */
export default function DesignSystemPreview() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-18">
      <header className="mb-16 flex items-center justify-between">
        <span className="font-display text-h3 tracking-tight text-naze-500">NAZE</span>
        <span className="font-mono text-label text-ink-600 dark:text-ink-400">
          design-system / phase-1
        </span>
      </header>

      <section className="mb-16 space-y-6">
        <p className="font-mono text-label uppercase text-naze-500">Typography</p>
        <p className="font-display text-display text-ink-900 dark:text-ink-0">Display</p>
        <p className="font-display text-h1 text-ink-900 dark:text-ink-0">Heading 1</p>
        <p className="font-display text-h2 text-ink-900 dark:text-ink-0">Heading 2</p>
        <p className="font-display text-h3 text-ink-900 dark:text-ink-0">Heading 3</p>
        <p className="font-body text-body text-ink-900 dark:text-ink-0">
          Body — teks paragraf utama untuk membaca deskripsi tool, hasil proses, dan konten
          panjang lainnya di seluruh NAZE TOOLS.
        </p>
        <p className="font-body text-body-sm text-ink-600 dark:text-ink-400">
          Body small — untuk keterangan sekunder di bawah komponen utama.
        </p>
        <p className="font-body text-caption uppercase tracking-wide text-ink-600 dark:text-ink-400">
          Caption
        </p>
        <p className="font-mono text-code text-ink-800 dark:text-ink-100">
          const naze = &quot;code / monospace&quot;;
        </p>
      </section>

      <section className="mb-16 space-y-4">
        <p className="font-mono text-label uppercase text-naze-500">Color</p>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {[
            { name: "naze-50", cls: "bg-naze-50" },
            { name: "naze-200", cls: "bg-naze-200" },
            { name: "naze-400", cls: "bg-naze-400" },
            { name: "naze-500", cls: "bg-naze-500" },
            { name: "naze-700", cls: "bg-naze-700" },
            { name: "naze-900", cls: "bg-naze-900" },
          ].map((swatch) => (
            <div key={swatch.name} className="space-y-1.5">
              <div className={`h-12 rounded-md border ${swatch.cls}`} />
              <p className="font-mono text-caption text-ink-600 dark:text-ink-400">
                {swatch.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <p className="font-mono text-label uppercase text-naze-500">Component states</p>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-md bg-naze-500 px-5 py-2.5 font-body text-button text-white shadow-sm transition duration-fast ease-standard hover:bg-naze-600 active:scale-[0.98] focus-visible:outline-none">
            Primary action
          </button>
          <button className="rounded-md border border-ink-100 bg-surface-light-raised px-5 py-2.5 font-body text-button text-ink-900 shadow-xs transition duration-fast ease-standard hover:bg-ink-50 active:scale-[0.98] dark:border-white/10 dark:bg-surface-dark-raised dark:text-ink-0">
            Secondary
          </button>
          <button
            disabled
            className="cursor-not-allowed rounded-md bg-ink-100 px-5 py-2.5 font-body text-button text-ink-400"
          >
            Disabled
          </button>
        </div>
      </section>
    </main>
  );
}
