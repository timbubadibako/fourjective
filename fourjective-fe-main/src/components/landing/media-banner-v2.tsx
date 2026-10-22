"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function MediaBannerV2() {
  return (
    <section
      id="media-banner"
      className="relative w-full overflow-hidden select-none border-b-4 border-dark"
    >
      {/* Top Graphic Stripe */}
      <div className="relative w-full h-4 bg-[#15803D] border-b-2 border-dark" />

      {/* Main Banner Body */}
      <div className="relative w-full bg-[#3730A3] py-8 sm:py-10 px-4 sm:px-8 md:px-14 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
        <div className="relative z-10 max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-accent-bright text-dark font-mono text-[11px] font-black px-3 py-1 rounded-full border-2 border-dark mb-2 uppercase">
            <span>✦ KARYA DOKUMENTASI TERVERIFIKASI</span>
          </div>
          <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight leading-tight">
            INGIN LIHAT KARYA CETAK FISIK ASLI KAMI?
          </h3>
          <p className="text-xs sm:text-sm text-indigo-200 mt-1 font-medium">
            Jadwalkan kunjungan tim Fourjective ke sekolah Anda untuk melihat &amp; memegang langsung dummy sampel buku tahunan hardcover.
          </p>
        </div>

        <div className="relative z-10 flex-shrink-0">
          <a
            href="https://wa.me/6281234567890?text=Halo%20Fourjective!%20Sekolah%20kami%20ingin%20request%20sampel%20buku%20fisik"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent-bright text-dark font-headline font-black text-xs sm:text-sm uppercase px-6 py-3.5 rounded-2xl border-2 border-dark shadow-brutal hover:bg-white transition-all"
          >
            <span>REQUEST SAMPEL FISIK</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
