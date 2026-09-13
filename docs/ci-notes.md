# Catatan CI — package-lock.json

Repo ini belum punya `package-lock.json` karena `npm install` belum pernah
berhasil dijalankan di lingkungan dengan akses internet penuh (percobaan di
Termux gagal karena lokasi folder di shared storage Android, bukan karena
dependency-nya).

Sementara ini:
- `.github/workflows/ci.yml` dan `build.yml` pakai `npm install` (bukan
  `npm ci`) dan tanpa `cache: "npm"`, supaya CI tetap bisa jalan tanpa lock
  file.

**Yang perlu dilakukan begitu ada kesempatan `npm install` yang berhasil**
(di GitHub Codespaces, laptop, atau Termux dari `$HOME` bukan shared storage):
```bash
npm install
git add package-lock.json
git commit -m "Add package-lock.json"
git push
```
Setelah itu, kembalikan workflow ke `npm ci` + `cache: "npm"` supaya build
benar-benar reproducible sesuai Phase 17 ("Gunakan lockfile. Build harus
reproducible.").
