"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PILLARS, STATS, TICKER } from "./pilars-data";
import { DeliverableStrip, Sticker, StickerArt, Ticker } from "./bits";

export default function VariantPoster() {
  return (
    <div className="relative bg-brand-700 text-white overflow-hidden">
      {/* Sunburst */}
      <div className="absolute -left-40 top-1/3 w-[720px] h-[720px] opacity-25 pointer-events-none select-none">
        <svg viewBox="0 0 200 200" className="w-full h-full fill-brand-800">
          <polygon points="100,0 115,65 178,32 142,88 200,100 142,112 178,168 115,135 100,200 85,135 22,168 58,112 0,100 58,88 22,32 85,65" />
        </svg>
      </div>

      {/* Diagonal stripes */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, #FFFFFF 0px, #FFFFFF 3px, transparent 3px, transparent 26px)",
        }}
      />

      <Ticker items={TICKER} tone="blue" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-16">
        {/* HEADER */}
        <div className="text-center mb-12">
          <span className="inline-block bg-black text-brand-300 px-4 py-1.5 rounded-full font-mono text-[10px] sm:text-xs font-black uppercase tracking-widest border-2 border-white mb-5">
            ✦ BUKAN CUMA 1, TAPI 4 PILAR SEKALIGUS
          </span>
          <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl uppercase leading-[0.85] tracking-tighter">
            Empat Pilar,
            <br />
            <span className="text-brand-300">Satu Mitra</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm font-bold text-white/85 mt-4">
            Buku tahunan, event, studio, merchandise. Satu kontrak, satu tim, satu jadwal.
          </p>
        </div>

        {/* POSTER CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {PILLARS.map((p, i) => {
            const tilt = i % 2 === 0 ? "-rotate-1" : "rotate-1";
            return (
              <article
                key={p.id}
                className={`relative bg-white text-dark border-4 border-black shadow-[8px_8px_0px_0px_#0B2054] flex flex-col ${tilt} hover:rotate-0 transition-transform duration-300`}
              >
                <div
                  className="relative h-[190px] sm:h-[210px] flex items-center justify-center overflow-hidden border-b-4 border-black"
                  style={{ backgroundColor: p.tint }}
                >
                  <StickerArt p={p} className="w-[72%]" />
                  <span className="absolute top-3 left-3 z-20">
                    <Sticker text={p.sticker} className="text-5xl" stroke={2} />
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">
                    Pilar {p.sticker}
                  </span>
                  <h3 className="font-display font-black text-lg sm:text-xl uppercase tracking-tight leading-tight mt-1.5">
                    {p.title}
                  </h3>
                  <p className="text-[11px] text-zinc-600 font-medium mt-2 leading-snug">{p.desc}</p>

                  <ul className="mt-4 pt-4 border-t-2 border-black/10 space-y-2 flex-1">
                    {p.points.map((pt, idx) => (
                      <li
                        key={idx}
                        className="flex gap-2 text-[11px] text-zinc-800 font-semibold leading-snug"
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0 mt-0.5 border border-black"
                          style={{ backgroundColor: p.accent }}
                        />
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 pt-3 border-t-2 border-black/10 flex items-center justify-between">
                    <span className="font-display font-black text-xl leading-none">{p.facts[0].value}</span>
                    <Link
                      href="#calculator"
                      className="inline-flex items-center gap-1 bg-dark text-white px-3 py-1.5 rounded-full font-mono text-[9px] font-black uppercase tracking-widest hover:bg-orange transition-colors"
                    >
                      Detail <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* STATS STRIP */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/20 border-2 border-white/25 rounded-3xl overflow-hidden">
          {STATS.map((s) => (
            <div key={s.k} className="bg-brand-700 p-6 flex flex-col gap-1.5">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-brand-300 font-bold">
                {s.k}
              </span>
              <span className="font-display font-black text-4xl sm:text-5xl leading-none">{s.v}</span>
              <span className="text-[11px] text-white/70 font-medium">{s.d}</span>
            </div>
          ))}
        </div>

        {/* DELIVERABLES */}
        <div className="mt-14">
          <div className="text-center mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-300 font-bold block mb-3">
              Isi Paket Dalam Satu Kontrak
            </span>
            <h3 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight leading-none">
              Delapan Output, <span className="text-brand-300">Satu Tim</span>
            </h3>
          </div>
          <DeliverableStrip tone="light" />
        </div>
      </div>
    </div>
  );
}
