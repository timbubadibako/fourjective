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
      {/* Background Graphic Sunburst Ghost - dinaikkan ke pojok atas agar tidak bertabrakan dengan teks */}
      <div
        className="absolute -left-20 -top-24 w-[380px] h-[380px] opacity-[0.06] pointer-events-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full fill-white">
          <polygon points="100,0 115,65 178,32 142,88 200,100 142,112 178,168 115,135 100,200 85,135 22,168 58,112 0,100 58,88 22,32 85,65" />
        </svg>
      </div>

      {/* Giant Outline Word sebagai latar - ganti teks watermark resmi */}
      <div className="absolute -bottom-4 left-0 right-0 overflow-hidden pointer-events-none z-0">
        <span className="font-playtimes text-[16vw] leading-none text-white/[0.04] whitespace-nowrap block translate-y-3">
          FOURJECTIV ORGANIZING · YEARBOOK MAKER
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-16">
        {/* KIRI: TEKS TYPO RAKSASA */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] font-black uppercase tracking-widest text-orange">
              FOURJECTIV ORGANIZING // YEARBOOK ORGANIZER INDONESIA
            </span>
            <span className="h-[2px] flex-1 bg-white/15 rounded-full" />
          </div>

          {/* 3 Baris Tegas Tanpa Auto-Wrap */}
          <h2 className="font-playtimes text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] text-white leading-[0.9] drop-shadow-md whitespace-nowrap">
            Do The Best,
            <br />
            For The
            <br />
            <span className="text-orange">Best Moment.</span>
          </h2>

          <p className="font-mono text-xs sm:text-sm font-bold text-white/75 mt-5 max-w-xl leading-relaxed">
            Fourjectiv hadir bukan hanya mencetak buku. Kami percaya, kenangan yang baik layak dirangkai dengan cara yang istimewa — dari video short movie, rewind sekolah bersama tim film profesional, hingga konsep foto yang penuh cerita.
          </p>

          {/* 2 Bullet Layanan Utama */}
          <ul className="mt-8 space-y-4">
            <li className="flex items-center gap-4">
              <span className="w-9 h-9 shrink-0 rounded-full bg-orange text-white flex items-center justify-center font-mono text-xs font-black border-2 border-dark shadow-[3px_3px_0px_#000]">
                01
              </span>
              <span className="font-headline font-black text-lg sm:text-xl text-white uppercase tracking-tight">
                Photoshoot &amp; Video Service — Indoor, Outdoor &amp; Studio Delivery.
              </span>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-9 h-9 shrink-0 rounded-full bg-white text-dark flex items-center justify-center font-mono text-xs font-black border-2 border-dark shadow-[3px_3px_0px_#000]">
                02
              </span>
              <span className="font-headline font-black text-lg sm:text-xl text-white uppercase tracking-tight">
                Sinema &amp; Rewind Sekolah — Aftermovie wisuda &amp; short film angkatan.
              </span>
            </li>
          </ul>

          {/* CTA */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => {
                const target = document.getElementById("services");
                if (target) {
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-2 bg-orange hover:bg-white hover:text-dark text-white font-mono font-black text-xs sm:text-sm uppercase tracking-wider px-7 py-4 rounded-xl border-3 border-dark shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
            >
              <span>EKSPLORASI LAYANAN &amp; PAKET</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <span className="font-mono text-xs font-bold text-white/60">
              Nol biaya tambahan — otomatis aktif di paket mana pun.
            </span>
          </div>
        </div>

        {/* KANAN: ILUSTRASI SVG BERTUMPUK RILIS (TANPA KARTU) */}
        <div className="lg:col-span-5 relative h-[300px] sm:h-[360px] hidden md:block">
          <Image
            src="/images/landing-page/our-services/photoshoot-img.svg"
            alt="Event organizer sesi foto akbar angkatan"
            width={420}
            height={300}
            className="absolute left-0 top-6 -rotate-6 w-[62%] h-auto object-contain drop-shadow-[16px_20px_40px_rgba(0,0,0,0.6)]"
          />
          <Image
            src="/images/landing-page/our-services/video-img.svg"
            alt="Penayangan video aftermovie wisuda"
            width={420}
            height={300}
            className="absolute right-0 bottom-0 rotate-3 w-[58%] h-auto object-contain drop-shadow-[16px_20px_40px_rgba(0,0,0,0.6)]"
          />
        </div>
      </div>
    </section>
  );
}
