import { Download } from "lucide-react";
import { formatFileSize } from "@/lib/format";

interface Side {
  url: string;
  label: string;
  width: number;
  height: number;
  bytes: number;
}

export function BeforeAfter({
  before,
  after,
  onDownload,
}: {
  before: Side;
  after: Side;
  onDownload: () => void;
}) {
  const reduced = before.bytes > 0 ? Math.round((1 - after.bytes / before.bytes) * 100) : 0;

  return (
    <div className="animate-rise-in space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {[before, after].map((side) => (
          <div
            key={side.label}
            className="overflow-hidden rounded-lg border border-ink-100 bg-surface-light-raised dark:border-white/10 dark:bg-surface-dark-raised"
          >
            <div className="flex h-40 items-center justify-center bg-ink-50 dark:bg-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element -- object URL/blob lokal */}
              <img src={side.url} alt={side.label} className="h-full w-full object-contain" />
            </div>
            <div className="p-3 font-mono text-caption text-ink-600 dark:text-ink-400">
              <p className="font-body text-label uppercase text-ink-400">{side.label}</p>
              <p>
                {side.width}×{side.height} · {formatFileSize(side.bytes)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {reduced !== 0 && (
        <p className="font-body text-body-sm text-ink-600 dark:text-ink-400">
          {reduced > 0
            ? `Ukuran file berkurang ${reduced}%.`
            : `Ukuran file bertambah ${Math.abs(reduced)}% (wajar untuk beberapa kombinasi format/kualitas).`}
        </p>
      )}

      <button
        type="button"
        onClick={onDownload}
        className="inline-flex items-center gap-2 rounded-md bg-naze-500 px-5 py-2.5 font-body text-button text-white shadow-sm transition duration-fast ease-standard hover:bg-naze-600 active:scale-[0.98]"
      >
        <Download size={16} />
        Download
      </button>
    </div>
  );
}
