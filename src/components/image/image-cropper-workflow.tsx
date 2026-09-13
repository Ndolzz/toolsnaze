"use client";

import { useRef, useState } from "react";
import { ImageDropzone } from "@/components/image/image-dropzone";
import { BeforeAfter } from "@/components/image/before-after";
import { useImageFile } from "@/lib/image/use-image-file";
import { canvasToBlob, downloadBlob, stripExtension } from "@/lib/image/canvas";
import { FORMAT_MIME } from "@/lib/image/types";

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function ImageCropperWorkflow() {
  const { image, error, setFile, reset } = useImageFile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<Rect | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processError, setProcessError] = useState<string | null>(null);
  const [result, setResult] = useState<{ url: string; blob: Blob; width: number; height: number } | null>(
    null,
  );

  function getRelativePoint(e: React.PointerEvent) {
    const box = containerRef.current!.getBoundingClientRect();
    return {
      x: Math.min(Math.max(e.clientX - box.left, 0), box.width),
      y: Math.min(Math.max(e.clientY - box.top, 0), box.height),
    };
  }

  function onPointerDown(e: React.PointerEvent) {
    if (!image) return;
    const p = getRelativePoint(e);
    setDragStart(p);
    setRect({ x: p.x, y: p.y, w: 0, h: 0 });
    setResult(null);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragStart) return;
    const p = getRelativePoint(e);
    setRect({
      x: Math.min(dragStart.x, p.x),
      y: Math.min(dragStart.y, p.y),
      w: Math.abs(p.x - dragStart.x),
      h: Math.abs(p.y - dragStart.y),
    });
  }

  function onPointerUp() {
    setDragStart(null);
  }

  async function handleCrop() {
    if (!image || !rect || rect.w < 4 || rect.h < 4) {
      setProcessError("Seret pada gambar untuk memilih area crop dulu.");
      return;
    }
    setProcessing(true);
    setProcessError(null);
    try {
      const box = containerRef.current!.getBoundingClientRect();
      const scaleX = image.width / box.width;
      const scaleY = image.height / box.height;

      const sx = rect.x * scaleX;
      const sy = rect.y * scaleY;
      const sw = rect.w * scaleX;
      const sh = rect.h * scaleY;

      const img = new window.Image();
      img.src = image.url;
      await img.decode();

      const canvas = document.createElement("canvas");
      canvas.width = Math.round(sw);
      canvas.height = Math.round(sh);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas tidak tersedia di browser ini.");
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

      const mime = image.format ? FORMAT_MIME[image.format] : "image/png";
      const blob = await canvasToBlob(canvas, mime);
      if (!blob) throw new Error("Gagal membuat hasil crop.");

      setResult({ url: URL.createObjectURL(blob), blob, width: canvas.width, height: canvas.height });
    } catch (err) {
      setProcessError(err instanceof Error ? err.message : "Gagal memproses gambar.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="space-y-6">
      {!image ? (
        <ImageDropzone
          image={image}
          error={error}
          onFile={setFile}
          onReset={() => {
            reset();
            setResult(null);
            setRect(null);
          }}
        />
      ) : (
        <div>
          <div
            ref={containerRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            className="relative touch-none select-none overflow-hidden rounded-lg border border-ink-100 dark:border-white/10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- object URL lokal */}
            <img src={image.url} alt="Preview" className="block w-full" draggable={false} />
            {rect && rect.w > 0 && rect.h > 0 && (
              <div
                className="pointer-events-none absolute border-2 border-naze-500"
                style={{
                  left: rect.x,
                  top: rect.y,
                  width: rect.w,
                  height: rect.h,
                  boxShadow: "0 0 0 9999px rgba(11,14,26,0.55)",
                }}
              />
            )}
          </div>
          <p className="mt-2 font-body text-body-sm text-ink-600 dark:text-ink-400">
            Seret pada gambar untuk memilih area yang mau dipotong.
          </p>

          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={handleCrop}
              disabled={processing}
              className="inline-flex items-center justify-center rounded-md bg-naze-500 px-6 py-2.5 font-body text-button text-white shadow-sm transition duration-fast ease-standard hover:bg-naze-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-ink-100 disabled:text-ink-400"
            >
              {processing ? "Cropping…" : "Crop"}
            </button>
            <button
              type="button"
              onClick={() => {
                reset();
                setResult(null);
                setRect(null);
              }}
              className="font-body text-button text-ink-600 transition duration-fast hover:text-ink-900 dark:text-ink-400 dark:hover:text-ink-0"
            >
              Ganti gambar
            </button>
          </div>
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
            label: "Original",
            width: image.width,
            height: image.height,
            bytes: image.file.size,
          }}
          after={{
            url: result.url,
            label: "Cropped",
            width: result.width,
            height: result.height,
            bytes: result.blob.size,
          }}
          onDownload={() =>
            downloadBlob(result.blob, `${stripExtension(image.file.name)}-cropped.${image.format ?? "png"}`)
          }
        />
      )}
    </div>
  );
}
