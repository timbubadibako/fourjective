# Fourjective Design System Specification
**Official Brand Identity: Sleek Modern Minimalist Creative Studio**

---

## 1. Executive Summary & Brand Positioning
Fourjective memposisikan diri sebagai **High-End Creative Production Studio & Visual Laboratory** khusus buku tahunan sekolah dan universitas. 

Menghilangkan kesan retro/brutalisme kartun yang klise, Fourjective mengadopsi bahasa visual **Sleek Modern Minimalist** (terinspirasi dari standar studio kreatif internasional seperti Swiss International Style, Pentagram, dan Studio Freight). Fokus utama adalah keanggunan tata letak (architectural layout), tipografi presisi, kurasi fotografi sinematik, dan sentuhan aksen **Fourjective Signature Vivid Orange (`#FF6E00`)**.

---

## 2. Core Brand Principles & Voice
- **Archetype**: The Modern Visual Architect & Master Documentarian.
- **Personality**: Minimalist, confident, precise, elegant, and evocative.
- **Copywriting Standard**:
  - Dilarang keras menggunakan istilah kaku atau kata *"Ritual"*.
  - Gunakan terminologi profesional dan relevan: **"Pesanan"**, **"Paket Kenangan"**, **"Kemitraan Angkatan"**, **"Kurasi Visual"**, dan **"Produksi Kreatif"**.

---

## 3. Master Color Palette & Token Architecture

| Token Name | Hex Code | Utility / Implementation |
| :--- | :--- | :--- |
| `brand-orange` (Primary Brand) | `#FF6E00` | Signature Fourjective Vivid Orange, Primary CTA buttons, active states, key highlight figures |
| `brand-orange-hover` | `#E66300` | Hover state for primary buttons |
| `brand-canvas` | `#FBFBFB` | Ultra-clean primary page background |
| `brand-surface` | `#FFFFFF` | Crisp card interior background |
| `brand-surface-subtle` | `#F4F4F5` | Secondary section background (Soft Zinc-100) |
| `brand-dark` | `#111113` | Deep graphite text, high-contrast dark sections |
| `brand-dark-surface` | `#18181B` | Interior cards for dark sections |
| `brand-border` | `#E4E4E7` | 1px Hairline border (Zinc-200) for architectural grid cards |
| `brand-border-dark` | `#27272A` | 1px Hairline border for dark mode elements |
| `brand-muted` | `#71717A` | Muted subtitle text and captions (Zinc-500) |

---

## 4. Typography Hierarchy

Menerapkan aturan tegas: **Tidak menggunakan decorative marker fonts (e.g. `font-cloude`) pada elemen fungsional.**

1. **Headlines & Display**:
   - **Architectural Geometric Grotesque**: `Syne` / `Lexend Zetta` (Weights: 700 Bold, 800 ExtraBold, 900 Black).
   - Karakter: Huruf kapital/sentence-case proporsional, tight tracking (`tracking-tight` atau `tracking-tighter`), leading rapat.
2. **Body Text & Functional Interface**:
   - **Clean Modern Grotesque**: `Plus Jakarta Sans` / `Inter` / `Poppins` (Weights: 400 Regular, 500 Medium, 600 SemiBold).
   - Karakter: Sangat mudah dibaca, line height lapang (`leading-relaxed`), ramah untuk perangkat mobile.
3. **Badges, Tags & Technical Metadata**:
   - Font: `Plus Jakarta Sans` (Weight: 700 Bold, Uppercase, `tracking-widest`, font-size 10px - 12px).

---

## 5. Architectural Component Guidelines

### A. Hairline Architectural Grid Cards
- Background: `#FFFFFF` di atas kanvas `#FBFBFB` atau `#F4F4F5`.
- Border: `1px solid #E4E4E7` (Hairline). Dilarang border tebal kartun (>2px).
- Radius: `rounded-2xl` (16px) atau `rounded-3xl` (24px).
- Padding: Lapang dan bernapas (`p-8 md:p-10`).
- Hover State: `hover:border-zinc-400 hover:shadow-[0_16px_36px_rgba(0,0,0,0.05)] hover:-translate-y-1` dengan transisi halus `duration-300 ease-out`.

### B. Button Components
1. **Primary Button**:
   - Background: `bg-[#FF6E00]` (Fourjective Orange).
   - Teks: Putih bersih (`text-white`), font-weight 700.
   - Border: None atau `1px solid rgba(255,255,255,0.2)`.
   - Radius: `rounded-full` (Pill modern) atau `rounded-xl`.
   - Shadow: Soft diffused orange glow saat hover (`hover:shadow-[0_8px_20px_rgba(255,110,0,0.35)]`).
2. **Secondary Ghost Button**:
   - Background: `bg-transparent` atau `bg-white`.
   - Border: `1px solid #E4E4E7`.
   - Teks: `#111113`, hover: `bg-zinc-100`.

---

## 6. Motion & Scroll Engine (GSAP + ScrollTrigger)

1. **Cinematic Mask Reveal**:
   - Headline masuk dengan mask split atau translate-y halus dari bawah garis kliping (`overflow-hidden`), durasi 0.9s ease `power3.out`.
2. **Workflow Scrubbed Pinning**:
   - 4 tahap alur produksi (01 Konsep & Moodboard, 02 Photoshoot & Drone, 03 Layout & AR, 04 Cetak & Boks) di-pin secara horizontal atau card-stacking saat scrolling vertikal.
3. **Numeric Counters**:
   - Statistik sekolah dan siswa bertambah secara mulus menggunakan `ScrollTrigger` saat elemen masuk ke viewport (duration: 1.8s, ease: `power2.out`).
4. **Interactive 3D Digital Flipbook Previewer**:
   - Tampilan spread ganda majalah dengan bayangan lipatan buku (spine shadow) dan animasi transisi lembar halaman yang halus.
5. **Interactive Budget Estimator**:
   - Slider dinamis untuk jumlah siswa + pilihan paket (Silver, Gold AR, Ultimate Box) dengan kalkulasi angka instan dan CTA pesan penawaran WhatsApp otomatis.
