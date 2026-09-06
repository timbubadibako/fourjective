# 🏗️ Architecture, ERD & Technical Specifications — Fourjective

**Nama Proyek**: Fourjective — Premium Digital Yearbook Platform & Agency Backpanel  
**Versi**: 2.0.0  

---

## 1. High-Level Architecture (HLD)

```text
[Public Visitors / Calon Klien]           [Sekolah Klien (Client Portal)]            [Tim Admin (Agency Backpanel)]
               │                                         │                                         │
               ▼                                         ▼                                         ▼
+----------------------------------------------------------------------------------------------------------+
|                                    Frontend Layer (Next.js 16 App Router)                                |
|  - Public Showcase & Services Gallery                 - Virtual Flipbook Reader (page-flip 3D)           |
|  - Quotation / Price Estimator                        - Client Portal (Status Tracker & Proofing)        |
|  - Admin Backpanel Dashboard                          - Responsive Tailwind CSS 4 & MUI                  |
+----------------------------------------------------------------------------------------------------------+
                                                     │
                                            HTTP REST API (JSON)
                                                     │
                                                     ▼
+----------------------------------------------------------------------------------------------------------+
|                                   Backend Layer (Express.js Server)                                      |
|  - Auth Middleware (JWT & Bypass Mode)                 - Multer Multipart Upload Handler                 |
|  - Portfolio Controller                                - PDF-to-JPG CLI Converter (pdftoppm)             |
|  - Production Tracker Controller                       - Sequelize ORM Layer                             |
+----------------------------------------------------------------------------------------------------------+
                                                     │
                                           Database Driver Layer
                                                     │
                                                     ▼
+----------------------------------------------------------------------------------------------------------+
|                                             Database Layer                                               |
|  - SQLite3 (`database.sqlite` - Local Development)                                                       |
|  - MySQL 8.0 (Production Database)                                                                       |
+----------------------------------------------------------------------------------------------------------+
```

---

## 2. Entity Relationship Diagram (ERD) & Schema Specification

### 2.1 Existing Models

#### 1. `Admin` Entity
- `id` (INTEGER, Primary Key, Auto Increment)
- `email` (STRING, Unique, IsEmail)
- `password` (STRING, Hashed via bcryptjs)
- `created_at` (DATE)
- `updated_at` (DATE)

#### 2. `Portfolio` Entity
- `id` (INTEGER, Primary Key, Auto Increment)
- `namaSekolah` (STRING, Required)
- `tahun` (INTEGER, Required)
- `cover` (STRING, Relative path file gambar cover)
- `images` (JSON, Array relative path file `page-*.jpg` hasil pemecahan PDF)
- `namaAkun` (STRING, Email admin pembuat)
- `tanggalCreate` (DATE, Default NOW)
- `password` (STRING, Optional hashed password proteksi portofolio)

---

### 2.2 Proposed Models (Upcoming Proposal for Client Meeting)

#### 3. `ProductionOrder` Entity (Planned for Client Portal & Production Tracker)
- `id` (INTEGER, Primary Key, Auto Increment)
- `namaSekolah` (STRING, Required)
- `tahun` (INTEGER, Required)
- `status` (ENUM: `'DRAFT'`, `'PHOTOSHOOT'`, `'EDITING'`, `'PROOFING'`, `'PRINTING'`, `'DELIVERY'`, `'COMPLETED'`)
- `progressPercent` (INTEGER, 0 - 100)
- `accessCode` (STRING, Password/Kunci akses sekolah)
- `estimatedCompletion` (DATE)

---

## 3. PDF-to-JPG Conversion Pipeline Workflow

```text
[Admin Upload PDF & Cover] ──> [Multer saves files to temp/] ──> [Create folder: uploads/<Sekolah>_<Tahun>_<Timestamp>/]
                                                                                              │
[Database Record Created] <── [Extract page-*.jpg Array] <── [pdftoppm -jpeg <PDF> page-*] <──┘
```

1. Request multipart form-data diterima oleh endpoint `/api/portfolios`.
2. Folder terpisah `uploads/<sanitizedNamaSekolah>_<tahun>_<timestamp>/` dibuat secara otomatis.
3. Perintah CLI `pdftoppm -jpeg` mengekstrak setiap halaman dokumen PDF menjadi file gambar terpisah `page-<timestamp>-1.jpg`, `page-<timestamp>-2.jpg`, dst.
4. Master PDF dihapus untuk menghemat ruang penyimpanan, dan array path gambar dikembalikan ke frontend untuk merender majalah 3D `page-flip`.
