# Architecture & ERD — Fourjective

Dokumentasi arsitektur sistem, skema database, dan alur pemrosesan data Fourjective.

## 🏗️ System Architecture

```text
+-----------------------------------+        HTTP REST API        +-----------------------------------+
|      Frontend (Next.js 16)        |  ------------------------>  |       Backend (Express.js)        |
|  - App Router & React 19          |    JSON & Multipart Form    |  - Sequelize ORM                  |
|  - Virtual Flipbook (page-flip)   |                             |  - SQLite (Dev) / MySQL (Prod)    |
|  - Tailwind CSS 4 & MUI           |  <------------------------  |  - Poppler Utils (pdftoppm)       |
+-----------------------------------+      Image Paths & JWT      +-----------------------------------+
```

---

## 🗄️ Database Schema (Sequelize Models)

### 1. `Admin` Model
- `id` (INTEGER, Primary Key, Auto Increment)
- `email` (STRING, Unique, IsEmail)
- `password` (STRING, Hashed via bcryptjs)
- `created_at` (DATE)
- `updated_at` (DATE)

### 2. `Portfolio` Model
- `id` (INTEGER, Primary Key, Auto Increment)
- `namaSekolah` (STRING, Required)
- `tahun` (INTEGER, Required)
- `cover` (STRING, Path ke file gambar cover)
- `images` (JSON, Array string path file `page-*.jpg` hasil konversi PDF)
- `namaAkun` (STRING, Email admin pembuat)
- `tanggalCreate` (DATE, Default NOW)
- `password` (STRING, Optional hashed password proteksi)

---

## 🔄 Alur Konversi PDF ke Gambar (PDF-to-JPG Workflow)

1. Admin mengunggah file **Cover** dan file **PDF** portofolio melalui form `/dashboard/create-portfolio`.
2. Controller `portfolioController.js` membuat folder tujuan `uploads/<namaSekolah>_<tahun>_<timestamp>/`.
3. Backend memanggil perintahkan CLI OS `pdftoppm -jpeg <pdfPath> page-<timestamp>` melalui `child_process.exec`.
4. `pdftoppm` mengekstrak setiap halaman PDF menjadi `page-<timestamp>-1.jpg`, `page-<timestamp>-2.jpg`, dst.
5. Master file PDF dihapus, dan daftar relative path file JPG disimpan ke kolom `images` (JSON) di database.
