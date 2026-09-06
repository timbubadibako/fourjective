# 📝 Development & Session Handover Log (DEVELOPMENT_LOG)

**Status Projek**: Aktif / Handover & Stabilisasi  
**Tanggal Update Terakhir**: 6 September 2026  

---

## 🗺️ 1. TODO & Roadmap Keseluruhan Projek

- [x] **Phase 1: Handover, Audit & Modernisasi Dependensi**
  - [x] Audit dependensi backend & frontend.
  - [x] Modernisasi ke Next.js 16, React 19, Tailwind CSS 4, Express.js.
  - [x] Migrasi database lokal ke SQLite (`database.sqlite`) untuk kemudahan testing tanpa MySQL.
  - [x] Buat script seed admin awal (`npm run seed:be`).
- [x] **Phase 2: Fix Integrasi & Type Declarations**
  - [x] Perbaiki Content Security Policy (CSP) pada `next.config.ts`.
  - [x] Perbaiki fallback `NEXT_PUBLIC_BACKEND_URL` di komponen frontend (`api.ts`, `LoginForm.tsx`, `useGetAllPortfolios.tsx`, `useGetPortfolioById.tsx`, `create-portfolio/page.tsx`).
  - [x] Buat `src/types/declarations.d.ts` (0 error pada `npx tsc --noEmit`).
  - [x] Konfigurasi mode bypass login sementara untuk pengujian lokal yang efisien.
- [x] **Phase 3: Struktur Repositori & Dokumentasi Standar SDLC**
  - [x] Buat root `package.json`, `.gitignore`, dan `README.md`.
  - [x] Buat dokumentasi komprehensif 5-Kategori SDLC di folder `docs/`:
    - [x] `PRD_AND_SRS.md`
    - [x] `ARCHITECTURE_AND_ERD.md`
    - [x] `API_SPECIFICATION.md`
    - [x] `manual-qa-checklist.md`
    - [x] `DEPLOYMENT_RUNBOOK.md`
    - [x] `workflow-rules.md`
    - [x] `DEVELOPMENT_LOG.md`
- [ ] **Phase 4: Manual QA & Verifikasi Runtime E2E (Next Task)**
  - [ ] Pengujian manual login admin.
  - [ ] Pengujian unggah cover & PDF portofolio baru.
  - [ ] Verifikasi hasil konversi `pdftoppm` di folder `uploads/`.
  - [ ] Pengujian tampilan *flipbook* 3D (`page-flip`) di halaman publik portofolio.
  - [ ] Pengujian fitur hapus dan update portofolio.
- [ ] **Phase 5: Refactoring & Hardening Production**
  - [ ] Konsolidasi tipe data `Portfolio` ke `src/types/portfolio.ts`.
  - [ ] Mengembalikan proteksi autentikasi sebelum deploy (matikan bypass mode).
  - [ ] Pengujian koneksi ke database MySQL produksi.

---

## 📌 2. Ceklis Task yang Telah Selesai (Sesi Ini)

- [x] Pembaruan dependensi proyek (Next.js 16, React 19, Tailwind CSS 4, Express.js).
- [x] Pembersihan paket tak terpakai (`mongoose`, `bcrypt` C++ native addon).
- [x] Pemasangan driver `sqlite3` & pengubah koneksi `db.js` agar mendukung SQLite lokal.
- [x] Pembuatan script `seedAdmin.js` (`npm run seed:be`) untuk akun admin `admin@fourjective.com`.
- [x] Perbaikan error kompilasi TypeScript (`declarations.d.ts`) & error `MODULE_NOT_FOUND` (`tailwindcss-animate`).
- [x] Perbaikan CSP header di `next.config.ts` untuk mengizinkan request ke `http://localhost:5000`.
- [x] Penambahan fallback API URL di seluruh service frontend.
- [x] Pengaturan mode bypass autentikasi untuk pengujian cepat.
- [x] Inisialisasi Git monorepo dan pembaruan aturan global Antigravity (Strict Git Push Policy & CodeGraph First).
- [x] Pembuatan dokumentasi 5-Kategori SDLC secara lengkap & mendalam di folder `docs/`.

---

## 📋 3. Sisa Pekerjaan Next Session (`[ ]`)

Saat melanjutkan sesi pekerjaan berikutnya, fokus utama adalah:

1. **[ ] Verifikasi End-to-End (E2E) Fitur Upload PDF & Virtual Flipbook**:
   Jalankan server backend (`npm run dev:be`) dan frontend (`npm run dev:fe`), lalu uji alur pembuatan portofolio dari Dashboard Admin sampai tampilan majalah di halaman publik portofolio.
2. **[ ] Refactoring Tipe Data Portfolio**:
   Menggabungkan definisi tipe `Portfolio` di `src/services/api.ts` dan `src/hooks/useGetAllPortfolios.tsx` ke file terpusat `src/types/portfolio.ts`.
3. **[ ] Matikan Mode Bypass Autentikasi**:
   Sebelum persetujuan rilis ke staging/production, kembalikan fungsi `bcryptjs.compare` pada `authController.js` dan verifikasi JWT token pada `AuthMiddleware.js`.
