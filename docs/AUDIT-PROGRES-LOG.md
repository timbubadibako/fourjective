# FOURJECTIVE PRODUCTION AUDIT & GOALS MATRIX
**Proyek:** Fourjective Yearbook Platform (Web Tracking & Admin Studio Engine)  
**Dokumen Audit:** Rincian Acceptance Criteria (Kriteria Lolos Uji) & Target Capaian per Tiket  
**Audit Status:** AUDIT JUJUR (Sesuai Kondisi Riil Lapangan)  
**Terakhir Diperbarui:** 2026-10-23  

---

## RINGKASAN PROGRES AKTUAL
* **Sudah Approved / Selesai Penuh (`[DONE]`)**: **12 Tiket** (Infrastruktur Backend, Database, Cloudflare R2, DevOps, Portal Single Gate, dsb.)
* **Sedang Direview / Perlu Revisi Teks & UI (`[IN_REVIEW]`)**: **5 Tiket** (Landing page copy belum luwes, halaman dalam Paket/FAQ/Portofolio belum disepakati).
* **Belum Dimulai / Menunggu Fiksasi UI (`[PENDING]`)**: **4 Tiket** (Audit Lighthouse final, optimasi bundle akhir, UAT penuh).

---

## 1. PILAR I: KONSEP UI & VISUAL DESIGN (6 Tiket)

### [x] TKT-01: Riset Visual, Moodboard & Color Tokens
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Terkunci palet resmi Swiss-Neobrutalism Fourjective: Paper (`#FAF6F0`), Deep Ink (`#14161C`), Pure Orange (`#FF4D00`).
  2. Moodboard terbebas dari dekorasi murahan (tanpa gradasi mengambang acak).
  3. Desain token disepakati untuk dipakai lintas halaman publik.
* **Status**: `[DONE]` (Token CSS sudah terkunci di `globals.css`).

### [ ] TKT-02: Sistem Tipografi & Kurasi Copywriting / Gaya Bahasa
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Hirarki font Playtimes + Mono + Sans tertata rapi.
  2. **REVISI COPYWRITING**: Teks landing page yang masih kaku/aneh diselaraskan menjadi bahasa anak muda SMA/OSIS yang santai, percaya diri, dan profesional (bukan bahasa kaku terjemahan AI).
  3. Tone of voice konsisten di seluruh halaman.
* **Status**: `[IN_REVIEW]` (Font sudah masuk, tapi copywriting masih perlu dipoles/disepakati).

### [ ] TKT-03: Slicing Wireframe & Mockup Halaman Lengkap (Approval Status)
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Halaman Beranda (`/`): **Approved secara layout visual, pending fiksasi teks copy**.
  2. Halaman Paket & Layanan (`/paket`): **Pending Review** (Detail kartu paket & rincian benefit belum disepakati bersama klien).
  3. Halaman Portofolio Arsip (`/portofolio`): **Pending Review** (Tampilan cover & filter kategori buku belum disepakati).
  4. Halaman FAQ & Bantuan (`/faq`): **Pending Review** (Daftar tanya-jawab teknis belum difinalkan).
  5. Halaman Testimoni (`/testimoni`): **Pending Review** (Kutipan ulasan nyata sekolah belum difinalkan).
  6. Portal Masuk Siswa (`/portal`): Approved secara fungsional.
  7. Portal Lacak Angkatan (`/track/[kode]`): Approved fungsionalitasnya.
  8. Dashboard Admin (`/dashboard`): Approved layout sidebar terpusat.
* **Status**: `[IN_REVIEW]` (Baru Beranda yang approved layoutnya, halaman lain belum disepakati).

### [ ] TKT-04: Animasi Desktop 1 (Micro-Interactions & Taktil)
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Kartu folder arsip portofolio memiliki respons hover angkat taktil tanpa jeda.
  2. Tombol-tombol CTA bereaksi dengan transisi warna tegas khas neobrutalisme.
  3. Komponen running text bergerak konstan 60 FPS di desktop.
* **Status**: `[IN_REVIEW]` (Sudah jalan di beranda, menunggu approval halaman portofolio).

### [ ] TKT-05: Animasi Desktop 2 (Modal Sandi & 3D Flipbook Reader)
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Modal input sandi token demo terbuka mulus.
  2. Pembaca Virtual Flipbook 3D di `/portofolio` mensimulasikan lembaran buku fisik yang lentur.
  3. Navigasi keyboard (panah kiri/kanan) aktif membalik halaman.
* **Status**: `[IN_REVIEW]` (Library PageFlip terpasang, menunggu review kecocokan visual dari klien).

### [ ] TKT-06: Animasi Mobile (Touch-Friendly & Low Latency)
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Drawer menu navigasi meluncur mulus saat hamburger menu ditekan di HP.
  2. Gestur swipe atau tap pada galeri responsif dalam waktu < 100ms.
  3. Tidak memberatkan kinerja smartphone panitia siswa.
* **Status**: `[IN_REVIEW]` (Menunggu halaman paket & portofolio disepakati sebelum uji coba mobile final).

---

## 2. PILAR II: ADAPTASI MOBILE & PERFORMA (5 Tiket)

### [x] TKT-07: Adaptasi Layout Fluid Mobile (360px - 430px)
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Nol horizontal overflow di layar smartphone.
  2. Ukuran tombol dan tap-target memenuhi standar aksesibilitas minimum (min. 44px).
  3. Tabel termin kas dan berkas berubah menjadi card responsif di HP.
* **Status**: `[DONE]` (Struktur grid & card responsif sudah aman di `/portal` dan `/track`).

### [x] TKT-08: Kalkulator Interaktif Kas Versi Mobile
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Slider jumlah siswa (30 - 500) dan jumlah halaman (50 - 250) digeser mulus dengan sentuhan jari.
  2. Perhitungan biaya per siswa dan total kas angkatan ter-update seketika secara reaktif.
  3. Tombol WhatsApp otomatis merangkai format pesanan rapi.
* **Status**: `[DONE]` (Kalkulator aktif di portal track).

### [ ] TKT-09: Audit Core Web Vitals Desktop (Lighthouse Hijau)
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. LCP (Largest Contentful Paint) desktop di bawah 1.5 detik pada seluruh halaman hasil final.
  2. CLS mendekati angka 0.
* **Status**: `[PENDING]` (Baru bisa diaudit final setelah seluruh halaman dan gambar asli fix).

### [ ] TKT-10: Optimasi Ukuran Bundle & Tree-shaking JS
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Eliminasi library ganda yang tidak terpakai.
  2. Ukuran bundel JS per route di bawah 250 KB gzip.
* **Status**: `[IN_REVIEW]` (Next.js config sudah dioptimalkan, tinggal pembersihan akhir pasca UI approved).

### [ ] TKT-11: Audit Lighthouse Mobile & Optimasi Kuota Data
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Kompresi WebP/AVIF untuk foto-foto angkatan.
  2. Lazy loading otomatis berjalan di jaringan seluler.
* **Status**: `[PENDING]` (Menunggu aset foto portofolio asli dimasukkan).

---

## 3. PILAR III: ARSITEKTUR SISTEM & CLOUD (5 Tiket)

### [x] TKT-12: Desain Skema Database Relasional Supabase (DDL)
* **Target**: 5 tabel relasional aktif di Supabase (`projects`, `project_milestones`, `payment_installments`, `project_deliverables`, `prospect_orders`) + RLS.
* **Status**: `[DONE]` (Online di instance Supabase `ycazsdouyfcniybpprzz`).

### [x] TKT-13: Arsitektur Cloudflare R2 Storage ($0 Egress Fee)
* **Target**: Terhubung ke bucket Cloudflare R2 (`fourjectiv`) via S3 SDK zero-egress fee.
* **Status**: `[DONE]` (Bucket Cloudflare R2 aktif & teruji).

### [x] TKT-14: Generator Tautan Unduh Aman (SigV4 Presigned Link)
* **Target**: API `/api/storage/presign` menerbitkan link download direct dengan masa berlaku 24 jam.
* **Status**: `[DONE]` (Endpoint aktif dan terhubung ke tabel unduh berkas).

### [x] TKT-15: Deployment & CI/CD Pipeline Vercel Edge
* **Target**: GitHub `Kyra-ra/fourjectiv` auto-deploy ke Vercel production saat merge ke `main`.
* **Status**: `[DONE]` (Live di `https://fourjectiv.vercel.app`).

### [x] TKT-16: SEO Engine, Metadata & Social Sharing OpenGraph
* **Target**: Preview banner WhatsApp rapi saat link dibagikan, sitemap & robots terpasang.
* **Status**: `[DONE]` (Metadata OpenGraph terkonfigurasi di root layout).

---

## 4. PILAR IV: FITUR TRACKING CLIENT & ADMIN PANEL (5 Tiket)

### [x] TKT-17: Client Single-Gate Tracking Portal (`/track/[kode]`)
* **Target**: Akses satu kode token unik per angkatan, redirect guard jika kode salah.
* **Status**: `[DONE]` (Validasi kode & guard aktif).

### [x] TKT-18: Mode Dual-Track (Guest Demo vs MOU Resmi)
* **Target**: Pemisahan hak akses antara panitia demo (`GUEST-2026`) dan klien kontrak resmi (`SMAN1-2026`).
* **Status**: `[DONE]` (Tab gating & pembatasan berkas aktif).

### [x] TKT-19: Admin Master Control Panel (`/dashboard`)
* **Target**: Proteksi password master (`fourjective2026`), navigasi sidebar tab URL terpusat tanpa tabbar ganda.
* **Status**: `[DONE]` (Dashboard sidebar bersih dan tersinkronisasi URL).

### [x] TKT-20: Switcher 6 Tahap Produksi & Verifikasi Termin Kas
* **Target**: 1-klik pengubah tahapan proyek & 1-klik verifikasi pembayaran kas lunas via Supabase.
* **Status**: `[DONE]` (Komponen MOU Manager terhubung live ke DB).

### [x] TKT-21: Gantt Production Timeline Scheduler (22 Milestone Excel)
* **Target**: 22 task produksi dari `TIMELINE 2026.xlsx` tampil di portal klien dan checklist admin.
* **Status**: `[DONE]` (Komponen timeline & scheduler aktif).

---

## REKAP STATUS SAAT INI
- **Selesai Penuh (Backend & Fitur Inti)**: 12 Tiket (57%)
- **Dalam Peninjauan & Poles UI/Copy (Front-End & Teks)**: 5 Tiket (24%)
- **Menunggu Tahap Akhir (Lighthouse & UAT Final)**: 4 Tiket (19%)

**Fokus Utama Saat Ini:**
1. Memperbaiki teks/copywriting di Landing Page agar bahasanya luwes, natural, dan sesuai gaya Fourjective.
2. Menyepakati tampilan UI untuk halaman **Paket**, **Portofolio**, **FAQ**, dan **Testimoni**.
