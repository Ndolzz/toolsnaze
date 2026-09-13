import {
  ProviderNotConfiguredError,
  type SocialProvider,
  type SocialVideoInfo,
} from "@/lib/social/types";

interface ProviderConfig {
  id: string;
  label: string;
  hostnames: string[];
}

/**
 * Kerangka provider generik. Belum terhubung ke API pihak ketiga mana pun
 * (belum dipilih secara eksplisit oleh product owner), jadi `resolve()`
 * sengaja melempar error yang jelas alih-alih mengarang response.
 *
 * Untuk menyambungkan provider sungguhan nanti:
 * 1. isi implementasi fetch ke API resmi provider di dalam `resolve()`
 * 2. baca kredensial HANYA dari `process.env.SOCIAL_API_KEY`
 *    (atau tambah env var khusus provider bila API-nya butuh kredensial terpisah)
 * 3. hapus pelemparan ProviderNotConfiguredError di bawah ini
 */
export function createSocialProvider(config: ProviderConfig): SocialProvider {
  return {
    id: config.id,
    label: config.label,
    matches(url: URL) {
      return config.hostnames.some(
        (host) => url.hostname === host || url.hostname.endsWith(`.${host}`),
      );
    },
    async resolve(_url: URL): Promise<SocialVideoInfo> {
      if (!process.env.SOCIAL_API_KEY) {
        throw new ProviderNotConfiguredError(config.label);
      }
      // TODO(Phase 4 lanjutan): panggil API resmi provider di sini setelah
      // provider dipilih. Jangan mengarang response.
      throw new ProviderNotConfiguredError(config.label);
    },
  };
}
