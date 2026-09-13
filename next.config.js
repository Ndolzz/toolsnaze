/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ["app", "src"],
  },
  // Tools berat (FFmpeg/WASM, OCR, model AI) tidak boleh masuk initial bundle.
  // Import tool-tool tersebut secara dynamic (next/dynamic) di masing-masing route,
  // bukan di layout global — lihat docs/performance.md pada Phase 15.
  experimental: {
    optimizePackageImports: [],
  },
};

module.exports = nextConfig;
