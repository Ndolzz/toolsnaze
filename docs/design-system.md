# NAZE TOOLS — Design System (Phase 1)

## Prinsip
Modern, clean, futuristic, professional, premium, ringan. Terasa seperti satu produk
software matang — bukan kumpulan tools yang ditempel jadi satu.

## Warna
| Token | Hex | Peran |
|---|---|---|
| `naze-500` | `#2F52F2` | Primary brand, tombol utama, link aktif |
| `naze-600` / `naze-700` | `#2444D6` / `#1C36AD` | Hover & pressed state |
| `signal-500` | `#1FCBB6` | Aksen (highlight, success), dipakai secukupnya |
| `surface.light` / `surface.dark` | `#F7F8FC` / `#0B0E1A` | Canvas light/dark mode |
| `ink-900` / `ink-0` | `#141622` / `#F7F8FC` | Teks utama light/dark |

Alasan memilih biru "cobalt" (bukan biru SaaS generik `#2563eb`) dan aksen
teal-cyan (bukan hijau/oranye default AI-generated): kombinasi ini memberi
kesan teknis-presisi yang cocok untuk toolbox produktivitas, tanpa terasa
seperti template dashboard biasa.

## Tipografi
- **Display / Heading** — Space Grotesk (600/700): karakter geometris-teknis,
  dipakai untuk wordmark dan H1–H3.
- **Body** — Manrope (400–700): sangat legible di ukuran kecil, dipakai untuk
  semua teks UI dan paragraf.
- **Monospace** — JetBrains Mono: dipakai untuk code block dan Developer Tools
  (JSON formatter, hash generator, dll).

Skala tipe (rasio ~1.25) didefinisikan di `tailwind.config.ts` sebagai
`text-display`, `text-h1`, `text-h2`, `text-h3`, `text-body`, `text-body-sm`,
`text-caption`, `text-button`, `text-label`, `text-code`.

## Spacing, radius, shadow, transisi
Semua didefinisikan sebagai token di `tailwind.config.ts` — jangan menulis
angka mentah (magic number) di komponen; selalu pakai kelas Tailwind yang
merujuk token (`rounded-md`, `shadow-sm`, `duration-fast`, dst).

## Status Phase
- [x] Phase 0 — struktur project & aturan global
- [x] Phase 1 — identitas & design system (halaman preview: `app/design-system`)
- [x] Phase 2 — opening/splash experience (`src/components/splash-screen.tsx`)
- [x] Phase 3 — home / tool discovery (`app/page.tsx`, search + filter kategori + favorite)
- [x] Phase 4 — social video: provider abstraction + Social Video Downloader, Video Metadata, Thumbnail Extractor
- [ ] Phase 5+ — kategori tools lainnya

## Cara menjalankan
```bash
npm install
npm run dev
```
Build check untuk phase ini:
```bash
npm run lint
npm run typecheck
npm run build
```
