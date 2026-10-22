"use client";

import React, { useEffect, useRef, useState } from "react";
import { Plus, MessageCircle, ArrowUpRight } from "lucide-react";
import { FAQ_ITEMS } from "@/data/faq";
import { WA_MESSAGES, waLink } from "@/lib/site";

/* ============ SATU KARTU FAQ ============
   White card + border brutal; saat terbuka:
   border orange, nomor jadi chip oranye, plus berubah X.
   Animasi buka/tutup smooth murni CSS (grid-template-rows 0fr -> 1fr). */
function FaqCard({
  index,
  isOpen,
  onToggle,
}: {
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const faq = FAQ_ITEMS[index];
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      data-faq-card
      className={`bg-white border-3 rounded-lg transition-all duration-300 ${
        isOpen
          ? "border-orange shadow-[5px_6px_0px_#FF4D00]"
          : "border-dark shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center gap-4 sm:gap-5 p-4 sm:p-5 text-left cursor-pointer group select-none"
      >
        {/* Nomor: teks oranye saat tertutup, chip oranye saat terbuka */}
        <span
          className={`shrink-0 font-mono text-xs sm:text-sm font-black flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "w-9 h-9 sm:w-10 sm:h-10 bg-orange text-white border-2 border-dark shadow-[2px_3px_0px_#14161C]"
              : "w-8 text-orange group-hover:w-9 group-hover:sm:w-10 group-hover:h-9 group-hover:sm:h-10"
          }`}
          style={
            isOpen
              ? undefined
              : {
                  clipPath:
                    "polygon(0 0, 100% 0, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0 100%)",
                }
          }
        >
          {num}
        </span>

        <div className="flex-1 min-w-0">
          <span className="block font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.18em] uppercase text-dark/45 mb-0.5">
            {faq.category}
          </span>
          <h3
            className={`font-sans font-bold text-sm sm:text-base md:text-lg leading-snug transition-colors ${
              isOpen ? "text-dark" : "text-dark/90 group-hover:text-orange"
            }`}
          >
            {faq.question}
          </h3>
        </div>

        {/* Toggle: kotak cut-corner; terbuka = X berputar, berubah jadi dark ink */}
        <span
          className={`shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border-3 transition-all duration-300 ${
            isOpen
              ? "bg-dark border-dark text-white rotate-[135deg]"
              : "bg-paper border-dark text-dark group-hover:bg-dark group-hover:text-white"
          }`}
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 100% calc(100% - 9px), calc(100% - 9px) 100%, 0 100%)",
          }}
        >
          <Plus className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={3} />
        </span>
      </button>

      {/* Jawaban: animasi tinggi via grid rows, TANPA GSAP */}
      <div
        className="grid transition-[grid-template-rows] duration-500"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        aria-hidden={!isOpen}
      >
        <div className="overflow-hidden min-h-0">
          <div className="px-4 sm:px-5 pb-4 sm:pb-5">
            <div className="border-t-3 border-dashed border-dark/10 pt-4 pl-0 sm:pl-2">
              {faq.answerContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FaqV4() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  /* Entrance halus: header & kartu fade-up sekali saat masuk viewport.
     Murni enhancement — kalau GSAP CDN belum siap, konten tetap terlihat. */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let timer: ReturnType<typeof setInterval> | undefined;
    let cancelled = false;

    const build = () => {
      const w = window as unknown as {
        gsap?: {
          registerPlugin: (...plugins: unknown[]) => void;
          fromTo: (
            target: unknown,
            fromVars: Record<string, unknown>,
            toVars: Record<string, unknown>
          ) => unknown;
        };
        ScrollTrigger?: unknown;
      };
      if (!w.gsap || !w.ScrollTrigger) return false;

      w.gsap.registerPlugin(w.ScrollTrigger);
      const targets = section.querySelectorAll("[data-faq-card], [data-faq-side]");

      w.gsap.fromTo(
        Array.from(targets).reverse(),
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.07,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
            invalidateOnRefresh: true,
          },
        }
      );
      return true;
    };

    if (!build()) {
      timer = setInterval(() => {
        if (cancelled || build()) {
          if (timer) clearInterval(timer);
        }
      }, 60);
    }

    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative w-full bg-[#FAF6F0] text-dark overflow-hidden select-none border-b-4 border-dark py-16 sm:py-24 px-4 sm:px-8"
      style={{
        backgroundImage:
          "linear-gradient(rgba(24, 24, 27, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(24, 24, 27, 0.035) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      {/* Sunburst ghost oranye */}
      <div
        className="absolute -left-24 -bottom-24 w-[380px] h-[380px] opacity-10 pointer-events-none"
        aria-hidden
      >
        <svg viewBox="0 0 200 200" className="w-full h-full fill-orange">
          <polygon points="100,0 115,65 178,32 142,88 200,100 142,112 178,168 115,135 100,200 85,135 22,168 58,112 0,100 58,88 22,32 85,65" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-14">
        {/* ============ KOLOM KIRI: ALIGN TOP (HEADER) & BOTTOM (CTA) ============ */}
        <div data-faq-side className="flex flex-col justify-between h-full">
          {/* Sisi Atas: Badge, Heading, Deskripsi, Chips */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="inline-flex items-center gap-2 bg-dark text-white font-mono text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded border-2 border-dark shadow-[2px_3px_0px_#FF4D00] mb-6">
                ★ FAQ · 2 MENIT BACA
              </span>

              <h2 className="font-playtimes text-4xl sm:text-5xl md:text-6xl text-dark leading-[1.02]">
                Pertanyaan Penting,
                <br />
                <span className="text-orange">Jawaban Terbuka.</span>
              </h2>

              <p className="font-sans text-xs sm:text-sm text-dark/70 mt-4 font-medium max-w-sm leading-relaxed">
                Transparan sejak awal: alur termin, garansi tepat waktu sebelum
                wisuda, hingga keamanan privasi foto siswa.
              </p>
            </div>

            {/* Chips kategori */}
            <div className="flex flex-wrap gap-2">
              {FAQ_ITEMS.map((faq) => (
                <span
                  key={faq.id}
                  className="px-2.5 py-1 rounded bg-white border-2 border-dark/15 font-mono text-[9px] font-bold uppercase tracking-wider text-dark/60"
                >
                  {faq.category}
                </span>
              ))}
            </div>
          </div>

          {/* Sisi Bawah: CTA kartu gelap pinned to bottom */}
          <div className="pt-8 lg:pt-10">
            <a
              href={waLink(WA_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-dark text-white border-4 border-dark rounded-xl px-6 py-6 shadow-[8px_10px_0px_#FF4D00] hover:shadow-[5px_6px_0px_#FF4D00] hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              <span className="inline-flex items-center gap-1.5 bg-orange text-white font-mono text-[9px] font-black tracking-[0.2em] uppercase px-2.5 py-1 rounded border-2 border-white/25 mb-4">
                RESPONS &lt; 24 JAM
              </span>
              <h3 className="font-playtimes text-2xl sm:text-3xl leading-[1.05] mb-5">
                Masih Bingung,
                <br />
                <span className="text-orange">Langsung Tanya Aja.</span>
              </h3>
              <span className="inline-flex items-center gap-2.5 bg-orange text-white font-mono font-black text-xs uppercase tracking-wider px-5 py-3 rounded-lg border-3 border-white/25 shadow-[4px_4px_0px_rgba(255,255,255,0.25)] group-hover:scale-105 transition-transform">
                <MessageCircle className="w-4 h-4" />
                <span>KONSULTASI VIA WA</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>
          </div>
        </div>

        {/* ============ KOLOM KANAN: ACCORDION BRUTALIS ============ */}
        <div className="flex flex-col gap-4 sm:gap-5">
          {FAQ_ITEMS.map((_, i) => (
            <FaqCard
              key={FAQ_ITEMS[i].id}
              index={i}
              isOpen={openIndex === i}
              onToggle={() =>
                setOpenIndex((prev) => (prev === i ? null : i))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
