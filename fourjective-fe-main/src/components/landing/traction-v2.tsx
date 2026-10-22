"use client";

import React, { useState } from "react";
import { Sparkles, Type } from "lucide-react";

type Variant =
  | "poster-red"
  | "split-cards"
  | "dark-cyber"
  | "bento-mono"
  | "stack-bars";

type PosterSub = "split" | "bands" | "number-wall" | "diagonal";
type CyberSub = "mega-hero" | "split-wall" | "marquee-stack";

const FONT_OPTIONS = [
  { id: "syne", label: "Syne", display: '"Syne", sans-serif', headline: '"Oswald", sans-serif' },
  { id: "oswald", label: "Oswald", display: '"Oswald", sans-serif', headline: '"Oswald", sans-serif' },
  { id: "krona", label: "Krona One", display: "var(--font-kronaOne), sans-serif", headline: "var(--font-kronaOne), sans-serif" },
  { id: "spartan", label: "League Spartan", display: "var(--font-leagueSpartan), sans-serif", headline: "var(--font-leagueSpartan), sans-serif" },
  { id: "playtimes", label: "Playtimes", display: "var(--font-playtimes), serif", headline: "var(--font-playtimes), serif" },
  { id: "zetta", label: "Lexend Zetta", display: "var(--font-lexendZetta), sans-serif", headline: "var(--font-lexendZetta), sans-serif" },
  { id: "arcade", label: "Press Start 2P", display: '"Press Start 2P", monospace', headline: '"Press Start 2P", monospace' },
] as const;

export default function TractionV2() {
  const [activeVariant, setActiveVariant] = useState<Variant>("poster-red");
  const [posterSub, setPosterSub] = useState<PosterSub>("split");
  const [cyberSub, setCyberSub] = useState<CyberSub>("mega-hero");
  const [fontId, setFontId] = useState<string>("syne");

  const font = FONT_OPTIONS.find((f) => f.id === fontId) ?? FONT_OPTIONS[0];

  // Override font variables scoped only inside this section
  const fontStyle = {
    "--font-display-var": font.display,
    "--font-headline-var": font.headline,
  } as React.CSSProperties;

  // Data angka traksi (placeholder 000 - isi data asli nanti)
  const metrics = [
    { value: "000", label: "Sekolah", sub: "SMA / SMK se-Indonesia" },
    { value: "000", label: "Yearbook", sub: "Buku fisik tercetak" },
    { value: "000", label: "Pulau", sub: "Jangkauan tim kreatif" },
    { value: "000", label: "Desain Layout", sub: "Arsip visual original" },
    { value: "000", label: "Kota", sub: "Studio & mobile set" },
    { value: "000", label: "Foto Konsep", sub: "Anti-gaya KTP" },
  ];

  const mainTabs: { id: Variant; label: string }[] = [
    { id: "poster-red", label: "Opsi 1: Retro Poster" },
    { id: "split-cards", label: "Opsi 2: Editorial Dual-Split" },
    { id: "dark-cyber", label: "Opsi 3: Dark Graphic" },
    { id: "bento-mono", label: "Opsi 4: Bento Monochrome" },
    { id: "stack-bars", label: "Opsi 5: Stacked Bar Chart" },
  ];

  const posterSubTabs: { id: PosterSub; label: string }[] = [
    { id: "split", label: "1A · Split Klasik" },
    { id: "bands", label: "1B · Pita Horizontal" },
    { id: "number-wall", label: "1C · Dinding Angka" },
    { id: "diagonal", label: "1D · Miring Diagonal" },
  ];

  const cyberSubTabs: { id: CyberSub; label: string }[] = [
    { id: "mega-hero", label: "3A · Mega Hero" },
    { id: "split-wall", label: "3B · Split Wall" },
    { id: "marquee-stack", label: "3C · Marquee Stack" },
  ];

  return (
    <section
      id="traction"
      style={fontStyle}
      className="relative w-full border-b-4 border-dark select-none overflow-hidden"
    >
      {/* ================= CONTROL BAR: VARIANT + FONT PICKER ================= */}
      <div className="bg-dark text-white px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b-2 border-dark">
        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-accent-yellow">
          <Sparkles className="w-3.5 h-3.5 text-orange" />
          <span>PILIH TAMPILAN:</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {mainTabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveVariant(t.id)}
              className={`px-3 py-1.5 rounded-full font-mono text-xs font-bold transition-all ${
                activeVariant === t.id
                  ? "bg-brand-700 text-white border-2 border-white shadow-sm"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* FONT PICKER */}
        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
          <Type className="w-3.5 h-3.5 text-brand-300" />
          <span className="hidden sm:inline">FONT:</span>
          <select
            value={fontId}
            onChange={(e) => setFontId(e.target.value)}
            className="bg-zinc-800 text-white border border-zinc-700 rounded-full px-3 py-1.5 font-mono text-xs font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-700"
            aria-label="Pilih Font Display"
          >
            {FONT_OPTIONS.map((f) => (
              <option key={f.id} value={f.id} className="bg-zinc-900">
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ================= SUB-TABS UNTUK OPSI 1 ================= */}
      {activeVariant === "poster-red" && (
        <div className="bg-brand-800 px-4 py-2.5 flex flex-wrap items-center gap-2 border-b-2 border-brand-900">
          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-300 font-bold mr-1">
            SUB-VARIAN:
          </span>
          {posterSubTabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setPosterSub(t.id)}
              className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-bold transition-all ${
                posterSub === t.id
                  ? "bg-white text-brand-700"
                  : "bg-brand-700/50 text-brand-200 hover:bg-brand-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {/* ================= SUB-TABS UNTUK OPSI 3 ================= */}
      {activeVariant === "dark-cyber" && (
        <div className="bg-zinc-800 px-4 py-2.5 flex flex-wrap items-center gap-2 border-b-2 border-zinc-700">
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-bold mr-1">
            SUB-VARIAN:
          </span>
          {cyberSubTabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setCyberSub(t.id)}
              className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-bold transition-all ${
                cyberSub === t.id
                  ? "bg-white text-zinc-900"
                  : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {/* ================= OPSI 1: RETRO VIBRANT POSTER (BIRU) ================= */}
      {activeVariant === "poster-red" && (
        <>
          {/* --- SUB 1A: SPLIT KLASIK --- */}
          {posterSub === "split" && (
            <div className="relative w-full bg-brand-700 text-white overflow-hidden py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-14">
              <div className="absolute top-0 left-0 right-0 bg-black text-white py-2 overflow-hidden border-b-2 border-black">
                <div className="flex whitespace-nowrap font-headline font-black text-xs sm:text-sm tracking-widest uppercase animate-marquee">
                  <span className="mx-4">#FOREVERYOUNG</span>
                  <span className="mx-4">&bull;</span>
                  <span className="mx-4">FOURJECTIVE CREATIVE STUDIO</span>
                  <span className="mx-4">&bull;</span>
                  <span className="mx-4">#FOREVERYOUNG</span>
                  <span className="mx-4">&bull;</span>
                  <span className="mx-4">DO THE BEST FOR THE BEST MOMENT</span>
                  <span className="mx-4">&bull;</span>
                  <span className="mx-4">FOURJECTIVE ARCHIVE 2017-2026</span>
                  <span className="mx-4">&bull;</span>
                  <span className="mx-4">#FOREVERYOUNG</span>
                </div>
              </div>

              <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[480px] h-[480px] sm:w-[600px] sm:h-[600px] opacity-35 pointer-events-none select-none">
                <svg viewBox="0 0 200 200" className="w-full h-full fill-brand-800">
                  <polygon points="100,0 115,65 178,32 142,88 200,100 142,112 178,168 115,135 100,200 85,135 22,168 58,112 0,100 58,88 22,32 85,65" />
                </svg>
              </div>

              <div className="absolute top-8 right-1/4 w-80 h-36 opacity-90 pointer-events-none">
                <div className="w-full h-full bg-gradient-to-r from-sky-400 via-[#A78BFA] to-accent-yellow rounded-full blur-[2px] transform -rotate-12 scale-y-75" />
              </div>

              <div className="absolute top-12 right-12 sm:right-20 w-24 h-24 sm:w-28 sm:h-28 text-brand-200 pointer-events-none select-none">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                  <polygon points="50,0 60,30 90,20 70,45 100,60 70,75 85,100 55,85 45,100 30,75 0,80 20,55 0,35 30,30" />
                </svg>
              </div>

              <div className="absolute top-36 right-36 sm:right-48 w-20 h-20 rounded-full border-2 border-dashed border-white/60 flex items-center justify-center font-mono text-[9px] font-black uppercase text-center leading-none p-2 pointer-events-none select-none rotate-12">
                <span>✦ FOURJECTIVE 2026 ✦</span>
              </div>

              <div className="absolute -bottom-10 right-4 font-display font-black text-7xl sm:text-9xl text-white/10 uppercase select-none pointer-events-none tracking-tighter leading-none">
                FOREVER
                <br />
                YOUNG
              </div>

              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10 pt-6">
                <div className="lg:col-span-5 space-y-4">
                  <h2 className="font-display font-black text-6xl sm:text-7xl md:text-8xl tracking-tight leading-[0.9] uppercase text-white drop-shadow-md">
                    000 Years
                  </h2>
                  <div className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-brand-300 uppercase leading-none drop-shadow-sm">
                    &amp; STILL
                    <br />
                    GOING ON
                  </div>
                  <p className="font-mono text-xs sm:text-sm text-white/90 max-w-sm pt-2 font-bold leading-relaxed">
                    Mendedikasikan energi kreatif untuk buku tahunan sekolah sejak 2017 tanpa kompromi kualitas.
                  </p>
                  <div className="pt-6 flex items-center gap-4">
                    <div className="w-20 h-10 rounded-t-full border-4 border-b-0 border-[#C084FC] flex items-center justify-center">
                      <div className="w-12 h-6 rounded-t-full border-4 border-b-0 border-brand-400" />
                    </div>
                    <div className="flex gap-1">
                      <span className="w-4 h-8 bg-brand-400 rounded-r-full" />
                      <span className="w-4 h-8 bg-brand-400 rounded-r-full" />
                      <span className="w-4 h-8 bg-brand-400 rounded-r-full" />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 relative">
                  <div className="grid grid-cols-2 gap-x-8 sm:gap-x-14 gap-y-8 sm:gap-y-10 relative">
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-white/40 hidden sm:block" />
                    {metrics.map((m, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
                          {m.value}
                        </div>
                        <div className="font-headline font-bold text-lg sm:text-xl text-brand-300 uppercase tracking-wide">
                          {m.label}
                        </div>
                        <p className="text-[11px] sm:text-xs font-mono text-white/80 font-medium">{m.sub}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-8 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-brand-300 font-mono text-xl font-black">
                      <span>→</span>
                      <span>→</span>
                      <span>→</span>
                    </div>
                    <div className="w-32 h-6 bg-[repeating-conic-gradient(#0F2A6B_0%_25%,#FFFFFF_0%_50%)] bg-[length:16px_16px] border border-black/40 rounded-sm" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-black text-brand-200 py-2 overflow-hidden border-t-2 border-black">
                <div className="flex whitespace-nowrap font-headline font-black text-xs uppercase tracking-widest animate-marquee">
                  <span className="mx-6">★ 100% GARANSI SEBELUM WISUDA</span>
                  <span className="mx-6">★ FREE 3D FLIPBOOK</span>
                  <span className="mx-6">★ 4K CINEMATIC DRONE</span>
                  <span className="mx-6">★ HEIDELBERG GERMAN PRESS</span>
                  <span className="mx-6">★ 100% GARANSI SEBELUM WISUDA</span>
                  <span className="mx-6">★ FREE 3D FLIPBOOK</span>
                  <span className="mx-6">★ 4K CINEMATIC DRONE</span>
                </div>
              </div>
            </div>
          )}

          {/* --- SUB 1B: PITA HORIZONTAL --- */}
          {posterSub === "bands" && (
            <div className="relative w-full bg-brand-700 text-white overflow-hidden">
              {/* Big Title Band */}
              <div className="relative py-14 sm:py-20 px-4 sm:px-8 text-center overflow-hidden">
                <div className="absolute inset-0 bg-brand-900 opacity-40" />
                <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-sky-400 opacity-30 blur-3xl" />
                <div className="relative z-10">
                  <span className="inline-block bg-black text-brand-300 px-4 py-1.5 rounded-full font-mono text-[10px] sm:text-xs font-black uppercase tracking-widest border-2 border-white mb-5">
                    ✦ SINCE 2017 // TRACTION ARCHIVE
                  </span>
                  <h2 className="font-display font-black text-6xl sm:text-8xl md:text-9xl uppercase leading-[0.85] tracking-tighter">
                    000<span className="text-brand-300"> Years</span>
                  </h2>
                  <p className="font-mono text-xs sm:text-sm font-bold text-white/85 mt-4 max-w-lg mx-auto">
                    Mended dedicate energi kreatif untuk buku tahunan sekolah sejak 2017 tanpa kompromi kualitas.
                  </p>
                </div>
              </div>

              {/* Metric Bands (6 horizontal strips) */}
              <div className="relative">
                {metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-4 sm:gap-8 px-4 sm:px-8 py-5 sm:py-6 border-t-2 border-white/15 ${
                      idx % 2 === 0 ? "bg-brand-800" : "bg-[#17358A]"
                    }`}
                  >
                    <span className="font-mono text-[10px] text-brand-300 font-black w-8 shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="font-display font-black text-4xl sm:text-6xl leading-none w-28 sm:w-40 shrink-0">
                      {m.value}
                    </span>
                    <span className="font-headline font-bold text-sm sm:text-2xl uppercase tracking-wide text-brand-300 shrink-0">
                      {m.label}
                    </span>
                    <span className="hidden md:block flex-1 text-right font-mono text-[11px] text-white/60 font-medium truncate">
                      {m.sub}
                    </span>
                    <span className="font-mono text-lg text-white/30 shrink-0">→</span>
                  </div>
                ))}
              </div>

              {/* Bottom Tape */}
              <div className="bg-black text-brand-200 py-2.5 overflow-hidden border-t-2 border-black">
                <div className="flex whitespace-nowrap font-headline font-black text-xs uppercase tracking-widest animate-marquee">
                  <span className="mx-6">★ 100% GARANSI SEBELUM WISUDA</span>
                  <span className="mx-6">★ FREE 3D FLIPBOOK</span>
                  <span className="mx-6">★ 4K CINEMATIC DRONE</span>
                  <span className="mx-6">★ HEIDELBERG GERMAN PRESS</span>
                  <span className="mx-6">★ 100% GARANSI SEBELUM WISUDA</span>
                </div>
              </div>
            </div>
          )}

          {/* --- SUB 1C: DINDING ANGKA --- */}
          {posterSub === "number-wall" && (
            <div className="relative w-full bg-brand-700 text-white overflow-hidden py-16 sm:py-20 px-4 sm:px-8">
              {/* Checkerboard top */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-[repeating-conic-gradient(#0F2A6B_0%_25%,#FFFFFF_0%_50%)] bg-[length:20px_20px] opacity-70" />

              <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-10">
                  <h2 className="font-display font-black text-5xl sm:text-7xl uppercase leading-none tracking-tight">
                    Rekap <span className="text-brand-300">000</span> Angka
                  </h2>
                </div>

                {/* 3x2 Grid of Big Number Blocks */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="group relative bg-brand-800 border-3 border-white/25 rounded-2xl p-5 sm:p-7 overflow-hidden hover:border-white transition-colors"
                    >
                      <span className="absolute top-3 right-3 font-mono text-[10px] font-black text-white/30">
                        0{idx + 1}
                      </span>
                      <div className="font-display font-black text-6xl sm:text-8xl leading-none tracking-tighter text-white">
                        {m.value}
                      </div>
                      <div className="font-headline font-bold text-sm sm:text-lg uppercase tracking-widest text-brand-300 mt-3">
                        {m.label}
                      </div>
                      <div className="h-1.5 w-12 bg-brand-300 mt-3 rounded-full" />
                      <p className="text-[10px] sm:text-xs font-mono text-white/55 font-medium mt-2">{m.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* --- SUB 1D: MIRING DIAGONAL --- */}
          {posterSub === "diagonal" && (
            <div className="relative w-full bg-brand-700 text-white overflow-hidden py-20 sm:py-28 px-4 sm:px-8">
              {/* Diagonal stripes background */}
              <div
                className="absolute inset-0 opacity-[0.12] pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(115deg, #FFFFFF 0px, #FFFFFF 3px, transparent 3px, transparent 26px)",
                }}
              />

              <div className="max-w-7xl mx-auto relative z-10">
                {/* Diagonal headline slab */}
                <div className="-rotate-2 bg-black text-white py-6 px-6 sm:px-10 inline-block max-w-full shadow-2xl">
                  <h2 className="font-display font-black text-5xl sm:text-7xl uppercase leading-none tracking-tighter">
                    000 Years <span className="text-brand-300">of Craft</span>
                  </h2>
                </div>

                {/* Diagonal cards row */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-10">
                  {metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className={`bg-brand-900 border-3 border-white/25 p-5 sm:p-6 ${
                        idx % 2 === 0 ? "-rotate-2" : "rotate-1.5"
                      } hover:rotate-0 transition-transform duration-300`}
                    >
                      <div className="font-display font-black text-5xl sm:text-7xl leading-none">{m.value}</div>
                      <div className="font-headline font-bold text-xs sm:text-base uppercase tracking-widest text-brand-300 mt-2">
                        {m.label}
                      </div>
                      <p className="text-[10px] sm:text-xs font-mono text-white/55 font-medium mt-1">{m.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ================= OPSI 2: EDITORIAL DUAL-SPLIT ================= */}
      {activeVariant === "split-cards" && (
        <div className="w-full bg-surface-cream py-20 px-4 sm:px-8 md:px-14">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 bg-brand-700 text-white p-8 sm:p-10 rounded-[2.5rem] border-3 border-dark shadow-brutal flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-black uppercase tracking-widest text-brand-300 block mb-2">
                  EST. 2017 &bull; INDONESIA
                </span>
                <h3 className="font-display font-black text-5xl uppercase leading-none text-white">
                  000 Years
                  <br />
                  <span className="text-brand-300">&amp; Counting</span>
                </h3>
                <p className="text-xs sm:text-sm font-medium text-white/90 mt-4 leading-relaxed">
                  Ribuan cerita putih abu-abu, puluhan ribu halaman dicetak dengan standar tertinggi tanpa kompromi.
                </p>
              </div>
              <div className="pt-8">
                <span className="inline-flex items-center gap-2 bg-dark text-white px-4 py-2 rounded-full font-mono text-xs font-bold border border-white/20">
                  <span>✦ VERIFIED AGENCY TRACTION</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-3xl border-3 border-dark shadow-brutal flex flex-col justify-between hover:-translate-y-1 transition-transform"
                >
                  <span className="font-mono text-[10px] text-zinc-400 font-bold">#STAT_0{idx + 1}</span>
                  <div className="my-3">
                    <div className="font-display font-black text-4xl text-brand-700 leading-none">{m.value}</div>
                    <div className="font-headline font-bold text-sm text-dark uppercase mt-1">{m.label}</div>
                  </div>
                  <p className="text-[11px] font-mono text-zinc-600 font-medium">{m.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= OPSI 3: DARK GRAPHIC (LEBIH BESAR + 3 SUB-VARIAN) ================= */}
      {activeVariant === "dark-cyber" && (
        <>
          {/* --- SUB 3A: MEGA HERO --- */}
          {cyberSub === "mega-hero" && (
            <div className="relative w-full bg-ink-soft text-white overflow-hidden">
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

              <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14 py-20 sm:py-28">
                {/* Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/10">
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/15 font-mono text-xs uppercase font-bold text-brand-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>FOURJECTIVE MILESTONES // LIVE DATA</span>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                    EST. 2017 — 2026
                  </span>
                </div>

                {/* MEGA HEADLINE */}
                <div className="py-12 sm:py-16">
                  <h3 className="font-display font-black leading-[0.8] tracking-tighter uppercase">
                    <span className="block text-[clamp(5rem,18vw,16rem)] text-white">000</span>
                    <span className="block text-[clamp(2rem,6vw,5.5rem)] text-brand-400">
                      Years &amp; Still Evolving
                    </span>
                  </h3>
                </div>

                {/* Metric strip */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
                  {metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="bg-ink-soft p-6 sm:p-8 flex flex-col justify-between min-h-[190px] hover:bg-ink-raised transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-black text-zinc-600 tracking-widest">
                          0{idx + 1}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-700" />
                      </div>
                      <div>
                        <div className="font-display font-black text-5xl sm:text-6xl xl:text-7xl text-white leading-none tracking-tighter">
                          {m.value}
                        </div>
                        <div className="font-headline font-bold text-xs sm:text-sm text-brand-400 uppercase tracking-widest mt-3">
                          {m.label}
                        </div>
                        <p className="text-[10px] font-mono text-zinc-500 font-medium mt-1.5">{m.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom CTA row */}
                <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                  <p className="font-mono text-xs text-zinc-500 font-medium max-w-md">
                    Terus melompat melampaui batasan buku tahunan konvensional menuju era digital flipbook 3D
                    interaktif.
                  </p>
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-700 text-white font-headline font-bold text-xs uppercase tracking-widest">
                    <span>Lihat Portofolio</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* --- SUB 3B: SPLIT WALL --- */}
          {cyberSub === "split-wall" && (
            <div className="w-full bg-ink-soft text-white overflow-hidden">
              <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2">
                {/* Left: Giant Number Wall */}
                <div className="p-8 sm:p-12 lg:p-14 border-b lg:border-b-0 lg:border-r border-white/10 relative">
                  <div className="absolute top-0 right-0 w-72 h-72 bg-brand-700/20 blur-[100px] pointer-events-none" />
                  <div className="relative">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">
                      TRAKTION // VERIFIED
                    </span>
                    <div className="mt-6 space-y-4">
                      {metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="flex items-baseline gap-5 border-b border-white/10 pb-4 last:border-0"
                        >
                          <span className="font-mono text-[10px] text-zinc-600 font-black w-6 shrink-0">
                            0{idx + 1}
                          </span>
                          <span className="font-display font-black text-5xl sm:text-6xl xl:text-7xl text-white leading-none tracking-tighter w-32 sm:w-40 shrink-0">
                            {m.value}
                          </span>
                          <div className="min-w-0">
                            <div className="font-headline font-bold text-sm sm:text-lg text-brand-400 uppercase tracking-wider">
                              {m.label}
                            </div>
                            <div className="text-[10px] sm:text-xs font-mono text-zinc-500 font-medium truncate">
                              {m.sub}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Sticky Editorial Panel */}
                <div className="p-8 sm:p-12 lg:p-14 bg-[#101218] relative flex flex-col justify-between">
                  <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, #FFFFFF 0px, #FFFFFF 1px, transparent 1px, transparent 14px)",
                    }}
                  />
                  <div className="relative">
                    <span className="inline-block px-3 py-1.5 rounded-full bg-brand-700 text-white font-mono text-[10px] font-black uppercase tracking-widest">
                      000 Years Running
                    </span>
                    <h3 className="font-display font-black text-5xl sm:text-7xl xl:text-8xl uppercase leading-[0.88] tracking-tighter mt-6">
                      Still
                      <br />
                      <span className="text-brand-400">Evolving</span>
                    </h3>
                    <p className="text-sm text-zinc-400 font-normal mt-6 max-w-md leading-relaxed">
                      Terus melompat melampaui batasan buku tahunan konvensional menuju era digital flipbook 3D
                      interaktif yang bisa dibuka alumni mana pun, di device mana pun, selamanya.
                    </p>
                  </div>

                  <div className="relative mt-12 grid grid-cols-2 gap-4">
                    {[
                      { k: "Garansi Tepat Waktu", v: "000%" },
                      { k: "Buku Tercetak", v: "000+" },
                      { k: "Halaman Dirancang", v: "000+" },
                      { k: "Kota Dilayani", v: "000" },
                    ].map((s) => (
                      <div key={s.k} className="border-l-2 border-brand-700 pl-4">
                        <div className="font-display font-black text-3xl sm:text-4xl text-white leading-none">
                          {s.v}
                        </div>
                        <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-bold mt-1.5">
                          {s.k}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- SUB 3C: MARQUEE STACK --- */}
          {cyberSub === "marquee-stack" && (
            <div className="w-full bg-ink-soft text-white overflow-hidden py-16 sm:py-24">
              {/* Big scrolling marquee */}
              <div className="overflow-hidden border-y border-white/10 py-6">
                <div className="flex whitespace-nowrap font-display font-black text-6xl sm:text-8xl uppercase leading-none tracking-tighter animate-marquee">
                  <span className="mx-6 text-white">000 Years</span>
                  <span className="mx-6 text-brand-700">✦ 000 Schools</span>
                  <span className="mx-6 text-white">000 Years</span>
                  <span className="mx-6 text-cyan-400">✦ 000 Books</span>
                </div>
              </div>

              <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14 pt-16">
                {/* Second marquee reversed */}
                <div className="overflow-hidden border-y border-white/10 py-4 mb-16">
                  <div className="flex whitespace-nowrap font-headline font-bold text-sm sm:text-base uppercase tracking-widest text-zinc-400 animate-marquee-reverse">
                    <span className="mx-6">#FOREVERYOUNG</span>
                    <span className="mx-6 text-brand-400">FOURJECTIVE CREATIVE STUDIO</span>
                    <span className="mx-6">#FOREVERYOUNG</span>
                    <span className="mx-6 text-brand-400">DO THE BEST FOR THE BEST MOMENT</span>
                  </div>
                </div>

                {/* 2x3 big cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-16">
                  {metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="relative bg-gradient-to-br from-ink-raised to-ink-soft border border-white/10 rounded-3xl p-7 sm:p-9 min-h-[240px] flex flex-col justify-between overflow-hidden group hover:border-brand-700/60 transition-colors"
                    >
                      <div className="absolute -right-8 -top-8 w-32 h-32 bg-brand-700/20 rounded-full blur-2xl group-hover:bg-brand-700/40 transition-colors" />
                      <div className="relative flex items-center justify-between">
                        <span className="font-mono text-[10px] font-black text-zinc-600 tracking-widest">
                          0{idx + 1} / METRIC
                        </span>
                        <span className="w-2 h-2 rounded-full bg-brand-700" />
                      </div>
                      <div className="relative">
                        <div className="font-display font-black text-6xl sm:text-7xl text-white leading-none tracking-tighter">
                          {m.value}
                        </div>
                        <div className="font-headline font-bold text-sm sm:text-base text-brand-400 uppercase tracking-widest mt-3">
                          {m.label}
                        </div>
                        <p className="text-[11px] font-mono text-zinc-500 font-medium mt-1.5">{m.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ================= OPSI 4: BENTO MONOCHROME ================= */}
      {activeVariant === "bento-mono" && (
        <div className="w-full bg-surface-gray text-ink-deep py-20 px-4 sm:px-8 md:px-14">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <div className="lg:col-span-2 bg-ink-deep text-white rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between min-h-[240px]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
                    Traction Report / 2017—2026
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-700" />
                </div>
                <div className="mt-8">
                  <h3 className="font-display font-black text-5xl sm:text-6xl uppercase leading-[0.92] tracking-tight">
                    Sembilan tahun
                    <br />
                    <span className="text-brand-700">tanpa kompromi.</span>
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono mt-3 max-w-md">
                    Data akumulasi commissioning buku tahunan &amp; dokumen digital sejak studio berdiri.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-[2rem] p-8 flex flex-col justify-between border border-black/10 min-h-[240px]">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
                  Active Cities
                </span>
                <div className="font-display font-black text-6xl text-brand-700 leading-none my-4">000</div>
                <p className="text-xs text-zinc-500 font-medium">Kota dengan mobile studio set aktif kami.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((m, idx) => {
                const bentoClass =
                  idx % 4 === 0
                    ? "bg-brand-700 text-white col-span-2"
                    : idx === 3
                    ? "bg-ink-deep text-white col-span-2 lg:col-span-2"
                    : "bg-white text-ink-deep border border-black/10";
                return (
                  <div
                    key={idx}
                    className={`rounded-[2rem] p-7 flex flex-col justify-between min-h-[170px] ${bentoClass}`}
                  >
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-50">
                      0{idx + 1} / Metric
                    </span>
                    <div>
                      <div className="font-display font-black text-4xl sm:text-5xl leading-none">{m.value}</div>
                      <div className="font-headline font-bold text-sm uppercase tracking-wide mt-1.5">
                        {m.label}
                      </div>
                      <p className="text-[11px] font-mono opacity-60 mt-1">{m.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= OPSI 5: STACKED BAR CHART ================= */}
      {activeVariant === "stack-bars" && (
        <div className="w-full bg-surface-bright text-dark py-20 px-4 sm:px-8 md:px-14 border-b-4 border-dark">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="font-mono text-xs font-black uppercase tracking-widest text-brand-700 block mb-2">
                  ✦ LIVE ACCUMULATION DATA
                </span>
                <h3 className="font-display font-black text-4xl sm:text-6xl uppercase leading-none">
                  Rekap Keseluruhan
                  <br />
                  <span className="text-brand-700">Proyek Fourjective</span>
                </h3>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-zinc-500 uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Data terverifikasi s.d. Oktober 2026</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-end">
              {[
                { ...metrics[0], pct: 92, color: "bg-brand-700" },
                { ...metrics[1], pct: 78, color: "bg-brand-500" },
                { ...metrics[2], pct: 64, color: "bg-sky-400" },
                { ...metrics[3], pct: 71, color: "bg-ink-deep" },
                { ...metrics[4], pct: 55, color: "bg-[#6366F1]" },
                { ...metrics[5], pct: 85, color: "bg-cyan-400" },
              ].map((m, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3">
                  <span className="font-display font-black text-2xl sm:text-3xl text-dark">{m.value}</span>
                  <div className="w-full h-40 sm:h-52 bg-black/5 rounded-2xl flex items-end overflow-hidden border border-black/5">
                    <div
                      className={`w-full ${m.color} rounded-b-xl transition-all duration-700 hover:brightness-110`}
                      style={{ height: `${m.pct}%` }}
                    />
                  </div>
                  <div className="text-center">
                    <div className="font-headline font-bold text-xs uppercase tracking-wide text-dark">
                      {m.label}
                    </div>
                    <div className="text-[10px] font-mono text-zinc-500 mt-0.5">{m.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t-2 border-dark/10 pt-8">
              {[
                { k: "Garansi Tepat Waktu", v: "000%" },
                { k: "Buku Fisik Tercetak", v: "000+" },
                { k: "Halaman Dirancang", v: "000+" },
                { k: "Kota Dilayani", v: "000" },
              ].map((s) => (
                <div key={s.k}>
                  <div className="font-display font-black text-2xl sm:text-3xl text-brand-700">{s.v}</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mt-1 font-bold">
                    {s.k}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
