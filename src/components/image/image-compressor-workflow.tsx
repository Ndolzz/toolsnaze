"use client";

import { useState } from "react";
import { ImageDropzone } from "@/components/image/image-dropzone";
import { BeforeAfter } from "@/components/image/before-after";
import { useImageFile } from "@/lib/image/use-image-file";
import { loadHTMLImage, canvasToBlob, downloadBlob, stripExtension } from "@/lib/image/canvas";
import { FORMAT_MIME, type ImageFormat } from "@/lib/image/types";

const OUTPUT_FORMATS: { value: ImageFormat; label: string }[] = [
  { value: "webp", label: "WEBP" },
  { value: "jpg", label: "JPG" },
];

export function ImageCompressorWorkflow() {
  const { image, error, setFile, reset } = useImageFile();
  const [format, setFormat] = useState<ImageFormat>("webp");
  const [quality, setQuality] = useState(80);
  const [processing, setProcessing] = useState(false);
  const [processError, setProcessError] = useState<string | null>(null);
  const [result, setResult] = useState<{ url: string; blob: Blob; width: number; height: number } | null>(
    null,
  );

  async function handleCompress() {
    if (!image) return;
    setProcessing(true);
    setProcessError(null);
    setResult(null);
    try {
      const img = await loadHTMLImage(image.url);
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas tidak tersedia di browser ini.");
      ctx.drawImage(img, 0, 0);

      const blob = await canvasToBlob(canvas, FORMAT_MIME[format], quality / 100);
      if (!blob) throw new Error(`Browser ini belum mendukung ekspor ke ${format.toUpperCase()}.`);

      setResult({ url: URL.createObjectURL(blob), blob, width: canvas.width, height: canvas.height });
    } catch (err) {
      setProcessError(err instanceof Error ? err.message : "Gagal memproses gambar.");
    } finally {
      setProcessing(false);
    }
  }

  return (
      <div className="space-y-6">
        <ImageDropzone
          image={image}
          error={error}
          onFile={(f) => {
            setFile(f);
            setResult(null);
          }}
          onReset={() => {
            reset();
            setResult(null);
          }}
        />

        {image && (
          <div className="space-y-4 rounded-lg border border-ink-100 p-4 dark:border-white/10">
            <div className="flex items-center gap-3">
              <label htmlFor="format" className="font-body text-label text-ink-600 dark:text-ink-400">
                Format output
              </label>
              <select
                id="format"
                value={format}
                onChange={(e) => setFormat(e.target.value as ImageFormat)}
                className="rounded-sm border border-ink-100 bg-surface-light-raised px-2 py-1 font-body text-body-sm dark:border-white/10 dark:bg-surface-dark-raised"
              >
                {OUTPUT_FORMATS.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="quality" className="font-body text-label text-ink-600 dark:text-ink-400">
                Kualitas — {quality}
              </label>
              <input
                id="quality"
                type="range"
                min={10}
                max={100}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="mt-2 w-full accent-naze-500"
              />
            </div>

            <button
              type="button"
              onClick={handleCompress}
              disabled={processing}
              className="inline-flex items-center justify-center rounded-md bg-naze-500 px-6 py-2.5 font-body text-button text-white shadow-sm transition duration-fast ease-standard hover:bg-naze-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-ink-100 disabled:text-ink-400"
            >
              {processing ? "Compressing…" : "Compress"}
            </button>
          </div>
        )}

        {processError && (
          <p className="font-body text-body-sm text-danger" role="alert">
            {processError}
          </p>
        )}

        {image && result && (
          <BeforeAfter
            before={{
              url: image.url,
              label: "Before",
              width: image.width,
              height: image.height,
              bytes: image.file.size,
            }}
            after={{
              url: result.url,
              label: "After",
              width: result.width,
              height: result.height,
              bytes: result.blob.size,
            }}
            onDownload={() =>
              downloadBlob(result.blob, `${stripExtension(image.file.name)}-compressed.${format}`)
            }
          />
        )}
      </div>
  );
}
