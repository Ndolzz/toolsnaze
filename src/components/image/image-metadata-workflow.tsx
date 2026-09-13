"use client";

import { ImageDropzone } from "@/components/image/image-dropzone";
import { useImageFile } from "@/lib/image/use-image-file";
import { formatFileSize } from "@/lib/format";

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function ImageMetadataWorkflow() {
  const { image, error, setFile, reset } = useImageFile();

  const ratio = image ? gcd(image.width, image.height) : 1;

  return (
    <div className="space-y-6">
      <ImageDropzone image={image} error={error} onFile={setFile} onReset={reset} />

      {image && (
        <dl className="animate-rise-in grid grid-cols-1 gap-x-6 gap-y-3 rounded-lg border border-ink-100 p-5 font-mono text-body-sm sm:grid-cols-2 dark:border-white/10">
          <div>
            <dt className="text-ink-400">File name</dt>
            <dd className="text-ink-900 dark:text-ink-0">{image.file.name}</dd>
          </div>
          <div>
            <dt className="text-ink-400">MIME type</dt>
            <dd className="text-ink-900 dark:text-ink-0">{image.file.type || "unknown"}</dd>
          </div>
          <div>
            <dt className="text-ink-400">Dimensions</dt>
            <dd className="text-ink-900 dark:text-ink-0">
              {image.width} × {image.height} px
            </dd>
          </div>
          <div>
            <dt className="text-ink-400">Aspect ratio</dt>
            <dd className="text-ink-900 dark:text-ink-0">
              {image.width / ratio}:{image.height / ratio}
            </dd>
          </div>
          <div>
            <dt className="text-ink-400">Megapixels</dt>
            <dd className="text-ink-900 dark:text-ink-0">
              {((image.width * image.height) / 1_000_000).toFixed(2)} MP
            </dd>
          </div>
          <div>
            <dt className="text-ink-400">File size</dt>
            <dd className="text-ink-900 dark:text-ink-0">{formatFileSize(image.file.size)}</dd>
          </div>
          <div>
            <dt className="text-ink-400">Last modified</dt>
            <dd className="text-ink-900 dark:text-ink-0">
              {new Date(image.file.lastModified).toLocaleString("id-ID")}
            </dd>
          </div>
        </dl>
      )}
    </div>
  );
}
