export interface TimelineTask {
  id: string;
  category: "Pra-Produksi" | "Photoshoot & Video" | "Desain Cover" | "Editing & Grading" | "Layout & Dummy" | "Cetak & Packaging";
  title: string;
  duration: string;
  assignedTo: "Fourjective" | "Client" | "Vendor";
  done: boolean;
  notes?: string;
}

export const FOURJECTIVE_PRODUCTION_TASKS: TimelineTask[] = [
  // 1. Pra-Produksi
  {
    id: "task-01",
    category: "Pra-Produksi",
    title: "Meeting 1 dgn PM & Brief Konsep",
    duration: "1 hari",
    assignedTo: "Fourjective",
    done: true,
    notes: "Pengenalan alur kerja, pengumpulan tema angkatan",
  },
  {
    id: "task-02",
    category: "Pra-Produksi",
    title: "Meeting 2 dgn Project Officer",
    duration: "1 hari",
    assignedTo: "Fourjective",
    done: true,
    notes: "Penyusunan jadwal rundown per kelas",
  },
  {
    id: "task-03",
    category: "Pra-Produksi",
    title: "Pembuatan Moodboard & Visual Direction",
    duration: "1 minggu",
    assignedTo: "Fourjective",
    done: true,
    notes: "Referensi wardrobe, tone warna & lokasi photoshoot",
  },
  {
    id: "task-04",
    category: "Pra-Produksi",
    title: "Fiksasi Moodboard & Pengesahan Konsep",
    duration: "1 hari",
    assignedTo: "Client",
    done: true,
    notes: "Persetujuan final panitia sekolah",
  },

  // 2. Photoshoot & Video
  {
    id: "task-05",
    category: "Photoshoot & Video",
    title: "Sesi Photoshoot Utama (Studio / On-Location)",
    duration: "5 hari",
    assignedTo: "Fourjective",
    done: true,
    notes: "Foto tema kelas, foto guru, & foto individu siswa",
  },
  {
    id: "task-06",
    category: "Photoshoot & Video",
    title: "Editing Video BTS (Behind The Scenes)",
    duration: "3 hari",
    assignedTo: "Fourjective",
    done: true,
    notes: "Kompilasi keseruan momen saat foto",
  },
  {
    id: "task-07",
    category: "Photoshoot & Video",
    title: "Editing Video Trend & Reels Medsos",
    duration: "3 hari",
    assignedTo: "Fourjective",
    done: true,
    notes: "Format vertikal 9:16 untuk promosi angkatan",
  },
  {
    id: "task-08",
    category: "Photoshoot & Video",
    title: "Editing Video Aftermovie 4K Utama",
    duration: "4 hari",
    assignedTo: "Fourjective",
    done: true,
    notes: "Kompilasi sinematik angkatan",
  },
  {
    id: "task-09",
    category: "Photoshoot & Video",
    title: "Preview & Screening Video Aftermovie",
    duration: "2 hari",
    assignedTo: "Client",
    done: true,
    notes: "Review video sebelum render final",
  },

  // 3. Desain Cover
  {
    id: "task-10",
    category: "Desain Cover",
    title: "Desain Cover Buku & Packaging Mockup",
    duration: "2 minggu",
    assignedTo: "Fourjective",
    done: false,
    notes: "Eksplorasi foil emboss, jilid hardcover, & box kado",
  },
  {
    id: "task-11",
    category: "Desain Cover",
    title: "Review Cover oleh Panitia (Mayor / Minor)",
    duration: "1 minggu",
    assignedTo: "Client",
    done: false,
    notes: "Pengecekan judul, lambang sekolah & estetika jilid",
  },
  {
    id: "task-12",
    category: "Desain Cover",
    title: "Revisi Desain Cover Studio",
    duration: "5 hari",
    assignedTo: "Fourjective",
    done: false,
    notes: "Penyempurnaan draf sesuai masukan panitia",
  },

  // 4. Editing & Grading
  {
    id: "task-13",
    category: "Editing & Grading",
    title: "Color Grading & Retouching Foto Master",
    duration: "1 minggu",
    assignedTo: "Fourjective",
    done: true,
    notes: "Standardisasi skin-tone dan pencahayaan",
  },
  {
    id: "task-14",
    category: "Editing & Grading",
    title: "Client Rename & Seleksi Foto Siswa",
    duration: "7 hari",
    assignedTo: "Client",
    done: true,
    notes: "Penyesuaian nama siswa dengan nomor urut bio",
  },
  {
    id: "task-15",
    category: "Editing & Grading",
    title: "Final Touch-up & Enkripsi Berkas Foto",
    duration: "5 hari",
    assignedTo: "Fourjective",
    done: true,
    notes: "Upload master RAW ke Cloudflare R2",
  },

  // 5. Layout & Dummy
  {
    id: "task-16",
    category: "Layout & Dummy",
    title: "Desain Layout Buku Keseluruhan (Indesign)",
    duration: "2 minggu",
    assignedTo: "Fourjective",
    done: true,
    notes: "Penyusunan halaman guru, artikel & profil kelas",
  },
  {
    id: "task-17",
    category: "Layout & Dummy",
    title: "Revisi Layout Siswa (Minor / Teks Bio)",
    duration: "5 hari",
    assignedTo: "Client",
    done: false,
    notes: "Pemeriksaan typo nama, kutipan & biodata",
  },
  {
    id: "task-18",
    category: "Layout & Dummy",
    title: "Crosscheck Layout & Final Design ACC",
    duration: "3 hari",
    assignedTo: "Fourjective",
    done: false,
    notes: "Pemeriksaan bleed garis potong dan resolusi cetak",
  },
  {
    id: "task-19",
    category: "Layout & Dummy",
    title: "Penandatanganan Surat Siap Cetak (ACC Dummy)",
    duration: "1 hari",
    assignedTo: "Client",
    done: false,
    notes: "Dokumen sah persetujuan cetak massal",
  },

  // 6. Cetak & Packaging
  {
    id: "task-20",
    category: "Cetak & Packaging",
    title: "Proses Cetak Mesin Offset & Laminasi",
    duration: "3-4 minggu",
    assignedTo: "Vendor",
    done: false,
    notes: "Cetak isi halaman art paper 150gr & penjilidan benang",
  },
  {
    id: "task-21",
    category: "Cetak & Packaging",
    title: "Finishing Jilid & Pembuatan Box Packaging",
    duration: "1-2 minggu",
    assignedTo: "Vendor",
    done: false,
    notes: "Pembuatan sleeve, merchandise & packaging pelindung",
  },
  {
    id: "task-22",
    category: "Cetak & Packaging",
    title: "Quality Control & Ekspedisi Pengiriman",
    duration: "3 hari",
    assignedTo: "Fourjective",
    done: false,
    notes: "Pengecekan halaman cacat sebelum buku diserahterimakan",
  },
];
