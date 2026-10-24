"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Header from "@/components/landing/header-pill-v2";
import Footer from "@/components/landing/footer-v4";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  ChevronLeft,
  ChevronRight,
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
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const filtered = filter === "all" ? TESTIMONIALS : TESTIMONIALS.filter((t) => t.category === filter);

  /* Geser track ke index kartu tertentu */
  const scrollToIdx = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[i] as HTMLElement | undefined;
    if (child) track.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
  };

  /* Deteksi kartu terdekat saat track digulir (swipe) */
  const onTrackScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    let best = 0;
    let bestDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const dist = Math.abs(el.offsetLeft - track.scrollLeft);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActiveIdx(best);
  };

  /* Ganti kategori: reset scroll ke kartu pertama */
  const changeFilter = (key: "all" | "photoshoot" | "cetak" | "pelayanan") => {
    setFilter(key);
    setActiveIdx(0);
    requestAnimationFrame(() => {
      trackRef.current?.scrollTo({ left: 0, behavior: "auto" });
    });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    /* Lenis smooth-scroll sinkron ticker GSAP */
    const lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onLenisScroll);
    const rafId = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(rafId);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          "#tsti-masthead h1",
          { y: 70, opacity: 0, rotate: 1.5 },
          { y: 0, opacity: 1, rotate: 0, duration: 0.85 }
        )
        .fromTo(
          "#tsti-masthead p",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        );

      gsap.fromTo(
        "#tsti-track [data-tsti-card]",
        { x: 70, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: "#tsti-track", start: "top 88%" },
        }
      );

      gsap.fromTo(
        "#tsti-cta",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: "#tsti-cta", start: "top 85%" },
        }
      );
    });

    return () => {
      ctx.revert();
      gsap.ticker.remove(rafId);
      lenis.off("scroll", onLenisScroll);
      lenis.destroy();
    };
  }, []);

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
        <div id="tsti-masthead" className="max-w-7xl mx-auto px-4 sm:px-8">
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
                onClick={() => changeFilter(tab.key as "all" | "photoshoot" | "cetak" | "pelayanan")}
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

        {/* ===== TESTIMONIALS CAROUSEL ===== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-16 sm:pb-24">
          {/* Track: scroll-snap horizontal (swipe native di mobile) */}
          <div
            id="tsti-track"
            ref={trackRef}
            onScroll={onTrackScroll}
            className="relative flex gap-5 overflow-x-auto snap-x snap-mandatory pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {filtered.map((t) => (
              <article
                key={t.id}
                data-tsti-card
                className="w-[calc(100vw-2.25rem)] sm:w-[440px] lg:w-[460px] shrink-0 snap-start bg-white border-3 border-dark rounded-xl p-6 sm:p-7 flex flex-col justify-between shadow-[6px_8px_0px_#14161C] transition-all"
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

                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(t.rating)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-orange text-orange" />
                    ))}
                  </div>

                  <Quote className="w-8 h-8 text-orange/30 mb-2 -ml-1" />

                  <p className="font-sans text-xs sm:text-sm text-dark/85 leading-relaxed font-medium">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="mt-4 pt-3 border-t border-dark/15 flex items-start gap-1.5 text-emerald-700 font-mono text-[10px] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-px" />
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
              </article>
            ))}
          </div>

          {/* Kontrol: dots indikator + panah prev/next */}
          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              {filtered.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Ke ulasan ${i + 1}`}
                  onClick={() => scrollToIdx(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === activeIdx
                      ? "w-6 bg-orange"
                      : "w-3 bg-dark/15 hover:bg-dark/30"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Ulasan sebelumnya"
                onClick={() => scrollToIdx(activeIdx - 1)}
                disabled={activeIdx === 0}
                className="w-11 h-11 rounded-xl bg-white text-dark border-3 border-dark shadow-[3px_3px_0px_#14161C] hover:shadow-[1px_1px_0px_#14161C] hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-orange hover:text-[#FAF6F0] transition-all items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-dark disabled:hover:shadow-[3px_3px_0px_#14161C] disabled:hover:translate-x-0 disabled:hover:translate-y-0 hidden sm:flex"
              >
                <ChevronLeft className="w-6 h-6 stroke-[3]" />
              </button>
              <button
                type="button"
                aria-label="Ulasan berikutnya"
                onClick={() => scrollToIdx(activeIdx + 1)}
                disabled={activeIdx >= filtered.length - 1}
                className="w-11 h-11 rounded-xl bg-white text-dark border-3 border-dark shadow-[3px_3px_0px_#14161C] hover:shadow-[1px_1px_0px_#14161C] hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-orange hover:text-[#FAF6F0] transition-all items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-dark disabled:hover:shadow-[3px_3px_0px_#14161C] disabled:hover:translate-x-0 disabled:hover:translate-y-0 flex"
              >
                <ChevronRight className="w-6 h-6 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>

        {/* ===== BOTTOM CTA ===== */}
        <div id="tsti-cta" className="border-t-[3px] border-dark bg-dark text-white">
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
