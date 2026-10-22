"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const PILLARS_COMPACT = [
  {
    num: "01",
    tag: "PHOTOSHOOT",
    title: "Foto Konsep",
    desc: "Mobile studio datang langsung ke sekolah. Foto angkatan terkonsep anti-gaya KTP kaku.",
    img: "/images/landing-page/our-services/photoshoot-img.svg",
    tint: "#F4ECE1",
    points: [
      "Full set studio kilat langsung di sekolah",
      "350+ kurasi tema & moodboard orisinal",
      "Skin retouching natural per siswa",
    ],
  },
  {
    num: "02",
    tag: "DOKUMENTASI",
    title: "Video & Drone",
    desc: "Aftermovie wisuda sinematik 4K dan liputan udara untuk memori angkatan tak terlupakan.",
    img: "/images/landing-page/our-services/video-img.svg",
    tint: "#EFE5D8",
    points: [
      "Pilot drone berlisensi resmi",
      "Dokumenter wisuda & prom night resolusi 4K",
      "Klip teaser vertikal siap reels / TikTok",
    ],
  },
  {
    num: "03",
    tag: "CETAK",
    title: "Buku Tahunan",
    desc: "Cetak mesin Heidelberg Jerman, pur-binding jahit presisi, dan bonus 3D virtual flipbook.",
    img: "/images/landing-page/our-services/yearbook-img.svg",
    tint: "#F6EFE6",
    points: [
      "Hardcover laminasi doff, spot UV, atau foil",
      "Jahit benang pur-binding anti rontok",
      "Bonus flipbook digital 3D seumur hidup",
    ],
  },
  {
    num: "04",
    tag: "SOUVENIR",
    title: "Merchandise",
    desc: "Atribut pelengkap kelulusan dari medali logam hingga packaging box magnetik eksklusif.",
    img: "/images/landing-page/our-services/merch-img.svg",
    tint: "#EAE0D2",
    points: [
      "Jaket varsity / hoodie bahan pilihan",
      "Medali kelulusan timbul & lanyard tajam",
      "Packaging box magnetik eksklusif per buku",
    ],
  },
];

export default function ServicesV4() {
  return (
    <section
      id="services"
      className="relative w-full bg-[#FAF6F0] text-dark border-b-4 border-dark overflow-hidden select-none py-16 sm:py-20 md:py-24 px-4 sm:px-8"
      style={{
        backgroundImage:
          "linear-gradient(rgba(24, 24, 27, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(24, 24, 27, 0.035) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* SECTION HEADER: SATU JUDUL UNTUK SEMUA (FOURJECTIVE ORGANIZING) */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <h2 className="font-playtimes text-6xl sm:text-7xl md:text-8xl text-dark leading-[0.92] tracking-normal drop-shadow-sm">
            Satu Pintu,
            <br />
            <span className="text-orange">Empat Kebutuhan.</span>
          </h2>

          <p className="font-mono text-xs sm:text-sm font-bold text-dark/75 mt-4 leading-relaxed">
            Nggak perlu pusing koordinasi vendor terpisah. Dari foto konsep, liputan drone, sampai buku cetak beres di satu tim Fourjective.
          </p>
        </div>

        {/* 4 KARTU PILLAR PRODUKSI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {PILLARS_COMPACT.map((p) => (
            <article
              key={p.num}
              className="group relative bg-[#FFFDF9] text-dark border-3 sm:border-4 border-dark rounded-xl shadow-[5px_5px_0px_0px_#18181B] hover:shadow-[8px_8px_0px_0px_#FF4D00] hover:-translate-y-1 transition-all duration-200 flex flex-col overflow-hidden"
            >
              {/* Artwork Box */}
              <div
                className="relative h-[180px] sm:h-[195px] flex items-center justify-center overflow-hidden border-b-3 sm:border-b-4 border-dark"
                style={{ backgroundColor: p.tint }}
              >
                <div className="absolute top-3 left-3 z-20">
                  <span className="inline-block bg-dark text-white px-2 py-0.5 rounded font-mono text-[10px] font-black uppercase tracking-wider">
                    {p.num}
                  </span>
                </div>

                <div className="relative w-[72%] aspect-[4/3] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={p.img}
                    alt={`${p.title} illustration`}
                    width={335}
                    height={238}
                    className="w-full h-auto object-contain drop-shadow-md"
                  />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <span className="font-mono text-[9px] font-black uppercase tracking-widest text-dark/50">
                    {p.tag}
                  </span>

                  <h3 className="font-headline font-black text-xl sm:text-2xl uppercase tracking-tight leading-tight text-dark mt-0.5">
                    {p.title}
                  </h3>

                  <p className="font-mono text-[11px] sm:text-xs font-semibold text-dark/70 mt-2 leading-relaxed">
                    {p.desc}
                  </p>

                  <ul className="mt-4 pt-3 border-t-2 border-dark/10 space-y-2">
                    {p.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[11px] font-mono text-dark/85 font-medium leading-tight">
                        <Check className="w-3.5 h-3.5 text-orange flex-shrink-0 mt-0.5" strokeWidth={3} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t-2 border-dashed border-dark/20 flex items-center justify-between text-dark">
                  <span className="font-mono text-[10px] font-bold text-dark/50 uppercase">
                    Layanan Outsource
                  </span>
                  <Link
                    href="#packages"
                    className="font-mono text-xs font-black text-dark group-hover:text-orange transition-colors flex items-center gap-1"
                  >
                    PILIH PAKET <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* COMPACT BOTTOM CTA BANNER (ARAH: 5 PAKET) */}
        <div className="mt-10 sm:mt-12 bg-dark text-white rounded-2xl p-6 sm:p-8 border-4 border-dark shadow-[6px_6px_0px_#FF4D00] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="inline-block bg-orange text-white px-2.5 py-0.5 rounded font-mono text-[10px] font-black uppercase tracking-widest">
              ✦ SIAP MULAI?
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight">
              Semua Ini Tersedia di 5 Pilihan Paket
            </h3>
            <p className="font-mono text-xs text-white/70 max-w-lg">
              Kirim estimasi jumlah siswa dan kebutuhan angkatanmu. Tim kami siap buatkan simulasi RAB resmi.
            </p>
          </div>

          <Link
            href="#packages"
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white font-mono font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border-2 border-white shadow-[3px_3px_0px_#FFFFFF] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex-shrink-0 cursor-pointer"
          >
            <span>JELAJAHI 5 PAKET</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
