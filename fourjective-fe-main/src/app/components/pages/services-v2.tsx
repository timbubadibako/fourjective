import React from "react";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import {
  CtaBand,
  Eyebrow,
  GridTexture,
  PageHero,
  SectionShell,
  SharpCard,
  StatTile,
  Sunburst,
  TickerStrip,
} from "@/components/site/poster";
import { PILLARS, REASONS, DELIVERABLES, TICKER } from "@/components/landing/services-v3/pilars-data";
import { PilarArt } from "@/components/landing/services-v3/bits";
import { SERVICE_DETAILS, PILAR_LABEL } from "@/data/services";
import { WA_MESSAGES, waLink } from "@/lib/site";

const PILAR_ACCENT: Record<string, string> = {
  yearbook: "bg-brand-700 text-white",
  event: "bg-brand-900 text-brand-300",
  studio: "bg-brand-800 text-brand-200",
  merch: "bg-brand-950 text-cyan-300",
};

export default function ServicesV2() {
  return (
    <>
      {/* ================= HERO ================= */}
      <PageHero
        eyebrow="✦ Our Services &bull; Empat Pilar Satu Kontrak"
        title="Empat Pilar,"
        accent="Satu Paket"
        description="Dari cetak buku tahunan sampai dokumentasi sinematik, semua dikerjakan satu tim dengan satu jadwal dan satu invoice. Tidak ada biaya kejutan di tengah jalan."
        meta={[
          { label: "Pilar Layanan", value: "04" },
          { label: "Detail Layanan", value: "09" },
          { label: "Kontrak", value: "SATU" },
          { label: "Berdiri", value: "2017" },
        ]}
      />

      <TickerStrip items={TICKER} tone="blue" />

      {/* ================= PILAR ================= */}
      <SectionShell id="pilar" tone="paper" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <Eyebrow>✦ Empat Pilar Layanan</Eyebrow>
              <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter mt-4 text-dark leading-[0.92]">
                Yang Anda <span className="text-brand-700">Dapatkan</span> dalam
                <br />
                Satu Paket
              </h2>
            </div>
            <p className="text-sm text-zinc-600 font-medium max-w-sm leading-relaxed">
              Komite cukup fokus pada tema dan tanggal wisuda. Tim kami menangani konsep, produksi,
              hingga buku jadi di tangan angkatan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {PILLARS.map((p) => (
              <article
                key={p.id}
                className="group relative bg-white border-3 border-dark shadow-brutal overflow-hidden hover:-translate-y-1.5 hover:shadow-brutal-lg transition-all duration-300"
              >
                <div className="relative h-56 sm:h-64 overflow-hidden" style={{ backgroundColor: p.tint }}>
                  <GridTexture dark size={28} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PilarArt p={p} artWidth="56%" />
                  </div>
                  <span
                    className={`absolute top-0 left-0 px-3 py-2 font-mono text-[10px] font-black uppercase border-b-3 border-r-3 border-dark ${PILAR_ACCENT[p.id]}`}
                  >
                    {p.sticker} &bull; {p.short}
                  </span>
                  <span className="absolute bottom-0 right-3 font-display font-black text-[72px] leading-none text-white/25 tracking-tighter">
                    {p.num}
                  </span>
                </div>

                <div className="p-6 sm:p-7 flex flex-col gap-3">
                  <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-dark leading-none">
                    {p.title}
                  </h3>
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-brand-700">
                    {p.tagline}
                  </p>
                  <p className="text-sm text-zinc-600 font-medium leading-relaxed">{p.desc}</p>

                  <ul className="mt-1 space-y-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-xs text-zinc-800 font-semibold leading-snug">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-brand-700">
                          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-4 pt-3 mt-1 border-t-2 border-dashed border-zinc-200">
                    {p.facts.map((f) => (
                      <div key={f.label} className="flex flex-col">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 font-bold">
                          {f.label}
                        </span>
                        <span className="font-display font-black text-xl text-dark leading-none mt-1">
                          {f.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* ================= DETAIL LAYANAN ================= */}
      <SectionShell id="detail-layanan" tone="navy" className="py-20 sm:py-24">
        <Sunburst className="-left-40 top-1/4 w-[520px] h-[520px]" opacity={0.06} />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <Eyebrow tone="light">✦ Rincian Layanan</Eyebrow>
              <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter mt-4 leading-[0.92]">
                Sembilan Layanan,{" "}
                <span className="text-brand-400">Satu Tim</span>
              </h2>
            </div>
            <p className="text-sm text-zinc-300 font-medium max-w-sm leading-relaxed">
              Detail teknis yang biasanya ditanyakan komite sekolah, dirangkum dalam satu daftar
              supaya tidak ada kejutan saatmeeting singkat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {SERVICE_DETAILS.map((s) => (
              <article
                key={s.id}
                className="group relative bg-ink-raised border-3 border-dark p-6 flex flex-col hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-display font-black text-4xl leading-none text-brand-700 transition-colors group-hover:text-brand-400">
                    {s.num}
                  </span>
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-700/30 text-brand-300 border border-brand-400/40">
                    {PILAR_LABEL[s.pilar]}
                  </span>
                </div>

                <h3 className="font-display font-black text-xl uppercase tracking-tight text-white mt-4 leading-tight">
                  {s.title}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-wider text-brand-400 font-bold mt-1">
                  {s.subtitle}
                </span>

                <p className="text-xs text-zinc-400 font-medium leading-relaxed mt-3">{s.desc}</p>

                <ul className="mt-4 pt-4 border-t border-white/10 space-y-2">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-[11px] text-zinc-300 font-medium leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0 mt-1.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* ================= KENAPA + DELIVERABLES ================= */}
      <SectionShell id="kenapa" tone="paper" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow>✦ Kenapa Fourjective</Eyebrow>
            <h2 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tighter mt-4 text-dark leading-[0.95]">
              Tiga Alasan Komite <span className="text-brand-700">Pilih Kami</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REASONS.map((r) => {
              const Icon = r.icon;
              return (
                <SharpCard key={r.title} className="p-7 flex flex-col">
                  <span className="w-11 h-11 rounded-xl border-2 border-dark bg-brand-700 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" strokeWidth={2.2} />
                  </span>
                  <h3 className="font-display font-black text-lg uppercase tracking-tight mt-5 leading-tight text-dark">
                    {r.title}
                  </h3>
                  <p className="text-xs text-zinc-600 font-medium mt-2.5 leading-relaxed">{r.desc}</p>
                </SharpCard>
              );
            })}
          </div>

          {/* Deliverables */}
          <div className="mt-16">
            <h3 className="font-headline font-black text-base uppercase tracking-widest text-dark mb-6 flex items-center gap-2">
              <span className="text-brand-700">✦</span> Our Deliverables
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {DELIVERABLES.map((d) => {
                const Icon = d.icon;
                return (
                  <div
                    key={d.title}
                    className="group rounded-2xl border-3 border-dark bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-brutal"
                  >
                    <span className="w-10 h-10 rounded-xl border-2 border-dark bg-brand-700/10 flex items-center justify-center group-hover:bg-brand-700 transition-colors">
                      <Icon className="w-5 h-5 text-brand-700 group-hover:text-white" strokeWidth={2.2} />
                    </span>
                    <div className="font-display font-black text-base sm:text-lg uppercase tracking-tight mt-4 leading-tight text-dark">
                      {d.title}
                    </div>
                    <p className="text-[11px] font-medium mt-1.5 leading-snug text-zinc-600">{d.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 bg-brand-950 rounded-[2rem] border-3 border-dark shadow-brutal-lg overflow-hidden">
            {[
              { label: "Yearbook Tercetak", value: "000+", desc: "Sekolah seluruh Indonesia" },
              { label: "Event Diransom", value: "000+", desc: "Prom night & wisuda" },
              { label: "Sesi Foto", value: "000+", desc: "Booking studio" },
              { label: "Mitra Produksi", value: "000+", desc: "Jaringan lokal" },
            ].map((s) => (
              <div key={s.label} className="p-6 sm:p-8">
                <StatTile label={s.label} value={s.value} desc={s.desc} tone="dark" />
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* ================= CTA ================= */}
      <CtaBand
        eyebrow="✦ Periode Kelulusan 2026-2027"
        title={"Ambil Paket\nAll-In-One"}
        description="Kirim data sekolah, kami susun penawaran per pilar beserta timelines-nya. Tanpa biaya konsultasi."
        primaryLabel="Konsultasi Gratis"
        primaryHref={waLink(WA_MESSAGES.general)}
        secondaryLabel="Hitung Estimasi"
        secondaryHref="/#calculator"
      />
    </>
  );
}
