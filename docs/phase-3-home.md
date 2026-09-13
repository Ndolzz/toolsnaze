# Phase 3 — Home / Tool Discovery

## File
- `app/page.tsx` — Home: hero + `<ToolDiscovery />`
- `src/components/site-header.tsx` — logo + link Settings
- `src/components/tool-discovery.tsx` — search bar real-time, chip kategori
  (toggle, bukan link mati), grid hasil
- `src/components/tool-card.tsx` — kartu tool: icon, nama, deskripsi, badge
  kategori, favorite (persist localStorage), klik untuk expand detail
- `src/lib/tools.ts` — katalog tool + kategori (data source tunggal)
- `src/lib/use-favorite-tool.ts` — hook favorite

## Kenapa tidak ada link ke halaman tool individual dulu
Halaman/pemrosesan tiap tool baru dibangun di Phase 4 dan seterusnya sesuai
kategori. Daripada membuat link yang 404 atau placeholder "coming soon",
kartu tool di Phase 3 memang hanya berfungsi sebagai discovery: cari,
filter per kategori, tandai favorit, lihat detail singkat. Semua interaksi
itu sudah nyata dan berfungsi penuh. Routing ke halaman tool sungguhan
ditambahkan begitu tool tersebut diimplementasikan.

## Pencarian
`searchTools()` di `src/lib/tools.ts` mencocokkan query terhadap nama,
deskripsi, dan `keywords` tiap tool (mis. "compress video" → Video
Compressor, "jpg png" → Image Converter, "json" → JSON Formatter), lalu
diurutkan berdasarkan jumlah kata kunci yang cocok.

## Settings (bagian awal Phase 13, dikerjakan lebih dulu)
Link "Settings" di header perlu tujuan yang nyata, jadi kontrol Appearance
(Light/Dark/System) dari Phase 13 diimplementasikan lebih awal
(`src/components/theme-toggle.tsx`, `app/settings/page.tsx`). Item Settings
lainnya (Language, Animation preferences, dll.) menyusul di Phase 13.

## Status
- [x] Phase 0
- [x] Phase 1
- [x] Phase 2
- [x] Phase 3
- [ ] Phase 4 — Social Video
