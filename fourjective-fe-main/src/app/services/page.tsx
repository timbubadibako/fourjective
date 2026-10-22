import React from "react";
import Link from "next/link";
import Header from "@/components/landing/header-pill-v2";
import Footer from "@/components/landing/footer-v4";
import {
  Video,
  Camera,
  Film,
  Sparkles,
  BookOpen,
  Layers,
  Box,
  Shirt,
  Smartphone,
  MessageCircle,
  ArrowLeft,
  ArrowUpRight,
  Check,
  Printer,
  Scissors,
  Palette,
  Music,
} from "lucide-react";
import { WA_MESSAGES, waLink } from "@/lib/site";

/* ============ SERVICES — KAPABILITAS FOURJECTIVE ============
   Halaman layanan (bukan paket bundel). Data ringkas; detail value
   tiap lini bundel ada di /paket. */

type ServiceItem = { title: string; desc: string };

const VIDEO_ITEMS: ServiceItem[] = [
  {
    title: "Film Angkatan",
    desc: "Produksi nggak main-main — SPV Film khusus ngawasin presesnya. Hasilnya kayak short movie beneran.",
  },
  {
    title: "After Movie",
    desc: "Video sinematik singkat yang rangkum semua keseruan angkatan. Cocok buat teaser, recap, atau diputar di acara.",
  },
  {
    title: "BTS Video",
    desc: "Butuh video cepet? Kita siap kirim sameday / next day biar moment kecil tetep terasa hangat.",
  },
  {
    title: "Trend Video Unlimited",
    desc: "Konten sosmed tanpa batas request — ide kita bantu brainstorming, lebih otentik.",
  },
  {
    title: "Drone Service",
    desc: "Liputan udara formasi angka tahun kelulusan & klip pendek kenangan angkatan.",
  },
];

const PHOTO_ITEMS: ServiceItem[] = [
  {
    title: "Indoor Photo",
    desc: "Sesi foto indoor dengan lighting & set properti profesional.",
  },
  {
    title: "Outdoor Photo",
    desc: "Pemotretan lapangan & formasi angkatan dengan arahan gaya terarah.",
  },
  {
    title: "Studio Delivery",
    desc: "Studio foto mobile dibawa ke sekolah — nggak perlu keluar gedung.",
  },
];

const PHOTO_POINTS: string[] = [
  "Properti foto dari vendor (S&K) — nggak ribet bawa sendiri.",
  "Tema sesuai request — konsep fresh, update, kekinian.",
  "Team 3–4 orang di lapangan: leader, style director, equipment specialist.",
  "Lighting profesional (three-point lighting, favorit: seri Godox).",
  "Free additional photo (S&K) — fasilitas sekolah, outfit, nominasi.",
];

const PHOTO_EDIT: ServiceItem[] = [
  {
    title: "Remove Background",
    desc: "Foto lebih clean, simple, atau buat kebutuhan layout.",
  },
  {
    title: "Digital Imaging",
    desc: "Foto diolah lebih kreatif & standout dengan sentuhan digital art.",
  },
];

const VIDEO_EDIT: ServiceItem[] = [
  {
    title: "Script / Konsep",
    desc: "Kolaborasi bareng SPV Film Fourjective — storytelling lebih kuat.",
  },
  {
    title: "Sound Design",
    desc: "Audio dirapihin & dipoles biar video makin hidup & berasa.",
  },
  {
    title: "Color Grading",
    desc: "Tone warna lebih sinematik & proper.",
  },
];

const COVER_TIERS: ServiceItem[] = [
  {
    title: "Essential",
    desc: "Simple, clean, timeless. Cocok konsep minimalis.",
  },
  {
    title: "Elements",
    desc: "Lebih rame, berani main elemen visual — variatif tapi tetap estetik.",
  },
  {
    title: "Masterpiece",
    desc: "Desain premium dengan ilustrasi, digital imaging, atau artwork khusus.",
  },
];

const BOOK_SPEC: { label: string; value: string }[] = [
  { label: "Halaman", value: "Mengikuti jumlah pax" },
  { label: "Kertas Isi", value: "Art / Matte Paper 150 gsm · cetak fullcolor" },
  { label: "Ukuran Buku", value: "A4 / A5 / B5" },
  { label: "Cover", value: "Hardcover MDF + Ivory 190 gsm · varnish · laminasi" },
  { label: "Kertas Cover", value: "Art / Matte Paper 160 gsm" },
  { label: "Additional", value: "Pop Up · Spot UV · Emboss" },
];

const MERCH: ServiceItem[] = [
  {
    title: "Medali Angkatan",
    desc: "Classic (akrilik + tali garis) · Premium (akrilik + lanyard) · Eksklusif (kuningan + lanyard) · Masterpiece (zinc alloy + lanyard).",
  },
  {
    title: "Totebag",
    desc: "Spunbond · Blacu · Kanvas · Drill.",
  },
  {
    title: "Photobooth",
    desc: "Printer DNP profesional, lighting & background, unlimited cetak, properti foto.",
  },
  {
    title: "Baju Angkatan",
    desc: "Desain kita urusin, lo tinggal pake. Cotton combed 24s/30s · sablon plastisol premium (DFT by request).",
  },
];

function ServiceCard({ item, accent = false }: { item: ServiceItem; accent?: boolean }) {
  return (
    <div
      className={`bg-white border-3 border-dark rounded-xl p-5 sm:p-6 ${
        accent ? "shadow-[5px_6px_0px_#FF4D00]" : "shadow-[5px_6px_0px_#14161C]"
      }`}
    >
      <h4 className="font-headline font-black uppercase text-sm sm:text-base text-dark tracking-wider mb-2">
        {item.title}
      </h4>
      <p className="text-xs sm:text-sm text-dark/70 leading-relaxed font-medium">
        {item.desc}
      </p>
    </div>
  );
}

function SectionHead({ num, title, kicker }: { num: string; title: string; kicker?: string }) {
  return (
    <div className="flex items-center gap-4 border-b-[3px] border-dark pb-3 mb-6">
      <span className="font-headline font-black text-orange text-2xl leading-none">
        {num}
      </span>
      <h3 className="font-headline font-black uppercase text-sm sm:text-base tracking-wider text-dark">
        {title}
      </h3>
      {kicker ? (
        <span className="ml-auto font-mono text-[9px] font-black uppercase tracking-[0.25em] text-dark/35 hidden md:block">
          {kicker}
        </span>
      ) : null}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-paper text-dark flex flex-col selection:bg-orange selection:text-white">
      <Header />

      {/* Grid paper texture */}
      <div
        className="fixed inset-0 pointer-events-none"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(20,22,28,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(20,22,28,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <main className="relative z-10 pt-20 sm:pt-24 pb-0 w-full">
        {/* ===== MASTHEAD ===== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between gap-4 pb-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-dark/50 hover:text-orange transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Beranda
            </Link>
            <span className="font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-orange">
              Layanan Studio
            </span>
          </div>

          <div className="border-t-[3px] border-dark pt-8 sm:pt-10 pb-10 sm:pb-14 relative">
            <div
              className="absolute right-0 top-0 w-[360px] h-[360px] opacity-[0.07] pointer-events-none"
              aria-hidden
            >
              <svg viewBox="0 0 200 200" className="w-full h-full fill-orange">
                <polygon points="100,0 115,65 178,32 142,88 200,100 142,112 178,168 115,135 100,200 85,135 22,168 58,112 0,100 58,88 22,32 85,65" />
              </svg>
            </div>
            <div className="grid lg:grid-cols-12 gap-8 items-end relative">
              <h1 className="lg:col-span-8 font-playtimes text-dark leading-[1.0] tracking-tight text-5xl sm:text-7xl md:text-8xl">
                Our Services,
                <br />
                <span className="text-orange">Do The Best.</span>
              </h1>
              <div className="lg:col-span-4 lg:pb-2">
                <p className="text-sm sm:text-base text-dark/70 leading-relaxed font-medium">
                  Layanan lengkap dari video, foto, editing, desain buku, sampai merchandise & AR — satu pintu.
                </p>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-dark/40 mt-4">
                  PT Fourjective Studio Indonesia
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== 01 VIDEO ===== */}
        <div className="border-t-[3px] border-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
            <SectionHead num="01" title="Video Service" kicker="film · drone · bts · trend" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {VIDEO_ITEMS.map((it) => (
                <ServiceCard key={it.title} item={it} accent />
              ))}
            </div>
          </div>
        </div>

        {/* ===== 02 PHOTO ===== */}
        <div className="border-t-[3px] border-dark bg-white/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
            <SectionHead num="02" title="Photo Service" kicker="photoshoot · studio · outdoor" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {PHOTO_ITEMS.map((it) => (
                <ServiceCard key={it.title} item={it} />
              ))}
            </div>
            <div className="bg-paper border-3 border-dark rounded-xl p-5 sm:p-6">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-orange mb-4">
                Yang Kami Sediakan
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PHOTO_POINTS.map((p, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-dark/75 leading-relaxed font-medium"
                  >
                    <Check className="w-4 h-4 text-orange shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ===== 03 EDITING ===== */}
        <div className="border-t-[3px] border-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
            <SectionHead num="03" title="Editing Service" kicker="photo · video" />
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-dark/45 mb-4">
                  Photo Editing
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PHOTO_EDIT.map((it) => (
                    <ServiceCard key={it.title} item={it} />
                  ))}
                </div>
              </div>
              <div>
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-dark/45 mb-4">
                  Video Editing
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {VIDEO_EDIT.map((it) => (
                    <ServiceCard key={it.title} item={it} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== 04 BOOK ===== */}
        <div className="border-t-[3px] border-dark bg-white/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
            <SectionHead num="04" title="Book Service" kicker="cover · layout · spec" />

            <p className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-dark/45 mb-4">
              Design Cover
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {COVER_TIERS.map((it) => (
                <ServiceCard key={it.title} item={it} />
              ))}
            </div>

            <div className="bg-white border-3 border-dark rounded-xl p-5 sm:p-6 mb-8">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-orange mb-3">
                Design Layout
              </p>
              <p className="text-xs sm:text-sm text-dark/75 leading-relaxed font-medium">
                Foto dominan, lebih clean & modern — biar moment kamu yang jadi spotlight.
              </p>
            </div>

            <p className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-dark/45 mb-4">
              Product Specification
            </p>
            <div className="bg-paper border-3 border-dark rounded-xl overflow-hidden">
              <div className="divide-y-2 divide-dark/10">
                {BOOK_SPEC.map((s) => (
                  <div
                    key={s.label}
                    className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-6 py-3 px-5"
                  >
                    <span className="font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-dark/45 pt-0.5">
                      {s.label}
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-bold text-dark leading-relaxed">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== 05 AR ===== */}
        <div className="border-t-[3px] border-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
            <SectionHead num="05" title="AR (Augmented Reality)" kicker="cover · packaging · video" />
            <div className="bg-orange text-white border-3 border-dark rounded-xl p-6 sm:p-8 shadow-[6px_7px_0px_#14161C]">
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-medium mb-4">
                Cover atau packaging bisa langsung memunculkan video, animasi, atau pesan khusus lewat kamera smartphone.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  "Bikin buku tahunan lo lebih berkesan & kekinian.",
                  "Lebih interaktif, gak cuma sekadar buku.",
                  "Bisa jadi pembeda dari angkatan lain.",
                ].map((t, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-white/90 leading-relaxed font-medium"
                  >
                    <Check className="w-4 h-4 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ===== 06 YEARBOOK DIGITAL ===== */}
        <div className="border-t-[3px] border-dark bg-white/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
            <SectionHead num="06" title="Yearbook Digital (E-Book)" kicker="akses · arsip · lifetime" />
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white border-3 border-dark rounded-xl p-5 sm:p-6 shadow-[5px_6px_0px_#14161C]">
                <p className="text-xs sm:text-sm text-dark/75 leading-relaxed font-medium mb-4">
                  Buku tahunan kamu juga kita sediain versi digital (E-Book) yang bisa diakses kapan aja & di mana aja. Gak perlu takut file hilang — arsip seumur hidup (lifetime).
                </p>
                <ul className="space-y-2.5">
                  {[
                    "Akses praktis — HP, tablet, laptop.",
                    "Lifetime archive — data & file aman.",
                    "Nggak takut hilang — file digital selalu ready.",
                  ].map((t, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-dark/75 leading-relaxed font-medium"
                    >
                      <Check className="w-4 h-4 text-orange shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-paper border-3 border-dark rounded-xl p-5 sm:p-6 flex items-center justify-center">
                <div className="text-center">
                  <Smartphone className="w-12 h-12 text-orange mx-auto mb-3" />
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-dark/45">
                    Flipbook 3D · Password Terenkripsi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== 07 MERCHANDISE ===== */}
        <div className="border-t-[3px] border-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
            <SectionHead num="07" title="Merchandise Yearbook" kicker="medali · totebag · photobooth · baju" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {MERCH.map((it) => (
                <ServiceCard key={it.title} item={it} />
              ))}
            </div>
          </div>
        </div>

        {/* ===== CTA ===== */}
        <div className="border-t-[3px] border-dark bg-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-20">
            <div className="grid lg:grid-cols-12 gap-8 items-end">
              <h2 className="lg:col-span-7 font-playtimes text-white leading-[1.0] tracking-tight text-4xl sm:text-6xl">
                Butuh Layanan
                <br />
                <span className="text-orange">Khusus?</span>
              </h2>
              <div className="lg:col-span-5">
                <p className="text-sm text-white/70 leading-relaxed font-medium mb-6">
                  Konsultasi langsung via WhatsApp — tim kami siap bantu susun paket sesuai kebutuhan sekolahmu.
                </p>
                <a
                  href={waLink(WA_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-orange text-white font-headline font-black text-xs sm:text-sm uppercase tracking-widest px-7 py-4 border-3 border-white/20 shadow-[5px_6px_0px_rgba(255,255,255,0.15)] hover:shadow-[2px_3px_0px_rgba(255,255,255,0.15)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Hubungi via WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
