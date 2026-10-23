"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Package, Clapperboard, Users, Printer, BookOpen } from "lucide-react";

/* DATA RINGKAS KATALOG (DETAIL LENGKAP BERTUMPAS DI /services?package=<slug>) */
interface CatalogCard {
  slug: string;
  badge: string;
  title: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  isFeatured?: boolean;
  benefits: string[];
  img: string;
  tint: string;
}

const CARDS: CatalogCard[] = [
  {
    slug: "full-package",
    badge: "PALING LENGKAP & BEST SELLER",
    title: "Full Package",
    tagline: "All-in-one dari studio sampai box merchandise. Satu kontrak, semua kebutuhan beres.",
    icon: Package,
    isFeatured: true,
    benefits: [
      "Photoshoot konsep + Short Film & Aftermovie 4K",
      "Cetak hardcover jahit benang standar majalah editorial",
      "Box merchandise angkatan lengkap (medali & lanyard)",
    ],
    img: "/images/packages/full-package.webp",
    tint: "#F6EFE6",
  },
  {
    slug: "digital",
    badge: "MODERN & PAPERLESS",
    title: "Digital Package",
    tagline: "Sinema aftermovie 4K, video rewind sekolah, dan 3D flipbook interaktif tanpa cetak fisik.",
    icon: Clapperboard,
    benefits: [
      "3D Virtual Flipbook + password privat angkatan",
      "Aftermovie 4K, film angkatan & video tren",
      "Arsip digital lifetime, aman selamanya",
    ],
    img: "/images/packages/digital.webp",
    tint: "#EFE5D8",
  },
  {
    slug: "angkatan",
    badge: "FAVORIT ANGKATAN BESAR",
    title: "Paket Angkatan",
    tagline: "Dirancang untuk kapasitas 150—500+ siswa dengan patungan kas yang tetap terjangkau.",
    icon: Users,
    benefits: [
      "Buku fisik jahit benang hardcover awet",
      "Sesi foto indoor/outdoor + pendampingan tim kru",
      "Bonus flipbook digital interaktif",
    ],
    img: "/images/packages/angkatan.webp",
    tint: "#F4ECE1",
  },
  {
    slug: "desain-cetak",
    badge: "KHUSUS PRODUKSI CETAK",
    title: "Desain & Cetak",
    tagline: "Sudah punya foto sendiri? Desainer kami tata layaknya majalah editorial lalu cetak pabrik.",
    icon: Printer,
    benefits: [
      "Layouting estetik & relevan oleh desainer buku",
      "Mesin cetak industri offset presisi tinggi",
      "Quality control per eksemplar & garansi ganti",
    ],
    img: "/images/packages/desain-cetak.webp",
    tint: "#F0E9DE",
  },
  {
    slug: "yb-digital",
    badge: "STANDALONE E-BOOK",
    title: "Yearbook Digital",
    tagline: "Buku tahunan digital murni dengan animasi 3D realistis yang bisa dibuka di HP, tablet, dan laptop.",
    icon: BookOpen,
    benefits: [
      "Animasi buka lembaran 3D interaktif kilat",
      "Portal privat angkatan + arsip data aman",
      "Nggak takut hilang atau rusak, selalu siap buka",
    ],
    img: "/images/packages/yb-digital.webp",
    tint: "#EAE0D2",
  },
];

export default function ServicesCatalog() {
  const cards = CARDS;

  return (
    <section
      id="services"
      className="relative w-full bg-[#FAF6F0] text-dark border-b-4 border-dark overflow-hidden select-none py-16 sm:py-20 md:py-24 px-4 sm:px-8"
      style={{
        backgroundImage:
          "linear-gradient(rgba(24, 24, 27, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(24, 24, 27, 0.035) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* HEADER: SATU JUDUL, 2 BARIS */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-14">
          <h2 className="font-playtimes text-6xl sm:text-7xl md:text-8xl text-dark leading-[0.95] tracking-normal drop-shadow-sm">
            Kamu Pilih,
            <br />
            <span className="text-orange">Kami Garap.</span>
          </h2>

          <p className="font-mono text-xs sm:text-sm font-bold text-dark/75 mt-4 leading-relaxed max-w-3xl mx-auto">
            5 pilihan paket buku tahunan. Dari foto studio, film angkatan, hingga cetak fisik standar majalah editorial — ditangani satu tim kreatif profesional dari awal sampai hari wisuda.
          </p>
        </div>

        {/* ===== BARIS 1: 2 KARTU LEBAR ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {cards.slice(0, 2).map((pkg, idx) => (
            <article
              key={pkg.slug}
              className={`group relative bg-[#FFFDF9] border-3 sm:border-4 rounded-2xl flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 ${
                pkg.isFeatured
                  ? "border-orange shadow-[7px_7px_0px_#FF4D00]"
                  : "border-dark shadow-[6px_6px_0px_#18181B] hover:shadow-[7px_7px_0px_#FF4D00]"
              }`}
            >
              {/* Badge Bar */}
              <div
                className={`py-2 px-5 border-b-2 flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-wider ${
                  pkg.isFeatured
                    ? "bg-orange text-white border-orange"
                    : "bg-[#F2ECE1] text-dark/80 border-dark/20"
                }`}
              >
                <span>{pkg.badge}</span>
              </div>

              {/* Stage Ilustrasi: poster WebP resmi 16:10 */}
              <div
                className="relative h-[210px] sm:h-[240px] flex items-center justify-center overflow-hidden border-b-3 sm:border-b-4 border-dark"
                style={{ backgroundColor: pkg.tint }}
              >
                <div className="absolute top-3 left-3 z-20">
                  <span className="inline-block bg-dark text-white px-2 py-0.5 rounded font-mono text-[10px] font-black uppercase tracking-wider">
                    {`0${idx + 1}`}
                  </span>
                </div>

                <div className="relative z-10 w-full h-full p-3 group-hover:scale-[1.02] transition-transform duration-300">
                  <div className="relative w-full h-full rounded-lg overflow-hidden border-2 border-dark/60 shadow-md">
                    <Image
                      src={pkg.img}
                      alt={`${pkg.title} mockup`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Body Ringkas */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-headline font-black text-3xl text-dark tracking-tight uppercase group-hover:text-orange transition-colors">
                      {pkg.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-dark/70 mt-1 leading-relaxed">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Ikon Emblemen Taktis (kotak oranye + ikon putih) */}
                  <div className="w-11 h-11 rounded-xl bg-orange text-white flex items-center justify-center border-2 border-dark shadow-[3px_3px_0px_#18181B] shrink-0">
                    <pkg.icon className="w-5 h-5" />
                  </div>
                </div>

                <ul className="mt-5 pt-4 border-t-2 border-dark/10 grid sm:grid-cols-3 gap-x-4 gap-y-2.5">
                  {pkg.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs font-mono text-dark/85 font-medium leading-snug"
                    >
                      <Check className="w-3.5 h-3.5 text-orange shrink-0 mt-0.5 stroke-[3]" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-6 pt-4 border-t-2 border-dark/10">
                  <Link
                    href={`/paket?package=${pkg.slug}`}
                    className="w-full inline-flex items-center justify-between gap-2 bg-dark hover:bg-orange text-white font-mono font-bold text-xs uppercase px-5 py-3.5 rounded-xl border-2 border-dark transition-all duration-200 cursor-pointer shadow-sm group-hover:bg-orange"
                  >
                    <span>LIHAT DETAIL &amp; BENEFIT LENGKAP</span>
                    <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ===== BARIS 2: 3 KARTU ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.slice(2).map((pkg, idx) => (
            <article
              key={pkg.slug}
              className="group relative bg-[#FFFDF9] border-3 sm:border-4 border-dark rounded-2xl flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-[6px_6px_0px_#18181B] hover:shadow-[7px_7px_0px_#FF4D00]"
            >
              <div className="py-2 px-5 border-b-2 bg-[#F2ECE1] text-dark/80 border-dark/20 flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-wider">
                <span>{pkg.badge}</span>
                <Check className="w-4 h-4 text-orange stroke-3" />
              </div>

              <div
                className="relative h-[190px] sm:h-[210px] flex items-center justify-center overflow-hidden border-b-3 border-dark"
                style={{ backgroundColor: pkg.tint }}
              >
                <div className="absolute top-3 left-3 z-20">
                  <span className="inline-block bg-dark text-white px-2 py-0.5 rounded font-mono text-[10px] font-black uppercase tracking-wider">
                    {`0${idx + 3}`}
                  </span>
                </div>

                <div className="relative z-10 w-full h-full p-3 group-hover:scale-[1.02] transition-transform duration-300">
                  <div className="relative w-full h-full rounded-lg overflow-hidden border-2 border-dark/60 shadow-md">
                    <Image
                      src={pkg.img}
                      alt={`${pkg.title} mockup`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-headline font-black text-2xl text-dark tracking-tight uppercase group-hover:text-orange transition-colors">
                      {pkg.title}
                    </h3>
                    <p className="font-sans text-xs text-dark/70 mt-1 leading-relaxed">
                      {pkg.tagline}
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-orange text-white flex items-center justify-center border-2 border-dark shadow-[3px_3px_0px_#18181B] shrink-0">
                    <pkg.icon className="w-4 h-4" />
                  </div>
                </div>

                <ul className="mt-4 pt-3 border-t border-dark/10 space-y-2">
                  {pkg.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs font-mono text-dark/85 font-medium leading-snug"
                    >
                      <Check className="w-3.5 h-3.5 text-orange shrink-0 mt-0.5 stroke-[3]" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-4 border-t-2 border-dark/10">
                  <Link
                    href={`/paket?package=${pkg.slug}`}
                    className="w-full inline-flex items-center justify-between gap-2 bg-dark hover:bg-orange text-white font-mono font-bold text-xs uppercase px-5 py-3.5 rounded-xl border-2 border-dark transition-all duration-200 cursor-pointer shadow-sm group-hover:bg-orange"
                  >
                    <span>LIHAT BENEFIT LENGKAP</span>
                    <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
