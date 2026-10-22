import React from "react";

/* ==================================================================
 * POSTER PRIMITIVES
 * Bahasa visual "Retro Poster" versi biru yang dipakai di seluruh
 * halaman (landing + sub-page). Semua warna memakai design token.
 * ================================================================== */

export type Tone = "paper" | "dark" | "blue" | "navy";

/* ------------------------------------------------------------------ */
/* Texture overlays                                                     */
/* ------------------------------------------------------------------ */
export function GridTexture({
  className = "",
  dark = false,
  size = 32,
}: {
  className?: string;
  dark?: boolean;
  size?: number;
}) {
  const line = dark ? "rgba(255,255,255,1)" : "rgba(24,24,27,1)";
  return (
    <div
      aria-hidden
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
        opacity: dark ? 0.07 : 0.04,
      }}
    />
  );
}

export function DiagonalStripes({
  className = "",
  from = "#1D4ED8",
  to = "#0B0C0F",
  width = 10,
  gap = 22,
}: {
  className?: string;
  from?: string;
  to?: string;
  width?: number;
  gap?: number;
}) {
  return (
    <div
      aria-hidden
      className={`absolute inset-x-0 top-0 h-2 pointer-events-none ${className}`}
      style={{
        backgroundImage: `repeating-linear-gradient(115deg, ${from} 0px, ${from} ${width}px, ${to} ${width}px, ${to} ${gap}px)`,
      }}
    />
  );
}

export function Sunburst({
  className = "",
  opacity = 0.07,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className={`absolute pointer-events-none select-none ${className}`}
      style={{ opacity }}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full fill-white">
        <polygon points="100,0 115,65 178,32 142,88 200,100 142,112 178,168 115,135 100,200 85,135 22,168 58,112 0,100 58,88 22,32 85,65" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Typography lockups                                                   */
/* ------------------------------------------------------------------ */
export function Eyebrow({
  children,
  tone = "dark",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const shell =
    tone === "light"
      ? "bg-black/50 border border-white/20 text-brand-300"
      : "bg-dark text-brand-300 border-2 border-dark shadow-sm";
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full ${shell} ${className}`}
    >
      {children}
    </span>
  );
}

/** Headline raksasa dengan outline-stroke, gaya poster lama yang diseragamkan. */
export function StrokeHeading({
  children,
  className = "",
  stroke = "6px",
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  stroke?: string;
  tone?: "light" | "dark";
}) {
  const fill = tone === "light" ? "text-white" : "text-dark";
  return (
    <span
      className={`font-display font-black uppercase tracking-tight leading-[0.9] ${fill} ${className}`}
      style={{ WebkitTextStroke: stroke, paintOrder: "stroke fill" }}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Section shells                                                       */
/* ------------------------------------------------------------------ */
const SECTION_TONE: Record<Tone, string> = {
  paper: "bg-paper text-dark border-b-4 border-dark",
  dark: "bg-ink-soft text-white border-b-4 border-dark",
  blue: "bg-brand-700 text-white border-b-4 border-dark",
  navy: "bg-brand-950 text-white border-b-4 border-dark",
};

export function SectionShell({
  id,
  tone = "paper",
  className = "",
  children,
  texture = true,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
  texture?: boolean;
}) {
  const dark = tone === "dark" || tone === "navy" || tone === "blue";
  return (
    <section id={id} className={`relative w-full overflow-hidden ${SECTION_TONE[tone]} ${className}`}>
      {texture && <GridTexture dark={dark} />}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Cards                                                                */
/* ------------------------------------------------------------------ */
export function SharpCard({
  tone = "light",
  className = "",
  children,
  cut = false,
}: {
  tone?: "light" | "dark" | "blue";
  className?: string;
  children: React.ReactNode;
  cut?: boolean;
}) {
  const shell =
    tone === "dark"
      ? "bg-ink-raised text-white border-dark"
      : tone === "blue"
        ? "bg-brand-900 text-white border-dark"
        : "bg-white text-dark border-dark shadow-brutal";
  return (
    <div
      className={`relative border-3 ${shell} ${className}`}
      style={
        cut
          ? { clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 26px), calc(100% - 26px) 100%, 0 100%)" }
          : undefined
      }
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stat tiles                                                           */
/* ------------------------------------------------------------------ */
export function StatTile({
  label,
  value,
  desc,
  tone = "light",
}: {
  label: string;
  value: string;
  desc?: string;
  tone?: "light" | "dark";
}) {
  const labelTone = tone === "dark" ? "text-brand-300" : "text-brand-700";
  const valueTone = tone === "dark" ? "text-white" : "text-dark";
  const descTone = tone === "dark" ? "text-zinc-400" : "text-zinc-600";
  return (
    <div className="flex flex-col gap-1.5">
      <span className={`font-mono text-[10px] uppercase tracking-[0.2em] font-bold ${labelTone}`}>
        {label}
      </span>
      <span className={`font-display font-black text-4xl sm:text-5xl leading-none ${valueTone}`}>
        {value}
      </span>
      {desc ? (
        <span className={`text-[11px] font-medium leading-snug ${descTone}`}>{desc}</span>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Ticker strip                                                         */
/* ------------------------------------------------------------------ */
export function TickerStrip({
  items,
  tone = "blue",
}: {
  items: string[];
  tone?: "blue" | "dark" | "light";
}) {
  const shell =
    tone === "blue"
      ? "bg-brand-700 text-white border-b-2 border-dark"
      : tone === "light"
        ? "bg-white text-dark border-b-2 border-dark"
        : "bg-ink-soft text-accent-yellow border-b-2 border-dark";
  const sep = tone === "blue" ? "text-brand-300" : tone === "light" ? "text-brand-700" : "text-brand-400";

  return (
    <div className={`${shell} py-2.5 overflow-hidden`}>
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
/* Page hero (konsisten untuk semua sub-page)                          */
/* ------------------------------------------------------------------ */
export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  meta,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  meta?: { label: string; value: string }[];
}) {
  return (
    <header className="relative w-full overflow-hidden bg-brand-950 text-white border-b-4 border-dark">
      <GridTexture dark size={56} />
      <Sunburst className="-right-32 -top-40 w-[520px] h-[520px]" opacity={0.08} />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-3"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, #1D4ED8 0px, #1D4ED8 10px, #0B0C0F 10px, #0B0C0F 22px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-28 sm:pt-32 md:pt-36 pb-14 md:pb-20">
        <Eyebrow tone="light">{eyebrow}</Eyebrow>

        <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter leading-[0.88] mt-5">
          {title}
          {accent ? (
            <>
              <br />
              <span className="text-brand-400">{accent}</span>
            </>
          ) : null}
        </h1>

        {description ? (
          <p className="text-sm md:text-base text-zinc-300 mt-5 font-medium max-w-2xl leading-relaxed">
            {description}
          </p>
        ) : null}

        {meta && meta.length > 0 ? (
          <div className="mt-9 flex flex-wrap gap-x-8 gap-y-4">
            {meta.map((m) => (
              <div key={m.label} className="flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-400 font-bold">
                  {m.label}
                </span>
                <span className="font-headline font-bold text-sm sm:text-base uppercase tracking-wide text-white mt-1">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* CTA band                                                             */
/* ------------------------------------------------------------------ */
export function CtaBand({
  eyebrow = "✦ Periode Kelulusan 2026-2027",
  title = "Siap Mulai Proyek Sekolahmu?",
  description = "Kirim data sekolah, kami susun penawaran per pilar beserta timelines-nya.",
  primaryLabel = "Hubungi Kami",
  primaryHref = "#",
  secondaryLabel = "Lihat Portofolio",
  secondaryHref = "#",
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <div className="relative bg-ink-soft text-white overflow-hidden border-t-4 border-black">
      <Sunburst className="-right-24 -bottom-32 w-[460px] h-[460px]" opacity={0.07} />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, #FFFFFF 0px, #FFFFFF 3px, transparent 3px, transparent 26px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-block bg-brand-700 text-white px-4 py-1.5 rounded-full font-mono text-[10px] font-black uppercase tracking-[0.2em] border-2 border-white/30 mb-5">
              {eyebrow}
            </span>
            <h3 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter leading-[0.88] whitespace-pre-line">
              {title}
            </h3>
            <p className="text-sm text-zinc-400 font-medium mt-5 max-w-lg leading-relaxed">
              {description}
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3">
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-orange text-white px-6 py-4 rounded-full font-mono text-xs font-black uppercase tracking-widest border-3 border-black hover:bg-accent-yellow hover:text-dark transition-colors"
            >
              {primaryLabel}
            </a>
            <a
              href={secondaryHref}
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-6 py-4 rounded-full font-mono text-xs font-black uppercase tracking-widest border-2 border-white/40 hover:bg-white/10 transition-colors"
            >
              {secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
