import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { DELIVERABLES, PILLARS, REASONS, STATS, type Pilar } from "./pilars-data";

const PILAR_LABELS = PILLARS.map((p) => p.short);

/* ------------------------------------------------------------------ */
/* Marquee ticker                                                      */
/* ------------------------------------------------------------------ */
export function Ticker({
  items,
  tone = "dark",
}: {
  items: string[];
  tone?: "dark" | "light" | "blue";
}) {
  const shell =
    tone === "blue"
      ? "bg-brand-700 text-white border-b-2 border-brand-900"
      : tone === "light"
        ? "bg-white text-dark border-b-2 border-dark"
        : "bg-dark text-accent-yellow border-b-2 border-dark";

  const sep = tone === "blue" ? "text-brand-300" : "text-orange";

  return (
    <div className={`${shell} py-2 overflow-hidden`}>
      <div className="flex whitespace-nowrap font-headline font-black text-xs uppercase tracking-widest animate-marquee">
        {[0, 1].map((dup) => (
          <React.Fragment key={dup}>
            {items.map((item, i) => (
              <span key={`${dup}-${i}`} className="mx-5">
                <span className={sep}>&bull;</span> {item}
              </span>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pilar artwork (brand asset: phone silhouette + illustration)        */
/* ------------------------------------------------------------------ */
export function PilarArt({
  p,
  artWidth = "62%",
  showPhone = true,
}: {
  p: Pilar;
  artWidth?: string;
  showPhone?: boolean;
}) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {showPhone && (
        <div className="absolute right-[-10%] bottom-[-8%] w-[62%] max-w-[280px] aspect-[426/742] opacity-90 pointer-events-none">
          <Image src={p.bg} alt="" fill className="object-contain" />
        </div>
      )}
      <div
        className="relative z-10 drop-shadow-[0_24px_32px_rgba(0,0,0,0.35)]"
        style={{ width: artWidth }}
      >
        <Image
          src={p.img}
          alt={`${p.title} illustration`}
          width={335}
          height={238}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sticker-style artwork (illustration + white outline, no color clash)*/
/* ------------------------------------------------------------------ */
export function StickerArt({
  p,
  className = "w-[62%]",
}: {
  p: Pilar;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={p.img}
        alt={`${p.title} illustration`}
        width={335}
        height={238}
        className="w-full h-auto"
        style={{
          filter:
            "drop-shadow(0 0 5px rgba(255,255,255,0.9)) drop-shadow(0 0 14px rgba(255,255,255,0.55)) drop-shadow(0 18px 22px rgba(0,0,0,0.45))",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sticker badge (outlined S1 / S2 / S3 / S4)                          */
/* ------------------------------------------------------------------ */
export function Sticker({
  text,
  className = "text-6xl sm:text-7xl",
  stroke = 2.5,
}: {
  text: string;
  className?: string;
  stroke?: number;
}) {
  return (
    <span
      className={`font-display font-black leading-none text-white select-none ${className}`}
      style={{ WebkitTextStroke: `${stroke}px #18181B`, paintOrder: "stroke fill" }}
    >
      {text}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Bullet list                                                         */
/* ------------------------------------------------------------------ */
export function PointList({
  points,
  accent,
  columns = false,
}: {
  points: string[];
  accent: string;
  columns?: boolean;
}) {
  return (
    <div className={columns ? "grid gap-2.5 sm:grid-cols-2" : "space-y-2.5"}>
      {points.map((point, idx) => (
        <div
          key={idx}
          className="flex items-start gap-2.5 text-xs text-zinc-800 font-semibold leading-snug"
        >
          <div
            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border-2 border-dark"
            style={{ backgroundColor: accent }}
          >
            <Check className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />
          </div>
          <span>{point}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stats bar                                                           */
/* ------------------------------------------------------------------ */
export function StatsBar({ tone = "dark" }: { tone?: "dark" | "light" | "blue" }) {
  const shell =
    tone === "blue"
      ? "bg-brand-900 text-white border-brand-950"
      : tone === "light"
        ? "bg-white text-dark border-dark"
        : "bg-dark text-white border-dark";

  const labelTone =
    tone === "blue" ? "text-brand-300" : tone === "light" ? "text-orange" : "text-accent-yellow";

  return (
    <div className={`${shell} rounded-[2rem] border-3 shadow-brutal overflow-hidden`}>
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-x-2 divide-white/10">
        {STATS.map((s) => (
          <div key={s.k} className="p-6 sm:p-8 flex flex-col gap-2">
            <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${labelTone} font-bold`}>
              {s.k}
            </span>
            <span className="font-display font-black text-5xl sm:text-6xl leading-none">{s.v}</span>
            <span className="text-xs text-zinc-400 font-medium leading-snug">{s.d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Deliverable strip                                                   */
/* ------------------------------------------------------------------ */
export function DeliverableStrip({ tone = "light" }: { tone?: "light" | "dark" }) {
  const cardTone =
    tone === "dark"
      ? "bg-ink-raised text-white border-white/10 hover:border-brand-700/60"
      : "bg-white text-dark border-dark hover:-translate-y-1 hover:shadow-brutal";

  const chipTone =
    tone === "dark"
      ? "bg-white/10 border-white/15 text-brand-400"
      : "bg-orange/15 border-dark text-dark group-hover:bg-orange group-hover:text-white";

  const descTone = tone === "dark" ? "text-zinc-500" : "text-zinc-600";

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {DELIVERABLES.map((d) => {
        const Icon = d.icon;
        return (
          <div
            key={d.title}
            className={`group rounded-2xl border-3 p-5 transition-all ${cardTone}`}
          >
            <span
              className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-colors ${chipTone}`}
            >
              <Icon className="w-5 h-5" strokeWidth={2.2} />
            </span>
            <div className="font-display font-black text-base sm:text-lg uppercase tracking-tight mt-4 leading-tight">
              {d.title}
            </div>
            <p className={`text-[11px] font-medium mt-1.5 leading-snug ${descTone}`}>{d.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Reason cards                                                        */
/* ------------------------------------------------------------------ */
export function ReasonCards({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const shell =
    tone === "dark"
      ? "bg-dark text-white border-dark"
      : "bg-white text-dark border-dark shadow-brutal";
  const iconTone =
    tone === "dark"
      ? "bg-white/10 border-white/15 text-accent-yellow"
      : "bg-orange/15 border-dark text-dark";
  const descTone = tone === "dark" ? "text-zinc-400" : "text-zinc-600";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {REASONS.map((r) => {
        const Icon = r.icon;
        return (
          <div key={r.title} className={`rounded-[2rem] border-3 p-7 sm:p-8 flex flex-col ${shell}`}>
            <span
              className={`w-11 h-11 rounded-xl border flex items-center justify-center ${iconTone}`}
            >
              <Icon className="w-5 h-5" strokeWidth={2.2} />
            </span>
            <div className="font-display font-black text-lg sm:text-xl uppercase tracking-tight mt-5 leading-tight">
              {r.title}
            </div>
            <p className={`text-xs font-medium mt-2.5 leading-relaxed ${descTone}`}>{r.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CTA band — poster style penutup (heading "Ambil Paket All")        */
/* ------------------------------------------------------------------ */
export function CtaBand() {
  return (
    <div className="relative bg-ink-soft text-white overflow-hidden border-t-4 border-black">
      {/* dekorasi */}
      <div className="absolute -right-24 -bottom-32 w-[460px] h-[460px] opacity-20 pointer-events-none select-none">
        <svg viewBox="0 0 200 200" className="w-full h-full fill-brand-700">
          <polygon points="100,0 115,65 178,32 142,88 200,100 142,112 178,168 115,135 100,200 85,135 22,168 58,112 0,100 58,88 22,32 85,65" />
        </svg>
      </div>
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, #FFFFFF 0px, #FFFFFF 3px, transparent 3px, transparent 26px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* headline */}
          <div className="lg:col-span-7">
            <span className="inline-block bg-brand-700 text-white px-4 py-1.5 rounded-full font-mono text-[10px] font-black uppercase tracking-[0.2em] border-2 border-white/30 mb-5">
              ✦ Periode Kelulusan 2026-2027
            </span>
            <h3 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter leading-[0.88]">
              Ambil Paket
              <br />
              <span className="text-brand-400">All-In-One</span> untuk
              <br />
              Sekolahmu
            </h3>
            <p className="text-sm text-zinc-400 font-medium mt-5 max-w-lg leading-relaxed">
              Kirim data sekolah, kami susun penawaran per pilar beserta timelines-nya.
            </p>
          </div>

          {/* aksi */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-white/5 border border-white/10 rounded-[1.75rem] p-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-400 font-bold">
                Paket mencakup
              </span>
              <ul className="mt-4 grid grid-cols-2 gap-2.5">
                {PILAR_LABELS.map((l) => (
                  <li key={l} className="flex items-center gap-2 text-[11px] text-zinc-300 font-medium">
                    <span className="w-4 h-4 rounded-full bg-brand-700 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />
                    </span>
                    {l}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="#calculator"
                className="inline-flex items-center justify-center gap-2 bg-orange text-white px-6 py-4 rounded-full font-mono text-xs font-black uppercase tracking-widest border-3 border-black hover:bg-accent-yellow hover:text-dark transition-colors"
              >
                Hitung Estimasi
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#faq"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-6 py-4 rounded-full font-mono text-xs font-black uppercase tracking-widest border-2 border-white/40 hover:bg-white/10 transition-colors"
              >
                Tanya Dulu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
