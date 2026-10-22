"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

// ================= KINETIC TYPOGRAPHY HELPERS =================

function CyberTypewriter({
  text,
  speed = 30,
  delay = 60,
  className = "",
  cursor = "█",
  cursorColor = "#FAC443",
}: {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: string;
  cursorColor?: string;
}) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const [charCount, setCharCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    let interval: NodeJS.Timeout | null = null;
    let pollInterval: NodeJS.Timeout | null = null;

    const checkAndStart = () => {
      if (startedRef.current) return;
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();

      // If user scrolled past it horizontally, render complete text immediately
      if (rect.right < 0) {
        startedRef.current = true;
        setHasStarted(true);
        setCharCount(text.length);
        setIsDone(true);
        if (pollInterval) clearInterval(pollInterval);
        return;
      }

      // Check if visible vertically in section AND entered horizontal view
      const inView =
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth * 0.95 &&
        rect.right > 0;

      if (inView) {
        startedRef.current = true;
        setHasStarted(true);
        if (pollInterval) clearInterval(pollInterval);

        timer = setTimeout(() => {
          let count = 0;
          interval = setInterval(() => {
            count++;
            setCharCount(count);
            if (count >= text.length) {
              if (interval) clearInterval(interval);
              setIsDone(true);
            }
          }, speed);
        }, delay);
      }
    };

    // Immediate check
    checkAndStart();

    // Listen on scroll, resize, plus polling interval to handle GSAP scrub translations
    window.addEventListener("scroll", checkAndStart, { passive: true });
    window.addEventListener("resize", checkAndStart, { passive: true });
    pollInterval = setInterval(checkAndStart, 80);

    return () => {
      window.removeEventListener("scroll", checkAndStart);
      window.removeEventListener("resize", checkAndStart);
      if (pollInterval) clearInterval(pollInterval);
      if (timer) clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, delay]);

  const displayed = text.slice(0, charCount);

  return (
    <span ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Ghost spacer to keep exact text width locked from frame 0 - prevents any jumping */}
      <span className="invisible select-none pointer-events-none" aria-hidden="true">
        {text}
      </span>
      {/* Typed text and blinking cursor */}
      <span className="absolute left-0 top-0 inline-flex items-baseline whitespace-nowrap">
        <span>{displayed}</span>
        <span
          style={{ color: cursorColor }}
          className={`inline-block ml-1 font-mono leading-none ${
            isDone ? "opacity-100" : hasStarted ? "opacity-100" : "opacity-0"
          }`}
        >
          {cursor}
        </span>
      </span>
    </span>
  );
}

function MaskRevealWords({
  words,
  className = "",
}: {
  words: string[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const revealedRef = useRef(false);

  useEffect(() => {
    let pollInterval: NodeJS.Timeout | null = null;

    const checkAndReveal = () => {
      if (revealedRef.current) return;
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();

      // If user scrolled past it horizontally, reveal immediately
      if (rect.right < 0) {
        revealedRef.current = true;
        setRevealed(true);
        if (pollInterval) clearInterval(pollInterval);
        return;
      }

      // Check if visible vertically in section AND entered horizontal view
      const inView =
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth * 0.95 &&
        rect.right > 0;

      if (inView) {
        revealedRef.current = true;
        setRevealed(true);
        if (pollInterval) clearInterval(pollInterval);
      }
    };

    checkAndReveal();
    window.addEventListener("scroll", checkAndReveal, { passive: true });
    window.addEventListener("resize", checkAndReveal, { passive: true });
    pollInterval = setInterval(checkAndReveal, 80);

    return () => {
      window.removeEventListener("scroll", checkAndReveal);
      window.removeEventListener("resize", checkAndReveal);
      if (pollInterval) clearInterval(pollInterval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`flex flex-wrap items-center gap-x-3 sm:gap-x-4 overflow-hidden leading-none ${className}`}
    >
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden py-1">
          <span
            className="inline-block transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
            style={{
              transform: revealed ? "translateY(0%)" : "translateY(115%)",
              transitionDelay: `${idx * 60}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Traction() {

  return (
    <section
      id="traction"
      className="relative w-full h-screen min-h-[700px] max-h-[1080px] border-b-4 border-dark flex flex-col justify-between py-6 px-4 md:px-8 select-none z-20 overflow-hidden text-white bg-[#160B28]"
    >
      {/* ================= EXACT 8PX GAP MULTI-FONT TYPOGRAPHIC WALLPAPER (ss2.png) ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 flex flex-col justify-center gap-[8px] py-0">
        {/* ROW 1: League Spartan + Lexend Zetta + Poppins Italic + Krona One */}
        <div className="whitespace-nowrap text-[10.5vh] sm:text-[12.5vh] uppercase leading-none select-none -translate-x-12 flex items-baseline gap-6">
          <span style={{ fontFamily: "var(--font-leagueSpartan)", fontWeight: 900 }} className="tracking-tight text-[#482B7D]">FOURJECTIVE</span>
          <span style={{ fontFamily: "var(--font-lexendZetta)", fontWeight: 900 }} className="tracking-wide text-[#563494]">REBEL YOUTH</span>
          <span style={{ fontFamily: "var(--font-poppins)", fontWeight: 900, fontStyle: "italic" }} className="tracking-tight text-[#412573]">MEMORIES NEVER DIE</span>
          <span style={{ fontFamily: "var(--font-kronaOne)" }} className="tracking-wider text-[#5A3899]">EST. 2017</span>
        </div>

        {/* ROW 2: Lexend Zetta + Syne + Serif Italic + Poppins */}
        <div className="whitespace-nowrap text-[10.5vh] sm:text-[12.5vh] uppercase leading-none select-none translate-x-8 flex items-baseline gap-6">
          <span style={{ fontFamily: "var(--font-lexendZetta)", fontWeight: 900 }} className="tracking-wide text-[#503089]">RAW ENERGY</span>
          <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }} className="tracking-tight text-[#432677]">UNAPOLOGETIC</span>
          <span style={{ fontFamily: "serif", fontWeight: 900, fontStyle: "italic" }} className="tracking-tight text-[#4D2E85]">BUKU TAHUNAN</span>
          <span style={{ fontFamily: "var(--font-poppins)", fontWeight: 900, fontStyle: "italic" }} className="tracking-tight text-[#573596]">ANTI-FOTO KTP</span>
        </div>

        {/* ROW 3: League Spartan + Lexend Zetta + Serif + Krona */}
        <div className="whitespace-nowrap text-[10.5vh] sm:text-[12.5vh] uppercase leading-none select-none -translate-x-20 flex items-baseline gap-6">
          <span style={{ fontFamily: "var(--font-leagueSpartan)", fontWeight: 900 }} className="tracking-tight text-[#442775]">MASSIVE NOSTALGIA</span>
          <span style={{ fontFamily: "var(--font-lexendZetta)", fontWeight: 900 }} className="tracking-wide text-[#533290]">OUT-OF-THE-BOX</span>
          <span style={{ fontFamily: "serif", fontWeight: 900, fontStyle: "italic" }} className="text-[#3E236C]">FOURJECTIVE</span>
          <span style={{ fontFamily: "var(--font-kronaOne)" }} className="tracking-widest text-[#5C399E]">CHAOS &amp; LOVE</span>
        </div>

        {/* ROW 4: Lexend Zetta + League Spartan + Poppins + Syne */}
        <div className="whitespace-nowrap text-[10.5vh] sm:text-[12.5vh] uppercase leading-none select-none translate-x-12 flex items-baseline gap-6">
          <span style={{ fontFamily: "var(--font-lexendZetta)", fontWeight: 900 }} className="tracking-tight text-[#4E2F86]">MEMORIES NEVER DIE</span>
          <span style={{ fontFamily: "var(--font-leagueSpartan)", fontWeight: 900 }} className="tracking-tight text-[#583697]">KAS ANGKATAN AMAN</span>
          <span style={{ fontFamily: "var(--font-poppins)", fontWeight: 900, fontStyle: "italic" }} className="tracking-tight text-[#422673]">PURE YOUTH</span>
          <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }} className="tracking-tight text-[#4C2E84]">FOURJECTIVE</span>
        </div>

        {/* ROW 5: Krona One + League Spartan + Lexend Zetta + Serif */}
        <div className="whitespace-nowrap text-[10.5vh] sm:text-[12.5vh] uppercase leading-none select-none -translate-x-8 flex items-baseline gap-6">
          <span style={{ fontFamily: "var(--font-kronaOne)" }} className="tracking-wide text-[#462878]">ANTI-FOTO KTP</span>
          <span style={{ fontFamily: "var(--font-leagueSpartan)", fontWeight: 900 }} className="tracking-tight text-[#553492]">REBEL YOUTH</span>
          <span style={{ fontFamily: "var(--font-lexendZetta)", fontWeight: 900 }} className="tracking-wide text-[#3D226A]">RAW ENERGY</span>
          <span style={{ fontFamily: "serif", fontWeight: 900, fontStyle: "italic" }} className="text-[#51318B]">EST. 2017</span>
        </div>

        {/* ROW 6: League Spartan + Poppins Italic + Lexend Zetta + Krona */}
        <div className="whitespace-nowrap text-[10.5vh] sm:text-[12.5vh] uppercase leading-none select-none translate-x-6 flex items-baseline gap-6">
          <span style={{ fontFamily: "var(--font-leagueSpartan)", fontWeight: 900 }} className="tracking-tight text-[#4A2B7F]">FOURJECTIVE</span>
          <span style={{ fontFamily: "var(--font-poppins)", fontWeight: 900, fontStyle: "italic" }} className="tracking-tight text-[#563595]">OUT-OF-THE-BOX</span>
          <span style={{ fontFamily: "var(--font-lexendZetta)", fontWeight: 900 }} className="tracking-tight text-[#432774]">BUKU TAHUNAN</span>
          <span style={{ fontFamily: "var(--font-kronaOne)" }} className="tracking-wider text-[#4E2F86]">NO FILTER</span>
        </div>
      </div>

      {/* TOP HUD & LIVE PROGRESS */}
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between z-30 pt-2">
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-full bg-[#FAC443] text-[#1E1233] font-mono text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#FF4D1F] border-2 border-[#1E1233] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF4D1F]" />
            <span>✦ PROVEN TRACK RECORD &bull; EST. 2017</span>
          </span>
          <span className="text-xs font-mono text-[#E9D5FF]/70 hidden md:inline font-bold">
            SPESIALIS BUKU TAHUNAN SE-INDONESIA
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-[#FAC443] font-black" id="traction-percent">
            0%
          </span>
          <div className="w-36 h-3 rounded-full bg-white/10 overflow-hidden border border-[#FAC443]/40">
            <div
              id="traction-progress-fill"
              className="h-full bg-gradient-to-r from-[#FF4D1F] to-[#FAC443] rounded-full w-0 transition-all duration-75 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* MAIN HORIZONTAL TRACK STREAM */}
      <div className="relative w-full my-auto flex items-center overflow-hidden z-10">
        <div
          id="traction-track"
          className="flex items-center gap-20 md:gap-32 whitespace-nowrap will-change-transform pl-8 sm:pl-16 md:pl-24 pr-48"
        >
          {/* ================================================================= */}
          {/* CLUSTER 1: 7+ TAHUN BERKARYA (STACKED TYPO + ROTATING SUNBURST)  */}
          {/* ================================================================= */}
          <div className="cluster relative flex items-center gap-8 md:gap-14 flex-shrink-0">
            {/* Floating Sticker */}
            <div className="absolute -top-10 -right-8 w-24 sm:w-32 pointer-events-none select-none z-30 sticker-bob-a filter drop-shadow-2xl rotate-12">
              <Image
                src="/images/loonart/hero_sticker_asset5.png"
                alt="Memory Sticker"
                width={128}
                height={128}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Rotating Sunburst SVG */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 flex items-center justify-center">
              <svg
                className="w-full h-full animate-spin-slow text-[#FAC443]"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="currentColor">
                  <path d="M50 0L53.5 35L85.4 14.6L64.3 43.1L98.5 50L64.3 56.9L85.4 85.4L53.5 65L50 100L46.5 65L14.6 85.4L35.7 56.9L1.5 50L35.7 43.1L14.6 14.6L46.5 35L50 0Z" />
                </g>
                <circle cx="50" cy="50" r="16" fill="#160B28" stroke="currentColor" strokeWidth="3" />
              </svg>
              <span className="absolute font-mono text-[10px] font-black uppercase text-[#FAC443] tracking-widest">
                2017
              </span>
            </div>

            {/* Stacked Text Lockup */}
            <div className="flex flex-col justify-center gap-2 text-left">
              <div className="flex items-center gap-3">
                <CyberTypewriter
                  text="✦ STAGE 01 • 7+ TAHUN REPUTASI"
                  speed={30}
                  className="font-mono text-xs sm:text-sm font-black tracking-widest uppercase text-[#FAC443]"
                />
                <span className="w-8 h-[1px] bg-[#FAC443]/40" />
              </div>

              {/* Line 1 with Mask Reveal */}
              <MaskRevealWords
                words={["MENDEDIKASIKAN", "ENERGI"]}
                className="text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tight text-white"
              />

              {/* Line 2 with Pill & Typewriter */}
              <div className="flex items-center gap-4 text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tight leading-none text-white">
                <div className="word-badge bg-[#FF4D1F] text-white rotate-[-3deg] hover:rotate-0 border-2 border-[#1E1233] shadow-[4px_4px_0px_#FAC443]">
                  7+ TAHUN
                </div>
                <CyberTypewriter
                  text="MERACIK MEMORI"
                  delay={250}
                  speed={45}
                  cursorColor="#FF4D1F"
                />
              </div>

              {/* Line 3 Subtext */}
              <p className="text-xs sm:text-sm font-medium text-[#E9D5FF]/80 mt-1 max-w-lg leading-relaxed whitespace-normal">
                Bukan studio karbitan. Berdiri kokoh sejak 2017 mengabadikan cerita masa putih abu-abu dengan standar visual paling berkarakter.
              </p>
            </div>
          </div>

          {/* DIVIDER ACCENT */}
          <div className="flex flex-col items-center justify-center opacity-40 text-[#FAC443]">
            <span className="text-4xl font-mono">✦</span>
            <div className="w-[1px] h-20 bg-gradient-to-b from-[#FAC443] to-transparent" />
          </div>

          {/* ================================================================= */}
          {/* CLUSTER 2: FANNED REAL 35MM FILM NEGATIVE CARDS (ABANK IRENK)       */}
          {/* ================================================================= */}
          <div className="cluster relative flex items-center gap-8 md:gap-14 flex-shrink-0">
            {/* Floating Sticker */}
            <div className="absolute -top-10 -left-6 w-24 sm:w-32 pointer-events-none select-none z-30 sticker-bob-b filter drop-shadow-2xl -rotate-12">
              <Image
                src="/images/loonart/hero_sticker_asset8.png"
                alt="Quality Sticker"
                width={128}
                height={128}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* FANNED TRIO PHOTO CARDS (VIBRANT ABANK IRENK COLOR BLOCKS) */}
            <div className="relative w-64 sm:w-72 h-80 sm:h-96 flex items-center justify-center flex-shrink-0">
              
              {/* Card Left: Deep Indigo Card #2A1B4E */}
              <div className="fan-card-1 fanned-origin absolute w-48 sm:w-56 h-64 sm:h-76 rounded-2xl border-2 border-[#FAC443]/40 bg-[#261543] p-2.5 shadow-[6px_6px_0px_#FAC443] flex flex-col justify-between -rotate-12 -translate-x-8 text-white">
                <div className="flex justify-between items-center px-1 py-0.5 border-b border-white/20 text-[8px] font-mono text-[#E9D5FF]/70 font-bold">
                  <span>KODAK 400</span>
                  <span>&bull; 24A &bull;</span>
                  <span className="text-[#FAC443]">&apos;04 09 26</span>
                </div>
                <div className="relative w-full h-36 sm:h-44 rounded-lg overflow-hidden border border-white/20 my-1">
                  <Image
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80"
                    alt="High-Fashion Editorial"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono font-black text-white px-1">
                  <span className="bg-[#FAC443] text-[#1E1233] px-1.5 py-0.5 rounded text-[8px]">#HIGH_FASHION</span>
                  <span className="text-[#FAC443]">2025</span>
                </div>
              </div>

              {/* Card Center: Mustard Gold Card #FAC443 */}
              <div className="fan-card-2 fanned-origin absolute w-48 sm:w-56 h-64 sm:h-76 rounded-2xl border-2 border-[#1E1233] bg-[#FAC443] p-2.5 shadow-[8px_8px_0px_#FF4D1F] flex flex-col justify-between z-10 text-[#1E1233]">
                <div className="flex justify-between items-center px-1 py-0.5 border-b border-[#1E1233]/30 text-[8px] font-mono font-bold">
                  <span>FJ 35MM REEL</span>
                  <span>&bull; 25A &bull;</span>
                  <span className="text-[#FF4D1F] font-black">RAW 4K</span>
                </div>
                <div className="relative w-full h-36 sm:h-44 rounded-lg overflow-hidden border-2 border-[#1E1233] my-1">
                  <Image
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80"
                    alt="Retro 90s Youth Chemistry"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono font-black px-1">
                  <span className="font-black">#YOUTH_CULTURE</span>
                  <span className="bg-[#FF4D1F] text-white text-[8px] px-1.5 py-0.5 rounded font-bold">MASTER</span>
                </div>
              </div>

              {/* Card Right: Fiery Red-Orange Card #FF4D1F */}
              <div className="fan-card-3 fanned-origin absolute w-48 sm:w-56 h-64 sm:h-76 rounded-2xl border-2 border-[#1E1233] bg-[#FF4D1F] p-2.5 shadow-[6px_6px_0px_#FAC443] flex flex-col justify-between rotate-12 translate-x-8 text-white">
                <div className="flex justify-between items-center px-1 py-0.5 border-b border-white/30 text-[8px] font-mono font-bold text-white">
                  <span>FUJI VELVIA</span>
                  <span>&bull; 26A &bull;</span>
                  <span className="text-[#FAC443]">ISO 100</span>
                </div>
                <div className="relative w-full h-36 sm:h-44 rounded-lg overflow-hidden border border-white/30 my-1">
                  <Image
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80"
                    alt="Wes Anderson Classroom"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono font-black px-1">
                  <span className="bg-[#1E1233] text-[#FAC443] px-1.5 py-0.5 rounded text-[8px]">#WES_ANDERSON</span>
                  <span className="text-[#FAC443]">PASTEL</span>
                </div>
              </div>
            </div>

            {/* Stacked Text Lockup */}
            <div className="flex flex-col justify-center gap-2 text-left">
              <div className="flex items-center gap-3">
                <CyberTypewriter
                  text="✦ STAGE 02 • EKSPEDISI NASIONAL"
                  speed={30}
                  className="font-mono text-xs sm:text-sm font-black tracking-widest uppercase text-[#FAC443]"
                />
                <span className="w-8 h-[1px] bg-[#FAC443]/40" />
              </div>

              {/* Line 1 */}
              <div className="flex items-center gap-4 text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tight leading-none text-white">
                <MaskRevealWords
                  words={["DIPERCAYA"]}
                />
                <div className="word-badge bg-[#FAC443] text-[#1E1233] rotate-[2deg] hover:rotate-0 border-2 border-[#1E1233] shadow-[4px_4px_0px_#FF4D1F]">
                  70+ SEKOLAH
                </div>
                <MaskRevealWords
                  words={["TERBESAR"]}
                  className="text-[#E9D5FF]/60"
                />
              </div>

              {/* Line 2 with Pills & Typewriter */}
              <div className="flex items-center gap-4 text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tight leading-none text-white">
                <span className="text-[#E9D5FF]/60">MELINTASI</span>
                <div className="word-badge bg-[#FF4D1F] text-white rotate-[-2deg] hover:rotate-0 border-2 border-[#1E1233] shadow-[4px_4px_0px_#FAC443]">
                  18+ KOTA
                </div>
                <span>&bull;</span>
                <CyberTypewriter
                  text="3 PULAU BESAR"
                  delay={250}
                  speed={40}
                  cursorColor="#FAC443"
                />
              </div>

              {/* Line 3 Subtext */}
              <p className="text-xs sm:text-sm font-medium text-[#E9D5FF]/80 mt-1 max-w-lg leading-relaxed whitespace-normal">
                Dari SMA &amp; SMK unggulan di kota metropolitan hingga pelosok daerah di Jawa, Sumatera, dan Kalimantan.
              </p>
            </div>
          </div>

          {/* DIVIDER ACCENT */}
          <div className="flex flex-col items-center justify-center opacity-40 text-[#FAC443]">
            <span className="text-4xl font-mono">✦</span>
            <div className="w-[1px] h-20 bg-gradient-to-b from-[#FAC443] to-transparent" />
          </div>

          {/* ================================================================= */}
          {/* CLUSTER 3: 25.000+ BUKU • FANNED 3D HARDCOVER DECK                */}
          {/* ================================================================= */}
          <div className="cluster relative flex items-center gap-8 md:gap-14 flex-shrink-0">
            {/* Floating Sticker */}
            <div className="absolute -top-10 -right-8 w-20 sm:w-28 pointer-events-none select-none z-30 sticker-bob-a filter drop-shadow-2xl rotate-6">
              <Image
                src="/images/loonart/hero_sticker_asset16.png"
                alt="Hardcover Sticker"
                width={112}
                height={112}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* FANNED 3D HARDCOVER DECK (Purple, Gold, Orange) */}
            <div className="relative w-56 sm:w-68 h-60 sm:h-72 flex-shrink-0 flex items-end justify-center pb-2">
              
              {/* Book 1: Deep Indigo #2A1B4E */}
              <div className="fan-book-1 fanned-origin absolute bottom-2 w-36 sm:w-44 h-48 sm:h-56 rounded-2xl bg-[#281648] border-2 border-[#FAC443]/40 shadow-[4px_4px_0px_#FAC443] p-3.5 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between text-[10px] font-mono font-black text-[#FAC443]">
                  <span>VOL. 01</span>
                  <span>✦</span>
                </div>
                <div className="font-display font-black text-sm uppercase text-white">
                  SMAN 1<br />ARCHIVE
                </div>
                <div className="h-2 w-full bg-[#FAC443] rounded-full" />
              </div>

              {/* Book 2: Mustard Gold #FAC443 */}
              <div className="fan-book-2 fanned-origin absolute bottom-2 w-36 sm:w-44 h-48 sm:h-56 rounded-2xl bg-[#FAC443] border-2 border-[#1E1233] shadow-[6px_6px_0px_#FF4D1F] p-3.5 flex flex-col justify-between z-10 text-[#1E1233]">
                <div className="flex items-center justify-between text-[10px] font-mono font-black">
                  <span className="bg-[#1E1233] text-white px-1.5 py-0.5 rounded text-[8px]">PREMIUM</span>
                  <span className="text-[#FF4D1F] font-black">2024</span>
                </div>
                <div className="font-display font-black text-sm uppercase text-[#1E1233]">
                  HARDCOVER<br />GOLD FOIL
                </div>
                <div className="h-2 w-full bg-[#1E1233] rounded-full" />
              </div>

              {/* Book 3: Fiery Red-Orange #FF4D1F */}
              <div className="fan-book-3 fanned-origin absolute bottom-2 w-36 sm:w-44 h-48 sm:h-56 rounded-2xl bg-[#FF4D1F] border-2 border-[#1E1233] shadow-[4px_4px_0px_#FAC443] p-3.5 flex flex-col justify-between z-20 text-white">
                <div className="flex items-center justify-between text-[10px] font-mono font-black">
                  <span>EXCLUSIVE</span>
                  <span>✦✦</span>
                </div>
                <div className="font-display font-black text-sm uppercase text-white">
                  FOURJECTIVE<br />EDITION
                </div>
                <div className="h-2 w-full bg-white rounded-full" />
              </div>
            </div>

            {/* Stacked Text Lockup */}
            <div className="flex flex-col justify-center gap-2 text-left">
              <div className="flex items-center gap-3">
                <CyberTypewriter
                  text="✦ STAGE 03 • STANDAR MUSEUM"
                  speed={30}
                  className="font-mono text-xs sm:text-sm font-black tracking-widest uppercase text-[#FAC443]"
                />
                <span className="w-8 h-[1px] bg-[#FAC443]/40" />
              </div>

              {/* Line 1 */}
              <div className="flex items-center gap-4 text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tight leading-none text-white">
                <MaskRevealWords
                  words={["MENCETAK"]}
                />
                <div className="word-badge bg-[#FAC443] text-[#1E1233] rotate-[-3deg] hover:rotate-0 border-2 border-[#1E1233] shadow-[4px_4px_0px_#FF4D1F]">
                  25.000+ BUKU
                </div>
              </div>

              {/* Line 2 with Pills & Typewriter */}
              <div className="flex items-center gap-4 text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tight leading-none text-white">
                <span className="text-[#E9D5FF]/60">HARDCOVER</span>
                <div className="word-badge bg-[#FF4D1F] text-white border-2 border-[#1E1233] rotate-[2deg] hover:rotate-0 shadow-[4px_4px_0px_#FAC443]">
                  JAHIT BENANG
                </div>
                <CyberTypewriter
                  text="ANTI-PUDAR"
                  delay={300}
                  speed={45}
                  cursorColor="#FAC443"
                />
              </div>

              {/* Line 3 Subtext */}
              <p className="text-xs sm:text-sm font-medium text-[#E9D5FF]/80 mt-1 max-w-lg leading-relaxed whitespace-normal">
                Bukan lem panas biasa yang rontok setelah 2 tahun. Setiap halaman dijahit benang presisi dan dilapisi laminasi doff velvet tahan jamur seumur hidup.
              </p>
            </div>
          </div>

          {/* DIVIDER ACCENT */}
          <div className="flex flex-col items-center justify-center opacity-40 text-[#FAC443]">
            <span className="text-4xl font-mono">✦</span>
            <div className="w-[1px] h-20 bg-gradient-to-b from-[#FAC443] to-transparent" />
          </div>

          {/* ================================================================= */}
          {/* CLUSTER 4: 350+ KONSEP • FANNED MOODBOARD • 1.800+ SHOOTS          */}
          {/* ================================================================= */}
          <div className="cluster relative flex items-center gap-8 md:gap-14 flex-shrink-0">
            {/* Floating Sticker */}
            <div className="absolute -top-10 -right-6 w-24 sm:w-32 pointer-events-none select-none z-30 sticker-bob-b filter drop-shadow-2xl rotate-12">
              <Image
                src="/images/loonart/hero_sticker_asset9.png"
                alt="The Crew Sticker"
                width={128}
                height={128}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Stacked Text Lockup */}
            <div className="flex flex-col justify-center gap-2 text-left">
              <div className="flex items-center gap-3">
                <CyberTypewriter
                  text="✦ STAGE 04 • KREATIVITAS TANPA BATAS"
                  speed={30}
                  className="font-mono text-xs sm:text-sm font-black tracking-widest uppercase text-[#FAC443]"
                />
                <span className="w-8 h-[1px] bg-[#FAC443]/40" />
              </div>

              {/* Line 1 */}
              <div className="flex items-center gap-4 text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tight leading-none text-white">
                <MaskRevealWords
                  words={["EKSPLORASI"]}
                />
                <div className="word-badge bg-[#FF4D1F] text-white rotate-[3deg] hover:rotate-0 border-2 border-[#1E1233] shadow-[4px_4px_0px_#FAC443]">
                  350+ KONSEP
                </div>
                <MaskRevealWords
                  words={["VISUAL"]}
                  className="text-[#E9D5FF]/60"
                />
              </div>

              {/* Line 2 with Pills & Typewriter */}
              <div className="flex items-center gap-4 text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tight leading-none text-white">
                <span className="text-[#E9D5FF]/60">OUT-OF-THE-BOX &amp;</span>
                <CyberTypewriter
                  text="1.800+ SHOOTS"
                  delay={250}
                  speed={45}
                  cursorColor="#FF4D1F"
                />
              </div>

              {/* Line 3 Subtext */}
              <p className="text-xs sm:text-sm font-medium text-[#E9D5FF]/80 mt-1 max-w-lg leading-relaxed whitespace-normal">
                Cyber Y2K, High-Fashion Editorial, Retro 90s, Wes Anderson, sampai Cinematic Drone. Nol template basi, tiap kelas punya identitas autentik!
              </p>
            </div>

            {/* FANNED CONCEPT MOODBOARD TAGS */}
            <div className="relative w-52 sm:w-64 h-56 sm:h-64 flex-shrink-0 flex items-end justify-center pb-4">
              <div className="fan-tag-1 fanned-origin absolute bottom-4 px-4 py-2.5 rounded-2xl bg-[#FF4D1F] text-white font-mono text-xs font-black uppercase shadow-[4px_4px_0px_#FAC443] border-2 border-[#1E1233] flex items-center gap-1">
                <span>#CYBER_Y2K</span>
              </div>
              <div className="fan-tag-2 fanned-origin absolute bottom-4 px-4 py-2.5 rounded-2xl bg-[#FAC443] text-[#1E1233] font-mono text-xs font-black uppercase shadow-[4px_4px_0px_#FF4D1F] border-2 border-[#1E1233] z-10 flex items-center gap-1">
                <span>#HIGH_FASHION</span>
              </div>
              <div className="fan-tag-3 fanned-origin absolute bottom-4 px-4 py-2.5 rounded-2xl bg-[#534CC3] text-white font-mono text-xs font-black uppercase shadow-[4px_4px_0px_#FAC443] border-2 border-[#1E1233] z-20 flex items-center gap-1">
                <span>#CINEMATIC_DRONE</span>
              </div>
              <div className="fan-tag-4 fanned-origin absolute bottom-4 px-4 py-2.5 rounded-2xl bg-[#1E1233] text-[#FAC443] font-mono text-xs font-black uppercase shadow-[4px_4px_0px_#FF4D1F] border-2 border-[#FAC443] z-30 flex items-center gap-1">
                <span>#RETRO_VINTAGE</span>
              </div>
            </div>
          </div>

          {/* DIVIDER ACCENT */}
          <div className="flex flex-col items-center justify-center opacity-40 text-[#FAC443]">
            <span className="text-4xl font-mono">✦</span>
            <div className="w-[1px] h-20 bg-gradient-to-b from-[#FAC443] to-transparent" />
          </div>

          {/* ================================================================= */}
          {/* CLUSTER 5: STUDIO STATS POP CARD (ABANK IRENK SOLID CARD)          */}
          {/* ================================================================= */}
          <div className="cluster flex items-center gap-6 p-8 rounded-[2.5rem] bg-[#23153C] border-3 border-[#FAC443] shadow-[8px_8px_0px_#FF4D1F] flex-shrink-0 text-white">
            <div className="flex flex-col gap-1">
              <span className="font-arcade text-3xl sm:text-4xl text-[#FAC443] font-bold">
                120+
              </span>
              <span className="font-display font-black text-xs sm:text-sm uppercase text-white">
                ANGKATAN SELESAI
              </span>
              <p className="text-[11px] text-[#E9D5FF]/70 font-medium">100% on-time sebelum wisuda.</p>
            </div>
            <div className="w-[2px] h-20 bg-white/20" />
            <div className="flex flex-col gap-1">
              <span className="font-arcade text-3xl sm:text-4xl text-[#FF4D1F] font-bold">
                15+
              </span>
              <span className="font-display font-black text-xs sm:text-sm uppercase text-white">
                KOTA SE-INDONESIA
              </span>
              <p className="text-[11px] text-[#E9D5FF]/70 font-medium">Jawa, Sumatera, Kalimantan, Bali.</p>
            </div>
            <div className="w-[2px] h-20 bg-white/20" />
            <div className="flex flex-col gap-1">
              <span className="font-arcade text-3xl sm:text-4xl text-[#FAC443] font-bold">
                100%
              </span>
              <span className="font-display font-black text-xs sm:text-sm uppercase text-white">
                GARANSI CETAK
              </span>
              <p className="text-[11px] text-[#E9D5FF]/70 font-medium">Retur &amp; cetak ulang gratis.</p>
            </div>
          </div>

          {/* ================================================================= */}
          {/* FINAL OUTRO / CTA STAMP CLUSTER                                   */}
          {/* ================================================================= */}
          <div className="cluster flex flex-col justify-center gap-4 pl-12 pr-12 text-left">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D1F]" />
              <CyberTypewriter
                text="✦ SIAP BIKIN KARYA BARENG KAMI?"
                speed={30}
                className="font-mono text-xs font-black uppercase tracking-wider text-[#FAC443]"
              />
            </div>

            <div className="text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tight text-white leading-[0.95]">
              <MaskRevealWords
                words={["SAATNYA", "ANGKATANMU"]}
              />
              <CyberTypewriter
                text="PUNYA BUKU LEGENDARIS."
                delay={200}
                speed={40}
                cursorColor="#FF4D1F"
                className="text-[#FAC443] underline decoration-wavy decoration-[#FF4D1F]"
              />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <Link
                href="#calculator"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FAC443] text-[#1E1233] font-display font-black text-lg sm:text-xl hover:bg-[#FF4D1F] hover:text-white transition-all transform hover:scale-105 shadow-[6px_6px_0px_#1E1233] border-2 border-[#1E1233] cursor-pointer"
              >
                <span>SIMULASI BIAYA SEKARANG</span>
                <ArrowUpRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SLIM PROGRESS BAR INDICATOR */}
      <div className="w-full bg-white/10 h-2 relative overflow-hidden z-30 border-t border-[#FAC443]/30">
        <div
          id="traction-progress-fill"
          className="h-full bg-gradient-to-r from-[#FF4D1F] to-[#FAC443] transition-[width] duration-75"
          style={{ width: "0%" }}
        />
      </div>
    </section>
  );
}
