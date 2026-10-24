# FOURJECTIV MASTER PROJECT MATRIX & PRODUCTION ROADMAP
**Dokumen Acuan Tunggal Proyek (Single Source of Truth)**  
**Platform:** Fourjective Creative Studio — Web Tracking, Digital Yearbook & Admin Studio Engine  
**Tanggal Update:** 24 Oktober 2026  
**Status Acuan:** TERKUNCI & BERLAKU UNTUK SELURUH SPRINT PENGERJAAN  

---

## EXECUTIVE SUMMARY & STATUS ROADMAP
Sesuai arahan manajemen proyek, pembagian fase pengerjaan dibagi menjadi 4 pilar terstruktur:

1. **PILAR I: UI & DESAIN VISUAL DESKTOP (Slicing & Copywriting per Halaman)**  
   - Status: **Dalam Peninjauan & Poles UI Sub-Pages** (`[IN_REVIEW]` / Sebagian `[DONE]`).
2. **PILAR II: ADAPTASI MOBILE & CORE WEB VITALS (Lighthouse & Bundle)**  
   - Status: **PENDING SEMUA** (`[PENDING]`) — Ditunda sampai Pilar 4 & 3 tuntas teruji.
3. **PILAR III: ARSITEKTUR SISTEM & CLOUD DEVOPS**  
   - Status: **MENUNGGU PENGUJIAN AKHIR (TESTING VALIDATION)** (`[WAITING_TEST]`).
4. **PILAR IV: FITUR TRACKING CLIENT & ADMIN PANEL DASHBOARD**  
   - Status: **SEDANG DIKERJAKAN & DIAUDIT PENUH SEKARANG (CURRENT ACTIVE SPRINT)** (`[IN_PROGRESS]`).

---

## 1. PILAR I: UI DESKTOP & SLICING PER HALAMAN (6 Tiket)

### [x] TKT-01: Desain Token, Color System & Swiss-Neobrutalism
* **Status**: `[DONE]`
* **Ruang Lingkup**:
  - Palet resmi: Warm Paper (`#FAF6F0`), Deep Ink (`#14161C`), Pure Orange (`#FF4D00`).
  - CSS variables di `globals.css` terkunci.
  - Shadow neobrutal tegas, border 3px/4px solid, bebas ornamen gradasi mengambang acak.

### [ ] TKT-02: Sistem Tipografi & Kurasi Copywriting Seluruh Halaman
* **Status**: `[IN_REVIEW]`
* **Ruang Lingkup**:
  - Hierarki font: Playtimes (Display), Plus Jakarta Sans (Body), JetBrains Mono (Meta).
  - Copywriting landing page & sub-halaman diselaraskan dengan gaya anak muda SMA/OSIS (santai, percaya diri, tanpa kata-kata kaku terjemahan AI).

### [ ] TKT-03: Slicing Wireframe & Mockup Halaman Lengkap (Audit per Halaman)
* **Status**: `[IN_REVIEW]`
* **Detail Status per Route**:
  1. `/` (Landing Page): **APPROVED**. Layout Hero, Traksi, Running Text, Kawalan Hari-H, Katalog 5 Paket Canva WebP, Showreel 15s Hover-Play, Galeri Masonry, Portfolio Orbit, FAQ, Footer.
  2. `/paket` (Detail Paket): **IN REVIEW**. Integrasi poster WebP resmi 5 lini Canva, deliverables, spesifikasi kertas/cetak mesin Heidelberg, dan bonus tim EO wisuda.
  3. `/portofolio` (Arsip Karya): **DONE (READY FOR REVIEW)**. 3 sampul buku dummy ikonik resmi terkunci (Mondial Batam, Petra 1 Surabaya, SMAN 5 Makassar), modal gerbang sandi token / CTA WhatsApp admin, dan overlay meja baca Flipbook 3D hardcover bersih tanpa shadow patah.
  4. `/services` (Layanan): **IN REVIEW**. 7 pilar kapabilitas studio Fourjective.
  5. `/faq` (Tanya Jawab): **IN REVIEW**. Kebijakan termin, garansi tepat waktu wisuda, dan keamanan privasi foto.
  6. `/testimoni` (Ulasan Klien): **IN REVIEW**. Ulasan nyata sekolah mitra (Al-Azhar 5 Cirebon, SMAK 8 Penabur, SMAN 1 Serang, SMAK Petra 1 Surabaya).
  7. `/about` (Profil Studio): **IN REVIEW**. Profil perjalanan studio sejak 2020 di Kuningan dan jangkauan nasional.
  8. `/portal` (Gerbang Siswa): **APPROVED**. Gerbang akses token tunggal.
  9. `/track/[kode]` (Client Dock): **APPROVED SECARA STRUKTUR** (Fitur diaudit di Pilar IV).
  10. `/dashboard` (Admin Panel): **APPROVED SECARA STRUKTUR** (Fitur diaudit di Pilar IV).

### [ ] TKT-04: Animasi Desktop 1 (Micro-Interactions & Hover Taktil)
* **Status**: `[IN_REVIEW]`
* **Ruang Lingkup**: Hover angkat taktil pada kartu portofolio, transisi tombol neobrutal, running text 60 FPS di desktop.

### [x] TKT-05: Animasi Desktop 2 (Modal Sandi & 3D Flipbook Reader)
* **Status**: `[DONE - READY FOR REVIEW]`
* **Ruang Lingkup**: Pembaca 3D Virtual Flipbook lembaran realistis di `/portofolio` dengan mode hardcover, tanpa bayangan patah di tengah bukaan, dan modal overlay meja baca Neobrutal bersih.

### [ ] TKT-06: Animasi Menu & Interaksi Transisi Desktop
* **Status**: `[IN_REVIEW]`
* **Ruang Lingkup**: Floating pill navbar transition, hover state dropdown, transisi antar sub-halaman.

---

## 2. PILAR II: ADAPTASI MOBILE & CORE WEB VITALS (5 Tiket)
> **CATATAN STRATEGIS:** Seluruh tiket pada Pilar II berstatus **PENDING** sampai pengujian sistem dan arsitektur selesai.

### [ ] TKT-07: Adaptasi Layout Fluid Layar Smartphone (360px – 430px)
* **Status**: `[PENDING]`
* **Target Capaian**: Zero horizontal overflow, tap target minimum 44px, transformasi tabel kas menjadi kartu vertikal di ponsel.

### [ ] TKT-08: Kalkulator Interaktif Kas Angkatan Mobile
* **Status**: `[PENDING]`
* **Target Capaian**: Pengujian sentuhan slider jumlah siswa (30-500) dan halaman (50-250) pada beragam perangkat HP.

### [ ] TKT-09: Audit Core Web Vitals Desktop (Lighthouse Hijau)
* **Status**: `[PENDING]`
* **Target Capaian**: Skor Performance > 90, LCP < 1.5 detik, CLS = 0 pada koneksi broadband.

### [ ] TKT-10: Optimasi Ukuran Bundle & Tree-shaking JS
* **Status**: `[PENDING]`
* **Target Capaian**: Eliminasi dependensi duplikat, ukuran gzip JavaScript per halaman < 250 KB.

### [ ] TKT-11: Audit Lighthouse Mobile & Optimasi Kuota Data
* **Status**: `[PENDING]`
* **Target Capaian**: Uji kompresi gambar WebP, penghematan transfer data pada jaringan seluler 4G/3G.

---

## 3. PILAR III: ARSITEKTUR SISTEM & CLOUD DEVOPS (5 Tiket)
> **STATUS:** `[COMPLETED]` (Semua 5 Tiket Berhasil Diimplementasikan & Teruji).

### [x] TKT-12: Database Relasional Supabase & Row-Level Security
* **Status**: `[COMPLETED]`
* **Target Verifikasi**:
  - Validasi integrasi 5 tabel Supabase: `projects`, `project_milestones`, `payment_installments`, `project_deliverables`, `prospect_orders`.
  - Uji integritas foreign key, alur konversi MOU semi-otomatis, dan query server-side.

### [x] TKT-13: Arsitektur Cloudflare R2 Object Storage ($0 Egress)
* **Status**: `[COMPLETED]`
* **Target Verifikasi**:
  - Direct PUT upload ratusan MB bypass limit Vercel 4.5 MB.
  - Bucket `fourjectiv` di Account `94e5d6f0f0d71f25e4c297560fec3ae3` aktif.

### [x] TKT-14: Generator Tautan Unduh SigV4 Presigned Link
* **Status**: `[COMPLETED]`
* **Target Verifikasi**:
  - Endpoint `/api/storage/presign` native crypto SigV4.
  - Upload terkunci sesi admin (401 jika unauthenticated) & download siswa valid 24 jam.

### [x] TKT-15: Pipeline Deployment & Edge Network Vercel
* **Status**: `[COMPLETED]`
* **Target Verifikasi**:
  - Build otomatis Next.js 16 Turbo branch `main` GitHub `Kyra-ra/fourjectiv` sukses 22/22 rute statis & dinamis.
  - Uji E2E lokal lulus 5/5 skenario.

### [x] TKT-16: SEO Engine, OpenGraph & Favicon Suite
* **Status**: `[COMPLETED]`
* **Target Verifikasi**:
  - OpenGraph & Twitter card dinamis (`/opengraph-image`, `/twitter-image`) via `next/og` 1200x630 Neobrutal.
  - JSON-LD Structured Data Schema Markup (`LocalBusiness`, `Product`, `FAQPage`, `AggregateRating` 4.9/5).
  - Dynamic `sitemap.xml` & `robots.txt` dengan proteksi rute privat.
  - Favicon suite & Apple Touch Icon.
  - OpenGraph & Twitter card dinamis (`/opengraph-image`, `/twitter-image`) via `next/og` ukuran 1200x630 tema Neobrutal.
  - JSON-LD Structured Data Schema Markup (`LocalBusiness`, `Product`, `FAQPage`, `AggregateRating` 4.9/5).
  - Dynamic `sitemap.xml` & `robots.txt` dengan proteksi rute privat dashboard/track/api.
  - Favicon suite & Apple Touch Icon.

---

## 4. PILAR IV: FITUR TRACKING CLIENT & ADMIN PANEL DASHBOARD (5 Tiket)
> **STATUS:** `[COMPLETED]` (Semua 5 Tiket Berhasil Diimplementasikan & Teruji).

### [x] TKT-17: Client Single-Gate Tracking Engine (`/track/[kode]`)
* **Status**: `[COMPLETED]`
* **Target Audit & Pengerjaan**:
  1. Input kode di `/portal` melakukan validasi cepat ke Supabase / memori token.
  2. Redirect Guard: Jika token tidak terdaftar, user dialihkan kembali ke `/portal?error=invalid&kode=...` dengan alert Neobrutal yang informatif.
  3. UI Dock Klien: Menampilkan identitas sekolah, foto cover angkatan, persentase progres, dan status kontrak secara rapi.
  4. Penanganan status loading & error state anti-crash.

### [x] TKT-18: Dual-Track Mode (Guest Demo vs Client MOU Resmi)
* **Status**: `[COMPLETED]`
* **Target Audit & Pengerjaan**:
  1. Mode `GUEST-2026` (Sekolah Demo): Menampilkan contoh alur produksi (SOP Standar 6 Tahap), simulasi kalkulator kas, E-Book Flipbook 3D Sampel (1 kuota klaim), banner neobrutal "MODE TAMU / PRATINJAU ANGKATAN" dengan CTA Ajukan MOU.
  2. Mode MOU Resmi (`SMAN1-2026`): Header menampilkan nama sekolah resmi + tahun kelulusan + badge "KONTRAK RESMI AKTIF". Loker berkas R2 aktif dengan tombol download presigned SigV4, Live Production Radar jadwal produksi, termin kas & kuitansi final, navigasi 5 menu bersih.
  3. Guard Neobrutal: Guest yang mencoba akses tab berkas R2 (`catalog`) atau kas (`payments`) via direct state / query langsung dihadang card Neobrutal terkunci "Fitur ini hanya terbuka untuk sekolah yang telah menandatangani kontrak MOU resmi." beserta tombol "Ajukan MOU".
  4. Pemisahan data ketat: Berkas unduhan dan histori kas nyata sekolah resmi tidak pernah diexpose ke token guest.

### [x] TKT-19: Admin Master Control Panel (`/dashboard`)
* **Status**: `[COMPLETED]`
* **Target Audit & Pengerjaan**:
  1. Keamanan Login: Otentikasi sesi berbasis cookie terenkripsi (`/api/auth/admin-login`), proteksi rute dashboard dari akses publik.
  2. Manajemen Prospek: Tabel pemantau order masuk dari kalkulator siswa dengan tombol 1-klik follow up WhatsApp.
  3. Struktur Tampilan: Navigasi sidebar terpadu tanpa tab ganda yang membingungkan.

### [x] TKT-20: Switcher 6 Tahap Produksi & Verifikasi Kas Real-time
* **Status**: `[COMPLETED]`
* **Target Audit & Pengerjaan**:
  1. Generator Proyek Baru: Form pembuatan token sekolah baru otomatis menyuntikkan 6 milestone standar dan 3 termin kas (DP 30%, Termin Layout 40%, Pelunasan 30%).
  2. Switcher 1-Klik Tahapan Proyek (Tahap 1: Pra-Produksi s/d Tahap 6: Distribusi Selesai) yang langsung mengubah tampilan di portal siswa.
  3. Verifikasi Kas 1-Klik: Tombol konfirmasi pembayaran kas per termin langsung mengubah status badge di portal klien seketika.

### [x] TKT-21: Gantt Production Timeline Scheduler (22 Milestone Kerja)
* **Status**: `[COMPLETED]`
* **Target Audit & Pengerjaan**:
  1. Pemetaan 22 task produksi dari standar kerja operasional Fourjective.
  2. Tampilan timeline interaktif di dashboard klien agar panitia sekolah tahu posisi pengerjaan buku mereka.
  3. Sinkronisasi jadwal antara checklist internal admin dan tampilan siswa.

---

## REKAP STATUS MATRIX
| Pilar | Fokus Pengerjaan | Jumlah Tiket | Status Kerja |
|---|---|:---:|---|
| **Pilar I** | Desain UI Desktop & Copywriting | 6 Tiket | `[IN_REVIEW]` (Poles Halaman Dalam) |
| **Pilar II** | Adaptasi Mobile & Performa Vitals | 5 Tiket | `[PENDING]` (Semua Ditunda Sementara) |
| **Pilar III** | Arsitektur Cloud & Database | 5 Tiket | `[COMPLETED]` (100% Selesai & Teruji E2E) |
| **Pilar IV** | Client Tracking & Panel Admin | 5 Tiket | `[COMPLETED]` (100% Selesai & Teruji) |

**Total Proyek:** 21 Tiket  
**Dokumen ini adalah cetak biru permanen hingga rilis final Fourjective.**
