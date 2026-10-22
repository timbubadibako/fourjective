"use client";

import React from "react";
import {
  ShieldAlert,
  Radio,
  Users2,
  Cpu,
  CheckCircle,
  QrCode,
  FileText,
  AlertCircle,
  Flame,
  ArrowRight,
} from "lucide-react";

export default function EoVariantTactical() {
  const CREW_ROLES = [
    {
      code: "ROLE-01",
      title: "Show Director",
      scope: "Master of Timeline & Show Flow",
      tasks: [
        "Kontrol mutlak jalannya rundown detik-per-detik",
        "Komando interkom antar divisi lapangan",
        "Pengendali transisi seremonial kepala sekolah & yayasan",
      ],
    },
    {
      code: "ROLE-02",
      title: "Audio Visual & Lighting Lead",
      scope: "FOH / Audio System & Media Controller",
      tasks: [
        "Sinkronisasi cue musik instrumen saat pemanggilan nama siswa",
        "Playback video aftermovie dan visual LED tanpa jeda lag",
        "Kalibrasi mik wireless agar bebas feedback / howling",
      ],
    },
    {
      code: "ROLE-03",
      title: "Floor & Stage Manager",
      scope: "Backstage, Talent & Podium Traffic",
      tasks: [
        "Antrean wisudawan menuju panggung rapi per baris",
        "Pemberian plakat, map ijazah, & medali tepat tangan",
        "Manajemen mikrofon podium pidato tamu undangan",
      ],
    },
    {
      code: "ROLE-04",
      title: "Crowd & Safety Marshals",
      scope: "Field Management & Mass Photoshoot",
      tasks: [
        "Pengondisian 300—600 siswa saat sesi foto massal drone",
        "Sterilisasi area panggung dari penonton liar",
        "Akses cepat pertolongan pertama bila ada siswa drop",
      ],
    },
  ];

  return (
    <div className="relative bg-[#18181B] text-white py-16 sm:py-24 px-4 sm:px-8 border-b-4 border-dark select-none">
      {/* Background Blueprint Grid Line */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-14 pb-8 border-b-2 border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-orange text-white font-mono text-[11px] font-black uppercase tracking-widest mb-4">
              <Cpu className="w-3.5 h-3.5" />
              <span>VERSI 2: BACKSTAGE PRODUCTION PASS (TACTICAL)</span>
            </div>

            <h2 className="font-playtimes text-4xl sm:text-6xl md:text-7xl text-white leading-[0.98]">
              Nol Panik Backstage.
              <br />
              <span className="text-orange">Satu Komando Lapangan.</span>
            </h2>

            <p className="font-sans text-xs sm:text-sm md:text-base text-white/75 mt-3 max-w-2xl leading-relaxed">
              Guru tidak perlu teriak-teriak pegang toa. Siswa OSIS tidak perlu lari kesana kemari.
              Tim kru produksi Fourjective mengambil alih beban teknis lapangan secara terstruktur.
            </p>
          </div>

          {/* ALL ACCESS PASS TICKET SIMULATION */}
          <div className="bg-[#242429] border-2 border-orange/40 rounded-2xl p-5 w-full lg:w-80 shadow-[6px_6px_0px_#000] relative overflow-hidden shrink-0">
            <div className="absolute top-2 right-2 w-8 h-8 rounded-full border-2 border-white/20 bg-dark/60 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-orange animate-ping" />
            </div>

            <div className="flex items-center gap-2 font-mono text-[10px] text-orange font-bold uppercase tracking-wider mb-2">
              <Radio className="w-3 h-3" />
              <span>PRODUCTION CREW PASS</span>
            </div>

            <h4 className="font-headline font-black text-xl text-white">
              ALL-ACCESS // 4J EO
            </h4>
            <p className="font-mono text-[11px] text-white/60 mt-1">
              STATUS: READY TO DEPLOY
            </p>

            <div className="mt-4 pt-4 border-t border-dashed border-white/20 flex items-center justify-between">
              <div>
                <span className="font-mono text-[9px] text-white/40 block">KOMUNIKASI</span>
                <span className="font-mono text-xs font-bold text-white">UHF Ch. 04 Secure</span>
              </div>
              <QrCode className="w-10 h-10 text-orange" />
            </div>
          </div>
        </div>

        {/* 4 CREW DIVISION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {CREW_ROLES.map((role) => (
            <div
              key={role.code}
              className="bg-[#202025] border-2 border-white/10 hover:border-orange rounded-2xl p-5 sm:p-6 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] font-bold text-orange bg-orange/15 px-2 py-0.5 rounded border border-orange/30">
                    {role.code}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>

                <h4 className="font-headline font-bold text-lg text-white">
                  {role.title}
                </h4>
                <p className="font-mono text-[11px] text-white/50 mb-4">
                  {role.scope}
                </p>

                <ul className="space-y-2 border-t border-white/10 pt-4">
                  {role.tasks.map((task, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs font-sans text-white/80 leading-snug"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-orange shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 font-mono text-[10px] text-white/40 uppercase">
                Termasuk di semua paket
              </div>
            </div>
          ))}
        </div>

        {/* TIMELINE PRE-PRODUCTION PROTOCOL */}
        <div className="bg-[#1F1F24] border-2 border-white/10 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4 font-mono text-xs font-bold text-orange">
            <FileText className="w-4 h-4" />
            <span>STANDAR PROTOKOL PENGERJAAN H-30 SAMPAI D-DAY</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
            <div className="p-4 bg-[#17171A] rounded-xl border border-white/10">
              <span className="text-orange text-xs font-bold">FASE H-30</span>
              <h5 className="text-white font-headline text-sm font-bold mt-1">Survey Venue &amp; Daya</h5>
              <p className="text-[11px] text-white/60 font-sans mt-1">
                Cek kelistrikan gedung, akustik ruang, dan titik penempatan kamera drone.
              </p>
            </div>

            <div className="p-4 bg-[#17171A] rounded-xl border border-white/10">
              <span className="text-orange text-xs font-bold">FASE H-14</span>
              <h5 className="text-white font-headline text-sm font-bold mt-1">Rundown Lock &amp; Visual</h5>
              <p className="text-[11px] text-white/60 font-sans mt-1">
                Finalisasi nama wisudawan, master slide sambutan, dan playlist musik.
              </p>
            </div>

            <div className="p-4 bg-[#17171A] rounded-xl border border-white/10">
              <span className="text-orange text-xs font-bold">FASE H-1</span>
              <h5 className="text-white font-headline text-sm font-bold mt-1">Gladi Bersih Menyeluruh</h5>
              <p className="text-[11px] text-white/60 font-sans mt-1">
                Simulasi panggung langsung bersama perwakilan guru dan pengurus OSIS.
              </p>
            </div>

            <div className="p-4 bg-orange/15 rounded-xl border border-orange/40">
              <span className="text-orange text-xs font-bold">D-DAY EKSEKUSI</span>
              <h5 className="text-white font-headline text-sm font-bold mt-1">Zero-Panic Execution</h5>
              <p className="text-[11px] text-white/80 font-sans mt-1">
                Seluruh divisi bekerja dalam satu komando radio interkom. Zero molor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
