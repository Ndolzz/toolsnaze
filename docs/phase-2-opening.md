# Phase 2 — Opening Experience

Komponen: `src/components/splash-screen.tsx`, dipasang di `app/layout.tsx`
membungkus seluruh `children` sehingga aktif di setiap first load.

## Perilaku
- Progress bar bergerak nyata dari 1% ke 100% berbasis `requestAnimationFrame`
  + waktu elapsed (bukan interval acak yang bisa terasa patah, bukan juga
  angka yang mengklaim status proses backend/keamanan tertentu — murni
  animasi UI pembuka).
- Pesan berganti mengikuti progres: Initializing Naze → Loading interface →
  Preparing tools → Checking services → Preparing workspace → Almost ready →
  Ready.
- Setelah 100%, splash crossfade (`opacity` + `duration-slow`) ke konten yang
  sebenarnya sudah ter-render di bawahnya sejak awal (di-hide via opacity),
  sehingga tidak ada flash putih maupun layout jump saat transisi ke Home.
- Scroll body dikunci selama splash tampil.
- `prefers-reduced-motion`: durasi total progress dipangkas ke 200ms (bukan
  dihilangkan total, karena splash tetap harus menyampaikan bahwa app sedang
  siap) dan seluruh CSS transition/animation lain sudah otomatis dipangkas
  lewat aturan global di `globals.css`.

## Yang perlu diganti nanti
Saat Home (Phase 3) sudah ada data async sungguhan (misalnya cek status
service), splash boleh menunggu promise itu sebelum `setDone(true)` — jangan
biarkan splash mengklaim "Ready" sebelum proses nyata tersebut selesai.
