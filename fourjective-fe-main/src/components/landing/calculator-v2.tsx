"use client";

import React, { useState } from "react";
import { MessageCircle, Sparkles, RotateCcw, Check, Sliders, ShieldCheck, Zap } from "lucide-react";

export default function CalculatorV2() {
  const [students, setStudents] = useState<number>(180);
  const [pages, setPages] = useState<number>(120);
  const [videoActive, setVideoActive] = useState<boolean>(true);
  const [foilActive, setFoilActive] = useState<boolean>(false);

  const presets = [
    { label: "100 SISWA", stu: 100, pgs: 100 },
    { label: "180 SISWA", stu: 180, pgs: 120 },
    { label: "250 SISWA", stu: 250, pgs: 140 },
    { label: "350 SISWA", stu: 350, pgs: 160 },
  ];

  const handleReset = () => {
    setStudents(180);
    setPages(120);
    setVideoActive(true);
    setFoilActive(false);
  };

  // Pricing Logic with economy of scale
  let basePerStudent = 180000;
  if (students <= 100) basePerStudent = 220000;
  else if (students <= 150) basePerStudent = 195000;
  else if (students <= 220) basePerStudent = 175000;
  else if (students <= 320) basePerStudent = 160000;
  else basePerStudent = 145000;

  const extraPages = Math.max(0, pages - 80);
  const pageCost = extraPages * 500;
  const videoCost = videoActive ? 30000 : 0;
  const foilCost = foilActive ? 15000 : 0;

  const perStudent = Math.round((basePerStudent + pageCost + videoCost + foilCost) / 1000) * 1000;
  const total = perStudent * students;

  const waMessage = encodeURIComponent(
    `⚡ Halo Fourjective Studio! Kami ingin konsultasi anggaran buku tahunan:\n\n` +
    `• Jumlah Angkatan: ${students} Siswa\n` +
    `• Tebal Halaman: ${pages} Halaman Hardcover Pur-Binding\n` +
    `• Cinematic 4K Aftermovie: ${videoActive ? "YA (Aktif)" : "TIDAK"}\n` +
    `• Cover Foil Emas/Perak: ${foilActive ? "YA (Aktif)" : "TIDAK"}\n` +
    `• 3D Virtual Flipbook: INCLUDE (Gratis Seumur Hidup)\n\n` +
    `Estimasi Patungan: Rp ${perStudent.toLocaleString("id-ID")} / siswa\n` +
    `Total Estimasi Anggaran: Rp ${total.toLocaleString("id-ID")}\n\n` +
    `Mohon info ketersediaan slot tanggal & sesi konsultasi konsep untuk angkatan kami.`
  );

  return (
    <section id="calculator" className="py-24 px-4 md:px-8 max-w-5xl mx-auto relative select-none">
      {/* Background Glow Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[500px] bg-gradient-to-r from-orange/15 via-[#A855F7]/10 to-[#06B6D4]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-dark text-accent-yellow font-mono text-xs font-black px-4 py-1.5 rounded-full border-2 border-dark shadow-sm uppercase">
          <Zap className="w-3.5 h-3.5 text-orange" />
          <span>SIMULATOR KAS ANGKATAN // V2.0 ULTRA-TRANSPARAN</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-dark mt-4 leading-tight">
          HITUNG BIAYA PATUNGAN <span className="text-orange underline decoration-wavy">SEKETIKA</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 mt-2 font-medium max-w-lg mx-auto">
          Nol biaya siluman. Gunakan slider fader &amp; tombol preset di bawah untuk simulasi patungan kas kelas secara transparan dan akurat.
        </p>
      </div>

      {/* Main Console Box */}
      <div className="rounded-[2.5rem] bg-[#14151A] p-6 sm:p-10 text-white relative shadow-2xl border-3 border-dark">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-zinc-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs text-zinc-300 font-bold uppercase">
              LIVE ESTIMATOR CONSOLE
            </span>
          </div>

          {/* 1-Click Presets */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-mono text-[10px] text-zinc-500 font-bold uppercase mr-1">
              PRESET CEPAT:
            </span>
            {presets.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  setStudents(p.stu);
                  setPages(p.pgs);
                }}
                className={`px-3 py-1 rounded-lg border font-mono text-xs font-bold transition-all ${
                  students === p.stu && pages === p.pgs
                    ? "bg-orange text-white border-orange shadow-sm"
                    : "bg-zinc-800/80 hover:bg-zinc-700 border-zinc-700 text-zinc-300"
                }`}
              >
                {p.label}
              </button>
            ))}
            <button
              type="button"
              onClick={handleReset}
              title="Reset ke Default"
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-orange text-zinc-400 hover:text-white border border-zinc-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Sliders & Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Slider 1: Jumlah Siswa */}
          <div className="bg-zinc-900/80 p-5 rounded-2xl border border-zinc-800">
            <div className="flex items-center justify-between mb-3">
              <label className="font-headline text-sm uppercase tracking-wider text-zinc-300 font-bold">
                Jumlah Siswa / Angkatan
              </label>
              <span className="font-mono text-lg font-black text-orange bg-zinc-950 px-3 py-1 rounded-lg border border-zinc-800">
                {students} Orang
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={600}
              step={10}
              value={students}
              onChange={(e) => setStudents(Number(e.target.value))}
              className="w-full accent-orange h-2 bg-zinc-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-2 font-bold">
              <span>50 Siswa (Min)</span>
              <span>300</span>
              <span>600+ Siswa</span>
            </div>
          </div>

          {/* Slider 2: Tebal Halaman */}
          <div className="bg-zinc-900/80 p-5 rounded-2xl border border-zinc-800">
            <div className="flex items-center justify-between mb-3">
              <label className="font-headline text-sm uppercase tracking-wider text-zinc-300 font-bold">
                Ketebalan Buku
              </label>
              <span className="font-mono text-lg font-black text-accent-yellow bg-zinc-950 px-3 py-1 rounded-lg border border-zinc-800">
                {pages} Halaman
              </span>
            </div>
            <input
              type="range"
              min={60}
              max={240}
              step={10}
              value={pages}
              onChange={(e) => setPages(Number(e.target.value))}
              className="w-full accent-yellow-400 h-2 bg-zinc-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-2 font-bold">
              <span>60 Halaman</span>
              <span>120 (Standar)</span>
              <span>240 Halaman</span>
            </div>
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <button
            type="button"
            onClick={() => setVideoActive(!videoActive)}
            className={`p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${
              videoActive
                ? "bg-orange/10 border-orange text-white"
                : "bg-zinc-900/60 border-zinc-800 text-zinc-400"
            }`}
          >
            <div>
              <div className="font-headline font-bold text-sm uppercase">
                4K Drone &amp; Cinematic Aftermovie
              </div>
              <div className="text-[11px] text-zinc-400 font-medium mt-0.5">
                Pilot drone, 2 videografer, teaser 60s + full cut
              </div>
            </div>
            <div
              className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                videoActive ? "bg-orange text-white" : "bg-zinc-800 text-zinc-500"
              }`}
            >
              {videoActive ? "✓" : "+"}
            </div>
          </button>

          <button
            type="button"
            onClick={() => setFoilActive(!foilActive)}
            className={`p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${
              foilActive
                ? "bg-purple-900/20 border-purple-500 text-white"
                : "bg-zinc-900/60 border-zinc-800 text-zinc-400"
            }`}
          >
            <div>
              <div className="font-headline font-bold text-sm uppercase">
                Custom Foil Cover (Gold / Silver / Holo)
              </div>
              <div className="text-[11px] text-zinc-400 font-medium mt-0.5">
                Emboss &amp; hot-stamping foil kilap premium di cover
              </div>
            </div>
            <div
              className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                foilActive ? "bg-purple-600 text-white" : "bg-zinc-800 text-zinc-500"
              }`}
            >
              {foilActive ? "✓" : "+"}
            </div>
          </button>
        </div>

        {/* Summary Output Board */}
        <div className="bg-zinc-950 p-6 sm:p-8 rounded-3xl border-2 border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-bold block mb-1">
              ESTIMASI IURAN PATUNGAN:
            </span>
            <div className="font-display font-black text-4xl sm:text-5xl text-orange leading-tight">
              Rp {perStudent.toLocaleString("id-ID")}
              <span className="text-sm font-sans text-zinc-400 font-medium ml-2">/ siswa</span>
            </div>
            <div className="text-xs text-zinc-400 font-mono mt-1 font-bold">
              Total Anggaran Kas: Rp {total.toLocaleString("id-ID")} (Termasuk 3D Flipbook &amp; Free Ongkir)
            </div>
          </div>

          <a
            href={`https://wa.me/6281234567890?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-accent-wa text-dark px-7 py-4 rounded-2xl font-headline font-black text-sm uppercase tracking-wider border-2 border-dark shadow-[4px_4px_0px_#000] hover:bg-white transition-all text-center"
          >
            <MessageCircle className="w-5 h-5 fill-dark text-transparent" />
            <span>KIRIM SIMULASI KE WA</span>
          </a>
        </div>
      </div>
    </section>
  );
}
