# ✅ Project Checklist & Roadmap

Daftar periksa tugas (*checklist*) dan peta jalan pengembangan proyek **Fourjective**.

---

## 🟢 Tahap 1: Handover & Stabilisasi Lingkungan (SELESAI)

- [x] Audit dependensi frontend & backend.
- [x] Konfigurasi SQLite (`database.sqlite`) untuk database lokal.
- [x] Buat script seed admin awal (`npm run seed:be`).
- [x] Perbaiki error TypeScript (SVG/Image module declaration).
- [x] Perbaiki Content Security Policy (CSP) blocking pada `next.config.ts`.
- [x] Tambahkan fallback URL `http://localhost:5000` di seluruh service & hook frontend.
- [x] Aktifkan mode bypass autentikasi untuk pengujian lokal yang cepat.
- [x] Inisialisasi Git monorepo & push awal ke GitHub (`timbubadibako/fourjective`).
- [x] Buat dokumentasi `README.md` dan `DEV_LOG.md`.

---

## 🟡 Tahap 2: Pengujian Fitur Utama & Refactoring (SEDANG BERJALAN)

- [ ] **E2E Testing Manual**:
  - [ ] Uji login admin (`/login`).
  - [ ] Uji buat portofolio baru (upload cover gambar & file PDF).
  - [ ] Verifikasi hasil konversi `pdftoppm` di folder `uploads/`.
  - [ ] Uji pembacaan buku virtual (*flipbook*) di `/portofolio`.
  - [ ] Uji fitur hapus & update portofolio di Dashboard.
- [ ] **Refactoring Kode**:
  - [ ] Konsolidasikan tipe data `Portfolio` di frontend ke satu file terpusat (`src/types/portfolio.ts`).
  - [ ] Rapikan warning `npm` & linting.

---

## 🔵 Tahap 3: Persiapan Deploy & Staging Server (MENDATANG)

- [ ] Kembalikan pengamanan autentikasi (matikan bypass mode sebelum deploy ke staging/production).
- [ ] Konfigurasi database MySQL production di `.env`.
- [ ] Install utilitas `poppler-utils` di VPS / Server Production.
- [ ] Setup SSL certificate & domain API `https://api.fourjectiv.com`.
- [ ] Buat script CI/CD deployment otomatis (GitHub Actions).
