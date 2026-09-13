# Phase 4 — Social Video

## Provider abstraction (`src/lib/social/`)
- `types.ts` — interface `SocialProvider`, tipe `SocialVideoInfo`, error khusus
  (`InvalidUrlError`, `UnsupportedPlatformError`, `ProviderNotConfiguredError`)
- `providers/factory.ts` — kerangka umum provider (matches by hostname)
- `providers/index.ts` — 6 provider: TikTok, Instagram, YouTube, Facebook, X,
  Pinterest — semuanya lewat factory yang sama
- `registry.ts` — `resolveSocialVideo(url)`: satu titik masuk yang memilih
  provider berdasarkan hostname URL

**Provider API belum dipilih**, jadi `resolve()` di tiap provider melempar
`ProviderNotConfiguredError` jika `SOCIAL_API_KEY` kosong — sesuai aturan
"jangan mengarang response API". Begitu provider sungguhan dipilih, isi
logic fetch di `providers/factory.ts` tanpa mengubah pemanggil manapun (API
route dan UI tidak perlu berubah).

## API
`app/api/social/resolve/route.ts` — POST `{ url }` → `{ data }` atau
`{ error }`. Error di-map ke status code yang sesuai (400/422/503/500) dan
tidak pernah mengirim stack trace ke client.

## UI (dipakai ulang untuk 3 tool)
- `src/components/social/social-tool-workflow.tsx` — alur
  input → process → progress → result/error, state dikelola oleh
  `use-resolve-social-video.ts`
- `src/components/ui/indeterminate-progress.tsx` — progress indeterminate
  (jujur — tidak ada sumber progres asli dari satu kali fetch)
- `src/components/social/result-card.tsx` — thumbnail/title/duration/
  resolution/size/format/download, field yang ditampilkan bisa disaring lewat
  prop `fields` (dipakai beda-beda antara Downloader, Video Metadata, dan
  Thumbnail Extractor supaya tidak menulis 3 komponen terpisah)

## Tool yang sudah live
- `/tools/social-video-downloader`
- `/tools/video-metadata`
- `/tools/thumbnail-extractor`

Ketiganya sudah tersambung dari Home (`src/lib/tools.ts` field `href`) —
kartunya jadi link sungguhan, bukan lagi expand-only.

## Sengaja ditunda ke Phase 6
Video → MP3, Video → GIF, Video Compressor, dan Video Converter butuh
transcoding media sungguhan (FFmpeg/WASM), bukan sekadar resolve metadata.
Daripada membangun engine FFmpeg dua kali (sekali untuk Social, sekali untuk
kategori Video umum), keempatnya tetap sebagai kartu discovery-only sampai
Phase 6 membangun engine tersebut — lalu dipakai bersama oleh kategori Social
dan Video.

## Status
- [x] Phase 0–3
- [x] Phase 4
- [ ] Phase 5 — Image
