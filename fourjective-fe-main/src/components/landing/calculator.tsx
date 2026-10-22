"use client";

import React, { useState } from "react";
import { MessageCircle, Sparkles, RotateCcw, Check, Sliders, ShieldCheck } from "lucide-react";

export default function Calculator() {
  const [students, setStudents] = useState<number>(180);
  const [pages, setPages] = useState<number>(120);
  const [videoActive, setVideoActive] = useState<boolean>(true);
  const [foilActive, setFoilActive] = useState<boolean>(false);

  const handleReset = () => {
    setStudents(180);
    setPages(120);
    setVideoActive(true);
    setFoilActive(false);
  };

  const setPreset = (stuCount: number, pageCount: number) => {
    setStudents(stuCount);
    setPages(pageCount);
  };

  // Pricing Logic (Economy of scale)
  let basePerStudent = 180000;
  if (students <= 100) basePerStudent = 220000;
  else if (students <= 150) basePerStudent = 195000;
  else if (students <= 220) basePerStudent = 175000;
  else if (students <= 320) basePerStudent = 160000;
  else basePerStudent = 145000;

  const extraPages = Math.max(0, pages - 80);
  const pageCost = extraPages * 550;
  const videoCost = videoActive ? 35000 : 0;
  const foilCost = foilActive ? 15000 : 0;

  const perStudent = Math.round((basePerStudent + pageCost + videoCost + foilCost) / 1000) * 1000;
  const total = perStudent * students;

  // WhatsApp Pre-filled message
  const waText = encodeURIComponent(
    `⚡ Halo Fourjective Studio! Saya simulasikan anggaran kas buku tahunan via Estimator Kas Angkatan:\n` +
    `★ Jumlah Siswa: ${students} Orang\n` +
    `★ Tebal Halaman: ${pages} Halaman (Hardcover Doff)\n` +
    `★ 4K Drone Aftermovie: ${videoActive ? "AKTIF (+Rp 35.000)" : "TIDAK (OFF)"}\n` +
    `★ Holographic Foil: ${foilActive ? "AKTIF (+Rp 15.000)" : "TIDAK (OFF)"}\n` +
    `★ 3D Virtual Flipbook: INCLUDE (FREE 100%)\n` +
    `★ Patungan / Siswa: Rp ${perStudent.toLocaleString("id-ID")}\n` +
    `★ Total Estimasi Kas: Rp ${total.toLocaleString("id-ID")}\n\n` +
    `Mohon info ketersediaan slot photoshoot & jadwal konsultasi untuk angkatan kami!`
  );

  return (
    <section id="calculator" className="py-24 px-4 md:px-8 max-w-5xl mx-auto relative select-none">
      {/* Background Glow Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[500px] bg-gradient-to-r from-orange/15 via-[#A855F7]/10 to-[#06B6D4]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header Lockup */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-dark text-accent-yellow font-mono text-xs font-black px-4 py-1.5 rounded-full border-2 border-dark shadow-sm uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>SIMULASI KAS ANGKATAN // ESTIMATOR V2.6</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-dark mt-4 leading-tight">
          HITUNG BIAYA PATUNGAN <span className="text-orange underline decoration-wavy decoration-accent-yellow">SEKETIKA</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 mt-2 font-medium max-w-lg mx-auto">
          Nol biaya siluman. Gunakan slider fader &amp; opsi tambahan di bawah untuk simulasi patungan kas kelas secara transparan dan akurat.
        </p>
      </div>

      {/* TACTILE HARDWARE CONSOLE (TRANSLUCENT ACRYLIC CASING) */}
      <div className="cyber-jelly-shell rounded-[2.5rem] p-5 sm:p-8 text-white relative shadow-2xl border-2 border-orange/40">
        {/* Physical Scotch Tape Decals at Top Corners */}
        <div className="scotch-tape -top-3.5 left-10 rotate-[-8deg] hidden sm:block" />
        <div className="scotch-tape -top-3.5 right-10 rotate-[6deg] hidden sm:block" />

        {/* Top Control Bar: Status LEDs + Model Tag + Presets */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-zinc-800 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
              <span className="font-mono text-[10px] text-emerald-400 font-bold tracking-wider">ONLINE</span>
            </div>
            <span className="font-mono text-[11px] text-zinc-400 font-bold hidden sm:inline">
              FOURJECTIVE // BUDGET SIMULATOR
            </span>
          </div>

          {/* Quick Angkatan Presets */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-mono text-[10px] text-zinc-500 font-bold uppercase hidden md:inline">PRESET:</span>
            <button
              type="button"
              onClick={() => setPreset(100, 100)}
              className="px-2.5 py-1 rounded bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700 font-mono text-[10px] font-bold text-zinc-300 transition-colors"
            >
              100 SISWA
            </button>
            <button
              type="button"
              onClick={() => setPreset(180, 120)}
              className="px-2.5 py-1 rounded bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700 font-mono text-[10px] font-bold text-zinc-300 transition-colors"
            >
              180 SISWA
            </button>
            <button
              type="button"
              onClick={() => setPreset(320, 160)}
              className="px-2.5 py-1 rounded bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700 font-mono text-[10px] font-bold text-zinc-300 transition-colors"
            >
              320 SISWA
            </button>
            <button
              type="button"
              onClick={handleReset}
              title="Reset ke Default"
              className="p-1 rounded bg-zinc-800/80 hover:bg-orange hover:text-white border border-zinc-700 text-zinc-400 transition-colors flex items-center justify-center"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* BACKLIT NEON CYBER SCREEN (MAIN DIGITAL READOUT) */}
        <div className="cyber-screen rounded-2xl p-4 sm:p-6 mb-6 relative overflow-hidden">
          {/* Subtle Grid Watermark on Screen */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,#22C55E_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

          {/* Screen Top Status Bar */}
          <div className="flex items-center justify-between border-b border-emerald-950 pb-2 mb-3 text-[10px] font-mono">
            <span className="text-emerald-400 font-bold">
              [ REALTIME CALCULATION &bull; ANGKATAN 2026 ]
            </span>
            <span className="text-zinc-500 font-bold">
              100% TRANSPARENT RATE
            </span>
          </div>

          {/* Big Output Meters (Per Siswa & Total Kas) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            
            {/* Meter 1: Per Siswa */}
            <div className="p-4 rounded-xl bg-black/60 border border-emerald-900/60 relative">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-400/90 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                ESTIMASI PATUNGAN / SISWA
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display font-black text-3xl sm:text-4xl text-emerald-300 tracking-tight">
                  Rp {perStudent.toLocaleString("id-ID")}
                </span>
                <span className="font-mono text-xs text-zinc-500 font-bold">/ pax</span>
              </div>
              <span className="font-mono text-[10px] text-zinc-400 block mt-1">
                *Sudah termasuk cetak hardcover, sesi studio, &amp; editing.
              </span>
            </div>

            {/* Meter 2: Total Kas Angkatan */}
            <div className="p-4 rounded-xl bg-black/60 border border-orange/40 relative">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-orange flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange" />
                TOTAL ESTIMASI KAS ANGKATAN
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display font-black text-3xl sm:text-4xl text-orange tracking-tight">
                  Rp {total.toLocaleString("id-ID")}
                </span>
                <span className="font-mono text-xs text-zinc-500 font-bold">({students} Buku)</span>
              </div>
              <span className="font-mono text-[10px] text-zinc-400 block mt-1">
                *Dapat dicicil kas 3x termin sesuai jadwal produksi.
              </span>
            </div>

          </div>

          {/* Live Parameter Matrix Badges */}
          <div className="mt-4 pt-3 border-t border-emerald-950 flex flex-wrap items-center gap-2 font-mono text-[10px] font-bold text-zinc-400">
            <span className="px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-400 border border-emerald-800/60">
              👥 {students} SISWA
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-400 border border-emerald-800/60">
              📖 {pages} HALAMAN
            </span>
            <span className={`px-2 py-0.5 rounded border ${videoActive ? "bg-orange/20 text-orange border-orange/50" : "bg-zinc-900 text-zinc-500 border-zinc-800"}`}>
              🚁 DRONE 4K: {videoActive ? "AKTIF (+35K)" : "OFF"}
            </span>
            <span className={`px-2 py-0.5 rounded border ${foilActive ? "bg-pink-950/50 text-pink-400 border-pink-700/50" : "bg-zinc-900 text-zinc-500 border-zinc-800"}`}>
              ✨ GOLD/HOLO FOIL: {foilActive ? "AKTIF (+15K)" : "OFF"}
            </span>
            <span className="px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-700/60">
              🎁 3D FLIPBOOK: FREE 100%
            </span>
          </div>

        </div>

        {/* SYNTHESIZER SLIDER FADERS (VOLUME & DEPTH) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 mb-6">
          
          {/* Fader 1: Jumlah Siswa */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs font-black uppercase text-zinc-200 tracking-wider flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-orange" />
                JUMLAH SISWA / ANGKATAN
              </span>
              <span className="font-mono text-sm font-black text-orange bg-black/60 px-3 py-0.5 rounded border border-orange/40">
                {students} SISWA
              </span>
            </div>
            <input
              type="range"
              min="80"
              max="450"
              step="5"
              value={students}
              onChange={(e) => setStudents(parseInt(e.target.value, 10))}
              className="slider-cyber-fader w-full cursor-pointer appearance-none bg-transparent my-1"
            />
            <div className="flex justify-between font-mono text-[9px] text-zinc-500 font-bold px-1">
              <span>80 MIN (3 KELAS)</span>
              <span>180 AVG (6 KELAS)</span>
              <span>320 HIGH</span>
              <span>450 MAX</span>
            </div>
          </div>

          {/* Fader 2: Tebal Halaman */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs font-black uppercase text-zinc-200 tracking-wider flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-accent-yellow" />
                TEBAL HALAMAN BUKU
              </span>
              <span className="font-mono text-sm font-black text-accent-yellow bg-black/60 px-3 py-0.5 rounded border border-accent-yellow/40">
                {pages} HALAMAN
              </span>
            </div>
            <input
              type="range"
              min="80"
              max="240"
              step="10"
              value={pages}
              onChange={(e) => setPages(parseInt(e.target.value, 10))}
              className="slider-cyber-fader w-full cursor-pointer appearance-none bg-transparent my-1"
            />
            <div className="flex justify-between font-mono text-[9px] text-zinc-500 font-bold px-1">
              <span>80 HAL (RINGKAS)</span>
              <span>120 HAL (STANDAR)</span>
              <span>180 HAL (TEBAL)</span>
              <span>240 MAX</span>
            </div>
          </div>

        </div>

        {/* TACTILE LED ADD-ON MODULES (DRUM PADS) */}
        <div className="mb-6">
          <div className="font-mono text-[11px] font-black uppercase text-zinc-400 mb-3 tracking-wider flex items-center gap-2">
            <span>✦ MODUL FITUR &amp; ADD-ON ANGKATAN:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            
            {/* Module 1: 4K Drone Aftermovie */}
            <div
              onClick={() => setVideoActive((prev) => !prev)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                videoActive
                  ? "bg-orange/20 border-orange shadow-[0_0_15px_rgba(255,85,0,0.25)] translate-y-[-2px]"
                  : "bg-zinc-900/80 border-zinc-800 hover:border-zinc-700 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`w-2.5 h-2.5 rounded-full ${videoActive ? "bg-orange shadow-[0_0_8px_#FF5500]" : "bg-zinc-700"}`} />
                <span className="font-mono text-[10px] font-black text-zinc-400 uppercase">
                  {videoActive ? "ON" : "OFF"}
                </span>
              </div>
              <div className="mt-3">
                <span className="font-display font-black text-sm uppercase block text-white">
                  4K Drone Reel
                </span>
                <span className="font-mono text-[10px] text-zinc-400 block mt-0.5">
                  +Rp 35.000 / siswa
                </span>
              </div>
            </div>

            {/* Module 2: Hologram Foil */}
            <div
              onClick={() => setFoilActive((prev) => !prev)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                foilActive
                  ? "bg-pink-900/30 border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.25)] translate-y-[-2px]"
                  : "bg-zinc-900/80 border-zinc-800 hover:border-zinc-700 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`w-2.5 h-2.5 rounded-full ${foilActive ? "bg-pink-400 shadow-[0_0_8px_#F472B6]" : "bg-zinc-700"}`} />
                <span className="font-mono text-[10px] font-black text-zinc-400 uppercase">
                  {foilActive ? "ON" : "OFF"}
                </span>
              </div>
              <div className="mt-3">
                <span className="font-display font-black text-sm uppercase block text-white">
                  Gold/Holo Foil
                </span>
                <span className="font-mono text-[10px] text-zinc-400 block mt-0.5">
                  +Rp 15.000 / siswa
                </span>
              </div>
            </div>

            {/* Module 3: 3D Flipbook (Locked Free) */}
            <div className="p-3.5 rounded-xl border border-cyan-800/60 bg-cyan-950/30 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22D3EE]" />
                <span className="font-mono text-[9px] font-black text-cyan-300 uppercase px-1.5 py-0.5 rounded bg-cyan-900/50">
                  FREE 100%
                </span>
              </div>
              <div className="mt-3">
                <span className="font-display font-black text-sm uppercase block text-white">
                  3D Flipbook Web
                </span>
                <span className="font-mono text-[10px] text-cyan-300/80 block mt-0.5">
                  Akses web selamanya
                </span>
              </div>
            </div>

            {/* Module 4: Retouch Studio (Locked Free) */}
            <div className="p-3.5 rounded-xl border border-emerald-800/60 bg-emerald-950/30 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
                <span className="font-mono text-[9px] font-black text-emerald-300 uppercase px-1.5 py-0.5 rounded bg-emerald-900/50">
                  INCLUDED
                </span>
              </div>
              <div className="mt-3">
                <span className="font-display font-black text-sm uppercase block text-white">
                  Retouch &amp; Grade
                </span>
                <span className="font-mono text-[10px] text-emerald-300/80 block mt-0.5">
                  Standar studio museum
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM GUARANTEE & WHATSAPP ACTION */}
        <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Garansi cetak tepat waktu sebelum wisuda &amp; proofing dummy fisik gratis.</span>
          </div>

          <a
            href={`https://wa.me/6289657008080?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-orange text-white hover:bg-orange/90 font-mono text-xs sm:text-sm font-black uppercase tracking-wider transition-all transform hover:scale-105 shadow-[0_0_25px_rgba(255,85,0,0.4)] border-2 border-white/20 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>KUNCI TANGGAL &amp; AJUKAN KE WA ➔</span>
          </a>
        </div>

      </div>

      <div className="text-center mt-3">
        <span className="font-mono text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
          ✦ ESTIMASI OTOMATIS SUDAH INCLUDE ONGKIR SAMPLE DUMMY SE-INDONESIA ✦
        </span>
      </div>

    </section>
  );
}
