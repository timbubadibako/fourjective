"use client";

import React from "react";
import { Sparkles } from "lucide-react";

const RUN_ITEMS = [
  "FOURJECTIV ORGANIZING",
  "DO THE BEST FOR THE BEST MOMENT",
  "VIDEO & PHOTOSHOOT SERVICE",
  "YEARBOOK ORGANIZER INDONESIA",
  "MELAYANI SELURUH INDONESIA",
];

export default function RunningText() {
  return (
    <div className="relative w-full bg-dark text-white border-b-4 border-dark overflow-hidden select-none py-2.5">
      <div className="flex w-max will-change-transform animate-marquee">
        {/* Track 1 */}
        <div className="flex items-center gap-8 pr-8 whitespace-nowrap shrink-0">
          {RUN_ITEMS.map((item, idx) => (
            <span key={`a-${idx}`} className="flex items-center gap-8 font-headline text-xs sm:text-sm font-black uppercase tracking-widest">
              <span className="text-white">{item}</span>
              <Sparkles className="w-3.5 h-3.5 text-orange shrink-0 fill-orange" />
            </span>
          ))}
        </div>
        {/* Track 2 (Seamless loop duplicate) */}
        <div className="flex items-center gap-8 pr-8 whitespace-nowrap shrink-0" aria-hidden="true">
          {RUN_ITEMS.map((item, idx) => (
            <span key={`b-${idx}`} className="flex items-center gap-8 font-headline text-xs sm:text-sm font-black uppercase tracking-widest">
              <span className="text-white">{item}</span>
              <Sparkles className="w-3.5 h-3.5 text-orange shrink-0 fill-orange" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
