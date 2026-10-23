"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

/* 4 KARYA TERBAIK — VIDEO LOKAL ASLI FOURJECTIV (PREVIEW 15 DETIK LOOP) */
const FILMS = [
  {
    title: "Aftermovie Wisuda",
    year: "2026",
    school: "SMA AL-AZHAR 5 CIREBON",
    ytUrl: "https://www.youtube.com/@fourjectiv",
    previewVideo: "/videos/aftermovie-fourjectiv.mp4",
  },
  {
    title: "Rewind Sekolah & Prom",
    year: "2025",
    school: "SMAK 8 PENABUR JAKARTA",
    ytUrl: "https://www.youtube.com/@fourjectiv",
    previewVideo: "/videos/rewind-fourjectiv.mp4",
  },
  {
    title: "Short Film Angkatan",
    year: "2025",
    school: "SMAN 1 KOTA SERANG",
    ytUrl: "https://www.youtube.com/@fourjectiv",
    previewVideo: "/videos/aftermovie-fourjectiv.mp4",
  },
  {
    title: "Photoshoot Fest & Recap",
    year: "2024",
    school: "SMAK PETRA 1 SURABAYA",
    ytUrl: "https://www.youtube.com/@fourjectiv",
    previewVideo: "/videos/rewind-fourjectiv.mp4",
  },
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
        FOURJECTIV 4J · 35MM · {code}
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

function FilmCard({ f, idx }: { f: typeof FILMS[0]; idx: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTimeUpdate = () => {
    // Kunci preview maksimal 15 detik, lalu loop kembali ke detik 0
    if (videoRef.current && videoRef.current.currentTime >= 15) {
      videoRef.current.currentTime = 0;
    }
  };

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative block w-[88vw] sm:w-[70vw] lg:w-[60vw] shrink-0 bg-[#141519] border-2 border-white/20 rounded-md shadow-2xl overflow-hidden hover:border-orange transition-all duration-300"
    >
      {/* Sprocket Bawah (Mirror) */}
      <SprocketRow edge="bottom" code={`4J-${f.year}`} />

      {/* Sprocket Atas */}
      <SprocketRow edge="top" code={`4J-${f.year}`} />

      {/* FRAME SINEMA */}
      <div
        className={`relative aspect-video overflow-hidden bg-dark mx-6 sm:mx-10 ${
          idx % 2 === 0 ? "-rotate-1" : "rotate-1"
        } group-hover:rotate-0 transition-transform duration-500`}
      >
        {/* Video Preview Elemen (Muted, Loop Max 15 Detik) */}
        <video
          ref={videoRef}
          src={f.previewVideo}
          muted
          playsInline
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          onTimeUpdate={handleTimeUpdate}
          preload="metadata"
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 ${
            isPlaying ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Thumbnail Placeholder saat belum hover */}
        <div
          className={`absolute inset-0 bg-[#18191E] flex flex-col items-center justify-center p-6 text-center transition-opacity duration-500 ${
            isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-orange mb-2">
            {f.school}
          </span>
          <h4 className="font-headline font-black text-2xl sm:text-4xl text-white tracking-tight uppercase">
            {f.title}
          </h4>
          <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest mt-2">
            Arahkan Kursor / Sentuh Layar untuk Putar
          </span>
        </div>

        {/* Vignette & Scanlines */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.8)_110%)] pointer-events-none z-20" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_50%,transparent_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-50" />

        {/* Play Button Oranye: Hilang saat video diputar */}
        <div
          className={`absolute inset-0 z-30 flex items-center justify-center pointer-events-none transition-all duration-300 ${
            isPlaying ? "opacity-0 scale-75" : "opacity-100 scale-100"
          }`}
        >
          <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-orange text-white flex items-center justify-center border-3 border-white shadow-[0_10px_35px_rgba(255,77,0,0.5)]">
            <Play className="w-6 h-6 ml-0.5 fill-white" />
          </span>
        </div>

        {/* Nomor Frame & Status Preview */}
        <div className="absolute bottom-3 left-4 right-4 z-30 flex items-center justify-between font-mono text-[10px] font-black uppercase tracking-widest">
          <span className="text-white/40">FRAME {idx + 1} / 4</span>
          {isPlaying && (
            <span className="bg-orange text-white px-2.5 py-0.5 rounded text-[9px] font-bold tracking-wider">
              ● PLAYING
            </span>
          )}
        </div>
      </div>

      {/* Caption Pita Film */}
      <div className="absolute bottom-0 left-0 right-0 z-40 h-8 flex items-center justify-between px-4">
        <span className="font-headline font-black text-xs sm:text-sm text-white uppercase tracking-tight group-hover:text-orange transition-colors truncate pr-2">
          {f.title} — {f.school}
        </span>
        <a
          href={f.ytUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] font-bold text-orange hover:underline uppercase tracking-widest shrink-0"
        >
          FULL YOUTUBE ↗
        </a>
      </div>
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
          fromTo: (
            target: unknown,
            fromVars: Record<string, unknown>,
            toVars: Record<string, unknown>,
            position?: unknown
          ) => unknown;
          set: (target: unknown, vars: Record<string, unknown>) => unknown;
          context: (fn: () => void, scope?: unknown) => { revert: () => void };
        };
        ScrollTrigger?: unknown;
      }).gsap;
      const ScrollTrigger = window.ScrollTrigger;
      if (!gsap || !ScrollTrigger) return false;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Kartu pertama persis di tengah layar saat mulai
        const cards = track.querySelectorAll(".group");
        const firstCard = cards[0] as HTMLElement;
        const lastCard = cards[cards.length - 1] as HTMLElement;

        const initialOffset = () => {
          if (!firstCard) return 0;
          return (window.innerWidth - firstCard.offsetWidth) / 2;
        };

        // Hitung jarak geser agar kartu terakhir persis di tengah layar lalu digeser sedikit ke kiri (-120px)
        const calculateTravelDistance = () => {
          if (!firstCard || !lastCard) return 1000;
          const firstCenter = firstCard.offsetLeft + firstCard.offsetWidth / 2;
          const lastCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2;
          // Jarak dari titik tengah kartu 1 ke kartu terakhir + 100px geser kiri sedikit
          return (lastCenter - firstCenter) + 100;
        };

        const startX = initialOffset();
        // Set posisi awal di tengah layar
        gsap.set(track, { x: startX });

        // Animasi geser horizontal: berhenti begitu kartu terakhir center dan lewat sedikit ke kiri
        gsap.to(track, {
          x: () => startX - calculateTravelDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${calculateTravelDistance() * 1.15}`,
            pin: true,
            scrub: 1.1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Sedikit pergerakan naik video agar semakin fokus di tengah panggung dan menutup sedikit bagian bawah teks
        gsap.fromTo(
          track,
          { y: 15 },
          {
            y: -25,
            ease: "sine.inOut",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        );
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

      {/* PINNED ROLL FILM TRACK (MULAI PERSIS DI TENGAH LAYAR) */}
      <div className="relative z-10 flex-1 flex items-center pb-10 sm:pb-14 overflow-hidden">
        <div
          ref={trackRef}
          className="flex items-center gap-4 sm:gap-6 w-max will-change-transform pt-0"
        >
          {FILMS.map((f, idx) => (
            <FilmCard key={f.title} f={f} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
