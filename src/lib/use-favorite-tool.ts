"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "naze-favorite-tools";

function readFavorites(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

export function useFavoriteTool(slug: string) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(readFavorites().has(slug));
  }, [slug]);

  const toggle = useCallback(() => {
    const favorites = readFavorites();
    if (favorites.has(slug)) {
      favorites.delete(slug);
    } else {
      favorites.add(slug);
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]));
    setIsFavorite(favorites.has(slug));
  }, [slug]);

  return { isFavorite, toggle };
}
