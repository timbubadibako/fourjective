import React from "react";
import Image from "next/image";
import { type WorkItem } from "@/data/works";

const TONE: Record<WorkItem["tone"], string> = {
  blue: "bg-orange text-white",
  navy: "bg-dark text-white",
  sky: "bg-white text-dark",
  light: "bg-orange/20 text-dark",
};

/**
 * Kartu karya bergaya "sharp poster" — dipakai oleh landing (#portfolio)
 * dan halaman /portofolio agar tampilan identik.
 *
 * `hideSchool` (dipakai landing): nama sekolah tidak ditampilkan —
 * headline kartu diganti konsep visual (dari tag, mis. Y2K CYBER).
 */
export default function WorkCard({
  item,
  hideSchool = false,
}: {
  item: WorkItem;
  hideSchool?: boolean;
}) {
  const isSchoolCard = /\b(sm\w+|smp|man)\b/i.test(item.title);
  const showConceptInstead = hideSchool && isSchoolCard;
  const conceptTitle = (item.tag || "").replace(/^#/, "").replace(/_/g, " ");

  return (
    <article className="group relative bg-white border-3 border-dark shadow-brutal hover:-translate-y-1.5 hover:shadow-brutal-lg transition-all duration-300">
      {/* Image block with cut bottom-right corner */}
      <div
        className={`relative ${item.aspect} overflow-hidden border-b-3 border-dark bg-dark`}
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 26px), calc(100% - 26px) 100%, 0 100%)",
        }}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />
        <span className="absolute bottom-0 left-3 font-display font-black text-[64px] leading-none text-white/85 tracking-tighter pointer-events-none">
          {item.index}
        </span>

        <span
          className={`absolute top-0 right-0 px-2.5 py-1.5 font-mono text-[10px] font-black uppercase border-b-3 border-l-3 border-dark ${TONE[item.tone]}`}
        >
          {item.spec}
        </span>
      </div>

      {/* Sticker (di luar frame ter-clip supaya tidak terpotong) */}
      {item.sticker && (
        <div className="absolute -top-4 -left-3 w-16 pointer-events-none z-30 sticker-bob-a filter drop-shadow-md">
          <Image src={item.sticker} alt="Sticker" width={64} height={64} className="w-full h-auto" />
        </div>
      )}

      {/* Meta + Title */}
      <div className="p-4 pt-5 flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] font-black text-orange uppercase tracking-wider">
            {item.place}
          </span>
          <span className="font-mono text-[10px] font-bold text-zinc-400">{item.tag}</span>
        </div>
        <h3 className="font-display font-black text-xl uppercase tracking-tight text-dark leading-tight">
          {showConceptInstead ? conceptTitle : item.title}
        </h3>
        <p className="text-xs text-zinc-500 font-medium leading-snug">{item.desc}</p>
      </div>
    </article>
  );
}
