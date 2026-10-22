"use client";

import React from "react";
import { Sparkles } from "lucide-react";

const RUN_ITEMS = [
  "FOURJECTIVE ORGANIZING",
  "KAWALAN HARI-H",
  "HARI FOTO ANGKATAN",
  "AFTERMOVIE WISUDA 4K",
  "FORMASI DRONE RATUSAN SISWA",
  "TERMASUK SEMUA PAKET",
];

export default function RunningText() {
  const run = Array.from({ length: 8 }).flatMap(() => RUN_ITEMS);

  return (
    <div className="relative w-full bg-dark text-white border-b-4 border-dark overflow-hidden select-none py-2.5">
      <div className="marquee-track flex items-center gap-6 whitespace-nowrap will-change-transform">
        {run.map((item, idx) => (
          <span key={idx} className="flex items-center gap-6 font-headline text-xs sm:text-sm font-black uppercase tracking-widest">
            <span className="text-white">{item}</span>
            <Sparkles className="w-3.5 h-3.5 text-orange shrink-0 fill-orange" />
          </span>
        ))}
      </div>
    </div>
  );
}
