"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Check,
  ArrowRight,
  Camera,
  Film,
  Ticket,
  SlidersHorizontal,
  Layers,
  Columns2,
  Calendar,
  Users,
} from "lucide-react";
import { PACKAGES_DATA } from "./packages-v1";

export default function ServicesUnified() {
  // 3 Design Variations:
  // "v1": Unified Flow (Tiket Pass Pengawalan Event menempel tepat di atas 5 Paket)
  // "v2": Split Studio (Kiri Sticky Manifesto EO, Kanan 5 Paket)
  // "v3": Segmented Switcher (Tab Taktil berganti antara Pengawalan Event & 5 Paket)
  const [variant, setVariant] = useState<"v1" | "v2" | "v3">("v1");

  return (
    <section
      id="services-unified"
      className="relative w-full bg-[#FAF6F0] text-dark border-b-4 border-dark overflow-hidden select-none py-14 sm:py-20 px-4 sm:px-8"
      style={{
        backgroundImage:
          "linear-gradient(rgba(24, 24, 27, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(24, 24, 27, 0.035) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* VARIANT SWITCHER BAR (Untuk user membandingkan & memilih langsung di browser) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-10 pb-4 border-b-2 border-dark/15">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange animate-ping" />
            <span className="font-mono text-xs font-black uppercase tracking-wider text-dark/70">
              UJI GAYA LAYOUT // PILIH VARIAN:
            </span>
          </div>

          <div className="flex items-center gap-2 bg-[#F0EAE1] p-1.5 rounded-xl border-2 border-dark">
            <button
              type="button"
              onClick={() => setVariant("v1")}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                variant === "v1"
                  ? "bg-orange text-white shadow-sm"
                  : "text-dark/70 hover:text-dark"
              }`}
            >
              Varian 1: Tiket Melebur
            </button>
            <button
              type="button"
              onClick={() => setVariant("v2")}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                variant === "v2"
                  ? "bg-orange text-white shadow-sm"
                  : "text-dark/70 hover:text-dark"
              }`}
            >
              Varian 2: Split Studio
            </button>
            <button
              type="button"
              onClick={() => setVariant("v3")}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                variant === "v3"
                  ? "bg-orange text-white shadow-sm"
                  : "text-dark/70 hover:text-dark"
              }`}
            >
              Varian 3: Tab Switcher
            </button>
          </div>
        </div>

        {/* =========================================================================
            VARIAN 1: THE UNIFIED FLOW (TIKET PASS MELEBUR DI ATAS 5 PAKET)
            Solusi: Tidak ada 2 judul raksasa yang bertumpukan. EO dijadikan "VIP Field Pass"
            yang menempel mengalir langsung di atas 5 pilihan paket.
            ========================================================================= */}
        {variant === "v1" && (
          <div className="space-y-12">
            {/* Header Tunggal */}
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-playtimes text-4xl sm:text-6xl md:text-7xl text-dark leading-[0.98] drop-shadow-sm">
                Bukan Cuma Cetak Buku,
                <br />
                <span className="text-orange">Kami Kawal Event &amp; 5 Paketmu.</span>
              </h2>
              <p className="font-sans text-xs sm:text-sm md:text-base font-semibold text-dark/75 mt-3 leading-relaxed">
                Produksi foto ratusan siswa dan aftermovie 4K sudah otomatis kami kawal langsung di lapangan.
                Pilih paket buku tahunan di bawah, seluruh benefit asistensi event sudah aktif.
              </p>
            </div>

            {/* TIKET PASS TAKTIL: EVENT PRODUCTION PASS (Penghubung Visual yang Menyatu) */}
            <div className="relative bg-[#FFFDF9] border-3 sm:border-4 border-dark rounded-3xl p-6 sm:p-8 shadow-[7px_7px_0px_#18181B] overflow-hidden">
              {/* Notch Gerigi Tiket Kiri & Kanan */}
              <div className="hidden sm:block absolute -left-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#FAF6F0] border-4 border-dark" />
              <div className="hidden sm:block absolute -right-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#FAF6F0] border-4 border-dark" />

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b-2 border-dashed border-dark/25">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange text-white flex items-center justify-center border-2 border-dark shadow-sm shrink-0">
                    <Ticket className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] font-black uppercase tracking-wider text-orange block">
                      ✦ NILAI PLUS MUTLAK // FOURJECTIVE FIELD DIRECTION
                    </span>
                    <h3 className="font-headline font-black text-xl sm:text-2xl text-dark uppercase tracking-tight">
                      Pengawalan Lapangan: 2 Milestone Krusial
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-orange/15 border-2 border-orange/40 px-3.5 py-1.5 rounded-xl font-mono text-xs font-black text-orange shrink-0">
                  <Sparkles className="w-4 h-4 fill-orange" />
                  <span>OTOMATIS MASUK DI SEMUA PAKET (RP 0)</span>
                </div>
              </div>

              {/* 2 Kolom Milestone di dalam Tiket */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF6F0] border-2 border-dark/15">
                  <div className="w-10 h-10 rounded-xl bg-dark text-white flex items-center justify-center shrink-0 font-mono font-bold text-sm">
                    01
                  </div>
                  <div>
                    <h4 className="font-headline font-black text-base text-dark uppercase">
                      Hari Foto Angkatan &amp; Drone
                    </h4>
                    <p className="font-sans text-xs text-dark/75 mt-1 leading-snug">
                      Kru atur antrean rombel, crowd control 500+ siswa di lapangan, dan pengarah pose anti-kaku. Guru bebas stres.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF6F0] border-2 border-dark/15">
                  <div className="w-10 h-10 rounded-xl bg-orange text-white flex items-center justify-center shrink-0 font-mono font-bold text-sm border border-dark">
                    02
                  </div>
                  <div>
                    <h4 className="font-headline font-black text-base text-dark uppercase">
                      Hari Wisuda &amp; Screening Aftermovie
                    </h4>
                    <p className="font-sans text-xs text-dark/75 mt-1 leading-snug">
                      Asistensi rundown panggung, operator video aftermovie 4K di layar LED utama, dan pengawalan seremonial bagi buku.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 5 PAKET CARDS (GRID PROPORSIONAL) */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs font-black uppercase tracking-wider text-dark/60">
                  PILIH TIER PAKET BUKU TAHUNAN:
                </span>
                <span className="font-mono text-xs font-bold text-orange">
                  Klik kartu untuk rincian benefit →
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div>
                              <h3 className="font-headline font-black text-2xl text-dark tracking-tight uppercase group-hover:text-orange transition-colors">
                                {pkg.title}
                              </h3>
                              <p className="font-sans text-xs text-dark/70 mt-1 leading-relaxed">
                                {pkg.tagline}
                              </p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-orange/15 border-2 border-dark flex items-center justify-center text-orange shrink-0">
                              <Icon className="w-5 h-5" />
                            </div>
                          </div>

                          <ul className="mt-4 space-y-2 border-t border-dark/10 pt-3">
                            {pkg.benefits.slice(0, 3).map((benefit, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-xs font-sans text-dark/85 leading-snug"
                              >
                                <Check className="w-3.5 h-3.5 text-orange shrink-0 mt-0.5 stroke-[2.5]" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-6 pt-4 border-t-2 border-dark/10">
                          <Link
                            href={`/services?package=${pkg.slug}`}
                            className="w-full inline-flex items-center justify-between gap-2 bg-dark hover:bg-orange text-white font-mono font-bold text-xs uppercase px-4 py-3 rounded-xl border-2 border-dark transition-all duration-200 cursor-pointer shadow-sm group-hover:bg-orange"
                          >
                            <span>LIHAT BENEFIT LENGKAP</span>
                            <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VARIAN 2: SPLIT STUDIO (KIRI STICKY MANIFESTO EO, KANAN 5 PAKET)
            Solusi: Layar terbagi elegan gaya agensi. Sisi kiri menjelaskan komitmen
            pengawalan event, sisi kanan daftar paket yang bisa di-scroll bebas.
            ========================================================================= */}
        {variant === "v2" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Kolom Kiri: Sticky Manifesto Pengawalan Event */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
              <div className="bg-[#18181B] text-white border-3 border-dark rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#FF4D00]">
                <div className="inline-flex items-center gap-1.5 font-mono text-[10px] font-black uppercase tracking-wider text-orange bg-orange/20 px-3 py-1 rounded-full mb-3 border border-orange/40">
                  <Sparkles className="w-3.5 h-3.5 fill-orange" />
                  <span>STANDAR BARU // KAWAL HARI-H</span>
                </div>

                <h2 className="font-playtimes text-3xl sm:text-5xl text-white leading-[1.0]">
                  Bukan Cuma Cetak Buku,
                  <br />
                  <span className="text-orange">Kami Kawal Eventmu.</span>
                </h2>

                <p className="font-sans text-xs sm:text-sm text-white/70 mt-3 leading-relaxed">
                  Bikin aftermovie 4K dan foto ratusan siswa terlalu berat kalau panitia sekolah sendirian.
                  Semua paket di samping kanan otomatis dapat pengawalan kru Fourjective:
                </p>

                <div className="mt-6 space-y-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <Camera className="w-5 h-5 text-orange shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-headline uppercase text-sm">
                        01. Hari Foto &amp; Drone
                      </strong>
                      <span className="text-white/60 font-sans text-xs">
                        Kru atur 500+ siswa di lapangan, pose per kelas, antrean tertib.
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <Film className="w-5 h-5 text-orange shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-headline uppercase text-sm">
                        02. Hari Wisuda &amp; Prom
                      </strong>
                      <span className="text-white/60 font-sans text-xs">
                        Screening aftermovie 4K panggung utama &amp; kawal rundown.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-mono text-orange font-bold">
                  ✦ Biaya tambahan EO: Rp 0 (Sudah include di kas per paket)
                </div>
              </div>
            </div>

            {/* Kolom Kanan: 5 Paket Buku Tahunan */}
            <div className="lg:col-span-7 space-y-4">
              <div className="pb-2 border-b-2 border-dark/15">
                <span className="font-mono text-xs font-black uppercase text-dark">
                  5 TIER PAKET BUKU TAHUNAN // PILIH SESUAI KEBUTUHAN:
                </span>
              </div>

              {PACKAGES_DATA.map((pkg, idx) => {
                const Icon = pkg.icon;
                return (
                  <div
                    key={pkg.slug}
                    className="bg-[#FFFDF9] border-3 border-dark rounded-2xl p-5 sm:p-6 shadow-[5px_5px_0px_#18181B] hover:shadow-[7px_7px_0px_#FF4D00] hover:-translate-y-1 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-mono text-[10px] font-bold text-white bg-dark px-2 py-0.5 rounded">
                          0{idx + 1}
                        </span>
                        <span className="font-mono text-[10px] font-bold text-orange uppercase tracking-wider">
                          {pkg.badge}
                        </span>
                      </div>
                      <h3 className="font-headline font-black text-xl text-dark uppercase">
                        {pkg.title}
                      </h3>
                      <p className="font-sans text-xs text-dark/70 mt-1 max-w-md">
                        {pkg.tagline}
                      </p>
                    </div>

                    <Link
                      href={`/services?package=${pkg.slug}`}
                      className="shrink-0 inline-flex items-center justify-center gap-2 bg-dark hover:bg-orange text-white font-mono font-bold text-xs uppercase px-4 py-3 rounded-xl border-2 border-dark transition-all"
                    >
                      <span>Detail Paket</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            VARIAN 3: TAB SWITCHER INTERAKTIF
            Solusi: 2 Tab bersih di tengah. Pengunjung bisa berpindah antara fokus
            "Pengawalan Event Lapangan" dan "5 Pilihan Paket Buku".
            ========================================================================= */}
        {variant === "v3" && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-playtimes text-4xl sm:text-6xl text-dark leading-[1.0]">
                Satu Ekosistem,
                <br />
                <span className="text-orange">Buku &amp; Pengawalan Acara.</span>
              </h2>
            </div>

            {/* Big Segmented Tab Control */}
            <div className="flex justify-center">
              <div className="bg-[#FFFDF9] border-3 border-dark p-1.5 rounded-2xl shadow-[4px_4px_0px_#18181B] inline-flex gap-2">
                <button
                  type="button"
                  onClick={() => setVariant("v3")}
                  className="px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase bg-orange text-white shadow-sm"
                >
                  ✦ 01. Pengawalan Event Lapangan
                </button>
                <button
                  type="button"
                  onClick={() => setVariant("v1")}
                  className="px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase text-dark/70 hover:text-dark hover:bg-dark/5"
                >
                  ✦ 02. Lihat 5 Pilihan Paket
                </button>
              </div>
            </div>

            {/* 2 Big Visual Milestone Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="bg-[#FFFDF9] border-3 sm:border-4 border-dark rounded-2xl p-6 shadow-[6px_6px_0px_#18181B]">
                <div className="w-12 h-12 rounded-xl bg-orange/15 border-2 border-dark flex items-center justify-center text-orange mb-4">
                  <Camera className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs font-black text-orange uppercase">
                  MILESTONE 01 // HARI FOTO ANGKATAN
                </span>
                <h3 className="font-headline font-black text-2xl text-dark uppercase mt-1">
                  Photoshoot Day &amp; Formasi Drone
                </h3>
                <p className="font-sans text-xs sm:text-sm text-dark/75 mt-2 leading-relaxed">
                  Kru mengomando ratusan siswa di lapangan sekolah. Formasi angka angkatan via drone, pengarah pose per rombel, jadwal tertib tanpa guru kelelahan.
                </p>
                <div className="mt-5 pt-3 border-t-2 border-dark/10 font-mono text-[11px] font-bold text-orange">
                  ✓ Otomatis aktif di seluruh 5 paket
                </div>
              </div>

              <div className="bg-[#FFFDF9] border-3 sm:border-4 border-dark rounded-2xl p-6 shadow-[6px_6px_0px_#18181B]">
                <div className="w-12 h-12 rounded-xl bg-dark text-white flex items-center justify-center mb-4">
                  <Film className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs font-black text-orange uppercase">
                  MILESTONE 02 // HARI KELULUSAN &amp; PROM
                </span>
                <h3 className="font-headline font-black text-2xl text-dark uppercase mt-1">
                  Screening 4K &amp; Panggung
                </h3>
                <p className="font-sans text-xs sm:text-sm text-dark/75 mt-2 leading-relaxed">
                  Asistensi rundown panggung, operator pemutaran perdana video aftermovie di layar LED utama gedung/auditorium, dan seremonial bagi buku rapi.
                </p>
                <div className="mt-5 pt-3 border-t-2 border-dark/10 font-mono text-[11px] font-bold text-orange">
                  ✓ Otomatis aktif di seluruh 5 paket
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
