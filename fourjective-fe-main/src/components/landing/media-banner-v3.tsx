"use client";

import React from "react";
import { ArrowUpRight, Package } from "lucide-react";

export default function MediaBannerV3() {
  return (
    <section
      id="media-banner"
      className="relative w-full overflow-hidden select-none border-b-4 border-dark"
    >
      {/* Top Graphic Stripe */}
      <div className="relative w-full h-4 bg-brand-700 border-b-2 border-dark">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, #93C5FD 0px, #93C5FD 8px, transparent 8px, transparent 22px)",
          }}
        />
      </div>

      {/* Main Banner Body */}
      <div className="relative w-full bg-brand-700 py-10 sm:py-12 px-4 sm:px-8 md:px-14 overflow-hidden">
        {/* dekorasi */}
        <div className="absolute -right-20 -top-24 w-[360px] h-[360px] opacity-25 pointer-events-none select-none" aria-hidden>
          <svg viewBox="0 0 200 200" className="w-full h-full fill-brand-800">
            <polygon points="100,0 115,65 178,32 142,88 200,100 142,112 178,168 115,135 100,200 85,135 22,168 58,112 0,100 58,88 22,32 85,65" />
          </svg>
        </div>
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, #FFFFFF 0px, #FFFFFF 3px, transparent 3px, transparent 26px)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-black text-brand-300 font-mono text-[11px] font-black px-3 py-1 rounded-full border-2 border-white/50 mb-3 uppercase">
              <Package className="w-3.5 h-3.5" />
              <span>✦ KARYA DOKUMENTASI TERVERIFIKASI</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight leading-[0.95]">
              Ingin Lihat Karya Cetak Fisik Asli Kami?
            </h3>
            <p className="text-xs sm:text-sm text-brand-200 mt-2 font-medium">
              Jadwalkan kunjungan tim Fourjective ke sekolah Anda, lihat dan pegang langsung dummy
              sampel buku tahunan hardcover.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
            <div className="bg-black/40 border border-white/25 rounded-2xl px-5 py-4 backdrop-blur-sm">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-300 font-bold block">
                Sampel ready
              </span>
              <span className="font-display font-black text-2xl text-white leading-none mt-1">000+</span>
            </div>
            <a
              href="https://wa.me/6281234567890?text=Halo%20Fourjective!%20Sekolah%20kami%20ingin%20request%20sampel%20buku%20fisik"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent-yellow text-dark font-headline font-black text-xs sm:text-sm uppercase px-6 py-4 rounded-2xl border-2 border-dark shadow-brutal hover:bg-white transition-all"
            >
              <span>Request Sampel Fisik</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
