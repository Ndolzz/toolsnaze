# Phase 5 — Image Tools

## Prinsip: client-side processing
Sesuai instruksi ("prioritaskan client-side processing agar server cost
rendah"), semua tool di phase ini murni jalan di browser lewat Canvas API —
**tidak ada file yang diunggah ke server**. Tidak butuh backend, tidak butuh
API key.

## File inti
- `src/lib/image/types.ts` — format yang didukung (JPG/PNG/WEBP/AVIF), MIME
  mapping
- `src/lib/image/canvas.ts` — `loadHTMLImage`, `canvasToBlob`, `downloadBlob`
  (dipakai ulang semua tool)
- `src/lib/image/use-image-file.ts` — hook validasi file, baca dimensi,
  cleanup object URL otomatis
- `src/components/image/image-dropzone.tsx` — drag & drop + file picker +
  preview + resolusi/ukuran/format (wajib per spek Phase 5)
- `src/components/image/before-after.tsx` — preview sebelum/sesudah +
  persentase perubahan ukuran + tombol download

## Tool yang sudah live
| Tool | Cara kerja |
|---|---|
| Image Compressor | slider kualitas manual, output WEBP/JPG |
| Image Resizer | width/height dengan kunci rasio aspek |
| Image Converter | konversi bebas antar JPG/PNG/WEBP/AVIF |
| Image Cropper | drag langsung di atas preview untuk pilih area |
| Image Optimizer | satu klik, WEBP kualitas 78% otomatis (beda dari Compressor yang manual) |
| Image Metadata | baca-saja: dimensi, rasio, megapiksel, ukuran, MIME |

Catatan format: encode AVIF via `canvas.toBlob` belum didukung semua
browser. Kalau gagal, tool menampilkan pesan jelas ("Browser ini belum
mendukung ekspor ke AVIF") — bukan file kosong atau silent fail.

## Sengaja ditunda
- **Background Remover** — butuh model AI, bukan sekadar manipulasi canvas.
  Ditunda sampai Phase 9 (AI provider abstraction) siap.
- **Image Upscaler** — sudah dikatalogkan di kategori AI sejak Phase 3
  (`ai-image-upscaler`), sama alasannya: butuh model AI sungguhan.
- **Image → PDF** — dikatalogkan di kategori Document (`image-to-pdf`),
  ditunda ke Phase 8 supaya pakai satu library PDF yang sama dengan tool PDF
  lainnya, bukan dua implementasi terpisah.

## Status
- [x] Phase 0–4
- [x] Phase 5
- [ ] Phase 6 — Video
