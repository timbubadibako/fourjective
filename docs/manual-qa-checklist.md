# Manual QA Checklist — Fourjective

Checklist pengujian manual untuk verifikasi fitur aplikasi Fourjective.

## 1. Landing Page & Galeri Publik (`fourjective-fe-main`)
- [ ] Akses halaman utama `/` dan pastikan komponen Hero, Our Services, Portfolio, dan Testimoni tampil tanpa error.
- [ ] Akses `/about` dan pastikan tampilan tim, riwayat, dan lokasi ter-render normal.
- [ ] Akses `/services` dan pastikan jenis layanan (Video, Photo, Yearbook, Merch) ter-render rapi.
- [ ] Akses `/gallery` & `/portofolio` dan pastikan daftar buku tahunan ter-fetch dari backend.

## 2. Flipbook Viewer (Virtual Yearbook)
- [ ] Buka salah satu portofolio sekolah.
- [ ] Pastikan slider/flipbook `page-flip` merender daftar gambar halaman `page-*.jpg` dengan mulus.
- [ ] Uji responsivitas flipbook di layar desktop dan mobile.

## 3. Proteksi Password Portofolio
- [ ] Buka portofolio yang memiliki proteksi password.
- [ ] Pastikan modal password muncul dan menolak password yang salah.
- [ ] Masukkan password yang benar dan pastikan halaman buku terbuka.
- [ ] Login sebagai Admin dan pastikan Admin dapat membuka portofolio terproteksi tanpa perlu menginput password sekolah.

## 4. Admin Dashboard (`/dashboard`)
- [ ] Buka `/login` dan lakukan login admin.
- [ ] Buka `/dashboard` dan pastikan tabel daftar portofolio ter-render.
- [ ] Tambah portofolio baru di `/dashboard/create-portfolio` dengan mengisi:
  - Nama Sekolah
  - Tahun
  - File Cover (Gambar)
  - File PDF Buku Tahunan
  - Optional Password
- [ ] Verifikasi konversi PDF di backend (`uploads/<nama_sekolah>_<tahun>_<timestamp>/page-*.jpg`).
- [ ] Edit data portofolio di `/dashboard/[id]` dan ubah nama/cover/PDF/password.
- [ ] Hapus portofolio dan pastikan folder fisik di backend `uploads/` ikut terhapus bersih.

## 5. Security & System Compatibility
- [ ] Pastikan `pdftoppm` (Poppler Utilities) ter-install di OS dan tidak melempar error `child_process`.
- [ ] Pastikan CSP header di `next.config.ts` tidak memblokir koneksi API lokal `http://localhost:5000`.
