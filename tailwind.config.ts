import type { Config } from "tailwindcss";

/**
 * NAZE TOOLS — Design Tokens
 * -----------------------------------------------------------------------
 * Identitas: modern, clean, futuristic, premium, ringan.
 * Warna dasar: biru sebagai identitas utama ("Naze Cobalt"), dengan aksen
 * teal-cyan ("Naze Signal") untuk highlight, bukan biru generik SaaS (#2563eb)
 * dan bukan aksen hijau/oranye yang sudah jadi default AI-generated design.
 */
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      sm: "480px", // large phones
      md: "768px", // tablet
      lg: "1024px", // small laptop
      xl: "1280px", // desktop
      "2xl": "1536px", // wide desktop
    },
    extend: {
      colors: {
        naze: {
          // Primary blue scale ("Naze Cobalt")
          50: "#EEF2FF",
          100: "#DCE4FF",
          200: "#B3C2FF",
          300: "#7F98FF",
          400: "#4F6FFF",
          500: "#2F52F2", // primary brand
          600: "#2444D6",
          700: "#1C36AD",
          800: "#172B85",
          900: "#12205F",
          950: "#0B1640",
        },
        signal: {
          // Accent teal-cyan ("Naze Signal") — used sparingly
          300: "#7CF5E4",
          400: "#3FE6D1",
          500: "#1FCBB6", // accent brand
          600: "#16A493",
        },
        ink: {
          0: "#F7F8FC", // light canvas
          50: "#EEF0F7",
          100: "#DEE1EC",
          400: "#8A8FA3",
          600: "#565B72",
          800: "#282C3E",
          900: "#141622",
        },
        surface: {
          light: "#F7F8FC",
          "light-raised": "#FFFFFF",
          dark: "#0B0E1A",
          "dark-raised": "#12152A",
        },
        success: "#1FCBB6",
        warning: "#F2A93B",
        danger: "#F0475B",
      },
      fontFamily: {
        // Display/heading — punya karakter teknis, dipakai untuk H1-H3 & wordmark
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        // Body — sangat mudah dibaca di ukuran kecil, dipakai untuk paragraf/UI
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        // Monospace — dipakai untuk code block, developer tools, data label
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Type scale (rasio ~1.25, mengikuti prinsip Elements of Typographic Style)
        display: ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "600" }],
        h1: ["2.75rem", { lineHeight: "1.1", letterSpacing: "-0.015em", fontWeight: "600" }],
        h2: ["2.125rem", { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "600" }],
        h3: ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.005em", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.55", fontWeight: "400" }],
        caption: ["0.75rem", { lineHeight: "1.4", fontWeight: "500" }],
        button: ["0.9375rem", { lineHeight: "1", fontWeight: "600" }],
        label: ["0.8125rem", { lineHeight: "1.2", fontWeight: "500" }],
        code: ["0.875rem", { lineHeight: "1.6", fontWeight: "400" }],
      },
      spacing: {
        // skala 4px, ditambah beberapa nilai section-level
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "10px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        pill: "999px",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(11, 22, 64, 0.06)",
        sm: "0 2px 8px rgba(11, 22, 64, 0.08)",
        md: "0 8px 24px rgba(11, 22, 64, 0.10)",
        lg: "0 16px 40px rgba(11, 22, 64, 0.14)",
        focus: "0 0 0 3px rgba(47, 82, 242, 0.35)",
      },
      transitionDuration: {
        instant: "80ms",
        fast: "140ms",
        DEFAULT: "200ms",
        slow: "320ms",
        entrance: "520ms",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        emphasized: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "rise-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        indeterminate: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(300%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 200ms cubic-bezier(0.2,0.8,0.2,1) both",
        "rise-in": "rise-in 320ms cubic-bezier(0.16,1,0.3,1) both",
        indeterminate: "indeterminate 1.1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
