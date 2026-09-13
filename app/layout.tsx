import type { Metadata } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import { SplashScreen } from "@/components/splash-screen";
import "@/styles/globals.css";

// Display — dipakai untuk wordmark & heading, punya karakter teknis-geometris
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

// Body — sangat legible di ukuran kecil, lebih hangat dan kurang generik dari default sans
const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

// Monospace — untuk code block, data label, dan Developer Tools
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NAZE TOOLS",
  description: "Everything you need, in one place.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="min-h-dvh antialiased">
        <SplashScreen>{children}</SplashScreen>
      </body>
    </html>
  );
}
