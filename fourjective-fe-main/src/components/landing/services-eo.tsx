"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ServicesEo() {
  return (
    <section
      id="our-services-eo"
      className="relative w-full bg-[#FAF6F0] text-dark border-b-4 border-dark overflow-hidden select-none py-14 sm:py-20 md:py-24 px-4 sm:px-8"
      style={{
        backgroundImage:
          "linear-gradient(rgba(24, 24, 27, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(24, 24, 27, 0.035) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* GRID DUA KOLOM: TYPED TEXT KIRI & SVG SAJA DI KANAN (NO CARD AT ALL) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* KIRI: TEKS MURNI BESAR (BEBAS NOL KARTU) */}
          <div className="lg:col-span-7">
            {/* Hongky / Stempel Tipografi Kecil di Atas Judul */}
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-[11px] font-black uppercase tracking-widest text-dark/50">
                Fourjective Organizing
              </span>
              <span className="h-[2px] flex-1 bg-dark/10 rounded-full" />
            </div>

            {/* Judul Besar Playtimes */}
            <h2 className="font-playtimes text-4xl sm:text-6xl md:text-7xl text-dark leading-[0.98] drop-shadow-sm">
              Kawalan Hari-H
              <br />
              <span className="text-orange">Foto &amp; Wisuda.</span>
            </h2>

            {/* 2 Kopel Poin Tangkas (Bullet Padat Tanpa Kartu) */}
            <ul className="mt-7 space-y-3.5">
              <li className="flex items-center gap-3 font-mono text-xs sm:text-base font-black text-dark/90 tracking-tight">
                <span className="w-6 h-6 shrink-0 rounded-full bg-orange text-white flex items-center justify-center font-mono text-[10px] font-black border border-dark">
                  01
                </span>
                <span>Hari Foto Angkatan — atur rombel &amp; formasi drone via kru kami.</span>
              </li>
              <li className="flex items-center gap-3 font-mono text-xs sm:text-base font-black text-dark/90 tracking-tight">
                <span className="w-6 h-6 shrink-0 rounded-full bg-dark text-white flex items-center justify-center font-mono text-[10px] font-black border border-dark">
                  02
                </span>
                <span>Hari Wisuda — kawal rundown &amp; tayang Aftermovie 4K di layar.</span>
              </li>
            </ul>

            {/* Footer Strip Tebal (Halus & Tanpa Kartu) */}
            <p className="mt-8 pt-5 border-t-2 border-dark/15 font-mono text-xs sm:text-sm font-bold text-dark/60 leading-relaxed">
              Semua paket otomatis dapat pengawalan teknis lapangan.
            </p>
          </div>

          {/* KANAN: ILUSTRASI FLAT SVG SAJA (TANPA FRAME KARTU) */}
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-4">
              <Image
                src="/images/landing-page/our-services/photoshoot-img.svg"
                alt="Pengawalan Hari Foto dan Drone"
                width={335}
                height={238}
                className="w-full max-w-sm mx-auto h-auto object-contain drop-shadow-md mix-blend-multiply -rotate-2"
              />
              <Image
                src="/images/landing-page/our-services/video-img.svg"
                alt="Pengawalan Wisuda dan Aftermovie 4K"
                width={335}
                height={238}
                className="w-full max-w-xs mx-auto h-auto object-contain drop-shadow-md mix-blend-multiply rotate-3"
              />
            </div>
          </div>
        </div>

        {/* LINK HALUS DI DASAR (BUKAN TOMBOL GAMBLOK) */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-orange text-white font-mono font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border-2 border-dark shadow-[4px_4px_0px_#18181B] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
          >
            <span>Pilih 5 Paket Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
