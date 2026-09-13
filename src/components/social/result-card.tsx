import { Download } from "lucide-react";
import type { SocialVideoInfo } from "@/lib/social/types";
import { formatDuration, formatFileSize } from "@/lib/format";

export interface ResultCardProps {
  info: SocialVideoInfo;
  /** field mana yang ditampilkan — dipakai ulang untuk Video Metadata & Thumbnail Extractor */
  fields?: Array<"thumbnail" | "title" | "duration" | "resolution" | "size" | "format" | "download">;
}

export function ResultCard({
  info,
  fields = ["thumbnail", "title", "duration", "resolution", "size", "format", "download"],
}: ResultCardProps) {
  const show = (f: (typeof fields)[number]) => fields.includes(f);

  return (
    <div className="animate-rise-in overflow-hidden rounded-lg border border-ink-100 bg-surface-light-raised shadow-sm dark:border-white/10 dark:bg-surface-dark-raised">
      {show("thumbnail") && (
        <div className="relative aspect-video w-full bg-ink-50 dark:bg-white/5">
          {/* eslint-disable-next-line @next/next/no-img-element -- thumbnail bisa dari host eksternal apa pun, tergantung provider */}
          <img
            src={info.thumbnailUrl}
            alt={info.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="space-y-3 p-5">
        {show("title") && (
          <p className="font-display text-h3 text-ink-900 dark:text-ink-0">{info.title}</p>
        )}

        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-body-sm text-ink-600 dark:text-ink-400">
          {show("duration") && (
            <>
              <dt className="text-ink-400">Duration</dt>
              <dd>{formatDuration(info.durationSeconds)}</dd>
            </>
          )}
          {show("resolution") && (
            <>
              <dt className="text-ink-400">Resolution</dt>
              <dd>{info.resolution}</dd>
            </>
          )}
          {show("size") && (
            <>
              <dt className="text-ink-400">File size</dt>
              <dd>{formatFileSize(info.fileSizeBytes)}</dd>
            </>
          )}
          {show("format") && (
            <>
              <dt className="text-ink-400">Format</dt>
              <dd>{info.format}</dd>
            </>
          )}
        </dl>

        {show("download") && (
          <a
            href={info.downloadUrl}
            download
            className="inline-flex items-center gap-2 rounded-md bg-naze-500 px-5 py-2.5 font-body text-button text-white shadow-sm transition duration-fast ease-standard hover:bg-naze-600 active:scale-[0.98]"
          >
            <Download size={16} />
            Download
          </a>
        )}
      </div>
    </div>
  );
}
