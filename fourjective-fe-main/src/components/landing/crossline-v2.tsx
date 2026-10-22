"use client";

import React from "react";

function SvgSparkleBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-2 bg-dark text-accent-bright px-3.5 py-1 rounded-lg font-mono text-xs sm:text-sm font-black tracking-widest shadow-sm ml-4 select-none">
      <span className="text-orange">✦</span>
      <span>{text}</span>
      <span className="text-orange">✦</span>
    </span>
  );
}

function SvgDivider() {
  return (
    <span className="inline-flex items-center mx-5 sm:mx-7 select-none" aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 22 22" fill="none" className="inline-block">
        <polygon points="2,22 6.5,22 13,0 8.5,0" fill="#18181B" />
        <polygon points="9.5,22 14,22 20.5,0 16,0" fill="#18181B" />
      </svg>
    </span>
  );
}

function MarqueeStream() {
  return (
    <div className="flex items-center whitespace-nowrap text-dark font-display font-black text-lg sm:text-xl md:text-2xl uppercase tracking-wider py-1">
      <SvgSparkleBadge text="PREMIUM DIGITAL YEARBOOK" />
      <span className="ml-3 sm:ml-4">FOURJECTIVE CREATIVE STUDIO</span>

      <SvgDivider />
      <span>FREE 3D VIRTUAL FLIPBOOK SEUMUR HIDUP</span>

      <SvgDivider />
      <span className="bg-dark text-white px-3 py-0.5 rounded text-sm sm:text-base font-black">
        GARANSI 100% SEBELUM WISUDA
      </span>

      <SvgDivider />
      <span>4K CINEMATIC DRONE AFTERMOVIE</span>

      <SvgDivider />
      <span>CETAK OFFSET MESIN HEIDELBERG JERMAN</span>

      <SvgDivider />
      <SvgSparkleBadge text="ANTI-FOTO KTP" />
      <span className="ml-3 sm:ml-4">350+ KONSEP FOTO ARTISTIK</span>

      <SvgDivider />
      <span>KAS ANGKATAN TRANSPARAN &amp; NOL BIAYA SILUMAN</span>

      <SvgDivider />
      <span>EST. 2017 &bull; JABODETABEK &bull; JAWA BARAT &bull; SELURUH INDONESIA</span>

      <SvgDivider />
    </div>
  );
}

export default function CrossLineV2() {
  return (
    <aside
      aria-label="Informasi Keunggulan Fourjective"
      className="h-[9vh] min-h-[64px] max-h-[88px] border-y-4 border-dark bg-accent-bright overflow-hidden select-none relative z-20 flex flex-col justify-between shadow-md"
    >
      {/* Top Graphic Accent Stripe */}
      <div className="w-full h-1.5 bg-[repeating-linear-gradient(45deg,#18181B,#18181B_10px,#FFE500_10px,#FFE500_20px)] border-b border-dark/30" />

      {/* Marquee Infinite Stream */}
      <div className="flex-1 flex items-center overflow-hidden">
        <div
          className="marquee-track flex items-center whitespace-nowrap will-change-transform"
          style={{ animationDuration: "50s" }}
        >
          <MarqueeStream />
          <MarqueeStream />
        </div>
      </div>

      {/* Bottom Graphic Accent Stripe */}
      <div className="w-full h-1.5 bg-dark" />
    </aside>
  );
}
