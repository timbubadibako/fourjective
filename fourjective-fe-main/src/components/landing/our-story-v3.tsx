"use client";

import React from "react";
import { ArrowRight, Award, Heart, ShieldCheck, Sparkles } from "lucide-react";

const VALUES = [
  {
    icon: Award,
    title: "Kualitas Tanpa Tawar",
    desc: "Mesin offset Heidelberg, bukan print lokal. QC per eksemplar dan garansi cetak ulang gratis.",
  },
  {
    icon: Heart,
    title: "Satu Tim, Satu Jadwal",
    desc: "Empat pilar dikerjakan tim yang sama, jadi tidak ada pekerjaan yang menggantung antar-vendor.",
  },
  {
    icon: ShieldCheck,
    title: "Privitas Data Siswa",
    desc: "Foto angkatan hanya bisa diakses lewat portal berpassword, bukan galeri publik.",
  },
];

const TIMELINE = [
  { year: "2017", title: "Studio berdiri di Kuningan", desc: "Cetak pertama: 120 siswa, satu meja produksi." },
  { year: "2020", title: "Mobile studio masuk sekolah", desc: "Set lighting lengkap dibawa langsung ke lokasi angkatan." },
  { year: "2023", title: "4K + drone jadi standar", desc: "Dokumenter sinematik bukan lagi tambahan, tapi bawaan." },
  { year: "2026", title: "Flipbook digital untuk semua", desc: "Setiap buku punya versi digital 3D, gratis seumur hidup." },
];

const CITIES = [
  "Kuningan (HQ)",
  "Jabodetabek",
  "Bandung",
  "Surabaya",
  "Makassar",
  "Bali",
  "Medan",
  "Padang",
];

export default function OurStoryV3() {
  return (
    <section
      id="our-story"
      className="relative w-full bg-surface-cream border-b-4 border-dark overflow-hidden select-none"
      style={{
        backgroundImage:
          "linear-gradient(rgba(24,24,27,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(24,24,27,0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      {/* Blue poster band header */}
      <div className="bg-brand-700 text-white border-b-4 border-dark overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
          <div
            className="absolute -right-16 -top-24 w-[420px] h-[420px] opacity-25 pointer-events-none select-none"
            aria-hidden
          >
            <svg viewBox="0 0 200 200" className="w-full h-full fill-brand-800">
              <polygon points="100,0 115,65 178,32 142,88 200,100 142,112 178,168 115,135 100,200 85,135 22,168 58,112 0,100 58,88 22,32 85,65" />
            </svg>
          </div>

          <div className="relative">
            <span className="inline-block bg-black text-brand-300 px-4 py-1.5 rounded-full font-mono text-[10px] sm:text-xs font-black uppercase tracking-widest border-2 border-white mb-5">
              ✦ SEJAK 2017 // STUDIO INDEPENDEN
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter leading-[0.88]">
              Ini Era Kami.
              <br />
              <span className="text-brand-300">Nilainya Ada di Karya.</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* NARRATIVE */}
          <div className="lg:col-span-5">
            <p className="text-base sm:text-lg text-zinc-800 font-semibold leading-relaxed">
              Berawal 2017 dari satu meja produksi dan satu tekad: setiap buku tahunan harus terasa seperti
              karya, bukan sekadar tugas cetak.
            </p>
            <p className="text-sm text-zinc-600 font-medium leading-relaxed mt-4">
              Sampai hari ini, angkatan dari Kuningan sampai Makassar tetap lewat proses yang sama. Satu
              tim, satu kontrak, satu jadwal. Tidak ada satu pun poin yang menggantung di tangan vendor
              lain.
            </p>

            <div className="mt-8 space-y-3">
              {VALUES.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className="bg-white border-3 border-dark rounded-2xl p-5 flex gap-4 items-start shadow-brutal"
                  >
                    <span className="w-10 h-10 rounded-xl bg-brand-700 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-white" strokeWidth={2.2} />
                    </span>
                    <div>
                      <div className="font-display font-black text-base uppercase tracking-tight text-dark">
                        {v.title}
                      </div>
                      <p className="text-xs text-zinc-600 font-medium mt-1 leading-snug">{v.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TIMELINE */}
          <div className="lg:col-span-7">
            <div className="bg-brand-950 text-white rounded-[2rem] border-3 border-dark shadow-brutal p-7 sm:p-9 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.07] pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />

              <div className="relative flex items-center justify-between gap-4 mb-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-400 font-bold">
                  Perjalanan Studio
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                  2017 — 2026
                </span>
              </div>

              <div className="relative">
                <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-white/15 hidden sm:block" />
                <div className="space-y-7">
                  {TIMELINE.map((t) => (
                    <div key={t.year} className="relative flex gap-5">
                      <div className="relative shrink-0">
                        <div className="w-10 h-10 rounded-full bg-brand-700 border-2 border-white flex items-center justify-center font-mono text-[10px] font-black text-white">
                          {t.year.slice(2)}
                        </div>
                        <span className="block mt-2 sm:hidden font-mono text-[10px] font-black text-brand-400">
                          {t.year}
                        </span>
                      </div>
                      <div className="pb-1">
                        <span className="hidden sm:block font-mono text-[10px] font-black tracking-[0.2em] text-brand-400">
                          {t.year}
                        </span>
                        <div className="font-display font-black text-lg sm:text-xl uppercase tracking-tight leading-tight mt-0.5">
                          {t.title}
                        </div>
                        <p className="text-xs text-zinc-400 font-medium mt-1 leading-snug">{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coverage */}
              <div className="relative mt-9 pt-6 border-t border-white/10">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-3">
                  ✦ Kota Jangkauan
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {CITIES.map((c) => (
                    <span
                      key={c}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { v: "000+", k: "Angkatan Dilayani", d: "Sejak 2017" },
            { v: "000+", k: "Halaman Dirancang", d: "Total cetak" },
            { v: "000", k: "Kota Tercakup", d: "Seluruh Indonesia" },
            { v: "000%", k: "Tepat Waktu", d: "Garansi kontrak" },
          ].map((s) => (
            <div
              key={s.k}
              className="bg-white border-3 border-dark rounded-2xl p-6 shadow-brutal flex flex-col"
            >
              <div className="font-display font-black text-4xl sm:text-5xl leading-none text-brand-700">
                {s.v}
              </div>
              <div className="font-headline font-bold text-sm uppercase tracking-wide text-dark mt-2">
                {s.k}
              </div>
              <div className="font-mono text-[10px] text-zinc-500 mt-0.5">{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
