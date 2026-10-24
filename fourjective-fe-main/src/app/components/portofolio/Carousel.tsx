"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Lock, Eye, MessageCircle, X, Maximize2, Minimize2, ChevronLeft, ChevronRight, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { PageFlip } from "page-flip";
import { waLink } from "@/lib/site";

// 3 Master Dummy Sekolah Ikonik Fourjective dengan cover resmi yang sudah ada di arsip
export interface DummyYearbook {
  id: string;
  namaSekolah: string;
  kota: string;
  tahun: number;
  spec: string;
  tag: string;
  desc: string;
  cover: string;
  pages: string[];
}

export const DUMMY_YEARBOOKS: DummyYearbook[] = [
  {
    id: "mondial-batam-2024",
    namaSekolah: "SMA Mondial Batam",
    kota: "Batam",
    tahun: 2024,
    spec: "HARDCOVER VELVET DOFF",
    tag: "#LUXURY_DOFF",
    desc: "Cover doff velvet tahan gores dengan timbul Spot UV presisi dan foil prismatik.",
    cover: "https://cdn.prod.website-files.com/65d4758de33eca00784c7a5f/67b7de096148969cdc51584b_COVER%20DEPAN%20SMA%20MONDIAL%20BATAM.png",
    pages: [
      "https://cdn.prod.website-files.com/65d4758de33eca00784c7a5f/67b7de096148969cdc51584b_COVER%20DEPAN%20SMA%20MONDIAL%20BATAM.png",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "petra-1-surabaya-2024",
    namaSekolah: "SMAK Petra 1 Surabaya",
    kota: "Surabaya",
    tahun: 2024,
    spec: "RIGID BOX & GOLD FOIL",
    tag: "#GOLD_FOIL",
    desc: "Kemasan rigid box magnetik tebal eksklusif dengan foil emas hot-stamping 24K.",
    cover: "https://cdn.prod.website-files.com/65d4758de33eca00784c7a5f/67b7ddd15a54e7599d258fe3_COVER%20DEPAN%20SMAK%20PETRA%201%20SURABAYA.png",
    pages: [
      "https://cdn.prod.website-files.com/65d4758de33eca00784c7a5f/67b7ddd15a54e7599d258fe3_COVER%20DEPAN%20SMAK%20PETRA%201%20SURABAYA.png",
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "sman-5-makassar-2024",
    namaSekolah: "SMAN 5 Makassar",
    kota: "Makassar",
    tahun: 2024,
    spec: "LINEN THREAD LAYFLAT 180°",
    tag: "#LINEN_COVER",
    desc: "Jilid jahit benang linen murni tebal, dapat dibuka rata 180 derajat tanpa takut rontok.",
    cover: "https://cdn.prod.website-files.com/65d4758de33eca00784c7a5f/67b7de043c61e4ee38d5bdde_COVER%20DEPAN%20SMAN%205%20MAKASSAR%201.png",
    pages: [
      "https://cdn.prod.website-files.com/65d4758de33eca00784c7a5f/67b7de043c61e4ee38d5bdde_COVER%20DEPAN%20SMAN%205%20MAKASSAR%201.png",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80",
    ],
  },
];

export default function Carousel({
  searchQuery = "",
}: {
  searchQuery?: string;
  currentPage?: number;
  setCurrentPage?: (p: number) => void;
  portfolios?: any;
}) {
  const [selectedBook, setSelectedBook] = useState<DummyYearbook | null>(null);
  const [showGateModal, setShowGateModal] = useState<boolean>(false);
  const [targetBook, setTargetBook] = useState<DummyYearbook | null>(null);
  const [tokenInput, setTokenInput] = useState<string>("");
  const [tokenError, setTokenError] = useState<string>("");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(0);

  const pageFlipRef = useRef<PageFlip | null>(null);

  // Filter 3 buku dummy
  const filtered = DUMMY_YEARBOOKS.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.namaSekolah.toLowerCase().includes(q) ||
      b.kota.toLowerCase().includes(q) ||
      b.spec.toLowerCase().includes(q)
    );
  });

  const handleBookClick = (book: DummyYearbook) => {
    setTargetBook(book);
    setShowGateModal(true);
    setTokenInput("");
    setTokenError("");
  };

  const handleVerifyToken = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = tokenInput.trim().toUpperCase();

    // Verifikasi: jika token GUEST, kode sekolah, atau 'FOURJECTIVE'/'2026'
    if (
      clean === "GUEST-2026" ||
      clean === "FOURJECTIVE" ||
      clean === "2026" ||
      clean.startsWith("GUEST") ||
      clean.includes("2026")
    ) {
      if (targetBook) {
        setSelectedBook(targetBook);
      }
      setShowGateModal(false);
      setTokenError("");
    } else {
      setTokenError("Kode akses tidak valid atau belum terdaftar. Silakan minta kode ke Admin.");
    }
  };

  const generateWhatsAppLink = (schoolName: string) => {
    const text = `Halo Admin Fourjective! Saya ingin meminta Kode Akses Tamu (Guest Token) untuk membuka Digital Yearbook *${schoolName}* di website. Terima kasih!`;
    return waLink(text);
  };

  // Flipbook Engine Setup
  useEffect(() => {
    if (!selectedBook) return;

    const timer = setTimeout(() => {
      const bookEl = document.getElementById("virtual-flipbook-container");
      if (!bookEl) return;

      if (pageFlipRef.current) {
        try {
          pageFlipRef.current.destroy();
        } catch (e) {}
      }

      try {
        const isMobile = window.innerWidth < 768;
        const pf = new (PageFlip as any)(bookEl, {
          width: isMobile ? 320 : 450,
          height: isMobile ? 460 : 600,
          size: "stretch",
          minWidth: 280,
          maxWidth: 600,
          minHeight: 400,
          maxHeight: 800,
          showCover: true,
          drawShadow: true,
          flippingTime: 700,
          usePortrait: isMobile,
          startPage: 0,
        });

        pf.loadFromHTML(bookEl.querySelectorAll(".flip-page"));
        pageFlipRef.current = pf;

        pf.on("flip", (e: any) => {
          setPageIndex(Number(e.data) || 0);
        });
      } catch (err) {
        console.error("Flipbook init error:", err);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [selectedBook]);

  return (
    <div className="w-full">
      {/* ===== 3 KARTU SAMPUL BUKU TAHUNAN ARSIP ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {filtered.map((item, idx) => (
          <article
            key={item.id}
            onClick={() => handleBookClick(item)}
            className="group relative bg-[#FFFDF9] border-3 sm:border-4 border-dark rounded-2xl overflow-hidden shadow-[6px_7px_0px_#14161C] hover:shadow-[9px_10px_0px_#FF4D00] hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            {/* Top Bar Spec */}
            <div className="bg-[#FAF6F0] px-4 py-2.5 border-b-3 border-dark flex items-center justify-between font-mono text-[11px] font-bold">
              <span className="text-dark/70 uppercase tracking-wider">{item.spec}</span>
              <span className="text-orange font-black">0{idx + 1}</span>
            </div>

            {/* Stage Sampul Buku */}
            <div className="relative aspect-[3/4] w-full bg-[#1A1C23] overflow-hidden flex items-center justify-center p-6 sm:p-7">
              {/* Badge Terkunci (Watermark di pojok) */}
              <div className="absolute top-3.5 right-3.5 z-20 bg-dark/90 backdrop-blur-md text-white border-2 border-white/20 px-2.5 py-1 rounded-md flex items-center gap-1.5 font-mono text-[10px] font-bold">
                <Lock className="w-3 h-3 text-orange stroke-[3]" />
                <span>TERKUNCI</span>
              </div>

              {/* Cover Image */}
              <div className="relative w-full h-full shadow-[0px_10px_25px_rgba(0,0,0,0.6)] rounded-sm overflow-hidden group-hover:scale-[1.03] transition-transform duration-300">
                <Image
                  src={item.cover}
                  alt={item.namaSekolah}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* Hover Overlay: Intip Isi Buku */}
              <div className="absolute inset-0 bg-dark/70 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity duration-200 flex flex-col items-center justify-center gap-3 p-4 text-center z-10">
                <div className="w-12 h-12 rounded-xl bg-orange text-white flex items-center justify-center border-2 border-dark shadow-[3px_3px_0px_#18181B]">
                  <Lock className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <span className="font-headline font-black text-sm text-white uppercase tracking-wider block">
                    Buka Lembaran Buku
                  </span>
                  <span className="font-mono text-[10px] text-white/70 block mt-0.5">
                    Memerlukan Kode Tamu / Angkatan
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Metadata */}
            <div className="p-5 bg-white border-t-3 border-dark flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider text-orange">
                    {item.kota} • {item.tahun}
                  </span>
                </div>
                <h3 className="font-headline font-black text-xl text-dark leading-tight group-hover:text-orange transition-colors">
                  {item.namaSekolah}
                </h3>
                <p className="font-sans text-xs text-dark/70 font-medium leading-relaxed mt-2">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t-2 border-dark/10 flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-dark/60 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-orange" />
                  <span>5 Lembar Preview</span>
                </span>
                <span className="text-dark group-hover:text-orange inline-flex items-center gap-1 font-black">
                  <span>Buka E-Book</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ===== MODAL GERBANG SANDI / MINTA AKSES TAMU ===== */}
      {showGateModal && targetBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/85 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#FAF6F0] border-4 border-dark rounded-2xl shadow-[10px_10px_0px_#14161C] p-6 sm:p-8 text-dark overflow-hidden">
            {/* Header Modal */}
            <div className="flex items-start justify-between gap-4 border-b-3 border-dark pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange text-white flex items-center justify-center border-2 border-dark shadow-[2px_2px_0px_#000] shrink-0">
                  <Lock className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider text-orange">
                    PORTAL DIGITAL YEARBOOK
                  </span>
                  <h3 className="font-headline font-black text-lg sm:text-xl text-dark leading-tight">
                    {targetBook.namaSekolah}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setShowGateModal(false)}
                className="p-1.5 rounded-lg border-2 border-dark hover:bg-dark hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            {/* Info Keterangan */}
            <div className="py-5">
              <p className="text-xs sm:text-sm text-dark/80 font-medium leading-relaxed">
                Dokumen lembaran buku tahunan sekolah ini bersifat privat untuk siswa angkatan dan tamu berizin resmi Fourjective.
              </p>

              {/* JALUR 1: SUDAH PUNYA KODE */}
              <form onSubmit={handleVerifyToken} className="mt-5 space-y-3">
                <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-dark/70">
                  Punya Kode Tamu / Kode Angkatan?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    placeholder="Contoh: GUEST-2026 atau FOURJECTIVE"
                    className="flex-1 bg-white border-2 sm:border-3 border-dark rounded-xl px-3.5 py-2.5 font-mono text-xs uppercase font-bold text-dark focus:outline-none focus:border-orange placeholder:text-dark/30 placeholder:normal-case"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="bg-dark hover:bg-orange text-white font-mono text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-xl border-2 sm:border-3 border-dark transition-colors cursor-pointer"
                  >
                    Buka
                  </button>
                </div>

                {tokenError && (
                  <p className="font-mono text-[11px] text-red-600 font-bold mt-1">
                    {tokenError}
                  </p>
                )}
              </form>

              {/* SEPARATOR */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-dark/15"></div>
                </div>
                <span className="relative bg-[#FAF6F0] px-3 font-mono text-[10px] font-bold text-dark/50 uppercase">
                  Atau Belum Punya Akses?
                </span>
              </div>

              {/* JALUR 2: MINTA KODE AKSES VIA WHATSAPP */}
              <div className="bg-white border-2 sm:border-3 border-dark rounded-xl p-4 shadow-[4px_4px_0px_#14161C]">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider text-dark">
                    Akses Tamu Gratis untuk Panitia Siswa / OSIS
                  </span>
                </div>
                <p className="font-sans text-xs text-dark/70 leading-relaxed mb-4">
                  Dapatkan kode tamu untuk membuka 1 e-book contoh, cek estimasi harga, atau mengajukan sampel buku fisik ke sekolahmu.
                </p>

                <a
                  href={generateWhatsAppLink(targetBook.namaSekolah)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-dark font-headline font-black text-xs uppercase tracking-wider py-3 px-4 rounded-xl border-2 border-dark shadow-[3px_3px_0px_#18181B] hover:shadow-[1px_1px_0px_#18181B] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-dark stroke-none" />
                  <span>Minta Kode Tamu via WhatsApp Admin</span>
                </a>
              </div>
            </div>

            <div className="border-t-2 border-dark/10 pt-3 flex items-center justify-between text-[10px] font-mono text-dark/50 font-bold">
              <span>PT Fourjective Studio Indonesia</span>
              <span>Kuningan, Jawa Barat</span>
            </div>
          </div>
        </div>
      )}

      {/* ===== VIRTUAL FLIPBOOK VIEWER MODAL (JIKA TOKEN BERHASIL) ===== */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/95 backdrop-blur-md p-4 animate-in fade-in duration-200">
          {/* Top Control Bar */}
          <div className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between text-white">
            <div className="flex items-center gap-2 bg-dark/80 border border-white/20 px-3.5 py-1.5 rounded-xl backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-mono text-xs font-bold">{selectedBook.namaSekolah}</span>
              <span className="text-white/40">|</span>
              <span className="font-mono text-[10px] text-orange uppercase font-bold">Akses Tamu Terbuka</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  try {
                    pageFlipRef.current?.destroy();
                  } catch (e) {}
                  setSelectedBook(null);
                }}
                className="bg-orange hover:bg-orange/90 text-white font-mono text-xs font-black uppercase px-3.5 py-1.5 rounded-xl border-2 border-white/20 transition-colors cursor-pointer"
              >
                Tutup Reader
              </button>
            </div>
          </div>

          {/* Flipbook Container */}
          <div className="relative max-h-[85vh] w-full max-w-4xl flex items-center justify-center pt-10">
            {/* Prev Button */}
            <button
              onClick={() => {
                try {
                  pageFlipRef.current?.flipPrev();
                } catch (e) {}
              }}
              className="absolute left-2 sm:left-4 z-40 w-10 h-10 rounded-full bg-white text-dark border-2 border-dark shadow-[2px_2px_0px_#000] flex items-center justify-center hover:bg-orange hover:text-white transition-colors cursor-pointer"
              title="Halaman Sebelumnya"
            >
              <ChevronLeft className="w-5 h-5 stroke-[3]" />
            </button>

            {/* The Actual HTML Book */}
            <div id="virtual-flipbook-container" className="shadow-2xl">
              {selectedBook.pages.map((imgUrl, i) => (
                <div key={i} className="flip-page bg-white overflow-hidden" data-density={i === 0 ? "hard" : "soft"}>
                  <div className="relative w-full h-full">
                    <img
                      src={imgUrl}
                      alt={`Halaman ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-dark/80 text-white font-mono text-[9px] px-2 py-0.5 rounded">
                      Hal. {i + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => {
                try {
                  pageFlipRef.current?.flipNext();
                } catch (e) {}
              }}
              className="absolute right-2 sm:right-4 z-40 w-10 h-10 rounded-full bg-white text-dark border-2 border-dark shadow-[2px_2px_0px_#000] flex items-center justify-center hover:bg-orange hover:text-white transition-colors cursor-pointer"
              title="Halaman Berikutnya"
            >
              <ChevronRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>

          {/* Bottom Navigation Hint */}
          <div className="absolute bottom-4 left-0 right-0 text-center font-mono text-xs text-white/60">
            Klik tepi halaman atau gunakan tombol panah untuk membalik lembaran virtual
          </div>
        </div>
      )}
    </div>
  );
}
