"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/landing/header-pill-v2";
import Footer from "@/components/landing/footer-v4";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MessageCircle,
  ArrowLeft,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { WA_MESSAGES, waLink } from "@/lib/site";

/* ============ SERVICES — EDITORIAL SERVICE INDEX ============
   7 pilar layanan sebagai baris editorial gaya majalah:
   nomor raksasa di kiri, konten mengalir di kanan, tanpa kartu bertumpuk. */

type ServiceItem = { title: string; desc: string };

const VIDEO_ITEMS: ServiceItem[] = [
  { title: "Film Angkatan", desc: "Produksi nggak main-main — SPV Film khusus ngawasin presesnya. Hasilnya kayak short movie beneran." },
  { title: "After Movie", desc: "Video sinematik singkat yang rangkum semua keseruan angkatan. Cocok buat teaser, recap, atau diputar di acara." },
  { title: "BTS Video", desc: "Butuh video cepet? Kirim sameday / next day biar moment kecil tetep terasa hangat." },
  { title: "Trend Video Unlimited", desc: "Konten sosmed tanpa batas request — ide kita bantu brainstorming, lebih otentik." },
  { title: "Drone Service", desc: "Liputan udara formasi angka tahun kelulusan & klip pendek kenangan angkatan." },
];

const PHOTO_ITEMS: ServiceItem[] = [
  { title: "Indoor Photo", desc: "Sesi foto indoor dengan lighting & set properti profesional." },
  { title: "Outdoor Photo", desc: "Pemotretan lapangan & formasi angkatan dengan arahan gaya terarah." },
  { title: "Studio Delivery", desc: "Studio foto mobile dibawa ke sekolah — nggak perlu keluar gedung." },
];

const PHOTO_POINTS: string[] = [
  "Properti foto dari vendor (S&K) — nggak ribet bawa sendiri.",
  "Tema sesuai request — konsep fresh, update, kekinian.",
  "Team 3–4 orang di lapangan: leader, style director, equipment specialist.",
  "Lighting profesional (three-point lighting, favorit: seri Godox).",
  "Free additional photo (S&K) — fasilitas sekolah, outfit, nominasi.",
];

const EDITING_ITEMS: ServiceItem[] = [
  { title: "Remove Background", desc: "Foto lebih clean & simple, siap buat kebutuhan layout." },
  { title: "Digital Imaging", desc: "Foto diolah lebih kreatif & standout dengan sentuhan digital art." },
  { title: "Script / Konsep", desc: "Kolaborasi bareng SPV Film — storytelling lebih kuat." },
  { title: "Sound Design", desc: "Audio dirapihin & dipoles biar video makin hidup & berasa." },
  { title: "Color Grading", desc: "Tone warna lebih sinematik & proper." },
];

const COVER_TIERS: ServiceItem[] = [
  { title: "Essential", desc: "Simple, clean, timeless. Cocok konsep minimalis." },
  { title: "Elements", desc: "Lebih rame, berani main elemen visual — variatif tapi tetap estetik." },
  { title: "Masterpiece", desc: "Desain premium dengan ilustrasi, digital imaging, atau artwork khusus." },
];

const BOOK_SPEC: { label: string; value: string }[] = [
  { label: "Kertas", value: "Art / Matte 150 gsm · fullcolor · A4 / A5 / B5" },
  { label: "Cover", value: "Hardcover MDF + Ivory 190 gsm · laminasi · varnish" },
  { label: "Additional", value: "Pop Up · Spot UV · Emboss" },
];

const MERCH_ITEMS: ServiceItem[] = [
  { title: "Medali Angkatan", desc: "Classic · Premium · Eksklusif (kuningan) · Masterpiece (zinc alloy)." },
  { title: "Totebag", desc: "Spunbond · Blacu · Kanvas · Drill." },
  { title: "Photobooth", desc: "Printer DNP profesional, unlimited cetak, properti foto." },
  { title: "Baju Angkatan", desc: "Cotton combed 24s/30s · sablon plastisol premium (DFT by request)." },
];

const AR_POINTS: string[] = [
  "Bikin buku tahunan lo lebih berkesan & kekinian.",
  "Lebih interaktif — gak cuma sekadar buku.",
  "Bisa jadi pembeda dari angkatan lain.",
];

const EBOOK_POINTS: string[] = [
  "Akses praktis — HP, tablet, laptop.",
  "Lifetime archive — data & file aman.",
  "Nggak takut hilang — file digital selalu ready.",
];

/* ---------- Editorial Row: satu pilar = satu baris ---------- */

function ServiceRow({
  num,
  title,
  kicker,
  media,
  children,
  flip = false,
}: {
  num: string;
  title: string;
  kicker: string;
  media: { src: string; alt: string };
  children: React.ReactNode;
  flip?: boolean;
}) {
  return (
    <div data-service-row className="border-t-[3px] border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-x-10 gap-y-10 py-12 sm:py-16 items-center">
          {/* Ilustrasi layanan — zigzag: baris genap dibalik ke kanan */}
          <div
            data-row-fx
            className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}
          >
            <div className="relative border-3 border-dark bg-[#FAF6F0] shadow-[8px_9px_0_0_#FF4D00]">
              <span className="absolute -top-4 -left-3 bg-dark text-[#FAF6F0] font-mono text-[9px] font-bold uppercase tracking-[0.3em] px-3 py-1.5">
                <span className="text-orange">{num}</span>
                <span className="mx-1.5 text-[#FAF6F0]/40">·</span>
                FOURJECTIV
              </span>
              <img
                src={media.src}
                alt={media.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Konten editorial */}
          <div className="lg:col-span-7">
            <div data-row-fx className="flex items-start gap-4 lg:gap-6">
              {/* Nomor raksasa — ghost outline oranye (High-Voltage signature) */}
              <span
                aria-hidden
                className="font-headline font-black leading-[0.8] tracking-tighter select-none text-6xl sm:text-8xl text-transparent"
                style={{ WebkitTextStroke: "3px #FF4D00", paintOrder: "stroke fill" }}
              >
                {num}
              </span>
              <div>
                <h2 className="font-playtimes leading-[1.02] tracking-tight text-3xl sm:text-5xl text-dark">
                  {title}
                </h2>
                <p className="font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] mt-2 text-dark/35">
                  {kicker}
                </p>
              </div>
            </div>
            <div data-row-fx className="mt-7 sm:mt-9">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Item list editorial: judul bold + deskripsi mengalir, dipisah hairline */
function EditorialList({
  items,
  cols = 2,
  dark = false,
}: {
  items: ServiceItem[];
  cols?: 1 | 2;
  dark?: boolean;
}) {
  return (
    <div className={`grid gap-x-10 ${cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-1"}`}>
      {items.map((it) => (
        <div key={it.title} className="py-3.5 border-b border-dark/15">
          <h4
            className={`font-headline font-black uppercase text-xs sm:text-sm tracking-wider ${
              dark ? "text-[#FAF6F0]" : "text-dark"
            }`}
          >
            {it.title}
          </h4>
          <p
            className={`mt-1 text-xs sm:text-[13px] leading-relaxed font-medium ${
              dark ? "text-[#FAF6F0]/75" : "text-dark/65"
            }`}
          >
            {it.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

function PointsList({ points, dark = false }: { points: string[]; dark?: boolean }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-2">
      {points.map((t, i) => (
        <li
          key={i}
          className={`flex items-start gap-2.5 text-xs sm:text-[13px] leading-relaxed font-medium ${
            dark ? "text-[#FAF6F0]/85" : "text-dark/70"
          }`}
        >
          <Check className="w-4 h-4 shrink-0 mt-0.5 stroke-[2.5]" style={dark ? { color: "#FAF6F0" } : { color: "#FF4D00" }} />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function SubLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={`font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-[0.28em] mb-4 ${
        dark ? "text-[#FAF6F0]/60" : "text-dark/40"
      }`}
    >
      {children}
    </p>
  );
}

export default function ServicesPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    /* Lenis smooth-scroll sinkron ticker GSAP */
    const lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onLenisScroll);
    const rafId = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(rafId);
    gsap.ticker.lagSmoothing(0);

    /* GSAP: masthead reveal + tiap row editorial slide-in ringan */
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          "#svc-masthead h1",
          { y: 70, opacity: 0, rotate: 1.5 },
          { y: 0, opacity: 1, rotate: 0, duration: 0.85 }
        )
        .fromTo(
          "#svc-masthead p",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        );

      gsap.utils.toArray<HTMLElement>("[data-service-row]").forEach((row) => {
        gsap.fromTo(
          row.querySelectorAll("[data-row-fx]"),
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 85%" },
          }
        );
      });

      gsap.fromTo(
        "#svc-cta",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: "#svc-cta", start: "top 85%" },
        }
      );
    });

    return () => {
      ctx.revert();
      gsap.ticker.remove(rafId);
      lenis.off("scroll", onLenisScroll);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-paper text-dark flex flex-col selection:bg-orange selection:text-[#FAF6F0] overflow-x-clip">
      <Header />

      {/* Grid paper texture */}
      <div
        className="fixed inset-0 pointer-events-none"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(20,22,28,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(20,22,28,0.03) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <main className="relative z-10 pt-20 sm:pt-24 pb-0 w-full">
        {/* ===== MASTHEAD ===== */}
        <div id="svc-masthead" className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between gap-4 pb-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-dark/50 hover:text-orange transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Beranda
            </Link>
            <span className="font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-orange">
              Kapabilitas Studio · 7 Pilar
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
                <span className="text-orange relative inline-block">
                  {/* Ghost outline layer */}
                  <span
                    aria-hidden
                    className="absolute inset-0 text-transparent pointer-events-none select-none translate-x-[7px] translate-y-[7px] sm:translate-x-[10px] sm:translate-y-[10px]"
                    style={{ WebkitTextStroke: "3px #FF4D00", paintOrder: "stroke fill" }}
                  >
                    Do The Best.
                  </span>
                  <span className="relative">Do The Best.</span>
                </span>
              </h1>
              <div className="lg:col-span-4 lg:pb-2">
                <p className="text-sm sm:text-base text-dark/70 leading-relaxed font-medium">
                  Layanan lengkap dari video, foto, editing, desain buku, sampai merchandise &amp; AR — satu pintu.
                </p>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-dark/40 mt-4">
                  PT Fourjective Studio Indonesia
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== 01 VIDEO ===== */}
        <ServiceRow
          num="01"
          title="Video Service"
          kicker="Film · Drone · BTS · Trend"
          media={{ src: "/images/services/service-type/video.svg", alt: "Ilustrasi produksi video Fourjective" }}
        >
          <div data-row-fx>
            <EditorialList items={VIDEO_ITEMS} />
          </div>
        </ServiceRow>

        {/* ===== 02 PHOTO ===== */}
        <ServiceRow
          num="02"
          title="Photo Service"
          kicker="Studio · Outdoor · Delivery"
          media={{ src: "/images/services/service-type/photo.svg", alt: "Ilustrasi sesi foto Fourjective" }}
          flip
        >
          <div data-row-fx className="grid sm:grid-cols-2 gap-x-10 gap-y-8 items-start">
            <div>
              <SubLabel>Cakupan Sesi</SubLabel>
              <EditorialList items={PHOTO_ITEMS} cols={1} />
            </div>
            <div>
              <SubLabel>Yang Kami Sediakan</SubLabel>
              <ul className="divide-y divide-dark/10 border-b border-dark/15">
                {PHOTO_POINTS.map((t, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 py-2.5 text-xs sm:text-[13px] leading-relaxed font-medium text-dark/70"
                  >
                    <Check className="w-4 h-4 shrink-0 mt-0.5 stroke-[2.5] text-orange" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ServiceRow>

        {/* ===== 03 EDITING ===== */}
        <ServiceRow
          num="03"
          title="Editing Service"
          kicker="Photo · Video"
          media={{ src: "/images/services/service-type/editing.svg", alt: "Ilustrasi editing foto & video" }}
        >
          <div data-row-fx>
            <EditorialList items={EDITING_ITEMS} />
          </div>
        </ServiceRow>

        {/* ===== 04 BOOK ===== */}
        <ServiceRow
          num="04"
          title="Book Service"
          kicker="Cover · Layout · Spec"
          media={{ src: "/images/services/service-type/book.svg", alt: "Ilustrasi buku tahunan hardcover" }}
          flip
        >
          <div data-row-fx>
            <SubLabel>Design Cover — 3 Tier</SubLabel>
            <EditorialList items={COVER_TIERS} cols={1} />
          </div>
          <div data-row-fx className="mt-8">
            <SubLabel>Layout</SubLabel>
            <p className="text-xs sm:text-[13px] text-dark/70 leading-relaxed font-medium">
              Foto dominan, lebih clean &amp; modern — biar moment kamu yang jadi spotlight.
            </p>
          </div>
          <div data-row-fx className="mt-8">
            <SubLabel>Product Specification</SubLabel>
            <div className="divide-y-2 divide-dark/10 border-b-2 border-dark/10">
              {BOOK_SPEC.map((s) => (
                <div key={s.label} className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-8 py-3">
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
        </ServiceRow>

        <ServiceRow
          num="05"
          title="AR Reality"
          kicker="Cover · Packaging · Video"
          media={{ src: "/images/services/service-type/augmented.svg", alt: "Ilustrasi AR Reality di cover buku tahunan" }}
        >
          <div data-row-fx>
            <p className="text-sm sm:text-base text-dark/85 leading-relaxed font-medium mb-5">
              Cover atau packaging bisa langsung memunculkan video, animasi, atau pesan khusus lewat kamera smartphone.
            </p>
            <PointsList points={AR_POINTS} />
          </div>
        </ServiceRow>

        {/* ===== 06 YEARBOOK DIGITAL ===== */}
        <ServiceRow
          num="06"
          title="Yearbook Digital"
          kicker="Flipbook · Lifetime"
          media={{ src: "/images/services/service-type/yearbook.svg", alt: "Ilustrasi yearbook digital flipbook" }}
          flip
        >
          <div data-row-fx>
            <p className="text-xs sm:text-[13px] text-dark/70 leading-relaxed font-medium mb-4 max-w-2xl">
              Buku tahunan kamu juga kita sediain versi digital (E-Book) yang bisa diakses kapan aja &amp; di mana aja. Gak perlu takut file hilang — arsip seumur hidup.
            </p>
            <PointsList points={EBOOK_POINTS} />
          </div>
        </ServiceRow>

        {/* ===== 07 MERCH ===== */}
        <ServiceRow
          num="07"
          title="Merchandise"
          kicker="Medali · Totebag · Photobooth · Baju"
          media={{ src: "/images/services/service-type/merch.svg", alt: "Ilustrasi merchandise angkatan" }}
        >
          <div data-row-fx>
            <EditorialList items={MERCH_ITEMS} />
          </div>
        </ServiceRow>

        {/* ===== CTA FULL ===== */}
        <div id="svc-cta" className="border-t-[3px] border-dark bg-dark text-[#FAF6F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-20">
            <div className="grid lg:grid-cols-12 gap-8 items-end">
              <h2 className="lg:col-span-7 font-playtimes text-[#FAF6F0] leading-[1.0] tracking-tight text-4xl sm:text-6xl">
                Butuh Layanan
                <br />
                <span className="text-orange">Khusus?</span>
              </h2>
              <div className="lg:col-span-5">
                <p className="text-sm text-[#FAF6F0]/70 leading-relaxed font-medium mb-6">
                  Konsultasi langsung via WhatsApp — tim kami siap bantu susun paket sesuai kebutuhan sekolahmu.
                </p>
                <a
                  href={waLink(WA_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-orange text-[#FAF6F0] font-headline font-black text-xs sm:text-sm uppercase tracking-widest px-7 py-4 border-3 border-[#FAF6F0]/20 shadow-[5px_6px_0px_rgba(250,246,240,0.15)] hover:shadow-[2px_3px_0px_rgba(250,246,240,0.15)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
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
