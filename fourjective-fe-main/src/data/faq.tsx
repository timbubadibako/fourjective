import React from "react";

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answerContent: React.ReactNode;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-harga",
    category: "HARGA & PAKET",
    question: "Berapa harga paket buku tahunan di Fourjectiv?",
    answerContent: (
      <div className="space-y-3 font-sans text-sm sm:text-base text-dark/75 leading-relaxed">
        <p>
          Harga menyesuaikan jumlah halaman (40–180 hal), ukuran buku (A4/A5/B5/custom), jenis cover (soft, hard, 3D), dan spesifikasi tambahan seperti pop-up, spot UV, emboss, hingga AR.
        </p>
        <p className="border-l-2 border-orange pl-3.5 text-xs sm:text-sm text-dark/85 font-medium">
          Simulasi rincian iuran per siswa bisa dicoba langsung di <strong className="text-orange font-bold">/portal</strong> atau via WhatsApp.
        </p>
      </div>
    ),
  },
  {
    id: "faq-layanan",
    category: "LAYANAN LENGKAP",
    question: "Layanan apa saja yang tersedia di Fourjectiv?",
    answerContent: (
      <div className="space-y-3 font-sans text-sm sm:text-base text-dark/75 leading-relaxed">
        <p>
          End-to-end Yearbook Organizing: photoshoot konsep (indoor/outdoor/delivery studio), produksi sinematik (short movie &amp; rewind), desain layout majalah editorial, cetak offset bergaransi, 3D Virtual Flipbook, hingga merchandise angkatan.
        </p>
        <p className="border-l-2 border-orange pl-3.5 text-xs sm:text-sm text-dark/85 font-medium">
          Rincian kapabilitas studio ada di katalog paket layanan kami.
        </p>
      </div>
    ),
  },
  {
    id: "faq-custom",
    category: "CUSTOM DESAIN",
    question: "Bisa request desain & konsep sesuai identitas angkatan?",
    answerContent: (
      <div className="space-y-3 font-sans text-sm sm:text-base text-dark/75 leading-relaxed">
        <p>
          <strong className="text-dark font-bold">Ya, 100% bisa custom.</strong> Bebas request tema foto/video, konsep layout, tipografi, hingga cover buku agar sesuai dengan identitas dan cerita angkatan sekolahmu.
        </p>
      </div>
    ),
  },
  {
    id: "faq-alur",
    category: "ALUR KERJA & TERMIN",
    question: "Bagaimana sistem pembayaran dan alur kerja sama?",
    answerContent: (
      <div className="space-y-3 font-sans text-sm sm:text-base text-dark/75 leading-relaxed">
        <p>
          Meeting proposal &rarr; MOU kontrak resmi &rarr; Pembayaran bertahap (Termin 1 DP, Termin 2 layout, Termin 3 pelunasan) &rarr; Produksi (foto, edit, cetak) &rarr; Pengiriman hasil akhir sebelum wisuda.
        </p>
      </div>
    ),
  },
  {
    id: "faq-digital",
    category: "TEKNOLOGI DIGITAL",
    question: "Apakah tersedia Yearbook Digital selain buku fisik?",
    answerContent: (
      <div className="space-y-3 font-sans text-sm sm:text-base text-dark/75 leading-relaxed">
        <p>
          <strong className="text-dark font-bold">Ada.</strong> Tersedia <strong className="text-dark font-bold">Yearbook Digital (E-book / 3D Virtual Flipbook)</strong> dan integrasi <strong className="text-dark font-bold">Augmented Reality (AR)</strong> agar video dan animasi foto bisa discan langsung lewat smartphone.
        </p>
      </div>
    ),
  },
];
