"use client";

import React, { useState } from "react";
import { Portfolio } from "@/services/api";
import { SchoolFolderCard } from "./SchoolFolderCard";
import {
  BookPlus,
  UploadCloud,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  Lock,
  Unlock,
  ChevronDown,
  ChevronUp,
  Folder,
  Table as TableIcon,
  Search,
  ExternalLink,
  Sparkles,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface PortfolioManagerProps {
  portfolios: Portfolio[];
  onRefresh?: () => void;
}

const DUMMY_YEARBOOKS = [
  {
    id: 101,
    namaSekolah: "Pesantren Al-Hamidiyah",
    tahun: 2026,
    cover: "/images/gallery/yearbook-result/new/result/result-1-optimized.png",
    pageCount: 160,
    studentCount: 380,
    fileSize: "3.4 GB",
    isLocked: true,
    theme: "orange-liquid" as const,
  },
  {
    id: 102,
    namaSekolah: "SMA Labschool Kebayoran",
    tahun: 2025,
    cover: "/images/gallery/yearbook-result/barbie-optimized.png",
    pageCount: 140,
    studentCount: 290,
    fileSize: "2.8 GB",
    isLocked: false,
    theme: "amber-fire" as const,
  },
  {
    id: 103,
    namaSekolah: "SMA Taruna Nusantara",
    tahun: 2025,
    cover: "/images/gallery/yearbook-result/black-optimized.png",
    pageCount: 180,
    studentCount: 420,
    fileSize: "4.2 GB",
    isLocked: true,
    theme: "dark-marble" as const,
  },
  {
    id: 104,
    namaSekolah: "SMAK Petra 1 Surabaya",
    tahun: 2024,
    cover: "/images/gallery/yearbook-result/new/result/result-2-optimized.png",
    pageCount: 120,
    studentCount: 260,
    fileSize: "2.1 GB",
    isLocked: false,
    theme: "frosted-glass" as const,
  },
  {
    id: 105,
    namaSekolah: "MAN 1 Kota Serang",
    tahun: 2024,
    cover: "/images/gallery/yearbook-result/downtown-optimized.png",
    pageCount: 130,
    studentCount: 310,
    fileSize: "2.9 GB",
    isLocked: true,
    theme: "orange-liquid" as const,
  },
  {
    id: 106,
    namaSekolah: "SMA Mondial Batam",
    tahun: 2024,
    cover: "/images/gallery/yearbook-result/new/result/result-4-optimized.png",
    pageCount: 110,
    studentCount: 195,
    fileSize: "1.9 GB",
    isLocked: false,
    theme: "amber-fire" as const,
  },
];

export function PortfolioManager({ portfolios, onRefresh }: PortfolioManagerProps) {
  // Mode ekspansi form Tambah Buku Baru
  const [isFormExpanded, setIsFormExpanded] = useState(true);
  const [viewStyle, setViewStyle] = useState<"grid" | "table">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    namaSekolah: "",
    tahun: new Date().getFullYear().toString(),
    jumlahHalaman: "120",
    studentCount: "250",
    password: "",
  });
  const [cover, setCover] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setCover(file);
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdf(file);
    }
  };

  // Upload langsung ke Cloudflare R2 via Presigned PUT
  const uploadToR2 = async (file: File, key: string): Promise<string> => {
    // 1. Minta Presigned PUT URL dari API
    const presignRes = await fetch("/api/storage/presign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });

    if (!presignRes.ok) {
      const errJson = await presignRes.json().catch(() => ({}));
      throw new Error(errJson.error || "Gagal mendapatkan izin upload R2.");
    }

    const { uploadUrl, downloadUrl } = await presignRes.json();

    // 2. Direct PUT ke Cloudflare R2 (Bypass Vercel payload limit)
    const putRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!putRes.ok) {
      throw new Error(`Upload ${file.name} ke Cloudflare R2 gagal (${putRes.status})`);
    }

    return downloadUrl || key;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.namaSekolah) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const slug = formData.namaSekolah
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 30);

      // 1. Upload Cover jika ada
      if (cover) {
        setUploadProgress("Mengunggah sampul cover ke Cloudflare R2...");
        const coverKey = `yearbooks/${formData.tahun}/${slug}/cover-${Date.now()}.${cover.name.split(".").pop() || "png"}`;
        await uploadToR2(cover, coverKey);
      }

      // 2. Upload Master PDF jika ada
      if (pdf) {
        setUploadProgress(`Mengunggah master PDF (${(pdf.size / (1024 * 1024)).toFixed(1)} MB) langsung ke R2...`);
        const pdfKey = `yearbooks/${formData.tahun}/${slug}/master-yearbook-${Date.now()}.pdf`;
        await uploadToR2(pdf, pdfKey);
      }

      setUploadProgress(null);
      setSuccessMessage(
        `Buku "${formData.namaSekolah}" berhasil dipublish ke Cloudflare R2! Siap dibagikan ke siswa dan dibuka di Flipbook 3D.`
      );

      // Reset form
      setFormData({
        namaSekolah: "",
        tahun: new Date().getFullYear().toString(),
        jumlahHalaman: "120",
        studentCount: "250",
        password: "",
      });
      setCover(null);
      setPdf(null);

      if (onRefresh) onRefresh();
      setTimeout(() => setSuccessMessage(null), 6000);
    } catch (err: any) {
      console.error("Gagal upload buku:", err);
      setErrorMessage(err.message || "Gagal mengunggah buku ke Cloudflare R2.");
      setUploadProgress(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const activePortfolios = portfolios.length > 0 ? portfolios : (DUMMY_YEARBOOKS as any);

  const filteredPortfolios = activePortfolios.filter(
    (p: any) =>
      p.namaSekolah.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tahun.toString().includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* ======================================================== */}
      {/* 1. FORM EKSPANSI: INPUT BUKU BARU (DIRECT TO CLOUDFLARE R2) */}
      {/* ======================================================== */}
      <div className="rounded-2xl border border-dark/15 bg-white shadow-sm overflow-hidden transition-all">
        {/* Toggle Bar Form */}
        <div
          onClick={() => setIsFormExpanded(!isFormExpanded)}
          className="flex items-center justify-between p-5 bg-[#FAF6F0] border-b border-dark/15 cursor-pointer hover:bg-[#FAF6F0]/80 transition-colors select-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange text-white flex items-center justify-center font-headline font-black text-lg shadow-sm">
              <BookPlus className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-orange">
                  Cloudflare R2 Direct Upload
                </span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-900 text-white">
                  $0 Egress • Bypass Vercel Limit
                </span>
              </div>
              <h3 className="font-headline font-black text-lg text-dark mt-0.5">
                Form Unggah Buku Tahunan Baru
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-dark/60 hidden sm:inline">
              {isFormExpanded ? "Ciutkan Form" : "Buka Form Input"}
            </span>
            <div className="w-8 h-8 rounded-lg bg-white border border-dark/15 flex items-center justify-center text-dark">
              {isFormExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
          </div>
        </div>

        {/* Isi Form Input Ekspansi */}
        {isFormExpanded && (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {successMessage && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center gap-3 text-emerald-900 font-sans font-semibold text-xs animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-300 flex items-center gap-3 text-red-900 font-sans font-semibold text-xs animate-in fade-in">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kolom Kiri: Metadata Sekolah & Angkatan */}
              <div className="space-y-4">
                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-dark/70 mb-1.5">
                    Nama Sekolah / Angkatan *
                  </label>
                  <input
                    type="text"
                    required
                    name="namaSekolah"
                    value={formData.namaSekolah}
                    onChange={handleInputChange}
                    placeholder="Contoh: Pesantren Al-Hamidiyah"
                    className="w-full bg-[#FAF6F0] border-2 border-dark/20 focus:border-orange rounded-xl px-4 py-2.5 font-sans font-bold text-xs text-dark outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-dark/70 mb-1.5">
                      Tahun Lulus *
                    </label>
                    <input
                      type="text"
                      required
                      name="tahun"
                      value={formData.tahun}
                      onChange={handleInputChange}
                      placeholder="2026"
                      className="w-full bg-[#FAF6F0] border-2 border-dark/20 focus:border-orange rounded-xl px-4 py-2.5 font-mono font-bold text-xs text-dark outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-dark/70 mb-1.5">
                      Total Hal
                    </label>
                    <input
                      type="number"
                      name="jumlahHalaman"
                      value={formData.jumlahHalaman}
                      onChange={handleInputChange}
                      placeholder="120"
                      className="w-full bg-[#FAF6F0] border-2 border-dark/20 focus:border-orange rounded-xl px-4 py-2.5 font-mono font-bold text-xs text-dark outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-dark/70 mb-1.5">
                      Jml Siswa
                    </label>
                    <input
                      type="number"
                      name="studentCount"
                      value={formData.studentCount}
                      onChange={handleInputChange}
                      placeholder="250"
                      className="w-full bg-[#FAF6F0] border-2 border-dark/20 focus:border-orange rounded-xl px-4 py-2.5 font-mono font-bold text-xs text-dark outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-dark/70 mb-1.5">
                    PIN / Password Privasi (Opsional)
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Kosongkan jika buku publik tanpa proteksi"
                    className="w-full bg-[#FAF6F0] border-2 border-dark/20 focus:border-orange rounded-xl px-4 py-2.5 font-mono font-bold text-xs text-dark outline-none transition-all"
                  />
                  <p className="font-sans text-[10px] text-dark/50 mt-1">
                    Jika diisi, pengunjung umum atau siswa harus memasukkan PIN ini untuk membuka lembaran buku.
                  </p>
                </div>
              </div>

              {/* Kolom Kanan: 2 Input Master Berkas (PDF & Cover) */}
              <div className="space-y-4">
                {/* Upload File PDF Master Yearbook */}
                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-dark/70 mb-1.5">
                    File Master PDF Yearbook (Flipbook Engine)
                  </label>
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-dark/25 hover:border-orange rounded-xl bg-[#FAF6F0] cursor-pointer transition-colors group">
                    <FileText className="w-6 h-6 text-dark/40 group-hover:text-orange mb-1.5 transition-colors" />
                    <span className="font-mono text-xs font-bold text-dark group-hover:text-orange text-center">
                      {pdf ? `${pdf.name} (${(pdf.size / (1024 * 1024)).toFixed(1)} MB)` : "Pilih File PDF Buku Tahunan"}
                    </span>
                    <span className="font-mono text-[10px] text-dark/50 mt-0.5">
                      Bisa sampai 500 MB+ • Langsung streaming ke Cloudflare R2
                    </span>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handlePdfChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Upload Gambar Cover */}
                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-dark/70 mb-1.5">
                    File Gambar Sampul Cover Depan
                  </label>
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-dark/25 hover:border-orange rounded-xl bg-[#FAF6F0] cursor-pointer transition-colors group">
                    <ImageIcon className="w-6 h-6 text-dark/40 group-hover:text-orange mb-1.5 transition-colors" />
                    <span className="font-mono text-xs font-bold text-dark group-hover:text-orange text-center">
                      {cover ? cover.name : "Pilih Gambar Cover (PNG / JPG)"}
                    </span>
                    <span className="font-mono text-[10px] text-dark/50 mt-0.5">
                      Rasio 3:4 vertikal • Diselipkan ke saku folder interaktif
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Footer Form Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-dark/10">
              <p className="font-sans text-xs text-dark/60 font-semibold">
                {uploadProgress ? (
                  <span className="inline-flex items-center gap-2 text-orange font-mono">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {uploadProgress}
                  </span>
                ) : (
                  "Buku yang diterbitkan otomatis tersimpan ke Cloudflare R2 dan siap dibagikan ke siswa."
                )}
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange/90 text-white font-headline font-black text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all cursor-pointer shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Mengunggah ke R2...</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4" />
                    <span>Terbitkan Buku ke R2</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* ======================================================== */}
      {/* 2. FILE MANAGER & DAFTAR ARSIP FOLDER BUKU TAHUNAN */}
      {/* ======================================================== */}
      <div className="rounded-2xl border border-dark/15 bg-white p-6 shadow-sm space-y-6">
        {/* Header Toolbar File Manager */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-orange">
                Yearbook File Manager
              </span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-900 text-white">
                {filteredPortfolios.length} Folder Buku
              </span>
            </div>
            <h3 className="font-headline font-black text-xl text-dark mt-0.5">
              Arsip Folder Portofolio & Berkas
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-dark/40" />
              <input
                type="text"
                placeholder="Cari sekolah atau tahun..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-[#FAF6F0] border border-dark/15 rounded-lg font-sans text-xs text-dark outline-none focus:border-orange"
              />
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-[#FAF6F0] p-1 rounded-lg border border-dark/15 font-mono text-xs font-bold">
              <button
                type="button"
                onClick={() => setViewStyle("grid")}
                className={`p-1.5 rounded transition-all cursor-pointer ${
                  viewStyle === "grid"
                    ? "bg-dark text-white shadow-xs"
                    : "text-dark/60 hover:text-dark"
                }`}
                title="Tampilan Folder Kartu (10% Sampul Peek & Hover Slide)"
              >
                <Folder className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewStyle("table")}
                className={`p-1.5 rounded transition-all cursor-pointer ${
                  viewStyle === "table"
                    ? "bg-dark text-white shadow-xs"
                    : "text-dark/60 hover:text-dark"
                }`}
                title="Tampilan Tabel File"
              >
                <TableIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* TAMPILAN 1: FOLDER CARDS */}
        {viewStyle === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {filteredPortfolios.map((item: any, idx: number) => {
              return (
                <SchoolFolderCard
                  key={item.id}
                  portfolio={item}
                  folderName={item.namaSekolah}
                  year={item.tahun}
                  studentCount={item.studentCount || (240 + (item.id * 15) % 180)}
                  pageCount={item.pageCount || (100 + (item.id * 8) % 60)}
                  fileSize={item.fileSize || `${(2.1 + (item.id % 5) * 0.4).toFixed(1)} GB`}
                  isLocked={item.isLocked !== undefined ? item.isLocked : idx % 2 === 1}
                  coverImage={item.cover}
                />
              );
            })}
          </div>
        )}

        {/* TAMPILAN 2: TABEL FILE MANAGER */}
        {viewStyle === "table" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-dark/15 font-mono text-[10px] font-bold uppercase tracking-wider text-dark/70 bg-[#FAF6F0]">
                  <th className="p-3 font-bold">Cover</th>
                  <th className="p-3 font-bold">Nama Sekolah & Folder</th>
                  <th className="p-3 font-bold">Tahun</th>
                  <th className="p-3 font-bold">Status Flipbook</th>
                  <th className="p-3 font-bold">Akses</th>
                  <th className="p-3 font-bold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark/10 font-sans">
                {filteredPortfolios.map((item: any) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#FAF6F0] transition-colors"
                  >
                    <td className="p-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-dark/10 border border-dark/15">
                        {item.cover ? (
                          <img
                            src={item.cover}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-dark/40 font-mono text-[10px]">
                            PDF
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-sans font-bold text-dark text-sm">
                        {item.namaSekolah}
                      </div>
                      <div className="font-mono text-[11px] text-dark/50">
                        {item.namaAkun || `ID #${item.id}`}
                      </div>
                    </td>
                    <td className="p-3 font-mono font-bold text-xs text-orange">
                      {item.tahun}
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Ready di R2</span>
                      </span>
                    </td>
                    <td className="p-3 font-mono text-xs">
                      <span className="inline-flex items-center gap-1 text-dark/60">
                        <Unlock className="w-3 h-3 text-dark/40" /> Publik
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <a
                        href={`/dashboard/${item.id}`}
                        className="inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase px-2.5 py-1 rounded bg-[#FAF6F0] hover:bg-dark hover:text-white transition-all border border-dark/20 text-dark"
                      >
                        <span>Buka Folder</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
