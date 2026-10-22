/**
 * Data portfolio Fourjective — sumber tunggal untuk landing (#portfolio)
 * dan halaman /portofolio.
 */

export type WorkTone = "blue" | "navy" | "sky" | "light";

export interface WorkItem {
  src: string;
  alt: string;
  index: string;
  spec: string;
  place: string;
  tag: string;
  title: string;
  desc: string;
  aspect: string;
  sticker?: string;
  tone: WorkTone;
}

export const WORK_COLUMNS: WorkItem[][] = [
  [
    {
      src: "https://cdn.prod.website-files.com/65d4758de33eca00784c7a5f/67b7de096148969cdc51584b_COVER%20DEPAN%20SMA%20MONDIAL%20BATAM.png",
      alt: "SMA Mondial Batam",
      index: "01",
      spec: "HARDCOVER DOFF",
      place: "BATAM • 2024",
      tag: "#LUXURY_DOFF",
      title: "SMA Mondial Batam",
      desc: "Cover doff velvet tahan gores dengan timbul Spot UV presisi.",
      aspect: "aspect-[3/4]",
      tone: "blue",
    },
    {
      src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      alt: "Cyber Y2K Editorial Shoot",
      index: "02",
      spec: "EDITORIAL THEME",
      place: "ANGKATAN 2025",
      tag: "#CYBER_Y2K",
      title: "The Nostalgic Crew",
      desc: "Konsep visual out-of-the-box dengan color grading film retro 90s.",
      aspect: "aspect-[4/5]",
      sticker: "/images/loonart/hero_sticker_asset5.png",
      tone: "navy",
    },
    {
      src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      alt: "Classroom Wes Anderson",
      index: "03",
      spec: "SYMMETRIC SHOT",
      place: "BANDUNG • 2025",
      tag: "#WES_ANDERSON",
      title: "SMAN 3 Bandung",
      desc: "Palet warna pastel simetris dengan wardrobe tematik vintage corduroy.",
      aspect: "aspect-[16/11]",
      tone: "sky",
    },
    {
      src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
      alt: "Sunset Rooftop",
      index: "04",
      spec: "OUTDOOR ROOFTOP",
      place: "BALI • 2024",
      tag: "#GOLDEN_HOUR",
      title: "SMAN 1 Denpasar",
      desc: "Sesi senja dramatis dengan siluet hangat matahari Bali.",
      aspect: "aspect-[3/4]",
      tone: "light",
    },
  ],
  [
    {
      src: "https://cdn.prod.website-files.com/65d4758de33eca00784c7a5f/67b7ddf924f0e6c1f41d180a_COVER%20DEPAN%20SMAN%205%20SAMARINDA.png",
      alt: "SMAN 5 Samarinda",
      index: "05",
      spec: "FULLCOLOR ART",
      place: "SAMARINDA • 2024",
      tag: "#FULLCOLOR_ART",
      title: "SMAN 5 Samarinda",
      desc: "Kertas Art Paper 150gr cetak offset Jerman anti-pudar seumur hidup.",
      aspect: "aspect-[3/4]",
      tone: "navy",
    },
    {
      src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      alt: "Youth Editorial Studio",
      index: "06",
      spec: "STUDIO SETTING",
      place: "ANGKATAN 2025",
      tag: "#EDITORIAL_RETRO",
      title: "Classic Youth Chemistry",
      desc: "Lighting studio multi-point dengan dynamic pose arahan art director.",
      aspect: "aspect-[4/5]",
      sticker: "/images/loonart/hero_sticker_asset8.png",
      tone: "blue",
    },
    {
      src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
      alt: "SMA Taruna Nusantara",
      index: "07",
      spec: "EDITORIAL PORTRAIT",
      place: "MAGELANG • 2025",
      tag: "#FORMAL_CINEMA",
      title: "SMA Taruna Nusantara",
      desc: "Elegansi kedisiplinan berpadu dengan grading warna cinematic film.",
      aspect: "aspect-[3/4]",
      tone: "light",
    },
    {
      src: "https://cdn.prod.website-files.com/65d4758de33eca00784c7a5f/67b7ddd15a54e7599d258fe3_COVER%20DEPAN%20SMAK%20PETRA%201%20SURABAYA.png",
      alt: "SMAK Petra 1 Surabaya",
      index: "08",
      spec: "RIGID BOX",
      place: "SURABAYA • 2024",
      tag: "#GOLD_FOIL",
      title: "SMAK Petra 1 Surabaya",
      desc: "Kemasan box magnetik tebal eksklusif dengan foil emas hot-stamping.",
      aspect: "aspect-[3/4]",
      tone: "sky",
    },
  ],
  [
    {
      src: "https://cdn.prod.website-files.com/65d4758de33eca00784c7a5f/67b7de043c61e4ee38d5bdde_COVER%20DEPAN%20SMAN%205%20MAKASSAR%201.png",
      alt: "SMAN 5 Makassar",
      index: "09",
      spec: "LINEN THREAD",
      place: "MAKASSAR • 2024",
      tag: "#LINEN_COVER",
      title: "SMAN 5 Makassar",
      desc: "Buku tebal dijahit benang kokoh dapat terbuka 180 derajat rata sempurna.",
      aspect: "aspect-[3/4]",
      tone: "blue",
    },
    {
      src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
      alt: "Youth Classroom Story",
      index: "10",
      spec: "CANDID MOMENT",
      place: "ANGKATAN 2025",
      tag: "#RETRO_POP",
      title: "The Brotherhood",
      desc: "Tawa autentik masa putih abu-abu yang tak bisa diulang dua kali.",
      aspect: "aspect-[4/5]",
      sticker: "/images/loonart/hero_sticker_asset9.png",
      tone: "navy",
    },
    {
      src: "https://cdn.prod.website-files.com/65d4758ce33eca00784c7a05/6602417b7a3303264fe482dc_ARTIKEL-2.jpg",
      alt: "Aerial Drone Shoot",
      index: "11",
      spec: "4K DRONE SHOT",
      place: "JAKARTA • 2025",
      tag: "#AERIAL_4K",
      title: "SMAN 8 Jakarta",
      desc: "Footage aerial drone 4K megah berpadu koreografi formasi angkatan.",
      aspect: "aspect-[16/10]",
      tone: "sky",
    },
    {
      src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
      alt: "Graduation Aftermovie",
      index: "12",
      spec: "PROM NIGHT",
      place: "AFTERMOVIE 2024",
      tag: "#FESTIVAL_NIGHT",
      title: "A Night To Remember",
      desc: "Dokumentasi aftermovie sinematik untuk malam perpisahan legendaris.",
      aspect: "aspect-[4/5]",
      sticker: "/images/loonart/hero_sticker_asset16.png",
      tone: "light",
    },
  ],
];

export const ALL_WORKS: WorkItem[] = WORK_COLUMNS.flat();

export const WORK_TAGS = [
  { label: "#HIGH_FASHION", tone: "bg-white text-dark border-dark hover:bg-brand-300" },
  { label: "#CYBER_Y2K", tone: "bg-white text-dark border-dark hover:bg-brand-400" },
  { label: "#WES_ANDERSON", tone: "bg-white text-dark border-dark hover:bg-sky-400" },
  { label: "#GOLDEN_HOUR", tone: "bg-white text-dark border-dark hover:bg-cyan-400" },
];
