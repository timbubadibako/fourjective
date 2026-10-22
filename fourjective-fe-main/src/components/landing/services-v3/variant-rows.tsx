"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PILLARS, TICKER } from "./pilars-data";
import { DeliverableStrip, PilarArt, PointList, ReasonCards, StatsBar, Sticker, Ticker } from "./bits";

export default function VariantRows() {
  return (
    <div className="bg-surface-cream">
      <Ticker items={TICKER} />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
        {/* HEADER */}
        <div className="max-w-3xl mb-14">
          <span className="bg-dark text-accent-yellow font-mono text-[11px] font-black px-4 py-1.5 rounded-full border-2 border-dark shadow-[3px_3px_0px_#FF4D1F] uppercase inline-block mb-4">
            ✦ BUKAN CUMA 1, TAPI 4 PILAR SEKALIGUS
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-dark leading-[0.95]">
            Empat Pilar,
            <br />
            <span className="text-orange">Satu Mitra</span> Kepala Sekolah
          </h2>
          <p className="text-sm md:text-base text-zinc-700 mt-5 max-w-2xl font-medium leading-relaxed">
            Buku tahunan, acara wisuda, sesi studio foto, merchandise angkatan. Semua dikerjakan tim
            yang sama dengan satu kontrak, satu invoice, dan satu jadwal. Kamu duduk manis aja, biar
            kami yang pusing.
          </p>
        </div>

        {/* ROWS */}
        <div className="space-y-7">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            const flipped = i % 2 === 1;
            return (
              <article
                key={p.id}
                className="grid lg:grid-cols-12 rounded-[2.5rem] border-3 border-dark bg-white shadow-brutal overflow-hidden"
              >
                <div
                  className={`lg:col-span-5 relative min-h-[300px] sm:min-h-[380px] flex items-center justify-center overflow-hidden ${flipped ? "lg:order-2" : ""}`}
                  style={{ backgroundColor: p.tint }}
                >
                  <PilarArt p={p} artWidth="60%" />
                  <span className="absolute -bottom-10 -left-4 font-display font-black text-[10rem] sm:text-[13rem] leading-none text-white/10 select-none pointer-events-none">
                    {p.sticker}
                  </span>
                  <span className="absolute top-5 left-5 z-20">
                    <Sticker text={p.sticker} className="text-6xl sm:text-7xl" />
                  </span>
                  <span className="absolute bottom-5 right-5 z-20 w-10 h-10 rounded-full bg-white/15 border-2 border-white/40 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" strokeWidth={2.4} />
                  </span>
                </div>

                <div
                  className={`lg:col-span-7 p-7 sm:p-10 flex flex-col justify-center ${flipped ? "lg:order-1" : ""}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">
                      Pilar {p.sticker} / {p.tagline}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-dark leading-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm text-zinc-600 mt-3 leading-relaxed font-medium">{p.desc}</p>

                  <div className="mt-6 pt-5 border-t-2 border-dark/10">
                    <PointList points={p.points} accent={p.accent} columns />
                  </div>

                  <div className="mt-7 pt-6 border-t-2 border-dark/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex gap-6">
                      {p.facts.map((f) => (
                        <div key={f.label}>
                          <div className="font-display font-black text-2xl sm:text-3xl leading-none text-dark">
                            {f.value}
                          </div>
                          <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-bold mt-1">
                            {f.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="#calculator"
                      className="inline-flex items-center gap-2 bg-dark text-white px-5 py-3 rounded-full font-mono text-[11px] font-black uppercase tracking-widest hover:bg-orange transition-colors"
                    >
                      Hitung Estimasi
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16">
          <StatsBar />
        </div>

        <div className="mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-[11px] font-black uppercase tracking-[0.2em] text-orange block mb-2">
                ✦ Isi Paket Dalam Satu Kontrak
              </span>
              <h3 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-dark leading-none">
                Delapan Output,
                <br />
                <span className="text-zinc-400">Satu Tim yang Menjalankan</span>
              </h3>
            </div>
          </div>
          <DeliverableStrip />
        </div>

        <div className="mt-20">
          <ReasonCards />
        </div>
      </div>
    </div>
  );
}
