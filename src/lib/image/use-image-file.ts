"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ACCEPTED_MIME_TYPES, mimeToFormat, type LoadedImage } from "@/lib/image/types";
import { loadHTMLImage } from "@/lib/image/canvas";

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB — cukup longgar untuk foto, tetap menjaga performa Phase 15

export function useImageFile() {
  const [image, setImage] = useState<LoadedImage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const urlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  const setFile = useCallback(async (file: File) => {
    setError(null);

    if (!ACCEPTED_MIME_TYPES.includes(file.type)) {
      setError("Format tidak didukung. Gunakan JPG, PNG, WEBP, atau AVIF.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("Ukuran file terlalu besar (maksimal 25MB).");
      return;
    }

    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    const url = URL.createObjectURL(file);
    urlRef.current = url;

    try {
      const img = await loadHTMLImage(url);
      setImage({
        file,
        url,
        width: img.naturalWidth,
        height: img.naturalHeight,
        format: mimeToFormat(file.type),
      });
    } catch {
      setError("Gambar tidak bisa dibaca. Coba file lain.");
    }
  }, []);

  const reset = useCallback(() => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    setImage(null);
    setError(null);
  }, []);

  return { image, error, setFile, reset };
}
