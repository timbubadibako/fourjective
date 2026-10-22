"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Mail, ArrowUp, Sparkles, MapPin, Phone } from "lucide-react";
import { NAV_LINKS, SITE, WA_MESSAGES, resolveNavHref, waLink } from "@/lib/site";

/**
 * Footer tunggal untuk seluruh situs publik.
 * Di landing memakai hash anchor, di sub-page memakai route absolut.
 */
export default function SiteFooter() {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-ink-soft text-white relative overflow-hidden select-none border-t-4 border-dark">
      {/* Sunburst */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] opacity-[0.06] pointer-events-none"
        aria-hidden
      >
        <svg viewBox="0 0 200 200" className="w-full h-full fill-white">
          <polygon points="100,0 115,65 178,32 142,88 200,100 142,112 178,168 115,135 100,200 85,135 22,168 58,112 0,100 58,88 22,32 85,65" />
        </svg>
      </div>

      {/* Ticker */}
      <div className="relative bg-brand-700 border-b-2 border-dark py-3 overflow-hidden">
        <div className="flex whitespace-nowrap font-headline text-xs sm:text-sm tracking-wider text-white animate-marquee uppercase font-bold">
          <span className="mx-6 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-accent-yellow" />
            <span>FOURJECTIVE CREATIVE STUDIO // DIGITAL &amp; PRINT YEARBOOK</span>
          </span>
          <span className="mx-4 text-white/50">&bull;</span>
          <span className="mx-6">EST. 2017 &bull; JAMINAN TEPAT WAKTU SEBELUM WISUDA</span>
          <span className="mx-4 text-white/50">&bull;</span>
          <span className="mx-6 text-accent-yellow">FREE 3D VIRTUAL FLIPBOOK SETIAP CETAK</span>
          <span className="mx-4 text-white/50">&bull;</span>
          <span className="mx-6 text-white/80">CETAK MESIN OFFSET HEIDELBERG BERGARANSI</span>
          <span className="mx-4 text-white/50">&bull;</span>
          <span className="mx-6">JAKARTA &bull; BANDUNG &bull; KUNINGAN &bull; SURABAYA &bull; BALI</span>
        </div>
      </div>

      {/* Strip diagonal */}
      <div
        className="relative w-full h-2 opacity-70"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, #1D4ED8 0px, #1D4ED8 10px, #0B0C0F 10px, #0B0C0F 22px)",
        }}
      />

      {/* Body */}
      <div className="relative max-w-7xl mx-auto py-14 px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Brand */}
        <div className="md:col-span-5 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-brand-700 flex items-center justify-center font-headline font-black text-xl text-white border-2 border-white shadow-[3px_3px_0px_#000]">
              {SITE.shortMark}
            </div>
            <div>
              <span className="font-headline font-black text-2xl tracking-tight uppercase text-white block">
                {SITE.brand.toUpperCase()}
              </span>
              <span className="font-mono text-[10px] tracking-wider text-brand-400 uppercase font-bold block -mt-0.5">
                CREATIVE STUDIO // EST. {SITE.est}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
            Laboratorium kreatif dan percetakan buku tahunan berstandar seni tinggi. Mengabadikan kisah
            persahabatan masa putih-abu-abu menjadi karya memorabilia abadi bergaransi resmi.
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-700/25 border border-brand-400/40 font-mono text-[10px] text-brand-200 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>OPEN BOOKING TAHUN AJARAN 2026/2027</span>
          </div>

          <div className="pt-1">
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-2">
              ✦ KOTA JANGKAUAN TIM &amp; STUDIO:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SITE.cities.map((city) => (
                <span
                  key={city}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Navigasi */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-headline text-base uppercase text-white tracking-wider font-bold flex items-center gap-2">
            <span className="text-brand-400">✦</span>
            <span>NAVIGASI</span>
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-400 font-medium">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={resolveNavHref(pathname, link)}
                  className="hover:text-brand-300 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontak */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="font-headline text-base uppercase text-white tracking-wider font-bold flex items-center gap-2">
            <span className="text-brand-400">✦</span>
            <span>HUBUNGI KAMI</span>
          </h4>

          <div className="space-y-3 text-xs sm:text-sm text-zinc-300">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
              <span>{SITE.address}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{SITE.whatsappDisplay} (Hotline WhatsApp)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <span>{SITE.email}</span>
            </div>
          </div>

          <div className="pt-1">
            <a
              href={waLink(WA_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-accent-wa text-dark font-headline font-black text-xs uppercase px-4 py-3.5 rounded-xl border-2 border-white/20 shadow-[3px_3px_0px_#1D4ED8] hover:bg-white transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-dark text-transparent" />
              <span>CHAT KONSULTASI WA RESMI</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative border-t border-white/10 py-6 px-4 md:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
        <div>
          &copy; {new Date().getFullYear()} {SITE.legalName.toUpperCase()}. ALL RIGHTS RESERVED.
        </div>

        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-brand-300 transition-colors font-bold uppercase text-[11px]"
        >
          <span>KEMBALI KE ATAS</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
