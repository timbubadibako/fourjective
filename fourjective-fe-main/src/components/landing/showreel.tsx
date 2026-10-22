"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Volume2, VolumeX, Sparkles, Film, Disc } from "lucide-react";

export default function Showreel() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  return (
    <section
      id="showreel"
      className="relative w-full h-screen bg-[#08090C] text-white overflow-hidden z-20 flex items-center justify-center select-none border-b-4 border-dark"
    >
      {/* Background Ambient Dual Glow (Orange + Violet Cinematic Aura) */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-orange/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-[#7C3AED]/20 rounded-full blur-[140px] pointer-events-none" />

      {/* MAIN VIDEO CONTAINER (PINNED SCROLLTRIGGER EXPANDS TO FULLSCREEN) */}
      <div
        id="reel-frame"
        className="relative w-full h-full overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.95)] bg-black flex items-center justify-center will-change-transform border-2 border-white/20 rounded-[2.5rem]"
        style={{ transform: "scale(0.76)" }}
      >
        {/* Video Poster / Backdrop */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://cdn.prod.website-files.com/65d4758ce33eca00784c7a05/6602417b7a3303264fe482dc_ARTIKEL-2.jpg"
            alt="Cinematic Showreel"
            fill
            className="object-cover filter brightness-90 contrast-105"
            priority
          />
        </div>

        {/* CRT Scanline & Grain Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,22,12,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/70 pointer-events-none z-10" />

        {/* RETRO CAMCORDER / HANDYCAM OSD HUD */}
        <div
          id="reel-hud"
          className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 z-20 pointer-events-none"
        >
          {/* Top Camcorder Bar: Rec Blinker + Battery + Timecode */}
          <div className="flex items-center justify-between w-full font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-black/70 border border-red-500/40 backdrop-blur-md text-red-500 font-black tracking-widest uppercase">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span>● REC</span>
              </span>
              <span className="px-2.5 py-1 rounded bg-black/60 border border-white/20 text-emerald-400 font-bold hidden sm:inline">
                SP 60MIN
              </span>
              <span className="text-zinc-400 font-bold hidden md:inline">
                [||||] BATT 98%
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded bg-black/70 border border-white/20 font-bold text-accent-yellow tracking-wider">
                00:24:19:04
              </span>
              <button
                type="button"
                onClick={toggleMute}
                className="pointer-events-auto w-10 h-10 rounded-full bg-black/70 border border-white/20 backdrop-blur-md flex items-center justify-center hover:bg-orange hover:text-white transition-all cursor-pointer"
                aria-label="Toggle Audio"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-white" />
                ) : (
                  <Volume2 className="w-4 h-4 text-accent-yellow" />
                )}
              </button>
            </div>
          </div>

          {/* Optical Zoom Framing Brackets */}
          <div className="relative w-full flex items-center justify-center my-auto pointer-events-none">
            {/* Top-Left Bracket */}
            <div className="absolute -top-16 -left-4 sm:left-10 w-8 h-8 border-t-2 border-l-2 border-white/40" />
            {/* Top-Right Bracket */}
            <div className="absolute -top-16 -right-4 sm:right-10 w-8 h-8 border-t-2 border-r-2 border-white/40" />
            {/* Bottom-Left Bracket */}
            <div className="absolute -bottom-16 -left-4 sm:left-10 w-8 h-8 border-b-2 border-l-2 border-white/40" />
            {/* Bottom-Right Bracket */}
            <div className="absolute -bottom-16 -right-4 sm:right-10 w-8 h-8 border-b-2 border-r-2 border-white/40" />

            {/* Center Play Controller */}
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <button
                type="button"
                onClick={togglePlay}
                className="pointer-events-auto group relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-orange hover:bg-white text-white hover:text-dark flex items-center justify-center shadow-[0_0_35px_rgba(255,85,0,0.8)] transition-all duration-300 transform hover:scale-110 cursor-pointer border-4 border-white/30"
                aria-label="Play Showreel"
              >
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1 transition-transform group-hover:scale-105" />
                <div className="absolute -inset-2 rounded-full border-2 border-orange/40 pointer-events-none opacity-50" />
              </button>

              <div className="space-y-1">
                <span className="font-mono text-[10px] tracking-widest text-accent-yellow font-black uppercase px-2.5 py-0.5 rounded bg-black/60 border border-accent-yellow/40">
                  ✦ 4K CINEMA TEASER &bull; DCI-P3 COLOR GRADE
                </span>
                <h3 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white drop-shadow-md">
                  AFTERMOVIE REEL ANGKATAN
                </h3>
                <p className="font-mono text-xs text-zinc-300 font-medium">
                  Anti-cinematic nikahan &bull; Murni visual rave &amp; high-school energy 2000-an
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Camcorder Bar: Audio Levels + Timestamp */}
          <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
            <div className="flex items-center gap-3">
              <span className="text-orange font-bold flex items-center gap-1.5">
                <Disc className="w-3.5 h-3.5 animate-spin-slow" />
                <span>3840 x 2160 &bull; 60 FPS</span>
              </span>
              <span className="hidden sm:inline text-zinc-500">
                CH-1 [||||||||||..] CH-2 [||||||||||..]
              </span>
            </div>

            <div className="flex items-center gap-2 text-accent-yellow font-bold">
              <span>DATE: &apos;04 09 26</span>
              <span className="text-zinc-500 hidden sm:inline">&bull; 4:3 SENSOR CROP</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
