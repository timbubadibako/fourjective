# 📄 Product Requirement Document (PRD) & Software Requirement Specification (SRS)

**Nama Proyek**: Fourjective — Digital Yearbook & Portfolio Platform  
**Status**: Active / Handover Phase  
**Versi**: 1.0.0  

---

## 1. Product Requirement Document (PRD)

### 1.1 Visi Produk
Fourjective adalah platform web showcase dan manajemen portofolio digital interaktif yang dirancang khusus untuk agensi/production house Fourjective dalam menampilkan hasil karya **Buku Tahunan Sekolah (Digital Yearbook)**, foto, video, dan pernak-pernik (*merchandise*) ke sekolah-sekolah dan klien potensial.

### 1.2 Problem Statement
- **Katalog Fisik Terbatas**: Membawa sampel cetak buku tahunan fisik ke klien membutuhkan biaya besar dan jangkauan terbatas.
- **Pengalaman Membaca Kurang Interaktif**: Portofolio PDF statis biasa kurang menarik dan tidak memberikan sensasi membaca buku tahunan yang sesungguhnya.
- **Kerahasiaan Karya**: Beberapa sekolah meminta portofolio buku tahunan mereka dilindungi dengan kata sandi agar hanya siswa/pihak berwenang yang dapat mengaksesnya.

### 1.3 Target Pengguna
1. **Pengunjung Umum & Calon Klien**: Siswa, komite sekolah, atau organisasi yang ingin melihat portofolio hasil karya Fourjective.
2. **Klien Berkata Sandi**: Pihak sekolah tertentu yang mendapatkan password khusus untuk melihat portofolio digital sekolah mereka.
3. **Admin Fourjective**: Tim internal yang mengelola, menambah, memperbarui, dan menghapus portofolio buku tahunan.

### 1.4 Fitur Utama (*Core Features*)
1. **Public Showcase & Gallery**: Halaman landing page interaktif, tentang kami, daftar layanan, dan galeri portofolio.
2. **Virtual Flipbook Reader**: Fitur pembaca majalah/buku digital 3D dengan animasi pembalik halaman (*page-flip*) dari file PDF yang dikonversi otomatis menjadi seri gambar JPG.
3. **Proteksi Password Portofolio**: Opsi mengunci portofolio sekolah tertentu dengan password.
4. **Admin Dashboard (CRUD)**: Panel autentikasi admin untuk manajemen data portofolio, unggah cover gambar, unggah PDF, dan pengaturan password.

---

## 2. Software Requirement Specification (SRS)

### 2.1 Kebutuhan Fungsional (*Functional Requirements*)

#### FR-01: Autentikasi Admin
- System HARUS menyediakan halaman login khusus Admin (`/login`).
- System HARUS memverifikasi identitas Admin via JWT token dengan masa aktif token terkonfigurasi.

#### FR-02: Manajemen Portofolio (CRUD)
- Admin HARUS dapat menambahkan portofolio baru dengan mengunggah gambar Cover, file PDF, nama sekolah, tahun, dan optional password.
- System HARUS mengonversi setiap halaman PDF yang diunggah menjadi file gambar `page-*.jpg` secara otomatis di backend.
- Admin HARUS dapat memperbarui metadata, mengganti Cover/PDF, atau memperbarui status password portofolio.
- Admin HARUS dapat menghapus data portofolio beserta seluruh file gambar pendukungnya dari server storage.

#### FR-03: Public Showcase & Virtual Flipbook
- System HARUS menampilkan daftar portofolio publik di halaman galeri.
- System HARUS memuat gambar halaman buku ke dalam slider `page-flip` secara responsif di layar desktop maupun seluler.
- System HARUS meminta input password jika pengunjung mencoba membuka portofolio yang dilindungi kata sandi, kecuali jika diakses oleh Admin yang memiliki token terautentikasi.

### 2.2 Kebutuhan Non-Fungsional (*Non-Functional Requirements*)

#### NFR-01: Performa & Optimasi Render
- Waktu kompilasi halaman Next.js HARUS kurang dari 1.5 detik pada lingkungan development.
- Komponen gambar HARUS memanfaatkan pengoptimalan format Next.js (`AVIF`/`WebP`) dan caching static asset.

#### NFR-02: Keamanan (Security)
- Content Security Policy (CSP) HARUS diatur ketat tetapi mengizinkan domain API lokal/staging yang sah.
- Kata sandi admin dan password portofolio HARUS di-hash menggunakan `bcryptjs` sebelum disimpan ke database.

#### NFR-03: Kompatibilitas Sistem Backend
- Backend HARUS mendukung pustaka sistem `poppler-utils` (`pdftoppm`) di lingkungan Linux/macOS.
- Backend HARUS mendukung pengoperasian database fleksibel (SQLite untuk development lokal dan MySQL untuk staging/production).

---

## 3. User Stories & Product Backlog

| ID | User Story | Prioritas | Status |
| :--- | :--- | :---: | :---: |
| **US-01** | Sebagai Admin, saya ingin login ke sistem agar dapat mengelola portofolio sekolah. | High | Done |
| **US-02** | Sebagai Admin, saya ingin mengunggah file PDF buku tahunan agar otomatis terkonversi menjadi halaman gambar. | High | Done |
| **US-03** | Sebagai Pengunjung, saya ingin melihat galeri portofolio dengan efek majalah (*flipbook*) agar pengalaman membaca lebih menarik. | High | Done |
| **US-04** | Sebagai Sekolah Klien, saya ingin portofolio kami dilindungi password agar tidak sembarang orang bisa melihatnya. | Medium | Done |
| **US-05** | Sebagai Pengembang, saya ingin menggunakan database SQLite untuk pengujian lokal tanpa memerlukan server MySQL terpisah. | High | Done |
