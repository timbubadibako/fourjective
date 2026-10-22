"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PILLARS, STATS } from "./pilars-data";
import { DeliverableStrip, PilarArt, ReasonCards, Sticker } from "./bits";

export default function VariantMarquee() {
  const Card = ({ p }: { p: (typeof PILLARS)[number] }) => {
    const Icon = p.icon;
    return (
      <article className="w-[300px] sm:w-[340px] shrink-0 bg-[#101218] border border-white/10 rounded-3xl overflow-hidden flex flex-col">
        <div
          className="relative h-[190px] flex items-center justify-center overflow-hidden border-b border-white/10"
          style={{ backgroundColor: p.tint }}
        >
          <PilarArt p={p} artWidth="66%" />
          <span className="absolute top-3 left-3 z-20">
            <Sticker text={p.sticker} className="text-5xl" stroke={2} />
          </span>
          <span className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/25 border border-white/30 flex items-center justify-center">
            <Icon className="w-4 h-4 text-white" strokeWidth={2.4} />
          </span>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-brand-400 font-bold">
            Pilar {p.sticker}
          </span>
          <h3 className="font-display font-black text-xl uppercase tracking-tight leading-tight mt-1.5">
            {p.title}
          </h3>
          <p className="text-[11px] text-zinc-500 font-medium mt-2 leading-snug">{p.tagline}</p>
          <ul className="mt-4 space-y-1.5 flex-1">
            {p.points.slice(0, 3).map((pt, i) => (
              <li key={i} className="flex gap-2 text-[11px] text-zinc-400 font-medium leading-snug">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                  style={{ backgroundColor: p.accent }}
                />
                {pt}
              </li>
            ))}
          </ul>
          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="font-display font-black text-2xl leading-none">{p.facts[0].value}</span>
            <Link
              href="#calculator"
              className="font-mono text-[10px] font-black uppercase tracking-widest text-brand-400 hover:text-white transition-colors"
            >
              Detail →
            </Link>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="relative bg-ink-soft text-white overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-brand-700/20 rounded-full blur-[130px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* BIG SCROLLING HEADLINE */}
      <div className="relative z-10 border-y border-white/10 py-5 overflow-hidden">
        <div className="flex whitespace-nowrap font-display font-black text-5xl sm:text-7xl uppercase leading-none tracking-tighter animate-marquee">
          <span className="mx-6 text-white">Empat Pilar</span>
          <span className="mx-6 text-brand-700">✦ Satu Mitra</span>
          <span className="mx-6 text-white">Empat Pilar</span>
          <span className="mx-6 text-cyan-400">✦ Satu Mitra</span>
        </div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14 pt-14">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-400 font-bold">
              Bukan cuma 1, tapi 4 pilar sekaligus
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter leading-[0.9] mt-3">
              Satu Kontrak,
              <br />
              <span className="text-brand-400">Empat Outputs</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-400 font-medium max-w-md leading-relaxed">
            Buku tahunan, acara wisuda, sesi studio, merchandise. Dikerjakan tim yang sama, dikunci satu
            kontrak, satu invoice, satu jadwal.
          </p>
        </div>
      </div>

      {/* HORIZONTAL SCROLL CARDS */}
      <div className="relative z-10 overflow-hidden py-2">
        <div className="flex gap-5 animate-marquee" style={{ width: "max-content" }}>
          {[0, 1].map((dup) => (
            <React.Fragment key={dup}>
              {PILLARS.map((p) => (
                <Card key={`${dup}-${p.id}`} p={p} />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14 mt-14">
        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
          {STATS.map((s) => (
            <div key={s.k} className="bg-ink-soft p-6 sm:p-8 flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold">
                {s.k}
              </span>
              <span className="font-display font-black text-4xl sm:text-5xl leading-none">{s.v}</span>
              <span className="text-[11px] text-zinc-500 font-medium">{s.d}</span>
            </div>
          ))}
        </div>

        {/* DELIVERABLES */}
        <div className="mt-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-400 font-bold block mb-3">
            Isi Paket Dalam Satu Kontrak
          </span>
          <h3 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tighter leading-none mb-8">
            Delapan Output, <span className="text-brand-400">Satu Tim</span>
          </h3>
          <DeliverableStrip tone="dark" />
        </div>

        <div className="mt-16">
          <ReasonCards tone="dark" />
        </div>
      </div>
    </div>
  );
}
