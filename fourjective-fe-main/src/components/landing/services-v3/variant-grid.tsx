"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PILLARS, TICKER } from "./pilars-data";
import {
  DeliverableStrip,
  PilarArt,
  PointList,
  ReasonCards,
  StatsBar,
  Sticker,
  Ticker,
} from "./bits";

export default function VariantGrid() {
  return (
    <div className="bg-[#FFF0E6]">
      <Ticker items={TICKER} />

      <div
        className="w-full"
        style={{
          backgroundImage:
            "linear-gradient(rgba(24,24,27,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(24,24,27,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
          {/* HEADER */}
          <div className="max-w-3xl mx-auto mb-14 text-center flex flex-col items-center">
            <span className="bg-dark text-accent-yellow font-mono text-[11px] font-black px-4 py-1.5 rounded-full border-2 border-dark shadow-[3px_3px_0px_#FF4D1F] uppercase inline-block mb-4">
              ✦ BUKAN CUMA 1, TAPI 4 PILAR SEKALIGUS
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-dark leading-[0.95]">
              Empat Pilar, <span className="text-orange">Satu Mitra</span>
              <br />
              Kepala Sekolah
            </h2>
            <p className="text-sm md:text-base text-zinc-700 mt-5 max-w-2xl font-medium leading-relaxed">
              Butuh buku tahunan, acara wisuda, sesi studio foto, sampai merchandise angkatan? Semuanya
              dikerjakan tim yang sama, dikunci dalam satu kontrak, satu invoice, dan satu jadwal. Kamu
              duduk manis aja, biar kami yang pusing.
            </p>
          </div>

          {/* 2x2 GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <article
                  key={p.id}
                  className="bg-white border-3 border-dark rounded-[2rem] shadow-brutal overflow-hidden flex flex-col"
                >
                  <div
                    className="relative h-[260px] sm:h-[300px] flex items-center justify-center overflow-hidden border-b-3 border-dark"
                    style={{ backgroundColor: p.tint }}
                  >
                    <PilarArt p={p} artWidth="60%" />
                    <span className="absolute top-4 left-5 z-20">
                      <Sticker text={p.sticker} className="text-6xl sm:text-7xl" />
                    </span>
                    <span className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/15 border-2 border-white/40 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" strokeWidth={2.4} />
                    </span>
                  </div>

                  <div className="p-7 sm:p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">
                        Pilar {p.sticker}
                      </span>
                      <span className="h-px flex-1 bg-dark/10" />
                      <span className="font-mono text-[10px] font-black uppercase tracking-wider text-zinc-400">
                        {p.tagline}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-dark leading-tight">
                      {p.title}
                    </h3>
                    <p className="text-sm text-zinc-600 mt-2.5 leading-relaxed font-medium">{p.desc}</p>

                    <div className="mt-5 pt-5 border-t-2 border-dark/10">
                      <PointList points={p.points} accent={p.accent} />
                    </div>

                    <div className="mt-6 pt-5 border-t-2 border-dark/10 flex flex-wrap items-center justify-between gap-4 mt-auto">
                      <div className="flex gap-6">
                        {p.facts.map((f) => (
                          <div key={f.label}>
                            <div className="font-display font-black text-xl sm:text-2xl leading-none text-dark">
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
                        className="inline-flex items-center gap-2 bg-dark text-white px-4 py-2.5 rounded-full font-mono text-[11px] font-black uppercase tracking-widest hover:bg-orange transition-colors"
                      >
                        Hitung Estimasi
                        <ArrowRight className="w-3.5 h-3.5" />
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
              <p className="font-mono text-xs text-zinc-500 font-medium max-w-sm">
                Semua poin di bawah bisa dipilih sendiri, atau diambil sekaligus sebagai paket All-In-One
                dengan harga yang lebih masuk akal.
              </p>
            </div>
            <DeliverableStrip />
          </div>

          <div className="mt-20">
            <ReasonCards />
          </div>
        </div>
      </div>
    </div>
  );
}
