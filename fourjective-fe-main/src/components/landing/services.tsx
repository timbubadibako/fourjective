"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Services() {
  const handleServiceTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(8px)`;
  };

  const resetServiceTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
  };

  return (
    <section
      id="services"
      className="relative w-full py-24 px-4 md:px-8 border-b-4 border-dark select-none bg-[#FFF0E6] overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(24, 24, 27, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(24, 24, 27, 0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header Lockup */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <span className="bg-dark text-accent-yellow font-mono text-xs font-black px-4 py-1.5 rounded-full border-2 border-dark shadow-[3px_3px_0px_#FF4D1F] uppercase inline-block mb-3">
            ✦ BUKAN CUMA 1, TAPI 4 SERVICE SEKALIGUS!
          </span>

          {/* Graphic Logo Header (OUR SERVICES) */}
          <div className="relative w-full max-w-md sm:max-w-xl md:max-w-2xl h-24 sm:h-32 md:h-36 my-2 filter drop-shadow-[4px_6px_0px_rgba(24,24,27,0.18)] flex items-center justify-center">
            <Image
              src="/images/our-services.png"
              alt="OUR SERVICES"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h2 className="sr-only">OUR SERVICES</h2>

          <p className="text-sm md:text-base text-zinc-700 mt-3 max-w-xl font-medium leading-relaxed">
            Dari awal konsep, sesi photoshoot seru di berbagai lokasi, sampai cetak fisik dan pesta kelulusan.
          </p>
        </div>

        {/* 2x2 Staggered Offset Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-4">
        
        {/* KOLOM KIRI */}
        <div className="flex flex-col gap-8">
          
          {/* Card 1: 01. Yearbook Production */}
          <div
            className="perspective-card preserve-3d relative rounded-[2.5rem] border-3 border-dark bg-white p-7 shadow-xl cursor-pointer min-h-[470px] flex flex-col justify-between -rotate-1 hover:rotate-0 overflow-hidden"
            onMouseMove={handleServiceTilt}
            onMouseLeave={resetServiceTilt}
          >
            {/* Metallic Corner Rivets */}
            <div className="absolute top-3 left-4 w-2 h-2 rounded-full bg-zinc-400 border border-dark flex items-center justify-center text-[6px] font-mono text-zinc-800">✕</div>
            <div className="absolute top-3 right-4 w-2 h-2 rounded-full bg-zinc-400 border border-dark flex items-center justify-center text-[6px] font-mono text-zinc-800">✕</div>
            <div className="absolute bottom-3 left-4 w-2 h-2 rounded-full bg-zinc-400 border border-dark flex items-center justify-center text-[6px] font-mono text-zinc-800">✕</div>
            <div className="absolute bottom-3 right-4 w-2 h-2 rounded-full bg-zinc-400 border border-dark flex items-center justify-center text-[6px] font-mono text-zinc-800">✕</div>

            {/* Scotch Tape & Floating Sticker */}
            <div className="scotch-tape -top-2 left-12 rotate-[-5deg] opacity-80" />
            <div className="translate-z-20 absolute -top-5 -right-4 w-20 pointer-events-none z-30 sticker-bob-a filter drop-shadow-xl">
              <Image
                src="/images/loonart/hero_sticker_asset5.png"
                alt="Sticker 5"
                width={80}
                height={80}
                className="w-full h-auto"
              />
            </div>

            <div className="preserve-3d pt-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-orange/15 border-2 border-dark font-mono text-[11px] font-black uppercase text-dark">
                  01 &bull; YEARBOOK PRODUCTION
                </span>
                <span className="holo-foil text-white text-[9px] font-mono font-black px-2.5 py-0.5 rounded-full border border-dark shadow-sm uppercase">
                  CORE SERVICE ✦
                </span>
              </div>

              {/* 3D Floating Book Spine Box */}
              <div className="translate-z-12 my-6 flex items-center justify-center h-36">
                <div className="w-32 h-36 rounded-2xl bg-orange border-2 border-dark p-3.5 flex flex-col justify-between text-white shadow-xl rotate-3">
                  <div className="flex items-center justify-between text-[9px] font-mono font-bold">
                    <span>EDISI 2026</span>
                    <span>✦</span>
                  </div>
                  <div className="font-display font-black text-sm uppercase leading-tight">
                    BOUND BY<br />THREAD
                  </div>
                  <div className="h-1.5 w-full bg-white/40 rounded-full" />
                </div>
              </div>

              <h3 className="translate-z-12 font-display font-black text-2xl uppercase tracking-tight text-dark mt-2 leading-tight">
                01. Yearbook Production
              </h3>
              <p className="text-xs font-medium text-zinc-600 mt-2 leading-relaxed">
                Konsep kreatif yang bikin pangling, dari sesi photoshoot sinematik sampai buku fisik hardcover jahit benang &amp; 3D flipbook selesai.
              </p>
            </div>

            <div className="translate-z-12 pt-4 border-t-2 border-dark/15 flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-zinc-500 font-mono text-[10px]">#SERIAL: FJ-YEARBOOK-01</span>
              <div className="flex items-center gap-1 text-orange font-black">
                <span>PELAJARI DETAIL</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 3: 03. Creative Studio Shoot */}
          <div
            className="perspective-card preserve-3d relative rounded-[2.5rem] border-3 border-dark bg-white p-7 shadow-xl cursor-pointer min-h-[470px] flex flex-col justify-between -rotate-1 hover:rotate-0 overflow-hidden"
            onMouseMove={handleServiceTilt}
            onMouseLeave={resetServiceTilt}
          >
            {/* Metallic Corner Rivets */}
            <div className="absolute top-3 left-4 w-2 h-2 rounded-full bg-zinc-400 border border-dark flex items-center justify-center text-[6px] font-mono text-zinc-800">✕</div>
            <div className="absolute top-3 right-4 w-2 h-2 rounded-full bg-zinc-400 border border-dark flex items-center justify-center text-[6px] font-mono text-zinc-800">✕</div>
            <div className="absolute bottom-3 left-4 w-2 h-2 rounded-full bg-zinc-400 border border-dark flex items-center justify-center text-[6px] font-mono text-zinc-800">✕</div>
            <div className="absolute bottom-3 right-4 w-2 h-2 rounded-full bg-zinc-400 border border-dark flex items-center justify-center text-[6px] font-mono text-zinc-800">✕</div>

            <div className="scotch-tape -top-2 left-12 rotate-[4deg] opacity-80" />
            <div className="translate-z-20 absolute -top-5 -right-4 w-20 pointer-events-none z-30 sticker-bob-a filter drop-shadow-xl">
              <Image
                src="/images/loonart/hero_sticker_asset16.png"
                alt="Sticker 16"
                width={80}
                height={80}
                className="w-full h-auto"
              />
            </div>

            <div className="preserve-3d pt-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-accent-lilac border-2 border-dark font-mono text-[11px] font-black uppercase text-dark">
                  03 &bull; CREATIVE STUDIO
                </span>
                <span className="holo-foil text-white text-[9px] font-mono font-black px-2.5 py-0.5 rounded-full border border-dark shadow-sm uppercase">
                  PHOTO LAB ✦
                </span>
              </div>

              <div className="translate-z-12 my-6 flex items-center justify-center h-36">
                <div className="w-32 h-36 rounded-2xl bg-accent-lilac border-2 border-dark p-3.5 flex flex-col justify-between text-dark shadow-xl rotate-3">
                  <div className="flex items-center justify-between text-[9px] font-mono font-bold">
                    <span>CREATIVE LAB</span>
                    <span>✦</span>
                  </div>
                  <div className="font-display font-black text-sm uppercase leading-tight">
                    AUTHENTIC<br />MOODBOARD
                  </div>
                  <div className="h-1.5 w-full bg-dark rounded-full" />
                </div>
              </div>

              <h3 className="translate-z-12 font-display font-black text-2xl uppercase tracking-tight text-dark mt-2 leading-tight">
                03. Creative Studio Shoot
              </h3>
              <p className="text-xs font-medium text-zinc-600 mt-2 leading-relaxed">
                Sesi foto angkatan di studio berstandar tinggi. Foto grup, wisuda, 350+ tema konsep, dan editorial lookbook siswa.
              </p>
            </div>

            <div className="translate-z-12 pt-4 border-t-2 border-dark/15 flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-zinc-500 font-mono text-[10px]">#SERIAL: FJ-STUDIO-03</span>
              <div className="flex items-center gap-1 text-orange font-black">
                <span>PELAJARI DETAIL</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>

        {/* KOLOM KANAN (STAGGERED OFFSET DOWN PADA LAYAR BESAR) */}
        <div className="flex flex-col gap-8 lg:translate-y-16">
          
          {/* Card 2: 02. Event & Prom Night */}
          <div
            className="perspective-card preserve-3d relative rounded-[2.5rem] border-3 border-dark bg-white p-7 shadow-xl cursor-pointer min-h-[470px] flex flex-col justify-between rotate-1 hover:rotate-0 overflow-hidden"
            onMouseMove={handleServiceTilt}
            onMouseLeave={resetServiceTilt}
          >
            {/* Metallic Corner Rivets */}
            <div className="absolute top-3 left-4 w-2 h-2 rounded-full bg-zinc-400 border border-dark flex items-center justify-center text-[6px] font-mono text-zinc-800">✕</div>
            <div className="absolute top-3 right-4 w-2 h-2 rounded-full bg-zinc-400 border border-dark flex items-center justify-center text-[6px] font-mono text-zinc-800">✕</div>
            <div className="absolute bottom-3 left-4 w-2 h-2 rounded-full bg-zinc-400 border border-dark flex items-center justify-center text-[6px] font-mono text-zinc-800">✕</div>
            <div className="absolute bottom-3 right-4 w-2 h-2 rounded-full bg-zinc-400 border border-dark flex items-center justify-center text-[6px] font-mono text-zinc-800">✕</div>

            <div className="scotch-tape -top-2 right-12 rotate-[-6deg] opacity-80" />
            <div className="translate-z-20 absolute -top-5 -left-4 w-20 pointer-events-none z-30 sticker-bob-b filter drop-shadow-xl">
              <Image
                src="/images/loonart/hero_sticker_asset8.png"
                alt="Sticker 8"
                width={80}
                height={80}
                className="w-full h-auto"
              />
            </div>

            <div className="preserve-3d pt-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-accent-yellow border-2 border-dark font-mono text-[11px] font-black uppercase text-dark">
                  02 &bull; EVENT &amp; PROM NIGHT
                </span>
                <span className="holo-foil text-white text-[9px] font-mono font-black px-2.5 py-0.5 rounded-full border border-dark shadow-sm uppercase">
                  MOMENTS ✦
                </span>
              </div>

              <div className="translate-z-12 my-6 flex items-center justify-center h-36">
                <div className="w-32 h-36 rounded-2xl bg-accent-yellow border-2 border-dark p-3.5 flex flex-col justify-between text-dark shadow-xl -rotate-2">
                  <div className="flex items-center justify-between text-[9px] font-mono font-bold">
                    <span>PARTY NIGHT</span>
                    <span>✦ LIVE</span>
                  </div>
                  <div className="font-display font-black text-sm uppercase leading-tight">
                    STAGE &amp;<br />AFTERMOVIE
                  </div>
                  <div className="h-1.5 w-full bg-dark rounded-full" />
                </div>
              </div>

              <h3 className="translate-z-12 font-display font-black text-2xl uppercase tracking-tight text-dark mt-2 leading-tight">
                02. Event &amp; Prom Night
              </h3>
              <p className="text-xs font-medium text-zinc-600 mt-2 leading-relaxed">
                Perencanaan dan dokumentasi malam kelulusan paripurna. Stage lighting, photobooth cetak instan, &amp; cinematic aftermovie.
              </p>
            </div>

            <div className="translate-z-12 pt-4 border-t-2 border-dark/15 flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-zinc-500 font-mono text-[10px]">#SERIAL: FJ-EVENT-02</span>
              <div className="flex items-center gap-1 text-orange font-black">
                <span>PELAJARI DETAIL</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 4: 04. Tri Color Print & Merch */}
          <div
            className="perspective-card preserve-3d relative rounded-[2.5rem] border-3 border-dark bg-white p-7 shadow-xl cursor-pointer min-h-[470px] flex flex-col justify-between rotate-1 hover:rotate-0 overflow-hidden"
            onMouseMove={handleServiceTilt}
            onMouseLeave={resetServiceTilt}
          >
            {/* Metallic Corner Rivets */}
            <div className="absolute top-3 left-4 w-2 h-2 rounded-full bg-zinc-400 border border-dark flex items-center justify-center text-[6px] font-mono text-zinc-800">✕</div>
            <div className="absolute top-3 right-4 w-2 h-2 rounded-full bg-zinc-400 border border-dark flex items-center justify-center text-[6px] font-mono text-zinc-800">✕</div>
            <div className="absolute bottom-3 left-4 w-2 h-2 rounded-full bg-zinc-400 border border-dark flex items-center justify-center text-[6px] font-mono text-zinc-800">✕</div>
            <div className="absolute bottom-3 right-4 w-2 h-2 rounded-full bg-zinc-400 border border-dark flex items-center justify-center text-[6px] font-mono text-zinc-800">✕</div>

            <div className="scotch-tape -top-2 right-12 rotate-[7deg] opacity-80" />
            <div className="translate-z-20 absolute -top-5 -right-4 w-20 pointer-events-none z-30 sticker-bob-b filter drop-shadow-xl">
              <Image
                src="/images/loonart/hero_sticker_asset9.png"
                alt="Sticker 9"
                width={80}
                height={80}
                className="w-full h-auto"
              />
            </div>

            <div className="preserve-3d pt-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-accent-mint border-2 border-dark font-mono text-[11px] font-black uppercase text-dark">
                  04 &bull; PRINT &amp; MERCH
                </span>
                <span className="holo-foil text-white text-[9px] font-mono font-black px-2.5 py-0.5 rounded-full border border-dark shadow-sm uppercase">
                  PRINTING ✦
                </span>
              </div>

              <div className="translate-z-12 my-6 flex items-center justify-center h-36">
                <div className="w-32 h-36 rounded-2xl bg-accent-mint border-2 border-dark p-3.5 flex flex-col justify-between text-dark shadow-xl -rotate-2">
                  <div className="flex items-center justify-between text-[9px] font-mono font-bold">
                    <span>CUSTOM PACK</span>
                    <span>✦ MERCH</span>
                  </div>
                  <div className="font-display font-black text-sm uppercase leading-tight">
                    TRI COLOR<br />PRINTING
                  </div>
                  <div className="h-1.5 w-full bg-dark rounded-full" />
                </div>
              </div>

              <h3 className="translate-z-12 font-display font-black text-2xl uppercase tracking-tight text-dark mt-2 leading-tight">
                04. Tri Color Print &amp; Merch
              </h3>
              <p className="text-xs font-medium text-zinc-600 mt-2 leading-relaxed">
                Percetakan buku hard-cover, pop-up 3D, spot UV, box packaging kustom, jaket, dan merchandise angkatan.
              </p>
            </div>

            <div className="translate-z-12 pt-4 border-t-2 border-dark/15 flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-zinc-500 font-mono text-[10px]">#SERIAL: FJ-PRINT-04</span>
              <div className="flex items-center gap-1 text-orange font-black">
                <span>PELAJARI DETAIL</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
);
}
