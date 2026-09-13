import {
  FacebookProvider,
  InstagramProvider,
  PinterestProvider,
  TikTokProvider,
  XProvider,
  YouTubeProvider,
} from "@/lib/social/providers";
import {
  InvalidUrlError,
  UnsupportedPlatformError,
  type SocialVideoInfo,
} from "@/lib/social/types";

const PROVIDERS = [
  TikTokProvider,
  InstagramProvider,
  YouTubeProvider,
  FacebookProvider,
  XProvider,
  PinterestProvider,
];

export function parseSocialUrl(raw: string): URL {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new InvalidUrlError();
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new InvalidUrlError();
  }
  return url;
}

export async function resolveSocialVideo(raw: string): Promise<SocialVideoInfo> {
  const url = parseSocialUrl(raw);
  const provider = PROVIDERS.find((p) => p.matches(url));
  if (!provider) {
    throw new UnsupportedPlatformError();
  }
  return provider.resolve(url);
}

export const SUPPORTED_PLATFORM_LABELS = PROVIDERS.map((p) => p.label);
