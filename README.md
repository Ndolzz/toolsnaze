# NAZE TOOLS

Everything you need, in one place. Aplikasi web multifungsi — social video,
image, video, audio, PDF/document, AI tools, dan developer utilities — dalam
satu tempat.

Dibangun bertahap per phase (lihat `docs/design-system.md` untuk status).
Stack: Next.js (App Router) + TypeScript + Tailwind CSS. CI/CD via GitHub
Actions (`.github/workflows/ci.yml`, `build.yml`).

## Mulai
```bash
cp .env.example .env.local
npm install
npm run dev
```

## Struktur
```
app/                 route & halaman (App Router)
src/styles/          global CSS & token runtime
docs/                dokumentasi phase & keputusan desain
.github/workflows/   CI & build pipeline
```

Jangan commit `.env` / `.env.local`. Semua API key lewat environment variable
atau GitHub Secrets.
