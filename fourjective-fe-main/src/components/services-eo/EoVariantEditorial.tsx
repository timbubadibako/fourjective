"use client";

import React from "react";
import {
  XCircle,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Quote,
  ShieldCheck,
  Building,
  GraduationCap,
  PartyPopper,
} from "lucide-react";

export default function EoVariantEditorial() {
  const COMPARISONS = [
    {
      issue: "Penyusunan Rundown",
      traditional: "Guru & panitia pusing ketik Word larut malam, rundown sering molor 1—2 jam saat hari H.",
      fourjective: "Tim EO menyusun rundown presisi menit-per-menit berdasar pengalaman puluhan wisuda sekolah.",
    },
    {
      issue: "Kepanikan Backstage & Panggung",
      traditional: "Siswa OSIS lari-larian, mic mati tiba-tiba, antrean naik panggung semrawut dan saling tabrak.",
      fourjective: "Floor manager & stage crew mengomando antrean siswa rapi dan terarah tanpa jeda kosong.",
    },
    {
      issue: "Audio & Visual Panggung",
      traditional: "Sound dengung / howling menyakitkan telinga, slide layar laptop buram atau typo nama siswa.",
      fourjective: "Audio engineer pro & operator visual LED terlatih, aset slide dikurasi desainer Fourjective.",
    },
    {
      issue: "Penyerahan Buku & Merchandise",
      traditional: "Buku dibagikan acak-acakan di kardus kotor, banyak siswa komplain kehilangan atau tertukar.",
      fourjective: "Distribusi terstruktur dengan seremonial penyerahan estetik di panggung dan meja pengambilan rapi.",
    },
  ];

  const SCENARIOS = [
    {
      icon: GraduationCap,
      title: "Wisuda Formal Akbar",
      badge: "KAPASITAS 300—1000+ SISWA",
      desc: "Dirancang untuk prosesi wisuda khidmat di auditorium atau hotel. Penataan barisan toga, protokoler yayasan, hingga iringan musik paduan suara sinkron sempurna.",
    },
    {
      icon: PartyPopper,
      title: "Prom Night & Gala Dinner",
      badge: "KONSEP CASUAL & FESTIVE",
      desc: "Panggung megah untuk malam puncak pelepasan. Lengkap dengan lighting panggung estetik, photobooth red carpet, penyerahan award siswa, dan live music.",
    },
    {
      icon: Building,
      title: "Snapori Photoshoot Fest",
      badge: "FESTIVAL FOTO SEKOLAH",
      desc: "Hari pengambilan foto buku tahunan disulap jadi hari festival sekolah. Dilengkapi musik pengiring, tata letak antrean kelas, dan crowd control terarah.",
    },
  ];

  return (
    <div className="relative bg-[#FAF6F0] text-dark py-16 sm:py-24 px-4 sm:px-8 border-b-4 border-dark select-none">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* BADGE & TITLE */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark text-white font-mono text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-orange" />
            <span>VERSI 3: EDITORIAL PROBLEM-SOLVER (PAIN RELIEF)</span>
          </div>

          <h2 className="font-playtimes text-4xl sm:text-6xl md:text-7xl text-dark leading-[0.98]">
            Hentikan Drama Panitia.
            <br />
            <span className="text-orange">Fokus Nikmati Hari Bahagia.</span>
          </h2>

          <p className="font-sans text-xs sm:text-sm md:text-base text-dark/75 mt-4 leading-relaxed font-medium">
            Tahun kelulusan harusnya jadi memori paling indah, bukan hari paling melelahkan bagi guru
            pembina dan panitia OSIS. Lihat perbandingan langsung saat acaramu kami dampingi:
          </p>
        </div>

        {/* COMPARISON TABLE (BEFORE VS AFTER) */}
        <div className="bg-[#FFFDF9] border-3 sm:border-4 border-dark rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0px_#18181B] mb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b-2 border-dark/15">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-100 border border-red-300 text-red-600 flex items-center justify-center font-bold">
                ✕
              </div>
              <div>
                <span className="font-mono text-[10px] text-red-600 font-bold uppercase">
                  PENGALAMAN TRADISIONAL
                </span>
                <h4 className="font-headline font-bold text-lg text-dark">
                  Panitia Sekolah Bekerja Sendirian
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange/20 border border-orange text-orange flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <span className="font-mono text-[10px] text-orange font-bold uppercase">
                  NILAI PLUS FOURJECTIVE
                </span>
                <h4 className="font-headline font-bold text-lg text-dark">
                  Didampingi Kru EO Berpengalaman
                </h4>
              </div>
            </div>
          </div>

          <div className="divide-y divide-dark/10">
            {COMPARISONS.map((row, idx) => (
              <div key={idx} className="py-5 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Traditional Side */}
                <div className="bg-red-50/60 border border-red-200/60 rounded-xl p-4">
                  <span className="font-mono text-[10px] font-bold text-red-700 uppercase block mb-1">
                    {row.issue}
                  </span>
                  <div className="flex items-start gap-2 text-xs sm:text-sm text-dark/80 font-medium leading-relaxed">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{row.traditional}</span>
                  </div>
                </div>

                {/* Fourjective Side */}
                <div className="bg-orange/10 border border-orange/30 rounded-xl p-4">
                  <span className="font-mono text-[10px] font-bold text-orange uppercase block mb-1">
                    STANDAR FOURJECTIVE
                  </span>
                  <div className="flex items-start gap-2 text-xs sm:text-sm text-dark/90 font-medium leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-orange shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>{row.fourjective}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 REAL-WORLD EVENT SCENARIOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {SCENARIOS.map((sc, i) => {
            const Icon = sc.icon;
            return (
              <div
                key={i}
                className="bg-[#FFFDF9] border-2 border-dark rounded-2xl p-6 shadow-[5px_5px_0px_#18181B] flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-orange/15 border-2 border-dark text-orange flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-[10px] font-bold text-dark/60 uppercase tracking-wider block mb-1">
                    {sc.badge}
                  </span>
                  <h4 className="font-headline font-black text-xl text-dark">
                    {sc.title}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-dark/75 mt-2.5 leading-relaxed">
                    {sc.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-dark/10 font-mono text-[11px] font-bold text-orange flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Benefit Otomatis di Setiap Paket</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* COMMITTEE QUOTE */}
        <div className="bg-dark text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 border-3 border-dark">
          <Quote className="w-12 h-12 text-orange shrink-0 opacity-80" />
          <div>
            <p className="font-sans text-xs sm:text-sm md:text-base text-white/90 italic leading-relaxed">
              &ldquo;Awalnya kami cuma pesan buku tahunan dan aftermovie. Ternyata saat wisuda, tim Fourjective
              ikut turun bantu rundown panggung dan arahkan 400 siswa. Acara kami yang biasanya molor 2 jam,
              hari itu selesai tepat waktu dan kepala sekolah sangat puas.&rdquo;
            </p>
            <span className="font-mono text-xs text-orange font-bold uppercase tracking-wider block mt-2">
              — Pembina OSIS SMAN 1 &amp; Panitia Buku Tahunan 2025
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
