"use client";

import React, { useState, useEffect } from "react";
import {
  UploadCloud,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  HardDrive,
  FileText,
  Video,
  Layers,
  Sparkles,
  Link2,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { AdminProject } from "./MOUProjectManager";

interface DeliverableHandoffProps {
  projects: AdminProject[];
  onRefresh: () => void;
}

interface DeliverableItem {
  id: string;
  type: "master_pdf" | "zip_photos" | "video_4k" | "flipbook";
  title: string;
  size: string;
  r2_key: string;
  uploaded_at: string;
}

export function DeliverableHandoff({ projects, onRefresh }: DeliverableHandoffProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    projects[0]?.id || ""
  );
  const [fileType, setFileType] = useState<"master_pdf" | "zip_photos" | "video_4k" | "flipbook">("master_pdf");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [r2Key, setR2Key] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  // Dummy list berkas terhubung untuk demo preview
  const [deliverables, setDeliverables] = useState<DeliverableItem[]>([
    {
      id: "1",
      type: "master_pdf",
      title: "Master Cetak Digital Buku Tahunan (Heidelberg Press Ready)",
      size: "284 MB",
      r2_key: "schools/SMAN1-2026/master-print.pdf",
      uploaded_at: "Hari ini, 14:20",
    },
    {
      id: "2",
      type: "zip_photos",
      title: "Semua File Foto High-Res Angkatan (Per Kelas & Guru)",
      size: "4.8 GB",
      r2_key: "schools/SMAN1-2026/photos-all.zip",
      uploaded_at: "Kemarin, 19:10",
    },
    {
      id: "3",
      type: "video_4k",
      title: "Trailer & Aftermovie Wisuda 4K Sinematik (Final Cut)",
      size: "1.2 GB",
      r2_key: "schools/SMAN1-2026/aftermovie-4k.mp4",
      uploaded_at: "3 hari lalu",
    },
  ]);

  useEffect(() => {
    if (activeProject && !r2Key) {
      setR2Key(`schools/${activeProject.access_code}/master-yearbook.pdf`);
      setFileName(`Buku Tahunan ${activeProject.school_name} (High-Res Master).pdf`);
      setFileSize("380 MB");
    }
  }, [activeProject]);

  const handleQuickTemplate = (type: "master_pdf" | "zip_photos" | "video_4k" | "flipbook") => {
    setFileType(type);
    if (!activeProject) return;
    const code = activeProject.access_code;

    if (type === "master_pdf") {
      setFileName(`Buku Tahunan ${activeProject.school_name} (High-Res Master).pdf`);
      setFileSize("380 MB");
      setR2Key(`schools/${code}/master-print.pdf`);
    } else if (type === "zip_photos") {
      setFileName(`Dokumentasi Foto Angkatan HD (${activeProject.school_name}).zip`);
      setFileSize("4.2 GB");
      setR2Key(`schools/${code}/photos-all.zip`);
    } else if (type === "video_4k") {
      setFileName(`Aftermovie Wisuda Sinematik 4K (${activeProject.school_name}).mp4`);
      setFileSize("1.6 GB");
      setR2Key(`schools/${code}/aftermovie-4k.mp4`);
    } else {
      setFileName(`Virtual 3D Flipbook Web (${activeProject.school_name})`);
      setFileSize("Online");
      setR2Key(`https://fourjectiv.com/track/${code}`);
    }
  };

  const copyPresignCommand = async (key: string) => {
    try {
      const res = await fetch(`/api/storage/presign?key=${encodeURIComponent(key)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.downloadUrl) {
          navigator.clipboard.writeText(json.downloadUrl);
          setCopiedKey(key);
          setTimeout(() => setCopiedKey(null), 2000);
          return;
        }
      }
    } catch (e) {
      console.error("Gagal generate downloadUrl:", e);
    }
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleAddDeliverable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName || !r2Key) return;

    const newItem: DeliverableItem = {
      id: Date.now().toString(),
      type: fileType,
      title: fileName,
      size: fileSize || "Direct Link",
      r2_key: r2Key,
      uploaded_at: "Baru saja",
    };

    setDeliverables([newItem, ...deliverables]);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleDelete = (id: string) => {
    setDeliverables(deliverables.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-dark/15 p-5 sm:p-6 rounded-2xl shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-orange">
              CLOUDFLARE R2 • HANDOFF BERKAS
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-dark bg-[#FAF6F0] px-2.5 py-1 rounded-md border border-dark/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Zero Egress Fee</span>
            </span>
          </div>
          <h2 className="font-headline font-black text-2xl text-dark mt-1 tracking-tight">
            Kirim Berkas Akhir Siswa
          </h2>
          <p className="font-sans font-semibold text-xs text-dark/70 mt-1">
            Daftarkan link master PDF cetak, arsip foto HD, dan video 4K agar langsung muncul di portal tracking siswa.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onRefresh}
            className="p-2.5 rounded-xl border border-dark/15 hover:bg-slate-100 text-dark/70 transition-colors cursor-pointer"
            title="Segarkan Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Side-by-Side: Form Input di Kiri (5 Kolom), Live Berkas di Kanan (7 Kolom) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* KOLOM KIRI: FORM DAFTARKAN BERKAS (5 Kolom) */}
        <div className="lg:col-span-5 bg-white border border-dark/15 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between pb-3.5 border-b border-dark/10">
            <div className="flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-orange" />
              <h3 className="font-headline font-black text-base text-dark">
                Input Berkas Baru
              </h3>
            </div>
            {isSaved && (
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-dark/70 bg-[#FAF6F0] px-2 py-0.5 rounded border border-dark/15 flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" /> Berhasil Terbit!
              </span>
            )}
          </div>

          <form onSubmit={handleAddDeliverable} className="space-y-4 mt-4">
            {/* 1. Pilih Sekolah */}
            <div>
              <label className="block font-sans font-semibold text-xs text-dark/70 uppercase mb-1.5">
                Sekolah Mitra Target
              </label>
              <select
                value={selectedProjectId}
                onChange={(e) => {
                  setSelectedProjectId(e.target.value);
                  const p = projects.find((x) => x.id === e.target.value);
                  if (p) {
                    setR2Key(`schools/${p.access_code}/master-yearbook.pdf`);
                  }
                }}
                className="w-full bg-[#FAF6F0] border border-dark/20 focus:border-orange rounded-xl px-3.5 py-2.5 font-mono text-xs font-bold text-dark cursor-pointer transition-colors focus:outline-none"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.school_name} ({p.access_code})
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Pilihan Jenis Berkas */}
            <div>
              <label className="block font-sans font-semibold text-xs text-dark/70 uppercase mb-1.5">
                Pilih Jenis Berkas
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: "master_pdf", label: "Master PDF", icon: FileText },
                  { key: "zip_photos", label: "ZIP Foto HD", icon: HardDrive },
                  { key: "video_4k", label: "Video 4K", icon: Video },
                  { key: "flipbook", label: "Flipbook Web", icon: Layers },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = fileType === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleQuickTemplate(item.key as any)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                        isActive
                          ? "bg-orange text-white border-orange shadow-sm font-bold"
                          : "bg-[#FAF6F0] text-dark/70 border-dark/15 hover:border-dark/30 font-medium"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="font-sans font-semibold text-xs truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Label Nama Berkas */}
            <div>
              <label className="block font-sans font-semibold text-xs text-dark/70 uppercase mb-1">
                Nama Tampilan di Portal Siswa
              </label>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Contoh: Master Cetak Buku Tahunan Digital.pdf"
                className="w-full bg-[#FAF6F0] border border-dark/20 focus:border-orange rounded-xl px-3.5 py-2 font-mono text-xs font-bold text-dark transition-colors focus:outline-none"
                required
              />
            </div>

            {/* 4. Ukuran & Path R2 Storage */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block font-sans font-semibold text-xs text-dark/70 uppercase mb-1">
                  Ukuran
                </label>
                <input
                  type="text"
                  value={fileSize}
                  onChange={(e) => setFileSize(e.target.value)}
                  placeholder="380 MB"
                  className="w-full bg-[#FAF6F0] border border-dark/20 focus:border-orange rounded-xl px-3 py-2 font-mono text-xs font-bold text-dark text-center transition-colors focus:outline-none"
                />
              </div>

              <div className="col-span-2">
                <label className="block font-sans font-semibold text-xs text-dark/70 uppercase mb-1">
                  Cloudflare R2 Key / URL
                </label>
                <input
                  type="text"
                  value={r2Key}
                  onChange={(e) => setR2Key(e.target.value)}
                  placeholder="schools/SMAN1-2026/master.pdf"
                  className="w-full bg-[#FAF6F0] border border-dark/20 focus:border-orange rounded-xl px-3 py-2 font-mono text-xs font-bold text-dark transition-colors focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-orange hover:bg-orange/90 text-white font-headline font-black text-xs uppercase tracking-wider py-3 px-4 rounded-xl shadow-md shadow-orange/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <UploadCloud className="w-4 h-4 stroke-[2.5]" />
              <span>Simpan &amp; Terbitkan ke Siswa</span>
            </button>
          </form>
        </div>

        {/* KOLOM KANAN: STATUS BERKAS ANGKATAN TERPILIH (7 Kolom) */}
        <div className="lg:col-span-7 bg-white border border-dark/15 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-dark/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-orange text-white px-2 py-0.5 rounded shadow-sm">
                  {activeProject?.access_code}
                </span>
                <span className="font-sans font-semibold text-xs text-dark/70 uppercase">
                  {activeProject?.city}
                </span>
              </div>
              <h3 className="font-headline font-black text-xl text-dark mt-1 tracking-tight">
                {activeProject?.school_name}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`/track/${activeProject?.access_code}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-headline font-black text-xs uppercase tracking-wider text-orange hover:underline self-start sm:self-auto"
              >
                <span>Buka Portal Siswa</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Banner Proteksi Status Kas Proyek */}
          {activeProject && (
            <div
              className={`p-3.5 rounded-xl border flex items-center justify-between text-xs font-mono ${
                activeProject.payment_installments?.every((i) => i.status === "paid")
                  ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                  : "bg-amber-50 border-amber-200 text-amber-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-bold uppercase">Status Gembok Kas:</span>
                <span>
                  {activeProject.payment_installments?.every((i) => i.status === "paid")
                    ? "✓ Seluruh Termin Lunas — Unduhan siswa terbuka penuh"
                    : "⚠️ Kas Belum Lunas — Port unduh otomatis terkunci di portal siswa sampai termin diselesaikan"}
                </span>
              </div>
              <span className="font-bold text-[10px] uppercase px-2 py-0.5 rounded bg-white border border-dark/10">
                Tahap {activeProject.current_stage}/6
              </span>
            </div>
          )}

          {/* List Berkas Tersedia */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-dark/70">
                BERKAS AKTIF DAPAT DIUNDUH SISWA ({deliverables.length})
              </span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                ● Terhubung Cloud CDN
              </span>
            </div>

            {deliverables.length === 0 ? (
              <div className="p-8 text-center bg-[#FAF6F0] rounded-xl border border-dark/10 font-sans font-semibold text-xs text-dark/70">
                Belum ada berkas untuk sekolah ini. Gunakan form di sebelah kiri untuk menambahkan.
              </div>
            ) : (
              deliverables.map((item) => {
                const isPdf = item.type === "master_pdf";
                const isZip = item.type === "zip_photos";
                const isVideo = item.type === "video_4k";

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-[#FAF6F0] border border-dark/15 hover:border-dark/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white border border-dark/15 text-orange flex items-center justify-center shrink-0 mt-0.5">
                        {isPdf && <FileText className="w-4 h-4" />}
                        {isZip && <HardDrive className="w-4 h-4 text-dark" />}
                        {isVideo && <Video className="w-4 h-4 text-orange" />}
                        {!isPdf && !isZip && !isVideo && <Layers className="w-4 h-4 text-dark" />}
                      </div>

                      <div className="space-y-0.5">
                        <div className="font-headline font-bold text-sm text-dark leading-snug">
                          {item.title}
                        </div>
                        <div className="font-mono text-[11px] font-bold text-dark/60">
                          Ukuran: <strong className="text-dark">{item.size}</strong> • {item.uploaded_at}
                        </div>
                        <div className="font-mono text-[11px] font-bold text-dark/60 truncate max-w-sm">
                          {item.r2_key}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => copyPresignCommand(item.r2_key)}
                        className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-dark font-headline font-black text-xs uppercase tracking-wider transition-colors cursor-pointer border border-dark/15 flex items-center gap-1"
                        title="Salin Presigned Link"
                      >
                        {copiedKey === item.r2_key ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-dark/60" />
                        )}
                        <span>{copiedKey === item.r2_key ? "Disalin" : "Link"}</span>
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg bg-white hover:bg-rose-50 text-dark/40 hover:text-rose-600 transition-colors cursor-pointer border border-dark/15"
                        title="Hapus Berkas"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Info Storage */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-dark/10 flex flex-wrap items-center justify-between gap-3 font-sans font-semibold text-xs text-dark/70">
            <span>Infrastruktur: Cloudflare R2 (Bebas Biaya Egress / Kuota Tak Terbatas)</span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-700">● 100% Uptime</span>
          </div>
        </div>
      </div>
    </div>
  );
}
