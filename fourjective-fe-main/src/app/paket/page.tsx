"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/landing/header-pill-v2";
import Footer from "@/components/landing/footer-v4";
import {
  Sparkles,
  Check,
  CalendarCheck,
  Video,
  Printer,
  Layers,
  Smartphone,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";

interface PackageDetail {
  slug: string;
  badge: string;
  title: string;
  tagline: string;
  target: string;
  icon: React.ComponentType<{ className?: string }>;
  deliverables: {
    title: string;
    items: string[];
  }[];
  eoBenefits: string[];
  techSpecs: {
    label: string;
    value: string;
  }[];
  waQuery: string;
}

const PACKAGES_FULL_DETAILS: Record<string, PackageDetail> = {
  "full-package": {
    slug: "full-package",
    badge: "PALING LENGKAP & ALL-IN-ONE",
    title: "Full Package",
    tagline: "Solusi lengkap buku tahunan, aftermovie 4K, foto konsep, dan merchandise tanpa ribet.",
    target: "Cocok untuk panitia angkatan yang menginginkan standar kualitas tertinggi dan pengerjaan beres satu pintu.",
    icon: Sparkles,
    deliverables: [
      {
        title: "Sesi Foto Konsep Mobile Studio",
        items: [
          "Studio foto mobile langsung dibawa ke sekolah dengan tata lighting profesional",
          "Pilihan 350+ tema orisinal & moodboard estetik anti-gaya KTP kaku",
          "Retouching natural per siswa (skin smoothing & color grading majalah)",
          "Foto grup angkatan, foto kelas, dan candid aktivitas sekolah",
        ],
      },
      {
        title: "Video Dokumentasi & Drone 4K",
        items: [
          "Cinematic Aftermovie durasi 5—10 menit resolusi 4K Ultra HD",
          "Liputan udara dengan pilot drone berlisensi resmi",
          "Klip vertikal (Reels/TikTok) siap viral untuk media sosial sekolah",
          "Full raw video footage & audio mastering jernih",
        ],
      },
      {
        title: "Cetak Buku Hardcover Standar Museum",
        items: [
          "Mesin cetak offset Heidelberg Jerman presisi warna tinggi",
          "Jilid jahit benang pur-binding tebal anti-rontok seumur hidup",
          "Hardcover tebal (Hardboard 30/40) laminasi doff / glossy",
          "Finishing foil emas/perak, embos timbul, atau spot UV",
        ],
      },
      {
        title: "Merchandise & Souvenir Eksklusif",
        items: [
          "Packaging box magnetik eksklusif per eksemplar buku",
          "Medali kelulusan timbul logam cor berkualitas",
          "Lanyard gantungan kunci desain custom angkatan",
          "Bonus stiker pack hologram angkatan",
        ],
      },
    ],
    eoBenefits: [
      "Manajemen panggung dan susunan rundown acara wisuda / prom night",
      "Asistensi koordinasi panitia guru dan siswa selama persiapan",
      "Screening teaser aftermovie di panggung utama saat acara berlangsung",
      "Dokumentasi seremonial penyerahan buku kepada kepala sekolah & perwakilan siswa",
    ],
    techSpecs: [
      { label: "Bahan Kertas Isi", value: "Art Paper / Matte Paper 150—190 gsm" },
      { label: "Bahan Cover", value: "Hardboard No. 30/40 lapis Art Carton 150 gsm" },
      { label: "Penjilidan", value: "Jahit Benang + Lem Panas Pur-Binding" },
      { label: "Resolusi Video", value: "4K UHD 60fps + Full HD 1080p Web" },
      { label: "Platform Digital", value: "3D Virtual Flipbook Private Password" },
    ],
    waQuery: "Halo Fourjective! Kami ingin konsultasi dan ajukan penawaran untuk FULL PACKAGE.",
  },

  digital: {
    slug: "digital",
    badge: "MODERN & PAPERLESS",
    title: "Digital Package",
    tagline: "Karya sinema dan buku digital interaktif untuk angkatan modern yang praktis.",
    target: "Ideal untuk angkatan yang menginginkan dokumentasi digital spektakuler tanpa biaya cetak fisik yang besar.",
    icon: Video,
    deliverables: [
      {
        title: "3D Virtual Flipbook Interaktif",
        items: [
          "Tampilan membalik buku 3D realistis dengan suara lembaran kertas",
          "Akses cepat tanpa perlu download aplikasi, kompatibel di iPhone, Android & Laptop",
          "Portal terlindungi password enkripsi unik per angkatan (privasi 100% aman)",
          "Hosting server kencang aktif selamanya",
        ],
      },
      {
        title: "Sinema Aftermovie & Drone 4K",
        items: [
          "Dokumenter video kelulusan sinematik 4K lengkap dengan wawancara angkatan",
          "Klip sorotan aerial drone formasi siswa di lapangan sekolah",
          "3 klip teaser vertikal siap reels / shorts",
        ],
      },
      {
        title: "Sesi Photoshoot Kilat",
        items: [
          "Sesi pemotretan potret siswa berkonsep tajam untuk kebutuhan foto buku digital",
          "Pemberian seluruh file foto digital high-resolution lewat cloud drive",
        ],
      },
    ],
    eoBenefits: [
      "Konsep screening night dan pemutaran perdana aftermovie angkatan",
      "Asistensi live visual dan aset multimedia panggung wisuda",
      "Bantuan penayangan countdown graduation di proyektor/LED panggung",
    ],
    techSpecs: [
      { label: "Format Digital", value: "WebGL / HTML5 3D Virtual Flipbook" },
      { label: "Resolusi Gambar", value: "Ultra-Sharp 2400 x 3200 px per halaman" },
      { label: "Keamanan", value: "Enkripsi password unik per angkatan" },
      { label: "Audio", value: "Sound effect lembaran kertas + background lagu angkatan" },
    ],
    waQuery: "Halo Fourjective! Kami tertarik dengan DIGITAL PACKAGE untuk angkatan kami.",
  },

  angkatan: {
    slug: "angkatan",
    badge: "HEMAT PATUNGAN KAS",
    title: "Paket Angkatan",
    tagline: "Solusi efisien kapasitas massal 150—500+ siswa dengan patungan kas terjangkau.",
    target: "Pilihan terbaik untuk sekolah negeri atau swasta besar yang mencari titik temu kualitas terbaik dan anggaran bersahabat.",
    icon: Layers,
    deliverables: [
      {
        title: "Buku Tahunan Cetak Offset Masal",
        items: [
          "Hardcover tebal jahit benang pur-binding anti rontok",
          "Desain tata letak rapi, konsisten, dan mudah dinikmati",
          "Kertas matte halus bebas silau dan awet puluhan tahun",
          "Gratis edisi 3D Virtual Flipbook untuk seluruh siswa",
        ],
      },
      {
        title: "Photoshoot Lengkap Angkatan & Kelas",
        items: [
          "Pemotretan formasi massal seluruh angkatan di lapangan",
          "Foto grup per kelas dengan arahan gaya terarah dari pengarah gaya Fourjective",
          "Foto dewan guru & staf manajemen sekolah",
        ],
      },
      {
        title: "Dokumentasi Drone Udara",
        items: [
          "Pengambilan video udara formasi angka tahun kelulusan",
          "Klip video pendek kompilasi kenangan angkatan",
        ],
      },
    ],
    eoBenefits: [
      "Bantuan penyusunan jadwal gladi bersih dan pembagian rombongan kelas",
      "Koordinasi alur penyerahan buku dan merchandise saat pelepasan siswa",
    ],
    techSpecs: [
      { label: "Bahan Kertas Isi", value: "Matte Paper 150 gsm Premium" },
      { label: "Finishing Cover", value: "Laminasi Doff + Spot UV Judul" },
      { label: "Jilid", value: "Jahit Benang Pur-binding Keras" },
      { label: "Lead Time", value: "60—75 Hari Kerja" },
    ],
    waQuery: "Halo Fourjective! Kami ingin menanyakan simulasi PAKET ANGKATAN untuk jumlah siswa kami.",
  },

  "desain-cetak": {
    slug: "desain-cetak",
    badge: "KHUSUS LAYOUT & CETAK",
    title: "Desain & Cetak Terpisah",
    tagline: "Solusi khusus bagi sekolah yang sudah memiliki foto sendiri tapi ingin dicetak mesin pabrik bergaransi.",
    target: "Tepat untuk panitia yang mandiri dalam fotografi dan membutuhkan desainer layout majalah serta mesin cetak offset berkualitas.",
    icon: Printer,
    deliverables: [
      {
        title: "Editorial Layout & Desain Kreatif",
        items: [
          "Desainer profesional menata tipografi, grid halaman, dan palet warna",
          "3 kali sesi revisi layouting bersama panitia sekolah",
          "Pengecekan resolusi file foto agar hasil cetak tidak pecah (pre-flight check)",
        ],
      },
      {
        title: "Produksi Cetak Mesin Heidelberg Jerman",
        items: [
          "Mesin cetak 4 warna dengan kalibrasi warna tajam dan stabil",
          "Pembuatan dummy fisik (proof book) sebelum naik cetak massal",
          "QC menyeluruh per eksemplar bebas lem belepotan atau halaman terbalik",
        ],
      },
    ],
    eoBenefits: [
      "Asistensi seremonial penyerahan buku pada acara kelulusan",
      "Pengiriman aman langsung ke lokasi sekolah sebelum hari wisuda",
    ],
    techSpecs: [
      { label: "Mesin Cetak", value: "Offset Heidelberg Speedmaster 4-Color" },
      { label: "Pilihan Cover", value: "Hardcover, Kulit Sintetis (Leather), atau Akrilik" },
      { label: "Proofing", value: "1 Eksemplar Dummy Fisik Gratis" },
      { label: "Garansi", value: "100% Ganti Baru Jika Cacat Cetak" },
    ],
    waQuery: "Halo Fourjective! Kami sudah punya foto dan butuh jasa DESAIN & CETAK TERPISAH.",
  },

  "yb-digital": {
    slug: "yb-digital",
    badge: "STANDALONE FLIPBOOK",
    title: "YB Digital Standalone",
    tagline: "Buku tahunan digital interaktif tanpa cetak fisik dengan kecepatan tinggi dan akses kapan pun.",
    target: "Paling cocok untuk alternatif hemat, dokumentasi arsip digital sekolah, atau kenangan instan yang mudah dibagikan.",
    icon: Smartphone,
    deliverables: [
      {
        title: "Platform Flipbook 3D Berkecepatan Tinggi",
        items: [
          "Animasi buka lembaran halaman 3D interaktif",
          "Integrasi audio lagu kenangan angkatan klien (custom music track)",
          "Dukungan mode fullscreen tajam di segala ukuran layar",
          "Bebas batasan jumlah halaman",
        ],
      },
      {
        title: "Portal Keamanan & Akses Terenkripsi",
        items: [
          "Password terlindungi per angkatan sekolah",
          "Dashboard pemantau jumlah pembaca bagi panitia",
          "Hosting cloud kencang aktif seumur hidup tanpa biaya langganan bulanan",
        ],
      },
    ],
    eoBenefits: [
      "Integrasi link siaran live streaming wisuda sekolah ke dalam halaman flipbook",
    ],
    techSpecs: [
      { label: "Akses", value: "Web Browser Link + Password (No App Install)" },
      { label: "Hosting", value: "Edge CDN Global Cepat & 0 Egress" },
      { label: "Fitur Audio", value: "Tombol Play/Pause Musik Angkatan" },
    ],
    waQuery: "Halo Fourjective! Kami ingin konsultasi pembuatan YB DIGITAL STANDALONE.",
  },
};

function ServicesContent() {
  const searchParams = useSearchParams();
  const pkgParam = searchParams.get("package");

  const [activeSlug, setActiveSlug] = useState<string>("full-package");

  useEffect(() => {
    if (pkgParam && PACKAGES_FULL_DETAILS[pkgParam]) {
      setActiveSlug(pkgParam);
    }
  }, [pkgParam]);

  const activePackage =
    PACKAGES_FULL_DETAILS[activeSlug] || PACKAGES_FULL_DETAILS["full-package"];
  const slugs = Object.keys(PACKAGES_FULL_DETAILS);

  const waHref = `https://wa.me/6289657008080?text=${encodeURIComponent(activePackage.waQuery)}`;

  return (
    <div className="min-h-screen bg-paper text-dark flex flex-col selection:bg-orange selection:text-white">
      <Header />

      <main className="pt-20 sm:pt-24 pb-0 w-full">
        {/* ===== MASTHEAD ===== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between gap-4 pb-5">
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-dark/50 hover:text-orange transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Beranda
            </Link>
            <span className="font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-orange">
              Katalog Resmi · 5 Lini
            </span>
          </div>

          <div className="border-t-[3px] border-dark pt-8 sm:pt-10 pb-10 sm:pb-14 relative">
          {/* Sunburst ghost kanan */}
          <div
            className="absolute right-0 top-0 w-[360px] h-[360px] opacity-[0.07] pointer-events-none"
            aria-hidden
          >
            <svg viewBox="0 0 200 200" className="w-full h-full fill-orange">
              <polygon points="100,0 115,65 178,32 142,88 200,100 142,112 178,168 115,135 100,200 85,135 22,168 58,112 0,100 58,88 22,32 85,65" />
            </svg>
          </div>
            <div className="grid lg:grid-cols-12 gap-8 items-end relative">
              <h1 className="lg:col-span-8 font-playtimes text-dark leading-[1.0] tracking-tight text-5xl sm:text-7xl md:text-8xl">
                Paket
                <br />
                <span className="text-orange">5&nbsp;Lini.</span>
              </h1>
              <div className="lg:col-span-4 lg:pb-2">
                <p className="text-sm sm:text-base text-dark/70 leading-relaxed font-medium">
                  Rincian benefit tiap lini — spesifikasi cetak, foto konsep,
                  video 4K, sampai bonus pengelolaan EO.
                </p>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-dark/40 mt-4">
                  PT Fourjective Studio Indonesia · Est. 2017
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== BODY GRID: INDEX RAIL + DETAIL ===== */}
        <div className="border-t-[3px] border-dark">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[300px_1fr]">
            {/* RAIL (desktop) */}
            <aside className="hidden lg:block border-r-[3px] border-dark">
              <div className="sticky top-24">
                <p className="font-mono text-[9px] font-black uppercase tracking-[0.3em] text-dark/40 px-6 pt-6 pb-2">
                  Index Lini
                </p>
                {slugs.map((slug, i) => {
                  const p = PACKAGES_FULL_DETAILS[slug];
                  const isActive = activeSlug === slug;
                  return (
                    <button
                      key={slug}
                      type="button"
                      onClick={() => setActiveSlug(slug)}
                      className={`w-full text-left flex items-center gap-4 px-6 py-5 border-b-2 border-dark/10 transition-colors cursor-pointer group ${
                        isActive
                          ? "bg-orange text-white"
                          : "hover:bg-dark/[0.035] text-dark"
                      }`}
                    >
                      <span
                        className={`font-headline font-black text-2xl leading-none ${
                          isActive ? "text-white" : "text-dark/25 group-hover:text-orange"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`font-headline font-black uppercase text-xs tracking-wider leading-snug ${
                          isActive ? "text-white" : ""
                        }`}
                      >
                        {p.title}
                      </span>
                      {isActive ? (
                        <span className="ml-auto w-2 h-2 bg-white shrink-0" />
                      ) : (
                        <span className="ml-auto w-2 h-2 border-2 border-dark/20 shrink-0" />
                      )}
                    </button>
                  );
                })}
                <div className="p-6">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-dark/45 leading-relaxed mb-4">
                    Butuh simulasi harga untuk sekolahmu?
                  </p>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-orange text-white font-headline font-black text-[11px] uppercase tracking-widest px-5 py-4 border-3 border-dark shadow-[5px_6px_0px_#14161C] hover:shadow-[2px_3px_0px_#14161C] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Ajukan Penawaran</span>
                  </a>
                </div>
              </div>
            </aside>

            {/* TABS (mobile) */}
            <div className="lg:hidden border-y-[3px] border-dark bg-white">
              <div className="flex overflow-x-auto">
                {slugs.map((slug, i) => {
                  const p = PACKAGES_FULL_DETAILS[slug];
                  const isActive = activeSlug === slug;
                  return (
                    <button
                      key={slug}
                      type="button"
                      onClick={() => setActiveSlug(slug)}
                      className={`px-4 py-3 flex items-center gap-2 whitespace-nowrap border-r-2 border-dark/10 font-headline font-black uppercase text-[11px] tracking-wider cursor-pointer ${
                        isActive
                          ? "bg-orange text-white"
                          : "text-dark/60 hover:text-dark"
                      }`}
                    >
                      <span
                        className={`font-mono text-[10px] font-black ${
                          isActive ? "text-white/80" : "text-dark/30"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {p.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* DETAIL CONTENT */}
            <div className="min-w-0 px-4 sm:px-8 lg:px-10 pt-8 lg:pt-10 pb-20">
              {/* Header */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="font-mono text-[9px] sm:text-[10px] font-black text-white uppercase tracking-[0.2em] bg-orange border-2 border-dark px-2.5 py-1">
                  {activePackage.badge}
                </span>
                <span className="font-mono text-[9px] font-black uppercase tracking-[0.25em] text-dark/35">
                  Lini{" "}
                  {String(slugs.indexOf(activePackage.slug) + 1).padStart(2, "0")}
                  /05
                </span>
              </div>

              <h2 className="font-playtimes text-dark leading-[1.05] tracking-tight text-3xl sm:text-5xl lg:text-6xl">
                {activePackage.title}
              </h2>

              <p className="text-sm sm:text-base text-dark/70 font-medium mt-4 max-w-2xl leading-relaxed">
                {activePackage.tagline}
              </p>

              {/* meta table: pas buat */}
              <div className="mt-6 border-t-2 border-b-2 border-dark/10 divide-y-2 divide-dark/10 max-w-2xl">
                <div className="grid sm:grid-cols-[130px_1fr] gap-1 sm:gap-4 py-3">
                  <span className="font-mono text-[9px] font-black uppercase tracking-[0.25em] text-orange pt-0.5">
                    Pas Buat
                  </span>
                  <span className="text-xs sm:text-sm text-dark/75 font-medium leading-relaxed">
                    {activePackage.target}
                  </span>
                </div>
                <div className="grid sm:grid-cols-[130px_1fr] gap-1 sm:gap-4 py-3">
                  <span className="font-mono text-[9px] font-black uppercase tracking-[0.25em] text-dark/40 pt-0.5">
                    Konsultasi
                  </span>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex lg:hidden items-center gap-2 font-headline font-black text-[11px] uppercase tracking-widest text-orange hover:text-dark transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Ajukan penawaran via WA →</span>
                  </a>
                  <span className="hidden lg:block text-xs sm:text-sm text-dark/50 font-mono font-bold">
                    Tombol "AJUKAN PENAWARAN" di index kiri ←
                  </span>
                </div>
              </div>

              {/* ===== SECTION 01 — DELIVERABLES ===== */}
              <section className="mt-14">
                <div className="flex items-center gap-4 border-b-[3px] border-dark pb-3">
                  <span className="font-headline font-black text-orange text-2xl leading-none">
                    01
                  </span>
                  <h3 className="font-headline font-black uppercase text-sm sm:text-base tracking-wider text-dark">
                    Apa Yang Kamu Dapatkan
                  </h3>
                </div>

                <div className="divide-y-2 divide-dark/10">
                  {activePackage.deliverables.map((deliv, i) => (
                    <div
                      key={i}
                      className="grid sm:grid-cols-[240px_1fr] gap-2 sm:gap-8 py-6"
                    >
                      <h4 className="font-headline font-black uppercase text-sm sm:text-base text-dark leading-snug tracking-wide">
                        <span className="text-orange mr-2">A{i + 1}</span>
                        {deliv.title}
                      </h4>
                      <ul className="space-y-2">
                        {deliv.items.map((item, itemIdx) => (
                          <li
                            key={itemIdx}
                            className="flex items-start gap-3 text-xs sm:text-sm text-dark/75 leading-relaxed"
                          >
                            <span className="w-2 h-2 bg-orange shrink-0 mt-1.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* ===== SECTION 02 — EO (flat orange band) ===== */}
              <section className="mt-12 bg-orange text-white border-y-[3px] border-dark -mx-4 sm:-mx-8 lg:-mx-10 px-4 sm:px-8 lg:px-10 py-10 sm:py-12 shadow-[10px_12px_0px_#FFEDD9]">
                <div className="flex items-center gap-4 border-b-[3px] border-dark/25 pb-3 mb-6">
                  <span className="font-headline font-black text-white/90 text-2xl leading-none">
                    02
                  </span>
                  <div className="flex items-center gap-2">
                    <CalendarCheck className="w-4 h-4 text-white" />
                    <h3 className="font-headline font-black uppercase text-sm sm:text-base tracking-wider text-white">
                      Bonus Pengelolaan EO
                    </h3>
                  </div>
                </div>
                <p className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/85 mb-6 max-w-3xl leading-relaxed">
                  Nilai plus khusus Fourjective — semua paket sudah termasuk
                  asistensi tim event profesional.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
                  {activePackage.eoBenefits.map((b, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 py-3 border-b-2 border-dark/20 text-xs sm:text-sm text-white leading-relaxed"
                    >
                      <Check className="w-4 h-4 shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* ===== SECTION 03 — SPECS (tabel) ===== */}
              <section className="mt-12">
                <div className="flex items-center gap-4 border-b-[3px] border-dark pb-3">
                  <span className="font-headline font-black text-dark text-2xl leading-none">
                    03
                  </span>
                  <h3 className="font-headline font-black uppercase text-sm sm:text-base tracking-wider text-dark">
                    Spesifikasi Teknis &amp; Standar Mutu
                  </h3>
                </div>

                <div className="divide-y-2 divide-dark/10">
                  {activePackage.techSpecs.map((spec, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-1 sm:grid-cols-[240px_1fr] gap-1 sm:gap-8 py-3.5"
                    >
                      <span className="font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-dark/45 pt-1">
                        {spec.label}
                      </span>
                      <span className="font-mono text-xs sm:text-sm font-bold text-dark leading-relaxed">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-dark/30 pt-5 pb-10">
                  Standar mutu berlaku seluruh lini · QC per eksemplar
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper" />}>
      <ServicesContent />
    </Suspense>
  );
}
