export type ImageFormat = "jpg" | "png" | "webp" | "avif";

export const FORMAT_MIME: Record<ImageFormat, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
};

export const ACCEPTED_MIME_TYPES = Object.values(FORMAT_MIME);

/** PNG lossless — slider quality tidak berlaku untuknya. */
export const LOSSY_FORMATS: ImageFormat[] = ["jpg", "webp", "avif"];

export function mimeToFormat(mime: string): ImageFormat | null {
  const entry = Object.entries(FORMAT_MIME).find(([, m]) => m === mime);
  return entry ? (entry[0] as ImageFormat) : null;
}

export interface LoadedImage {
  file: File;
  /** object URL — jangan lupa revoke saat file diganti/unmount */
  url: string;
  width: number;
  height: number;
  format: ImageFormat | null;
}
