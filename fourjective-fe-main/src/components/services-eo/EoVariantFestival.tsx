"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Music,
  Radio,
  Tv,
  Zap,
  Clock,
  CheckCircle2,
  Volume2,
  Sliders,
  Flame,
  ArrowRight,
} from "lucide-react";

export default function EoVariantFestival() {
  const [activeStep, setActiveStep] = useState(0);

  const TIMELINE_STEPS = [
    {
      time: "07:30 WIB",
      title: "Gate Open & Red Carpet Welcoming",
      desc: "Registrasi rapi dengan wristband angkatan. Photobooth spot aktif menyambut wisudawan dan orang tua.",
      vibe: "Warm & Welcoming",
    },
    {
      time: "09:00 WIB",
      title: "Opening Ceremony & LED Visual Motion",
      desc: "Penayangan visual opening countdown di LED panggung raksasa diiringi lighting beam megah.",
      vibe: "Majestic & Goosebumps",
    },
    {
      time: "11:30 WIB",
      title: "Snapori Photoshoot Blast & Confetti",
      desc: "Sesi foto selebrasi pelemparan toga dengan tembakan confetti gun dan dokumentasi drone 4K.",
      vibe: "High Energy & Euphoria",
    },
    {
      time: "14:00 WIB",
      title: "Prom Night & Live Band Acoustic",
      desc: "Transisi acara santai santap siang, awarding kategori siswa terunik, dan penampilan band angkatan.",
      vibe: "Intimate & Nostalgic",
    },
    {
      time: "16:30 WIB",
      title: "World Premiere: Aftermovie 4K Screening",
      desc: "Lampu utama dimatikan. Pemutaran perdana film dokumenter kilas balik angkatan di layar utama.",
      vibe: "Tears & Emotional",
    },
  ];

  return (
    <div className="relative bg-[#0E1015] text-white overflow-hidden py-16 sm:py-24 px-4 sm:px-8 border-b-4 border-dark">
      {/* Background Ambience: Stage Lighting Orange Halo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-orange/20 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-orange/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* BADGE & HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/20 border border-orange/40 text-orange font-mono text-xs font-bold uppercase tracking-widest mb-5">
            <Flame className="w-4 h-4 fill-orange animate-bounce" />
            <span>VERSI 1: FESTIVAL &amp; STAGE EXPERIENCE</span>
          </div>

          <h2 className="font-playtimes text-4xl sm:text-6xl md:text-7xl text-white leading-[0.98]">
            Bukan Wisuda Kaku,
            <br />
            <span className="text-orange">Ini Festival Terakhirmu.</span>
          </h2>

          <p className="font-sans text-xs sm:text-sm md:text-base text-white/70 mt-4 leading-relaxed font-medium">
            Fourjective memadukan standar produksi panggung konser dengan kelulusan sekolah.
            Visual LED megah, lighting beam terorkestrasi, dan penayangan aftermovie layar lebar
            sudah langsung terkelola dalam paket kami.
          </p>
        </div>

        {/* INTERACTIVE TIMELINE / RUNDOWN PREVIEW */}
        <div className="bg-[#151821] border-2 border-white/10 rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0px_#000] mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
            <div>
              <span className="font-mono text-xs text-orange uppercase font-bold tracking-wider">
                ✦ SIMULASI RUNDOWN WISUDA &amp; PROM
              </span>
              <h3 className="font-headline font-bold text-2xl text-white mt-1">
                Alur Acara Presisi Tanpa Molor
              </h3>
            </div>
            <span className="font-mono text-xs text-white/50 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 self-start md:self-auto">
              100% DIATUR TIM EO FOURJECTIVE
            </span>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-8">
            {TIMELINE_STEPS.map((step, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-3.5 rounded-xl text-left border-2 transition-all cursor-pointer ${
                  activeStep === idx
                    ? "bg-orange text-white border-orange shadow-[0px_0px_20px_rgba(255,77,0,0.4)]"
                    : "bg-[#1E222D] text-white/70 border-white/10 hover:border-white/30"
                }`}
              >
                <span className="font-mono text-[10px] block opacity-80 font-bold">
                  {step.time}
                </span>
                <span className="font-headline font-bold text-xs sm:text-sm line-clamp-1 mt-1 block">
                  {step.title}
                </span>
              </button>
            ))}
          </div>

          {/* Active Step Showcase Card */}
          <div className="bg-[#1C202B] border border-white/15 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-orange mb-2">
                <Clock className="w-4 h-4" />
                <span>{TIMELINE_STEPS[activeStep].time}</span>
                <span className="text-white/40">•</span>
                <span className="text-white/80">
                  Mood: {TIMELINE_STEPS[activeStep].vibe}
                </span>
              </div>
              <h4 className="font-headline font-bold text-xl sm:text-2xl text-white">
                {TIMELINE_STEPS[activeStep].title}
              </h4>
              <p className="font-sans text-xs sm:text-sm text-white/70 mt-2 leading-relaxed">
                {TIMELINE_STEPS[activeStep].desc}
              </p>
            </div>

            <div className="bg-[#12141A] border border-orange/30 p-4 rounded-xl shrink-0 w-full md:w-auto">
              <span className="font-mono text-[10px] text-orange block uppercase tracking-wider font-bold">
                CREW IN CHARGE
              </span>
              <span className="font-mono text-xs text-white block font-bold mt-1">
                Show Director + Audio Visual Lead
              </span>
              <span className="text-[11px] text-white/50 block mt-1">
                Standby wireless intercom
              </span>
            </div>
          </div>
        </div>

        {/* 4 STAGE EQUIPMENT HIGHLIGHTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-[#151821] border border-white/10 hover:border-orange/60 p-5 rounded-2xl transition-all">
            <Tv className="w-8 h-8 text-orange mb-3" />
            <h5 className="font-headline font-bold text-white text-base">
              Giant P3 LED Screen
            </h5>
            <p className="font-sans text-xs text-white/60 mt-1 leading-snug">
              Visual backdrop dinamis, countdown megah, dan tampilan live feed kamera.
            </p>
          </div>

          <div className="bg-[#151821] border border-white/10 hover:border-orange/60 p-5 rounded-2xl transition-all">
            <Zap className="w-8 h-8 text-orange mb-3" />
            <h5 className="font-headline font-bold text-white text-base">
              Moving Beam &amp; Haze
            </h5>
            <p className="font-sans text-xs text-white/60 mt-1 leading-snug">
              Tata pencahayaan profesional standar panggung konser spektakuler.
            </p>
          </div>

          <div className="bg-[#151821] border border-white/10 hover:border-orange/60 p-5 rounded-2xl transition-all">
            <Volume2 className="w-8 h-8 text-orange mb-3" />
            <h5 className="font-headline font-bold text-white text-base">
              Line Array Sound System
            </h5>
            <p className="font-sans text-xs text-white/60 mt-1 leading-snug">
              Audio jernih merata ke seluruh ruangan tanpa dengung atau noise bising.
            </p>
          </div>

          <div className="bg-[#151821] border border-white/10 hover:border-orange/60 p-5 rounded-2xl transition-all">
            <Radio className="w-8 h-8 text-orange mb-3" />
            <h5 className="font-headline font-bold text-white text-base">
              Live Multi-Cam Switcher
            </h5>
            <p className="font-sans text-xs text-white/60 mt-1 leading-snug">
              Sorot ekspresi wisudawan secara realtime langsung ke layar panggung.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
