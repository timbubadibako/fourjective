"use client";

import React from "react";
import { MessageCircle, Sparkles } from "lucide-react";
import FaqAccordion from "@/components/site/FaqAccordion";
import { WA_MESSAGES, waLink } from "@/lib/site";

export default function FaqV3() {
  return (
    <section
      id="faq"
      className="relative w-full bg-brand-950 text-white overflow-hidden select-none border-b-4 border-dark"
    >
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="absolute -left-24 top-1/3 w-[420px] h-[420px] bg-brand-700/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* STICKY HEADER */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <span className="inline-flex items-center gap-2 bg-black/50 border border-white/20 text-brand-300 font-mono text-xs font-black px-4 py-1.5 rounded-full uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Tanya Jawab Krusial
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tighter mt-4 leading-[0.92]">
                Semua Hal Yang Sering{" "}
                <span className="text-brand-300 block">Ditanyakan</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 mt-4 font-medium max-w-sm leading-relaxed">
                Transparan sejak awal mengenai kontrak, garansi ganti rugi, hingga proteksi data siswa
                angkatan Anda.
              </p>

              {/* CTA card */}
              <div className="mt-8 bg-black border-2 border-white/15 rounded-2xl p-5 max-w-sm">
                <div className="font-headline font-bold text-sm uppercase tracking-wide text-white">
                  Masih ada yang mengganjal?
                </div>
                <p className="text-xs text-zinc-400 font-medium mt-1.5 leading-relaxed">
                  Konsultasi 15 menit, tanpa biaya. Jawabannya langsung dari tim yang menangani angkatanmu.
                </p>
                <a
                  href={waLink(WA_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 bg-accent-wa text-dark font-headline font-black text-xs uppercase px-5 py-3 rounded-xl border-2 border-white/20 hover:bg-white transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-dark text-transparent" />
                  <span>Tanya Langsung</span>
                </a>
              </div>
            </div>
          </div>
          {/* ACCORDION */}
          <div className="lg:col-span-7">
            <FaqAccordion />
          </div>
        </div>
      </div>
    </section>
  );
}
