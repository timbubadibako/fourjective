"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, Video, Smartphone, BookOpen, Package, MessageCircle, Sparkles, ShieldCheck, CheckCircle2, Clock, MapPin, CreditCard } from "lucide-react";

interface FaqItem {
  id: string;
  category: string;
  categoryColor: string;
  question: string;
  answerContent: React.ReactNode;
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const faqList: FaqItem[] = [
    {
      id: "faq-1",
      category: "JANGKAUAN",
      categoryColor: "bg-emerald-100/80 text-emerald-800 border-emerald-200",
      question: "Apakah Fourjective bisa melayani sekolah di luar Jawa Barat & luar pulau?",
      answerContent: (
        <div className="space-y-3.5">
          <p className="leading-relaxed text-zinc-700">
            <strong className="text-dark font-bold">Bisa banget!</strong> Sejak 2017, tim Fourjective telah dipercaya ratusan angkatan di berbagai kota di seluruh Indonesia—mulai dari Jabodetabek, Jawa Barat, Jawa Tengah, Jawa Timur, hingga Sumatera (Medan, Padang, Batam), Kalimantan, Sulawesi (Makassar), Bali, dan Papua.
          </p>
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs sm:text-sm font-medium">
            <MapPin className="w-4 h-4 text-orange flex-shrink-0" />
            <span>Tim kreatif, fotografer, dan lighting master siap terbang langsung ke kotamu.</span>
          </div>
        </div>
      ),
    },
    {
      id: "faq-2",
      category: "TIMELINE",
      categoryColor: "bg-sky-100/80 text-sky-800 border-sky-200",
      question: "Berapa lama proses pembuatan buku tahunan dari foto sampai jadi?",
      answerContent: (
        <div className="space-y-3.5">
          <p className="leading-relaxed text-zinc-700">
            Estimasi waktu pengerjaan berkisar <strong className="text-dark font-bold">2 hingga 3 bulan</strong> terhitung sejak foto dan data murid selesai dikurasi, dengan alur kerja yang terstruktur dan transparan:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 rounded-2xl bg-paper border border-dark/10">
              <span className="font-mono text-orange font-bold uppercase tracking-wider block text-[11px]">
                TAHAP 1 (Minggu 1-2)
              </span>
              <p className="text-zinc-700 font-medium mt-1">Sesi photoshoot konseptual, aerial drone 4K, dan dokumentasi momen.</p>
            </div>
            <div className="p-3 rounded-2xl bg-paper border border-dark/10">
              <span className="font-mono text-indigo-600 font-bold uppercase tracking-wider block text-[11px]">
                TAHAP 2 (Minggu 3-5)
              </span>
              <p className="text-zinc-700 font-medium mt-1">Layouting visual, kurasi foto, dan cinematic color grading.</p>
            </div>
            <div className="p-3 rounded-2xl bg-paper border border-dark/10">
              <span className="font-mono text-emerald-600 font-bold uppercase tracking-wider block text-[11px]">
                TAHAP 3 (Minggu 6)
              </span>
              <p className="text-zinc-700 font-medium mt-1">Pengiriman buku dummy fisik ke sekolah untuk acc tanda tangan panitia.</p>
            </div>
            <div className="p-3 rounded-2xl bg-paper border border-dark/10">
              <span className="font-mono text-rose-600 font-bold uppercase tracking-wider block text-[11px]">
                TAHAP 4 (Minggu 7-10)
              </span>
              <p className="text-zinc-700 font-medium mt-1">Cetak mesin offset Heidelberg, finishing hardcover jahit benang &amp; kirim.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "faq-3",
      category: "PAKET & BONUS",
      categoryColor: "bg-purple-100/80 text-purple-800 border-purple-200",
      question: "Berapa minimum order & apa saja bonus fasilitas yang didapat angkatan?",
      answerContent: (
        <div className="space-y-3.5">
          <p className="leading-relaxed text-zinc-700">
            Minimum pemesanan mulai dari <strong className="text-dark font-bold">80 siswa</strong> (untuk 1 angkatan). Setiap pemesanan sudah termasuk paket bonus komplit tanpa biaya tersembunyi:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-semibold text-zinc-800">
            <div className="p-3 rounded-2xl bg-orange/5 border border-orange/20 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-orange/15 text-orange flex items-center justify-center flex-shrink-0">
                <Video className="w-4 h-4" />
              </div>
              <span>Free Video Cinematic 4K + Aerial Drone</span>
            </div>
            <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-200/60 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex-shrink-0 flex items-center justify-center">
                <Smartphone className="w-4 h-4" />
              </div>
              <span>Free 3D Virtual Interactive Flipbook</span>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200/60 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex-shrink-0 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <span>Free Buku Hardcover Guru &amp; Kepsek</span>
            </div>
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200/60 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex-shrink-0 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
              <span>Free Exclusive Fourjective Canvas Tote Bag</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "faq-4",
      category: "GARANSI",
      categoryColor: "bg-emerald-100/80 text-emerald-800 border-emerald-200",
      question: "Bagaimana jika ada cacat cetak fisik, salah nama, atau cover rusak?",
      answerContent: (
        <div className="space-y-3">
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs sm:text-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="block text-emerald-900 font-bold text-sm">Garansi 100% Cetak Ulang Gratis!</strong>
              <p className="leading-relaxed text-zinc-700">
                Sebelum naik cetak massal, kami wajibkan sesi approval dummy fisik oleh komite angkatan. Jika terdapat cacat pabrik pada hasil akhir (seperti lem jilid lepas, foil rontok, atau kesalahan cetak dari pihak kami), kami ganti cetak ulang secara gratis tanpa biaya tambahan.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "faq-5",
      category: "PEMBAYARAN",
      categoryColor: "bg-amber-100/80 text-amber-800 border-amber-200",
      question: "Bagaimana sistem pembayaran & pembagian termin kas angkatan?",
      answerContent: (
        <div className="space-y-3.5">
          <p className="leading-relaxed text-zinc-700">
            Sistem pembayaran dirancang sangat fleksibel dalam <strong className="text-dark font-bold">4 termin bertahap</strong> untuk menyesuaikan siklus iuran bulanan kas siswa:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
            <div className="p-3 rounded-2xl bg-paper border border-dark/10">
              <span className="text-orange font-headline font-black text-lg block">20%</span>
              <span className="font-bold text-dark text-xs block mt-0.5">DP 1</span>
              <span className="text-zinc-500 text-[10px] block mt-0.5">Lock tanggal foto</span>
            </div>
            <div className="p-3 rounded-2xl bg-paper border border-dark/10">
              <span className="text-indigo-600 font-headline font-black text-lg block">30%</span>
              <span className="font-bold text-dark text-xs block mt-0.5">TERMIN 2</span>
              <span className="text-zinc-500 text-[10px] block mt-0.5">Saat photoshoot</span>
            </div>
            <div className="p-3 rounded-2xl bg-paper border border-dark/10">
              <span className="text-purple-600 font-headline font-black text-lg block">30%</span>
              <span className="font-bold text-dark text-xs block mt-0.5">TERMIN 3</span>
              <span className="text-zinc-500 text-[10px] block mt-0.5">Acc dummy cetak</span>
            </div>
            <div className="p-3 rounded-2xl bg-paper border border-dark/10">
              <span className="text-emerald-600 font-headline font-black text-lg block">20%</span>
              <span className="font-bold text-dark text-xs block mt-0.5">PELUNASAN</span>
              <span className="text-zinc-500 text-[10px] block mt-0.5">Buku siap kirim</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="faq" className="py-24 px-4 md:px-8 max-w-4xl mx-auto relative select-none">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-orange/10 via-accent-yellow/15 to-purple-200/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Section Header Lockup */}
      <div className="text-center mb-14 relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-dark/10 shadow-sm text-dark text-xs font-mono font-bold tracking-wider uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-orange" />
          <span>FAQ // FREQUENTLY ASKED QUESTIONS</span>
        </div>

        <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-dark mt-2 leading-[1.15]">
          Pertanyaan Seputar <span className="text-orange underline decoration-wavy decoration-accent-yellow">Buku Tahunan</span>
        </h2>
        <p className="text-sm md:text-base text-zinc-600 mt-3 font-medium max-w-lg mx-auto">
          Transparansi penuh mulai dari konsultasi konsep, garansi cetak fisik, hingga skema iuran kas angkatan.
        </p>
      </div>

      {/* Y2K Tactile Accordion Capsules (Smooth, Rounded, Non-Brutalist) */}
      <div className="space-y-3.5">
        {faqList.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={item.id}
              className={`faq-item group rounded-2xl sm:rounded-3xl border transition-all duration-300 ${
                isOpen
                  ? "bg-white border-orange/40 shadow-[0_12px_32px_rgba(255,77,0,0.08)] ring-2 ring-orange/10"
                  : "bg-white/90 hover:bg-white border-dark/10 shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:border-dark/20"
              } p-5 sm:p-6 overflow-hidden`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3 sm:gap-3.5">
                  {/* Category Pill Tag */}
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider border ${item.categoryColor}`}
                  >
                    {item.category}
                  </span>

                  <h3 className="font-display font-bold text-base sm:text-lg text-dark tracking-tight leading-snug">
                    {item.question}
                  </h3>
                </div>

                {/* Smooth Circle Chevron Button */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 border ${
                    isOpen
                      ? "bg-dark border-dark text-white rotate-180 shadow-sm"
                      : "bg-paper border-dark/10 text-dark group-hover:bg-white group-hover:border-dark/20"
                  }`}
                >
                  <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                </div>
              </button>

              {/* Collapsible Body */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  isOpen ? "max-h-[500px] opacity-100 pt-4" : "max-h-0 opacity-0 pt-0"
                }`}
              >
                <div className="text-xs sm:text-sm text-zinc-700 font-normal leading-relaxed border-t border-dark/5 pt-4">
                  {item.answerContent}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Warm Friendly Consultation Banner */}
      <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-dark text-white border-2 border-dark shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange/20 rounded-full blur-3xl pointer-events-none" />

        <div className="text-left relative z-10">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] text-accent-yellow font-bold uppercase tracking-wider mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow animate-pulse" />
            <span>KONSULTASI GRATIS 100% // TANYA SEPUASNYA</span>
          </div>
          <h4 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
            Masih Ada Hal yang Ingin Ditanyakan?
          </h4>
          <p className="text-xs sm:text-sm text-zinc-300 font-normal mt-1 max-w-md">
            Diskusikan tema angkatan, ide photoshoot, dan simulasi anggaran kas bersama tim Fourjective.
          </p>
        </div>

        <a
          href="https://wa.me/6289657008080?text=Halo%20Fourjective!%20Saya%20ingin%20tanya%20info%20lebih%20lanjut%20seputar%20buku%20tahunan."
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-orange text-white font-display font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-dark active:scale-95 transition-all shadow-md whitespace-nowrap"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat WhatsApp Sekarang</span>
        </a>
      </div>
    </section>
  );
}
