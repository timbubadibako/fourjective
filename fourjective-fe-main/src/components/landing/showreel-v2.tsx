"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Volume2, VolumeX, Sparkles, Film, ExternalLink } from "lucide-react";

export default function ShowreelV2() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      id="showreel"
      className="relative w-full py-20 px-4 md:px-8 bg-[#0A0B0E] text-white overflow-hidden select-none border-b-4 border-dark"
    >
      {/* Background Cinematic Aura */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#7C3AED]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-700 px-4 py-1.5 rounded-full font-mono text-xs uppercase text-orange font-bold mb-3">
            <Film className="w-3.5 h-3.5" />
            <span>CINEMATIC ARCHIVE REEL // 4K 60FPS</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
            BUKAN SEKADAR FOTO, <span className="text-orange">TETAPI KARYA SINEMA</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-medium max-w-lg mx-auto">
            Setiap tawa, sorak panggung pensi, dan pelukan perpisahan dirangkum dalam video dokumenter berstandar film layar lebar.
          </p>
        </div>

        {/* Video Facade Container */}
        <div className="relative w-full aspect-video max-h-[640px] rounded-[2rem] overflow-hidden border-3 border-dark shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-950 group">
          {/* Backdrop Image */}
          <Image
            src="https://cdn.prod.website-files.com/65d4758ce33eca00784c7a05/6602417b7a3303264fe482dc_ARTIKEL-2.jpg"
            alt="Cinematic Showreel Fourjective"
            fill
            className="object-cover brightness-75 group-hover:scale-105 transition-transform duration-700 ease-out"
            priority
          />

          {/* CRT scanlines effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,22,12,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

          {/* HUD Camcorder Overlay */}
          <div className="absolute inset-0 p-5 sm:p-8 flex flex-col justify-between pointer-events-none">
            <div className="flex items-center justify-between text-[11px] font-mono font-bold">
              <div className="flex items-center gap-2 bg-black/70 px-3 py-1 rounded-md border border-red-500/50 text-red-400 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>REC ● 4K 60P</span>
              </div>
              <div className="hidden sm:inline bg-black/60 px-3 py-1 rounded-md border border-white/20 text-zinc-300">
                PRORES 422 HQ
              </div>
            </div>

            {/* Bottom HUD */}
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="bg-black/60 px-3 py-1 rounded-md border border-white/20 text-emerald-400 font-bold">
                AUDIO CH 1/2 PEAK -6dB
              </div>
              <div className="bg-black/60 px-3 py-1 rounded-md border border-white/20 text-zinc-300">
                TIMECODE 00:04:21:18
              </div>
            </div>
          </div>

          {/* Central Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-orange text-white flex items-center justify-center border-3 border-dark shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
              aria-label="Tonton Showreel Lengkap"
            >
              <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1.5 fill-white" />
              <span className="absolute -bottom-8 font-mono text-[10px] font-black uppercase tracking-wider text-white whitespace-nowrap bg-dark px-2.5 py-0.5 rounded border border-white/20">
                PLAY SHOWREEL
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
