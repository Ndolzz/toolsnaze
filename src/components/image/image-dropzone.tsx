"use client";

import { useRef, useState } from "react";
import { UploadCloud, X } from "lucide-react";
import type { LoadedImage } from "@/lib/image/types";
import { formatFileSize } from "@/lib/format";

export function ImageDropzone({
  image,
  error,
  onFile,
  onReset,
}: {
  image: LoadedImage | null;
  error: string | null;
  onFile: (file: File) => void;
  onReset: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  if (image) {
    return (
      <div className="animate-rise-in overflow-hidden rounded-lg border border-ink-100 bg-surface-light-raised dark:border-white/10 dark:bg-surface-dark-raised">
        <div className="relative flex max-h-72 items-center justify-center bg-ink-50 dark:bg-white/5">
          {/* eslint-disable-next-line @next/next/no-img-element -- object URL lokal, bukan aset statis */}
          <img src={image.url} alt="Preview" className="max-h-72 w-full object-contain" />
          <button
            type="button"
            onClick={onReset}
            aria-label="Ganti gambar"
            className="absolute right-3 top-3 rounded-full bg-black/50 p-1.5 text-white backdrop-blur transition duration-fast hover:bg-black/70"
          >
            <X size={16} />
          </button>
        </div>
        <dl className="flex flex-wrap gap-x-6 gap-y-1 p-4 font-mono text-caption text-ink-600 dark:text-ink-400">
          <div>
            <dt className="inline text-ink-400">file </dt>
            <dd className="inline">{image.file.name}</dd>
          </div>
          <div>
            <dt className="inline text-ink-400">resolusi </dt>
            <dd className="inline">
              {image.width}×{image.height}
            </dd>
          </div>
          <div>
            <dt className="inline text-ink-400">ukuran </dt>
            <dd className="inline">{formatFileSize(image.file.size)}</dd>
          </div>
          <div>
            <dt className="inline text-ink-400">format </dt>
            <dd className="inline uppercase">{image.format ?? "?"}</dd>
          </div>
        </dl>
      </div>
    );
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) onFile(file);
        }}
        className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-10 text-center transition duration-fast ease-standard ${
          dragging
            ? "border-naze-400 bg-naze-50 dark:bg-naze-900/20"
            : "border-ink-100 hover:border-naze-200 hover:bg-ink-50 dark:border-white/10 dark:hover:bg-white/5"
        }`}
      >
        <UploadCloud size={28} className="text-naze-500" />
        <p className="font-body text-body text-ink-900 dark:text-ink-0">
          Seret gambar ke sini, atau ketuk untuk memilih file
        </p>
        <p className="font-mono text-caption text-ink-400">JPG · PNG · WEBP · AVIF · maks 25MB</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFile(file);
            e.target.value = "";
          }}
        />
      </div>
      {error && (
        <p className="mt-3 font-body text-body-sm text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
