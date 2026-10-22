"use client";

import React, { useState } from "react";
import { MessageCircle, RotateCcw, Check, Zap } from "lucide-react";

export default function CalculatorV3() {
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
    <section
      id="calculator"
      className="relative w-full bg-brand-950 text-white border-b-4 border-dark overflow-hidden select-none"
    >
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-brand-700/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 py-20">
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-black/50 border border-white/20 text-brand-300 font-mono text-xs font-black px-4 py-1.5 rounded-full uppercase">
            <Zap className="w-3.5 h-3.5 text-accent-yellow" />
            <span>Simulator Kas Angkatan // Live</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tighter text-white mt-4 leading-[0.95]">
            Hitung Biaya Patungan{" "}
            <span className="text-brand-300 block sm:inline">Seketika</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 mt-3 font-medium max-w-lg mx-auto">
            Nol biaya siluman. Geser slider atau pakai preset di bawah untuk simulasi patungan kas kelas
            secara transparan.
          </p>
        </div>

        {/* CONSOLE */}
        <div className="rounded-[2rem] bg-ink-soft border-3 border-white/15 p-6 sm:p-9 relative shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
          {/* Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-7 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs text-zinc-200 font-bold uppercase">Live Estimator Console</span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-mono text-[10px] text-zinc-500 font-bold uppercase mr-1">
                Preset cepat:
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
                      ? "bg-brand-700 text-white border-brand-400"
                      : "bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300"
                  }`}
                >
                  {p.label}
                </button>
              ))}
              <button
                type="button"
                onClick={handleReset}
                title="Reset ke Default"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-brand-700 text-zinc-400 hover:text-white border border-white/10 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* SLIDERS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <label className="font-headline text-sm uppercase tracking-wider text-zinc-200 font-bold">
                  Jumlah Siswa / Angkatan
                </label>
                <span className="font-mono text-lg font-black text-brand-300 bg-black/60 px-3 py-1 rounded-lg border border-white/10">
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
                className="w-full accent-brand-700 h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-2 font-bold">
                <span>50 Siswa (Min)</span>
                <span>300</span>
                <span>600+ Siswa</span>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <label className="font-headline text-sm uppercase tracking-wider text-zinc-200 font-bold">
                  Ketebalan Buku
                </label>
                <span className="font-mono text-lg font-black text-accent-yellow bg-black/60 px-3 py-1 rounded-lg border border-white/10">
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
                className="w-full accent-yellow-400 h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-2 font-bold">
                <span>60 Halaman</span>
                <span>120 (Standar)</span>
                <span>240 Halaman</span>
              </div>
            </div>
          </div>

          {/* TOGGLES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <button
              type="button"
              onClick={() => setVideoActive(!videoActive)}
              className={`p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${
                videoActive
                  ? "bg-brand-700/25 border-brand-400 text-white"
                  : "bg-white/[0.03] border-white/10 text-zinc-400"
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
                  videoActive ? "bg-brand-700 text-white" : "bg-white/10 text-zinc-500"
                }`}
              >
                {videoActive ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : "+"}
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFoilActive(!foilActive)}
              className={`p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${
                foilActive
                  ? "bg-brand-700/25 border-brand-400 text-white"
                  : "bg-white/[0.03] border-white/10 text-zinc-400"
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
                  foilActive ? "bg-brand-700 text-white" : "bg-white/10 text-zinc-500"
                }`}
              >
                {foilActive ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : "+"}
              </div>
            </button>
          </div>

          {/* OUTPUT */}
          <div className="bg-brand-900 border-2 border-white/10 p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="font-mono text-xs uppercase tracking-wider text-brand-300 font-bold block mb-1">
                Estimasi iuran patungan:
              </span>
              <div className="font-display font-black text-4xl sm:text-5xl text-white leading-tight">
                Rp {perStudent.toLocaleString("id-ID")}
                <span className="text-sm font-sans text-zinc-300 font-medium ml-2">/ siswa</span>
              </div>
              <div className="text-xs text-zinc-300 font-mono mt-1 font-bold">
                Total anggaran kas: Rp {total.toLocaleString("id-ID")} (termasuk 3D Flipbook &amp; free ongkir)
              </div>
            </div>

            <a
              href={`https://wa.me/6281234567890?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-accent-wa text-dark px-7 py-4 rounded-2xl font-headline font-black text-sm uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#0B2054] hover:bg-white transition-all text-center"
            >
              <MessageCircle className="w-5 h-5 fill-dark text-transparent" />
              <span>Kirim Simulasi ke WA</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
