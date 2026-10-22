"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check, Sparkles, Layers, Video, BookOpen, Printer, Smartphone } from "lucide-react";

export interface PackageItem {
  slug: string;
  badge: string;
  title: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  isFeatured?: boolean;
  benefits: string[];
  eoBonus: string;
}

export const PACKAGES_DATA: PackageItem[] = [
  {
    slug: "full-package",
    badge: "PALING LENGKAP & BEST SELLER",
    title: "Full Package",
    tagline: "Solusi terpadu all-in-one tanpa pusing koordinasi vendor terpisah.",
    icon: Sparkles,
    isFeatured: true,
    benefits: [
      "Foto konsep studio mobile lengkap di sekolah",
      "Cinematic aftermovie 4K + dokumentasi drone berlisensi",
      "Cetak buku hardcover mesin Heidelberg (anti-rontok)",
      "Merchandise box magnetik, medali timbul & lanyard",
    ],
    eoBonus: "Gratis manajemen rundown, panggung, & crew EO wisuda",
  },
  {
    slug: "digital",
    badge: "MODERN & PAPERLESS",
    title: "Digital Package",
    tagline: "Karya sinema dan buku digital interaktif untuk generasi digital.",
    icon: Video,
    benefits: [
      "3D Virtual Flipbook terenkripsi password angkatan",
      "Cinematic aftermovie 4K wisuda & prom night",
      "Klip teaser vertikal siap posting TikTok & IG Reels",
      "Server hosting buku digital aktif seumur hidup",
    ],
    eoBonus: "Gratis konsep screening night & asistensi multimedia",
  },
  {
    slug: "angkatan",
    badge: "HEMAT PATUNGAN KAS",
    title: "Paket Angkatan",
    tagline: "Dirancang khusus kapasitas 150—500+ siswa dengan patungan terjangkau.",
    icon: Layers,
    benefits: [
      "Buku fisik hardcover jahit benang presisi tinggi",
      "Sesi foto massal angkatan & foto estetik per kelas",
      "Dokumentasi drone udara formasi angkatan",
      "Bonus 3D Virtual Flipbook untuk seluruh siswa",
    ],
    eoBonus: "Bantuan koordinasi jadwal & gladi bersih panitia sekolah",
  },
  {
    slug: "desain-cetak",
    badge: "KHUSUS PRODUKSI",
    title: "Desain & Cetak Terpisah",
    tagline: "Untuk sekolah yang sudah punya materi foto tapi butuh standar cetak pabrik.",
    icon: Printer,
    benefits: [
      "Layouting editorial majalah profesional dari desainer pro",
      "Mesin cetak offset Heidelberg Jerman bergaransi",
      "Pilihan finishing eksklusif: foil emas/perak, spot UV, leather",
      "Quality Control per eksemplar bebas cacat lem",
    ],
    eoBonus: "Asistensi penyerahan seremonial buku saat hari wisuda",
  },
  {
    slug: "yb-digital",
    badge: "STANDALONE FLIPBOOK",
    title: "YB Digital Standalone",
    tagline: "Buku tahunan digital murni dengan animasi membalik lembaran interaktif.",
    icon: Smartphone,
    benefits: [
      "Platform Flipbook 3D kencang di smartphone & laptop",
      "Sistem privasi portal dengan proteksi password khusus",
      "Integrasi tombol pemutar musik / audio angkatan",
      "Bebas revisi layout sebelum penerbitan digital",
    ],
    eoBonus: "Integrasi live streaming wisuda ke dalam flipbook",
  },
];

export default function PackagesV1() {
  return (
    <section
      id="packages"
      className="relative w-full bg-[#FAF6F0] text-dark border-b-4 border-dark overflow-hidden select-none py-16 sm:py-24 px-4 sm:px-8"
      style={{
        backgroundImage:
          "linear-gradient(rgba(24, 24, 27, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(24, 24, 27, 0.035) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-playtimes text-4xl sm:text-6xl md:text-7xl text-dark leading-[1.0] drop-shadow-sm">
            5 Pilihan Paket,
            <br />
            <span className="text-orange">Sesuai Kebutuhan Angkatan.</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base font-semibold text-dark/75 mt-3 leading-relaxed">
            Klik paket mana pun untuk membaca rincian benefit lengkap, estimasi alur kerja, dan apa saja yang kamu dapatkan.
          </p>
        </div>

        {/* 5 PACKAGES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {PACKAGES_DATA.map((pkg, idx) => {
            const Icon = pkg.icon;
            const isFeatured = pkg.isFeatured;

            return (
              <div
                key={pkg.slug}
                className={`group relative bg-[#FFFDF9] border-3 sm:border-4 rounded-2xl flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1.5 ${
                  isFeatured
                    ? "border-orange shadow-[7px_7px_0px_#FF4D00] md:col-span-2 lg:col-span-1"
                    : "border-dark shadow-[6px_6px_0px_#18181B] hover:shadow-[7px_7px_0px_#FF4D00]"
                }`}
              >
                {/* Top Badge */}
                <div
                  className={`py-2 px-5 border-b-2 flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-wider ${
                    isFeatured
                      ? "bg-orange text-white border-orange"
                      : "bg-[#F2ECE1] text-dark/80 border-dark/20"
                  }`}
                >
                  <span>{pkg.badge}</span>
                  <span className="font-bold">0{idx + 1}</span>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title & Icon Lockup */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-headline font-black text-2xl sm:text-3xl text-dark tracking-tight uppercase group-hover:text-orange transition-colors">
                          {pkg.title}
                        </h3>
                        <p className="font-sans text-xs sm:text-sm text-dark/70 mt-1 leading-relaxed">
                          {pkg.tagline}
                        </p>
                      </div>

                      <div className="w-10 h-10 rounded-xl bg-orange/15 border-2 border-dark flex items-center justify-center text-orange shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* What You Get Points */}
                    <div className="mt-5 space-y-2.5">
                      <p className="font-mono text-[10px] uppercase font-bold text-dark/50 tracking-wider">
                        Apa Yang Kamu Dapatkan:
                      </p>
                      <ul className="space-y-2">
                        {pkg.benefits.map((benefit, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-xs sm:text-sm font-sans text-dark/85 leading-snug"
                          >
                            <Check className="w-4 h-4 text-orange shrink-0 mt-0.5 stroke-[2.5]" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* EO Highlight Bonus */}
                    <div className="mt-5 p-3 rounded-xl bg-orange/10 border border-orange/30 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-orange shrink-0 mt-0.5 fill-orange" />
                      <div>
                        <span className="font-mono text-[10px] uppercase font-bold text-orange block">
                          ✦ PENGAWALAN EVENT INCLUDED (FOTO &amp; WISUDA)
                        </span>
                        <p className="font-sans text-xs text-dark font-medium leading-snug mt-0.5">
                          {pkg.eoBonus}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button to Sub-page detail */}
                  <div className="mt-7 pt-5 border-t-2 border-dark/10">
                    <Link
                      href={`/services?package=${pkg.slug}`}
                      className="w-full inline-flex items-center justify-between gap-2 bg-dark hover:bg-orange text-white font-mono font-bold text-xs uppercase px-5 py-3.5 rounded-xl border-2 border-dark transition-all duration-200 cursor-pointer shadow-sm group-hover:bg-orange"
                    >
                      <span>LIHAT DETAIL &amp; BENEFIT LENGKAP</span>
                      <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
