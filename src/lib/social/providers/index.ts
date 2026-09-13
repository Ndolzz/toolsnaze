import { createSocialProvider } from "@/lib/social/providers/factory";

export const TikTokProvider = createSocialProvider({
  id: "tiktok",
  label: "TikTok",
  hostnames: ["tiktok.com"],
});

export const InstagramProvider = createSocialProvider({
  id: "instagram",
  label: "Instagram",
  hostnames: ["instagram.com"],
});

export const YouTubeProvider = createSocialProvider({
  id: "youtube",
  label: "YouTube",
  hostnames: ["youtube.com", "youtu.be"],
});

export const FacebookProvider = createSocialProvider({
  id: "facebook",
  label: "Facebook",
  hostnames: ["facebook.com", "fb.watch"],
});

export const XProvider = createSocialProvider({
  id: "x",
  label: "X",
  hostnames: ["x.com", "twitter.com"],
});

export const PinterestProvider = createSocialProvider({
  id: "pinterest",
  label: "Pinterest",
  hostnames: ["pinterest.com", "pin.it"],
});
