import React from "react";
import Image from "next/image";
import { Compass, Target, MapPin, ArrowUpRight } from "lucide-react";
import {
  CtaBand,
  Eyebrow,
  GridTexture,
  PageHero,
  SectionShell,
  SharpCard,
  StatTile,
  Sunburst,
} from "@/components/site/poster";
import { SITE, WA_MESSAGES, waLink } from "@/lib/site";

const MISI = [
  "Mengabadikan kenangan sekolah dengan pendekatan personal dan emosional",
  "Menjaga standar kualitas tertinggi",
  "Berinovasi secara berkelanjutan dengan teknologi visual terkini",
  "Membangun komunikasi kolaboratif",
  "Memberikan layanan tepat waktu dan bertanggung jawab",
  "Mendedikasikan upaya terbaik untuk setiap momen berharga",
  "Memberikan solusi dengan sudut pandang sebagai klien itu sendiri",
];

const TEAM = [
  { name: "M. Hamzah Nuresa", role: "CEO", img: "/images/about/model2.png" },
  { name: "Venny Meilinda", role: "Project Manager", img: "/images/about/model3.png" },
  { name: "Kasmira Maharani", role: "Manager", img: "/images/about/model1.png" },
  { name: "Nabila Regita", role: "HRD", img: "/images/about/model4.png" },
];

export default function AboutV2() {
  return (
    <>
      {/* ================= HERO ================= */}
      <PageHero
        eyebrow="✦ Tentang Fourjectiv &bull; Studio Independen"
        title="Cerita di"
        accent="Balik Karya"
        description="Fourjectiv berdiri sebagai vendor kreatif yang fokus pada pembuatan yearbook dengan pendekatan berbeda. Sebuah yearbook bukan sekadar kumpulan foto dan nama, tapi ruang untuk merangkai cerita dan membangkitkan emosi yang autentik."
        meta={[
          { label: "Berdiri", value: "2017" },
          { label: "Markas", value: "Kuningan, JB" },
          { label: "Tim", value: "000" },
          { label: "Angkatan", value: "000+" },
        ]}
      />

      {/* ================= STORY ================= */}
      <SectionShell id="cerita" tone="paper" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <Eyebrow>✦ For The Moment</Eyebrow>
              <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tighter mt-4 text-dark leading-[0.92]">
                More Than{" "}
                <span className="text-brand-700">Documentation</span>
              </h2>
              <p className="text-base sm:text-lg text-zinc-800 font-semibold leading-relaxed mt-6">
                Berdiri sejak 2017, Fourjectiv hadir sebagai vendor kreatif yang berfokus pada pembuatan
                yearbook dengan pendekatan berbeda. Bagi kami, sebuah yearbook bukan sekadar kumpulan
                foto dan nama, tapi ruang untuk merangkai cerita, menghadirkan kenangan, dan membangkitkan
                emosi yang autentik melalui desain dan narasi yang modern.
              </p>
              <p className="text-sm sm:text-base text-zinc-600 font-medium leading-relaxed mt-4">
                Lebih dari sekadar dokumentasi, Fourjectiv menjadi partner kreatif yang membantu
                mengabadikan perjalanan sekolah lewat yearbook, short movie, dan rewind yang personal,
                estetik, dan penuh makna. Karena setiap momen berharga layak dikenang dengan cara terbaik.
              </p>

              <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 bg-brand-950 rounded-[2rem] border-3 border-dark shadow-brutal-lg overflow-hidden">
                {[
                  { label: "Angkatan Dilayani", value: "000+", desc: "Sejak 2017" },
                  { label: "Halaman Dirancang", value: "000+", desc: "Total cetak" },
                  { label: "Kota Tercakup", value: "000", desc: "Seluruh Indonesia" },
                  { label: "Tepat Waktu", value: "000%", desc: "Garansi kontrak" },
                ].map((s) => (
                  <div key={s.label} className="p-6">
                    <StatTile label={s.label} value={s.value} desc={s.desc} tone="dark" />
                  </div>
                ))}
              </div>
            </div>

            {/* Nilai */}
            <div className="lg:col-span-5">
              <div className="bg-brand-900 text-white rounded-[2rem] border-3 border-dark shadow-brutal p-8 relative overflow-hidden h-full">
                <GridTexture dark size={40} />
                <Sunburst className="-right-16 -bottom-24 w-[320px] h-[320px]" opacity={0.12} />
                <div className="relative">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-300 font-bold">
                    NilaiYang Kami Pegang
                  </span>
                  <div className="mt-8 space-y-6">
                    {[
                      {
                        t: "Karya, Bukan Tugas Cetak",
                        d: "Setiap halaman dirancang sebagai karya, bukan sekadar filling halaman.",
                      },
                      {
                        t: "Empat Pilar, Satu Tim",
                        d: "Yearbook, event, studio shoot, dan merch dikerjakan tim yang sama.",
                      },
                      {
                        t: "Privasi Data Siswa",
                        d: "Foto angkatan hanya diakses lewat portal berpassword, bukan galeri publik.",
                      },
                      {
                        t: "Garansi Tepat Waktu",
                        d: "Tanggal wisuda sekolah adalah tenggat waktu mati bagi kami.",
                      },
                    ].map((v, i) => (
                      <div key={v.t} className="flex gap-4">
                        <span className="font-display font-black text-3xl leading-none text-brand-400 shrink-0 w-10">
                          0{i + 1}
                        </span>
                        <div>
                          <div className="font-headline font-bold text-sm uppercase tracking-wide text-white">
                            {v.t}
                          </div>
                          <p className="text-xs text-zinc-300 font-medium mt-1.5 leading-relaxed">{v.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* ================= VISI & MISI ================= */}
      <SectionShell id="visi-misi" tone="navy" className="py-20 sm:py-24">
        <Sunburst className="-left-40 top-20 w-[480px] h-[480px]" opacity={0.06} />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow tone="light">✦ Visi &amp; Misi</Eyebrow>
            <h2 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tighter mt-4 leading-[0.95]">
              Arah Kami <span className="text-brand-400">Jelas</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* VISI */}
            <SharpCard tone="blue" className="lg:col-span-5 p-8 sm:p-10 flex flex-col">
              <span className="w-12 h-12 rounded-xl bg-white/15 border-2 border-white/25 flex items-center justify-center">
                <Compass className="w-6 h-6 text-white" strokeWidth={2.2} />
              </span>
              <h3 className="font-display font-black text-3xl uppercase tracking-tight mt-6 text-white">
                Visi
              </h3>
              <p className="text-sm text-brand-100 font-medium leading-relaxed mt-4">
                Menjadi mitra terpercaya dalam menciptakan buku tahunan (Yearbook) yang menyentuh hati,
                berkualitas tinggi, dan penuh kenangan otentik untuk generasi sekolah masa kini — dengan
                sentuhan teknologi dan inovasi yang selalu kami update dari tahun ke tahun.
              </p>
              <div className="mt-auto pt-8 font-display font-black text-[80px] leading-none text-white/15">
                V
              </div>
            </SharpCard>

            {/* MISI */}
            <SharpCard tone="dark" className="lg:col-span-7 p-8 sm:p-10 flex flex-col">
              <span className="w-12 h-12 rounded-xl bg-brand-700 border-2 border-white/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" strokeWidth={2.2} />
              </span>
              <h3 className="font-display font-black text-3xl uppercase tracking-tight mt-6 text-white">
                Misi
              </h3>
              <ol className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MISI.map((m, i) => (
                  <li
                    key={m}
                    className="flex items-start gap-3 bg-white/[0.04] border border-white/10 rounded-xl p-3.5"
                  >
                    <span className="font-mono text-[10px] font-black text-brand-400 shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs text-zinc-300 font-medium leading-snug">{m}</span>
                  </li>
                ))}
              </ol>
            </SharpCard>
          </div>
        </div>
      </SectionShell>

      {/* ================= TEAM ================= */}
      <SectionShell id="tim" tone="paper" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <Eyebrow>✦ Our Team</Eyebrow>
              <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter mt-4 text-dark leading-[0.92]">
                Orang di <span className="text-brand-700">Balik Karya</span>
              </h2>
            </div>
            <p className="text-sm text-zinc-600 font-medium max-w-sm leading-relaxed">
              Satu tim inti yang menangani seluruh angkatan, dari negosiasi kontrak sampai buku jadi
              diterima komite.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map((t, i) => (
              <article
                key={t.name}
                className="group relative bg-white border-3 border-dark shadow-brutal overflow-hidden hover:-translate-y-1.5 hover:shadow-brutal-lg transition-all duration-300"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-brand-900 border-b-3 border-dark">
                  <Image
                    src={t.img}
                    alt={t.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-950/85 to-transparent pointer-events-none" />
                  <span className="absolute top-0 left-0 px-2.5 py-1.5 font-mono text-[10px] font-black uppercase bg-brand-700 text-white border-b-3 border-r-3 border-dark">
                    0{i + 1}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-black text-base uppercase tracking-tight text-dark leading-tight">
                    {t.name}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-brand-700 font-bold mt-1.5">
                    {t.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* ================= LOCATION ================= */}
      <SectionShell id="lokasi" tone="blue" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <Eyebrow tone="light">✦ Fourjectiv Location</Eyebrow>
              <h2 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tighter mt-4 leading-[0.92]">
                Markas di <span className="text-brand-300">Kuningan</span>
              </h2>
              <p className="text-sm text-brand-100 font-medium leading-relaxed mt-5">
                Studio utama berdiri di Kuningan, Jawa Barat — titik awal seluruh produksi. Tim dan
                peralatanESCHool shooting kamihowever sterile...
              </p>

              <div className="mt-8 bg-black/25 border-2 border-white/25 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-300 font-bold block">
                      Alamat Studio
                    </span>
                    <span className="text-sm text-white font-semibold mt-1.5 block leading-relaxed">
                      {SITE.address}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-200 font-bold block mb-3">
                  ✦ Kota Jangkauan
                </span>
                <div className="flex flex-wrap gap-2">
                  {SITE.cities.map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-[11px] font-mono text-white"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative bg-white border-3 border-dark shadow-brutal-lg p-3">
                <Image
                  src="/images/about/location.svg"
                  alt="Peta lokasi Fourjectiv"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
                <a
                  href="https://maps.google.com/?q=Jl.+R.E.+Martadinata+No.+88+Kuningan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-6 right-6 inline-flex items-center gap-2 bg-ink-soft text-white font-mono text-[11px] font-black uppercase px-5 py-3 rounded-xl border-2 border-dark shadow-[3px_3px_0px_#1D4ED8] hover:bg-brand-700 transition-colors"
                >
                  <span>Buka Petunjuk Arah</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* ================= CTA ================= */}
      <CtaBand
        eyebrow="✦ Mau Kenal Kami Secara Langsung?"
        title={"Ngobrol\nDengan Tim Kami"}
        description="Punya sekolah yang sedang menyiapkan yearbook? Konsultasi singkat, tanpa biaya, tanpa jargon teknis."
        primaryLabel="Konsultasi Gratis"
        primaryHref={waLink(WA_MESSAGES.general)}
        secondaryLabel="Lihat Portofolio"
        secondaryHref="/portofolio"
      />
    </>
  );
}
