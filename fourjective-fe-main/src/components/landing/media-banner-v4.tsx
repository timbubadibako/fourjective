"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function MediaBannerV4() {
  return (
    <section
      id="media-banner"
      className="relative w-full bg-orange text-white overflow-hidden select-none py-12 sm:py-16 px-4 sm:px-8 border-b-4 border-dark"
    >
      {/* Tekstur grid halus (papernya gelap tipis di atas oranye) */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.6) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Sunburst ghost gelap seperti section Traction */}
      <div
        className="absolute -right-20 -top-24 w-[360px] h-[360px] opacity-20 pointer-events-none select-none"
        aria-hidden
      >
        <svg viewBox="0 0 200 200" className="w-full h-full fill-black">
          <polygon points="100,0 115,65 178,32 142,88 200,100 142,112 178,168 115,135 100,200 85,135 22,168 58,112 0,100 58,88 22,32 85,65" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="max-w-2xl">
          <h3 className="font-playtimes text-4xl sm:text-5xl md:text-6xl leading-[1.0] drop-shadow-sm">
            Pegang Langsung,
            <br />
            <span className="text-dark">Buktikan Kualitasnya.</span>
          </h3>
          <p className="font-mono text-xs sm:text-sm text-white/85 mt-3 font-semibold">
            Sampel fisiknya diantar langsung ke sekolahmu.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
          <div className="bg-[#FFFDF9] text-dark border-2 border-dark rounded-xl px-5 py-3.5 shadow-[4px_4px_0px_#18181B]">
            <span className="font-mono text-[10px] uppercase tracking-widest text-dark/60 font-black block">
              SAMPEL FISIK
            </span>
            <span className="font-display font-black text-2xl text-dark leading-none mt-1">
              READY STOK
            </span>
          </div>

          <a
            href="https://wa.me/6289657008080?text=Halo%20Fourjective!%20Sekolah%20kami%20ingin%20request%20sampel%20buku%20fisik"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white hover:bg-[#FFF3EC] text-dark font-mono font-black text-xs sm:text-sm uppercase tracking-wider px-7 py-4 rounded-xl border-3 border-dark shadow-[4px_4px_0px_#18181B] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
          >
            <span>REQUEST SAMPEL FISIK</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
