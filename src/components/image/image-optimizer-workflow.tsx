"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { ImageDropzone } from "@/components/image/image-dropzone";
import { BeforeAfter } from "@/components/image/before-after";
import { useImageFile } from "@/lib/image/use-image-file";
import { loadHTMLImage, canvasToBlob, downloadBlob, stripExtension } from "@/lib/image/canvas";

const AUTO_QUALITY = 0.78;

export function ImageOptimizerWorkflow() {
  const { image, error, setFile, reset } = useImageFile();
  const [processing, setProcessing] = useState(false);
  const [processError, setProcessError] = useState<string | null>(null);
  const [result, setResult] = useState<{ url: string; blob: Blob; width: number; height: number } | null>(
    null,
  );

  async function handleOptimize() {
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

      let blob = await canvasToBlob(canvas, "image/webp", AUTO_QUALITY);
      // Fallback kalau browser belum dukung encode WEBP
      if (!blob) blob = await canvasToBlob(canvas, "image/jpeg", AUTO_QUALITY);
      if (!blob) throw new Error("Browser ini belum mendukung optimisasi otomatis.");

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
        <button
          type="button"
          onClick={handleOptimize}
          disabled={processing}
          className="inline-flex items-center gap-2 rounded-md bg-naze-500 px-6 py-2.5 font-body text-button text-white shadow-sm transition duration-fast ease-standard hover:bg-naze-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-ink-100 disabled:text-ink-400"
        >
          <Sparkles size={16} />
          {processing ? "Optimizing…" : "Optimize"}
        </button>
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
          onDownload={() => downloadBlob(result.blob, `${stripExtension(image.file.name)}-optimized.webp`)}
        />
      )}
    </div>
  );
}
