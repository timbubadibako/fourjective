/**
 * Single source of truth untuk data kontak & navigasi Fourjective.
 * Dipakai oleh seluruh halaman (landing + sub-page + dashboard).
 *
 * CATATAN: nomor WhatsApp & email di sini adalah satu-satunya sumber.
 * Jangan menulis nomor/email secara literal di komponen.
 */

export const SITE = {
  brand: "Fourjective",
  legalName: "Fourjective Creative Studio",
  shortMark: "4J",
  tagline: "Do The Best For The Best Moment",
  est: "2021",

  /** Nomor WhatsApp utama (format internasional tanpa +) */
  whatsapp: "6285157386631",
  /** Tampilan ramah */
  whatsappDisplay: "+62 851-5738-6631",

  /** Email utama */
  email: "fourjectiv@gmail.com",
  /** Email lama (arsip) */
  emailLegacy: "fourjectivestudio@gmail.com",

  address: "Kuningan, Jawa Barat, Indonesia",
  addressShort: "Kuningan, Jawa Barat",

  cities: ["Kuningan (HQ)", "Cirebon", "Jabodetabek", "Bandung", "Surabaya", "Seluruh Indonesia"],

  socials: {
    whatsapp: "https://wa.me/6285157386631",
    tiktok: "https://www.tiktok.com/@fourjectiv?is_from_webapp=1&sender_device=pc",
    instagram:
      "https://www.instagram.com/fourjectiv?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    gmail: "mailto:fourjectiv@gmail.com",
  },
} as const;

/** Link WhatsApp dengan pesan otomatis (encoded). */
export function waLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Pesan default per konteks. */
export const WA_MESSAGES = {
  general: "Halo Fourjective! Saya ingin konsultasi paket buku tahunan untuk sekolah kami.",
  sample: "Halo Fourjective! Kami ingin request buku sampel fisik buku tahunan ke sekolah kami.",
  calculator:
    "Halo Fourjective! Saya sudah menghitung estimasi biaya di kalkulator dan ingin konsultasi lebih lanjut.",
  contact: "Halo Fourjective! Saya ingin terhubung dengan tim Fourjective.",
} as const;

export type NavLink = {
  label: string;
  /** Route absolut — dipakai saat berada di halaman selain landing */
  route: string;
  /** Hash anchor di landing — dipakai saat berada di "/" */
  hash: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", route: "/", hash: "#hero-fullscreen" },
  { label: "Paket", route: "/paket", hash: "/paket" },
  { label: "Layanan", route: "/services", hash: "/services" },
  { label: "Portofolio", route: "/portofolio", hash: "/portofolio" },
  { label: "Testimoni", route: "/testimoni", hash: "/testimoni" },
  { label: "Tentang Kami", route: "/about", hash: "/about" },
];

/**
 * Resolusi link navigasi yang aman terhadap konteks route.
 * Di landing => hash anchor. Di halaman lain => route absolut.
 */
export function resolveNavHref(pathname: string, link: NavLink): string {
  return pathname === "/" ? link.hash : link.route;
}
