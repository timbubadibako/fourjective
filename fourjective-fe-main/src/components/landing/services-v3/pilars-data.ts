import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  CalendarCheck,
  Camera,
  Film,
  Layout,
  Layers,
  Package,
  Palette,
  Play,
  Receipt,
  ShieldCheck,
  ShoppingBag,
  Shirt,
  Sparkles,
} from "lucide-react";

export type Pilar = {
  id: string;
  sticker: string;
  num: string;
  title: string;
  short: string;
  tagline: string;
  desc: string;
  points: string[];
  tint: string;
  accent: string;
  bg: string;
  img: string;
  icon: LucideIcon;
  facts: { label: string; value: string }[];
};

export const PILLARS: Pilar[] = [
  {
    id: "yearbook",
    sticker: "S1",
    num: "01",
    title: "Yearbook Production",
    short: "Buku Tahunan",
    tagline: "Cetak premium, garansi tepat waktu",
    desc: "Buku tahunan premium, satu tim dari konsep sampai cetak.",
    points: [
      "Cetak Heidelberg, jahit pur-binding",
      "Spot UV, foil emas, laminasi doff",
      "Bonus flipbook digital 3D seumur hidup",
    ],
    tint: "#0F2A6B",
    accent: "#60A5FA",
    bg: "/images/landing-page/our-services/yearbook-bg.svg",
    img: "/images/landing-page/our-services/yearbook-img.svg",
    icon: BookOpen,
    facts: [
      { label: "Buku Tercetak", value: "000+" },
      { label: "Tercetak", value: "100%" },
    ],
  },
  {
    id: "event",
    sticker: "S2",
    num: "02",
    title: "Event & Aftermovie",
    short: "Event & Video",
    tagline: "Event dan video, satu paket",
    desc: "Malam wisuda sampai film dokumenter, satu tim satu jadwal.",
    points: [
      "Drone berlisensi + Sony Cinema FX",
      "Dokumenter 10-15 menit, color grading",
      "Teaser 60 detik + photobooth instan",
    ],
    tint: "#0B2054",
    accent: "#38BDF8",
    bg: "/images/landing-page/our-services/video-bg.svg",
    img: "/images/landing-page/our-services/video-img.svg",
    icon: Film,
    facts: [
      { label: "Event Diransom", value: "000+" },
      { label: "Resolusi", value: "4K" },
    ],
  },
  {
    id: "studio",
    sticker: "S3",
    num: "03",
    title: "Creative Studio Shoot",
    short: "Studio Shoot",
    tagline: "Foto angkatan anti kaku",
    desc: "Mobile studio datang ke sekolah. Pose kaku, tidak ada.",
    points: [
      "Mobile studio set lengkap",
      "350+ konsep moodboard original",
      "Skin retouching natural per siswa",
    ],
    tint: "#123A7A",
    accent: "#93C5FD",
    bg: "/images/landing-page/our-services/photoshoot-bg.svg",
    img: "/images/landing-page/our-services/photoshoot-img.svg",
    icon: Camera,
    facts: [
      { label: "Konsep", value: "000+" },
      { label: "Tim", value: "000" },
    ],
  },
  {
    id: "merch",
    sticker: "S4",
    num: "04",
    title: "Merchandise & Print",
    short: "Merchandise",
    tagline: "Pelengkap angkatan, harga masuk akal",
    desc: "Medali, costume, tote bag, sampai cetak digital. Satu paket.",
    points: [
      "Medali, lanyard, sticker hologram",
      "Costume angkatan & tote bag kanvas",
      "Packaging box magnetik eksklusif",
    ],
    tint: "#0A1F4D",
    accent: "#22D3EE",
    bg: "/images/landing-page/our-services/merch-bg.svg",
    img: "/images/landing-page/our-services/merch-img.svg",
    icon: Shirt,
    facts: [
      { label: "Mitra", value: "000+" },
      { label: "Warna", value: "000+" },
    ],
  },
];

export const TICKER = [
  "#FOREVERYOUNG",
  "EMPAT PILAR SEKALIGUS",
  "SATU KONTRAK",
  "SATU TIM",
  "SATU JADWAL",
  "TANPA BIAYA KEJUTAN",
];

export const DELIVERABLES: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Palette, title: "Our Cover", desc: "Desain cover bersama tim" },
  { icon: Layout, title: "Our Layout", desc: "Grid & tipografi orisinal" },
  { icon: Layers, title: "Our Binding", desc: "Pur-binding jahit presisi" },
  { icon: Package, title: "Our Packaging", desc: "Box magnetik eksklusif" },
  { icon: Play, title: "Our Flipbook", desc: "Versi digital 3D" },
  { icon: Film, title: "Our Masterpiece", desc: "Dokumenter sinematik 4K" },
  { icon: ShoppingBag, title: "Our Additional", desc: "Merchandise angkatan" },
  { icon: Sparkles, title: "Our Pop Up", desc: "Event & photobooth" },
];

export const REASONS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Receipt,
    title: "Satu Kontrak, Satu Tim",
    desc: "Satu invoice, satu timetable, satu titik kontak.",
  },
  {
    icon: CalendarCheck,
    title: "Timeline Digaransi",
    desc: "Selesai sebelum hari wisuda. Kalau molor, responsibility kami.",
  },
  {
    icon: ShieldCheck,
    title: "Deliverable Terlihat",
    desc: "Output dikunci di awal kontrak. Tidak ada biaya dadakan.",
  },
];

export const STATS = [
  { k: "Fourjective Yearbook", v: "000+", d: "Sekolah Seluruh Indonesia" },
  { k: "Fourjective Event", v: "000+", d: "Event & Prom Night" },
  { k: "Fourjective Studio", v: "000+", d: "Sesi Foto & Booking" },
  { k: "Tri Color Print", v: "000+", d: "Mitra Produksi Lokal" },
];
