"use client";

import React from "react";
import Image from "next/image";

export default function PortfolioOrbitV4() {
  return (
    <section
      id="portfolio-orbit"
      className="relative w-full h-screen min-h-[700px] bg-[#121318] overflow-hidden select-none border-b-4 border-dark flex items-center justify-center"
    >
      {/* ================= ORGANIC WAVY RIBBON BACKGROUND (DARK STUDIO PALETTE) ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Base deep studio dark */}
        <div className="absolute inset-0 bg-[#121318]" />

        {/* Layered wavy contour ribbons in dark slate / charcoal */}
        <svg
          className="absolute inset-0 w-full h-full object-cover"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="none"
        >
          {/* Ribbon 1: Top wave flow */}
          <path
            d="M-100,160 C300,90 600,240 1000,150 C1400,60 1700,200 2020,130 L2020,-50 L-100,-50 Z"
            fill="#181A20"
            opacity="0.95"
          />
          {/* Subtle warm ripple top */}
          <path
            d="M-100,210 C320,130 650,290 1020,200 C1420,110 1720,230 2020,180 L2020,130 C1700,200 1400,60 1000,150 C600,240 300,90 -100,160 Z"
            fill="#FF4D00"
            opacity="0.12"
          />

          {/* Ribbon 2: Upper mid-screen swell */}
          <path
            d="M-100,380 C320,490 720,280 1140,400 C1560,520 1780,340 2020,380 L2020,260 C1780,220 1560,400 1140,280 C720,160 320,370 -100,260 Z"
            fill="#1B1E26"
            opacity="0.95"
          />

          {/* Ribbon 3: Center lower wave ribbon */}
          <path
            d="M-100,640 C280,530 680,690 1100,580 C1480,480 1750,620 2020,570 L2020,490 C1750,540 1480,400 1100,500 C680,610 280,450 -100,560 Z"
            fill="#16181F"
            opacity="0.85"
          />

          {/* Ribbon 4: Lower mid wave swell */}
          <path
            d="M-100,820 C320,930 740,730 1180,850 C1580,960 1820,810 2020,840 L2020,720 C1820,690 1580,840 1180,730 C740,610 320,810 -100,700 Z"
            fill="#1B1E26"
            opacity="0.95"
          />

          {/* Ribbon 5: Bottom boundary sweep */}
          <path
            d="M-100,970 C360,890 820,1030 1280,940 C1640,880 1850,970 2020,940 L2020,1130 L-100,1130 Z"
            fill="#0F1015"
            opacity="0.98"
          />
        </svg>

        {/* Soft center vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
      </div>

      {/* ================= DEAD CENTER WORDMARK (PINNED GSAP TARGET) ================= */}
      <div
        id="portfolio-orbit-center"
        className="relative z-20 w-[320px] sm:w-[480px] md:w-[560px] lg:w-[620px] pointer-events-none select-none will-change-transform"
      >
        <div className="text-center">
          <h2
            className="font-playtimes leading-[0.88] tracking-normal text-white text-[clamp(3.5rem,10vw,7.5rem)] drop-shadow-lg"
          >
            Arsip Karya,
            <br />
            <span className="text-orange">2017 — 2026.</span>
          </h2>
        </div>
      </div>

      {/* ================= STREAMING 3D HARDCOVER YEARBOOK COVERS (GSAP ORBIT TARGETS) ================= */}
      <div
        id="portfolio-orbit-stage"
        className="absolute inset-0 pointer-events-none overflow-hidden z-10"
      >
        {/* BOOK 1: SMAN 5 Samarinda (Laviartaz) */}
        <div
          id="orbit-book-1"
          className="absolute will-change-transform pointer-events-none filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)]"
        >
          <Image
            src="/images/landing-page/orbit/sman_5_samarinda.png"
            alt="SMAN 5 Samarinda Laviartaz"
            width={616}
            height={872}
            className="w-auto h-[60vh] sm:h-[68vh] md:h-[72vh] lg:h-[76vh] max-w-[88vw] object-contain select-none"
            priority
          />
        </div>

        {/* BOOK 2: SMAN 5 Makassar (24 Helions) */}
        <div
          id="orbit-book-2"
          className="absolute will-change-transform pointer-events-none filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)]"
        >
          <Image
            src="/images/landing-page/orbit/sman_5_makassar.png"
            alt="SMAN 5 Makassar 24 Helions"
            width={636}
            height={900}
            className="w-auto h-[60vh] sm:h-[68vh] md:h-[72vh] lg:h-[76vh] max-w-[88vw] object-contain select-none"
            priority
          />
        </div>

        {/* BOOK 3: 2024 Arcadia SMA Mondial Batam */}
        <div
          id="orbit-book-3"
          className="absolute will-change-transform pointer-events-none filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)]"
        >
          <Image
            src="/images/landing-page/orbit/sma_mondial.png"
            alt="2024 Arcadia SMA Mondial Batam"
            width={636}
            height={900}
            className="w-auto h-[60vh] sm:h-[68vh] md:h-[72vh] lg:h-[76vh] max-w-[88vw] object-contain select-none"
            priority
          />
        </div>

        {/* BOOK 4: SMAK Petra 1 Surabaya */}
        <div
          id="orbit-book-4"
          className="absolute will-change-transform pointer-events-none filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)]"
        >
          <Image
            src="/images/landing-page/orbit/smak_petra.png"
            alt="SMAK Petra 1 Surabaya"
            width={624}
            height={880}
            className="w-auto h-[60vh] sm:h-[68vh] md:h-[72vh] lg:h-[76vh] max-w-[88vw] object-contain select-none"
          />
        </div>

        {/* BOOK 5: MAN 1 Kota Serang */}
        <div
          id="orbit-book-5"
          className="absolute will-change-transform pointer-events-none filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)]"
        >
          <Image
            src="/images/landing-page/orbit/man_1_serang.png"
            alt="MAN 1 Kota Serang Aswara Ganesh"
            width={628}
            height={890}
            className="w-auto h-[60vh] sm:h-[68vh] md:h-[72vh] lg:h-[76vh] max-w-[88vw] object-contain select-none"
          />
        </div>

        {/* BOOK 6: SMAN 1 Nabire */}
        <div
          id="orbit-book-6"
          className="absolute will-change-transform pointer-events-none filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)]"
        >
          <Image
            src="/images/landing-page/orbit/sman_1_nabire.png"
            alt="SMAN 1 Nabire Profemista"
            width={616}
            height={875}
            className="w-auto h-[60vh] sm:h-[68vh] md:h-[72vh] lg:h-[76vh] max-w-[88vw] object-contain select-none"
          />
        </div>
      </div>
    </section>
  );
}
