"use client";

import React, { useState } from "react";
import { ChevronDown, ShieldCheck, CheckCircle2, Clock, MapPin, CreditCard, Lock, RefreshCw } from "lucide-react";

interface FaqItem {
  id: string;
  category: string;
  categoryColor: string;
  question: string;
  answerContent: React.ReactNode;
}

export default function FaqV2() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const faqList: FaqItem[] = [
    {
      id: "faq-1",
      category: "SISTEM PEMBAYARAN",
      categoryColor: "bg-emerald-100/80 text-emerald-800 border-emerald-300",
      question: "Bagaimana sistem pembayaran & cicilan kas angkatan (termin)?",
      answerContent: (
        <div className="space-y-3.5">
          <p className="leading-relaxed text-zinc-700">
            Kami menerapkan sistem <strong className="text-dark font-bold">3 Tahap Termin Aman</strong> yang menyesuaikan alur pengumpulan uang kas siswa:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="p-3 rounded-2xl bg-paper border border-dark/10">
              <span className="font-mono text-orange font-bold uppercase tracking-wider block text-[11px]">
                TERMIN 1 (DP 30%)
              </span>
              <p className="text-zinc-700 font-medium mt-1">Saat MoU kontrak &amp; booking tanggal jadwal photoshoot.</p>
            </div>
            <div className="p-3 rounded-2xl bg-paper border border-dark/10">
              <span className="font-mono text-indigo-600 font-bold uppercase tracking-wider block text-[11px]">
                TERMIN 2 (40%)
              </span>
              <p className="text-zinc-700 font-medium mt-1">Saat foto selesai diseleksi dan proses layouting desain dimulai.</p>
            </div>
            <div className="p-3 rounded-2xl bg-paper border border-dark/10">
              <span className="font-mono text-emerald-600 font-bold uppercase tracking-wider block text-[11px]">
                TERMIN 3 (30%)
              </span>
              <p className="text-zinc-700 font-medium mt-1">Pelunasan saat buku dummy disetujui komite &amp; siap masuk mesin cetak.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "faq-2",
      category: "JAMINAN TEPAT WAKTU",
      categoryColor: "bg-sky-100/80 text-sky-800 border-sky-300",
      question: "Bagaimana jaminan buku selesai tepat waktu sebelum acara kelulusan/wisuda?",
      answerContent: (
        <div className="space-y-3">
          <p className="leading-relaxed text-zinc-700">
            Fourjective memberikan <strong className="text-dark font-bold">100% On-Time Guarantee tertulis dalam kontrak bermaterai</strong>. Tanggal wisuda sekolah Anda adalah tenggat waktu mati bagi kami. Jika terjadi keterlambatan karena kelalaian produksi kami, ada kompensasi pengembalian dana bertahap sesuai klausul kesepakatan.
          </p>
          <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200 text-sky-900 text-xs font-medium flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-600 flex-shrink-0" />
            <span>Rata-rata lead time produksi: 60-90 hari kerja terhitung sejak data lengkap disetujui.</span>
          </div>
        </div>
      ),
    },
    {
      id: "faq-3",
      category: "KEAMANAN & PRIVASI",
      categoryColor: "bg-purple-100/80 text-purple-800 border-purple-300",
      question: "Apakah foto dan data siswa aman dan tidak disalahgunakan di internet?",
      answerContent: (
        <div className="space-y-3">
          <p className="leading-relaxed text-zinc-700">
            <strong className="text-dark font-bold">Privasi siswa prioritas mutlak.</strong> Untuk edisi digital Virtual Flipbook, setiap sekolah diberikan portal khusus berpassword:
          </p>
          <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 text-purple-900 text-xs font-medium flex items-center gap-2">
            <Lock className="w-4 h-4 text-purple-600 flex-shrink-0" />
            <span>Hanya alumni &amp; guru pemegang password resmi angkatan yang dapat membuka isi buku tahunan online.</span>
          </div>
        </div>
      ),
    },
    {
      id: "faq-4",
      category: "GARANSI CETAK",
      categoryColor: "bg-rose-100/80 text-rose-800 border-rose-300",
      question: "Bagaimana jika ada buku yang cacat cetak, lem lepas, atau halaman tertukar?",
      answerContent: (
        <div className="space-y-3">
          <p className="leading-relaxed text-zinc-700">
            Semua buku tahunan melalui proses Quality Control (QC) per eksemplar. Jika komite sekolah menemukan buku cacat cetak (halaman terbalik, sobek pabrik, jilid lepas), Fourjective memberikan <strong className="text-dark font-bold">Garansi Cetak Ulang Gratis (Free Replacement) 100%</strong> tanpa dipungut biaya tambahan.
          </p>
          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-medium flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>Klaim penggantian cukup sertakan foto bukti dalam 14 hari kerja setelah buku diterima di sekolah.</span>
          </div>
        </div>
      ),
    },
    {
      id: "faq-5",
      category: "JANGKAUAN",
      categoryColor: "bg-amber-100/80 text-amber-800 border-amber-300",
      question: "Apakah Fourjective bisa melayani sekolah di luar Jawa Barat & luar pulau?",
      answerContent: (
        <div className="space-y-3">
          <p className="leading-relaxed text-zinc-700">
            <strong className="text-dark font-bold">Bisa banget!</strong> Sejak 2017, tim Fourjective telah menangani angkatan di Jabodetabek, Jawa Barat, Jawa Tengah, Jawa Timur, hingga Sumatera (Medan, Padang, Batam), Kalimantan, Sulawesi (Makassar), Bali, dan Nusa Tenggara. Seluruh peralatan lighting studio dan kru diterbangkan langsung ke lokasi sekolah.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section id="faq" className="py-24 px-4 md:px-8 max-w-5xl mx-auto select-none">
      <div className="text-center mb-16">
        <span className="bg-dark text-accent-yellow font-mono text-xs font-black px-4 py-1.5 rounded-full border-2 border-dark shadow-sm uppercase inline-block mb-3">
          ✦ TANYA JAWAB KRUSIAL
        </span>
        <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-dark mt-2 leading-tight">
          SEMUA HAL YANG SERING <span className="text-orange underline decoration-wavy">DITANYAKAN</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 mt-2 font-medium max-w-lg mx-auto">
          Transparan sejak awal mengenai kontrak, garansi ganti rugi, hingga proteksi data siswa angkatan Anda.
        </p>
      </div>

      <div className="space-y-4">
        {faqList.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.id}
              className={`rounded-3xl border-3 border-dark transition-all duration-200 overflow-hidden ${
                isOpen ? "bg-white shadow-brutal" : "bg-[#FAF7F2] hover:bg-white"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                  <span
                    className={`font-mono text-[10px] font-black px-2.5 py-1 rounded-full border uppercase ${faq.categoryColor}`}
                  >
                    {faq.category}
                  </span>
                  <span className="font-headline font-bold text-base sm:text-lg text-dark uppercase tracking-wide">
                    {faq.question}
                  </span>
                </div>
                <div
                  className={`w-8 h-8 rounded-full border-2 border-dark flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 bg-orange text-white" : "bg-paper text-dark"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-xs sm:text-sm border-t border-dark/10 pt-4">
                  {faq.answerContent}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
