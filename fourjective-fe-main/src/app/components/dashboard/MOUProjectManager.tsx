"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Check,
  Copy,
  MessageCircle,
  ExternalLink,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  School,
  Calendar,
  Users,
  ShieldCheck,
  Coins,
  ChevronRight,
  Sparkles,
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
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
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
        const list: AdminProject[] = data.projects || [];
        setProjects(list);
        if (list.length > 0 && !selectedProjectId) {
          setSelectedProjectId(list[0].id);
        }
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
          graduation_year: Number(gradYear),
          city,
          pic_name: picName,
          pic_whatsapp: picWhatsapp,
          student_count: Number(studentCount),
          page_count: Number(pageCount),
          cover_type: coverType,
          price_per_student: Number(pricePerStudent),
          target_graduation: targetGraduation,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal membuat proyek");
      }

      setSuccessData({
        access_code: data.project.access_code,
        school_name: data.project.school_name,
        pic_name: data.project.pic_name,
        pic_whatsapp: data.project.pic_whatsapp,
      });

      setSchoolName("");
      setCustomCode("");
      setPicName("");
      setPicWhatsapp("");
      setIsModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStage = async (projectId: string, newStage: number) => {
    try {
      const res = await fetch(`/api/admin/projects/${projectId}/stage`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current_stage: newStage }),
      });

      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p.id === projectId ? { ...p, current_stage: newStage } : p))
        );
      }
    } catch (e) {
      console.error("Gagal update stage:", e);
    }
  };

  const handleToggleInstallment = async (
    projectId: string,
    installmentId: string,
    currentStatus: "paid" | "pending"
  ) => {
    const nextStatus: "paid" | "pending" = currentStatus === "paid" ? "pending" : "paid";
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
        const json = await res.json();
        setProjects((prev) =>
          prev.map((p) => {
            if (p.id === projectId) {
              const updatedInstallments = (p.payment_installments || []).map((inst) =>
                inst.id === installmentId
                  ? {
                      ...inst,
                      status: nextStatus,
                      receipt_number: json.receipt_number || inst.receipt_number,
                    }
                  : inst
              );
              return { ...p, payment_installments: updatedInstallments };
            }
            return p;
          })
        );
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

  const copyWhatsAppShare = (proj: AdminProject) => {
    const message =
      `Halo Kak ${proj.pic_name || "Panitia"} (${proj.school_name})! 🎓\n\n` +
      `Portal resmi Buku Tahunan Angkatan ${proj.graduation_year} Fourjective sudah aktif.\n` +
      `Seluruh proses (timeline, invoice, & review desain) dapat dipantau di link berikut:\n\n` +
      `🌐 Link Tracking: https://fourjectiv.com/track/${proj.access_code}\n` +
      `🔑 Kode Akses: *${proj.access_code}*\n\n` +
      `Status saat ini: Tahap ${proj.current_stage} / 6. Silakan simpan link ini ya kak. Terima kasih! 🙏`;

    navigator.clipboard.writeText(message);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2000);
  };

  const stageLabels = [
    { step: 1, label: "MOU & DP" },
    { step: 2, label: "Sesi Foto" },
    { step: 3, label: "Layouting" },
    { step: 4, label: "ACC Dummy" },
    { step: 5, label: "Cetak & Jilid" },
    { step: 6, label: "Distribusi" },
  ];

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-dark/15 p-5 sm:p-6 rounded-2xl shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-black uppercase tracking-wider text-orange">
              DATABASE SUPABASE TERHUBUNG
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider bg-zinc-900 text-white border border-zinc-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live PostgreSQL
            </span>
          </div>
          <h2 className="font-headline font-black text-2xl text-dark mt-1">
            Manajemen Angkatan &amp; Kode Akses MOU
          </h2>
          <p className="font-sans text-xs font-semibold text-dark/70 mt-1">
            Pilih sekolah di sebelah kiri untuk melihat dan mengatur status tahapan &amp; termin kas di panel kanan.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchProjects}
            className="p-2.5 rounded-xl border border-dark/15 hover:bg-slate-100 text-dark/70 transition-colors cursor-pointer"
            title="Segarkan Data"
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

      {/* Success Banner */}
      {successData && (
        <div className="p-5 rounded-2xl bg-emerald-950 text-white border-2 border-emerald-500 shadow-xl">
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
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/track/${successData.access_code}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 bg-white text-dark hover:bg-orange hover:text-white font-mono text-xs font-black uppercase px-3.5 py-2 rounded-xl transition-colors"
              >
                <span>Buka Portal Siswa</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* SIDE BY SIDE LAYOUT: LIST DI KIRI (5 Kolom), PREVIEW DI KANAN (7 Kolom) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* KOLOM KIRI: DAFTAR KARTU SEKOLAH (5 Kolom) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="font-headline font-bold text-xs uppercase text-dark/70 tracking-wider">
              Daftar Sekolah ({projects.length})
            </span>
            <span className="font-mono text-[10px] text-dark/50">
              Pilih untuk preview
            </span>
          </div>

          {isLoading ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-dark/15 font-mono text-xs text-dark/50">
              Memuat data sekolah...
            </div>
          ) : projects.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-dark/15 font-mono text-xs text-dark/50">
              Belum ada data sekolah.
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
              {projects.map((proj) => {
                const isSelected = selectedProject?.id === proj.id;
                const installments = proj.payment_installments || [];
                const paidCount = installments.filter((i) => i.status === "paid").length;
                const currentLabel = stageLabels.find((s) => s.step === proj.current_stage)?.label || `Tahap ${proj.current_stage}`;

                return (
                  <div
                    key={proj.id}
                    onClick={() => setSelectedProjectId(proj.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer text-left relative ${
                      isSelected
                        ? "bg-white border-orange shadow-md shadow-orange/10 ring-2 ring-orange/20"
                        : "bg-white border-dark/15 hover:border-dark/30 hover:bg-[#FAF6F0]/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`font-mono text-[11px] font-black px-2 py-0.5 rounded shadow-sm ${
                            isSelected ? "bg-orange text-white" : "bg-dark text-white"
                          }`}>
                            {proj.access_code}
                          </span>
                          <span className="font-mono text-[10px] text-dark/60 font-bold uppercase">
                            {proj.city || "Indonesia"} • {proj.graduation_year}
                          </span>
                        </div>

                        <h4 className="font-headline font-black text-base text-dark leading-snug">
                          {proj.school_name}
                        </h4>

                        <div className="font-sans text-[11px] text-dark/60 font-semibold">
                          PIC: {proj.pic_name || "Panitia"} • {proj.student_count || 150} Siswa
                        </div>
                      </div>

                      <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? "text-orange translate-x-0.5" : "text-dark/30"
                      }`} />
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-dark/10 flex items-center justify-between text-[10px] font-mono font-bold">
                      <span className="text-dark/70 bg-[#FAF6F0] px-2 py-0.5 rounded border border-dark/10">
                        {currentLabel} ({proj.current_stage}/6)
                      </span>
                      <span className={paidCount === installments.length && installments.length > 0 ? "text-dark font-black" : "text-orange"}>
                        Kas: {paidCount}/{installments.length} Termin
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* KOLOM KANAN: PREVIEW & PENGATURAN TAHAPAN / KAS SEKOLAH TERPILIH (7 Kolom) */}
        <div className="lg:col-span-7 sticky top-20">
          {selectedProject ? (
            <div className="bg-white border-2 border-dark/15 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
              {/* Header Preview */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-dark/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black bg-orange text-white px-2.5 py-0.5 rounded shadow-sm">
                      {selectedProject.access_code}
                    </span>
                    <span className="font-mono text-xs text-dark/60 font-bold uppercase">
                      {selectedProject.city} • Angkatan {selectedProject.graduation_year}
                    </span>
                  </div>

                  <h3 className="font-headline font-black text-2xl text-dark mt-1.5">
                    {selectedProject.school_name}
                  </h3>
                  <p className="font-sans text-xs font-semibold text-dark/70 mt-0.5">
                    PIC: <strong className="text-dark">{selectedProject.pic_name || "Panitia"}</strong> ({selectedProject.pic_whatsapp || "-"}) • Target Wisuda: {selectedProject.target_graduation || "2026"}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => copyToClipboard(selectedProject.access_code, selectedProject.id)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-dark font-mono text-xs font-bold transition-colors cursor-pointer border border-dark/10 flex items-center gap-1"
                    title="Salin Kode Akses"
                  >
                    {copiedCode === selectedProject.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-dark/60" />}
                    <span>{copiedCode === selectedProject.id ? "Disalin" : "Kode"}</span>
                  </button>

                  <button
                    onClick={() => copyWhatsAppShare(selectedProject)}
                    className="p-2 rounded-xl bg-[#FAF6F0] hover:bg-dark hover:text-white text-dark font-mono text-xs font-bold transition-all border border-dark/20 flex items-center gap-1.5 cursor-pointer"
                    title="Format WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WA</span>
                  </button>

                  <Link
                    href={`/track/${selectedProject.access_code}`}
                    target="_blank"
                    className="px-3 py-2 rounded-xl bg-dark hover:bg-orange text-white font-mono text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Buka Portal Siswa</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Live Stepper Geser Tahap */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[11px] font-black uppercase text-dark/60 tracking-wider">
                    PENGUBAH TAHAPAN PRODUKSI:
                  </span>
                  <span className="font-mono text-xs font-black text-orange bg-orange/10 px-2 py-0.5 rounded border border-orange/20">
                    Saat ini: Tahap {selectedProject.current_stage} / 6
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                  {stageLabels.map((st) => {
                    const isCurrent = selectedProject.current_stage === st.step;
                    const isPassed = selectedProject.current_stage > st.step;

                    return (
                      <button
                        key={st.step}
                        onClick={() => handleUpdateStage(selectedProject.id, st.step)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isCurrent
                            ? "bg-orange text-white border-orange shadow-md shadow-orange/20 font-black scale-[1.02]"
                            : isPassed
                            ? "bg-dark text-white border-dark font-bold hover:bg-dark/90"
                            : "bg-[#FAF6F0] text-dark/60 border-dark/10 hover:border-dark/30 hover:text-dark font-medium"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] opacity-75">#{st.step}</span>
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

              {/* Status Termin Kas Pembayaran */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-mono text-[11px] font-black uppercase text-dark/60 tracking-wider">
                    STATUS TERMIN KAS PEMBAYARAN:
                  </span>
                  <span className="font-mono text-[10px] text-dark/50">
                    Klik tombol untuk verifikasi kas masuk
                  </span>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  {(selectedProject.payment_installments || []).map((inst) => {
                    const isPaid = inst.status === "paid";
                    return (
                      <div
                        key={inst.id}
                        className={`rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                          isPaid
                            ? "bg-white border-dark/15 shadow-sm"
                            : "bg-[#FAF6F0] border-dark/15 text-dark"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] font-black uppercase tracking-wider text-dark/70">
                              {inst.title}
                            </span>
                            <span
                              className={`font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                                isPaid
                                  ? "bg-dark text-white border-dark"
                                  : "bg-dark/5 text-dark/60 border-dark/10"
                              }`}
                            >
                              {isPaid ? "Lunas" : "Pending"}
                            </span>
                          </div>
                          <div className="font-headline font-black text-lg text-dark mt-1.5">
                            Rp {inst.amount.toLocaleString("id-ID")}
                          </div>
                          <div className="font-mono text-[9px] text-dark/50 mt-0.5 truncate">
                            {inst.receipt_number || "Belum ada kuitansi"}
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            handleToggleInstallment(selectedProject.id, inst.id, inst.status)
                          }
                          className={`mt-3 py-1.5 px-2 rounded-lg font-mono text-[10px] font-bold transition-all cursor-pointer border text-center ${
                            isPaid
                              ? "bg-white hover:bg-zinc-100 text-dark/80 border-dark/20"
                              : "bg-dark hover:bg-orange text-white border-dark shadow-sm"
                          }`}
                        >
                          {isPaid ? "Batalkan Lunas" : "✓ Verifikasi Lunas"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Ringkasan Spesifikasi Buku */}
              <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-dark/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div>
                  <span className="text-dark/50 font-bold uppercase">Spesifikasi Buku: </span>
                  <span className="font-bold text-dark">{selectedProject.student_count || 180} Siswa • {selectedProject.page_count || 80} Halaman • {selectedProject.cover_type?.toUpperCase() || "HARDCOVER"}</span>
                </div>
                <Link
                  href={`/track/${selectedProject.access_code}`}
                  target="_blank"
                  className="text-orange hover:underline font-bold inline-flex items-center gap-1"
                >
                  <span>Lihat Tampilan Siswa</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-dark/15 rounded-2xl p-12 text-center font-mono text-xs text-dark/40">
              Pilih salah satu sekolah di sebelah kiri untuk melihat detail preview.
            </div>
          )}
        </div>
      </div>

      {/* Modal Form Tambah Sekolah Baru */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border-3 border-dark rounded-2xl max-w-xl w-full p-6 shadow-[6px_6px_0px_#14161C] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-dark/10 pb-3">
              <div>
                <h3 className="font-headline font-black text-xl text-dark">
                  Daftarkan Sekolah Baru &amp; Kunci MOU
                </h3>
                <p className="font-sans text-xs text-dark/60">
                  Terbitkan kode akses angkatan dan buat tracker pengerjaan otomatis.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-dark/40 hover:text-dark text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {errorMsg && (
              <div className="mt-3 p-3 rounded-xl bg-red-50 text-red-700 text-xs font-mono border border-red-200">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleCreateProject} className="space-y-4 mt-4">
              <div>
                <label className="block font-mono text-[11px] font-bold uppercase text-dark/70 mb-1">
                  Nama Sekolah
                </label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="Contoh: SMA Negeri 1 Kuningan"
                  className="w-full bg-[#FAF6F0] border-2 border-dark rounded-xl px-3.5 py-2 font-sans text-xs text-dark focus:outline-none focus:border-orange font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase text-dark/70 mb-1">
                    Kode Akses Siswa
                  </label>
                  <input
                    type="text"
                    value={customCode}
                    onChange={(e) => setCustomCode(e.target.value.toUpperCase())}
                    placeholder="SMAN1-2026"
                    className="w-full bg-[#FAF6F0] border-2 border-dark rounded-xl px-3.5 py-2 font-mono text-xs font-bold text-dark focus:outline-none focus:border-orange"
                    required
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase text-dark/70 mb-1">
                    Tahun Kelulusan
                  </label>
                  <input
                    type="number"
                    value={gradYear}
                    onChange={(e) => setGradYear(Number(e.target.value))}
                    className="w-full bg-[#FAF6F0] border-2 border-dark rounded-xl px-3.5 py-2 font-mono text-xs font-bold text-dark focus:outline-none focus:border-orange"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase text-dark/70 mb-1">
                    Nama PIC Panitia
                  </label>
                  <input
                    type="text"
                    value={picName}
                    onChange={(e) => setPicName(e.target.value)}
                    placeholder="Ketua Panitia / OSIS"
                    className="w-full bg-[#FAF6F0] border-2 border-dark rounded-xl px-3.5 py-2 font-sans text-xs text-dark focus:outline-none focus:border-orange"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase text-dark/70 mb-1">
                    Nomor WhatsApp PIC
                  </label>
                  <input
                    type="text"
                    value={picWhatsapp}
                    onChange={(e) => setPicWhatsapp(e.target.value)}
                    placeholder="08123456789"
                    className="w-full bg-[#FAF6F0] border-2 border-dark rounded-xl px-3.5 py-2 font-mono text-xs text-dark focus:outline-none focus:border-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase text-dark/70 mb-1">
                    Jumlah Siswa
                  </label>
                  <input
                    type="number"
                    value={studentCount}
                    onChange={(e) => setStudentCount(Number(e.target.value))}
                    className="w-full bg-[#FAF6F0] border-2 border-dark rounded-xl px-3 py-2 font-mono text-xs text-dark focus:outline-none focus:border-orange"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase text-dark/70 mb-1">
                    Halaman
                  </label>
                  <input
                    type="number"
                    value={pageCount}
                    onChange={(e) => setPageCount(Number(e.target.value))}
                    className="w-full bg-[#FAF6F0] border-2 border-dark rounded-xl px-3 py-2 font-mono text-xs text-dark focus:outline-none focus:border-orange"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase text-dark/70 mb-1">
                    Kota
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#FAF6F0] border-2 border-dark rounded-xl px-3 py-2 font-sans text-xs text-dark focus:outline-none focus:border-orange"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-dark/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-dark/60 hover:text-dark cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orange hover:bg-orange/90 text-white font-headline font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl border-2 border-dark shadow-[3px_3px_0px_#14161C] transition-all cursor-pointer"
                >
                  {isSubmitting ? "Menerbitkan..." : "Terbitkan Kode Akses"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
