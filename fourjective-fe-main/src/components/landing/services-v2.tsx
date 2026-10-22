"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sparkles, BookOpen, Film, Camera, Shirt } from "lucide-react";

export default function ServicesV2() {
  const handleServiceTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(4px)`;
  };

  const resetServiceTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
  };

  const services = [
    {
      num: "01",
      id: "yearbook",
      title: "Yearbook Production",
      badge: "CORE DELIVERABLE",
      badgeColor: "bg-orange text-white",
      desc: "Produksi buku fisik premium bergaransi cetak mesin offset Heidelberg dengan bonus akses virtual flipbook 3D interaktif.",
      specs: [
        "Hardcover tebal Greyboard No. 30 (Kokoh & Anti Lengkung)",
        "Jahit benang Pur-Binding (Bisa dibuka rebah 180°)",
        "Finishing Spot UV, Foil Gold/Silver, & Laminasi Doff",
        "FREE 3D Virtual Flipbook seumur hidup (Bebas Iklan)",
      ],
      tag: "FJ-PROD-01",
      colorBg: "bg-white",
      accentBg: "bg-orange/15",
    },
    {
      num: "02",
      id: "cinematic",
      title: "Cinematic Aftermovie",
      badge: "4K MULTICAM",
      badgeColor: "bg-[#7C3AED] text-white",
      desc: "Video dokumenter sinematik angkatan yang digarap dengan kamera cinema dan drone aerial 4K oleh sutradara profesional.",
      specs: [
        "Pilot Drone Berlisensi & 2 Unit Sony Cinema FX-line",
        "Color grading tone bioskop standar perfilman",
        "Teaser 60 detik untuk Instagram/TikTok angkatan",
        "Full Video Dokumenter 10-15 menit resolusi 4K",
      ],
      tag: "FJ-CINEMA-02",
      colorBg: "bg-white",
      accentBg: "bg-purple-100",
    },
    {
      num: "03",
      id: "studio",
      title: "Creative Studio Shoot",
      badge: "350+ KONSEP",
      badgeColor: "bg-brand-600 text-white",
      desc: "Sesi foto angkatan indoor maupun outdoor dengan arahan gaya (art directing) detail. Dijamin bebas pose kaku dan anti-foto KTP.",
      specs: [
        "Mobile studio set lengkap dibawa langsung ke sekolah",
        "Professional lighting Broncolor / Godox high-speed",
        "350+ pilihan tema moodboard original (bukan jiplak)",
        "Skin retouching halus natural untuk setiap siswa",
      ],
      tag: "FJ-PHOTO-03",
      colorBg: "bg-white",
      accentBg: "bg-blue-100",
    },
    {
      num: "04",
      id: "merch",
      title: "Merchandise & Identity",
      badge: "CUSTOM BATCH",
      badgeColor: "bg-[#16A34A] text-white",
      desc: "Paket pelengkap kenangan angkatan: varsity jacket, totebag kanvas, lanyard acrylic, hingga packaging box eksklusif.",
      specs: [
        "Varsity angkatan bahan fleece cotton & leather sleeve",
        "Packaging box tebal magnetik eksklusif tiap buku",
        "Holographic sticker pack angkatan & acrylic charm",
        "Totebag kanvas tebal dengan sablon plastisol / DTF",
      ],
      tag: "FJ-MERCH-04",
      colorBg: "bg-white",
      accentBg: "bg-emerald-100",
    },
  ];

  return (
    <section
      id="services"
      className="relative w-full py-24 px-4 md:px-8 border-b-4 border-dark select-none bg-[#FFF0E6] overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(24, 24, 27, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(24, 24, 27, 0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <span className="bg-dark text-accent-yellow font-mono text-xs font-black px-4 py-1.5 rounded-full border-2 border-dark shadow-[3px_3px_0px_#FF4D1F] uppercase inline-block mb-3">
            ✦ SPESIFIKASI KONKRET &amp; JELAS
          </span>

          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-dark mt-2 leading-tight">
            4 PILAR LAYANAN <span className="text-orange underline decoration-wavy">ALL-IN-ONE</span>
          </h2>

          <p className="text-sm md:text-base text-zinc-700 mt-3 max-w-xl font-medium leading-relaxed">
            Tidak ada rincian samar atau biaya kejutan. Komite sekolah menerima dokumen deliverable lengkap sejak awal tanda tangan kontrak.
          </p>
        </div>

        {/* 2x2 Clean High-Density Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {services.map((srv) => (
            <div
              key={srv.id}
              className={`relative rounded-[2.5rem] border-3 border-dark ${srv.colorBg} p-7 sm:p-8 shadow-brutal flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1`}
              onMouseMove={handleServiceTilt}
              onMouseLeave={resetServiceTilt}
            >
              <div>
                {/* Header Card */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full ${srv.accentBg} border-2 border-dark font-mono text-xs font-black uppercase text-dark`}>
                    {srv.num} &bull; {srv.title.toUpperCase()}
                  </span>
                  <span className={`text-[10px] font-mono font-black px-2.5 py-1 rounded-full border border-dark shadow-sm uppercase ${srv.badgeColor}`}>
                    {srv.badge}
                  </span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-dark leading-tight mt-3">
                  {srv.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-zinc-600 mt-2 leading-relaxed">
                  {srv.desc}
                </p>

                {/* Micro-Specs List */}
                <div className="mt-6 pt-5 border-t-2 border-dark/10 space-y-2.5">
                  <div className="text-[10px] font-mono font-black uppercase tracking-wider text-dark/70">
                    DELIVERABLE SPESIFIKASI:
                  </div>
                  {srv.specs.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-800 font-semibold leading-snug">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-300">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-6 mt-6 border-t-2 border-dark/15 flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-zinc-500 font-mono text-[10px]">#SERIAL: {srv.tag}</span>
                <Link
                  href="#calculator"
                  className="inline-flex items-center gap-1.5 text-orange hover:text-dark transition-colors font-black uppercase"
                >
                  <span>HITUNG ESTIMASI</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
