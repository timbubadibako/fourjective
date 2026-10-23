"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { WORK_COLUMNS, type WorkItem } from "@/data/works";
import WorkCard from "@/components/site/WorkCard";

/* Buku tambahan di luar works.ts (cover Zentrift — nama sekolah tak ditampilkan) */
const ZENTRIFT_BOOK: WorkItem = {
  src: "/images/gallery/yearbook-result/new/result/result-3-optimized.png",
  alt: "Cover yearbook tema festival",
  index: "09",
  spec: "FESTIVAL THEME",
  place: "ANGKATAN 2025",
  tag: "#THEME_FESTIVAL",
  title: "Zentrift Festival",
  desc: "Konsep kelas diubah jadi dunia festival dengan cover custom illusio.",
  aspect: "aspect-[3/4]",
  tone: "navy",
};

type BookTile = { kind: "book"; work: WorkItem };
type VideoTileData = {
  kind: "video";
  src: string;
  poster: string;
  label: string;
  spec: string;
  index: string;
  place: string;
  aspect: string;
  tone: "book" | "video";
};

const ROWS: (BookTile | VideoTileData)[][] = [
  [
    { kind: "book", work: WORK_COLUMNS[0][0] }, // Mondial — LUXURY DOFF
    {
      kind: "video",
      src: "/videos/aftermovie-fourjectiv.mp4",
      poster: "/images/portofolio/3-optimized.jpeg",
      label: "AFTERMOVIE",
      spec: "4K FILM",
      index: "02",
      place: "ANGKATAN 2026",
      aspect: "aspect-[4/3]",
      tone: "video",
    },
    { kind: "book", work: WORK_COLUMNS[2][0] }, // Makassar — LINEN COVER
  ],
  [
    {
      kind: "video",
      src: "/videos/rewind-fourjectiv.mp4",
      poster: "/images/portofolio/4-optimized.jpeg",
      label: "REWIND FILM",
      spec: "B-ROLL 4K",
      index: "04",
      place: "ANGKATAN 2025",
      aspect: "aspect-[4/3]",
      tone: "video",
    },
    { kind: "book", work: WORK_COLUMNS[1][0] }, // Samarinda — FULLCOLOR ART
    {
      kind: "video",
      src: "/videos/aftermovie-fourjectiv.mp4",
      poster: "/images/portofolio/6-optimized.jpeg",
      label: "PROM NIGHT FILM",
      spec: "GALA CUT",
      index: "06",
      place: "AFTERMOVIE 2025",
      aspect: "aspect-[4/3]",
      tone: "video",
    },
  ],
  [
    { kind: "book", work: WORK_COLUMNS[1][3] }, // Petra — GOLD FOIL
    {
      kind: "video",
      src: "/videos/rewind-fourjectiv.mp4",
      poster: "/images/portofolio/2-optimized.jpeg",
      label: "SCHOOL RECAP",
      spec: "HIGHLIGHT",
      index: "08",
      place: "ANGKATAN 2024",
      aspect: "aspect-[4/3]",
      tone: "video",
    },
    { kind: "book", work: ZENTRIFT_BOOK }, // Theme festival
  ],
];

/* VIDEO TILE: muted loop, putar saat hover/tap — biar berat bundelnya hemat */
function VideoTile({ item }: { item: VideoTileData }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  };
  const stop = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    setPlaying(false);
  };

  return (
    <article className="group relative bg-white border-3 border-dark shadow-brutal hover:-translate-y-1.5 hover:shadow-brutal-lg transition-all duration-300">
      <div
        className={`relative ${item.aspect} overflow-hidden border-b-3 border-dark bg-dark`}
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% calc(100% - 26px), calc(100% - 26px) 100%, 0 100%)",
        }}
        onMouseEnter={play}
        onMouseLeave={stop}
        onTouchStart={play}
      >
        <video
          ref={videoRef}
          src={item.src}
          poster={item.poster}
          muted
          loop
          playsInline
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          preload="none"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        {/* Overlay play hint (fade saat putar) */}
        <div
          className={`absolute inset-0 z-10 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
            playing ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="w-12 h-12 rounded-full bg-orange text-white flex items-center justify-center border-3 border-white shadow-[0_8px_25px_rgba(255,77,0,0.5)]">
            <Play className="w-5 h-5 ml-0.5 fill-white" />
          </span>
        </div>
        <span className="absolute bottom-0 left-3 font-display font-black text-[64px] leading-none text-white/85 tracking-tighter pointer-events-none">
          {item.index}
        </span>
        <span className="absolute top-0 right-0 px-2.5 py-1.5 font-mono text-[10px] font-black uppercase border-b-3 border-l-3 border-dark bg-dark text-white">
          {item.spec}
        </span>
      </div>

      <div className="p-4 pt-5 flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] font-black text-orange uppercase tracking-wider">
            {item.place}
          </span>
          <span className="font-mono text-[10px] font-bold text-zinc-400">
            VIDEO
          </span>
        </div>
        <h3 className="font-display font-black text-xl uppercase tracking-tight text-dark leading-tight group-hover:text-orange transition-colors">
          {item.label}
        </h3>
        <p className="text-xs text-zinc-500 font-medium leading-snug">
          Arahkan kursor — video film langsung memutar.
        </p>
      </div>
    </article>
  );
}

export default function PortfolioV4() {
  const sectionRef = useRef<HTMLElement>(null);

  /* ANIMASI: tiap TRUK masuk dari sisi menyamping bergantian
     (baris ganjil dari kiri, genap dari kanan) mengikuti scroll */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx: { revert: () => void } | undefined;
    let timer: ReturnType<typeof setInterval> | undefined;
    let cancelled = false;

    const build = () => {
      const gsap = (window as unknown as {
        gsap?: {
          registerPlugin: (...plugins: unknown[]) => void;
          fromTo: (
            target: unknown,
            fromVars: Record<string, unknown>,
            toVars: Record<string, unknown>,
            position?: unknown
          ) => unknown;
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
        /* ANCHOR CATCH-UP: semua tile visible dari awal (tanpa fade).
           Hanya posisi vertikal tiap KOLOM yang bergeser saat scroll:
           kolom 1 statis di tempat; kolom 2 mulai JATUH JAUH lalu
           anchor-nya naik pelan sampai sejajar kolom 1; kolom 3 turun
           sedang lalu nyusul. Scroll balik ke atas → kolom kembali
           turun ke posisi awal (inherent dari scrub). */
        const cols = section.querySelectorAll("[data-col]");
        const startOffsets = [0, 340, 140];

        cols.forEach((col, i) => {
          gsap.fromTo(
            col,
            { y: startOffsets[i] ?? 0 },
            {
              y: 0,
              ease: "none",
              scrollTrigger: {
                /* Jendela scrub di dalam area terlihat: mulai saat top
                   section sudah dekat atas viewport, selesai di tengah
                   section — biar proses "naik-nyusul" kelihatan jelas */
                trigger: section,
                start: "top 15%",
                end: "center 55%",
                scrub: 0.9,
                invalidateOnRefresh: true,
              },
            }
          );
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
      id="portfolio"
      className="relative z-10 w-full py-16 sm:py-24 px-4 md:px-8 bg-orange border-b-4 border-dark overflow-hidden select-none"
      style={{
        backgroundImage:
          "linear-gradient(rgba(24,24,27,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(24,24,27,0.12) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      {/* Sunburst ghost gelap ala Traction */}
      <div
        className="absolute -right-16 -top-20 w-[340px] h-[340px] opacity-20 pointer-events-none select-none"
        aria-hidden
      >
        <svg viewBox="0 0 200 200" className="w-full h-full fill-black">
          <polygon points="100,0 115,65 178,32 142,88 200,100 142,112 178,168 115,135 100,200 85,135 22,168 58,112 0,100 58,88 22,32 85,65" />
        </svg>
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 relative z-10">
        <h2 className="font-playtimes text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.0] drop-shadow-sm">
          Karya Pilihan,
          <br />
          <span className="text-dark">Cerita Nyata.</span>
        </h2>
        <p className="font-mono text-xs sm:text-sm text-white/85 mt-4 font-semibold max-w-xl mx-auto">
          Buku &amp; film bergantian. Konsep visual orisinal tiap angkatan.
        </p>
      </div>

      {/* 3 KOLOM × 3 KOTAK (papan catur buku/video) — kolom bergeser vertikal saat scroll */}
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
        {[0, 1, 2].map((c) => (
          <div key={c} data-col className="flex flex-col gap-6 lg:gap-8">
            {ROWS.map((row) => {
              const cell = row[c];
              return cell.kind === "book" ? (
                <WorkCard key={cell.work.title} item={cell.work} hideSchool />
              ) : (
                <VideoTile key={cell.label} item={cell} />
              );
            })}
          </div>
        ))}
      </div>

      {/* KARTU PENUTUP: tombol ke Yearbook Digital */}
      <a
        href="/paket?package=yb-digital"
        className="relative z-10 max-w-7xl mx-auto mt-14 md:mt-24 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-dark text-white border-4 border-dark rounded-xl px-6 sm:px-10 py-8 shadow-[8px_10px_0px_#18181B] hover:shadow-[5px_6px_0px_#18181B] hover:translate-x-1 hover:translate-y-1 transition-all group"
      >
        <div>
          <span className="inline-flex items-center gap-1.5 bg-orange text-white font-mono text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded border-2 border-white/30 mb-3">
            ★ GRATIS · TANPA LOGIN
          </span>
          <h3 className="font-playtimes text-2xl sm:text-4xl leading-[1.05]">
            Masih Pengennya Lihat,
            <br />
            <span className="text-orange">Yearbook Digital Langsung.</span>
          </h3>
        </div>
        <div className="flex items-center gap-3 shrink-0 bg-orange text-white font-mono font-black text-xs sm:text-sm uppercase tracking-wider px-7 py-4 rounded-xl border-3 border-white/25 shadow-[4px_4px_0px_rgba(255,255,255,0.25)] group-hover:scale-105 transition-transform">
          <span>LIHAT PAKET YB DIGITAL</span>
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </a>
    </section>
  );
}
