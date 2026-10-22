"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function KawalanBanner() {
  return (
    <section
      id="kawalan"
      className="relative w-full bg-[#14161C] text-white border-y-4 border-dark overflow-hidden select-none min-h-[80vh] sm:min-h-[75vh] flex items-center"
    >
      {/* Background Graphic Sunburst Ghost */}
      <div
        className="absolute -left-24 top-1/2 -translate-y-1/2 w-[420px] h-[420px] opacity-[0.08] pointer-events-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full fill-white">
          <polygon points="100,0 115,65 178,32 142,88 200,100 142,112 178,168 115,135 100,200 85,135 22,168 58,112 0,100 58,88 22,32 85,65" />
        </svg>
      </div>

      {/* Giant Outline Word sebagai latar (ghost typografi) */}
      <div className="absolute bottom-2 left-0 right-0 overflow-hidden pointer-events-none z-0">
        <span className="font-playtimes text-[18vw] leading-none text-white/[0.07] whitespace-nowrap block translate-y-2">
          Kawalan Hari-H · Kawalan Hari-H
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-16">
        {/* KIRI: TEKS TYPO RAKSASA */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] font-black uppercase tracking-widest text-orange">
              Fourjective Organizing // Termasuk Semua Paket
            </span>
            <span className="h-[2px] flex-1 bg-white/15 rounded-full" />
          </div>

          <h2 className="font-playtimes text-5xl sm:text-7xl md:text-8xl text-white leading-[0.94] drop-shadow-md">
            Panitia Santai,
            <br />
            <span className="text-orange">Kru Kami Berangkat.</span>
          </h2>

          <p className="font-mono text-xs sm:text-sm font-bold text-white/75 mt-5 max-w-xl leading-relaxed">
            Panitia sekolah cukup fokus merangkul angkatan. Urusan pengawalan teknis lapangan
            kamilah yang menopang 2 momen paling menegangkan hari-H:
          </p>

          {/* 2 Bullet Raksasa */}
          <ul className="mt-8 space-y-4">
            <li className="flex items-center gap-4">
              <span className="w-9 h-9 shrink-0 rounded-full bg-orange text-white flex items-center justify-center font-mono text-xs font-black border-2 border-dark shadow-[3px_3px_0px_#000]">
                01
              </span>
              <span className="font-headline font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                Hari Foto Angkatan — atur rombel &amp; formasi drone.
              </span>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-9 h-9 shrink-0 rounded-full bg-white text-dark flex items-center justify-center font-mono text-xs font-black border-2 border-dark shadow-[3px_3px_0px_#000]">
                02
              </span>
              <span className="font-headline font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                Hari Wisuda — rundown &amp; tayang Aftermovie 4K.
              </span>
            </li>
          </ul>

          {/* CTA */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#services"
              className="inline-flex items-center gap-2 bg-orange hover:bg-white hover:text-dark text-white font-mono font-black text-xs sm:text-sm uppercase tracking-wider px-7 py-4 rounded-xl border-3 border-dark shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
            >
              <span>GULIR KE BAWAH</span>
              <ArrowRight className="w-4 h-4 animate-bounce" />
            </a>

            <span className="font-mono text-xs font-bold text-white/60">
              Nol biaya tambahan — otomatis aktif di paket mana pun.
            </span>
          </div>
        </div>

        {/* KANAN: ILUSTRASI SVG BERTUMPUK RILIS (TANPA KARTU) */}
        <div className="lg:col-span-5 relative h-[300px] sm:h-[360px] hidden md:block">
          <Image
            src="/images/landing-page/our-services/photoshoot-img.svg"
            alt="Kawalan hari foto angkatan"
            width={420}
            height={300}
            className="absolute left-0 top-6 -rotate-6 w-[62%] h-auto object-contain drop-shadow-[16px_20px_40px_rgba(0,0,0,0.6)]"
          />
          <Image
            src="/images/landing-page/our-services/video-img.svg"
            alt="Kawalan hari wisuda dan aftermovie"
            width={420}
            height={300}
            className="absolute right-0 bottom-0 rotate-3 w-[58%] h-auto object-contain drop-shadow-[16px_20px_40px_rgba(0,0,0,0.6)]"
          />
        </div>
      </div>
    </section>
  );
}
