/**
 * Detail layanan Fourjective — 9 sub-layanan yang dulu tersebar di
 * /services (video, editing, photoshoot, cover, layout, spesifikasi,
 * digital, AR, merch). Sekarang satu sumber tunggal.
 */

export type PilarId = "yearbook" | "event" | "studio" | "merch";

export interface ServiceDetail {
  id: string;
  pilar: PilarId;
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  points: string[];
}

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    id: "video",
    pilar: "event",
    num: "01",
    title: "Video Service",
    subtitle: "Sinematik 4K",
    desc: "Video sinematik singkat yang rangkum semua keseruan angkatan lo. Cocok buat teaser, recap, atau diputar di acara.",
    points: [
      "Tim SPV film khusus menjaga presisi",
      "Drone berlisensi + Sony Cinema FX",
      "Teaser 60 detik + aftermovie",
    ],
  },
  {
    id: "editing",
    pilar: "studio",
    num: "02",
    title: "Editing Service",
    subtitle: "Photo & Video",
    desc: "Biar tone foto lo lebih hidup, lebih estetik, dan lebih kekinian. Photo editing untuk kebutuhan layout, video editing dengan color grading sinematik.",
    points: [
      "Photo editing: retouch natural per siswa",
      "Video editing: color grading sinematik",
      "Revisi tanpa batas pada tahap layout",
    ],
  },
  {
    id: "photoshoot",
    pilar: "studio",
    num: "03",
    title: "Photoshoot Service",
    subtitle: "Mobile Studio",
    desc: "Properti foto dari vendor (S&K) dan tema sesuai request. Mobile studio datang ke sekolah, jadi pose kaku tidak ada.",
    points: [
      "Mobile studio set lengkap",
      "Tema & moodboard sesuai request",
      "350+ konsep orisinal, skin retouching natural",
    ],
  },
  {
    id: "cover",
    pilar: "yearbook",
    num: "04",
    title: "Book Service",
    subtitle: "Design Cover",
    desc: "Simple, clean, timeless cocok untuk konsep minimalis. Lebih rame dan berani main elemen visual untuk yang ingin desain variatif tapi tetap estetik.",
    points: [
      "Cover doff velvet / art paper premium",
      "Spot UV, foil emas, laminasi doff",
      "Dummy cover disetujui komite sebelum cetak",
    ],
  },
  {
    id: "layout",
    pilar: "yearbook",
    num: "05",
    title: "Book Service",
    subtitle: "Design Layout",
    desc: "Grid & tipografi orisinal yang dirancang dari nol, menemani setiap halaman. Preview digital dikirim sebelum masuk mesin cetak.",
    points: [
      "Layout per halaman dikerjakan manual",
      "Tipografi & griding eksklusif",
      "Preview digital sebelum cetak",
    ],
  },
  {
    id: "spec",
    pilar: "yearbook",
    num: "06",
    title: "Product Specification",
    subtitle: "Kertas & Halaman",
    desc: "Mengikuti jumlah pax, memakai Art/Matte Paper 150gsm dengan jahit pur-binding presisi.",
    points: [
      "Art/Matte Paper 150gsm",
      "Jumlah halaman mengikuti pax",
      "Jahit pur-binding & foil emas",
    ],
  },
  {
    id: "digital",
    pilar: "yearbook",
    num: "07",
    title: "Yearbook Digital",
    subtitle: "E-Book / Flipbook 3D",
    desc: "Buku tahunan kamu juga kami sediakan versi digital yang bisa diakses kapan aja & di mana aja. Tidak perlu takut file hilang, karena arsip file kamu disimpan seumur hidup.",
    points: [
      "Bisa dibuka lewat HP, tablet, laptop",
      "Portal berpassword untuk alumni & guru",
      "Arsip file disimpan seumur hidup",
    ],
  },
  {
    id: "ar",
    pilar: "yearbook",
    num: "08",
    title: "Augmented Reality",
    subtitle: "Cover Interaktif",
    desc: "Cover atau packaging bisa langsung memunculkan video, animasi, atau pesan khusus lewat kamera smartphone.",
    points: [
      "Cover & packaging interaktif",
      "Scan langsung lewat kamera smartphone",
      "Video, animasi, pesan khusus",
    ],
  },
  {
    id: "merch",
    pilar: "merch",
    num: "09",
    title: "Merchandise Yearbook",
    subtitle: "Medali & Totebag",
    desc: "Biar makin eksklusif & memorable. Pelengkap angkatan yang siap dipakai saat hari Pencil.",
    points: [
      "Medali akrilik + tali garis-garis",
      "Totebag kanvas & costume angkatan",
      "Packaging box magnetik eksklusif",
    ],
  },
];

export const PILAR_LABEL: Record<PilarId, string> = {
  yearbook: "Buku Tahunan",
  event: "Event & Video",
  studio: "Studio Shoot",
  merch: "Merchandise",
};
