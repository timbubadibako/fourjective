"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Copy,
  Check,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  School,
  Calendar,
  Users,
  Layers,
  FileCheck2,
  Receipt,
  Sparkles,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

export interface ProjectMilestone {
  id: string;
  step_number: number;
  title: string;
  description: string;
  status: "done" | "active" | "pending";
  target_date: string;
}

export interface PaymentInstallment {
  id: string;
  installment_number: number;
  title: string;
  amount: number;
  status: "paid" | "pending";
  due_date: string;
  receipt_number: string;
  notes: string;
}

export interface AdminProject {
  id: string;
  access_code: string;
  school_name: string;
  graduation_year: number;
  city: string;
  package_name: string;
  student_count: number;
  page_count: number;
  cover_type: "hardcover" | "leather" | "acrylic";
  status: string;
  current_stage: number;
  target_graduation: string;
  pic_name: string;
  pic_whatsapp: string;
  pm_assigned: string;
  created_at: string;
  project_milestones?: ProjectMilestone[];
  payment_installments?: PaymentInstallment[];
}

export function MOUProjectManager() {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    access_code: string;
    school_name: string;
    pic_name: string;
    pic_whatsapp: string;
  } | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [copiedMsg, setCopiedMsg] = useState(false);

  // Form State
  const [schoolName, setSchoolName] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [gradYear, setGradYear] = useState(2026);
  const [city, setCity] = useState("Kuningan");
  const [picName, setPicName] = useState("");
  const [picWhatsapp, setPicWhatsapp] = useState("");
  const [studentCount, setStudentCount] = useState(180);
  const [pageCount, setPageCount] = useState(80);
  const [coverType, setCoverType] = useState<"hardcover" | "leather" | "acrylic">("hardcover");
  const [pricePerStudent, setPricePerStudent] = useState(165000);
  const [targetGraduation, setTargetGraduation] = useState("Mei 2026");

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);
      }
    } catch (e) {
      console.error("Gagal load projects:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Auto-generate access code saat nama sekolah diketik
  useEffect(() => {
    if (!customCode || customCode.startsWith("SMAN") || customCode.startsWith("4J")) {
      const clean = schoolName
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(0, 5)
        .toUpperCase();
      if (clean) {
        setCustomCode(`${clean}-${gradYear}`);
      }
    }
  }, [schoolName, gradYear]);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          school_name: schoolName,
          access_code: customCode.trim().toUpperCase(),
          graduation_year: gradYear,
          city,
          package_name: "Yearbook Hardcover Exclusive",
          student_count: studentCount,
          page_count: pageCount,
          cover_type: coverType,
          target_graduation: targetGraduation,
          pic_name: picName,
          pic_whatsapp: picWhatsapp,
          pm_assigned: "Venny Meilinda",
          estimated_price_per_student: pricePerStudent,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Gagal membuat proyek");
        setIsSubmitting(false);
        return;
      }

      setSuccessData({
        access_code: data.access_code,
        school_name: schoolName,
        pic_name: picName,
        pic_whatsapp: picWhatsapp,
      });

      // Reset form & reload
      setSchoolName("");
      setCustomCode("");
      setPicName("");
      setPicWhatsapp("");
      fetchProjects();
    } catch (err: any) {
      setErrorMsg("Terjadi kegagalan koneksi server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStage = async (projectId: string, newStage: number) => {
    try {
      const res = await fetch(`/api/admin/projects/${projectId}/stage`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: newStage }),
      });
      if (res.ok) {
        fetchProjects();
      }
    } catch (e) {
      console.error("Gagal update stage:", e);
    }
  };

  const handleToggleInstallment = async (
    projectId: string,
    installmentId: string,
    currentStatus: string
  ) => {
    const nextStatus = currentStatus === "paid" ? "pending" : "paid";
    try {
      const res = await fetch(`/api/admin/projects/${projectId}/installment`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          installment_id: installmentId,
          status: nextStatus,
        }),
      });
      if (res.ok) {
        fetchProjects();
      }
    } catch (e) {
      console.error("Gagal toggle installment:", e);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const copyWhatsAppShare = (project: AdminProject) => {
    const text = `
*KODE AKSES RESMI BUKU TAHUNAN FOURJECTIVE*
Halo Kak ${project.pic_name || "Panitia"}!
Proyek buku tahunan untuk *${project.school_name}* (${project.graduation_year}) telah resmi terdaftar di sistem kami setelah MOU.

📌 *KODE AKSES ANGKATAN*: ${project.access_code}
🌐 *LINK PORTAL PEMANTAUAN*: https://fourjectiv.vercel.app/track/${project.access_code}

Tahap saat ini: *Tahap ${project.current_stage}/6*
Silakan bagikan tautan ini ke panitia untuk memantau alur foto, layout, dummy cetak, dan berkas Cloudflare R2 secara real-time. Terima kasih!
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header & Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-dark/10 p-5 rounded-2xl shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-black uppercase tracking-wider text-orange">
              DATABASE SUPABASE TERHUBUNG
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              ● Live PostgreSQL
            </span>
          </div>
          <h2 className="font-headline font-black text-xl text-dark mt-1">
            Manajemen Angkatan &amp; Kode Akses MOU
          </h2>
          <p className="font-sans text-xs text-dark/65 mt-0.5">
            Terbitkan token angkatan untuk sekolah yang sudah tanda tangan kontrak MOU &amp; DP.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchProjects}
            className="p-2.5 rounded-xl border border-dark/15 hover:bg-slate-100 text-dark/70 hover:text-dark transition-colors cursor-pointer"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-orange" : ""}`} />
          </button>

          <button
            onClick={() => {
              setSuccessData(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white font-headline font-black text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-md shadow-orange/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Generate Kode MOU Baru</span>
          </button>
        </div>
      </div>

      {/* Success Notification after Generation */}
      {successData && (
        <div className="p-5 rounded-2xl bg-emerald-950 text-white border-2 border-emerald-500 shadow-xl animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>KODE ANGKATAN BERHASIL DITERBITKAN &amp; MOU TERKUNCI</span>
              </div>
              <div className="font-headline font-black text-2xl text-white mt-1">
                {successData.school_name} &rarr;{" "}
                <span className="text-orange underline">{successData.access_code}</span>
              </div>
              <p className="font-mono text-xs text-white/70 mt-1">
                Tahap 1 (MOU &amp; DP 30%) otomatis tercatat lunas. 6 tahapan stepper &amp; kuitansi resmi siap diakses.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/track/${successData.access_code}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 bg-white text-dark hover:bg-orange hover:text-white font-mono text-xs font-black uppercase px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
              >
                <span>Buka Tracker Klien</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={() =>
                  copyWhatsAppShare({
                    ...successData,
                    graduation_year: 2026,
                    current_stage: 2,
                  } as any)
                }
                className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-dark font-mono text-xs font-black uppercase px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
              >
                {copiedMsg ? <Check className="w-3.5 h-3.5" /> : <MessageCircle className="w-3.5 h-3.5" />}
                <span>{copiedMsg ? "Tersalin!" : "Salin Pesan WA PIC"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List of Active Angkatan from Supabase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-headline font-black text-sm uppercase text-dark tracking-wide">
            Daftar Sekolah &amp; Status Alur ({projects.length} Terdaftar)
          </h3>
          <span className="font-mono text-[10px] text-dark/50">
            Klik nomor tahap 1–6 untuk memajukan status secara instan
          </span>
        </div>

        {isLoading ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-dark/10 font-mono text-xs text-dark/50">
            Memuat daftar angkatan dari Supabase...
          </div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-dark/10 font-mono text-xs text-dark/50">
            Belum ada data proyek angkatan di database. Klik tombol di atas untuk membuat angkatan pertama.
          </div>
        ) : (
          <div className="grid gap-4">
            {projects.map((proj) => {
              const milestones = proj.project_milestones || [];
              const installments = proj.payment_installments || [];

              return (
                <div
                  key={proj.id}
                  className="bg-white border border-dark/15 hover:border-dark/30 rounded-2xl p-5 sm:p-6 shadow-sm transition-all"
                >
                  {/* Top Bar: School & Access Code */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-dark/10 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black bg-orange text-white px-2 py-0.5 rounded shadow-sm">
                          {proj.access_code}
                        </span>
                        <span className="font-mono text-[11px] text-dark/50 font-bold uppercase">
                          {proj.city || "Indonesia"} • {proj.graduation_year}
                        </span>
                        {proj.status === "prospect" && (
                          <span className="font-mono text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.2 rounded-full border border-amber-300">
                            Prospect / Guest
                          </span>
                        )}
                      </div>

                      <h4 className="font-headline font-black text-lg sm:text-xl text-dark mt-1">
                        {proj.school_name}
                      </h4>
                      <p className="font-sans text-xs text-dark/60">
                        PIC: <strong className="text-dark">{proj.pic_name || "Panitia"}</strong> ({proj.pic_whatsapp || "-"}) • PM: {proj.pm_assigned}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(proj.access_code, proj.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-dark font-mono text-xs font-bold transition-colors cursor-pointer border border-dark/10"
                        title="Salin Kode Akses"
                      >
                        {copiedCode === proj.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-dark/60" />
                        )}
                        <span>{copiedCode === proj.id ? "Disalin" : "Salin Kode"}</span>
                      </button>

                      <button
                        onClick={() => copyWhatsAppShare(proj)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-mono text-xs font-bold transition-colors cursor-pointer border border-emerald-300"
                        title="Salin Template WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Format WA</span>
                      </button>

                      <Link
                        href={`/track/${proj.access_code}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-dark hover:bg-orange text-white font-mono text-xs font-bold transition-colors cursor-pointer"
                      >
                        <span>Buka Portal</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Middle: Stepper Stages Switcher (1-click to update in DB) */}
                  <div className="py-4 border-b border-dark/10">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="font-mono text-[10px] font-black uppercase text-dark/50">
                        PENGUBAH TAHAPAN PRODUKSI (KLIK TAHAP UNTUK GESER DI DATABASE):
                      </span>
                      <span className="font-mono text-xs font-black text-orange bg-orange/10 px-2 py-0.5 rounded border border-orange/20">
                        Saat ini: Tahap {proj.current_stage} / 6
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                      {[
                        { step: 1, label: "MOU & DP" },
                        { step: 2, label: "Photoshoot" },
                        { step: 3, label: "Layout" },
                        { step: 4, label: "Proof Dummy" },
                        { step: 5, label: "Cetak & Jilid" },
                        { step: 6, label: "Pengiriman" },
                      ].map((st) => {
                        const isCurrent = proj.current_stage === st.step;
                        const isPassed = proj.current_stage > st.step;

                        return (
                          <button
                            key={st.step}
                            onClick={() => handleUpdateStage(proj.id, st.step)}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                              isCurrent
                                ? "bg-orange text-white border-orange shadow-md shadow-orange/20 font-black scale-[1.02]"
                                : isPassed
                                ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100 font-bold"
                                : "bg-[#FAF6F0] text-dark/60 border-dark/10 hover:border-dark/30 hover:text-dark font-medium"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[10px] opacity-75">
                                #{st.step}
                              </span>
                              {isPassed && <Check className="w-3 h-3 stroke-[3]" />}
                              {isCurrent && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                            </div>
                            <div className="font-headline text-xs mt-1 truncate">
                              {st.label}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom: Payment Installments Table with 1-click Verify */}
                  <div className="pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] font-black uppercase text-dark/50">
                        STATUS TERMIN KAS PEMBAYARAN:
                      </span>
                      <span className="font-mono text-[10px] text-dark/50">
                        Klik tombol untuk toggle status LUNAS / PENDING
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-3">
                      {installments.map((inst) => {
                        const isPaid = inst.status === "paid";
                        return (
                          <div
                            key={inst.id}
                            className={`p-3 rounded-xl border flex flex-col justify-between ${
                              isPaid
                                ? "bg-emerald-50/70 border-emerald-300 text-emerald-950"
                                : "bg-[#FAF6F0] border-dark/10 text-dark"
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-[10px] font-bold uppercase">
                                  {inst.title}
                                </span>
                                <span
                                  className={`font-mono text-[9px] font-black uppercase px-1.5 py-0.2 rounded ${
                                    isPaid
                                      ? "bg-emerald-600 text-white"
                                      : "bg-dark/10 text-dark/60"
                                  }`}
                                >
                                  {isPaid ? "Lunas" : "Pending"}
                                </span>
                              </div>
                              <div className="font-headline font-black text-base mt-1">
                                Rp {inst.amount.toLocaleString("id-ID")}
                              </div>
                              <div className="font-mono text-[9px] text-dark/50 mt-0.5 truncate">
                                {inst.receipt_number || "Belum ada kuitansi"}
                              </div>
                            </div>

                            <button
                              onClick={() =>
                                handleToggleInstallment(proj.id, inst.id, inst.status)
                              }
                              className={`mt-2.5 py-1 px-2.5 rounded-lg font-mono text-[10px] font-bold transition-all cursor-pointer border ${
                                isPaid
                                  ? "bg-white hover:bg-amber-50 text-amber-800 border-amber-300"
                                  : "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700 shadow-sm"
                              }`}
                            >
                              {isPaid ? "Batalkan Lunas" : "✓ Tandai Lunas (Terbitkan Kuitansi)"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ================= MODAL GENERATE KODE AKSES MOU ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-xl w-full bg-white rounded-3xl border-4 border-dark shadow-[8px_10px_0px_#FF4D00] p-6 sm:p-7 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-dark/10 pb-4">
              <div>
                <span className="font-mono text-[10px] font-black uppercase tracking-wider text-orange">
                  FORM ANGKATAN RESMI FOURJECTIVE
                </span>
                <h3 className="font-headline font-black text-2xl text-dark mt-0.5">
                  Generate Akses Token MOU
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-dark font-black flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-100 border border-red-300 text-red-800 text-xs font-mono font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase text-dark/70 mb-1">
                    Nama Sekolah *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: SMA Negeri 2 Kuningan"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full bg-[#FAF6F0] border-2 border-dark/20 focus:border-orange rounded-xl px-3.5 py-2 text-xs font-sans text-dark outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase text-dark/70 mb-1">
                    Kode Akses Klien (Auto / Custom) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="SMAN2-2026"
                    value={customCode}
                    onChange={(e) => setCustomCode(e.target.value.toUpperCase())}
                    className="w-full bg-[#FAF6F0] border-2 border-dark/20 focus:border-orange rounded-xl px-3.5 py-2 text-xs font-mono font-black uppercase text-orange outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase text-dark/70 mb-1">
                    Tahun Lulus
                  </label>
                  <input
                    type="number"
                    value={gradYear}
                    onChange={(e) => setGradYear(Number(e.target.value))}
                    className="w-full bg-[#FAF6F0] border-2 border-dark/20 focus:border-orange rounded-xl px-3 py-2 text-xs font-mono font-bold text-dark outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase text-dark/70 mb-1">
                    Jumlah Siswa
                  </label>
                  <input
                    type="number"
                    value={studentCount}
                    onChange={(e) => setStudentCount(Number(e.target.value))}
                    className="w-full bg-[#FAF6F0] border-2 border-dark/20 focus:border-orange rounded-xl px-3 py-2 text-xs font-mono font-bold text-dark outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase text-dark/70 mb-1">
                    Jml Halaman
                  </label>
                  <input
                    type="number"
                    value={pageCount}
                    onChange={(e) => setPageCount(Number(e.target.value))}
                    className="w-full bg-[#FAF6F0] border-2 border-dark/20 focus:border-orange rounded-xl px-3 py-2 text-xs font-mono font-bold text-dark outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase text-dark/70 mb-1">
                    Nama PIC Panitia *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Reza Pratama (Ketua OSIS)"
                    value={picName}
                    onChange={(e) => setPicName(e.target.value)}
                    className="w-full bg-[#FAF6F0] border-2 border-dark/20 focus:border-orange rounded-xl px-3.5 py-2 text-xs font-sans text-dark outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase text-dark/70 mb-1">
                    No. WhatsApp PIC *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+62 812-xxxx-xxxx"
                    value={picWhatsapp}
                    onChange={(e) => setPicWhatsapp(e.target.value)}
                    className="w-full bg-[#FAF6F0] border-2 border-dark/20 focus:border-orange rounded-xl px-3.5 py-2 text-xs font-mono text-dark outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase text-dark/70 mb-1">
                    Jenis Cover
                  </label>
                  <select
                    value={coverType}
                    onChange={(e) => setCoverType(e.target.value as any)}
                    className="w-full bg-[#FAF6F0] border-2 border-dark/20 focus:border-orange rounded-xl px-3 py-2 text-xs font-sans text-dark outline-none cursor-pointer"
                  >
                    <option value="hardcover">Hardcover</option>
                    <option value="leather">Leather Emboss</option>
                    <option value="acrylic">Acrylic Luxury</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase text-dark/70 mb-1">
                    Kota / Kab
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#FAF6F0] border-2 border-dark/20 focus:border-orange rounded-xl px-3 py-2 text-xs font-sans text-dark outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase text-dark/70 mb-1">
                    Target Wisuda
                  </label>
                  <input
                    type="text"
                    value={targetGraduation}
                    onChange={(e) => setTargetGraduation(e.target.value)}
                    className="w-full bg-[#FAF6F0] border-2 border-dark/20 focus:border-orange rounded-xl px-3 py-2 text-xs font-sans text-dark outline-none"
                  />
                </div>
              </div>

              {/* Automatic Calculation Preview */}
              <div className="p-3.5 bg-[#FAF6F0] rounded-xl border border-dark/15 font-mono text-xs text-dark/80 space-y-1">
                <div className="flex justify-between">
                  <span>Estimasi Total Kontrak:</span>
                  <strong>Rp {(studentCount * pricePerStudent).toLocaleString("id-ID")}</strong>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Termin 1 (DP 30%):</span>
                  <strong>Rp {Math.round(studentCount * pricePerStudent * 0.3).toLocaleString("id-ID")} (LUNAS)</strong>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-dark/20 text-xs font-mono font-bold text-dark hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-orange hover:bg-orange/90 text-white font-headline font-black text-xs uppercase tracking-wider shadow-md shadow-orange/30 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Menerbitkan Kode..." : "Terbitkan Kode & Kunci MOU"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
