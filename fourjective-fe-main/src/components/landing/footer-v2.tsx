"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Instagram, Mail, ArrowUp, Sparkles, MapPin, Phone, ShieldCheck } from "lucide-react";

export default function FooterV2() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#121316] text-white relative overflow-hidden select-none border-t-4 border-dark">
      {/* Top Graphic Accent Bar */}
      <div className="bg-[#1E1F24] border-b border-zinc-800 py-3 overflow-hidden">
        <div className="flex whitespace-nowrap font-headline text-xs sm:text-sm tracking-wider text-accent-yellow animate-marquee uppercase">
          <span className="mx-6 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-orange" />
            <span>FOURJECTIVE CREATIVE STUDIO // DIGITAL &amp; PRINT YEARBOOK</span>
          </span>
          <span className="mx-4 text-zinc-600">&bull;</span>
          <span className="mx-6 text-white font-medium">EST. 2017 &bull; JAMINAN TEPAT WAKTU SEBELUM WISUDA</span>
          <span className="mx-4 text-zinc-600">&bull;</span>
          <span className="mx-6 text-orange font-bold">FREE 3D VIRTUAL FLIPBOOK SETIAP CETAK</span>
          <span className="mx-4 text-zinc-600">&bull;</span>
          <span className="mx-6 text-zinc-300">CETAK MESIN OFFSET HEIDELBERG BERGARANSI</span>
          <span className="mx-4 text-zinc-600">&bull;</span>
          <span className="mx-6 text-white">JAKARTA &bull; BANDUNG &bull; KUNINGAN &bull; SURABAYA &bull; BALI</span>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto py-16 px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 relative z-10">
        {/* Brand Information (Col 1-5) */}
        <div className="md:col-span-5 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange flex items-center justify-center font-headline font-black text-xl text-white shadow-md border-2 border-dark">
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
            Laboratorium kreatif dan percetakan buku tahunan berstandar seni tinggi. Mengabadikan kisah persahabatan masa putih-abu-abu menjadi karya memorabilia abadi bergaransi resmi.
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 font-mono text-[10px] text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>OPEN BOOKING TAHUN AJARAN 2026/2027</span>
          </div>

          <div className="pt-2">
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">
              ✦ KOTA JANGKAUAN TIM &amp; STUDIO:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["Kuningan (HQ)", "Jabodetabek", "Bandung", "Surabaya", "Makassar", "Bali"].map((city) => (
                <span
                  key={city}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Directory Links (Col 6-8) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-headline text-base uppercase text-white tracking-wider font-bold flex items-center gap-2">
            <span className="text-orange">✦</span>
            <span>NAVIGASI</span>
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-400 font-medium">
            <li>
              <Link href="#services" className="hover:text-orange transition-colors">
                4 Pilar Layanan
              </Link>
            </li>
            <li>
              <Link href="#portfolio" className="hover:text-orange transition-colors">
                Galeri Portofolio &amp; Flipbook
              </Link>
            </li>
            <li>
              <Link href="#showreel" className="hover:text-orange transition-colors">
                Showreel 4K Sinematik
              </Link>
            </li>
            <li>
              <Link href="#calculator" className="hover:text-orange transition-colors">
                Kalkulator Kas Angkatan
              </Link>
            </li>
            <li>
              <Link href="#faq" className="hover:text-orange transition-colors">
                Tanya Jawab &amp; Garansi
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & CTA (Col 9-12) */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="font-headline text-base uppercase text-white tracking-wider font-bold flex items-center gap-2">
            <span className="text-orange">✦</span>
            <span>HUBUNGI KAMI</span>
          </h4>

          <div className="space-y-3 text-xs sm:text-sm text-zinc-300">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-orange flex-shrink-0 mt-0.5" />
              <span>Jl. RE Martadinata No. 88, Kuningan, Jawa Barat</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>+62 812-3456-7890 (Hotline WhatsApp)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <span>fourjectivestudio@gmail.com</span>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="https://wa.me/6281234567890?text=Halo%20Fourjective%20Studio!%20Saya%20ingin%20konsultasi%20buku%20tahunan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-accent-wa text-dark font-headline font-bold text-xs uppercase px-4 py-3 rounded-2xl border-2 border-dark shadow-sm hover:bg-white transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-dark text-transparent" />
              <span>CHAT KONSULTASI WA RESMI</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800/80 py-6 px-4 md:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
        <div>
          &copy; {new Date().getFullYear()} FOURJECTIVE CREATIVE STUDIO. ALL RIGHTS RESERVED.
        </div>

        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-orange transition-colors font-bold uppercase text-[11px]"
        >
          <span>KEMBALI KE ATAS</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
