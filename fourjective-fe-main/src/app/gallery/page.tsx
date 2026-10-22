"use client";

import Header from "@/components/landing/header-pill-v2";
import Footer from "@/components/landing/footer-v4";
import GalleryMasonry from "@/components/landing/gallery-masonry";
import Showreel from "@/components/landing/showreel-horizontal";
import {
  ArrowLeft,
  Image as ImageIcon,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { WA_MESSAGES, waLink } from "@/lib/site";

export default function Gallery() {
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
              Galeri
            </span>
          </div>

          <div className="border-t-[3px] border-dark pt-8 sm:pt-10 pb-8 sm:pb-10 relative">
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
                Galeri
                <br />
                <span className="text-orange">Visual Kami.</span>
              </h1>
              <div className="lg:col-span-4 lg:pb-2">
                <p className="text-sm sm:text-base text-dark/70 leading-relaxed font-medium">
                  Kumpulan foto, video, dan behind-the-scene dari produksi yearbook angkatan seluruh Indonesia.
                </p>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-dark/40 mt-4">
                  PT Fourjective Studio Indonesia
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== GALLERY MASONRY ===== */}
        <GalleryMasonry />

        {/* ===== SHOWREEL ===== */}
        <Showreel />

        {/* ===== CTA ===== */}
        <div className="border-t-[3px] border-dark bg-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-20">
            <div className="grid lg:grid-cols-12 gap-8 items-end">
              <h2 className="lg:col-span-7 font-playtimes text-white leading-[1.0] tracking-tight text-4xl sm:text-6xl">
                Mau Hasil
                <br />
                <span className="text-orange">Seperti Ini?</span>
              </h2>
              <div className="lg:col-span-5">
                <p className="text-sm text-white/70 leading-relaxed font-medium mb-6">
                  Konsultasi langsung via WhatsApp — tim kami siap bantu susun konsep angkatanmu.
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
