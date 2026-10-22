"use client";

import React from "react";

export default function OurStoryV4() {
  return (
    <section
      id="our-story"
      className="relative w-full bg-[#14161C] text-white border-b-4 border-dark overflow-hidden select-none py-10 sm:py-14 md:py-16 px-4 sm:px-8 flex items-center justify-center text-center"
    >
      <div className="relative z-10 max-w-3xl mx-auto space-y-3">
        <h2 className="font-playtimes text-3xl sm:text-5xl md:text-6xl text-white leading-[1.05] tracking-normal drop-shadow-md">
          Masa Sekolah Singkat,
          <br />
          <span className="text-orange">Memori Wajib Abadi.</span>
        </h2>

        <p className="font-mono text-[11px] sm:text-xs font-semibold text-white/60 uppercase tracking-[0.2em] max-w-md mx-auto pt-1">
          Buku tahunan yang tetap bernilai saat dibuka puluhan tahun lagi.
        </p>
      </div>
    </section>
  );
}
