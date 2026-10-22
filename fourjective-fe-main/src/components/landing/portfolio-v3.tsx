"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { WORK_COLUMNS, WORK_TAGS } from "@/data/works";
import WorkCard from "@/components/site/WorkCard";
import { WA_MESSAGES, waLink } from "@/lib/site";

export default function PortfolioV3() {
  return (
    <section
      id="portfolio"
      className="relative w-full py-20 sm:py-24 px-4 md:px-8 bg-paper border-b-4 border-dark overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(24,24,27,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(24,24,27,0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      {/* Section Header Lockup */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 relative">
        <div>
          <span className="bg-dark text-brand-300 font-mono text-xs font-black px-4 py-1.5 rounded-full border-2 border-dark shadow-sm uppercase inline-block">
            ✦ SELECTED WORKS &bull; 2017 &ndash; 2026
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight mt-4 text-dark leading-[0.92]">
            OUR FINEST{" "}
            <span className="text-brand-700 underline decoration-wavy decoration-brand-400 decoration-4">
              YEARBOOK
            </span>{" "}
            STORIES
          </h2>
          <p className="text-sm md:text-base text-zinc-600 mt-3 font-medium max-w-xl leading-relaxed">
            Nol template basi. Setiap angkatan punya konsep visual autentik yang dirancang dari nol,
            didampingi pengarah gaya profesional, dan dicetak dengan standar album museum.
          </p>
        </div>

        {/* Quick Moodboard Concept Tags */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-brand-700 text-white border-2 border-dark font-mono text-xs font-black uppercase shadow-sm">
            ✦ ALL ARCHIVES
          </span>
          {WORK_TAGS.map((t) => (
            <span
              key={t.label}
              className={`px-3 py-1.5 rounded-full border-2 font-mono text-xs font-bold uppercase transition-colors cursor-pointer ${t.tone}`}
            >
              {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* 3-COLUMN STAGGERED IRREGULAR GRID (GSAP PARALLAX TARGETS) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start relative">
        <div id="portfolio-col-1" className="flex flex-col gap-8 will-change-transform">
          {WORK_COLUMNS[0].map((item) => (
            <WorkCard key={item.title} item={item} />
          ))}
        </div>

        <div
          id="portfolio-col-2"
          className="flex flex-col gap-8 md:translate-y-20 lg:translate-y-28 will-change-transform"
        >
          {WORK_COLUMNS[1].map((item) => (
            <WorkCard key={item.title} item={item} />
          ))}
        </div>

        <div
          id="portfolio-col-3"
          className="flex flex-col gap-8 md:translate-y-10 lg:translate-y-14 will-change-transform"
        >
          {WORK_COLUMNS[2].map((item) => (
            <WorkCard key={item.title} item={item} />
          ))}
        </div>
      </div>

      {/* BOTTOM SAMPLE REQUEST POSTER */}
      <div className="max-w-7xl mx-auto mt-20 relative overflow-hidden bg-ink-soft border-3 border-dark rounded-[2rem] shadow-brutal-lg">
        {/* Sunburst */}
        <div
          className="absolute -right-24 -top-32 w-[460px] h-[460px] opacity-[0.07] pointer-events-none"
          aria-hidden
        >
          <svg viewBox="0 0 200 200" className="w-full h-full fill-white">
            <polygon points="100,0 115,65 178,32 142,88 200,100 142,112 178,168 115,135 100,200 85,135 22,168 58,112 0,100 58,88 22,32 85,65" />
          </svg>
        </div>
        {/* Diagonal stripes */}
        <div
          className="absolute inset-x-0 top-0 h-2 opacity-60"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, #1D4ED8 0px, #1D4ED8 10px, #0B0C0F 10px, #0B0C0F 22px)",
          }}
        />

        <div className="relative p-8 sm:p-10 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 text-center lg:text-left">
          <div>
            <span className="font-mono text-xs font-black text-brand-300 uppercase tracking-wider block mb-2">
              ✦ PENASARAN DENGAN KUALITAS FISIK KAMI?
            </span>
            <h3 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white leading-[0.95]">
              Request Buku Sampel Fisik
              <br className="hidden sm:block" /> Langsung Ke Sekolah Anda
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-lg mx-auto lg:mx-0">
              Kami kirimkan paket sampel hardcover, sample art paper, dan packaging box asli agar komite
              kelas bisa pegang langsung!
            </p>
          </div>
          <a
            href={waLink(WA_MESSAGES.sample)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-accent-yellow text-dark font-display font-black text-base hover:bg-white transition-all transform hover:scale-[1.03] border-2 border-dark shadow-[4px_4px_0px_#1D4ED8]"
          >
            <span>KIRIM SAMPEL GRATIS</span>
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>

        <div className="relative flex items-center justify-center gap-2 pb-6 text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest">
          <Sparkles className="w-3 h-3 text-brand-700" />
          <span>Arsip terbatas — tiap angkatan punya satu cerita</span>
        </div>
      </div>
    </section>
  );
}
