"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Phase 2 — Opening Experience
 * - Progress bar bergerak nyata dari 1% → 100% (bukan spinner, bukan angka palsu
 *   yang mengklaim status backend/keamanan — ini murni animasi UI pembuka).
 * - Pesan berubah sesuai tahap progres.
 * - Setelah 100%, crossfade halus ke konten; konten sudah ter-render di bawah
 *   (opacity 0) sejak awal supaya tidak ada layout jump saat reveal.
 * - Menghormati prefers-reduced-motion: durasi dipangkas drastis, bukan dihilangkan.
 */

const MESSAGES = [
  "Initializing Naze",
  "Loading interface",
  "Preparing tools",
  "Checking services",
  "Preparing workspace",
  "Almost ready",
];

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(1);
  const [done, setDone] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const totalDuration = reducedMotion.current ? 200 : 1400;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / totalDuration) * 100));
      setProgress(Math.max(1, pct));
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };

    raf = requestAnimationFrame(tick);
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(
      () => {
        setRevealed(true);
        document.body.style.overflow = "";
      },
      reducedMotion.current ? 80 : 260,
    );
    return () => clearTimeout(t);
  }, [done]);

  const messageIndex = Math.min(
    MESSAGES.length - 1,
    Math.floor((progress / 100) * MESSAGES.length),
  );
  const message = done ? "Ready" : MESSAGES[messageIndex];

  return (
    <>
      <div
        aria-hidden={revealed}
        role="status"
        aria-live="polite"
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-naze-950 transition-opacity duration-slow ease-emphasized ${
          revealed ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <p className="animate-rise-in font-display text-h1 tracking-tight text-white">NAZE</p>

        <div className="mt-8 h-1 w-48 overflow-hidden rounded-pill bg-white/10">
          <div
            className="h-full rounded-pill bg-signal-500 transition-[width] duration-100 ease-standard"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-3 font-mono text-caption text-white/60">{progress}%</p>
        <p className="mt-1 font-body text-body-sm text-white/80">{message}</p>
      </div>

      <div className={revealed ? "animate-fade-in" : "opacity-0"}>{children}</div>
    </>
  );
}
