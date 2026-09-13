"use client";

import { useCallback, useState } from "react";
import type { SocialVideoInfo } from "@/lib/social/types";

type Status = "idle" | "loading" | "success" | "error";

export function useResolveSocialVideo() {
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<SocialVideoInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastUrl, setLastUrl] = useState("");

  const process = useCallback(async (url: string) => {
    setLastUrl(url);
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/social/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const body = (await res.json()) as { data?: SocialVideoInfo; error?: string };
      if (!res.ok || !body.data) {
        setError(body.error ?? "Unable to process this link.");
        setStatus("error");
        return;
      }
      setData(body.data);
      setStatus("success");
    } catch {
      setError("Unable to reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }, []);

  const retry = useCallback(() => {
    if (lastUrl) process(lastUrl);
  }, [lastUrl, process]);

  const reset = useCallback(() => {
    setStatus("idle");
    setData(null);
    setError(null);
  }, []);

  return { status, data, error, process, retry, reset };
}
