# 📄 Product Requirement Document (PRD) & Software Requirement Specification (SRS)

**Nama Proyek**: Fourjective — Premium Digital Yearbook Platform & Agency Backpanel  
**Status**: Handover & Upgrade Planning Phase  
**Versi**: 2.0.0 (Upgraded Roadmap)  

---

## 1. Product Requirement Document (PRD)

### 1.1 Visi & Filosofi Brand (Brand Foundation)
**Fourjective** adalah agensi kreatif buku tahunan premium (*Premium Creative Yearbook Agency*) yang berfokus pada **Digital & Interactive Yearbook**. Fourjective tidak hanya memproduksi buku fisik premium, tetapi juga menghadirkan pengalaman digital modern melingkupi:
- **Virtual Flipbook 3D**: Membaca majalah/buku digital dengan animasi fisik pembalik halaman.
- **Aftermovie & Video Showcase**: Integrasi video kenangan sekolah.
- **Merchandise & Photography**: Pameran katalog produk pendukung dan hasil karya fotografi.

### 1.2 Problem Statement & Strategi Re-Architecture
- **Keterbatasan Legacy System**: Sistem awal yang dibangun pengembang sebelumnya hanya berupa CRUD portofolio sederhana yang nilai kegunaannya (*business value*) bagi agensi maupun klien belum maksimal.
- **Kebutuhan Transparansi Produksi**: Sekolah yang memesan buku tahunan sering mengalami kebingungan mengenai status alur produksi (Photoshoot -> Layouting -> Proofing -> Printing -> Delivery).
- **Kebutuhan Penawaran Cepat**: Calon komite sekolah membutuhkan estimasi harga paket buku tahunan secara cepat sebelum melakukan konsultasi.

### 1.3 Target Persona & User Journey

#### 1. Pengunjung Publik & Calon Klien Komite Sekolah
- **Journey**: Mengakses landing page `/` -> Mengakses katalog layanan `/services` -> Eksplorasi galeri portofolio `/portofolio` -> Menggunakan *Price Estimator / Quotation Calculator* untuk menghitung perkiraan biaya paket -> Menghubungi tim Fourjective via WhatsApp.

#### 2. Komite Sekolah Klien (Client Portal)
- **Journey**: Login/Akses terproteksi dengan password sekolah -> Membaca *Draft Proofing* buku tahunan sekolah di Virtual Flipbook -> Memantau timeline & status produksi (*Photoshoot*, *Editing*, *Cetak*, *Pengiriman*) -> Menyebarkan link flipbook digital resmi ke alumni sekolah.

#### 3. Tim Admin Fourjective (Agency Backpanel)
- **Journey**: Login Admin -> Mengelola portofolio publik/terkunci -> Mengelola *pipeline* produksi buku sekolah -> Mengatur penawaran harga & paket -> Mengonversi dokumen PDF cetak menjadi flipbook digital otomatis.

---

## 2. Software Requirement Specification (SRS)

### 2.1 Kebutuhan Fungsional (*Functional Requirements*)

#### FR-01: Public Showcase & Interactive Flipbook
- System HARUS merender daftar portofolio publik di halaman galeri.
- System HARUS mengonversi file PDF buku tahunan menjadi seri gambar JPG (`page-*.jpg`) dan merendernya dalam animasi pembalik majalah `page-flip` 3D.
- System HARUS mendukung penyajian aset video (*Aftermovie*) dan galeri foto resolusi tinggi.

#### FR-02: Client Portal & Password Protection
- System HARUS mendukung penguncian portofolio sekolah tertentu menggunakan password khusus.
- System HARUS menyediakan halaman *Client Portal* bagi perwakilan sekolah untuk memantau status alur produksi buku tahunan mereka.

#### FR-03: Agency Backpanel & Production Management
- Admin HARUS dapat melakukan manajemen CRUD (Create, Read, Update, Delete) data portofolio.
- Admin HARUS dapat mengunggah file gambar Cover dan file PDF dokumen cetak.
- Admin HARUS dapat memperbarui status tahapan produksi untuk setiap sekolah klien (misal: *Photoshoot Done*, *Editing 50%*, *In Printing*, *Shipped*).
- Admin HARUS dapat mengonfigurasi kalkulator penawaran harga paket (Quotation Estimator).

---

## 3. Product Backlog & Upgraded Roadmap

| ID | User Story | Modul | Status |
| :--- | :--- | :---: | :---: |
| **US-01** | Sebagai Admin, saya ingin login ke Backpanel agar dapat mengelola portofolio & data produksi. | Auth | Done (Bypass Mode Active) |
| **US-02** | Sebagai Admin, saya ingin mengunggah file PDF agar otomatis terkonversi menjadi majalah gambar `page-*.jpg`. | Portfolio | Done |
| **US-03** | Sebagai Pengunjung, saya ingin membaca portofolio dengan animasi pembalik majalah 3D. | Public Showcase | Done |
| **US-04** | Sebagai Sekolah Klien, saya ingin portofolio kami dikunci dengan password khusus sekolah. | Security | Done |
| **US-05** | Sebagai Calon Klien, saya ingin kalkulator estimasi paket harga buku tahunan agar dapat memperkirakan anggaran sekolah. | Quotation | Planned (Client Proposal) |
| **US-06** | Sebagai Sekolah Klien, saya ingin portal pemantauan status produksi (Photoshoot -> Design -> Cetak -> Pengiriman). | Client Portal | Planned (Client Proposal) |
