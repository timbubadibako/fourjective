"use client";

import React, { useEffect, useRef } from "react";
import { Play } from "lucide-react";

/* 4 KARYA TERBAIK — LINK YOUTUBE (swap per-video kapan pun) */
const FILMS = [
  { title: "Aftermovie Wisuda", year: "2026" },
  { title: "Prom Night Recap", year: "2025" },
  { title: "Photoshoot Fest", year: "2025" },
  { title: "Drone Formasi", year: "2024" },
];

/* Baris sprocket Lubang Film (dipakai berulang) */
function SprocketRow({ edge, code }: { edge: "top" | "bottom"; code: string }) {
  return (
    <div
      className={`absolute left-0 right-0 z-30 flex items-center justify-between px-4 ${
        edge === "top" ? "top-0 h-8" : "bottom-0 h-8"
      }`}
    >
      <span className="font-mono text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em] text-white/25 whitespace-nowrap">
        FOURJECTIVE 4J · 35MM · {code}
      </span>
      <div className="flex-1 flex items-center justify-around mx-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="w-4 h-2.5 rounded-[3px] bg-transparent border border-white/30"
          />
        ))}
      </div>
      <span className="font-mono text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em] text-white/25 whitespace-nowrap">
        SAFETY FILM
      </span>
    </div>
  );
}

export default function ShowreelHorizontal() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let ctx: { revert: () => void } | undefined;
    let timer: ReturnType<typeof setInterval> | undefined;
    let cancelled = false;

    const build = () => {
      /* GSAP dimuat via CDN (lihat page.tsx) → tinggal dari window */
      const gsap = (window as unknown as {
        gsap?: {
          registerPlugin: (...plugins: unknown[]) => void;
          to: (
            target: unknown,
            vars: Record<string, unknown>,
            position?: unknown
          ) => unknown;
          context: (fn: () => void, scope?: unknown) => { revert: () => void };
        };
        ScrollTrigger?: unknown;
      }).gsap;
      const ScrollTrigger = window.ScrollTrigger;
      if (!gsap || !ScrollTrigger) return false;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }, section);

      return true;
    };

    if (!build()) {
      timer = setInterval(() => {
        if (cancelled || build()) {
          if (timer) clearInterval(timer);
        }
      }, 60);
    }

    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="showreel"
      className="relative w-full h-screen bg-[#0F1013] text-white overflow-hidden select-none border-b-4 border-dark flex flex-col"
    >
      {/* CAHAYA BISKOP TIPIS (proyektor dari atas, blur halus) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Beam proyektor: putih tipis miring kiri */}
        <div className="absolute -top-40 left-[8%] w-[30vw] h-[110vh] bg-gradient-to-b from-white/[0.06] to-transparent blur-3xl -rotate-[14deg]" />
        {/* Beam proyektor: oranye tipis miring kanan */}
        <div className="absolute -top-40 right-[6%] w-[26vw] h-[100vh] bg-gradient-to-b from-orange/[0.09] to-transparent blur-3xl rotate-[12deg]" />
        {/* Beam tengah: palang putih sangat tipis */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[70vw] h-[80vh] bg-gradient-to-b from-white/[0.04] to-transparent blur-2xl" />
        {/* Garis cahaya tipis: streak vertikal */}
        <div className="absolute top-0 left-[28%] w-px h-3/4 bg-gradient-to-b from-white/25 via-white/5 to-transparent -rotate-[10deg]" />
        <div className="absolute top-0 right-[22%] w-px h-2/3 bg-gradient-to-b from-orange/40 via-orange/5 to-transparent rotate-[8deg]" />
        {/* Glow lembut di tengah panggung */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[40vh] bg-orange/[0.05] rounded-full blur-[110px]" />
      </div>

      {/* HEADER: 2 BARIS MAKSIMAL, SENTRIS */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-14 sm:pt-16 pb-8 sm:pb-10 text-center shrink-0">
        <h2 className="font-playtimes text-4xl sm:text-6xl md:text-7xl leading-[1.0] drop-shadow-md">
          4 Karya Terbaik Kami,
          <br />
          <span className="text-orange">Tonton Langsung.</span>
        </h2>

        <span className="font-mono text-xs font-bold text-white/60 uppercase tracking-widest block mt-5">
          Klik Film → Putar di YouTube
        </span>
      </div>

      {/* PINNED ROLL FILM TRACK (SATU PITA FILM MELIPIR, FRAME BERTURUT) */}
      <div className="relative z-10 flex-1 flex items-center pb-14 sm:pb-16 overflow-hidden">
        <div
          ref={trackRef}
          className="flex items-center gap-0 sm:gap-1 w-max will-change-transform px-8 sm:px-16 pt-2"
        >
          {FILMS.map((f, idx) => (
            <a
              key={f.title}
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-[86vw] sm:w-[64vw] lg:w-[54vw] shrink-0 bg-[#141519] border-x border-y border-white/15 rounded-sm overflow-hidden"
            >
              {/* Sprocket Bawah (Mirror) */}
              <SprocketRow edge="bottom" code={`4J-${f.year}`} />

              {/* Sprocket Atas */}
              <SprocketRow edge="top" code={`4J-${f.year}`} />

              {/* FRAME SINEMA (jendela gelap di tengah pita) */}
              <div
                className={`relative aspect-video overflow-hidden bg-dark mx-6 sm:mx-10 ${idx % 2 === 0 ? "-rotate-1" : "rotate-1"} group-hover:rotate-0 transition-transform duration-500`}
              >
                {/* Vignette & Scanlines */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.72)_110%)] pointer-events-none z-20" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_50%,transparent_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-60" />

                {/* Play Button Oranye (Tengah Sempurna) */}
                <div className="absolute inset-0 z-30 flex items-center justify-center">
                  <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-orange text-white flex items-center justify-center border-3 border-white shadow-[0_10px_35px_rgba(255,77,0,0.5)] group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 ml-0.5 fill-white" />
                  </span>
                </div>

                {/* Nomor Frame */}
                <span className="absolute bottom-3 left-4 z-30 font-mono text-[10px] font-black text-white/40 tracking-widest">
                  FRAME {idx + 1} / 4
                </span>
              </div>

              {/* Caption Pita Film (sepertengahkan di dalam sprocket bawah) */}
              <div className="absolute bottom-0 left-0 right-0 z-40 h-8 flex items-center justify-between px-4">
                <span className="font-headline font-black text-xs sm:text-sm text-white uppercase tracking-tight group-hover:text-orange transition-colors truncate pr-2">
                  {f.title}
                </span>
                <span className="font-mono text-[10px] font-bold text-orange uppercase tracking-widest shrink-0">
                  {f.year}
                </span>
              </div>
            </a>
          ))}

          {/* Tail Sprocket Marker (Penutup pita) */}
          <div className="w-[30vw] sm:w-[14vw] shrink-0 flex items-center justify-center">
            <span className="font-playtimes text-3xl text-white/20 text-center leading-tight -rotate-3">
              The End ↓
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
