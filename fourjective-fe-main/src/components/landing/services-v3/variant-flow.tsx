"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PILLARS } from "./pilars-data";
import { DeliverableStrip, PointList, ReasonCards, StatsBar } from "./bits";

export default function VariantFlow() {
  return (
    <div className="bg-surface-bright">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
        {/* HEADER */}
        <div className="max-w-3xl mx-auto mb-16 text-center flex flex-col items-center">
          <span className="bg-dark text-accent-yellow font-mono text-[11px] font-black px-4 py-1.5 rounded-full border-2 border-dark shadow-[3px_3px_0px_#FF4D1F] uppercase inline-block mb-4">
            ✦ SATU ALUR, EMPAT PILAR
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-dark leading-[0.95]">
            Dari Pre-Event Sampai
            <br />
            <span className="text-orange">Buku Ada di Tangan</span>
          </h2>
          <p className="text-sm md:text-base text-zinc-700 mt-5 max-w-2xl font-medium leading-relaxed">
            Kita susun alurnya bareng committee sekolah. Empat pilar ini saling nyambung, jadi tidak ada
            pekerjaan yang menggantung di tahap berikutnya.
          </p>
        </div>

        {/* FLOW */}
        <div className="relative">
          {/* connector line */}
          <div className="hidden lg:block absolute left-0 right-0 top-[46px] h-[3px] bg-dark/15" />
          <div
            className="hidden lg:block absolute left-0 top-[46px] h-[3px] bg-orange"
            style={{ width: "75%" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={p.id} className="relative flex flex-col items-center lg:items-stretch">
                  {/* node */}
                  <div className="flex items-center gap-4 lg:flex-col lg:items-center lg:gap-0 w-full">
                    <div
                      className="relative w-[92px] h-[92px] shrink-0 rounded-full flex items-center justify-center border-4 border-dark shadow-brutal"
                      style={{ backgroundColor: p.accent }}
                    >
                      <span className="font-display font-black text-4xl leading-none text-white">
                        {p.num}
                      </span>
                      <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-dark flex items-center justify-center border-2 border-white">
                        <Icon className="w-4 h-4 text-accent-yellow" strokeWidth={2.4} />
                      </span>
                    </div>
                    <div className="lg:mt-5 lg:text-center flex-1">
                      <span className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">
                        {p.sticker}
                      </span>
                      <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-dark leading-tight mt-1">
                        {p.title}
                      </h3>
                    </div>
                  </div>

                  {/* card */}
                  <div className="mt-6 w-full bg-white border-3 border-dark rounded-[1.75rem] shadow-brutal p-6 flex flex-col flex-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
                      {p.tagline}
                    </span>
                    <p className="text-xs text-zinc-600 mt-3 leading-relaxed font-medium">{p.desc}</p>

                    <div className="mt-5 pt-4 border-t-2 border-dark/10">
                      <PointList points={p.points} accent={p.accent} />
                    </div>

                    <div className="mt-5 pt-4 border-t-2 border-dark/10 flex items-center justify-between mt-auto">
                      <span className="font-display font-black text-2xl leading-none text-dark">
                        {p.facts[0].value}
                      </span>
                      <Link
                        href="#calculator"
                        className="inline-flex items-center gap-1.5 bg-dark text-white px-3.5 py-2 rounded-full font-mono text-[10px] font-black uppercase tracking-widest hover:bg-orange transition-colors"
                      >
                        Detail <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* STATS */}
        <div className="mt-16">
          <StatsBar tone="light" />
        </div>

        {/* DELIVERABLES */}
        <div className="mt-20">
          <div className="text-center mb-8">
            <span className="font-mono text-[11px] font-black uppercase tracking-[0.2em] text-orange block mb-2">
              ✦ Isi Paket Dalam Satu Kontrak
            </span>
            <h3 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-dark leading-none">
              Delapan Output, <span className="text-zinc-400">Satu Tim</span>
            </h3>
          </div>
          <DeliverableStrip />
        </div>

        {/* WHY */}
        <div className="mt-20">
          <ReasonCards tone="light" />
        </div>
      </div>
    </div>
  );
}
