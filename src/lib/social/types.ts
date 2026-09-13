export interface SocialVideoInfo {
  sourceUrl: string;
  platform: string;
  title: string;
  thumbnailUrl: string;
  durationSeconds: number;
  resolution: string;
  fileSizeBytes: number;
  format: string;
  downloadUrl: string;
}

export interface SocialProvider {
  /** id internal, dipakai untuk logging & konfigurasi */
  id: string;
  /** nama platform untuk ditampilkan ke user */
  label: string;
  /** cek apakah provider ini yang menangani sebuah URL */
  matches(url: URL): boolean;
  /** ambil metadata + tautan unduhan video dari URL yang valid */
  resolve(url: URL): Promise<SocialVideoInfo>;
}

export class InvalidUrlError extends Error {
  constructor() {
    super("URL tidak valid.");
    this.name = "InvalidUrlError";
  }
}

export class UnsupportedPlatformError extends Error {
  constructor() {
    super("Platform pada URL ini belum didukung.");
    this.name = "UnsupportedPlatformError";
  }
}

export class ProviderNotConfiguredError extends Error {
  constructor(providerLabel: string) {
    super(`Provider ${providerLabel} belum dikonfigurasi di server ini.`);
    this.name = "ProviderNotConfiguredError";
  }
}
