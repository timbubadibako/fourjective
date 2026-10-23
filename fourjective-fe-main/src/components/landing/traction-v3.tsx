"use client";

import React, { useEffect, useState } from "react";

export type TractionFontMode = "default" | "pressstart" | "playtimes";

interface TractionProps {
  fontMode?: TractionFontMode;
}

export default function TractionV3({ fontMode: initialFontMode = "playtimes" }: TractionProps) {
  const [activeFont, setActiveFont] = useState<TractionFontMode>(initialFontMode);

  // Allow URL preview via query string ?font=pressstart or ?font=playtimes without breaking SSR
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const fontParam = params.get("font") as TractionFontMode;
      if (fontParam && ["default", "pressstart", "playtimes"].includes(fontParam)) {
        setActiveFont(fontParam);
      }
    }
  }, []);

  const metrics = [
    { value: "000", label: "Sekolah", sub: "SMA / SMK se-Indonesia" },
    { value: "000", label: "Yearbook", sub: "Buku fisik tercetak" },
    { value: "000", label: "Pulau", sub: "Jangkauan tim kreatif" },
    { value: "000", label: "Desain Layout", sub: "Arsip visual original" },
    { value: "000", label: "Kota", sub: "Studio & mobile set" },
    { value: "000", label: "Foto Konsep", sub: "Anti-gaya KTP" },
  ];

  const isArcade = activeFont === "pressstart";
  const isPlaytimes = activeFont === "playtimes";

  return (
    <section
      id="traction"
      className="relative w-full bg-orange text-white overflow-hidden py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-14 border-y-4 border-dark select-none"
    >
      {/* Background Graphic Sunburst */}
      <div
        className="absolute -left-20 top-1/2 -translate-y-1/2 w-[480px] h-[480px] sm:w-[600px] sm:h-[600px] opacity-20 pointer-events-none select-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full fill-black">
          <polygon points="100,0 115,65 178,32 142,88 200,100 142,112 178,168 115,135 100,200 85,135 22,168 58,112 0,100 58,88 22,32 85,65" />
        </svg>
      </div>

      {/* Retro Star Stamp (Top Right) */}
      <div
        className="absolute top-10 right-10 sm:right-20 w-24 h-24 rounded-full border-3 border-dashed border-dark/60 flex items-center justify-center font-mono text-[9px] font-black uppercase text-center text-dark leading-tight p-2 pointer-events-none select-none rotate-12 bg-white/10"
        aria-hidden="true"
      >
        <span>✦ SEJAK 2020 · TERUS BERJALAN ✦</span>
      </div>

      {/* Giant Watermark Background */}
      <div
        className="absolute -bottom-8 right-4 font-display font-black text-7xl sm:text-9xl text-black/10 uppercase select-none pointer-events-none tracking-tighter leading-none"
        aria-hidden="true"
      >
        FOURJECTIV
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        {/* Left Headline */}
        <div className="lg:col-span-5 space-y-3">
          <div className="inline-block bg-dark text-white px-3.5 py-1 rounded-full font-mono text-[10px] sm:text-xs font-black uppercase tracking-widest border border-white/20 mb-2">
            ✦ REKAM JEJAK STUDIO
          </div>

          {/* DRAFT 1: PRESS START 2P (Pixel Arcade 8-Bit) */}
          {isArcade && (
            <>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl uppercase text-white drop-shadow-[4px_4px_0px_#18181B] leading-[1.3]"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                6 Years
              </h2>
              <div
                className="text-xl sm:text-2xl md:text-3xl text-dark leading-[1.3] pt-2"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                &amp; STILL
                <br />
                GOING ON
              </div>
            </>
          )}

          {/* DRAFT 2: PLAYTIMES (Vintage Handwritten Yearbook Script) */}
          {isPlaytimes && (
            <>
              <h2
                className="text-6xl sm:text-7xl md:text-8xl italic text-white drop-shadow-md leading-[0.95]"
                style={{ fontFamily: "var(--font-playtimes), cursive, serif" }}
              >
                6 Years,
              </h2>
              <div className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-dark uppercase leading-none drop-shadow-sm pt-1">
                &amp; STILL
                <br />
                GOING ON
              </div>
            </>
          )}

          {/* DEFAULT: LEAGUE SPARTAN / HEADLINE (Bold Punchy Poster) */}
          {!isArcade && !isPlaytimes && (
            <>
              <h2 className="font-display font-black text-6xl sm:text-7xl md:text-8xl tracking-tight leading-[0.88] uppercase text-white drop-shadow-md">
                000 Years
              </h2>
              <div className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-dark uppercase leading-none drop-shadow-sm">
                &amp; STILL
                <br />
                GOING ON
              </div>
            </>
          )}

          <p className="font-mono text-xs sm:text-sm text-white/95 max-w-sm pt-2 font-bold leading-relaxed">
            Enam tahun menemani ratusan sekolah mengabadikan masa putih abu-abu. Setiap lembaran kami rancang eksklusif, rapi, dan tahan dibuka puluhan tahun ke depan.
          </p>

          {/* Graphic Element */}
          <div className="pt-4 flex items-center gap-3">
            <div className="w-16 h-8 rounded-t-full border-4 border-b-0 border-dark flex items-center justify-center bg-white/20">
              <div className="w-8 h-4 rounded-t-full border-3 border-b-0 border-dark bg-white" />
            </div>
            <div className="flex gap-1">
              <span className="w-3 h-6 bg-dark rounded-r-full" />
              <span className="w-3 h-6 bg-dark rounded-r-full" />
              <span className="w-3 h-6 bg-dark rounded-r-full" />
            </div>
          </div>
        </div>

        {/* Right Metrics Grid */}
        <div className="lg:col-span-7 relative">
          <div className="grid grid-cols-2 gap-x-8 sm:gap-x-14 gap-y-8 sm:gap-y-10 relative">
            {/* Center Divider Line */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-dark/30 hidden sm:block" />

            {metrics.map((m, idx) => (
              <div key={idx} className="space-y-1">
                <div
                  className={`text-white tracking-tight leading-none drop-shadow-sm ${
                    isArcade
                      ? "text-2xl sm:text-3xl md:text-4xl drop-shadow-[2px_2px_0px_#18181B]"
                      : isPlaytimes
                      ? "text-5xl sm:text-6xl md:text-7xl font-display font-black"
                      : "text-4xl sm:text-5xl md:text-6xl font-display font-black"
                  }`}
                  style={isArcade ? { fontFamily: "'Press Start 2P', monospace" } : undefined}
                >
                  {m.value}
                </div>
                <div
                  className={`text-dark uppercase tracking-wide ${
                    isArcade
                      ? "text-xs sm:text-sm font-mono font-black"
                      : "text-lg sm:text-xl font-headline font-black"
                  }`}
                >
                  {m.label}
                </div>
                <p className="text-[11px] sm:text-xs font-mono text-white/95 font-bold">{m.sub}</p>
              </div>
            ))}
          </div>

          <div className="pt-8 flex items-center justify-between border-t-2 border-dark/30 mt-6">
            <div className="flex items-center gap-1.5 text-dark font-mono text-xl font-black">
              <span>→</span>
              <span>→</span>
              <span>→</span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-dark font-black">
              INDONESIA YEARBOOK ARCHIVE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TractionPressStart() {
  return <TractionV3 fontMode="pressstart" />;
}

export function TractionPlaytimes() {
  return <TractionV3 fontMode="playtimes" />;
}
