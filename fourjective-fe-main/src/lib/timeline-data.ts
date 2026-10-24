export interface TimelineTask {
  id: string;
  category: "Pra-Produksi" | "Photoshoot & Video" | "Desain Cover" | "Editing & Grading" | "Layout & Dummy" | "Cetak & Packaging";
  title: string;
  duration: string;
  assignedTo: "Fourjective" | "Client" | "Vendor";
  done: boolean;
  notes?: string;
}

export interface SchoolTimelineData {
  schoolName: string;
  code: string;
  projectManager: string;
  year: string;
  tasks: TimelineTask[];
}

// Master 22 Task Timeline Fourjective - Sampel Tunggal Terpilih: Pesantren Al-Hamidiyah 2026 (Sheet 1 XLSX TIMELINE 2026)
export const FOURJECTIVE_PRODUCTION_TASKS: TimelineTask[] = [
  // 1. Pra-Produksi
  {
    id: "task-01",
    category: "Pra-Produksi",
    title: "Meeting 1 dgn PM",
    duration: "1 hari",
    assignedTo: "Fourjective",
    done: true,
    notes: "Pengenalan alur kerja, pengumpulan konsep & fiksasi PIC",
  },
  {
    id: "task-02",
    category: "Pra-Produksi",
    title: "Meeting 2 dgn Project Officer",
    duration: "1 hari",
    assignedTo: "Fourjective",
    done: true,
    notes: "Rundown jadwal photoshoot per kelas & divisi",
  },
  {
    id: "task-03",
    category: "Pra-Produksi",
    title: "Pembuatan Moodboard",
    duration: "1 minggu",
    assignedTo: "Fourjective",
    done: true,
    notes: "Referensi wardrobe, palet warna, & lokasi pemotretan",
  },
  {
    id: "task-04",
    category: "Pra-Produksi",
    title: "Meeting 3 FIKSASI Konsep",
    duration: "1 hari",
    assignedTo: "Client",
    done: true,
    notes: "Persetujuan final konsep dan moodboard oleh pihak sekolah",
  },

  // 2. Photoshoot & Video
  {
    id: "task-05",
    category: "Photoshoot & Video",
    title: "Photoshoot Sesi Utama (14-15 Januari)",
    duration: "2 hari",
    assignedTo: "Fourjective",
    done: true,
    notes: "Foto tema kelas, foto guru, & foto individu siswa",
  },
  {
    id: "task-06",
    category: "Photoshoot & Video",
    title: "Editing Video BTS",
    duration: "1 hari",
    assignedTo: "Fourjective",
    done: true,
    notes: "Kompilasi dokumentasi di balik layar proses photoshoot",
  },
  {
    id: "task-07",
    category: "Photoshoot & Video",
    title: "Editing Video Trend & Medsos",
    duration: "1 minggu",
    assignedTo: "Fourjective",
    done: true,
    notes: "Format video pendek vertikal untuk promosi angkatan",
  },
  {
    id: "task-08",
    category: "Photoshoot & Video",
    title: "Editing Video Aftermovie 4K",
    duration: "1 bulan",
    assignedTo: "Fourjective",
    done: true,
    notes: "Film dokumenter sinematik kilas balik angkatan",
  },

  // 3. Desain Cover & Packaging
  {
    id: "task-09",
    category: "Desain Cover",
    title: "Start Pembuatan Cover Design (Progres 1)",
    duration: "2 minggu",
    assignedTo: "Fourjective",
    done: true,
    notes: "Eksplorasi tipografi judul, foil emboss, & bahan jilid",
  },
  {
    id: "task-10",
    category: "Desain Cover",
    title: "Client Revisi Design Cover (Mayor/Minor)",
    duration: "1 minggu",
    assignedTo: "Client",
    done: true,
    notes: "Pemeriksaan judul, logo sekolah & visual cover oleh panitia",
  },
  {
    id: "task-11",
    category: "Desain Cover",
    title: "Vendor / Studio Revisi Design Cover",
    duration: "5-10 hari",
    assignedTo: "Fourjective",
    done: true,
    notes: "Penyempurnaan vector cover siap cetak",
  },
  {
    id: "task-12",
    category: "Desain Cover",
    title: "Vendor Design Packaging & Box",
    duration: "1-2 minggu",
    assignedTo: "Fourjective",
    done: true,
    notes: "Pembuatan pola die-cut box packaging pelindung buku",
  },
  {
    id: "task-13",
    category: "Desain Cover",
    title: "Client Revisi & Final Design Packaging",
    duration: "1 minggu",
    assignedTo: "Client",
    done: true,
    notes: "Persetujuan mock-up packaging dan merchandise pendukung",
  },

  // 4. Editing & Grading
  {
    id: "task-14",
    category: "Editing & Grading",
    title: "Color Grading Foto Master",
    duration: "1 minggu",
    assignedTo: "Fourjective",
    done: true,
    notes: "Standardisasi tone warna & skin-tone foto angkatan",
  },
  {
    id: "task-15",
    category: "Editing & Grading",
    title: "Client Revisi Grading & Vendor Penyesuaian",
    duration: "5 hari",
    assignedTo: "Client",
    done: true,
    notes: "Koreksi pencahayaan & tone warna sesuai instruksi sekolah",
  },
  {
    id: "task-16",
    category: "Editing & Grading",
    title: "Client Rename & Seleksi Foto",
    duration: "5 hari",
    assignedTo: "Client",
    done: false,
    notes: "Penyesuaian nama berkas foto dengan biodata resmi siswa",
  },

  // 5. Layout & Dummy
  {
    id: "task-17",
    category: "Layout & Dummy",
    title: "Finishing Design Layout Keseluruhan",
    duration: "2 minggu",
    assignedTo: "Fourjective",
    done: true,
    notes: "Penyusunan tata letak halaman profil kelas & guru",
  },
  {
    id: "task-18",
    category: "Layout & Dummy",
    title: "Client Revisi Design Layout (Mayor & Minor)",
    duration: "1 minggu",
    assignedTo: "Client",
    done: true,
    notes: "Pemeriksaan typo nama, kutipan bio, & nomor urut",
  },
  {
    id: "task-19",
    category: "Layout & Dummy",
    title: "Crosscheck Layout & Final Design ACC",
    duration: "3-5 hari",
    assignedTo: "Fourjective",
    done: false,
    notes: "Pemeriksaan bleed garis potong dan resolusi 300 DPI",
  },
  {
    id: "task-20",
    category: "Layout & Dummy",
    title: "Pengiriman Dummy & Crosscheck Dummy Fisik",
    duration: "3 hari",
    assignedTo: "Client",
    done: false,
    notes: "Pemeriksaan 1 eksemplar fisik buku dummy hasil cetak draf",
  },
  {
    id: "task-21",
    category: "Layout & Dummy",
    title: "Client Menandatangani Surat Cetak (ACC Dummy)",
    duration: "2 hari",
    assignedTo: "Client",
    done: false,
    notes: "Dokumen sah persetujuan naik mesin cetak massal",
  },

  // 6. Cetak & Packaging
  {
    id: "task-22",
    category: "Cetak & Packaging",
    title: "Cetak Mesin Offset 1 Bulan & Ekspedisi Pengiriman",
    duration: "1 bulan",
    assignedTo: "Vendor",
    done: false,
    notes: "Cetak halaman isi art paper, jilid benang hardcover & pengiriman kurir",
  },
];

// Single sample data: Pesantren Al-Hamidiyah 2026
export const ACTIVE_SAMPLE_TIMELINE: SchoolTimelineData = {
  schoolName: "Pesantren Al-Hamidiyah",
  code: "ALHAM-2026",
  projectManager: "Veny Meilinda",
  year: "2025/2026",
  tasks: FOURJECTIVE_PRODUCTION_TASKS,
};
