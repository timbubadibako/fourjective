# 🔌 API Specification & Contracts — Fourjective Backend

**Base URL (Local)**: `http://localhost:5000/api`  
**Base URL (Production)**: `https://api.fourjectiv.com/api`  
**Format**: `JSON` / `Multipart Form-Data`  

---

## 1. Authentication Endpoints

### 1.1 POST `/auth/login`
Mengautentikasi pengguna Admin dan mengembalikan token JWT.

* **Headers**: `Content-Type: application/json`
* **Request Body**:
```json
{
  "email": "admin@fourjective.com",
  "password": "admin123"
}
```

* **Success Response (200 OK)**:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

* **Error Response (401 Unauthorized)**:
```json
{
  "message": "Invalid credentials"
}
```

---

## 2. Portfolio Management Endpoints

### 2.1 GET `/portfolios`
Mengambil seluruh daftar portofolio (diurutkan berdasarkan `id ASC`).

* **Headers**: `Accept: application/json`
* **Success Response (200 OK)**:
```json
[
  {
    "id": 1,
    "namaSekolah": "SMA Negeri 1 Jakarta",
    "tahun": 2025,
    "cover": "SMAN_1_Jakarta_2025_1712345678/cover.jpg",
    "images": [
      "SMAN_1_Jakarta_2025_1712345678/page-1712345678-1.jpg",
      "SMAN_1_Jakarta_2025_1712345678/page-1712345678-2.jpg"
    ],
    "namaAkun": "admin@fourjective.com",
    "tanggalCreate": "2026-09-06T20:00:00.000Z",
    "password": "$2a$10$e8Z..."
  }
]
```

---

### 2.2 POST `/portfolios/:id/view`
Melihat detail portofolio spesifik. Jika portofolio dilindungi kata sandi, memerlukan `password` di request body atau Authorization Bearer Token.

* **Headers**: 
  * `Content-Type: application/json`
  * `Authorization: Bearer <jwt_token>` *(Optional untuk Admin bypass)*
* **Request Body**:
```json
{
  "password": "password_sekolah_opsional"
}
```

* **Success Response (200 OK)**:
```json
{
  "id": 1,
  "namaSekolah": "SMA Negeri 1 Jakarta",
  "tahun": 2025,
  "cover": "SMAN_1_Jakarta_2025_1712345678/cover.jpg",
  "images": [
    "SMAN_1_Jakarta_2025_1712345678/page-1712345678-1.jpg",
    "SMAN_1_Jakarta_2025_1712345678/page-1712345678-2.jpg"
  ],
  "namaAkun": "admin@fourjective.com",
  "tanggalCreate": "2026-09-06T20:00:00.000Z"
}
```

* **Error Response (401 / 403 / 404)**:
```json
// 401 Password Required
{ "error": "Password required", "isProtected": true }

// 403 Invalid Password
{ "error": "Invalid password", "isProtected": true }

// 404 Not Found
{ "error": "Portfolio not found" }
```

---

### 2.3 POST `/portfolios`
Membuat portofolio sekolah baru (Memerlukan Admin Auth Token).

* **Headers**: 
  * `Content-Type: multipart/form-data`
  * `Authorization: Bearer <jwt_token>`
* **Form Data Payload**:
  * `namaSekolah` (String): Nama sekolah (misal: "SMA Negeri 1 Jakarta")
  * `tahun` (Number): Tahun kelulusan (misal: 2025)
  * `cover` (File): File gambar cover (`.jpg`, `.png`)
  * `pdf` (File): File dokumentasi PDF buku tahunan
  * `password` (String, Optional): Password proteksi buku

* **Success Response (201 Created)**:
```json
{
  "id": 2,
  "namaSekolah": "SMA Negeri 1 Jakarta",
  "tahun": 2025,
  "cover": "SMAN_1_Jakarta_2025_1712399999/cover.jpg",
  "images": [
    "SMAN_1_Jakarta_2025_1712399999/page-1712399999-1.jpg"
  ],
  "namaAkun": "admin@fourjective.com",
  "tanggalCreate": "2026-09-06T21:00:00.000Z"
}
```

---

### 2.4 PUT `/portfolios/:id`
Memperbarui portofolio yang sudah ada (Memerlukan Admin Auth Token).

* **Headers**: 
  * `Content-Type: multipart/form-data`
  * `Authorization: Bearer <jwt_token>`
* **Form Data Payload**: (Sama seperti POST, seluruh bidang opsional).

---

### 2.5 DELETE `/portfolios/:id`
Menghapus data portofolio beserta folder fisik file gambar pendukungnya di server.

* **Headers**: `Authorization: Bearer <jwt_token>`
* **Success Response (200 OK)**:
```json
{
  "message": "Portfolio deleted successfully"
}
```
