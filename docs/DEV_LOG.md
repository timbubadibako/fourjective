# 📝 Development & Handover Log (DEV_LOG)

Dokumen ini mencatat riwayat perubahan, audit teknis, dan perbaikan yang telah dilakukan sejak penerimaan proyek (*handover*).

---

## 📅 Tanggal Handover: 6 September 2026

### 1. ⚙️ Pembaruan & Modernisasi Stack
- **Frontend**: Next.js `16.3.3` (App Router), React `19.2.8`, Tailwind CSS `4.3.3`, TypeScript `5.9.3`.
- **Backend**: Express.js `4.21.2`, Sequelize `6.37.5`, SQLite3 `6.0.1`.
- **Driver Database**: Menambahkan `sqlite3` untuk pengujian lokal tanpa dependensi MySQL server.
- **Pembersihan Dependensi**: Menghapus `mongoose` (tidak digunakan) dan `bcrypt` C++ native addon (diganti dengan `bcryptjs`).

---

### 2. 🐛 Perbaikan Bug & Integrasi API
- **Fix Content Security Policy (CSP)**:
  Memperbarui [next.config.ts](file:///home/jrilym/Projects/Web/Fourjective/fourjective-fe-main/next.config.ts) untuk menambahkan `http://localhost:5000` pada direktif `connect-src`, `img-src`, dan `frame-src` agar request API lokal tidak diblokir browser.
- **Fix API Base URL & Fallback**:
  Membuat [.env.local](file:///home/jrilym/Projects/Web/Fourjective/fourjective-fe-main/.env.local) dan menambahkan fallback `http://localhost:5000` di [api.ts](file:///home/jrilym/Projects/Web/Fourjective/fourjective-fe-main/src/services/api.ts), [LoginForm.tsx](file:///home/jrilym/Projects/Web/Fourjective/fourjective-fe-main/src/app/components/login/LoginForm.tsx), [useGetAllPortfolios.tsx](file:///home/jrilym/Projects/Web/Fourjective/fourjective-fe-main/src/hooks/useGetAllPortfolios.tsx), dan [create-portfolio/page.tsx](file:///home/jrilym/Projects/Web/Fourjective/fourjective-fe-main/src/app/dashboard/create-portfolio/page.tsx).
- **TypeScript Module Declarations**:
  Membuat [declarations.d.ts](file:///home/jrilym/Projects/Web/Fourjective/fourjective-fe-main/src/types/declarations.d.ts) untuk mendukung impor file gambar/SVG (`*.svg`, `*.png`, `*.jpg`, `*.webp`). Hasilnya: `npx tsc --noEmit` **0 Error**.
- **Missing Package**: Memasang `tailwindcss-animate` untuk mendukung plugin animasi Tailwind.

---

### 3. 🔓 Mode Bypass Autentikasi (Development Only)
- **Login Endpoint**: [authController.js](file:///home/jrilym/Projects/Web/Fourjective/fourjective-be-main/controllers/authController.js) menerima input email/password bebas untuk menerbitkan token JWT testing.
- **Middleware Guard**: [AuthMiddleware.js](file:///home/jrilym/Projects/Web/Fourjective/fourjective-be-main/middleware/AuthMiddleware.js) menyediakan fallback admin `admin@fourjective.com` jika token tidak dilampirkan.

---

### 4. 📁 Struktur Repositori & Monorepo
- Membuat [package.json](file:///home/jrilym/Projects/Web/Fourjective/package.json) root dengan script terpadu (`dev:be`, `dev:fe`, `build:fe`, `seed:be`).
- Membuat [.gitignore](file:///home/jrilym/Projects/Web/Fourjective/.gitignore) & [README.md](file:///home/jrilym/Projects/Web/Fourjective/README.md) di root.
- Menginisialisasi Git repository dan menghubungkan ke remote `https://github.com/timbubadibako/fourjective.git`.
