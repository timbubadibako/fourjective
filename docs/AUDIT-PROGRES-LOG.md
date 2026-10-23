# FOURJECTIVE PRODUCTION AUDIT & GOALS MATRIX
**Proyek:** Fourjective Yearbook Platform (Web Tracking & Admin Studio Engine)  
**Dokumen Audit:** Rincian Acceptance Criteria (Kriteria Lolos Uji) & Target Capaian per Tiket  
**Terakhir Diperbarui:** 2026-10-23  

---

## 1. PILAR I: KONSEP UI & VISUAL DESIGN (6 Tiket)

### [x] TKT-01: Riset Visual, Moodboard & Color Tokens
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Terkunci palet resmi Swiss-Neobrutalism Fourjective: Paper (`#FAF6F0`), Deep Ink (`#14161C`), Pure Orange (`#FF4D00`), dan Border Muted (`#14161C/15`).
  2. Moodboard terbebas dari ornamen visual slop (tidak ada shadow mengambang acak, kabut warna gradasi murahan, atau badge dekoratif berlebih).
  3. Desain disetujui (*Design Token Approved*) untuk dipakai lintas halaman publik dan portal.
* **Status**: `[DONE]` (Diterapkan di `globals.css` & `tailwind.config.ts`).

### [x] TKT-02: Sistem Tipografi & Layout Hierarchy
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Hirarki font terbagi tegas: Judul/Display menggunakan `Playtimes` & font serif editorial, monospaced teknis memakai `JetBrains/Space Mono`, dan teks bacaan memakai sans-serif bersih.
  2. Kontras teks lolos standar keterbacaan WCAG AA (rasio kontras tinta terhadap kertas di atas 4.5:1).
  3. Header 2 baris konsisten pada seluruh judul seksi.
* **Status**: `[DONE]` (`globals.css` var font terhubung bersih).

### [x] TKT-03: Slicing Wireframe & Mockup Halaman Lengkap (Approval Status)
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Halaman Beranda (`/`): Approved (Hero, Traction, Traksi, Katalog Terpadu, Kawalan Banner, Showreel, Footer).
  2. Halaman Paket & Layanan (`/paket` & `/services`): Approved (Katalog 5 paket spesifikasi cetak, video, merchandise).
  3. Halaman Portofolio Arsip (`/portofolio`): Approved (Pencarian nama sekolah, grid cover majalah, filter tahun angkatan).
  4. Halaman FAQ & Bantuan (`/faq`): Approved (Akordion tanya-jawab seputar produksi, teknis pemotretan, dan kas).
  5. Halaman Testimoni (`/testimoni`): Approved (Ulasan panitia OSIS & komite sekolah).
  6. Portal Masuk Siswa (`/portal`): Approved (Input form kode token akses sekolah & tombol demo instan).
  7. Portal Lacak Angkatan (`/track/[kode]`): Approved (6 tahap stepper, rincian kas, berkas download, alur timeline, reader flipbook).
  8. Dashboard Admin (`/dashboard`): Approved (Navigasi sidebar tab terpusat tanpa tab horizontal ganda).
* **Status**: `[DONE]` (Seluruh 8 route halaman aktif dan lolos review).

### [x] TKT-04: Animasi Desktop 1 (Micro-Interactions & Taktil)
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Kartu folder arsip portofolio memiliki respons hover angkat taktil (*tactile elevation*) tanpa jeda latency.
  2. Tombol-tombol CTA bereaksi dengan transisi warna halus (*orange-to-dark* / *dark-to-orange*).
  3. Komponen running text bergerak konstan 60 FPS tanpa jank saat di-scroll di desktop.
* **Status**: `[DONE]` (Animasi CSS hardware-accelerated aktif).

### [x] TKT-05: Animasi Desktop 2 (Modal Sandi & 3D Flipbook Reader)
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Modal input sandi token demo terbuka dengan backdrop blur dan animasi pop-in halus.
  2. Pembaca Virtual Flipbook 3D di `/portofolio` mensimulasikan efek lengkung lembaran buku nyata saat dibolak-balik.
  3. Navigasi keyboard (panah kiri/kanan) berfungsi mulus untuk membuka halaman buku berikutnya.
* **Status**: `[DONE]` (Integrasi StPageFlip engine di `Carousel.tsx` & portal klien).

### [x] TKT-06: Animasi Mobile (Touch-Friendly & Low Latency)
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Drawer menu navigasi meluncur mulus dari samping/bawah saat ikon hamburger ditekan di smartphone.
  2. Animasi tidak memakan daya baterai berlebih (bebas dari efek blur/filter berat yang membebani GPU ponsel low-end).
  3. Gestur swipe atau tap pada galeri responsif dalam waktu < 100ms.
* **Status**: `[DONE]` (Diuji pada simulasi touch viewport ponsel).

---

## 2. PILAR II: ADAPTASI MOBILE & PERFORMA (5 Tiket)

### [x] TKT-07: Adaptasi Layout Fluid Mobile (360px - 430px)
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Nol horizontal overflow (tidak ada elemen yang meluber ke kanan di layar iPhone SE, 13/14/15, maupun Android 360px).
  2. Ukuran tombol dan tap-target memenuhi standar aksesibilitas minimum (tinggi minimum 44px agar mudah dipencet jempol).
  3. Tabel termin kas dan tabel berkas otomatis berubah menjadi stacked-card yang rapi saat dibuka di ponsel.
* **Status**: `[DONE]` (Kelas Tailwind `overflow-x-hidden` dan card-wrapper mobile aktif).

### [x] TKT-08: Kalkulator Interaktif Kas Versi Mobile
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Slider jumlah siswa (30 - 500) dan jumlah halaman (50 - 250) dapat digeser mulus menggunakan jari tanpa macet.
  2. Perhitungan biaya per siswa dan total kas angkatan ter-update seketika secara reaktif.
  3. Tombol "Kirim Rincian via WhatsApp" otomatis merangkai format teks pesanan yang rapi ke nomor admin Fourjective.
* **Status**: `[DONE]` (Diuji pada kalkulator di portal track).

### [x] TKT-09: Audit Core Web Vitals Desktop (Lighthouse Hijau)
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. LCP (Largest Contentful Paint) desktop berada di bawah 1.5 detik.
  2. CLS (Cumulative Layout Shift) mendekati angka 0 (tidak ada elemen layout yang melompat saat font/gambar selesai dimuat).
  3. FID/INP (Interaction to Next Paint) hijau (< 100ms respons klik).
* **Status**: `[DONE]` (Next.js server-side static page generation diaktifkan pada build).

### [x] TKT-10: Optimasi Ukuran Bundle & Tree-shaking JS
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Eliminasi library ganda yang tidak perlu (hanya menggunakan library resmi yang esensial).
  2. Penggunaan impor spesifik untuk pustaka ikon (`lucide-react`) agar ukuran bundel JS per halaman tetap ramping di bawah 250 KB gzip.
  3. Build production `npm run build` selesai tanpa peringatan siklus ketergantungan (*no circular dependencies*).
* **Status**: `[DONE]` (`optimizePackageImports` aktif di `next.config.ts`, build hijau).

### [x] TKT-11: Audit Lighthouse Mobile & Optimasi Kuota Data
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Format aset visual dikonversi dan disajikan dalam format WebP/AVIF modern.
  2. Lazy loading otomatis aktif untuk gambar portofolio di bawah lipatan layar (*below-the-fold*).
  3. Siswa dapat membuka web dengan hemat kuota sekalipun menggunakan jaringan seluler 4G/3G di area sekolah.
* **Status**: `[DONE]` (Komponen `next/image` menangani srcset otomatis).

---

## 3. PILAR III: ARSITEKTUR SISTEM & CLOUD (5 Tiket)

### [x] TKT-12: Desain Skema Database Relasional Supabase (DDL)
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Terpasang 5 tabel relasional aktif di Supabase PostgreSQL:
     - `projects`: Menyimpan identitas sekolah, tahun kelulusan, dan status kontrak.
     - `project_milestones`: Menyimpan 6 tahapan utama produksi.
     - `payment_installments`: Menyimpan 3 termin kas (DP, Pertengahan, Pelunasan).
     - `project_deliverables`: Menyimpan daftar berkas unduh hasil cetak & digital.
     - `prospect_orders`: Menyimpan data panitia baru yang menghitung simulasi kas.
  2. Row Level Security (RLS) aktif melindungi kebocoran data antar sekolah mitra.
* **Status**: `[DONE]` (Database online di instance Supabase `ycazsdouyfcniybpprzz`).

### [x] TKT-13: Arsitektur Cloudflare R2 Storage ($0 Egress Fee)
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Terhubung ke Cloudflare R2 bucket (`fourjectiv`) dengan protokol S3-compatible.
  2. Studio terbebas 100% dari biaya tagihan bandwidth egress download siswa ($0 egress).
  3. Kuota penyimpanan 10 GB gratis terkonfigurasi untuk arsip master cover & video teaser.
* **Status**: `[DONE]` (Bucket Cloudflare R2 aktif terhubung via AWS S3 SDK Client).

### [x] TKT-14: Generator Tautan Unduh Aman (SigV4 Presigned Link)
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. API endpoint `/api/storage/presign` mampu menerbitkan token download temporer bertanda tangan kriptografis Node.js SigV4.
  2. Tautan unduhan memiliki masa kedaluwarsa otomatis (24 jam) sehingga berkas beresolusi tinggi tidak bisa disebar sembarangan ke luar siswa berhak.
  3. Tombol unduh di portal klien langsung menarik file dari CDN tanpa melewati beban server utama.
* **Status**: `[DONE]` (Terhubung di `client-portal-view.tsx` & lolos tes unduhan).

### [x] TKT-15: Deployment & CI/CD Pipeline Vercel Edge
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Repositori GitHub `Kyra-ra/fourjectiv` terhubung langsung ke pipeline build otomatis Vercel.
  2. Setiap `git push origin main` otomatis memicu pembuatan rilis production baru dalam waktu < 2 menit.
  3. Sertifikat SSL/TLS HTTPS aktif otomatis dengan proteksi proteksi DDoS global.
* **Status**: `[DONE]` (Live di `https://fourjectiv.vercel.app`).

### [x] TKT-16: SEO Engine, Metadata & Social Sharing OpenGraph
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Saat link web atau portal angkatan dibagikan di WhatsApp, muncul thumbnail banner resmi Fourjective, judul sekolah, dan deskripsi profesional (bukan teks kosong).
  2. Terpasang file `robots.txt` dan `sitemap.xml` dinamis untuk pengindeksan Google Search.
  3. Schema markup JSON-LD organisasi kreatif terpasang di root layout.
* **Status**: `[DONE]` (Metadata OpenGraph terkonfigurasi di `layout.tsx`).

---

## 4. PILAR IV: FITUR TRACKING CLIENT & ADMIN PANEL (5 Tiket)

### [x] TKT-17: Client Single-Gate Tracking Portal (`/track/[kode]`)
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Siswa cukup memasukkan 1 kode angkatan unik (misal: `SMAN1-2026`) untuk melihat seluruh progres proyek sekolahnya.
  2. Jika kode salah / tidak terdaftar, sistem menampilkan banner penolakan yang ramah dan mengarahkan kembali ke `/portal`.
  3. Tampilan disesuaikan otomatis dengan nama sekolah, angkatan, dan jumlah siswa yang tertera di kontrak.
* **Status**: `[DONE]` (Route dinamis `/track/[kode]` aktif dengan validasi kode).

### [x] TKT-18: Mode Dual-Track (Guest Demo vs MOU Resmi)
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Pemisahan fungsi jelas:
     - Klien MOU: Memiliki akses penuh ke tabel unduh berkas master, kuitansi termin kas, dan alur 22 task produksi.
     - Calon Klien (Guest Demo `GUEST-2026`): Diberikan simulasi alur kerja, proteksi klaim pratinjau 1 token, dan kalkulator kas estimasi tanpa membuka berkas rahasia sekolah lain.
  2. Pembatasan akses aman tanpa celah inspeksi elemen browser.
* **Status**: `[DONE]` (Kondisional `isPostMOU` dan tab gating bekerja presisi).

### [x] TKT-19: Admin Master Control Panel (`/dashboard`)
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Dashboard dilindungi kata sandi master studio (`fourjective2026`) dengan session cookie terenkripsi.
  2. Seluruh modul diakses melalui 1 sidebar navigasi vertikal di kiri dengan sinkronisasi URL parameter query (`/dashboard?tab=...`).
  3. Tidak ada tab navigasi horizontal ganda di dalam halaman yang membingungkan admin studio.
* **Status**: `[DONE]` (`DashboardSidebar.tsx` mengendalikan seluruh state tab).

### [x] TKT-20: Switcher 6 Tahap Produksi & Verifikasi Termin Kas
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. Admin dapat mengubah tahapan berjalan sekolah mitra (Tahap 1 s/d 6) hanya dengan 1 kali klik di dashboard.
  2. Admin dapat menandai status pembayaran kuitansi (DP / Pelunasan) menjadi "Lunas", dan data di layar siswa seketika berubah.
  3. Riwayat sisa tagihan kas terhitung otomatis tanpa rumus manual Excel.
* **Status**: `[DONE]` (`MOUProjectManager.tsx` terhubung langsung ke API mutasi Supabase).

### [x] TKT-21: Gantt Production Timeline Scheduler (22 Milestone Excel)
* **Bobot**: Rp 200.000 / Rp 150.000
* **Target / Goals Tiap Tiket**:
  1. 22 daftar kegiatan riil dari file `TIMELINE 2026.xlsx` terpetakan lengkap ke dalam 6 fase produksi:
     - Pra-Produksi (Brief konsep, rundown kelas, moodboard).
     - Photoshoot & Video (Brief talent, sesi foto outdoor/studio, liputan drone).
     - Desain Cover (Eksplorasi material hardcover/leather, approval mock-up).
     - Editing & Grading (Retouching foto siswa, color grading aftermovie).
     - Layout & Dummy (Layout lembaran, cetak buku dummy uji coba).
     - Cetak & Packaging (Cetak massal, finishing binding, pengiriman ke sekolah).
  2. Sisi admin (`/dashboard?tab=timeline`) memiliki checklist interaktif untuk menandai task yang selesai.
  3. Sisi siswa (`/track/[kode]` tab Alur Produksi) menampilkan roadmap bulanan dan badge status transparan.
* **Status**: `[DONE]` (`timeline-data.ts`, `ProductionTimeline.tsx`, `AdminTimelineScheduler.tsx` selesai).

---

## 5. Ringkasan Status Akhir & Kesiapan Rilis

| Parameter Audit | Standar Kelayakan | Hasil Evaluasi Saat Ini | Kesimpulan |
|---|---|---|:---:|
| **Kelengkapan 21 Tiket** | 21 dari 21 Tiket Lolos Goals | 21 / 21 Tiket Terpenuhi (100%) | **MEMENUHI SYARAT** |
| **Kompilasi Kode** | Nol error build (`npm run build`) | TypeScript & Turbopack 100% Bersih | **MEMENUHI SYARAT** |
| **Keamanan Database** | RLS Aktif, Auth Hash Valid | Supabase Cloud Database Aman | **MEMENUHI SYARAT** |
| **Ketersediaan Hosting** | Uptime > 99.9%, SSL Aktif | Vercel Edge Production Aktif | **MEMENUHI SYARAT** |

### Langkah Berikutnya Menuju BAST (Serah Terima):
1. Pengujian bersama (UAT) menggunakan akun demo `SMAN1-2026` dan master password `/dashboard`.
2. Penandatanganan berita acara serah terima sistem.
3. Memulai hitungan 4 (empat) bulan masa garansi bug teknis dan pendampingan operasional tim studio.
