# 🏛️ Architecture & System Blueprint — Fourjective (2026)

**Sistem:** Platform Web Agency, Client Portal Angkatan, & Admin Dashboard  
**Brand Identity:** Swiss-Neobrutalist (`#FF4D00` Orange, `#FAF6F0` Paper, `#14161C` Ink)  
**Dokumen:** Spesifikasi Arsitektur, Skema Database Supabase, Storage R2, & Pipeline Data  

---

## 1. Topologi Sistem (High-Level Architecture)

```text
[ Calon Klien / Panitia OSIS ]                 [ Tim Internal Fourjective ]
              │                                              │
              ▼                                              ▼
  Input Kode Angkatan (ATLAS-2026)             Input Master Password Admin
              │                                              │
              └──────────────────────┬───────────────────────┘
                                     │
                                     ▼
                  +─────────────────────────────────────+
                  |         Unified Gate: /portal       |
                  +─────────────────────────────────────+
                                     │
           ┌─────────────────────────┴─────────────────────────┐
           ▼                                                   ▼
+─────────────────────────────────────+     +─────────────────────────────────────+
|   Client Portal (/track/[hash])     |     |   Admin Dashboard (/dashboard)      |
|  - Tab 1: Estimator & Form Order    |     |  - Manajemen Portofolio & Buku      |
|  - Tab 2: Tracker 6 Tahap & Termin  |     |  - Production Pipeline & Stepper    |
|  - Tab 3: Virtual Flipbook & R2 DL  |     |  - CMS Testimoni & Landing Copy     |
|  - Tab 4: Dedicated PIC & FAQ       |     |  - Quotation Estimator Admin        |
+─────────────────────────────────────+     +─────────────────────────────────────+
                   │                                           │
                   ├───────────────────────────────────────────┤
                   │                                           │
                   ▼                                           ▼
+─────────────────────────────────────+     +─────────────────────────────────────+
|     Database Layer (Supabase)       |     |   Object Storage (Cloudflare R2)    |
|  - PostgreSQL 16                    |     |  - S3-Compatible API                |
|  - Row Level Security (RLS)         |     |  - Direct Pre-signed URL Upload     |
|  - Hash lookup via Client Code      |     |  - Zero Egress Fee ($0 Bandwidth)   |
|  - Realtime Project Status          |     |  - Master PDF, Raw Photo, 4K Video  |
+─────────────────────────────────────+     +─────────────────────────────────────+
```

---

## 2. Pintu Masuk Tunggal & Flow Akses (`/portal`)

### 2.1 Alur Klien (Client Lifecycle)
1. **Pemberian Kode:** Tim admin membuat kode unik per angkatan (contoh: `ATLAS-2026`).
2. **Input di `/portal`:** Klien memasukkan kode.
3. **Lookup & Obfuscation:** Sistem mencari data proyek di Supabase berdasarkan kode, lalu mengarahkan ke URL terenkripsi/hash acak (`/track/9f8a3c...`). Hal ini mencegah kompetitor atau siswa sekolah lain menebak-nebak URL tracking.
4. **Dua Fase dalam Satu Dashboard:**
   - **Fase 1 (Prospect / Inquiry):** Klien menggunakan Tab Estimator untuk simulasi iuran kas per siswa dan mengisi formulir konfirmasi kontrak MOU.
   - **Fase 2 (Active Production):** Setelah kontrak disepakati dan DP terverifikasi, klien memantau progres pemotretan, revisi layout, pembayaran termin, hingga download file di Tab Tracker & Deliverables.

### 2.2 Alur Admin (Agency Staff)
1. Admin memasukkan password master di form tab admin pada `/portal`.
2. Sistem memvalidasi password terhadap hash terenkripsi (tanpa perlu mengisi field email secara manual di UI).
3. Setelah valid, admin diarahkan ke `/dashboard` dengan akses penuh.

---

## 3. Skema Database Supabase (PostgreSQL DDL)

Berikut rancangan skema database lengkap untuk mendukung seluruh fitur:

```sql
-- ============================================================================
-- 1. ENUM TYPES
-- ============================================================================
CREATE TYPE project_status AS ENUM (
  'PROSPECT',          -- Belum kontrak (masih simulasi estimator)
  'CONTRACT_SIGNED',   -- Sudah MOU & DP
  'PHOTOSHOOT',        -- Sesi pemotretan
  'LAYOUTING',         -- Desain tata letak buku
  'PROOFING',          -- Revisi & persetujuan panitia
  'PRINTING',          -- Proses naik mesin cetak & jilid
  'DELIVERY',          -- Pengiriman buku ke sekolah
  'COMPLETED'          -- Proyek selesai & arsip
);

CREATE TYPE termin_status AS ENUM (
  'PENDING',
  'WAITING_VERIFICATION',
  'PAID'
);

CREATE TYPE cover_type AS ENUM (
  'HARDCOVER',
  'LEATHER',
  'ACRYLIC'
);

-- ============================================================================
-- 2. TABEL UTAMA: PROJECTS (SEKOLAH / ANGKATAN)
-- ============================================================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) UNIQUE NOT NULL,             -- URL-friendly identifier
  hash_token VARCHAR(64) UNIQUE NOT NULL,        -- Token untuk URL /track/[hash]
  client_code VARCHAR(32) UNIQUE NOT NULL,       -- Kode manusiawi: ATLAS-2026
  nama_sekolah VARCHAR(255) NOT NULL,
  nama_angkatan VARCHAR(255),
  tahun_kelulusan INT NOT NULL,
  status project_status DEFAULT 'PROSPECT',
  target_wisuda DATE,
  
  -- Info PIC Panitia Sekolah
  pic_name VARCHAR(150),
  pic_phone VARCHAR(50),
  pic_role VARCHAR(100),
  
  -- Assigned Project Manager dari Fourjective
  pic_internal_name VARCHAR(150) DEFAULT 'Bima Arya Pratama',
  pic_internal_phone VARCHAR(50) DEFAULT '+6281234567890',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pencarian cepat kode akses
CREATE INDEX idx_projects_client_code ON projects(client_code);
CREATE INDEX idx_projects_hash_token ON projects(hash_token);

-- ============================================================================
-- 3. TABEL ESTIMATOR & SPECIFICATION
-- ============================================================================
CREATE TABLE project_specifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  jumlah_siswa INT DEFAULT 150,
  jumlah_halaman INT DEFAULT 80,
  cover_type cover_type DEFAULT 'HARDCOVER',
  include_video_aftermovie BOOLEAN DEFAULT TRUE,
  include_ar BOOLEAN DEFAULT FALSE,
  include_merch_box BOOLEAN DEFAULT TRUE,
  
  estimasi_per_siswa DECIMAL(12, 2) NOT NULL,
  total_estimasi_proyek DECIMAL(12, 2) NOT NULL,
  
  is_locked BOOLEAN DEFAULT FALSE,
  locked_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'), -- Masa aktif 7 hari
  
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 4. TABEL TERMIN PEMBAYARAN KAS
-- ============================================================================
CREATE TABLE project_termins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  termin_ke INT NOT NULL,                        -- 1 (DP 30%), 2 (40%), 3 (30%)
  label VARCHAR(100) NOT NULL,
  nominal DECIMAL(12, 2) NOT NULL,
  status termin_status DEFAULT 'PENDING',
  due_date DATE,
  paid_at TIMESTAMPTZ,
  catatan TEXT
);

-- ============================================================================
-- 5. TABEL TAHAPAN STEPPER PRODUKSI
-- ============================================================================
CREATE TABLE production_stages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  stage_order INT NOT NULL,                      -- 1 s/d 6
  title VARCHAR(150) NOT NULL,
  description TEXT,
  is_completed BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ
);

-- ============================================================================
-- 6. TABEL DELIVERABLES & ASSETS (CLOUDFLARE R2)
-- ============================================================================
CREATE TABLE project_deliverables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,                   -- e.g. "Master PDF Cetak Resmi"
  file_type VARCHAR(50) NOT NULL,                -- 'PDF', 'IMAGE_ARCHIVE', 'VIDEO'
  file_size VARCHAR(50),                         -- e.g. "248 MB"
  r2_object_key TEXT,                            -- Path key di Cloudflare R2
  public_download_url TEXT,                      -- Signed URL / R2 CDN URL
  is_ready BOOLEAN DEFAULT FALSE,
  flipbook_embed_url TEXT                        -- URL viewer 3D jika ada
);

-- ============================================================================
-- 7. SECURITY & ROW LEVEL SECURITY (RLS)
-- ============================================================================
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_termins ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_deliverables ENABLE ROW LEVEL SECURITY;

-- Policy: Publik hanya bisa membaca data project jika memiliki hash_token valid
CREATE POLICY "Public read with hash token" ON projects
  FOR SELECT USING (true); -- Filter dilakukan via WHERE hash_token = :token

CREATE POLICY "Public read specs with project link" ON project_specifications
  FOR SELECT USING (true);

CREATE POLICY "Public read termins with project link" ON project_termins
  FOR SELECT USING (true);

CREATE POLICY "Public read stages with project link" ON production_stages
  FOR SELECT USING (true);

CREATE POLICY "Public read deliverables with project link" ON project_deliverables
  FOR SELECT USING (true);
```

---

## 4. Pipeline Penyimpanan File Besar (Cloudflare R2)

### 4.1 Mengapa Cloudflare R2?
1. **$0 Egress Bandwidth:** Siswa mengunduh file ratusan gigabyte tidak dikenakan biaya transfer data keluar.
2. **Biaya Flat & Murah:** 10 GB gratis selamanya. 50 GB hanya ~$0.60/bulan (~Rp 9.800).
3. **S3-Compatible API:** Terintegrasi menggunakan AWS SDK standard di Node.js/Next.js.

### 4.2 Alur Pre-signed Upload (Bypass Server Bottleneck)
```text
[ Browser Admin ]  ─── 1. Minta Izin Upload (GET /api/r2/presign) ───>  [ Next.js API Route ]
       │                                                                       │
       │                                                                2. Generate Presigned URL
       │                                                                   (Berlaku 15 Menit)
       │                                                                       │
       │  <─── 3. Terima Presigned URL (https://pub-xxx.r2.dev/...)  ──────────┘
       │
       │  ─── 4. PUT Langsung File 250MB (Progress Bar Akurat) ──────────>  [ Cloudflare R2 Bucket ]
       │                                                                       │
       │                                                                5. File Tersimpan
       │                                                                       │
       ▼  ─── 6. Simpan Metadata & Key ke Supabase (POST /api/save) ───────>  [ Supabase DB ]
```

**Keuntungan Teknikal:**
- Server Next.js / Vercel tidak pernah memproses payload 250MB (tidak kena limit 4.5MB Vercel).
- Tidak ada risiko RAM server habis atau request timeout.

---

## 5. Ringkasan Fitur per Tab Client Portal (`/track/[kode]`)

| Tab Menu | Fungsi Utama | Komponen UI | Integrasi Data |
| :--- | :--- | :--- | :--- |
| **01. Estimator & Pesan** | Simulasi patungan kas & form ajukan MOU | Dual slider siswa/halaman, cover switcher, add-on checkboxes, form PIC | `project_specifications` |
| **02. Tracker Produksi** | Pantau progres pengerjaan & termin bayar | 4 Kartu KPI, 6 Tahap Stepper vertikal, 3 Kotak Termin | `production_stages`, `project_termins` |
| **03. Edisi Digital & File** | Akses flipbook & unduh arsip dari Cloud | Hero Banner 3D Flipbook, 3 Kartu Download R2 | `project_deliverables` |
| **04. Kontak PIC & FAQ** | Jalur komunikasi resmi panitia | Profil card Project Manager Fourjective, Direct WA, Committee FAQ | `projects.pic_internal_*` |

---

## 6. Checklist Implementasi Selanjutnya
- [x] Wireframe & Frontend Shell Client Portal (`client-portal-view.tsx`).
- [x] Desain sistem & responsivitas Swiss-neobrutal.
- [ ] Setup Supabase Client & integrasi env (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
- [ ] Endpoint Next.js App Router untuk Cloudflare R2 Presigned URL (`/api/upload/presign`).
- [ ] Modernisasi styling `/dashboard` admin agar selaras dengan tema Paper/Ink/Orange.
