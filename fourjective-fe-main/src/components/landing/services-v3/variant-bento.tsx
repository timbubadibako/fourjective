"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PILLARS, STATS } from "./pilars-data";
import { DeliverableStrip, PilarArt, ReasonCards } from "./bits";

export default function VariantBento() {
  const [first, ...rest] = PILLARS;

  return (
    <div className="relative bg-ink-soft text-white overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-brand-700/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-cyan-400/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14 py-20 sm:py-24">
        {/* MEGA HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/15 font-mono text-xs uppercase font-bold text-brand-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Fourjective Service Architecture // All-In-One</span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
            Est. 2017 — 2026
          </span>
        </div>

        <div className="py-12 sm:py-16">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-brand-400 font-bold">
            Bukan cuma 1, tapi 4 pilar sekaligus
          </span>
          <h2 className="font-display font-black leading-[0.8] tracking-tighter uppercase mt-4">
            <span className="block text-[clamp(3rem,10vw,9rem)] text-white">Four Pillars</span>
            <span className="block text-[clamp(1.75rem,5vw,4.5rem)] text-brand-400">
              One School, One Contract
            </span>
          </h2>
          <p className="text-sm text-zinc-400 font-medium mt-6 max-w-2xl leading-relaxed">
            Buku tahunan, acara wisuda, sesi studio foto, merchandise angkatan. Dikerjakan tim yang
            sama, dikunci satu kontrak, satu invoice, satu jadwal. Kamu duduk manis, kami yang pusing.
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* FEATURED */}
          <article className="lg:col-span-2 lg:row-span-2 relative bg-gradient-to-br from-ink-raised to-ink-soft border border-white/10 rounded-[2rem] overflow-hidden flex flex-col">
            <div className="relative h-[300px] sm:h-[380px] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0" style={{ backgroundColor: first.tint, opacity: 0.35 }} />
              <PilarArt p={first} artWidth="52%" />
              <span className="absolute top-6 left-6 font-mono text-[10px] font-black tracking-[0.3em] text-brand-400">
                01 / FEATURED
              </span>
            </div>
            <div className="p-7 sm:p-9 flex flex-col flex-1 border-t border-white/10">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-400 font-bold">
                {first.tagline}
              </span>
              <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tighter mt-2 leading-[0.95]">
                {first.title}
              </h3>
              <p className="text-sm text-zinc-400 font-medium mt-3 leading-relaxed">{first.desc}</p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {first.points.map((pt, i) => (
                  <li key={i} className="flex gap-2 text-[11px] text-zinc-300 font-medium leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-700 shrink-0 mt-1.5" />
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-8">
                  {first.facts.map((f) => (
                    <div key={f.label}>
                      <div className="font-display font-black text-3xl leading-none">{f.value}</div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-bold mt-1">
                        {f.label}
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href="#calculator"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-700 text-white font-headline font-bold text-xs uppercase tracking-widest hover:bg-[#1E40AF] transition-colors"
                >
                  Hitung Estimasi <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </article>

          {/* OTHERS */}
          {rest.map((p) => (
            <article
              key={p.id}
              className="relative bg-gradient-to-br from-ink-raised to-ink-soft border border-white/10 rounded-[2rem] p-7 sm:p-8 flex flex-col justify-between overflow-hidden group hover:border-brand-700/60 transition-colors"
            >
              <div
                className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                style={{ backgroundColor: p.accent, opacity: 0.25 }}
              />
              <div className="relative flex items-center justify-between">
                <span className="font-mono text-[10px] font-black tracking-[0.3em] text-zinc-600">
                  {p.num} / {p.sticker}
                </span>
                <span className="w-2 h-2 rounded-full bg-brand-700" />
              </div>
              <div className="relative mt-8">
                <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight leading-[0.95]">
                  {p.title}
                </h3>
                <p className="text-[11px] text-zinc-500 font-medium mt-2.5 leading-snug">{p.tagline}</p>
                <ul className="mt-4 space-y-1.5">
                  {p.points.slice(0, 2).map((pt, i) => (
                    <li key={i} className="flex gap-2 text-[11px] text-zinc-400 font-medium leading-snug">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                        style={{ backgroundColor: p.accent }}
                      />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="font-display font-black text-2xl leading-none">{p.facts[0].value}</span>
                <Link
                  href="#calculator"
                  className="font-mono text-[10px] font-black uppercase tracking-widest text-brand-400 hover:text-white transition-colors"
                >
                  Detail →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* STATS */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
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
