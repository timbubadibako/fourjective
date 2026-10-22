"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function HeroV2() {
  const handleScrollDown = () => {
    const nextSection = document.getElementById("traction");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ================= 100vh HERO SECTION (MASSIVE 2-LINE TYPOGRAPHY & POP-OUT STICKERS) ================= */}
      <section
        id="hero-fullscreen"
        className="relative w-full h-screen min-h-[680px] max-h-[1080px] overflow-hidden flex flex-col justify-between py-6 px-4 md:px-8 select-none bg-[#FFF8F2]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(250, 120, 35, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(250, 120, 35, 0.04) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      >
        {/* Massive 2-Line Background Typography */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 overflow-hidden select-none text-center px-1">
          <div
            id="typo-line-1"
            className="font-headline font-black text-[clamp(6.5rem,20vw,36vh)] tracking-[-0.04em] uppercase text-dark leading-[0.74] whitespace-nowrap will-change-transform"
          >
            FOURJECTIVE
          </div>
          <div
            id="typo-line-2"
            className="font-headline font-black text-[clamp(5rem,18vw,26vh)] tracking-[-0.03em] uppercase text-transparent leading-[0.76] whitespace-nowrap will-change-transform"
            style={{
              WebkitTextStroke: "4.5px #18181B",
              paintOrder: "stroke fill",
            }}
          >
            CREATIVE STUDIO
          </div>
        </div>

        {/* Top Space (Teks Do The Best Dihapus) */}
        <div className="w-full h-6 pt-2 z-20 pointer-events-none" />

        {/* Center Stage: Stiker Tengah + 4 Maskot Bersembunyi di Belakangnya */}
        <div className="relative z-10 w-full flex-1 flex items-center justify-center my-auto">
          <div
            id="hero-interactive-stage"
            className="relative w-full max-w-6xl h-[460px] sm:h-[540px] flex items-center justify-center"
          >
            {/* Stiker 1: Top-Left (Asset 8) */}
            <div
              id="sticker-tl"
              className="absolute top-1/2 left-1/2 z-10 w-40 sm:w-56 md:w-72 pointer-events-none select-none filter drop-shadow-2xl will-change-transform opacity-0"
            >
              <Image
                src="/images/loonart/hero_sticker_asset8.png"
                alt="Asset 8 Stiker Kiri Atas"
                width={288}
                height={288}
                className="w-full h-auto object-contain sticker-bob-a"
                priority
              />
            </div>

            {/* Stiker 2: Top-Right (Asset 5) */}
            <div
              id="sticker-tr"
              className="absolute top-1/2 left-1/2 z-10 w-44 sm:w-60 md:w-80 pointer-events-none select-none filter drop-shadow-2xl will-change-transform opacity-0"
            >
              <Image
                src="/images/loonart/hero_sticker_asset5.png"
                alt="Asset 5 Stiker Kanan Atas"
                width={320}
                height={320}
                className="w-full h-auto object-contain sticker-bob-b"
                priority
              />
            </div>

            {/* Stiker 3: Bottom-Left (Asset 16) */}
            <div
              id="sticker-bl"
              className="absolute top-1/2 left-1/2 z-10 w-40 sm:w-52 md:w-68 pointer-events-none select-none filter drop-shadow-2xl will-change-transform opacity-0"
            >
              <Image
                src="/images/loonart/hero_sticker_asset16.png"
                alt="Asset 16 Stiker Bawah Kiri"
                width={272}
                height={272}
                className="w-full h-auto object-contain sticker-bob-b"
                priority
              />
            </div>

            {/* Stiker 4: Bottom-Right (Asset 9) */}
            <div
              id="sticker-br"
              className="absolute top-1/2 left-1/2 z-10 w-44 sm:w-56 md:w-72 pointer-events-none select-none filter drop-shadow-2xl will-change-transform opacity-0"
            >
              <Image
                src="/images/loonart/hero_sticker_asset9.png"
                alt="Asset 9 Stiker Bawah Kanan"
                width={288}
                height={288}
                className="w-full h-auto object-contain sticker-bob-a"
                priority
              />
            </div>

            {/* Stiker Tengah Utama */}
            <div
              id="hero-center-box"
              className="relative z-20 w-[280px] sm:w-[380px] md:w-[460px] text-center select-none filter drop-shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              <Image
                src="/images/loonart/hero_center_frame48096660.png"
                alt="Fourjective Center Yearbook Stack"
                width={460}
                height={460}
                className="w-full h-auto object-contain mx-auto"
                priority
              />
            </div>
          </div>
        </div>

        {/* Bottom Centered Scroll Prompt (Tanpa Animate-Bounce Loncat) */}
        <div className="relative z-10 w-full flex items-center justify-center pb-4 sm:pb-6">
          <button
            type="button"
            onClick={handleScrollDown}
            id="hero-scroll-indicator"
            className="flex flex-col items-center gap-1.5 text-[11px] sm:text-xs font-mono font-bold text-dark/70 hover:text-dark uppercase tracking-widest select-none transition-opacity duration-300 cursor-pointer"
          >
            <span>SCROLL KE BAWAH</span>
            <div className="w-6 h-6 rounded-full border border-dark/20 flex items-center justify-center bg-white/60">
              <ArrowDown className="w-3.5 h-3.5 text-orange" />
            </div>
          </button>
        </div>
      </section>
    </>
  );
}
