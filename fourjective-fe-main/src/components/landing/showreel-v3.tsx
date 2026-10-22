"use client";

import React from "react";
import Image from "next/image";
import { Play, Sparkles, Film } from "lucide-react";

export default function ShowreelV3() {
  return (
    <section
      id="showreel"
      className="relative w-full bg-brand-950 text-white overflow-hidden select-none border-b-4 border-dark py-16 sm:py-20"
    >
      {/* Blue aura */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-brand-700/40 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-cyan-400/25 rounded-full blur-[130px] pointer-events-none" />

      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-black/40 border border-white/20 px-4 py-1.5 rounded-full font-mono text-xs uppercase text-brand-300 font-bold mb-3">
            <Film className="w-3.5 h-3.5" />
            <span>CINEMATIC ARCHIVE REEL // 4K 60FPS</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tighter leading-[0.95]">
            Bukan Sekadar Foto,{" "}
            <span className="text-brand-300 block sm:inline">Tapi Karya Sinema</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 mt-3 font-medium max-w-lg mx-auto">
            Setiap tawa, sorak panggung pensi, dan pelukan perpisahan dirangkum dalam video dokumenter
            berstandar film layar lebar.
          </p>
        </div>

        {/* FILM STRIP FRAME */}
        <div className="relative">
          {/* sprocket rails */}
          <div className="absolute -left-2 sm:-left-4 top-0 bottom-0 w-4 sm:w-6 rounded-full bg-black border border-white/15 hidden sm:flex flex-col justify-around items-center py-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="w-2.5 h-2.5 rounded-[3px] bg-white/20" />
            ))}
          </div>
          <div className="absolute -right-2 sm:-right-4 top-0 bottom-0 w-4 sm:w-6 rounded-full bg-black border border-white/15 hidden sm:flex flex-col justify-around items-center py-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="w-2.5 h-2.5 rounded-[3px] bg-white/20" />
            ))}
          </div>

          <div
            id="reel-frame"
            className="relative w-full aspect-video max-h-[640px] rounded-[2rem] overflow-hidden border-3 border-white/20 shadow-[0_24px_70px_rgba(0,0,0,0.65)] bg-ink-soft group"
          >
            <Image
              src="https://cdn.prod.website-files.com/65d4758ce33eca00784c7a05/6602417b7a3303264fe482dc_ARTIKEL-2.jpg"
              alt="Cinematic Showreel Fourjective"
              fill
              className="object-cover brightness-[0.6] saturate-[1.15] group-hover:scale-105 group-hover:brightness-75 transition-all duration-700 ease-out"
              priority
            />

            {/* blue duotone wash */}
            <div className="absolute inset-0 bg-brand-700/20 mix-blend-color pointer-events-none" />

            {/* scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(10,20,50,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

            {/* HUD */}
            <div id="reel-hud" className="absolute inset-0 p-5 sm:p-8 flex flex-col justify-between pointer-events-none">
              <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                <div className="flex items-center gap-2 bg-black/70 px-3 py-1 rounded-md border border-red-500/50 text-red-400 uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>REC ● 4K 60P</span>
                </div>
                <div className="hidden sm:inline bg-black/60 px-3 py-1 rounded-md border border-white/20 text-zinc-300">
                  PRORES 422 HQ
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono">
                <div className="bg-black/60 px-3 py-1 rounded-md border border-white/20 text-brand-400 font-bold">
                  AUDIO CH 1/2 PEAK -6dB
                </div>
                <div className="bg-black/60 px-3 py-1 rounded-md border border-white/20 text-zinc-300">
                  TIMECODE 00:04:21:18
                </div>
              </div>
            </div>

            {/* PLAY */}
            <div className="absolute inset-0 flex items-center justify-center">
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-brand-700 text-white flex items-center justify-center border-3 border-white/30 shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
                aria-label="Tonton Showreel Lengkap"
              >
                <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1.5 fill-white" />
                <span className="absolute -bottom-8 font-mono text-[10px] font-black uppercase tracking-wider text-white whitespace-nowrap bg-black px-2.5 py-0.5 rounded border border-white/20">
                  PLAY SHOWREEL
                </span>
              </a>
            </div>

            {/* corner sticker */}
            <span className="absolute top-4 right-4 z-20 hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] font-black uppercase tracking-widest text-white bg-black/60 border border-white/20 px-2.5 py-1 rounded-full">
              <Sparkles className="w-3 h-3 text-brand-300" />
              Our Masterpiece
            </span>
          </div>
        </div>

        {/* FOOTER STRIP */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/15 border border-white/15 rounded-2xl overflow-hidden">
          {[
            { k: "Resolusi", v: "4K 60FPS" },
            { k: "Kamera", v: "Sony FX-line" },
            { k: "Udara", v: "Drone 4K" },
            { k: "Durasi", v: "10-15 Menit" },
          ].map((s) => (
            <div key={s.k} className="bg-brand-950 px-5 py-4 flex flex-col gap-1">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-brand-400 font-bold">
                {s.k}
              </span>
              <span className="font-display font-black text-lg sm:text-xl leading-none text-white">
                {s.v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
