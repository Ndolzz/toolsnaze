"use client";

import { useState } from "react";
import { ImageDropzone } from "@/components/image/image-dropzone";
import { BeforeAfter } from "@/components/image/before-after";
import { useImageFile } from "@/lib/image/use-image-file";
import { loadHTMLImage, canvasToBlob, downloadBlob, stripExtension } from "@/lib/image/canvas";
import { FORMAT_MIME } from "@/lib/image/types";

export function ImageResizerWorkflow() {
  const { image, error, setFile, reset } = useImageFile();
  const [width, setWidth] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [lockAspect, setLockAspect] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [processError, setProcessError] = useState<string | null>(null);
  const [result, setResult] = useState<{ url: string; blob: Blob; width: number; height: number } | null>(
    null,
  );

  function onSelectFile(file: File) {
    setFile(file);
    setResult(null);
    setWidth(null);
    setHeight(null);
  }

  function handleWidthChange(value: number) {
    setWidth(value);
    if (lockAspect && image) {
      setHeight(Math.round((value / image.width) * image.height));
    }
  }

  function handleHeightChange(value: number) {
    setHeight(value);
    if (lockAspect && image) {
      setWidth(Math.round((value / image.height) * image.width));
    }
  }

  async function handleResize() {
    if (!image || !width || !height) return;
    setProcessing(true);
    setProcessError(null);
    setResult(null);
    try {
      const img = await loadHTMLImage(image.url);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas tidak tersedia di browser ini.");
      ctx.drawImage(img, 0, 0, width, height);

      const mime = image.format ? FORMAT_MIME[image.format] : "image/png";
      const blob = await canvasToBlob(canvas, mime);
      if (!blob) throw new Error("Gagal membuat file hasil resize.");

      setResult({ url: URL.createObjectURL(blob), blob, width, height });
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
        onFile={onSelectFile}
        onReset={() => {
          reset();
          setResult(null);
        }}
      />

      {image && (
        <div className="space-y-4 rounded-lg border border-ink-100 p-4 dark:border-white/10">
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label htmlFor="w" className="block font-body text-label text-ink-600 dark:text-ink-400">
                Width (px)
              </label>
              <input
                id="w"
                type="number"
                min={1}
                value={width ?? image.width}
                onChange={(e) => handleWidthChange(Number(e.target.value))}
                className="mt-1 w-28 rounded-sm border border-ink-100 bg-surface-light-raised px-2 py-1.5 font-mono text-body-sm dark:border-white/10 dark:bg-surface-dark-raised"
              />
            </div>
            <div>
              <label htmlFor="h" className="block font-body text-label text-ink-600 dark:text-ink-400">
                Height (px)
              </label>
              <input
                id="h"
                type="number"
                min={1}
                value={height ?? image.height}
                onChange={(e) => handleHeightChange(Number(e.target.value))}
                className="mt-1 w-28 rounded-sm border border-ink-100 bg-surface-light-raised px-2 py-1.5 font-mono text-body-sm dark:border-white/10 dark:bg-surface-dark-raised"
              />
            </div>
            <label className="mb-2 flex items-center gap-2 font-body text-body-sm text-ink-600 dark:text-ink-400">
              <input
                type="checkbox"
                checked={lockAspect}
                onChange={(e) => setLockAspect(e.target.checked)}
                className="accent-naze-500"
              />
              Kunci rasio aspek
            </label>
          </div>

          <button
            type="button"
            onClick={handleResize}
            disabled={processing}
            className="inline-flex items-center justify-center rounded-md bg-naze-500 px-6 py-2.5 font-body text-button text-white shadow-sm transition duration-fast ease-standard hover:bg-naze-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-ink-100 disabled:text-ink-400"
          >
            {processing ? "Resizing…" : "Resize"}
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
            downloadBlob(
              result.blob,
              `${stripExtension(image.file.name)}-resized.${image.format ?? "png"}`,
            )
          }
        />
      )}
    </div>
  );
}
