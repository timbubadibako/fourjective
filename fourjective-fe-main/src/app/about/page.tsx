import React from "react";
import Link from "next/link";
import Header from "@/components/landing/header-pill-v2";
import Footer from "@/components/landing/footer-v4";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Globe2,
  Sparkles,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import { WA_MESSAGES, waLink } from "@/lib/site";

/* ============ ABOUT — TENTANG STUDIO ============
   Gaya Swiss-brutal konsisten dengan /paket & /services. */

const MISSION_ITEMS: string[] = [
  "Mengabadikan kenangan sekolah dengan pendekatan personal dan emosional.",
  "Menjaga standar kualitas tertinggi di setiap eksemplar.",
  "Berinovasi secara berkelanjutan dengan teknologi visual terkini.",
  "Membangun komunikasi kolaboratif dengan panitia angkatan.",
  "Memberikan layanan tepat waktu dan bertanggung jawab.",
  "Mendedikasikan upaya terbaik untuk setiap momen berharga.",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper text-dark flex flex-col selection:bg-orange selection:text-white">
      <Header />

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
              Tentang Studio
            </span>
          </div>

          <div className="border-t-[3px] border-dark pt-8 sm:pt-10 pb-10 sm:pb-14 relative">
            <div
              className="absolute right-0 top-0 w-[360px] h-[360px] opacity-[0.07] pointer-events-none"
              aria-hidden
            >
              <svg viewBox="0 0 200 200" className="w-full h-full fill-orange">
                <polygon points="100,0 115,65 178,32 142,88 200,100 142,112 178,168 115,135 100,200 85,135 22,168 58,112 0,100 58,88 22,32 85,65" />
              </svg>
            </div>
            <div className="grid lg:grid-cols-12 gap-8 items-end relative">
              <h1 className="lg:col-span-8 font-playtimes text-dark leading-[1.0] tracking-tight text-5xl sm:text-7xl md:text-8xl">
                Tentang
                <br />
                <span className="text-orange">Studio Kami.</span>
              </h1>
              <div className="lg:col-span-4 lg:pb-2">
                <p className="text-sm sm:text-base text-dark/70 leading-relaxed font-medium">
                  Mitra terpercaya dalam menciptakan buku tahunan yang menyentuh hati, berkualitas tinggi, dan penuh kenangan otentik.
                </p>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-dark/40 mt-4">
                  PT Fourjective Studio Indonesia · Est. 2017
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== 01 VISI ===== */}
        <div className="border-t-[3px] border-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
            <div className="flex items-center gap-4 border-b-[3px] border-dark pb-3 mb-6">
              <span className="font-headline font-black text-orange text-2xl leading-none">
                01
              </span>
              <h2 className="font-headline font-black uppercase text-sm sm:text-base tracking-wider text-dark">
                Visi
              </h2>
            </div>
            <p className="text-sm sm:text-base text-dark/75 leading-relaxed font-medium max-w-3xl">
              Menjadi mitra terpercaya dalam menciptakan buku tahunan (Yearbook) yang menyentuh hati, berkualitas tinggi, dan penuh kenangan otentik untuk generasi sekolah masa kini — dengan sentuhan teknologi dan inovasi yang selalu kami update dari tahun ke tahun.
            </p>
          </div>
        </div>

        {/* ===== 02 MISI ===== */}
        <div className="border-t-[3px] border-dark bg-white/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
            <div className="flex items-center gap-4 border-b-[3px] border-dark pb-3 mb-6">
              <span className="font-headline font-black text-orange text-2xl leading-none">
                02
              </span>
              <h2 className="font-headline font-black uppercase text-sm sm:text-base tracking-wider text-dark">
                Misi
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-4xl">
              {MISSION_ITEMS.map((m, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white border-3 border-dark rounded-xl p-4 shadow-[4px_5px_0px_#14161C]"
                >
                  <span className="font-mono text-[10px] font-black text-orange shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs sm:text-sm text-dark/75 leading-relaxed font-medium">
                    {m}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== 03 FAKTA STUDIO ===== */}
        <div className="border-t-[3px] border-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
            <div className="flex items-center gap-4 border-b-[3px] border-dark pb-3 mb-6">
              <span className="font-headline font-black text-orange text-2xl leading-none">
                03
              </span>
              <h2 className="font-headline font-black uppercase text-sm sm:text-base tracking-wider text-dark">
                Fakta Studio
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Calendar, label: "Berdiri", value: "Sejak 2017" },
                { icon: MapPin, label: "HQ", value: "Kuningan, Jawa Barat" },
                { icon: Globe2, label: "Jangkauan", value: "Seluruh Indonesia" },
              ].map((f) => (
                <div
                  key={f.label}
                  className="bg-white border-3 border-dark rounded-xl p-5 sm:p-6 shadow-[5px_6px_0px_#14161C]"
                >
                  <f.icon className="w-6 h-6 text-orange mb-3" />
                  <p className="font-mono text-[9px] font-black uppercase tracking-[0.25em] text-dark/45 mb-1">
                    {f.label}
                  </p>
                  <p className="font-headline font-black uppercase text-sm sm:text-base text-dark tracking-wider">
                    {f.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== CTA ===== */}
        <div className="border-t-[3px] border-dark bg-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-20">
            <div className="grid lg:grid-cols-12 gap-8 items-end">
              <h2 className="lg:col-span-7 font-playtimes text-white leading-[1.0] tracking-tight text-4xl sm:text-6xl">
                Mau Kenal
                <br />
                <span className="text-orange">Lebih Dekat?</span>
              </h2>
              <div className="lg:col-span-5">
                <p className="text-sm text-white/70 leading-relaxed font-medium mb-6">
                  Konsultasi langsung via WhatsApp — tim kami siap bantu susun kebutuhan sekolahmu.
                </p>
                <a
                  href={waLink(WA_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-orange text-white font-headline font-black text-xs sm:text-sm uppercase tracking-widest px-7 py-4 border-3 border-white/20 shadow-[5px_6px_0px_rgba(255,255,255,0.15)] hover:shadow-[2px_3px_0px_rgba(255,255,255,0.15)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Hubungi via WhatsApp</span>
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
