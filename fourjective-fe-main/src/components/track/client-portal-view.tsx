"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  BookOpen,
  Clock,
  Calculator,
  Layout,
  Folder,
  Layers,
  Sparkles,
  HardDrive,
  ShieldCheck,
  Check,
  Copy,
  ArrowUpRight,
  Download,
  PhoneCall,
  MessageCircle,
  LogOut,
  ExternalLink,
  ChevronRight,
  Plus,
  Eye,
  Lock,
  Globe,
  Camera,
  Printer,
  Truck,
  FileCheck2,
  Share2,
  QrCode,
  CheckCircle2,
  AlertCircle,
  FileText,
  Activity,
  FolderGit2,
  ArrowLeft,
} from "lucide-react";
import { SchoolFolderCard } from "@/app/components/dashboard/SchoolFolderCard";
import { WA_MESSAGES, waLink } from "@/lib/site";
import { ProjectData, submitProspectOrder } from "@/lib/supabase";

interface ClientPortalViewProps {
  kode: string;
  initialProject?: ProjectData | null;
}

type TabType = "catalog" | "pipeline" | "quotation" | "flipbook" | "contact";
type ViewMode = "split" | "folders" | "table";

interface ClassFolderData {
  id: string;
  folderName: string;
  year: number;
  studentCount: number;
  pageCount: number;
  fileSize: string;
  isLocked: boolean;
  theme: "orange-liquid" | "amber-fire" | "dark-marble" | "frosted-glass";
  category: string;
  lastUpdated: string;
}

const CLASS_FOLDERS: ClassFolderData[] = [
  {
    id: "mipa-1",
    folderName: "XII MIPA 1 — Photoshoot Outdoor",
    year: 2026,
    studentCount: 32,
    pageCount: 8,
    fileSize: "420 MB",
    isLocked: false,
    theme: "orange-liquid",
    category: "Kelas",
    lastUpdated: "Kemarin, 14:20",
  },
  {
    id: "mipa-2",
    folderName: "XII MIPA 2 — Studio Session",
    year: 2026,
    studentCount: 30,
    pageCount: 8,
    fileSize: "380 MB",
    isLocked: false,
    theme: "amber-fire",
    category: "Kelas",
    lastUpdated: "19 Okt 2026",
  },
  {
    id: "ips-1",
    folderName: "XII IPS 1 — Urban Vintage Theme",
    year: 2026,
    studentCount: 34,
    pageCount: 8,
    fileSize: "510 MB",
    isLocked: false,
    theme: "dark-marble",
    category: "Kelas",
    lastUpdated: "18 Okt 2026",
  },
  {
    id: "ips-2",
    folderName: "XII IPS 2 — Casual Monokrom",
    year: 2026,
    studentCount: 32,
    pageCount: 8,
    fileSize: "460 MB",
    isLocked: false,
    theme: "frosted-glass",
    category: "Kelas",
    lastUpdated: "17 Okt 2026",
  },
  {
    id: "guru",
    folderName: "Dokumentasi Guru & Karyawan",
    year: 2026,
    studentCount: 45,
    pageCount: 12,
    fileSize: "640 MB",
    isLocked: true,
    theme: "orange-liquid",
    category: "Fakultas",
    lastUpdated: "15 Okt 2026",
  },
  {
    id: "ekskul",
    folderName: "Ekskul & Kegiatan Angkatan",
    year: 2026,
    studentCount: 180,
    pageCount: 16,
    fileSize: "890 MB",
    isLocked: false,
    theme: "amber-fire",
    category: "Dokumentasi",
    lastUpdated: "14 Okt 2026",
  },
];

export function ClientPortalView({ kode, initialProject }: ClientPortalViewProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("catalog");
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  // === State Estimator Kas ===
  const [siswa, setSiswa] = useState<number>(initialProject?.student_count || 180);
  const [halaman, setHalaman] = useState<number>(initialProject?.page_count || 80);
  const [coverType, setCoverType] = useState<"hardcover" | "leather" | "acrylic">(
    initialProject?.cover_type || "hardcover"
  );
  const [includeVideo, setIncludeVideo] = useState(true);
  const [includeAR, setIncludeAR] = useState(false);
  const [includeMerch, setIncludeMerch] = useState(true);
  const [copied, setCopied] = useState(false);

  // === State Form Pemesanan ===
  const [picName, setPicName] = useState(initialProject?.pic_name || "");
  const [picPhone, setPicPhone] = useState(initialProject?.pic_whatsapp || "");
  const [targetGraduation, setTargetGraduation] = useState(
    initialProject?.target_graduation || "Mei 2026"
  );

  // === Perhitungan Harga Estimator ===
  const basePerPage = 1200;
  const coverPrices = { hardcover: 40000, leather: 75000, acrylic: 110000 };
  const addOns = (includeVideo ? 25000 : 0) + (includeAR ? 35000 : 0) + (includeMerch ? 45000 : 0);
  const pricePerStudent = Math.round(halaman * basePerPage + coverPrices[coverType] + addOns);
  const totalProjectPrice = pricePerStudent * siswa;

  const schoolName = initialProject?.school_name || "SMA Negeri 1 Jakarta";
  const gradYear = initialProject?.graduation_year || 2026;
  const currentStage = initialProject?.current_stage || 3;
  const pmName = initialProject?.pm_assigned || "Venny Meilinda";

  // Data dinamis dari Supabase (dengan fallback anggun jika belum ada)
  const milestones = initialProject?.project_milestones && initialProject.project_milestones.length > 0
    ? initialProject.project_milestones
    : [
        {
          id: "m1",
          project_id: "p1",
          step_number: 1,
          title: "Penandatanganan Kontrak & DP 30%",
          description: "MOU resmi angkatan telah disepakati dan jadwal photoshoot terkunci.",
          status: "done" as const,
          target_date: "10 Sep 2026",
        },
        {
          id: "m2",
          project_id: "p1",
          step_number: 2,
          title: "Sesi Foto Angkatan & Kelas",
          description: "Pemotretan outdoor tema kelas, sesi studio guru, dan video shoot selesai.",
          status: "done" as const,
          target_date: "04 Okt 2026",
        },
        {
          id: "m3",
          project_id: "p1",
          step_number: 3,
          title: "Desain Layout & Kurasi 80 Halaman",
          description: "Tim desainer grafis Fourjective sedang menata susunan foto & bio siswa.",
          status: "active" as const,
          target_date: "Sedang Berlangsung",
        },
        {
          id: "m4",
          project_id: "p1",
          step_number: 4,
          title: "Proofing Dummy & Revisi Panitia",
          description: "Pengecekan dummy digital sebelum dokumen naik ke mesin cetak Heidelberg.",
          status: "pending" as const,
          target_date: "Est. 15 Nov 2026",
        },
        {
          id: "m5",
          project_id: "p1",
          step_number: 5,
          title: "Proses Cetak, Jilid Hardcover & QC",
          description: "Pencetakan fisik, laminasi doff/glossy, jilid jahit benang hardcover kokoh.",
          status: "pending" as const,
          target_date: "Est. 10 Des 2026",
        },
        {
          id: "m6",
          project_id: "p1",
          step_number: 6,
          title: "Pengemasan Rapi & Pengiriman ke Sekolah",
          description: "Eksemplar buku dibungkus box rapi dan dikirim tepat waktu sebelum hari wisuda.",
          status: "pending" as const,
          target_date: "Est. 20 Des 2026",
        },
      ];

  const installments = initialProject?.payment_installments && initialProject.payment_installments.length > 0
    ? initialProject.payment_installments
    : [
        {
          id: "i1",
          project_id: "p1",
          installment_number: 1,
          title: "Termin 1 (DP 30%)",
          amount: 8910000,
          status: "paid" as const,
          due_date: "Lunas saat MOU",
          receipt_number: "INV-2026-001-LUNAS",
          notes: "Pembayaran kas DP 30% terverifikasi",
        },
        {
          id: "i2",
          project_id: "p1",
          installment_number: 2,
          title: "Termin 2 (40%)",
          amount: 11880000,
          status: "pending" as const,
          due_date: "Saat ACC Dummy Cetak",
          receipt_number: "INV-2026-002-PENDING",
          notes: "Jatuh tempo saat dummy disetujui",
        },
        {
          id: "i3",
          project_id: "p1",
          installment_number: 3,
          title: "Termin 3 (Pelunasan 30%)",
          amount: 8910000,
          status: "pending" as const,
          due_date: "Sebelum Buku Dikirim",
          receipt_number: "INV-2026-003-PENDING",
          notes: "Pelunasan sebelum pengiriman ekspedisi",
        },
      ];

  const deliverables = initialProject?.project_deliverables && initialProject.project_deliverables.length > 0
    ? initialProject.project_deliverables
    : [
        {
          id: "d1",
          project_id: "p1",
          file_type: "zip_photos" as const,
          file_name: "Galeri Foto Kelas Lengkap (Hi-Res).zip",
          file_size: "3.8 GB",
          r2_key: "schools/SMAN1-2026/photos-hires.zip",
          is_ready: true,
          download_count: 14,
        },
        {
          id: "d2",
          project_id: "p1",
          file_type: "master_pdf" as const,
          file_name: "Draf Dummy Layout 80 Halaman (Revisi 1).pdf",
          file_size: "184 MB",
          r2_key: "schools/SMAN1-2026/dummy-rev1.pdf",
          is_ready: true,
          download_count: 6,
        },
        {
          id: "d3",
          project_id: "p1",
          file_type: "video_4k" as const,
          file_name: "Trailer Aftermovie 4K (Rough Cut).mp4",
          file_size: "1.2 GB",
          r2_key: "schools/SMAN1-2026/aftermovie-rough.mp4",
          is_ready: false,
          download_count: 0,
        },
      ];

  const handleLogout = () => {
    router.push("/portal");
  };

  const handleCopySummary = () => {
    const summary = `
*ESTIMASI PENAWARAN BUKU TAHUNAN — FOURJECTIVE*
Kode Angkatan: ${kode}
Sekolah: ${schoolName} (${gradYear})
---------------------------------------------
- Jumlah Siswa: ${siswa} Siswa
- Jumlah Halaman: ${halaman} Halaman
- Spesifikasi Cover: ${coverType.toUpperCase()}
- Add-on: ${[includeVideo && "Video Aftermovie 4K", includeAR && "AR Scan Video", includeMerch && "Merchandise Angkatan"].filter(Boolean).join(", ") || "Tidak ada"}

Estimasi per Siswa: Rp ${pricePerStudent.toLocaleString("id-ID")}
Total Estimasi Proyek: Rp ${totalProjectPrice.toLocaleString("id-ID")}
---------------------------------------------
Kirim rincian ini ke tim Fourjective untuk dibuatkan draf kontrak MOU resmi.
    `.trim();

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Async record order ke Supabase
    submitProspectOrder({
      projectId: initialProject?.id,
      picName: picName || "Panitia",
      picWhatsapp: picPhone || "-",
      studentCount: siswa,
      pageCount: halaman,
      coverType,
      addons: [
        includeVideo && "Video Aftermovie 4K",
        includeAR && "AR Scan Video",
        includeMerch && "Merchandise Angkatan",
      ].filter(Boolean) as string[],
      estimatedPricePerStudent: pricePerStudent,
      totalEstimatedPrice: totalProjectPrice,
      targetGraduation,
    }).catch((err) => console.error("Error saving prospect order:", err));

    const msg = `Halo Tim Fourjective! Saya ${picName || "Panitia"} dari angkatan dengan kode *${kode}* (${schoolName} ${gradYear}) ingin mengajukan pemesanan & kontrak MOU:
- Jumlah Siswa: ${siswa}
- Halaman: ${halaman}
- Cover: ${coverType}
- Target Wisuda: ${targetGraduation}
- Estimasi per Siswa: Rp ${pricePerStudent.toLocaleString("id-ID")}
- No. WhatsApp PIC: ${picPhone || "-"}

Mohon segera diproses proposal & kontrak resminya. Terima kasih!`;
    window.open(waLink(msg), "_blank");
  };

  // Filter folder berdasarkan search bar
  const filteredFolders = CLASS_FOLDERS.filter((f) => {
    const query = (searchQuery || sidebarSearch).toLowerCase();
    if (!query) return true;
    return (
      f.folderName.toLowerCase().includes(query) ||
      f.category.toLowerCase().includes(query)
    );
  });

  const navMenuItems = [
    {
      key: "catalog" as TabType,
      title: "Katalog & Berkas Angkatan",
      icon: BookOpen,
      badge: `${CLASS_FOLDERS.length} Folder`,
    },
    {
      key: "pipeline" as TabType,
      title: "Alur & Pipeline Produksi",
      icon: Clock,
      badge: `Tahap ${currentStage}/6`,
      badgeColor: "bg-orange/20 text-orange border border-orange/30",
    },
    {
      key: "quotation" as TabType,
      title: "Kalkulator & Estimator Kas",
      icon: Calculator,
      badge: "Simulasi",
    },
    {
      key: "flipbook" as TabType,
      title: "Virtual Flipbook 3D",
      icon: Layers,
      badge: "Preview",
    },
    {
      key: "contact" as TabType,
      title: "Kontak PIC & Panduan",
      icon: PhoneCall,
      badge: "Online",
      badgeColor: "bg-emerald-950/60 text-emerald-400 border border-emerald-800",
    },
  ];

  // === RENDER JIKA KODE TIDAK DITEMUKAN / BELUM TERDAFTAR ===
  if (initialProject === null && kode !== "SMAN1-2026") {
    return (
      <div className="min-h-screen bg-[#F5F3EF] flex flex-col items-center justify-center p-6 text-dark selection:bg-orange selection:text-white">
        <div className="max-w-md w-full bg-white border-3 border-dark rounded-2xl p-7 sm:p-8 shadow-[6px_8px_0px_#14161C] text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-orange/15 text-orange flex items-center justify-center mx-auto border-2 border-orange">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div>
            <span className="font-mono text-[10px] font-black uppercase tracking-wider text-orange">
              KODE AKSES BELUM AKTIF
            </span>
            <h1 className="font-playtimes text-3xl font-bold text-dark mt-1">
              Kode Tidak Terdaftar
            </h1>
            <p className="font-sans text-xs text-dark/70 mt-2 leading-relaxed">
              Kode angkatan <strong className="font-mono text-dark bg-slate-100 px-1.5 py-0.5 rounded border border-dark/15">{kode}</strong> belum terdaftar di database Supabase Fourjective.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <Link
              href="/portal"
              className="w-full inline-flex items-center justify-center gap-2 bg-dark hover:bg-orange text-white font-headline font-black text-xs uppercase tracking-widest py-3 px-4 rounded-xl transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Coba Kode Lain</span>
            </Link>

            <a
              href={waLink(`Halo Kak Venny (PM Fourjective), saya ingin meminta aktivasi kode akses angkatan untuk sekolah saya.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-dark border-2 border-dark font-headline font-black text-xs uppercase tracking-widest py-3 px-4 rounded-xl transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-orange" />
              <span>Minta Kode ke PM Fourjective</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-[#F5F3EF]">
      {/* ================= FIXED-WIDTH SIDEBAR (MATCHING DASHBOARD 1:1) ================= */}
      <aside className="w-64 shrink-0 border-r border-[#222530] bg-[#121318] text-white flex flex-col h-screen sticky top-0 select-none">
        {/* Brand Header */}
        <div className="border-b border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange text-white font-headline font-black text-base shadow-[2px_2px_0px_#000] border border-white/20">
              4J
            </div>
            <div className="overflow-hidden">
              <h1 className="text-xs font-black text-white tracking-wider uppercase font-headline">
                FOURJECTIVE
              </h1>
              <p className="text-[10px] text-orange font-mono font-bold tracking-tight">
                Portal Sekolah &amp; Panitia
              </p>
            </div>
          </div>

          {/* Quick Filter inside Sidebar */}
          <div className="mt-3.5 relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40" />
            <input
              type="text"
              placeholder="Filter materi angkatan..."
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              className="w-full bg-[#1A1C24] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-white/40 outline-none focus:border-orange transition-colors font-mono"
            />
          </div>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
          {/* Main User Navigation */}
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/40 mb-2 px-2">
              Menu Utama Sekolah
            </p>
            <nav className="space-y-1">
              {navMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(item.key)}
                    className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-orange text-white shadow-md shadow-orange/20"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className="h-4 w-4 shrink-0 text-white" />
                      <span className="truncate font-headline">{item.title}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded shrink-0 ${
                          item.badgeColor || (isActive ? "bg-white/20 text-white" : "bg-white/10 text-white/70")
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Class Folders Sub-list (Folder Materi Kelas) */}
          <div>
            <div className="flex items-center justify-between px-2 mb-2">
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/40">
                Folder Materi Kelas
              </p>
              <span className="text-[9px] font-mono font-bold bg-white/10 text-white/70 px-1.5 py-0.2 rounded">
                {CLASS_FOLDERS.length} Folder
              </span>
            </div>

            <div className="space-y-1">
              {CLASS_FOLDERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setActiveTab("catalog");
                    setSelectedFolder(f.id);
                  }}
                  className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors cursor-pointer group ${
                    selectedFolder === f.id && activeTab === "catalog"
                      ? "bg-white/10 text-white font-bold"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Folder className="h-3.5 w-3.5 text-orange shrink-0" />
                    <span className="truncate font-sans text-xs">{f.folderName.split(" — ")[0]}</span>
                  </div>
                  <span className="text-[9px] font-mono text-white/40 group-hover:text-white/70">
                    {f.pageCount}p
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Public Tautan Singkat */}
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/40 mb-2 px-2">
              Tautan Eksternal
            </p>
            <nav className="space-y-1">
              <Link
                href="/paket"
                className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold text-white/70 hover:bg-white/5 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-orange" />
                  <span>Katalog Paket</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-white/40" />
              </Link>
              <Link
                href="/portofolio"
                className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold text-white/70 hover:bg-white/5 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5 text-orange" />
                  <span>Arsip Portofolio</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-white/40" />
              </Link>
            </nav>
          </div>
        </div>

        {/* Sidebar Footer: Cloud R2 Egress + PIC PM Status + Logout */}
        <div className="border-t border-white/10 p-3 bg-[#0E0F13]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono text-white/60">Cloudflare R2 Egress</span>
            <span className="text-[10px] font-mono font-black text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-1.5 py-0.2 rounded">
              $0 FREE
            </span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-orange rounded-full" style={{ width: "38%" }} />
          </div>
          <div className="flex justify-between items-center mt-1 text-[9px] font-mono text-white/40">
            <span>3.8 GB Terpakai</span>
            <span>10 GB Kuota</span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-orange/20 text-orange flex items-center justify-center font-mono text-[10px] font-black border border-orange/40">
                VM
              </div>
              <div className="overflow-hidden">
                <div className="text-[11px] font-bold text-white truncate font-headline">
                  {pmName}
                </div>
                <div className="text-[9px] font-mono text-emerald-400">
                  ● PM Online
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Keluar Portal"
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT CANVAS ================= */}
      <main className="flex-1 min-w-0 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Header Bar matching Dashboard layout */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-dark/10 bg-[#FAF6F0]/90 px-6 backdrop-blur-md">
          {/* Left: Breadcrumb & Title */}
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-orange animate-pulse" />
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-dark/50 font-bold uppercase tracking-wider">
                <span>Portal</span>
                <span>/</span>
                <span className="text-dark font-black">{schoolName} ({kode})</span>
                <span>/</span>
                <span className="text-orange">
                  {navMenuItems.find((m) => m.key === activeTab)?.title}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Storage Quota Bar & Status Badges */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 bg-white border border-dark/10 rounded-full px-4 py-1.5 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-dark/70">
                <HardDrive className="w-3.5 h-3.5 text-orange" />
                <span>Cloud Storage</span>
              </div>
              <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange rounded-full" style={{ width: "38%" }} />
              </div>
              <span className="text-[10px] font-mono font-bold text-dark/60">
                3.8 GB / 10 GB
              </span>
            </div>

            <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-mono font-bold text-dark border border-dark/10 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-bold">Tahap {currentStage}/6: Desain Layout</span>
            </div>

            <a
              href={waLink(`Halo Kak ${pmName} (PM Fourjective), saya panitia kode ${kode} dari ${schoolName} ingin koordinasi materi.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-orange text-white px-3.5 py-1.5 rounded-full text-xs font-mono font-black shadow-sm hover:translate-y-[-1px] transition-transform"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Chat PIC WA</span>
            </a>
          </div>
        </header>

        {/* Dynamic Page Content Area */}
        <div className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* ================= 1. OVERVIEW METRIC CARDS (DYNAMIC FROM SUPABASE) ================= */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 select-none">
            <div className="flex items-center justify-between rounded-2xl border border-dark/10 bg-white p-5 shadow-sm hover:shadow-md hover:border-orange/40 transition-all">
              <div>
                <p className="font-mono text-[11px] font-bold text-dark/50 uppercase tracking-wider">
                  Status Tahap Produksi
                </p>
                <h3 className="mt-1 text-2xl sm:text-3xl font-headline font-black tracking-tight text-dark">
                  Tahap {currentStage} / 6
                </h3>
                <p className="mt-1 font-mono text-[11px] text-orange font-semibold">
                  {milestones.find((m) => m.step_number === currentStage)?.title || "Desain Layout"}
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-dark/10 bg-orange/10 text-orange shadow-sm shrink-0">
                <Activity className="h-5 w-5" />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-dark/10 bg-white p-5 shadow-sm hover:shadow-md hover:border-orange/40 transition-all">
              <div>
                <p className="font-mono text-[11px] font-bold text-dark/50 uppercase tracking-wider">
                  Estimasi Patungan Kas
                </p>
                <h3 className="mt-1 text-2xl sm:text-3xl font-headline font-black tracking-tight text-dark">
                  Rp {pricePerStudent.toLocaleString("id-ID")}
                </h3>
                <p className="mt-1 font-mono text-[11px] text-dark/60 font-semibold">
                  {siswa} Siswa • {coverType.toUpperCase()}
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-dark/10 bg-dark/10 text-dark shadow-sm shrink-0">
                <Calculator className="h-5 w-5" />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-dark/10 bg-white p-5 shadow-sm hover:shadow-md hover:border-orange/40 transition-all">
              <div>
                <p className="font-mono text-[11px] font-bold text-dark/50 uppercase tracking-wider">
                  Status Pembayaran Kas
                </p>
                <h3 className="mt-1 text-2xl sm:text-3xl font-headline font-black tracking-tight text-emerald-600">
                  {installments.filter((i) => i.status === "paid").length} dari {installments.length} Lunas
                </h3>
                <p className="mt-1 font-mono text-[11px] text-dark/60 font-semibold">
                  Terverifikasi Kontrak MOU
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-dark/10 bg-emerald-50 text-emerald-600 shadow-sm shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-dark/10 bg-white p-5 shadow-sm hover:shadow-md hover:border-orange/40 transition-all">
              <div>
                <p className="font-mono text-[11px] font-bold text-dark/50 uppercase tracking-wider">
                  Arsip Berkas di Cloud
                </p>
                <h3 className="mt-1 text-2xl sm:text-3xl font-headline font-black tracking-tight text-dark">
                  {deliverables.filter((d) => d.is_ready).length} File Siap
                </h3>
                <p className="mt-1 font-mono text-[11px] text-dark/60 font-semibold">
                  Cloudflare R2 $0 Egress
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-dark/10 bg-orange/10 text-orange shadow-sm shrink-0">
                <FolderGit2 className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* ================= 2. MAIN TABS NAVIGATION ================= */}
          <div className="flex items-center space-x-2 border-b border-dark/10 pb-3 overflow-x-auto select-none">
            {navMenuItems.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-orange text-white shadow-md shadow-orange/20"
                      : "bg-white text-dark/70 border border-dark/10 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.title}</span>
                </button>
              );
            })}
          </div>

          {/* ================= 3. TAB 1: KATALOG & BERKAS ANGKATAN ================= */}
          {activeTab === "catalog" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-dark/10 p-4 sm:p-5 rounded-2xl shadow-sm">
                <div className="relative w-full sm:max-w-md">
                  <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-dark/40" />
                  <input
                    type="text"
                    placeholder="Cari kelas, berkas, atau materi foto..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#FAF6F0] border border-dark/15 rounded-xl pl-9 pr-4 py-2 text-xs text-dark placeholder-dark/40 outline-none focus:border-orange transition-colors font-mono"
                  />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center rounded-xl border border-dark/10 bg-[#FAF6F0] p-1">
                    <button
                      onClick={() => setViewMode("split")}
                      className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                        viewMode === "split" ? "bg-white text-dark shadow-sm" : "text-dark/50"
                      }`}
                    >
                      Split View
                    </button>
                    <button
                      onClick={() => setViewMode("folders")}
                      className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                        viewMode === "folders" ? "bg-white text-dark shadow-sm" : "text-dark/50"
                      }`}
                    >
                      Folder Grid
                    </button>
                    <button
                      onClick={() => setViewMode("table")}
                      className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                        viewMode === "table" ? "bg-white text-dark shadow-sm" : "text-dark/50"
                      }`}
                    >
                      Daftar Berkas
                    </button>
                  </div>

                  <a
                    href={waLink(`Halo Kak ${pmName}, saya ingin submit link materi foto tambahan untuk ${schoolName} kode ${kode}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-xl bg-orange text-white px-4 py-2 text-xs font-bold shadow-md shadow-orange/20 hover:bg-orange/90 transition-all shrink-0 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Upload Materi</span>
                  </a>
                </div>
              </div>

              {(viewMode === "split" || viewMode === "folders") && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline font-black text-sm uppercase text-dark">
                      Folder Materi Kelas ({filteredFolders.length})
                    </h3>
                    <span className="font-mono text-[10px] text-dark/50">
                      Klik folder untuk rincian data foto &amp; siswa
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredFolders.map((item) => (
                      <SchoolFolderCard
                        key={item.id}
                        folderName={item.folderName}
                        year={item.year}
                        studentCount={item.studentCount}
                        pageCount={item.pageCount}
                        fileSize={item.fileSize}
                        isLocked={item.isLocked}
                        theme={item.theme}
                        onOpen={() => {
                          setSelectedFolder(item.id);
                          alert(`Membuka berkas ${item.folderName} — Semua ${item.studentCount} foto terkonfirmasi hi-res.`);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {(viewMode === "split" || viewMode === "table") && (
                <div className="rounded-2xl border border-dark/10 bg-white p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-dark/10 pb-4">
                    <div>
                      <h3 className="font-headline font-black text-base uppercase text-dark">
                        Arsip Berkas Resmi Cloudflare R2
                      </h3>
                      <p className="font-mono text-xs text-dark/60 mt-0.5">
                        Download langsung tanpa limit kuota egress ($0 egress)
                      </p>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      {deliverables.length} Berkas Tercatat
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-dark/10 text-dark/40 font-mono text-[10px] uppercase">
                          <th className="pb-3 font-bold">Nama Berkas</th>
                          <th className="pb-3 font-bold">Kategori</th>
                          <th className="pb-3 font-bold">Ukuran</th>
                          <th className="pb-3 font-bold">Status</th>
                          <th className="pb-3 font-bold text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-dark/5 font-sans">
                        {deliverables.map((row, idx) => (
                          <tr key={idx} className="hover:bg-[#FAF6F0] transition-colors">
                            <td className="py-3.5 pr-4 font-bold text-dark flex items-center gap-2">
                              <FileText className="w-4 h-4 text-orange shrink-0" />
                              <span className="truncate max-w-xs">{row.file_name}</span>
                            </td>
                            <td className="py-3.5 font-mono text-dark/60 uppercase">{row.file_type.replace("_", " ")}</td>
                            <td className="py-3.5 font-mono font-bold text-dark">{row.file_size || "Cloud R2"}</td>
                            <td className="py-3.5">
                              {row.is_ready ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                  <CheckCircle2 className="w-3 h-3" /> Siap Unduh
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                  <Clock className="w-3 h-3" /> Proses Studio
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 text-right">
                              {row.is_ready ? (
                                <button
                                  onClick={() => alert(`Mengunduh berkas ${row.file_name} dari Cloudflare R2...`)}
                                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-dark hover:bg-orange text-white font-mono text-xs font-bold transition-colors cursor-pointer"
                                >
                                  <Download className="w-3 h-3" />
                                  <span>Unduh</span>
                                </button>
                              ) : (
                                <span className="font-mono text-[10px] text-dark/40">Menunggu</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= 4. TAB 2: ALUR & PIPELINE PRODUKSI ================= */}
          {activeTab === "pipeline" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-dark/10 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-dark/10 pb-4 mb-6">
                  <div>
                    <span className="font-mono text-[10px] font-black uppercase tracking-wider text-orange">
                      TIMELINE PENGERJAAN RESMI
                    </span>
                    <h3 className="font-headline font-black text-xl text-dark mt-0.5">
                      Progress Produksi Buku Tahunan
                    </h3>
                  </div>
                  <span className="font-mono text-xs font-bold text-dark bg-[#FAF6F0] px-3 py-1 rounded-xl border border-dark/15">
                    Target Wisuda: {targetGraduation}
                  </span>
                </div>

                <div className="space-y-4">
                  {milestones.map((s) => (
                    <div
                      key={s.step_number}
                      className={`p-4 rounded-xl border flex items-start gap-4 transition-all ${
                        s.status === "active"
                          ? "bg-orange/5 border-orange/40 shadow-sm"
                          : s.status === "done"
                          ? "bg-[#FAF6F0] border-dark/10"
                          : "bg-white border-dark/10 opacity-70"
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {s.status === "done" && (
                          <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                        )}
                        {s.status === "active" && (
                          <div className="w-7 h-7 rounded-full border-2 border-orange flex items-center justify-center animate-pulse">
                            <span className="w-3 h-3 rounded-full bg-orange" />
                          </div>
                        )}
                        {s.status === "pending" && (
                          <div className="w-7 h-7 rounded-full border border-dark/20 flex items-center justify-center text-xs font-mono font-bold text-dark/40">
                            {s.step_number}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="font-headline font-bold text-sm text-dark">
                            {s.step_number}. {s.title}
                          </h4>
                          <span
                            className={`font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              s.status === "done"
                                ? "bg-emerald-100 text-emerald-800"
                                : s.status === "active"
                                ? "bg-orange text-white"
                                : "bg-dark/10 text-dark/50"
                            }`}
                          >
                            {s.status === "done" ? "Selesai" : s.status === "active" ? "Sedang Proses" : "Menunggu"}
                          </span>
                        </div>
                        <p className="font-sans text-xs text-dark/70 mt-1">{s.description}</p>
                        {s.target_date && (
                          <div className="font-mono text-[10px] text-dark/50 mt-1">Jadwal: {s.target_date}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Termin Kas Dinamis Bebas dari Supabase */}
              <div className="rounded-2xl border border-dark/10 bg-white p-6 sm:p-8 shadow-sm">
                <div className="border-b border-dark/10 pb-4 mb-6">
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider text-orange">
                    SISTEM TERMIN KAS FLEKSIBEL
                  </span>
                  <h3 className="font-headline font-black text-xl text-dark mt-0.5">
                    Jadwal Termin Pembayaran Sekolah
                  </h3>
                  <p className="font-sans text-xs text-dark/60 mt-1">
                    Dirancang agar panitia memiliki waktu mengumpulkan kas siswa secara bertahap tanpa beban di awal.
                  </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  {installments.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className={`p-5 rounded-xl border flex flex-col justify-between ${
                        item.status === "paid"
                          ? "bg-emerald-50/60 border-emerald-300"
                          : "bg-[#FAF6F0] border-dark/15"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold uppercase text-dark">
                            {item.title}
                          </span>
                          <span
                            className={`font-mono text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                              item.status === "paid"
                                ? "bg-emerald-600 text-white"
                                : "bg-dark/10 text-dark/60"
                            }`}
                          >
                            {item.status === "paid" ? "Terverifikasi" : "Menunggu"}
                          </span>
                        </div>
                        <div className="font-headline font-black text-2xl text-dark mt-2">
                          Rp {item.amount.toLocaleString("id-ID")}
                        </div>
                        <div className="font-mono text-[10px] text-dark/50 mt-1">
                          Jatuh Tempo: {item.due_date || "Sesuai MOU"}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-dark/10 flex items-center justify-between">
                        <span className="font-mono text-[9px] text-dark/40">{item.receipt_number || "INV-PENDING"}</span>
                        {item.status === "paid" ? (
                          <span className="font-mono text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                            <Check className="w-3 h-3" /> Kuitansi Sah
                          </span>
                        ) : (
                          <a
                            href={waLink(`Halo Kak ${pmName}, saya ingin konfirmasi pembayaran untuk ${item.title} di ${schoolName} kode ${kode}.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[10px] font-bold text-orange hover:underline"
                          >
                            Upload Bukti Bayar &rarr;
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= 5. TAB 3: KALKULATOR & ESTIMATOR KAS ================= */}
          {activeTab === "quotation" && (
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 rounded-2xl border border-dark/10 bg-white p-6 sm:p-8 shadow-sm space-y-6">
                <div className="border-b border-dark/10 pb-4">
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider text-orange">
                    INTERACTIVE ESTIMATOR
                  </span>
                  <h3 className="font-headline font-black text-2xl text-dark mt-0.5">
                    Kalkulator Penawaran Kas
                  </h3>
                  <p className="font-sans text-xs text-dark/60 mt-1">
                    Geser parameter di bawah untuk melihat kalkulasi biaya patungan per siswa secara transparan.
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-[#FAF6F0] border border-dark/15 p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <label className="font-mono text-xs font-bold uppercase tracking-wider text-dark">
                          Jumlah Siswa
                        </label>
                        <span className="font-mono text-sm font-black text-orange bg-white px-2 py-0.5 border border-dark/20 rounded">
                          {siswa} Siswa
                        </span>
                      </div>
                      <input
                        type="range"
                        min={30}
                        max={800}
                        step={10}
                        value={siswa}
                        onChange={(e) => setSiswa(Number(e.target.value))}
                        className="w-full accent-orange cursor-pointer"
                      />
                    </div>

                    <div className="bg-[#FAF6F0] border border-dark/15 p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <label className="font-mono text-xs font-bold uppercase tracking-wider text-dark">
                          Jumlah Halaman
                        </label>
                        <span className="font-mono text-sm font-black text-orange bg-white px-2 py-0.5 border border-dark/20 rounded">
                          {halaman} Hal
                        </span>
                      </div>
                      <input
                        type="range"
                        min={40}
                        max={200}
                        step={10}
                        value={halaman}
                        onChange={(e) => setHalaman(Number(e.target.value))}
                        className="w-full accent-orange cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-dark mb-2">
                      Spesifikasi Jilid &amp; Cover
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { key: "hardcover", label: "Hardcover Standard", sub: "Base" },
                        { key: "leather", label: "Leather Emboss", sub: "+Rp 35rb" },
                        { key: "acrylic", label: "Acrylic Luxury", sub: "+Rp 70rb" },
                      ].map((c) => (
                        <button
                          key={c.key}
                          type="button"
                          onClick={() => setCoverType(c.key as any)}
                          className={`p-3 border rounded-xl text-left transition-all cursor-pointer ${
                            coverType === c.key
                              ? "bg-dark text-white border-dark shadow-sm"
                              : "bg-[#FAF6F0] text-dark border-dark/15 hover:border-dark"
                          }`}
                        >
                          <div className="font-mono text-[9px] font-bold uppercase opacity-60">
                            {c.sub}
                          </div>
                          <div className="font-headline font-black text-xs uppercase mt-0.5">
                            {c.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-dark mb-2">
                      Fitur Ekstra &amp; Add-ons
                    </label>
                    <div className="grid sm:grid-cols-3 gap-2.5">
                      <label className="flex items-center gap-2 p-3 bg-[#FAF6F0] border border-dark/15 rounded-xl cursor-pointer hover:bg-orange/5 transition-colors">
                        <input
                          type="checkbox"
                          checked={includeVideo}
                          onChange={(e) => setIncludeVideo(e.target.checked)}
                          className="accent-orange w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <div className="font-headline font-bold text-xs uppercase">Aftermovie 4K</div>
                          <div className="font-mono text-[9px] text-dark/60">+Rp 25rb /siswa</div>
                        </div>
                      </label>

                      <label className="flex items-center gap-2 p-3 bg-[#FAF6F0] border border-dark/15 rounded-xl cursor-pointer hover:bg-orange/5 transition-colors">
                        <input
                          type="checkbox"
                          checked={includeAR}
                          onChange={(e) => setIncludeAR(e.target.checked)}
                          className="accent-orange w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <div className="font-headline font-bold text-xs uppercase">AR Scan Video</div>
                          <div className="font-mono text-[9px] text-dark/60">+Rp 35rb /siswa</div>
                        </div>
                      </label>

                      <label className="flex items-center gap-2 p-3 bg-[#FAF6F0] border border-dark/15 rounded-xl cursor-pointer hover:bg-orange/5 transition-colors">
                        <input
                          type="checkbox"
                          checked={includeMerch}
                          onChange={(e) => setIncludeMerch(e.target.checked)}
                          className="accent-orange w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <div className="font-headline font-bold text-xs uppercase">Merchandise Box</div>
                          <div className="font-mono text-[9px] text-dark/60">+Rp 45rb /siswa</div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-dark/10 bg-[#FAF6F0] p-5 rounded-xl border border-dark/15 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] font-black uppercase text-dark/50">
                      ESTIMASI IURAN KAS SISWA
                    </span>
                    <div className="font-headline font-black text-3xl text-orange mt-0.5">
                      Rp {pricePerStudent.toLocaleString("id-ID")}
                      <span className="font-mono text-xs text-dark/60 font-semibold ml-1">/ siswa</span>
                    </div>
                    <div className="font-mono text-xs text-dark/70 mt-1">
                      Total Nilai Kontrak: <strong>Rp {totalProjectPrice.toLocaleString("id-ID")}</strong> ({siswa} eks)
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-1.5 bg-white text-dark font-mono text-xs font-black uppercase px-4 py-2.5 border border-dark/20 rounded-xl shadow-sm hover:bg-orange hover:text-white hover:border-orange transition-all cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Tersalin!" : "Salin Rincian"}
                  </button>
                </div>
              </div>

              {/* Order Submission Form */}
              <div className="lg:col-span-5 rounded-2xl border border-[#222530] bg-[#121318] text-white p-6 sm:p-8 shadow-sm space-y-4">
                <div className="border-b border-white/10 pb-4">
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider text-orange">
                    KUNCI ESTIMASI INI
                  </span>
                  <h3 className="font-headline font-black text-2xl text-white mt-0.5">
                    Ajukan Draf Kontrak MOU
                  </h3>
                  <p className="font-sans text-xs text-white/60 mt-1">
                    Kirim rincian ini langsung ke Project Manager Fourjective untuk diproses surat penawaran resmi sekolah.
                  </p>
                </div>

                <form onSubmit={handleSendOrder} className="space-y-4">
                  <div>
                    <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-white/80 mb-1">
                      Nama PIC / Ketua Panitia *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Misal: Alifia Putri (Ketua OSIS)"
                      value={picName}
                      onChange={(e) => setPicName(e.target.value)}
                      className="w-full bg-[#1A1C24] border border-white/15 focus:border-orange rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/40 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-white/80 mb-1">
                      Nomor WhatsApp Aktif *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0812xxxxxxx"
                      value={picPhone}
                      onChange={(e) => setPicPhone(e.target.value)}
                      className="w-full bg-[#1A1C24] border border-white/15 focus:border-orange rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/40 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-white/80 mb-1">
                      Target Wisuda Sekolah
                    </label>
                    <input
                      type="text"
                      value={targetGraduation}
                      onChange={(e) => setTargetGraduation(e.target.value)}
                      className="w-full bg-[#1A1C24] border border-white/15 focus:border-orange rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/40 outline-none transition-colors"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 bg-orange text-white font-headline font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-md shadow-orange/30 hover:bg-orange/90 transition-all cursor-pointer"
                    >
                      <span>Kirim ke WhatsApp &amp; Ajukan MOU</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-white/50 font-mono text-[10px]">
                  <ShieldCheck className="w-4 h-4 text-orange shrink-0" />
                  <span>Kalkulasi estimasi tersimpan ke database &amp; terkunci aman 7 hari.</span>
                </div>
              </div>
            </div>
          )}

          {/* ================= 6. TAB 4: VIRTUAL FLIPBOOK 3D ================= */}
          {activeTab === "flipbook" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#222530] bg-[#121318] text-white p-6 sm:p-8 shadow-sm relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider text-orange">
                    EDISI DIGITAL INTERAKTIF
                  </span>
                  <h3 className="font-headline font-black text-3xl text-white mt-1">
                    Virtual Flipbook 3D Angkatan
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-white/70 mt-2 leading-relaxed">
                    E-book buku tahunan digital dengan simulasi bolak-balik halaman realistis, video aftermovie tersemat, dan navigasi daftar isi kilat untuk seluruh siswa angkatan.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => alert("Flipbook 3D siap diluncurkan begitu Dummy Cetak 80 Halaman selesai di-approve!")}
                      className="inline-flex items-center gap-2 bg-orange text-white font-headline font-black text-xs uppercase tracking-widest px-5 py-3 rounded-xl shadow-md shadow-orange/30 hover:bg-orange/90 transition-all cursor-pointer"
                    >
                      <Layers className="w-4 h-4" />
                      <span>Buka Flipbook Reader 3D</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert("Link Flipbook angkatan berhasil disalin!");
                      }}
                      className="inline-flex items-center gap-2 bg-white/10 text-white font-mono text-xs font-bold px-4 py-3 rounded-xl hover:bg-white/20 transition-all cursor-pointer border border-white/10"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Salin Link Berbagi</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-dark/10 bg-white p-6 sm:p-8 shadow-sm">
                <div className="border-b border-dark/10 pb-4 mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-headline font-black text-lg text-dark">
                      Spesifikasi E-Book Digital Angkatan
                    </h3>
                    <p className="font-mono text-xs text-dark/60 mt-0.5">
                      Aman &amp; terproteksi token kode unik per sekolah
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Dilindungi Token {kode}
                    </span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="p-4 rounded-xl border border-dark/10 bg-[#FAF6F0]">
                    <div className="font-headline font-black text-sm uppercase text-dark">
                      Mobile &amp; Desktop Optimized
                    </div>
                    <p className="font-sans text-xs text-dark/70 mt-1">
                      Bisa dibuka lancar di iPhone, Android, tablet, hingga proyektor wisuda sekolah tanpa perlu unduh aplikasi berat.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-dark/10 bg-[#FAF6F0]">
                    <div className="font-headline font-black text-sm uppercase text-dark">
                      Video &amp; AR Embed
                    </div>
                    <p className="font-sans text-xs text-dark/70 mt-1">
                      Halaman video aftermovie dapat diputar langsung di dalam halaman buku secara mulus beresolusi 4K.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-dark/10 bg-[#FAF6F0]">
                    <div className="font-headline font-black text-sm uppercase text-dark">
                      Offline Mode &amp; PDF Master
                    </div>
                    <p className="font-sans text-xs text-dark/70 mt-1">
                      Siswa dapat mengunduh salinan offline beresolusi tinggi untuk arsip pribadi selamanya.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= 7. TAB 5: KONTAK PIC & PANDUAN ================= */}
          {activeTab === "contact" && (
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 rounded-2xl border border-dark/10 bg-white p-6 sm:p-8 shadow-sm space-y-4">
                <span className="font-mono text-[10px] font-black uppercase tracking-wider text-orange">
                  DEDICATED PROJECT MANAGER
                </span>
                <h3 className="font-headline font-black text-xl text-dark">
                  Penanggung Jawab Angkatan
                </h3>
                <p className="font-sans text-xs text-dark/70">
                  Satu kontak langsung dari tim Fourjective Studio untuk mengawal seluruh timeline angkatanmu hingga hari kelulusan.
                </p>

                <div className="p-4 border border-dark/15 rounded-xl bg-[#FAF6F0] flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-dark text-orange flex items-center justify-center font-headline font-black text-xl shrink-0 border-2 border-orange">
                    {pmName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-headline font-black text-base uppercase text-dark truncate">
                      {pmName}
                    </h4>
                    <p className="font-mono text-[10px] text-dark/60 uppercase truncate">
                      Lead Project Manager • Fourjective Studio
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-emerald-600 font-mono text-[10px] font-bold mt-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Aktif Siap Koordinasi
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <a
                    href={waLink(`Halo Kak ${pmName} (PM Fourjective), saya panitia kode ${kode} dari ${schoolName} ingin koordinasi materi.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-orange text-white font-headline font-black text-xs uppercase tracking-widest py-3 px-4 rounded-xl shadow-md shadow-orange/30 hover:bg-orange/90 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat WhatsApp Kak {pmName.split(" ")[0]}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <p className="font-mono text-[10px] text-dark/50 text-center">
                    Jam Operasional: Senin – Sabtu, 08.00 – 21.00 WIB
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 rounded-2xl border border-dark/10 bg-white p-6 sm:p-8 shadow-sm space-y-4">
                <h3 className="font-headline font-black text-xl text-dark border-b border-dark/10 pb-3">
                  Panduan Panitia Buku Tahunan
                </h3>

                <div className="space-y-3">
                  {[
                    {
                      q: "Kapan batas akhir pengumpulan materi foto & bio siswa?",
                      a: "Maksimal 14 hari kerja setelah sesi photoshoot selesai. Keterlambatan data siswa akan menggeser antrean mesin cetak offset.",
                    },
                    {
                      q: "Berapa kali kesempatan revisi dummy sebelum naik cetak?",
                      a: "Disediakan 2 kali putaran revisi menyeluruh untuk teks, foto, dan tata letak halaman. Setelah ACC dummy ditandatangani, file langsung masuk separasi plat cetak.",
                    },
                    {
                      q: "Apakah data dan foto kami aman dari sekolah lain?",
                      a: "Sangat aman. Setiap dashboard dan folder R2 dienkripsi terpisah dan hanya bisa diakses via kode unik sekolahmu.",
                    },
                    {
                      q: "Bagaimana cara klaim jika ada eksemplar buku cacat cetak?",
                      a: "Fourjective menerapkan garansi 100% ganti cetak baru tanpa biaya tambahan jika ada cacat jilid atau halaman terbalik.",
                    },
                  ].map((faq, idx) => (
                    <div key={idx} className="p-4 border border-dark/10 rounded-xl bg-[#FAF6F0]">
                      <h4 className="font-headline font-bold text-xs uppercase text-dark">
                        {idx + 1}. {faq.q}
                      </h4>
                      <p className="font-sans text-xs text-dark/75 mt-1 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
