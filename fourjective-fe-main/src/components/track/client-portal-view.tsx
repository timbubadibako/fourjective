"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProductionTimeline } from "./ProductionTimeline";
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
  Receipt,
  Info,
  CalendarCheck2,
} from "lucide-react";
import { WA_MESSAGES, waLink } from "@/lib/site";
import { ProjectData, submitProspectOrder } from "@/lib/supabase";

interface ClientPortalViewProps {
  kode: string;
  initialProject?: ProjectData | null;
}

type TabType =
  | "catalog"
  | "pipeline"
  | "quotation"
  | "flipbook"
  | "contact"
  | "payments";

export function ClientPortalView({ kode, initialProject }: ClientPortalViewProps) {
  const router = useRouter();

  // === DETEKSI STATUS KONDISI: GUEST vs TELAH MOU ===
  const isGuest =
    initialProject?.status === "prospect" || kode.startsWith("GUEST");

  const [activeTab, setActiveTab] = useState<TabType>(
    isGuest ? "quotation" : "catalog"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [unlockedYearbook, setUnlockedYearbook] = useState<boolean>(false);
  const [unlockPassword, setUnlockPassword] = useState<string>("");
  const [unlockError, setUnlockError] = useState<string>("");
  const [showUnlockModal, setShowUnlockModal] = useState<boolean>(false);
  const [claimUsed, setClaimUsed] = useState<boolean>(false);

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
  const addOns =
    (includeVideo ? 25000 : 0) +
    (includeAR ? 35000 : 0) +
    (includeMerch ? 45000 : 0);
  const pricePerStudent = Math.round(
    halaman * basePerPage + coverPrices[coverType] + addOns
  );
  const totalProjectPrice = pricePerStudent * siswa;

  const schoolName = initialProject?.school_name || "SMA Negeri 1 Jakarta";
  const gradYear = initialProject?.graduation_year || 2026;
  const currentStage = initialProject?.current_stage || (isGuest ? 1 : 2);
  const pmName = initialProject?.pm_assigned || "Venny Meilinda";

  // Data dinamis dari Supabase
  const milestones =
    initialProject?.project_milestones &&
    initialProject.project_milestones.length > 0
      ? initialProject.project_milestones
      : [
          {
            id: "m1",
            project_id: "p1",
            step_number: 1,
            title: "Penandatanganan Kontrak MOU & DP 30%",
            description: isGuest
              ? "Menunggu persetujuan panitia dan pembayaran kas DP 30% untuk mengunci tanggal sesi foto."
              : "MOU resmi angkatan telah disepakati dan jadwal photoshoot terkunci.",
            status: isGuest ? ("active" as const) : ("done" as const),
            target_date: isGuest ? "Menunggu MOU" : "10 Sep 2026",
          },
          {
            id: "m2",
            project_id: "p1",
            step_number: 2,
            title: "Sesi Foto Angkatan & Kelas",
            description:
              "Pemotretan outdoor tema kelas, sesi studio guru, dan video shoot.",
            status: isGuest ? ("pending" as const) : ("active" as const),
            target_date: "04 Okt 2026",
          },
          {
            id: "m3",
            project_id: "p1",
            step_number: 3,
            title: "Desain Layout & Kurasi 80 Halaman",
            description:
              "Tim desainer grafis Fourjective menata susunan foto & bio siswa.",
            status: "pending" as const,
            target_date: "Sedang Berlangsung",
          },
          {
            id: "m4",
            project_id: "p1",
            step_number: 4,
            title: "Proofing Dummy & Revisi Panitia",
            description:
              "Pengecekan dummy digital sebelum dokumen naik ke mesin cetak Heidelberg.",
            status: "pending" as const,
            target_date: "Est. 15 Nov 2026",
          },
          {
            id: "m5",
            project_id: "p1",
            step_number: 5,
            title: "Proses Cetak, Jilid Hardcover & QC",
            description:
              "Pencetakan fisik, laminasi doff/glossy, jilid jahit benang hardcover kokoh.",
            status: "pending" as const,
            target_date: "Est. 10 Des 2026",
          },
          {
            id: "m6",
            project_id: "p1",
            step_number: 6,
            title: "Pengemasan Rapi & Pengiriman ke Sekolah",
            description:
              "Eksemplar buku dibungkus box rapi dan dikirim tepat waktu sebelum hari wisuda.",
            status: "pending" as const,
            target_date: "Est. 20 Des 2026",
          },
        ];

  const installments =
    initialProject?.payment_installments &&
    initialProject.payment_installments.length > 0
      ? initialProject.payment_installments
      : [
          {
            id: "i1",
            project_id: "p1",
            installment_number: 1,
            title: "Termin 1 (DP 30%)",
            amount: Math.round(totalProjectPrice * 0.3),
            status: isGuest ? ("pending" as const) : ("paid" as const),
            due_date: isGuest ? "Saat Tanda Tangan MOU" : "Lunas saat MOU",
            receipt_number: isGuest ? "INV-ESTIMASI" : "INV-2026-001-LUNAS",
            notes: isGuest
              ? "Pembayaran DP 30% untuk mengunci jadwal photoshoot"
              : "Pembayaran kas DP 30% terverifikasi kontrak",
          },
          {
            id: "i2",
            project_id: "p1",
            installment_number: 2,
            title: "Termin 2 (40%)",
            amount: Math.round(totalProjectPrice * 0.4),
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
            amount: totalProjectPrice - Math.round(totalProjectPrice * 0.7),
            status: "pending" as const,
            due_date: "Sebelum Buku Dikirim",
            receipt_number: "INV-2026-003-PENDING",
            notes: "Pelunasan sebelum pengiriman ekspedisi",
          },
        ];

  const deliverables =
    initialProject?.project_deliverables &&
    initialProject.project_deliverables.length > 0
      ? initialProject.project_deliverables
      : [
          {
            id: "d1",
            project_id: "p1",
            file_type: "zip_photos" as const,
            file_name: isGuest
              ? "Contoh Galeri Foto Outdoor (Sample Demo).zip"
              : "Galeri Foto Kelas Lengkap (Hi-Res).zip",
            file_size: isGuest ? "1.4 GB" : "3.8 GB",
            r2_key: "schools/SMAN1-2026/photos-hires.zip",
            is_ready: true,
            download_count: 14,
          },
          {
            id: "d2",
            project_id: "p1",
            file_type: "master_pdf" as const,
            file_name: isGuest
              ? "Sample Dummy Layout 64 Halaman (Pratinjau).pdf"
              : "Draf Dummy Layout 80 Halaman (Revisi 1).pdf",
            file_size: isGuest ? "68 MB" : "184 MB",
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
- Add-on: ${
      [
        includeVideo && "Video Aftermovie 4K",
        includeAR && "AR Scan Video",
        includeMerch && "Merchandise Angkatan",
      ]
        .filter(Boolean)
        .join(", ") || "Tidak ada"
    }

Estimasi per Siswa: Rp ${pricePerStudent.toLocaleString("id-ID")}
Total Estimasi Proyek: Rp ${totalProjectPrice.toLocaleString("id-ID")}
---------------------------------------------
Kirim rincian ini ke tim Fourjective untuk dibuatkan draf kontrak MOU resmi.
    `.trim();

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUnlockYearbook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!unlockPassword.trim()) {
      setUnlockError("Masukkan kata sandi angkatan atau kode akses.");
      return;
    }
    // Verifikasi password angkatan / token kode guest
    if (
      unlockPassword.trim().toUpperCase() === kode.toUpperCase() ||
      unlockPassword.trim().toLowerCase() === "fourjective" ||
      unlockPassword.trim().toLowerCase() === "2026"
    ) {
      setUnlockedYearbook(true);
      setShowUnlockModal(false);
      setClaimUsed(true);
      setUnlockError("");
    } else {
      setUnlockError("Kata sandi salah. Hubungi panitia atau PM Fourjective.");
    }
  };

  const handleSendOrder = (e: React.FormEvent) => {
    e.preventDefault();

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

    const msg = `Halo Tim Fourjective! Saya ${picName || "Panitia"} dari ${schoolName} (${gradYear}) dengan kode akses *${kode}* ingin mengajukan penandatanganan KONTRAK MOU & kunci jadwal:
- Jumlah Siswa: ${siswa} siswa
- Halaman: ${halaman} hal
- Cover: ${coverType}
- Target Wisuda: ${targetGraduation}
- Estimasi Iuran: Rp ${pricePerStudent.toLocaleString("id-ID")}/siswa
- Total Anggaran: Rp ${totalProjectPrice.toLocaleString("id-ID")}

Mohon dibuatkan surat MOU resmi & kunci jadwal photoshoot. Terima kasih!`;

    window.open(waLink(msg), "_blank");
  };

  // ================= MENU KHUSUS GUEST VS TELAH MOU =================
  const guestNavItems = [
    {
      key: "quotation" as TabType,
      title: "Kalkulator Kas & Paket",
      icon: Calculator,
    },
    {
      key: "flipbook" as TabType,
      title: "Klaim Pratinjau Yearbook",
      icon: Layers,
      badge: claimUsed || unlockedYearbook ? "Terbuka" : "1 Kuota",
      badgeColor: claimUsed || unlockedYearbook ? "bg-white/20 text-white" : "bg-orange text-white",
    },
    {
      key: "pipeline" as TabType,
      title: "Alur & Standar 6 Tahap",
      icon: Clock,
    },
    {
      key: "contact" as TabType,
      title: "Ajukan MOU & Jadwal",
      icon: PhoneCall,
    },
  ];

  const mouNavItems = [
    {
      key: "catalog" as TabType,
      title: "Berkas & Unduh Hasil",
      icon: BookOpen,
      badge: `${deliverables.filter((d) => d.is_ready).length} Siap`,
    },
    {
      key: "pipeline" as TabType,
      title: "Alur Produksi Real-Time",
      icon: Clock,
      badge: `${currentStage}/6`,
    },
    {
      key: "payments" as TabType,
      title: "Termin Kas & Kuitansi",
      icon: Receipt,
      badge: `${installments.filter((i) => i.status === "paid").length}/${installments.length} Lunas`,
    },
    {
      key: "flipbook" as TabType,
      title: "E-Book Flipbook 3D",
      icon: Layers,
    },
    {
      key: "quotation" as TabType,
      title: "Simulasi Kas Tambahan",
      icon: Calculator,
    },
    {
      key: "contact" as TabType,
      title: "Dedicated PM & Panduan",
      icon: PhoneCall,
    },
  ];

  const activeNavItems = isGuest ? guestNavItems : mouNavItems;

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
                {isGuest ? "Guest Portal (Pra-MOU)" : "Portal Klien Resmi"}
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
          {/* Main User Navigation */}
          <div>
            <div className="px-2 mb-2">
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/40">
                {isGuest ? "Menu Tamu" : "Menu Utama"}
              </p>
            </div>

            <nav className="space-y-1">
              {activeNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(item.key)}
                    className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition-all cursor-pointer ${
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
                          "badgeColor" in item && item.badgeColor
                            ? (item as any).badgeColor
                            : isActive
                            ? "bg-white/20 text-white"
                            : "bg-white/10 text-white/70"
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

        {/* Sidebar Footer */}
        <div className="border-t border-white/10 p-4 bg-[#0E0F13]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-orange text-white flex items-center justify-center font-headline font-black text-xs">
                {pmName
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white truncate font-headline">
                  {pmName}
                </div>
                <div className="text-[10px] font-mono text-white/40">
                  Project Manager
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Keluar Portal"
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT CANVAS ================= */}
      <main className="flex-1 min-w-0 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-dark/10 bg-[#FAF6F0]/90 px-6 backdrop-blur-md">
          {/* Left: Breadcrumb & Title */}
          <div className="flex items-center gap-3">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isGuest ? "bg-amber-500" : "bg-orange"
              }`}
            />
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-dark/50 font-bold uppercase tracking-wider">
                <span>Portal</span>
                <span>/</span>
                <span className="text-dark font-black">
                  {schoolName} ({kode})
                </span>
                <span>/</span>
                <span className="text-orange">
                  {activeNavItems.find((m) => m.key === activeTab)?.title}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Status Badges */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-[11px] font-mono font-bold text-dark/60 border border-dark/15 px-3 py-1 rounded-full bg-white">
              {isGuest ? "Mode Tamu" : "Kontrak Aktif"}
            </span>

            {isGuest ? (
              <button
                onClick={() => setActiveTab("quotation")}
                className="inline-flex items-center gap-1.5 bg-orange text-white px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold hover:bg-orange/90 transition-all cursor-pointer"
              >
                <span>Ajukan MOU</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <a
                href={waLink(
                  `Halo Kak ${pmName} (PM Fourjective), saya panitia kode ${kode} dari ${schoolName} ingin koordinasi materi.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-dark text-white px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold hover:bg-orange transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Hubungi PM</span>
              </a>
            )}
          </div>
        </header>

        {/* Dynamic Page Content Area */}
        <div className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* ================= SPECIAL BANNER: KONDISI GUEST (PRA-MOU) ================= */}
          {isGuest && (
            <div className="rounded-xl border border-dark/15 bg-white p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="max-w-2xl">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-orange">
                  Pratinjau Simulasi Angkatan
                </span>
                <h3 className="font-headline font-bold text-base text-dark mt-0.5">
                  Kunci Kontrak MOU &amp; Jadwal Photoshoot Sekolahmu
                </h3>
                <p className="font-sans text-xs text-dark/70 mt-1">
                  Anda sedang melihat mode demo angkatan. Kunci draf kontrak MOU &amp; DP 30% untuk membuka slot studio foto dan antrean mesin cetak prioritas.
                </p>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
                <button
                  onClick={() => setActiveTab("quotation")}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange/90 text-white font-mono font-bold text-xs px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Kalkulasi &amp; Ajukan MOU</span>
                </button>
              </div>
            </div>
          )}

          {/* ================= 1. OVERVIEW METRIC CARDS (KONDISI GUEST VS TELAH MOU) ================= */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 select-none">
            {/* Card 1 */}
            <div className="rounded-xl border border-dark/10 bg-white p-5 shadow-sm">
              <p className="font-mono text-[10px] font-bold text-dark/40 uppercase tracking-wider">
                {isGuest ? "Status Kontrak" : "Tahap Produksi"}
              </p>
              <h3 className="mt-1 text-2xl font-headline font-black tracking-tight text-dark">
                {isGuest ? "Pra-MOU" : `Tahap ${currentStage}/6`}
              </h3>
              <p className="mt-1 font-mono text-[11px] text-dark/60">
                {isGuest
                  ? "Menunggu Tanda Tangan"
                  : milestones.find((m) => m.step_number === currentStage)?.title ||
                    "Desain Layout"}
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl border border-dark/10 bg-white p-5 shadow-sm">
              <p className="font-mono text-[10px] font-bold text-dark/40 uppercase tracking-wider">
                {isGuest ? "Simulasi Patungan" : "Iuran Kas"}
              </p>
              <h3 className="mt-1 text-2xl font-headline font-black tracking-tight text-dark">
                Rp {pricePerStudent.toLocaleString("id-ID")}
              </h3>
              <p className="mt-1 font-mono text-[11px] text-dark/60">
                {siswa} Siswa • {coverType.toUpperCase()}
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-xl border border-dark/10 bg-white p-5 shadow-sm">
              <p className="font-mono text-[10px] font-bold text-dark/40 uppercase tracking-wider">
                {isGuest ? "Skema Termin" : "Status Kas"}
              </p>
              <h3 className="mt-1 text-2xl font-headline font-black tracking-tight text-dark">
                {isGuest
                  ? "3x Tahap"
                  : `${
                      installments.filter((i) => i.status === "paid").length
                    }/${installments.length} Lunas`}
              </h3>
              <p className="mt-1 font-mono text-[11px] text-dark/60">
                {isGuest ? "DP 30% - 40% - 30%" : "Terverifikasi Kontrak"}
              </p>
            </div>

            {/* Card 4 */}
            <div className="rounded-xl border border-dark/10 bg-white p-5 shadow-sm">
              <p className="font-mono text-[10px] font-bold text-dark/40 uppercase tracking-wider">
                {isGuest ? "Klaim Yearbook" : "Arsip Berkas"}
              </p>
              <h3 className="mt-1 text-2xl font-headline font-black tracking-tight text-dark">
                {isGuest
                  ? unlockedYearbook
                    ? "Terbuka"
                    : "1 Kuota"
                  : `${deliverables.filter((d) => d.is_ready).length} File Siap`}
              </h3>
              <p className="mt-1 font-mono text-[11px] text-dark/60">
                {isGuest
                  ? unlockedYearbook
                    ? "Akses Lengkap Aktif"
                    : "Token Sandi Angkatan"
                  : "Cloudflare R2 $0 Egress"}
              </p>
            </div>
          </div>

          {/* ================= 3. TAB 1: BERKAS & UNDUH HASIL (POST-MOU ONLY) ================= */}
          {activeTab === "catalog" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-dark/10 bg-white p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-dark/10 pb-4">
                  <div>
                    <span className="font-mono text-[10px] font-black uppercase tracking-wider text-orange">
                      ARSIP BERKAS RESMI
                    </span>
                    <h3 className="font-headline font-black text-xl text-dark mt-0.5">
                      Galeri Unduh Hasil &amp; Master Dokumen
                    </h3>
                    <p className="font-mono text-xs text-dark/60 mt-0.5">
                      Tersimpan di Cloudflare R2 dengan jalur unduh direct tanpa kuota ($0 egress)
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      {deliverables.length} Berkas Angkatan
                    </span>
                    <a
                      href={waLink(
                        `Halo Kak ${pmName}, saya ingin submit link materi foto tambahan untuk ${schoolName} kode ${kode}.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-xl bg-orange text-white px-4 py-2 text-xs font-bold shadow-md shadow-orange/20 hover:bg-orange/90 transition-all shrink-0 cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Upload Tambahan</span>
                    </a>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-dark/10 text-dark/40 font-mono text-[10px] uppercase">
                        <th className="pb-3 font-bold">Nama Berkas</th>
                        <th className="pb-3 font-bold">Kategori</th>
                        <th className="pb-3 font-bold">Ukuran</th>
                        <th className="pb-3 font-bold">Status Berkas</th>
                        <th className="pb-3 font-bold text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-dark/5 font-sans">
                      {deliverables.map((row, idx) => (
                        <tr key={idx} className="hover:bg-[#FAF6F0] transition-colors">
                          <td className="py-3.5 pr-4 font-bold text-dark flex items-center gap-2">
                            <FileText className="w-4 h-4 text-orange shrink-0" />
                            <span className="truncate max-w-sm">{row.file_name}</span>
                          </td>
                          <td className="py-3.5 font-mono text-dark/60 uppercase">
                            {row.file_type.replace("_", " ")}
                          </td>
                          <td className="py-3.5 font-mono font-bold text-dark">
                            {row.file_size || "Cloud R2"}
                          </td>
                          <td className="py-3.5">
                            {row.is_ready ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                                <CheckCircle2 className="w-3 h-3" /> Siap Unduh
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                                <Clock className="w-3 h-3" /> Sedang Proses
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 text-right">
                            {row.is_ready ? (
                              <button
                                onClick={() =>
                                  alert(
                                    `Mengunduh berkas ${row.file_name} langsung dari Cloudflare R2...`
                                  )
                                }
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark hover:bg-orange text-white font-mono text-xs font-bold transition-all cursor-pointer"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>Unduh</span>
                              </button>
                            ) : (
                              <span className="font-mono text-[10px] text-dark/40">
                                Menunggu Desain
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================= 4. TAB 2: ALUR & PIPELINE PRODUKSI ================= */}
          {activeTab === "pipeline" && (
            <div className="space-y-6">
              {/* Standar 6 Tahap Ringkas */}
              <div className="rounded-xl border border-dark/10 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-dark/10 pb-4 mb-6">
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-orange">
                      {isGuest
                        ? "Standar Alur Produksi"
                        : "Timeline Pengerjaan Resmi"}
                    </span>
                    <h3 className="font-headline font-bold text-lg text-dark mt-0.5">
                      {isGuest
                        ? "Tahapan Kerja dari MOU Hingga Kelulusan"
                        : "Progress Produksi Buku Tahunan"}
                    </h3>
                  </div>
                  <span className="font-mono text-xs font-bold text-dark/70 bg-[#FAF6F0] px-3 py-1 rounded-lg border border-dark/10">
                    Target Wisuda: {targetGraduation}
                  </span>
                </div>

                <div className="space-y-3">
                  {milestones.map((s) => (
                    <div
                      key={s.step_number}
                      className={`p-4 rounded-lg border flex items-start gap-3.5 transition-colors ${
                        s.status === "active"
                          ? "bg-orange/5 border-orange/30"
                          : s.status === "done"
                          ? "bg-[#FAF6F0] border-dark/10"
                          : "bg-white border-dark/10 opacity-60"
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {s.status === "done" && (
                          <div className="w-6 h-6 rounded-md bg-dark text-white flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </div>
                        )}
                        {s.status === "active" && (
                          <div className="w-6 h-6 rounded-md bg-orange text-white flex items-center justify-center font-mono text-xs font-bold">
                            {s.step_number}
                          </div>
                        )}
                        {s.status === "pending" && (
                          <div className="w-6 h-6 rounded-md border border-dark/20 flex items-center justify-center text-xs font-mono text-dark/40">
                            {s.step_number}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="font-headline font-bold text-sm text-dark">
                            {s.step_number}. {s.title}
                          </h4>
                          <span className="font-mono text-[10px] text-dark/50 uppercase">
                            {s.status === "done"
                              ? "Selesai"
                              : s.status === "active"
                              ? "Berjalan"
                              : "Menunggu"}
                          </span>
                        </div>
                        <p className="font-sans text-xs text-dark/70 mt-0.5">
                          {s.description}
                        </p>
                        {s.target_date && (
                          <div className="font-mono text-[10px] text-dark/40 mt-1">
                            Jadwal: {s.target_date}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kalender & Checklist Detail 22 Task dari Master Timeline */}
              <ProductionTimeline
                schoolName={schoolName}
                targetGraduation={targetGraduation}
                isGuest={isGuest}
              />
            </div>
          )}

          {/* ================= 5. TAB 3: TERMIN KAS & KUITANSI (DEDICATED PAYMENTS) ================= */}
          {activeTab === "payments" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-dark/10 bg-white p-6 shadow-sm">
                <div className="border-b border-dark/10 pb-4 mb-6">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-orange">
                    Sistem Termin Kas
                  </span>
                  <h3 className="font-headline font-bold text-xl text-dark mt-0.5">
                    Jadwal Termin Pembayaran Kas Angkatan
                  </h3>
                  <p className="font-sans text-xs text-dark/60 mt-1">
                    Skema 3 kali termin bertahap tanpa perlu menalangi seluruh biaya di awal.
                  </p>
                </div>

                {/* Summary Box Kas */}
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-[#FAF6F0] border border-dark/10 p-4 rounded-lg">
                    <span className="font-mono text-[10px] font-bold text-dark/40 uppercase">
                      Total Kontrak
                    </span>
                    <div className="font-headline font-black text-2xl text-dark mt-1">
                      Rp {totalProjectPrice.toLocaleString("id-ID")}
                    </div>
                    <div className="font-mono text-[10px] text-dark/50 mt-0.5">
                      {siswa} Siswa • Rp {pricePerStudent.toLocaleString("id-ID")}/siswa
                    </div>
                  </div>

                  <div className="bg-[#FAF6F0] border border-dark/10 p-4 rounded-lg">
                    <span className="font-mono text-[10px] font-bold text-dark/40 uppercase">
                      Kas Masuk
                    </span>
                    <div className="font-headline font-black text-2xl text-dark mt-1">
                      Rp{" "}
                      {installments
                        .filter((i) => i.status === "paid")
                        .reduce((acc, curr) => acc + curr.amount, 0)
                        .toLocaleString("id-ID")}
                    </div>
                    <div className="font-mono text-[10px] text-dark/50 mt-0.5">
                      {installments.filter((i) => i.status === "paid").length} dari{" "}
                      {installments.length} Termin Lunas
                    </div>
                  </div>

                  <div className="bg-[#FAF6F0] border border-dark/10 p-4 rounded-lg">
                    <span className="font-mono text-[10px] font-bold text-dark/40 uppercase">
                      Sisa Pembayaran
                    </span>
                    <div className="font-headline font-black text-2xl text-orange mt-1">
                      Rp{" "}
                      {installments
                        .filter((i) => i.status === "pending")
                        .reduce((acc, curr) => acc + curr.amount, 0)
                        .toLocaleString("id-ID")}
                    </div>
                    <div className="font-mono text-[10px] text-dark/50 mt-0.5">
                      Dibayar bertahap sesuai progres cetak
                    </div>
                  </div>
                </div>

                {/* Grid 3 Termin Card */}
                <div className="grid sm:grid-cols-3 gap-4">
                  {installments.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className={`p-4 rounded-lg border flex flex-col justify-between ${
                        item.status === "paid"
                          ? "bg-white border-dark/20"
                          : "bg-[#FAF6F0] border-dark/10"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold uppercase text-dark">
                            {item.title}
                          </span>
                          <span className="font-mono text-[10px] text-dark/50">
                            {item.status === "paid" ? "Lunas" : "Pending"}
                          </span>
                        </div>
                        <div className="font-headline font-black text-xl text-dark mt-2">
                          Rp {item.amount.toLocaleString("id-ID")}
                        </div>
                        <div className="font-mono text-[10px] text-dark/40 mt-0.5">
                          Jatuh Tempo: {item.due_date || "Sesuai MOU"}
                        </div>
                        <p className="font-sans text-xs text-dark/70 mt-2">
                          {item.notes}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-dark/10 flex items-center justify-between">
                        <span className="font-mono text-[9px] text-dark/40">
                          {item.receipt_number || "INV-PENDING"}
                        </span>
                        {item.status === "paid" ? (
                          <span className="font-mono text-[10px] font-bold text-dark flex items-center gap-1">
                            <Check className="w-3 h-3 text-orange" /> Terverifikasi
                          </span>
                        ) : (
                          <a
                            href={waLink(
                              `Halo Kak ${pmName}, saya ingin konfirmasi pembayaran untuk ${item.title} di ${schoolName} kode ${kode}.`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[10px] font-bold text-orange hover:underline"
                          >
                            Konfirmasi Bayar &rarr;
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= 6. TAB 4: KALKULATOR & ESTIMATOR KAS ================= */}
          {activeTab === "quotation" && (
            <div className="grid lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 rounded-xl border border-dark/10 bg-white p-6 shadow-sm space-y-6">
                <div className="border-b border-dark/10 pb-4">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-orange">
                    Interactive Estimator
                  </span>
                  <h3 className="font-headline font-bold text-xl text-dark mt-0.5">
                    Kalkulator Penawaran Kas
                  </h3>
                  <p className="font-sans text-xs text-dark/60 mt-0.5">
                    Sesuaikan parameter untuk menghitung estimasi iuran per siswa.
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-[#FAF6F0] border border-dark/10 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <label className="font-mono text-xs font-bold uppercase tracking-wider text-dark/70">
                          Jumlah Siswa
                        </label>
                        <span className="font-mono text-xs font-bold text-dark bg-white px-2 py-0.5 border border-dark/15 rounded">
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

                    <div className="bg-[#FAF6F0] border border-dark/10 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <label className="font-mono text-xs font-bold uppercase tracking-wider text-dark/70">
                          Jumlah Halaman
                        </label>
                        <span className="font-mono text-xs font-bold text-dark bg-white px-2 py-0.5 border border-dark/15 rounded">
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
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-dark/70 mb-2">
                      Spesifikasi Cover
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
                          className={`p-3 border rounded-lg text-left transition-colors cursor-pointer ${
                            coverType === c.key
                              ? "bg-dark text-white border-dark"
                              : "bg-[#FAF6F0] text-dark border-dark/15 hover:border-dark/40"
                          }`}
                        >
                          <div className="font-mono text-[9px] opacity-60">
                            {c.sub}
                          </div>
                          <div className="font-headline font-bold text-xs mt-0.5">
                            {c.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-dark/70 mb-2">
                      Fitur Ekstra
                    </label>
                    <div className="grid sm:grid-cols-3 gap-2.5">
                      <label className="flex items-center gap-2.5 p-3 bg-[#FAF6F0] border border-dark/10 rounded-lg cursor-pointer hover:border-dark/30 transition-colors">
                        <input
                          type="checkbox"
                          checked={includeVideo}
                          onChange={(e) => setIncludeVideo(e.target.checked)}
                          className="accent-orange w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <div className="font-headline font-bold text-xs">
                            Aftermovie 4K
                          </div>
                          <div className="font-mono text-[10px] text-dark/50">
                            +Rp 25rb /siswa
                          </div>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-3 bg-[#FAF6F0] border border-dark/10 rounded-lg cursor-pointer hover:border-dark/30 transition-colors">
                        <input
                          type="checkbox"
                          checked={includeAR}
                          onChange={(e) => setIncludeAR(e.target.checked)}
                          className="accent-orange w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <div className="font-headline font-bold text-xs">
                            AR Scan Video
                          </div>
                          <div className="font-mono text-[10px] text-dark/50">
                            +Rp 35rb /siswa
                          </div>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-3 bg-[#FAF6F0] border border-dark/10 rounded-lg cursor-pointer hover:border-dark/30 transition-colors">
                        <input
                          type="checkbox"
                          checked={includeMerch}
                          onChange={(e) => setIncludeMerch(e.target.checked)}
                          className="accent-orange w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <div className="font-headline font-bold text-xs">
                            Merchandise Box
                          </div>
                          <div className="font-mono text-[10px] text-dark/50">
                            +Rp 45rb /siswa
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-dark/10 bg-[#FAF6F0] p-4 rounded-lg border border-dark/10 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase text-dark/50">
                      Estimasi Patungan Siswa
                    </span>
                    <div className="font-headline font-black text-2xl text-dark mt-0.5">
                      Rp {pricePerStudent.toLocaleString("id-ID")}
                      <span className="font-mono text-xs text-dark/50 font-normal ml-1">
                        / siswa
                      </span>
                    </div>
                    <div className="font-mono text-xs text-dark/60 mt-0.5">
                      Total: Rp {totalProjectPrice.toLocaleString("id-ID")} ({siswa} eks)
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-1.5 bg-white text-dark font-mono text-xs font-bold px-3 py-2 border border-dark/20 rounded-lg hover:bg-dark hover:text-white transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-orange" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copied ? "Tersalin" : "Salin"}</span>
                  </button>
                </div>
              </div>

              {/* Order Submission Form */}
              <div className="lg:col-span-5 rounded-xl border border-dark/10 bg-white p-6 shadow-sm space-y-4">
                <div className="border-b border-dark/10 pb-3">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-orange">
                    {isGuest ? "Pengajuan MOU" : "Revisi Estimasi"}
                  </span>
                  <h3 className="font-headline font-bold text-lg text-dark mt-0.5">
                    {isGuest ? "Kunci Draf Kontrak" : "Kirim Rincian"}
                  </h3>
                  <p className="font-sans text-xs text-dark/60 mt-0.5">
                    Kirim rincian ini langsung ke WhatsApp Project Manager.
                  </p>
                </div>

                <form onSubmit={handleSendOrder} className="space-y-3.5">
                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-dark/70 mb-1">
                      Nama PIC / Ketua Panitia *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Misal: Alifia Putri"
                      value={picName}
                      onChange={(e) => setPicName(e.target.value)}
                      className="w-full bg-[#FAF6F0] border border-dark/15 focus:border-orange rounded-lg px-3 py-2 text-xs text-dark placeholder-dark/40 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-dark/70 mb-1">
                      Nomor WhatsApp Aktif *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0812xxxxxxx"
                      value={picPhone}
                      onChange={(e) => setPicPhone(e.target.value)}
                      className="w-full bg-[#FAF6F0] border border-dark/15 focus:border-orange rounded-lg px-3 py-2 text-xs text-dark placeholder-dark/40 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-dark/70 mb-1">
                      Target Wisuda Sekolah
                    </label>
                    <input
                      type="text"
                      value={targetGraduation}
                      onChange={(e) => setTargetGraduation(e.target.value)}
                      className="w-full bg-[#FAF6F0] border border-dark/15 focus:border-orange rounded-lg px-3 py-2 text-xs text-dark placeholder-dark/40 outline-none transition-colors"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange/90 text-white font-mono font-bold text-xs uppercase px-4 py-3 rounded-lg shadow-sm transition-colors cursor-pointer"
                    >
                      <span>
                        {isGuest
                          ? "Kirim ke WA & Ajukan MOU"
                          : "Simpan & Kirim ke PM"}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ================= 7. TAB 5: VIRTUAL FLIPBOOK 3D / KLAIM YEARBOOK ================= */}
          {activeTab === "flipbook" && (
            <div className="space-y-6">
              {/* JIKA GUEST DAN BELUM KLAIM DENGAN PASSWORD */}
              {isGuest && !unlockedYearbook ? (
                <div className="rounded-xl border border-dark/15 bg-white p-8 sm:p-12 text-center shadow-sm">
                  <div className="max-w-md mx-auto space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-orange/10 border border-orange/20 text-orange flex items-center justify-center mx-auto">
                      <Lock className="w-6 h-6" />
                    </div>

                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-orange">
                        1 Kuota Klaim Tersedia
                      </span>
                      <h3 className="font-headline font-bold text-xl text-dark mt-1">
                        Yearbook Angkatan Terproteksi
                      </h3>
                      <p className="font-sans text-xs text-dark/70 mt-1">
                        Buka pratinjau penuh menggunakan kode akses tamu Anda ({kode}) atau sandi panitia.
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => setShowUnlockModal(true)}
                        className="inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange/90 text-white font-mono font-bold text-xs uppercase px-5 py-3 rounded-lg shadow-sm transition-colors cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Buka Kunci Pratinjau</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* TAMPILAN JIKA SUDAH TERBUKA (MOU ATAU GUEST YANG SUDAH KLAIM) */
                <div className="space-y-6">
                  {isGuest && (
                    <div className="bg-[#FAF6F0] border border-dark/15 p-3.5 rounded-lg flex items-center justify-between text-dark">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-orange shrink-0" />
                        <span className="font-mono text-xs font-bold">
                          Klaim Berhasil: Akses Pratinjau Terbuka
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-dark/50 uppercase">
                        Aktif
                      </span>
                    </div>
                  )}

                  <div className="rounded-xl border border-dark/15 bg-white p-6 sm:p-8 shadow-sm">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-orange">
                      Edisi Digital Interaktif
                    </span>
                    <h3 className="font-headline font-bold text-2xl text-dark mt-1">
                      Virtual Flipbook 3D Angkatan
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-dark/70 mt-1 max-w-2xl">
                      E-book buku tahunan digital dengan simulasi bolak-balik halaman realistis dan navigasi daftar isi kilat.
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() =>
                          alert(
                            "Membuka 3D Flipbook Reader Interaktif Fullscreen..."
                          )
                        }
                        className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white font-mono font-bold text-xs uppercase px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                      >
                        <Layers className="w-4 h-4" />
                        <span>Buka Flipbook Reader</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          alert("Link Flipbook angkatan berhasil disalin!");
                        }}
                        className="inline-flex items-center gap-2 bg-[#FAF6F0] text-dark font-mono text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-dark hover:text-white transition-colors cursor-pointer border border-dark/15"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Salin Link</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg border border-dark/10 bg-white">
                      <div className="font-headline font-bold text-xs uppercase text-dark">
                        Mobile &amp; Desktop
                      </div>
                      <p className="font-sans text-xs text-dark/60 mt-1">
                        Bisa dibuka di seluruh browser ponsel pintar dan laptop tanpa install aplikasi.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg border border-dark/10 bg-white">
                      <div className="font-headline font-bold text-xs uppercase text-dark">
                        Video &amp; AR Embed
                      </div>
                      <p className="font-sans text-xs text-dark/60 mt-1">
                        Aftermovie kelas dapat diputar langsung di dalam halaman flipbook.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg border border-dark/10 bg-white">
                      <div className="font-headline font-bold text-xs uppercase text-dark">
                        Privasi Token
                      </div>
                      <p className="font-sans text-xs text-dark/60 mt-1">
                        Akses terlindungi kode token angkatan unik sekolahmu.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= 8. TAB 6: KONTAK PIC & PANDUAN ================= */}
          {activeTab === "contact" && (
            <div className="grid lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5 rounded-xl border border-dark/10 bg-white p-6 shadow-sm space-y-4">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-orange">
                  Dedicated Project Manager
                </span>
                <h3 className="font-headline font-bold text-lg text-dark">
                  Penanggung Jawab Angkatan
                </h3>
                <p className="font-sans text-xs text-dark/70">
                  Kontak langsung dari tim Fourjective Studio untuk mengawal timeline angkatanmu.
                </p>

                <div className="p-4 border border-dark/10 rounded-lg bg-[#FAF6F0] flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-lg bg-dark text-orange flex items-center justify-center font-headline font-bold text-base shrink-0">
                    {pmName
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-headline font-bold text-sm text-dark truncate">
                      {pmName}
                    </h4>
                    <p className="font-mono text-[10px] text-dark/50 uppercase truncate">
                      Lead Project Manager
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <a
                    href={waLink(
                      isGuest
                        ? `Halo Kak ${pmName} (PM Fourjective), saya ingin booking jadwal photoshoot & ajukan kontrak MOU untuk ${schoolName}.`
                        : `Halo Kak ${pmName} (PM Fourjective), saya panitia kode ${kode} dari ${schoolName} ingin koordinasi materi.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange/90 text-white font-mono font-bold text-xs uppercase py-2.5 px-4 rounded-lg transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>
                      {isGuest
                        ? "Booking via WhatsApp"
                        : `Chat Kak ${pmName.split(" ")[0]}`}
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <p className="font-mono text-[10px] text-dark/40 text-center">
                    Senin – Sabtu, 08.00 – 21.00 WIB
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 rounded-xl border border-dark/10 bg-white p-6 shadow-sm space-y-4">
                <h3 className="font-headline font-bold text-lg text-dark border-b border-dark/10 pb-3">
                  Panduan Panitia
                </h3>

                <div className="space-y-3">
                  {[
                    {
                      q: "Kapan batas akhir pengumpulan materi foto & bio siswa?",
                      a: "Maksimal 14 hari kerja setelah sesi photoshoot selesai agar tidak menggeser antrean mesin cetak offset.",
                    },
                    {
                      q: "Berapa kali kesempatan revisi dummy sebelum naik cetak?",
                      a: "Disediakan 2 kali putaran revisi menyeluruh untuk teks, foto, dan tata letak halaman sebelum plat cetak dibuat.",
                    },
                    {
                      q: "Apakah data dan foto kami aman?",
                      a: "Sangat aman. Setiap dashboard dan folder storage dienkripsi terpisah via kode unik sekolah.",
                    },
                    {
                      q: "Bagaimana jika ada eksemplar buku cacat cetak?",
                      a: "Fourjective menerapkan garansi 100% ganti baru jika terdapat cacat jilid atau halaman terbalik.",
                    },
                  ].map((faq, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 border border-dark/10 rounded-lg bg-[#FAF6F0]"
                    >
                      <h4 className="font-headline font-bold text-xs uppercase text-dark">
                        {idx + 1}. {faq.q}
                      </h4>
                      <p className="font-sans text-xs text-dark/70 mt-1">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* ================= MODAL POPUP PASSWORD UNLOCK YEARBOOK ================= */}
          {showUnlockModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm animate-in fade-in duration-150">
              <div className="w-full max-w-sm bg-white border border-dark/20 rounded-xl p-5 shadow-lg space-y-4 relative">
                <div className="flex items-center justify-between border-b border-dark/10 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-orange text-white flex items-center justify-center">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-sm text-dark">
                        Buka Akses Yearbook
                      </h4>
                      <p className="font-mono text-[10px] text-dark/50">
                        1 Kuota Pratinjau Demo
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowUnlockModal(false);
                      setUnlockError("");
                    }}
                    className="p-1 rounded text-dark/40 hover:text-dark transition-colors cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <p className="font-sans text-xs text-dark/70">
                  Masukkan kode akses tamu Anda (<strong>{kode}</strong>) atau sandi panitia.
                </p>

                <form onSubmit={handleUnlockYearbook} className="space-y-3 pt-1">
                  <div>
                    <input
                      type="text"
                      autoFocus
                      required
                      placeholder={`Ketik ${kode} atau sandi`}
                      value={unlockPassword}
                      onChange={(e) => setUnlockPassword(e.target.value)}
                      className="w-full bg-[#FAF6F0] border border-dark/20 focus:border-orange rounded-lg px-3 py-2 text-xs text-dark placeholder-dark/40 outline-none font-mono font-bold transition-colors uppercase"
                    />
                    {unlockError && (
                      <p className="font-mono text-[10px] text-rose-600 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{unlockError}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowUnlockModal(false);
                        setUnlockError("");
                      }}
                      className="px-3 py-2 rounded-lg border border-dark/15 text-xs font-mono text-dark hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 bg-orange hover:bg-orange/90 text-white font-mono font-bold text-xs uppercase px-4 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Buka Akses</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
