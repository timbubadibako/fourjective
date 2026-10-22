"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Instagram, Mail, ArrowUp, Sparkles, MapPin, Phone, Heart } from "lucide-react";

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-dark text-white relative overflow-hidden select-none border-t-2 border-dark">
      {/* ================= TOP MARQUEE TICKER (CREATIVE YEARBOOK VIBE) ================= */}
      <div className="bg-[#27272A] border-b border-zinc-800 py-3 overflow-hidden">
        <div className="flex whitespace-nowrap font-headline text-sm tracking-wider text-accent-yellow animate-marquee uppercase">
          <span className="mx-6 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-orange" />
            <span>FOURJECTIVE CREATIVE STUDIO</span>
          </span>
          <span className="mx-4 text-zinc-600">&bull;</span>
          <span className="mx-6 text-white font-medium">BUKU TAHUNAN SEKOLAH SEJAK 2017</span>
          <span className="mx-4 text-zinc-600">&bull;</span>
          <span className="mx-6 text-orange font-bold">DO THE BEST FOR THE BEST MOMENT</span>
          <span className="mx-4 text-zinc-600">&bull;</span>
          <span className="mx-6 text-zinc-300">CETAK OFFSET HEIDELBERG BERGARANSI</span>
          <span className="mx-4 text-zinc-600">&bull;</span>
          <span className="mx-6 text-white">KUNINGAN &bull; JAKARTA &bull; BANDUNG &bull; SURABAYA &bull; MAKASSAR &bull; BALI</span>
          <span className="mx-4 text-zinc-600">&bull;</span>
          <span className="mx-6 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-orange" />
            <span>FOURJECTIVE CREATIVE STUDIO</span>
          </span>
          <span className="mx-4 text-zinc-600">&bull;</span>
          <span className="mx-6 text-white font-medium">BUKU TAHUNAN SEKOLAH SEJAK 2017</span>
          <span className="mx-4 text-zinc-600">&bull;</span>
          <span className="mx-6 text-orange font-bold">DO THE BEST FOR THE BEST MOMENT</span>
          <span className="mx-4 text-zinc-600">&bull;</span>
          <span className="mx-6 text-zinc-300">CETAK OFFSET HEIDELBERG BERGARANSI</span>
          <span className="mx-4 text-zinc-600">&bull;</span>
          <span className="mx-6 text-white">KUNINGAN &bull; JAKARTA &bull; BANDUNG &bull; SURABAYA &bull; MAKASSAR &bull; BALI</span>
        </div>
      </div>

      {/* ================= MAIN FOOTER CONTENT ================= */}
      <div className="max-w-7xl mx-auto py-16 px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 relative z-10">
        
        {/* Brand Lockup & Description (Col 1-5) */}
        <div className="md:col-span-5 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange flex items-center justify-center font-headline font-black text-xl text-white shadow-md">
              4J
            </div>
            <div>
              <span className="font-headline font-black text-2xl tracking-tight uppercase text-white block">
                FOURJECTIVE
              </span>
              <span className="font-mono text-[10px] tracking-wider text-orange uppercase font-bold block -mt-0.5">
                CREATIVE STUDIO // EST. 2017
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm font-normal">
            Laboratorium kreatif dan percetakan buku tahunan berstandar seni tinggi. Mengabadikan kisah dan persahabatan masa putih-abu-abu menjadi memorabilia abadi.
          </p>

          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-800/80 border border-zinc-700 font-mono text-[10px] text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>SIAP MELAYANI ANGKATAN SELURUH INDONESIA</span>
          </div>

          {/* Kota Jangkauan */}
          <div className="pt-2">
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">
              ✦ JANGKAUAN TIM &amp; STUDIO:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["Kuningan (HQ)", "Jakarta", "Bandung", "Surabaya", "Makassar", "Bali"].map((city) => (
                <span
                  key={city}
                  className="px-2.5 py-1 rounded-lg bg-zinc-800/60 border border-zinc-700/60 text-[10px] font-mono text-zinc-300"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Directory / Layanan (Col 6-8) */}
        <div className="md:col-span-3 space-y-4">
          <h5 className="font-headline text-base uppercase text-white tracking-wider font-bold flex items-center gap-2">
            <span className="text-orange">✦</span>
            <span>LAYANAN KAMI</span>
          </h5>
          <ul className="text-xs space-y-2.5 text-zinc-400 font-medium">
            <li>
              <Link href="#services" className="hover:text-orange transition-colors flex items-center gap-2">
                <span>&bull;</span> 01. Yearbook Production
              </Link>
            </li>
            <li>
              <Link href="#services" className="hover:text-orange transition-colors flex items-center gap-2">
                <span>&bull;</span> 02. Event &amp; Prom Night
              </Link>
            </li>
            <li>
              <Link href="#services" className="hover:text-orange transition-colors flex items-center gap-2">
                <span>&bull;</span> 03. Creative Photo Studio
              </Link>
            </li>
            <li>
              <Link href="#services" className="hover:text-orange transition-colors flex items-center gap-2">
                <span>&bull;</span> 04. Digital &amp; Offset Printing
              </Link>
            </li>
            <li className="pt-2 border-t border-zinc-800">
              <Link href="#calculator" className="hover:text-orange transition-colors flex items-center gap-2">
                <span>&bull;</span> Simulasi Kas Angkatan
              </Link>
            </li>
            <li>
              <Link href="#portfolio-orbit" className="hover:text-orange transition-colors flex items-center gap-2">
                <span>&bull;</span> Galeri 3D Buku Tahunan
              </Link>
            </li>
            <li>
              <Link href="#faq" className="hover:text-orange transition-colors flex items-center gap-2">
                <span>&bull;</span> FAQ &amp; Garansi Cetak
              </Link>
            </li>
          </ul>
        </div>

        {/* Kontak & Media Sosial (Col 9-12) */}
        <div className="md:col-span-4 space-y-4">
          <h5 className="font-headline text-base uppercase text-white tracking-wider font-bold flex items-center gap-2">
            <span className="text-orange">✦</span>
            <span>HUBUNGI KAMI</span>
          </h5>
          <p className="text-xs text-zinc-400 font-normal leading-relaxed">
            Konsultasikan tema buku tahunan sekolahmu, jadwal photoshoot, dan simulasi anggaran bersama tim kami:
          </p>

          <div className="flex flex-col gap-2 pt-1">
            <a
              href="https://wa.me/6289657008080"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-2xl bg-zinc-800/80 border border-zinc-700 hover:border-orange hover:bg-zinc-700/80 transition-all text-xs font-mono text-zinc-200 hover:text-white group"
            >
              <span className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>+62 896-5700-8080</span>
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                WHATSAPP
              </span>
            </a>

            <a
              href="https://instagram.com/fourjective"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-2xl bg-zinc-800/80 border border-zinc-700 hover:border-orange hover:bg-zinc-700/80 transition-all text-xs font-mono text-zinc-200 hover:text-white group"
            >
              <span className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-rose-400" />
                <span>@fourjective</span>
              </span>
              <span className="text-[10px] bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded-full font-bold">
                INSTAGRAM
              </span>
            </a>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-800/80 border border-zinc-700 text-xs font-mono text-zinc-300">
              <span className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange" />
                <span>halo@fourjective.com</span>
              </span>
              <span className="text-[10px] bg-zinc-700 text-zinc-300 px-2 py-0.5 rounded-full font-bold">
                EMAIL
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="max-w-7xl mx-auto border-t border-zinc-800 py-6 px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500 relative z-10">
        <p className="flex items-center gap-1.5">
          <span>&copy; 2026 Fourjective Creative Studio. Crafted for Memories.</span>
        </p>

        {/* Back To Top Pill Button */}
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-800 hover:bg-orange hover:text-white border border-zinc-700 text-zinc-300 text-xs font-headline font-bold uppercase transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <span>KEMBALI KE ATAS</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
