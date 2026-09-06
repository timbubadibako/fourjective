# Fourjective — Digital Yearbook & Portfolio Platform

Platform web pameran portofolio digital dan buku tahunan sekolah interaktif (virtual flipbook) berbasis **Next.js 16** dan **Node.js Express**.

---

## 🏗️ Struktur Proyek

```text
Fourjective/
├── fourjective-fe-main/    # Frontend Application (Next.js 16, React 19, Tailwind CSS 4)
├── fourjective-be-main/    # Backend REST API (Express.js, Sequelize, SQLite / MySQL)
├── docs/                   # Dokumen spesifikasi & rencana modernisasi
├── package.json            # Monorepo development scripts
└── README.md
```

---

## ⚡ Panduan Memulai (Getting Started)

### 1. Prasyarat Sistem
* **Node.js**: `v20.x` atau `v24.x`
* **Poppler Utilities** (Diperlukan Backend untuk konversi PDF ke gambar):
  * **Ubuntu/Debian**: `sudo apt install -y poppler-utils`
  * **macOS**: `brew install poppler`

---

### 2. Setup Backend (`fourjective-be-main`)

```bash
cd fourjective-be-main

# 1. Install dependensi
npm install

# 2. Buat file environment .env (Menggunakan SQLite untuk testing)
cat << 'EOF' > .env
PORT=5000
DB_DIALECT=sqlite
DB_STORAGE=./database.sqlite
JWT_SECRET=super_secret_jwt_key_fourjective_2026
EOF

# 3. Seed akun admin awal (Email: admin@fourjective.com | Password: admin123)
npm run seed

# 4. Jalankan server backend
npm run dev
```

---

### 3. Setup Frontend (`fourjective-fe-main`)

```bash
cd fourjective-fe-main

# 1. Install dependensi
npm install

# 2. Buat file environment .env.local
cat << 'EOF' > .env.local
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
EOF

# 3. Jalankan server Next.js dev
npm run dev
```

Akses aplikasi melalui **`http://localhost:3000`**.

---

## 🛠️ Monorepo Utility Scripts

Dari root directory proyek, Anda dapat menjalankan:

* `npm run dev:be` — Jalankan backend server.
* `npm run dev:fe` — Jalankan frontend Next.js server.
* `npm run build:fe` — Build frontend untuk production.
* `npm run seed:be` — Seed akun admin awal di backend.

---

## 🔑 Kredensial Testing Admin
* **URL Login**: `http://localhost:3000/login`
* **Email**: `admin@fourjective.com`
* **Password**: `admin123` *(autentikasi backend dalam mode bypass untuk kemudahan testing)*

---

## 📄 Lisensi
Private / Proprietary Project — Fourjective Team.
