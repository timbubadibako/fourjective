"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

/* 12 FOTO HASIL — tinggi VARIATIF ala Pinterest (nggak disamain, kolom
   boleh beda tinggi + ada gap); urutan datang (arrive) = ping-pong kolom:
   kiri 1 → tetangga 1 → kiri 2 → dst. */
const SHOTS: {
  src: string;
  label: string;
  /** tinggi bervariasi ala Pinterest (vh) */
  h: string;
  tilt: string;
  /** urutan datang (ping-pong antar kolom) */
  arrive: number;
  hidden?: string;
}[] = [
  /* Kolom 1 */
  { src: "/images/portofolio/1-optimized.jpeg", label: "ANGKATAN 01", h: "h-[18vh]", tilt: "-rotate-2", arrive: 0 },
  {
    src: "/images/gallery/yearbook-result/new/result/result-1-optimized.png",
    label: "YEARBOOK ART",
    h: "h-[14vh]",
    tilt: "rotate-1",
    arrive: 4,
  },
  { src: "/images/portofolio/2-optimized.jpeg", label: "PANGGUNG WISUDA", h: "h-[20vh]", tilt: "rotate-2", arrive: 8 },
  /* Kolom 2 */
  {
    src: "/images/gallery/yearbook-result/barbie-optimized.png",
    label: "MURID BARBIE",
    h: "h-[15vh]",
    tilt: "-rotate-1",
    arrive: 1,
  },
  { src: "/images/portofolio/3-optimized.jpeg", label: "DRONE PASS", h: "h-[20vh]", tilt: "rotate-1", arrive: 5 },
  {
    src: "/images/gallery/yearbook-result/black-optimized.png",
    label: "SET GELAP",
    h: "h-[12vh]",
    tilt: "-rotate-2",
    arrive: 9,
  },
  /* Kolom 3 */
  {
    src: "/images/gallery/yearbook-result/new/result/result-2-optimized.png",
    label: "STUDIO SET",
    h: "h-[18vh]",
    tilt: "rotate-1",
    arrive: 2,
    hidden: "hidden sm:block",
  },
  {
    src: "/images/gallery/yearbook-result/downtown-optimized.png",
    label: "OOTD KELAS",
    h: "h-[24vh]",
    tilt: "-rotate-1",
    arrive: 6,
    hidden: "hidden sm:block",
  },
  {
    src: "/images/gallery/yearbook-result/new/result/result-3-optimized.png",
    label: "KELAS 4K",
    h: "h-[16vh]",
    tilt: "rotate-2",
    arrive: 10,
    hidden: "hidden sm:block",
  },
  /* Kolom 4 */
  { src: "/images/portofolio/4-optimized.jpeg", label: "AFTERMOVIE", h: "h-[20vh]", tilt: "rotate-2", arrive: 3, hidden: "hidden sm:block" },
  {
    src: "/images/gallery/yearbook-result/zombie-optimized.png",
    label: "THEME ZOMBIE",
    h: "h-[13vh]",
    tilt: "-rotate-1",
    arrive: 7,
    hidden: "hidden sm:block",
  },
  {
    src: "/images/gallery/yearbook-result/new/result/result-4-optimized.png",
    label: "COVER BUKU",
    h: "h-[18vh]",
    tilt: "-rotate-2",
    arrive: 11,
    hidden: "hidden sm:block",
  },
];

export default function GalleryMasonry() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

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
          timeline: (vars?: Record<string, unknown>) => {
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
          };
          context: (fn: () => void, scope?: unknown) => { revert: () => void };
        };
        ScrollTrigger?: unknown;
      }).gsap;
      const ScrollTrigger = window.ScrollTrigger;
      if (!gsap || !ScrollTrigger) return false;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        /* Urutkan foto sesuai urutan DATANG (baris demi baris, kiri→kanan),
           bukan urutan DOM (yang mengikuti alur kolom CSS) */
        const ordered = Array.from(grid.querySelectorAll<HTMLElement>("[data-shot]")).sort(
          (a, b) =>
            Number(a.dataset.arrive) - Number(b.dataset.arrive)
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          ordered,
          /* Mulai: jauh di bawah viewport, miring kacau */
          {
            y: () => window.innerHeight * 1.15,
            rotate: (i: number) => (i % 2 ? 14 : -14),
            opacity: 0,
          },
          {
            /* Berakhir: berlabuh rapi ke slot Pinterest */
            y: 0,
            rotate: (i: number) => (i % 2 ? 1 : -1),
            opacity: 1,
            ease: "power2.out",
            stagger: { each: 0.55 },
            duration: 3,
          }
        );

        /* HOLD: semua foto tersusun — biarkan papan nongkrong
           sejenak sebelum pin rilis (anti-loncat ke arsip karya) */
        tl.to({}, { duration: 1.8 });
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
      id="galeri"
      className="relative w-full h-screen bg-[#FAF6F0] text-dark overflow-hidden select-none border-b-4 border-dark px-4 sm:px-8"
      style={{
        backgroundImage:
          "linear-gradient(rgba(24, 24, 27, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(24, 24, 27, 0.035) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      {/* HEADER RINGKAS */}
      <div className="relative z-20 max-w-7xl mx-auto pt-10 sm:pt-14 text-center">
        <h3 className="font-playtimes text-3xl sm:text-5xl md:text-6xl leading-[1.0] drop-shadow-sm">
          Foto Berdatangan,
          <br />
          <span className="text-orange">Tersusun Jadi Cerita.</span>
        </h3>
      </div>

      {/* MASONRY GRID (ala Pinterest, tinggi acak tapi bawah sejajar) */}
      <div className="relative z-10 max-w-7xl mx-auto h-[62vh] sm:h-[64vh] mt-6 sm:mt-8 flex items-center">
        <div
          ref={gridRef}
          className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4 w-full [column-fill:_balance]"
        >
          {SHOTS.map((s) => (
            <div
              key={s.label}
              data-shot
              data-arrive={s.arrive}
              className={`relative mb-3 sm:mb-4 break-inside-avoid ${s.hidden ?? ""} ${s.tilt}`}
            >
              <div
                className={`relative w-full ${s.h} bg-white border-2 border-dark rounded-md overflow-hidden shadow-[4px_5px_0px_#18181B]`}
              >
                <Image
                  src={s.src}
                  alt={s.label}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 24vw"
                  className="object-cover"
                />
                {/* Stamp label di pojok */}
                <span className="absolute bottom-1.5 left-1.5 z-10 bg-dark/85 text-white font-mono text-[8px] sm:text-[9px] font-black tracking-widest px-1.5 py-0.5 rounded-sm">
                  {s.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Papan label bawah */}
      <div className="relative z-20 max-w-7xl mx-auto pb-8 flex justify-center">
        <span className="font-mono text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-dark/50">
          Shot by Fourjective · Dipilih Panitia
        </span>
      </div>
    </section>
  );
}
