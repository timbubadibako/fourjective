"use client";

import React from "react";

function SvgDoubleSlash({
  color = "#18181B",
  className = "mx-5 sm:mx-7",
}: {
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center select-none align-middle ${className}`}
      aria-hidden="true"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="inline-block"
      >
        {/* Genuine Slanted Double Slashes // in Pure Solid Black */}
        <polygon points="2,22 6.5,22 13,0 8.5,0" fill={color} />
        <polygon points="9.5,22 14,22 20.5,0 16,0" fill={color} />
      </svg>
    </span>
  );
}

function MarqueeContent() {
  return (
    <div className="flex items-center whitespace-nowrap text-dark font-display font-black text-xl sm:text-2xl md:text-3xl uppercase tracking-wider py-1">
      {/* Badge: POLICE LINE with SVG // slashes */}
      <span className="inline-flex items-center gap-2 sm:gap-2.5 bg-dark text-accent-bright px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-lg font-mono text-xs sm:text-sm font-black tracking-widest shadow-sm ml-4">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="#FFE500" aria-hidden="true">
          <polygon points="1,14 4,14 8,0 5,0" />
          <polygon points="6,14 9,14 13,0 10,0" />
        </svg>
        <span>POLICE LINE</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="#FFE500" aria-hidden="true">
          <polygon points="1,14 4,14 8,0 5,0" />
          <polygon points="6,14 9,14 13,0 10,0" />
        </svg>
      </span>

      <span className="ml-3 sm:ml-4">DO NOT CROSS &bull; FOURJECTIVE CREATIVE STUDIO</span>

      <SvgDoubleSlash />
      <span>FOURJECTIVE ARCHIVE 2026</span>

      <SvgDoubleSlash />
      <span>SPESIALIS BUKU TAHUNAN SMA &amp; SMK SE-INDONESIA</span>

      <SvgDoubleSlash />
      <span className="bg-dark text-white px-2.5 py-0.5 rounded text-base sm:text-lg font-black tracking-normal">
        ANTI-FOTO KTP
      </span>

      <SvgDoubleSlash />
      <span>EST. 2017 &bull; HQ KUNINGAN JAWA BARAT</span>

      <SvgDoubleSlash />
      <span>100% GARANSI TEPAT WAKTU SEBELUM WISUDA</span>

      <SvgDoubleSlash />
      <span>ZERO TEMPLATE BASI &bull; KAS ANGKATAN AMAN</span>

      <SvgDoubleSlash />
      <span>FREE 3D VIRTUAL FLIPBOOK SETIAP CETAK</span>

      <SvgDoubleSlash />
      <span>4K CINEMATIC DRONE AFTERMOVIE REEL</span>

      <SvgDoubleSlash />
      <span>BANDUNG &bull; BATAM &bull; BALI &bull; SAMARINDA</span>

      <SvgDoubleSlash />
    </div>
  );
}

export default function CrossLine() {
  return (
    <div className="h-[10vh] min-h-[72px] max-h-[100px] border-y-4 border-dark bg-accent-bright overflow-hidden select-none relative z-20 flex flex-col justify-between shadow-md">
      {/* Top Hazard Tape Stripe */}
      <div className="w-full h-2 bg-[repeating-linear-gradient(45deg,#18181B,#18181B_10px,#FFE500_10px,#FFE500_20px)] border-b border-dark/40" />

      {/* Marquee Infinite Stream (55s slow and legible scroll) */}
      <div className="flex-1 flex items-center overflow-hidden">
        <div
          className="marquee-track flex items-center whitespace-nowrap will-change-transform"
          style={{ animationDuration: "55s" }}
        >
          <MarqueeContent />
          <MarqueeContent />
        </div>
      </div>

      {/* Bottom Hazard Tape Stripe */}
      <div className="w-full h-2 bg-[repeating-linear-gradient(-45deg,#18181B,#18181B_10px,#FFE500_10px,#FFE500_20px)] border-t border-dark/40" />
    </div>
  );
}
