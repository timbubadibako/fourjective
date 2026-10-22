"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Mail, ArrowUp, MapPin, Phone } from "lucide-react";

export default function FooterV4() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#14161C] text-white relative overflow-hidden select-none border-t-4 border-dark">
      {/* Top Ticker: Clean Marquee */}
      <div className="relative bg-orange border-b-2 border-dark py-3 overflow-hidden">
        <div className="flex whitespace-nowrap font-headline text-xs sm:text-sm tracking-wider text-white animate-marquee uppercase font-black">
          <span className="mx-6 flex items-center gap-2">
            <span>✦ FOURJECTIVE CREATIVE STUDIO // DIGITAL &amp; PRINT YEARBOOK</span>
          </span>
          <span className="mx-4 text-white/50">&bull;</span>
          <span className="mx-6">EST. 2021 &bull; JAMINAN TEPAT WAKTU SEBELUM WISUDA</span>
          <span className="mx-4 text-white/50">&bull;</span>
          <span className="mx-6 text-dark bg-white px-2 py-0.5 rounded">FREE 3D VIRTUAL FLIPBOOK</span>
          <span className="mx-4 text-white/50">&bull;</span>
          <span className="mx-6">CETAK MESIN OFFSET HEIDELBERG BERGARANSI</span>
          <span className="mx-4 text-white/50">&bull;</span>
          <span className="mx-6">JAKARTA &bull; BANDUNG &bull; KUNINGAN &bull; SURABAYA &bull; BALI</span>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="relative max-w-7xl mx-auto py-14 px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-orange flex items-center justify-center font-headline font-black text-xl text-white border-2 border-white shadow-[3px_3px_0px_#000]">
              4J
            </div>
            <div>
              <span className="font-headline font-black text-2xl tracking-tight uppercase text-white block">
                FOURJECTIVE
              </span>
              <span className="font-mono text-[10px] tracking-wider text-orange uppercase font-bold block -mt-0.5">
                CREATIVE STUDIO // EST. 2021
              </span>
            </div>
          </div>

          <p className="font-mono text-xs text-white/70 max-w-sm leading-relaxed">
            Studio kreatif buku tahunan sekolah terpadu. Dari photoshoot konsep, liputan drone aftermovie, sampai cetak offset hardcover berkualitas tinggi.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <a
              href="https://wa.me/6285157386631"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1C1F26] border border-white/20 hover:border-orange px-3.5 py-2 rounded-lg font-mono text-xs text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-orange" />
              <span>+62 851-5738-6631</span>
            </a>
            <a
              href="mailto:fourjectiv@gmail.com"
              className="inline-flex items-center gap-2 bg-[#1C1F26] border border-white/20 hover:border-orange px-3.5 py-2 rounded-lg font-mono text-xs text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-orange" />
              <span>fourjectiv@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Links: Layanan */}
        <div className="md:col-span-2 space-y-3">
          <div className="font-mono text-xs font-black uppercase tracking-wider text-orange">
            Paket
          </div>
          <ul className="space-y-2 text-xs font-mono text-white/70">
            <li>
              <Link href="/paket" className="hover:text-white transition-colors">
                Buku Tahunan
              </Link>
            </li>
            <li>
              <Link href="/paket" className="hover:text-white transition-colors">
                Video &amp; Drone 4K
              </Link>
            </li>
            <li>
              <Link href="/paket" className="hover:text-white transition-colors">
                Foto Konsep
              </Link>
            </li>
            <li>
              <Link href="/paket" className="hover:text-white transition-colors">
                Merchandise
              </Link>
            </li>
          </ul>
        </div>

        {/* Links: Portofolio & Info */}
        <div className="md:col-span-2 space-y-3">
          <div className="font-mono text-xs font-black uppercase tracking-wider text-orange">
            Eksplorasi
          </div>
          <ul className="space-y-2 text-xs font-mono text-white/70">
            <li>
              <Link href="/portofolio" className="hover:text-white transition-colors">
                Arsip Sekolah
              </Link>
            </li>
            <li>
              <Link href="/#testimonials" className="hover:text-white transition-colors">
                Testimoni Klien
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                Tentang Studio
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white transition-colors">
                FAQ Angkatan
              </Link>
            </li>
            <li>
              <Link href="/portal" className="hover:text-white transition-colors">
                Portal Siswa
              </Link>
            </li>
          </ul>
        </div>

        {/* Studio HQ & Scroll Top */}
        <div className="md:col-span-3 space-y-4">
          <div className="font-mono text-xs font-black uppercase tracking-wider text-orange">
            Studio HQ
          </div>
          <p className="font-mono text-xs text-white/70 leading-relaxed flex items-start gap-2">
            <MapPin className="w-4 h-4 text-orange flex-shrink-0 mt-0.5" />
            <span>Kuningan, Jawa Barat &mdash; Melayani kunjungan dan produksi sekolah seluruh Indonesia.</span>
          </p>

          <div className="pt-2">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 bg-[#1C1F26] hover:bg-orange text-white border border-white/20 hover:border-orange px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>KEMBALI KE ATAS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Sub-bar */}
      <div className="border-t border-white/10 py-5 px-4 md:px-8 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] font-mono text-white/50">
          <span>&copy; Sejak 2020 &mdash; 2026 PT Fourjective Studio Indonesia. Hak Cipta Dilindungi.</span>
          <span className="text-white/40">Made for #ForeverYoung Memories</span>
        </div>
      </div>
    </footer>
  );
}
