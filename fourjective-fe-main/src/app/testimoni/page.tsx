"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/landing/header-pill-v2";
import Footer from "@/components/landing/footer-v4";
import {
  ArrowLeft,
  Quote,
  Star,
  CheckCircle2,
  MessageCircle,
  ArrowUpRight,
  School,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { WA_MESSAGES, waLink } from "@/lib/site";

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  school: string;
  year: string;
  city: string;
  category: "all" | "photoshoot" | "cetak" | "pelayanan";
  categoryLabel: string;
  quote: string;
  rating: number;
  highlight: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "al-azhar",
    name: "Ratna Galih",
    role: "Perwakilan Panitia",
    school: "SMA AL-AZHAR 5 CIREBON",
    year: "ANGKATAN 2024",
    city: "Cirebon",
    category: "photoshoot",
    categoryLabel: "Photoshoot & Konsep",
    highlight: "Sesi foto sangat cair & fotografer seperti teman sendiri",
    quote:
      "Dari awal ketemu, timnya sudah bikin kita nyaman. Sesi fotonya juga ngalir banget, rasanya bukan difoto sama vendor, tapi sama teman sendiri. Hasil akhirnya keren dan benar-benar nunjukin karakter kami sebagai siswa Al Azhar Cirebon.",
    rating: 5,
  },
  {
    id: "penabur",
    name: "Jeszichow",
    role: "Ketua Panitia Yearbook",
    school: "SMAK 8 PENABUR",
    year: "ANGKATAN 2024",
    city: "Jakarta Barat",
    category: "photoshoot",
    categoryLabel: "Photoshoot & Konsep",
    highlight: "Foto candid natural tanpa pose yang kaku",
    quote:
      "Working with the team honestly felt like spending time with friends. No pressure, no awkward posing — just genuine moments. The final photos really reflect who we are as students at SMAK 8, and that's what makes them so special.",
    rating: 5,
  },
  {
    id: "tarnus",
    name: "Pengurus Angkatan",
    role: "Panitia Buku Tahunan",
    school: "SMA TARUNA NUSANTARA",
    year: "ANGKATAN 2023",
    city: "Magelang",
    category: "cetak",
    categoryLabel: "Cetak & Hardcover",
    highlight: "Jilid hardcover kokoh & tiba sebelum wisuda",
    quote:
      "Kualitas cetak fisik dan jilid hardcover sangat kokoh dan mewah. Yang paling krusial bagi kami, seluruh buku sudah mendarat di sekolah tepat waktu sebelum hari wisuda tanpa ada yang cacat.",
    rating: 5,
  },
  {
    id: "sman1",
    name: "Alifia Putri",
    role: "Ketua Komite Siswa",
    school: "SMA NEGERI 1 JAKARTA",
    year: "ANGKATAN 2024",
    city: "Jakarta Pusat",
    category: "pelayanan",
    categoryLabel: "Pelayanan & Timeline",
    highlight: "Transparansi termin pembayaran & alur koordinasi rapi",
    quote:
      "Alur koordinasi dengan Project Manager sangat responsif. Sistem 3 termin pembayaran kas siswa memudahkan bendahara angkatan mengumpulkan uang tanpa panik menjelang deadline cetak.",
    rating: 5,
  },
  {
    id: "labschool",
    name: "Dimas Arya",
    role: "Sie Dokumentasi & Media",
    school: "SMA LABSCHOOL KEBAYORAN",
    year: "ANGKATAN 2024",
    city: "Jakarta Selatan",
    category: "cetak",
    categoryLabel: "Cetak & Hardcover",
    highlight: "Grading warna tajam & bonus flipbook digital 3D",
    quote:
      "Warna cetakan sama persis dengan dummy digital yang kami approve. Ditambah bonus Virtual Flipbook 3D yang bisa langsung dibagikan link-nya ke teman-teman di grup WhatsApp angkatan.",
    rating: 5,
  },
  {
    id: "petra",
    name: "Christian Wijaya",
    role: "Koordinator Acara & Buku",
    school: "SMAK PETRA 1 SURABAYA",
    year: "ANGKATAN 2023",
    city: "Surabaya",
    category: "pelayanan",
    categoryLabel: "Pelayanan & Timeline",
    highlight: "Peralatan studio diterbangkan langsung ke Surabaya",
    quote:
      "Meski studio Fourjective berbasis di Jawa Barat, seluruh tim fotografer dan kru lighting datang langsung ke sekolah kami di Surabaya tanpa kendala. Sangat profesional dan tepat waktu.",
    rating: 5,
  },
];

export default function TestimoniPage() {
  const [filter, setFilter] = useState<"all" | "photoshoot" | "cetak" | "pelayanan">("all");

  const filtered = filter === "all" ? TESTIMONIALS : TESTIMONIALS.filter((t) => t.category === filter);

  return (
    <div className="min-h-screen bg-paper text-dark flex flex-col selection:bg-orange selection:text-white">
      <Header />

      {/* Grid Pattern Background */}
      <div
        className="fixed inset-0 pointer-events-none"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(20,22,28,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(20,22,28,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <main className="relative z-10 pt-20 sm:pt-24 pb-0 w-full">
        {/* ===== MASTHEAD ===== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between gap-4 pb-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-dark/50 hover:text-orange transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Beranda
            </Link>
            <span className="font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-orange">
              Testimoni Angkatan
            </span>
          </div>

          <div className="border-t-[3px] border-dark pt-8 sm:pt-10 pb-10 sm:pb-14 relative">
            <div className="grid lg:grid-cols-12 gap-8 items-end relative">
              <div className="lg:col-span-8">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 bg-dark text-white rounded mb-4">
                  ★ ULASAN ASLI DARI KLIEN
                </span>
                <h1 className="font-playtimes text-dark leading-[1.0] tracking-tight text-5xl sm:text-7xl md:text-8xl">
                  Cerita Nyata,
                  <br />
                  <span className="text-orange">Dari Sekolah Nyata.</span>
                </h1>
              </div>
              <div className="lg:col-span-4 lg:pb-2">
                <p className="text-sm sm:text-base text-dark/70 leading-relaxed font-medium">
                  Pengalaman nyata panitia, guru, dan pengurus angkatan sekolah bersama Fourjective Studio sejak 2021.
                </p>
                <div className="flex items-center gap-1.5 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange text-orange" />
                  ))}
                  <span className="font-mono text-xs font-black text-dark ml-2">
                    5.0 / 5.0 KEPUASAN LAYANAN
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== 4 KPI METRICS BAR ===== */}
        <div className="border-t-[3px] border-b-[3px] border-dark bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { big: "150+", label: "Angkatan Ditangani", desc: "SMA & SMK Seluruh Indonesia" },
              { big: "100%", label: "Garansi Tepat Waktu", desc: "Buku Mendarat Sebelum Wisuda" },
              { big: "35.000+", label: "Siswa Terdata", desc: "Foto & Edisi Digital Aktif" },
              { big: "0 Kasus", label: "Retur Cetak", desc: "QC Ganda Setiap Eksemplar" },
            ].map((kpi, idx) => (
              <div key={idx} className="border-l-2 first:border-l-0 border-dark/15 pl-4 sm:pl-6">
                <div className="font-headline font-black text-3xl sm:text-4xl text-orange">
                  {kpi.big}
                </div>
                <div className="font-headline font-bold uppercase text-xs sm:text-sm text-dark mt-0.5">
                  {kpi.label}
                </div>
                <div className="font-mono text-[10px] text-dark/50 mt-0.5">
                  {kpi.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== FILTER SWITCHER ===== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 sm:pt-14 pb-6">
          <div className="flex flex-wrap items-center gap-2.5">
            {[
              { key: "all", label: "Semua Ulasan (6)" },
              { key: "photoshoot", label: "Photoshoot & Konsep" },
              { key: "cetak", label: "Cetak & Hardcover" },
              { key: "pelayanan", label: "Pelayanan & Timeline" },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setFilter(tab.key as any)}
                className={`font-mono text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-lg border-2 transition-all cursor-pointer ${
                  filter === tab.key
                    ? "bg-dark text-white border-dark shadow-[3px_3px_0px_#FF4D00]"
                    : "bg-white text-dark/70 border-dark/30 hover:border-dark hover:text-dark"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ===== TESTIMONIALS GRID ===== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-16 sm:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t) => (
              <div
                key={t.id}
                className="bg-white border-3 border-dark rounded-xl p-6 sm:p-7 flex flex-col justify-between shadow-[6px_8px_0px_#14161C] hover:-translate-y-1 hover:shadow-[8px_11px_0px_#FF4D00] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 border-b-2 border-dark/10 pb-3 mb-4">
                    <span className="font-mono text-[9px] font-black uppercase tracking-wider text-orange bg-orange/10 px-2.5 py-0.5 rounded border border-orange/20">
                      {t.categoryLabel}
                    </span>
                    <span className="font-mono text-[10px] font-bold text-dark/50">
                      {t.city}
                    </span>
                  </div>

                  <Quote className="w-8 h-8 text-orange/30 mb-2 -ml-1" />

                  <p className="font-sans text-xs sm:text-sm text-dark/85 leading-relaxed font-medium">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="mt-4 pt-3 border-t border-dashed border-dark/15 flex items-center gap-1.5 text-emerald-700 font-mono text-[10px] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{t.highlight}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t-2 border-dark/10">
                  <h3 className="font-headline font-black text-sm uppercase text-dark">
                    {t.name}
                  </h3>
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

        {/* ===== BOTTOM CTA ===== */}
        <div className="border-t-[3px] border-dark bg-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-20">
            <div className="grid lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-7">
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-orange block mb-3">
                  WAKTUNYA BIKIN KENANGAN
                </span>
                <h2 className="font-playtimes text-white leading-[1.0] tracking-tight text-4xl sm:text-6xl">
                  Mau Angkatanmu
                  <br />
                  <span className="text-orange">Punya Cerita Serupa?</span>
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-sm text-white/70 leading-relaxed font-medium mb-6">
                  Konsultasi langsung via WhatsApp. Kami siap bantu susun konsep foto, kalkulasi anggaran kas, hingga kirim sampel buku fisik ke sekolahmu.
                </p>
                <a
                  href={waLink(WA_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-orange text-white font-headline font-black text-xs sm:text-sm uppercase tracking-widest px-7 py-4 border-3 border-white/20 shadow-[5px_6px_0px_rgba(255,255,255,0.15)] hover:shadow-[2px_3px_0px_rgba(255,255,255,0.15)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Konsultasi Angkatan via WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
