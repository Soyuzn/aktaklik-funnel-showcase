# Handoff: Aktaklik Funnel Showcase → GitHub + Vercel

## Tujuan
Publish folder ini sebagai static site supaya Mishael dan boss-nya (Jonathan, Sopan) bisa tes funnel-nya di HP.
1. Buat repo GitHub **private** `Soyuzn/aktaklik-funnel-showcase` dan push isi folder ini.
2. Deploy ke **Vercel** (static, tanpa build), sambungkan ke repo supaya setiap push auto-deploy.
3. Berikan URL production Vercel ke Mishael.

## Aturan penting
- Commit **hanya atas nama Mishael**: `Mishael Gilland <mishaelgilland@gmail.com>`. **Jangan** tambahkan `Co-Authored-By: Claude` atau baris `Claude-Session` di commit message.
- Repo private. Vercel deployment boleh publik (link untuk tes).
- Jangan ubah copy, desain, atau animasi kecuali diminta. Semua sudah di-approve Mishael.
- Hindari em dash dan en dash di teks baru.

## Isi folder
```
index.html        Hub: 3 iklan Instagram dalam mockup HP (klik → LP)
lp-1.html         LP 1 · "Buat Draft Akta Cuma 3 Menit"
lp-2.html         LP 2 · "Stop Ketik Ulang Dokumen Klien"
lp-3.html         LP 3 · "Kerja Cepat, Kantor Tetap Aman"
video.html        Video cara kerja (4 part), CTA konsultasi
jadwal.html       Pilih tanggal + jam konsultasi 15 menit → sukses
assets/app.js     Semua logika + render halaman (data LP, popup form, video, kalender, GSAP)
assets/style.css  Semua style
assets/vendor/    gsap.min.js + ScrollTrigger.min.js (GSAP 3.15, lokal, jangan ganti ke CDN)
assets/           logo.svg, logo-white.svg, icon.svg, hero-1..3.png, creative-1..3.png
videos/           part-1..4.mp4 (total ±28 MB, masing-masing < 11 MB)
README.md, vercel.json
```
Semua halaman di-render oleh `assets/app.js` berdasarkan `<body data-page="..." data-lp="...">`.

## Alur funnel
Iklan → LP → popup langkah 1 (kontak: nama, WA, email, praktik, kota) → popup langkah 2 (4 pertanyaan chip) → `video.html?src=<lp>&nama=<nama>` (video mulai dari part sesuai LP: LP2 → part 2, lainnya part 1) → `jadwal.html` → halaman sukses.
- Bar hijau di atas = **showcase bar** untuk pindah LP/Video/Jadwal; tombol kuning "Isi form contoh" auto-fill form; tekan **B** untuk sembunyikan.
- Data form tidak dikirim ke mana pun (showcase saja).

## Langkah yang disarankan
```bash
cd "~/Documents/sopan/Aktaklik/Funnel Showcase"
git init -b main
git add -A
git -c user.name="Mishael Gilland" -c user.email="mishaelgilland@gmail.com" commit -m "Aktaklik funnel showcase: 3 LP, popup form, video, jadwal"
gh repo create Soyuzn/aktaklik-funnel-showcase --private --source=. --remote=origin --push
# Vercel (CLI): login kalau perlu, lalu
vercel link --yes --project aktaklik-funnel-showcase
vercel --prod
# Sambungkan Git supaya auto-deploy:
vercel git connect
```
Jika `gh`/`vercel` belum login, minta Mishael menjalankan `gh auth login` / `vercel login` dulu. Alternatif Vercel tanpa CLI: vercel.com/new → Import `Soyuzn/aktaklik-funnel-showcase` → Deploy (Framework: Other, tanpa build command, output = root).

`.gitignore` yang disarankan: `.DS_Store`, `.vercel`.

## Verifikasi setelah deploy
- Buka URL production di desktop dan emulasi HP (375px). Cek: hub mockup, ketiga LP, popup langkah 1 dan 2 (tombol sticky di bawah popup), video bisa diputar, kalender jadwal, halaman sukses.
- `vercel.json` memakai `cleanUrls: true`, jadi `/lp-1` juga jalan. Link internal tetap memakai `.html` dan aman.
- Tes playwright: tombol "bernapas" (GSAP) dianggap tidak stabil, pakai `click(..., force=True)`.

## Masih terbuka (tanyakan ke Mishael, jangan diasumsikan)
- Nomor WhatsApp tim untuk tombol "Hubungi Tim Kami" / "chat tim via WhatsApp": isi `WA_NUMBER` di baris kedua `assets/app.js` (format `628xxxxxxxxxx`). Sekarang kosong, jadi membuka wa.me tanpa nomor.
- Tombol "Konfirmasi Jadwal" hanya menampilkan halaman sukses (belum terhubung ke kalender/CRM), sesuai permintaan.
- Klaim fitur di LP 3 (cek KTP ke Dukcapil, PMPJ, dokumen pendukung) dan LP 2 (baca akta perubahan lama) berasal dari brief funnel; perlu dikonfirmasi tim sebelum dipakai untuk iklan sungguhan.

## Konteks asal
- Desain sumber: Figma file "Aktaklik" (page Landing Page: section "Aktaklik • Funnel LP" dan "Aktaklik • Funnel Form & Lanjutan"; page Creative: "Aktaklik • Funnel Creative").
- Video tutorial dibuat dari screen recording Jonathan, diedit jadi 4 part (musik: Aylex – Good Days, freetouse.com, kredit ada di layar penutup video).
