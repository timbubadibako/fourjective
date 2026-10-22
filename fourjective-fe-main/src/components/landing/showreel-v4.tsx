"use client";

import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";

export default function ShowreelV4() {
  return (
    <section
      id="showreel"
      className="relative w-full bg-[#22252C] text-white overflow-hidden select-none border-b-4 border-dark py-16 sm:py-20 px-4 sm:px-8"
    >
      {/* Subtle Studio Lighting Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* HEADER: CLEAN (TANPA CHIP & TANPA FILLER TEKS) */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="font-playtimes text-4xl sm:text-6xl md:text-7xl leading-[1.05] tracking-normal drop-shadow-md">
            Bukan Sekadar Foto,
            <br />
            <span className="text-orange">Tapi Karya Sinema.</span>
          </h2>
        </div>

        {/* FILM STRIP FRAME (ID PENTING UNTUK GSAP PINNED EXPAND) */}
        <div className="relative">
          {/* Sprocket Rails (Kiri & Kanan) */}
          <div className="absolute -left-2 sm:-left-4 top-0 bottom-0 w-4 sm:w-6 rounded-full bg-dark border border-white/15 hidden sm:flex flex-col justify-around items-center py-3 z-20">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="w-2.5 h-2.5 rounded-[3px] bg-white/20" />
            ))}
          </div>
          <div className="absolute -right-2 sm:-right-4 top-0 bottom-0 w-4 sm:w-6 rounded-full bg-dark border border-white/15 hidden sm:flex flex-col justify-around items-center py-3 z-20">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="w-2.5 h-2.5 rounded-[3px] bg-white/20" />
            ))}
          </div>

          <div
            id="reel-frame"
            className="relative w-full aspect-video max-h-[640px] rounded-2xl sm:rounded-[2rem] overflow-hidden border-3 sm:border-4 border-white/20 shadow-[0_24px_70px_rgba(0,0,0,0.65)] bg-dark group"
          >
            <Image
              src="https://cdn.prod.website-files.com/65d4758ce33eca00784c7a05/6602417b7a3303264fe482dc_ARTIKEL-2.jpg"
              alt="Cinematic Showreel Fourjective"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover brightness-[0.7] saturate-[1.1] group-hover:scale-105 group-hover:brightness-85 transition-all duration-700 ease-out"
              priority
            />

            {/* Subtle Vignette & Scanlines */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.65)_100%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

            {/* CAMERA HUD (ID GSAP UNTUK ANIMASI PIN) */}
            <div id="reel-hud" className="absolute inset-0 p-5 sm:p-8 flex flex-col justify-between pointer-events-none">
              <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                <div className="flex items-center gap-2 bg-black/75 px-3 py-1.5 rounded-md border border-red-500/50 text-red-400 uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>REC ● 4K 60P</span>
                </div>
                <div className="hidden sm:inline-block bg-black/60 px-3 py-1 rounded-md border border-white/20 text-white/80">
                  SONY FX CINEMA LINE
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono">
                <div className="bg-black/60 px-3 py-1 rounded-md border border-white/20 text-orange font-bold">
                  AUDIO PEAK -6dB
                </div>
                <div className="bg-black/60 px-3 py-1 rounded-md border border-white/20 text-white/80">
                  PRORES 422 HQ
                </div>
              </div>
            </div>

            {/* PLAY BUTTON (ORANYE FOURJECTIVE) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-orange text-white flex items-center justify-center border-3 border-white shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
                aria-label="Tonton Showreel Lengkap"
              >
                <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1.5 fill-white" />
                <span className="absolute -bottom-8 font-mono text-[10px] font-black uppercase tracking-wider text-white whitespace-nowrap bg-black px-2.5 py-0.5 rounded border border-white/20">
                  PUTAR VIDEO
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* FOOTER SPEC STRIP */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { k: "Resolusi", v: "4K 60FPS" },
            { k: "Kamera", v: "Sony FX-Line" },
            { k: "Udara", v: "Drone Berlisensi" },
            { k: "Durasi", v: "10–15 Menit" },
          ].map((s) => (
            <div
              key={s.k}
              className="bg-[#1A1C22] border border-white/10 rounded-xl px-5 py-3.5 flex flex-col gap-1 shadow-sm"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-orange font-bold">
                {s.k}
              </span>
              <span className="font-display font-black text-lg sm:text-xl text-white">
                {s.v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
