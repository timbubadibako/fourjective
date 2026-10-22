"use client";

import React, { useState } from "react";
import { MessageCircle, RotateCcw, Check } from "lucide-react";

export default function CalculatorV4() {
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
      `• Jumlah Siswa: ${students} Siswa\n` +
      `• Tebal Halaman: ${pages} Halaman Hardcover Pur-Binding\n` +
      `• Cinematic 4K Aftermovie: ${videoActive ? "YA" : "TIDAK"}\n` +
      `• Cover Foil Emas/Perak: ${foilActive ? "YA" : "TIDAK"}\n` +
      `• 3D Virtual Flipbook: INCLUDE (Gratis Seumur Hidup)\n\n` +
      `Estimasi Patungan: Rp ${perStudent.toLocaleString("id-ID")} / siswa\n` +
      `Total Anggaran: Rp ${total.toLocaleString("id-ID")}\n\n` +
      `Mohon info ketersediaan slot tanggal & sesi konsultasi konsep untuk angkatan kami.`
  );

  return (
    <section
      id="calculator"
      className="relative w-full bg-[#14161C] text-white border-b-4 border-dark overflow-hidden select-none py-16 sm:py-20 md:py-24 px-4 sm:px-8"
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* HEADER: CLEAN (NO CHIP) + PLAYTIMES */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="font-playtimes text-4xl sm:text-6xl md:text-7xl leading-[1.05] tracking-normal drop-shadow-md">
            Hitung Biaya Kas,
            <br />
            <span className="text-orange">Transparan Sejak Awal.</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-white/70 mt-3 font-semibold leading-relaxed">
            Geser slider sesuai jumlah siswa angkatanmu. Tanpa biaya siluman atau biaya tambahan tersembunyi.
          </p>
        </div>

        {/* CONSOLE SIMULATOR */}
        <div className="rounded-2xl bg-[#1C1F26] border-3 border-white/15 p-6 sm:p-9 shadow-[6px_6px_0px_#18181B]">
          {/* Preset Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-7 border-b border-white/10 text-xs">
            <span className="font-mono text-xs text-white/60 font-bold uppercase tracking-wider">
              Pilihan Cepat:
            </span>

            <div className="flex items-center gap-2 flex-wrap">
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setStudents(p.stu);
                    setPages(p.pgs);
                  }}
                  className={`px-3 py-1 rounded-lg border font-mono text-xs font-bold transition-all cursor-pointer ${
                    students === p.stu && pages === p.pgs
                      ? "bg-orange text-white border-orange shadow-sm"
                      : "bg-white/5 hover:bg-white/10 border-white/10 text-white/70"
                  }`}
                >
                  {p.label}
                </button>
              ))}
              <button
                type="button"
                onClick={handleReset}
                title="Reset ke Default"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-orange text-white/70 hover:text-white border border-white/10 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* SLIDERS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div className="bg-[#181A20] border border-white/10 p-5 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <label className="font-headline text-sm uppercase tracking-wider text-white font-bold">
                  Jumlah Siswa
                </label>
                <span className="font-mono text-lg font-black text-orange bg-black/60 px-3 py-1 rounded-lg border border-white/10">
                  {students} Siswa
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={450}
                step={10}
                value={students}
                onChange={(e) => setStudents(Number(e.target.value))}
                className="w-full accent-[#FF4D00] cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-white/40 mt-1">
                <span>50 Siswa</span>
                <span>450 Siswa</span>
              </div>
            </div>

            <div className="bg-[#181A20] border border-white/10 p-5 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <label className="font-headline text-sm uppercase tracking-wider text-white font-bold">
                  Tebal Halaman
                </label>
                <span className="font-mono text-lg font-black text-orange bg-black/60 px-3 py-1 rounded-lg border border-white/10">
                  {pages} Halaman
                </span>
              </div>
              <input
                type="range"
                min={60}
                max={200}
                step={10}
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                className="w-full accent-[#FF4D00] cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-white/40 mt-1">
                <span>60 Hal</span>
                <span>200 Hal</span>
              </div>
            </div>
          </div>

          {/* TOGGLE OPTIONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <button
              type="button"
              onClick={() => setVideoActive(!videoActive)}
              className={`p-4 rounded-xl border-2 flex items-center justify-between text-left transition-all cursor-pointer ${
                videoActive
                  ? "bg-orange/15 border-orange text-white"
                  : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
              }`}
            >
              <div>
                <div className="font-headline font-bold text-sm uppercase">Aftermovie 4K + Drone</div>
                <div className="font-mono text-[11px] text-white/60 mt-0.5">+Rp 30.000 / siswa</div>
              </div>
              <div
                className={`w-6 h-6 rounded-md border flex items-center justify-center ${
                  videoActive ? "bg-orange border-white text-white" : "border-white/20"
                }`}
              >
                {videoActive && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFoilActive(!foilActive)}
              className={`p-4 rounded-xl border-2 flex items-center justify-between text-left transition-all cursor-pointer ${
                foilActive
                  ? "bg-orange/15 border-orange text-white"
                  : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
              }`}
            >
              <div>
                <div className="font-headline font-bold text-sm uppercase">Cover Foil Emas / Perak</div>
                <div className="font-mono text-[11px] text-white/60 mt-0.5">+Rp 15.000 / siswa</div>
              </div>
              <div
                className={`w-6 h-6 rounded-md border flex items-center justify-center ${
                  foilActive ? "bg-orange border-white text-white" : "border-white/20"
                }`}
              >
                {foilActive && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
            </button>
          </div>

          {/* RESULT BOX */}
          <div className="bg-[#14161C] border-2 border-white/15 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 font-bold block">
                Estimasi Patungan Per Siswa
              </span>
              <div className="font-display font-black text-4xl sm:text-5xl text-orange leading-tight">
                Rp {perStudent.toLocaleString("id-ID")}
                <span className="font-mono text-sm text-white/60 font-normal"> / siswa</span>
              </div>
              <div className="font-mono text-xs text-white/50">
                Total Angkatan ({students} siswa):{" "}
                <span className="text-white font-bold">Rp {total.toLocaleString("id-ID")}</span>
              </div>
            </div>

            <a
              href={`https://wa.me/6289657008080?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white font-mono font-black text-xs sm:text-sm uppercase tracking-wider px-6 py-4 rounded-xl border-2 border-white shadow-[3px_3px_0px_#FFFFFF] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex-shrink-0 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>AJUKAN ESTIMASI KE WHATSAPP</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
