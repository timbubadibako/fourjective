"use client";

import React from "react";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  school: string;
  year: string;
  quote: string;
  city: string;
  tag: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "testi-1",
    name: "Ratna Galih",
    role: "Perwakilan Panitia",
    school: "SMA AL-AZHAR 5 CIREBON",
    year: "ANGKATAN 2024",
    city: "Cirebon",
    tag: "PHOTOSHOOT & KONSEP",
    quote:
      "Dari awal ketemu, timnya sudah bikin kita nyaman. Sesi fotonya juga ngalir banget, rasanya bukan difoto sama vendor, tapi sama teman sendiri. Hasil akhirnya keren dan benar-benar nunjukin karakter kami sebagai siswa Al Azhar Cirebon.",
  },
  {
    id: "testi-2",
    name: "Jeszichow",
    role: "Ketua Panitia Yearbook",
    school: "SMAK 8 PENABUR",
    year: "ANGKATAN 2024",
    city: "Jakarta Barat",
    tag: "CETAK & EDITING",
    quote:
      "Working with the team honestly felt like spending time with friends. No pressure, no awkward posing — just genuine moments. The final photos really reflect who we are as students at SMAK 8, and that's what makes them so special.",
  },
  {
    id: "testi-3",
    name: "Pengurus Angkatan",
    role: "Panitia Buku Tahunan",
    school: "SMA TARUNA NUSANTARA",
    year: "ANGKATAN 2023",
    city: "Magelang",
    tag: "HARDCOVER & DIGITAL",
    quote:
      "Kualitas cetak fisik dan jilid hardcover sangat kokoh dan mewah. Yang paling krusial, seluruh buku sudah mendarat di sekolah tepat waktu sebelum hari wisuda.",
  },
];

export default function TestimonialsV4() {
  return (
    <section
      id="testimonials"
      className="relative w-full bg-paper text-dark overflow-hidden select-none border-b-4 border-dark py-16 sm:py-24 px-4 sm:px-8"
      style={{
        backgroundImage:
          "linear-gradient(rgba(20,22,28,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(20,22,28,0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Masthead Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b-3 border-dark">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-orange text-white font-mono text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded border-2 border-dark shadow-[2px_2px_0px_#14161C] mb-4">
              ★ TESTIMONI KLIEN NYATA
            </span>
            <h2 className="font-playtimes text-4xl sm:text-5xl md:text-6xl text-dark leading-[1.02]">
              Cerita Dari
              <br />
              <span className="text-orange">Mereka Yang Lulus.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-sans text-xs sm:text-sm text-dark/70 font-medium leading-relaxed">
              Pengalaman langsung panitia dan komite sekolah bersama tim Fourjective dari tahap pemotretan hingga pembagian buku.
            </p>
            <div className="flex items-center gap-1 text-orange mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-orange" />
              ))}
              <span className="font-mono text-xs font-black text-dark ml-2">
                5.0 / 5.0 KUALITAS LAYANAN
              </span>
            </div>
          </div>
        </div>

        {/* Testimonials 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.id}
              className="bg-white border-3 border-dark rounded-xl p-6 sm:p-7 flex flex-col justify-between shadow-[6px_8px_0px_#14161C] hover:-translate-y-1 hover:shadow-[8px_11px_0px_#FF4D00] transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 border-b-2 border-dark/10 pb-3 mb-4">
                  <span className="font-mono text-[9px] font-black uppercase tracking-wider text-orange bg-orange/10 px-2 py-0.5 rounded border border-orange/20">
                    {t.tag}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-dark/50">
                    {t.city}
                  </span>
                </div>

                <Quote className="w-8 h-8 text-orange/30 mb-2 -ml-1" />

                <p className="font-sans text-xs sm:text-sm text-dark/80 leading-relaxed font-medium">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t-2 border-dark/10">
                <h4 className="font-headline font-black text-sm uppercase text-dark">
                  {t.name}
                </h4>
                <p className="font-mono text-[10px] font-bold text-dark/60 uppercase">
                  {t.role} • {t.school}
                </p>
                <span className="inline-block font-mono text-[9px] font-black text-orange mt-0.5">
                  {t.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
