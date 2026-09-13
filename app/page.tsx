import { SiteHeader } from "@/components/site-header";
import { ToolDiscovery } from "@/components/tool-discovery";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-16 sm:py-22">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-h1 tracking-tight text-ink-900 dark:text-ink-0 sm:text-display">
            Everything you need, in one place.
          </h1>
          <p className="mx-auto mt-4 max-w-md font-body text-body text-ink-600 dark:text-ink-400">
            Video, gambar, audio, dokumen, sampai developer utilities — cari dan
            pakai tool yang kamu butuhkan tanpa berpindah aplikasi.
          </p>
        </div>

        <div className="mt-12">
          <ToolDiscovery />
        </div>
      </main>
    </>
  );
}
