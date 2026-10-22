"use client";

import React from "react";
import Image from "next/image";

export default function PortfolioOrbit() {
  return (
    <section
      id="portfolio-orbit"
      className="relative w-full h-screen min-h-[700px] bg-[#1E9466] overflow-hidden select-none border-b-4 border-dark flex items-center justify-center"
    >
      {/* ================= ORGANIC WAVY GREEN RIBBON BACKGROUND (EXACT COLOR MATCH 5.PNG) ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Exact sampled base emerald green */}
        <div className="absolute inset-0 bg-[#1E9466]" />

        {/* Dynamic layered wavy contour ribbons matching 5.png (#167853) */}
        <svg
          className="absolute inset-0 w-full h-full object-cover"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="none"
        >
          {/* Ribbon 1: Top wave flow */}
          <path
            d="M-100,160 C300,90 600,240 1000,150 C1400,60 1700,200 2020,130 L2020,-50 L-100,-50 Z"
            fill="#167853"
            opacity="0.95"
          />
          {/* Subtle light ripple top */}
          <path
            d="M-100,210 C320,130 650,290 1020,200 C1420,110 1720,230 2020,180 L2020,130 C1700,200 1400,60 1000,150 C600,240 300,90 -100,160 Z"
            fill="#23A573"
            opacity="0.4"
          />

          {/* Ribbon 2: Upper mid-screen swell (behind left/right books in 5.png) */}
          <path
            d="M-100,380 C320,490 720,280 1140,400 C1560,520 1780,340 2020,380 L2020,260 C1780,220 1560,400 1140,280 C720,160 320,370 -100,260 Z"
            fill="#167853"
            opacity="0.95"
          />

          {/* Ribbon 3: Center lower wave ribbon */}
          <path
            d="M-100,640 C280,530 680,690 1100,580 C1480,480 1750,620 2020,570 L2020,490 C1750,540 1480,400 1100,500 C680,610 280,450 -100,560 Z"
            fill="#167853"
            opacity="0.85"
          />

          {/* Ribbon 4: Lower mid wave swell (above bottom Arcadia in 5.png) */}
          <path
            d="M-100,820 C320,930 740,730 1180,850 C1580,960 1820,810 2020,840 L2020,720 C1820,690 1580,840 1180,730 C740,610 320,810 -100,700 Z"
            fill="#167853"
            opacity="0.95"
          />
          {/* Subtle light ripple lower */}
          <path
            d="M-100,870 C340,980 760,780 1200,900 C1600,1010 1840,860 2020,890 L2020,840 C1820,810 1580,960 1180,850 C740,730 320,930 -100,820 Z"
            fill="#23A573"
            opacity="0.35"
          />

          {/* Ribbon 5: Bottom boundary sweep */}
          <path
            d="M-100,970 C360,890 820,1030 1280,940 C1640,880 1850,970 2020,940 L2020,1130 L-100,1130 Z"
            fill="#167853"
            opacity="0.98"
          />
        </svg>

        {/* Soft radial center vignette to mirror 5.png lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(16,85,57,0.35)_100%)] pointer-events-none" />
      </div>

      {/* ================= DEAD CENTER "OUR PORTFOLIO" GRAPHIC (PINNED IN PLACE) ================= */}
      <div
        id="portfolio-orbit-center"
        className="relative z-20 w-[320px] sm:w-[480px] md:w-[560px] lg:w-[620px] pointer-events-none select-none filter drop-shadow-[0_14px_28px_rgba(0,0,0,0.65)] will-change-transform"
      >
        <Image
          src="/images/our-portfolio.svg"
          alt="OUR PORTFOLIO"
          width={620}
          height={250}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      {/* ================= STREAMING 3D HARDCOVER YEARBOOK COVERS (>= 70VH SIZING) ================= */}
      <div
        id="portfolio-orbit-stage"
        className="absolute inset-0 pointer-events-none overflow-hidden z-10"
      >
        {/* BOOK 1: SMAN 5 Samarinda (LAVIARTAZ - Pixel Art Cover ala 5.png Left) */}
        <div
          id="orbit-book-1"
          className="absolute will-change-transform pointer-events-none filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.45)]"
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

        {/* BOOK 2: SMAN 5 Makassar (24 Helions - Vinyl Record Cover ala 5.png Right) */}
        <div
          id="orbit-book-2"
          className="absolute will-change-transform pointer-events-none filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.45)]"
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

        {/* BOOK 3: 2024 Arcadia SMA Mondial Batam (Forest Phoenix Theme ala 5.png Bottom) */}
        <div
          id="orbit-book-3"
          className="absolute will-change-transform pointer-events-none filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.45)]"
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

        {/* BOOK 4: SMAK Petra 1 Surabaya (Gold Foil Rigid Box) */}
        <div
          id="orbit-book-4"
          className="absolute will-change-transform pointer-events-none filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.45)]"
        >
          <Image
            src="/images/landing-page/orbit/smak_petra.png"
            alt="SMAK Petra 1 Surabaya"
            width={624}
            height={880}
            className="w-auto h-[60vh] sm:h-[68vh] md:h-[72vh] lg:h-[76vh] max-w-[88vw] object-contain select-none"
          />
        </div>

        {/* BOOK 5: MAN 1 Kota Serang (Aswara Ganesh - Stage & Moon Theme) */}
        <div
          id="orbit-book-5"
          className="absolute will-change-transform pointer-events-none filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.45)]"
        >
          <Image
            src="/images/landing-page/orbit/man_1_serang.png"
            alt="MAN 1 Kota Serang Aswara Ganesh"
            width={628}
            height={890}
            className="w-auto h-[60vh] sm:h-[68vh] md:h-[72vh] lg:h-[76vh] max-w-[88vw] object-contain select-none"
          />
        </div>

        {/* BOOK 6: SMAN 1 Nabire (Profemista - Sandglass Time Theme) */}
        <div
          id="orbit-book-6"
          className="absolute will-change-transform pointer-events-none filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.45)]"
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
