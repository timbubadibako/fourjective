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
  ChevronRight,
  Clock,
  FileCheck,
  Layers,
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

export interface ProspectOrder {
  id: string;
  project_id?: string;
  school_name?: string;
  pic_name: string;
  pic_whatsapp: string;
  student_count: number;
  page_count: number;
  cover_type: string;
  addons?: string[] | string;
  estimated_price_per_student: number;
  total_estimated_price: number;
  target_graduation?: string;
  status?: string;
  created_at?: string;
}

export function MOUProjectManager() {
  const [activeTab, setActiveTab] = useState<"projects" | "queue">("projects");
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [prospects, setProspects] = useState<ProspectOrder[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProspects, setIsLoadingProspects] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    access_code: string;
    school_name: string;
    pic_name: string;
    pic_whatsapp: string;
  } | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [copiedMsg, setCopiedMsg] = useState(false);

  // Form State
  const [sourceProspectId, setSourceProspectId] = useState<string | null>(null);
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
  const [totalPriceDeal, setTotalPriceDeal] = useState(180 * 165000);
  const [targetGraduation, setTargetGraduation] = useState("Mei 2026");

  // 3 Termin kas
  const [dpAmount, setDpAmount] = useState(Math.round(180 * 165000 * 0.3));
  const [midAmount, setMidAmount] = useState(Math.round(180 * 165000 * 0.4));
  const [finalAmount, setFinalAmount] = useState(
    180 * 165000 - Math.round(180 * 165000 * 0.3) - Math.round(180 * 165000 * 0.4)
  );

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

  const fetchProspects = async () => {
    setIsLoadingProspects(true);
    try {
      const res = await fetch("/api/admin/prospects");
      if (res.ok) {
        const data = await res.json();
        setProspects(data.data || []);
      }
    } catch (e) {
      console.error("Gagal load prospects:", e);
    } finally {
      setIsLoadingProspects(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchProspects();
  }, []);

  // Update nominal termin otomatis saat total deal berubah
  const handleDealPriceChange = (newTotal: number) => {
    setTotalPriceDeal(newTotal);
    const dp = Math.round(newTotal * 0.3);
    const mid = Math.round(newTotal * 0.4);
    const fin = newTotal - dp - mid;
    setDpAmount(dp);
    setMidAmount(mid);
    setFinalAmount(fin);
    if (studentCount > 0) {
      setPricePerStudent(Math.round(newTotal / studentCount));
    }
  };

  const handleStudentOrPriceChange = (count: number, perStudent: number) => {
    setStudentCount(count);
    setPricePerStudent(perStudent);
    const total = count * perStudent;
    setTotalPriceDeal(total);
    const dp = Math.round(total * 0.3);
    const mid = Math.round(total * 0.4);
    const fin = total - dp - mid;
    setDpAmount(dp);
    setMidAmount(mid);
    setFinalAmount(fin);
  };

  useEffect(() => {
    if (!sourceProspectId && (!customCode || customCode.startsWith("SMAN") || customCode.startsWith("4J"))) {
      const clean = schoolName
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(0, 5)
        .toUpperCase();
      if (clean) {
        setCustomCode(`${clean}-${gradYear}`);
      }
    }
  }, [schoolName, gradYear, sourceProspectId]);

  const openNewProjectModal = () => {
    setSourceProspectId(null);
    setSchoolName("");
    setCustomCode("");
    setPicName("");
    setPicWhatsapp("");
    setStudentCount(180);
    setPageCount(80);
    setCoverType("hardcover");
    setPricePerStudent(165000);
    const total = 180 * 165000;
    setTotalPriceDeal(total);
    setDpAmount(Math.round(total * 0.3));
    setMidAmount(Math.round(total * 0.4));
    setFinalAmount(total - Math.round(total * 0.3) - Math.round(total * 0.4));
    setTargetGraduation("Mei 2026");
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const openConvertModal = (order: ProspectOrder) => {
    setSourceProspectId(order.id);
    const sName = order.school_name || order.pic_name || "Sekolah Mitra";
    setSchoolName(sName);
    const prefix = sName.replace(/[^a-zA-Z0-9]/g, "").slice(0, 5).toUpperCase() || "SMAN";
    setCustomCode(`${prefix}-2026`);
    setGradYear(2026);
    setCity("Kuningan");
    setPicName(order.pic_name || "");
    setPicWhatsapp(order.pic_whatsapp || "");
    const count = order.student_count || 150;
    const page = order.page_count || 80;
    setStudentCount(count);
    setPageCount(page);
    const validCover = (["hardcover", "leather", "acrylic"].includes(order.cover_type?.toLowerCase())
      ? order.cover_type.toLowerCase()
      : "hardcover") as "hardcover" | "leather" | "acrylic";
    setCoverType(validCover);
    const pricePerStd = order.estimated_price_per_student || 165000;
    const total = order.total_estimated_price || count * pricePerStd;
    setPricePerStudent(pricePerStd);
    setTotalPriceDeal(total);
    const dp = Math.round(total * 0.3);
    const mid = Math.round(total * 0.4);
    const fin = total - dp - mid;
    setDpAmount(dp);
    setMidAmount(mid);
    setFinalAmount(fin);
    setTargetGraduation(order.target_graduation || "Mei 2026");
    setErrorMsg(null);
    setIsModalOpen(true);
  };

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
          estimated_price_per_student: Number(pricePerStudent),
          target_graduation: targetGraduation,
          prospect_order_id: sourceProspectId || undefined,
          installments: {
            dp_amount: Number(dpAmount),
            mid_amount: Number(midAmount),
            final_amount: Number(finalAmount),
          },
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

      setIsModalOpen(false);
      fetchProjects();
      fetchProspects();
      setActiveTab("projects");
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStage = async (projectId: string, newStage: number) => {
    setActionError(null);
    try {
      const res = await fetch(`/api/admin/projects/${projectId}/stage`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: newStage }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Gagal mengubah tahapan proyek");
      }

      setProjects((prev) =>
        prev.map((p) => (p.id === projectId ? { ...p, current_stage: newStage } : p))
      );
    } catch (e: any) {
      console.error("Gagal update stage:", e);
      setActionError(e.message || "Gagal mengubah tahapan proyek");
    }
  };

  const handleToggleInstallment = async (
    projectId: string,
    installmentId: string,
    currentStatus: "paid" | "pending"
  ) => {
    setActionError(null);
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

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || "Gagal memperbarui status termin");
      }

      const json = await res.json();
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id === projectId) {
            const updatedInstallments = (p.payment_installments || []).map((inst) =>
              inst.id === installmentId
                ? {
                    ...inst,
                    status: nextStatus,
                    receipt_number: json.installment?.receipt_number || inst.receipt_number,
                  }
                : inst
            );
            return { ...p, payment_installments: updatedInstallments };
          }
          return p;
        })
      );
    } catch (e: any) {
      console.error("Gagal toggle installment:", e);
      setActionError(e.message || "Gagal memperbarui status termin kas");
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

  const pendingProspects = prospects.filter((p) => p.status !== "converted");
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
            Pantau antrean pengajuan MOU siswa atau atur progres dan termin kas proyek yang sudah aktif.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              fetchProjects();
              fetchProspects();
            }}
            className="p-2.5 rounded-xl border border-dark/15 hover:bg-slate-100 text-dark/70 transition-colors cursor-pointer"
            title="Segarkan Data"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading || isLoadingProspects ? "animate-spin text-orange" : ""}`}
            />
          </button>

          <button
            onClick={openNewProjectModal}
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white font-headline font-black text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-md shadow-orange/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Generate Kode MOU Manual</span>
          </button>
        </div>
      </div>

      {/* Tabs Switcher: Proyek Aktif vs Antrean Pending MOU */}
      <div className="flex items-center gap-2 border-b border-dark/10 pb-3">
        <button
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "projects"
              ? "bg-dark text-white shadow-md shadow-dark/20"
              : "bg-white text-dark/60 border border-dark/15 hover:text-dark hover:bg-slate-50"
          }`}
        >
          <span>Proyek Aktif MOU</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] ${
              activeTab === "projects" ? "bg-orange text-white" : "bg-dark/10 text-dark"
            }`}
          >
            {projects.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("queue")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "queue"
              ? "bg-dark text-white shadow-md shadow-dark/20"
              : "bg-white text-dark/60 border border-dark/15 hover:text-dark hover:bg-slate-50"
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-orange" />
          <span>Antrean Pending MOU</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] ${
              pendingProspects.length > 0
                ? "bg-orange text-white animate-pulse"
                : "bg-dark/10 text-dark"
            }`}
          >
            {pendingProspects.length}
          </span>
        </button>
      </div>

      {/* Success Banner */}
      {successData && (
        <div className="p-5 rounded-2xl bg-emerald-950 text-white border-2 border-emerald-500 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>KODE ANGKATAN BERHASIL DITERBITKAN &amp; MOU RESMI TERKUNCI</span>
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

      {/* Action Error Banner */}
      {actionError && (
        <div className="p-4 rounded-xl bg-rose-50 text-rose-800 border border-rose-300 font-mono text-xs flex items-center justify-between">
          <span>{actionError}</span>
          <button
            onClick={() => setActionError(null)}
            className="text-rose-900 font-bold hover:underline cursor-pointer"
          >
            Tutup ✕
          </button>
        </div>
      )}

      {/* TAB 1: PROYEK AKTIF MOU (SIDE BY SIDE) */}
      {activeTab === "projects" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* KOLOM KIRI: DAFTAR KARTU SEKOLAH (5 Kolom) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="font-headline font-bold text-xs uppercase text-dark/70 tracking-wider">
                Daftar Sekolah ({projects.length})
              </span>
              <span className="font-mono text-[10px] text-dark/50">Pilih untuk preview</span>
            </div>

            {isLoading ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-dark/15 font-mono text-xs text-dark/50">
                Memuat data sekolah...
              </div>
            ) : projects.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-dark/15 font-mono text-xs text-dark/50">
                Belum ada data sekolah aktif. Konversi dari antrean pending MOU di atas.
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
                {projects.map((proj) => {
                  const isSelected = selectedProject?.id === proj.id;
                  const installments = proj.payment_installments || [];
                  const paidCount = installments.filter((i) => i.status === "paid").length;
                  const currentLabel =
                    stageLabels.find((s) => s.step === proj.current_stage)?.label ||
                    `Tahap ${proj.current_stage}`;

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
                            <span
                              className={`font-mono text-[11px] font-black px-2 py-0.5 rounded shadow-sm ${
                                isSelected ? "bg-orange text-white" : "bg-dark text-white"
                              }`}
                            >
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

                        <ChevronRight
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            isSelected ? "text-orange translate-x-0.5" : "text-dark/30"
                          }`}
                        />
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-dark/10 flex items-center justify-between text-[10px] font-mono font-bold">
                        <span className="text-dark/70 bg-[#FAF6F0] px-2 py-0.5 rounded border border-dark/10">
                          {currentLabel} ({proj.current_stage}/6)
                        </span>
                        <span
                          className={
                            paidCount === installments.length && installments.length > 0
                              ? "text-dark font-black"
                              : "text-orange"
                          }
                        >
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
                      PIC:{" "}
                      <strong className="text-dark">
                        {selectedProject.pic_name || "Panitia"}
                      </strong>{" "}
                      ({selectedProject.pic_whatsapp || "-"}) • Target Wisuda:{" "}
                      {selectedProject.target_graduation || "2026"}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() =>
                        copyToClipboard(selectedProject.access_code, selectedProject.id)
                      }
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-dark font-mono text-xs font-bold transition-colors cursor-pointer border border-dark/10 flex items-center gap-1"
                      title="Salin Kode Akses"
                    >
                      {copiedCode === selectedProject.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-dark/60" />
                      )}
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
                            {isCurrent && (
                              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                            )}
                          </div>
                          <div className="font-headline text-xs mt-1 truncate">{st.label}</div>
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
                    <span className="font-bold text-dark">
                      {selectedProject.student_count || 180} Siswa •{" "}
                      {selectedProject.page_count || 80} Halaman •{" "}
                      {selectedProject.cover_type?.toUpperCase() || "HARDCOVER"}
                    </span>
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
      )}

      {/* TAB 2: ANTREAN PENDING MOU */}
      {activeTab === "queue" && (
        <div className="bg-white border border-dark/15 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-dark/10">
            <div>
              <h3 className="font-headline font-black text-xl text-dark">
                Antrean Permohonan MOU Masuk
              </h3>
              <p className="font-sans text-xs text-dark/60 mt-0.5">
                Pengajuan dari siswa/panitia melalui tombol &quot;Ajukan MOU&quot; di portal tracking &amp; kalkulator.
                Klik &quot;Konversi jadi MOU Resmi&quot; untuk mengonfirmasi harga deal, 3 termin kas, dan menerbitkan kode akses.
              </p>
            </div>
            <span className="font-mono text-xs font-bold px-3 py-1 bg-[#FAF6F0] border border-dark/15 rounded-lg text-dark self-start">
              {pendingProspects.length} Menunggu Konversi
            </span>
          </div>

          {isLoadingProspects ? (
            <div className="py-12 text-center font-mono text-xs text-dark/50">
              Memuat data antrean...
            </div>
          ) : pendingProspects.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <p className="font-headline font-bold text-base text-dark">
                Semua permohonan telah dikonversi!
              </p>
              <p className="font-sans text-xs text-dark/60">
                Tidak ada antrean pending MOU saat ini.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-dark/10 font-mono text-[10px] font-bold uppercase tracking-wider text-dark/70">
                    <th className="pb-3">Sekolah / PIC</th>
                    <th className="pb-3">WhatsApp</th>
                    <th className="pb-3">Spesifikasi</th>
                    <th className="pb-3">Estimasi Siswa &amp; Total</th>
                    <th className="pb-3">Target Wisuda</th>
                    <th className="pb-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark/5 font-sans">
                  {pendingProspects.map((o) => (
                    <tr key={o.id} className="hover:bg-[#FAF6F0] transition-colors">
                      <td className="py-4 pr-4">
                        <div className="font-headline font-black text-sm text-dark">
                          {o.school_name || o.pic_name}
                        </div>
                        {o.school_name && (
                          <div className="font-sans text-xs text-dark/70">
                            PIC: {o.pic_name}
                          </div>
                        )}
                        <div className="font-mono text-[10px] text-dark/50 mt-0.5">
                          {o.created_at
                            ? new Date(o.created_at).toLocaleString("id-ID")
                            : "Baru saja"}
                        </div>
                      </td>
                      <td className="py-4 font-mono font-bold text-dark">
                        {o.pic_whatsapp}
                      </td>
                      <td className="py-4">
                        <div className="font-bold text-dark">
                          {o.student_count} Siswa • {o.page_count} Hal
                        </div>
                        <div className="font-mono text-[10px] uppercase text-dark/60 font-bold">
                          Cover: {o.cover_type}
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="font-mono font-bold text-dark">
                          Rp {o.estimated_price_per_student?.toLocaleString("id-ID")}/siswa
                        </div>
                        <div className="font-mono text-[11px] text-orange font-black">
                          Total: Rp {o.total_estimated_price?.toLocaleString("id-ID")}
                        </div>
                      </td>
                      <td className="py-4 font-mono font-bold text-dark">
                        {o.target_graduation || "Mei 2026"}
                      </td>
                      <td className="py-4 text-right">
                        <button
                          onClick={() => openConvertModal(o)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange hover:bg-orange/90 text-white font-headline font-black text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                        >
                          <FileCheck className="w-3.5 h-3.5" />
                          <span>Konversi Jadi MOU</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Modal Form Tambah Sekolah / Konversi MOU */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border-3 border-dark rounded-2xl max-w-2xl w-full p-6 shadow-[6px_6px_0px_#14161C] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-dark/10 pb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider bg-orange/10 text-orange border border-orange/20 mb-1">
                  <Sparkles className="w-3 h-3" />
                  <span>
                    {sourceProspectId ? "KONVERSI PENGAJUAN MOU" : "PENDAFTARAN MANUAL MOU"}
                  </span>
                </div>
                <h3 className="font-headline font-black text-xl text-dark">
                  {sourceProspectId
                    ? "Konversi Pengajuan jadi MOU Resmi"
                    : "Daftarkan Sekolah Baru & Kunci MOU"}
                </h3>
                <p className="font-sans text-xs text-dark/60">
                  Override harga deal akhir, atur pembagian 3 termin kas, dan terbitkan kode akses.
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
                    Kode Akses Unik (Buku &amp; Tracking)
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
                    className="w-full bg-[#FAF6F0] border-2 border-dark rounded-xl px-3.5 py-2 font-sans text-xs text-dark focus:outline-none focus:border-orange font-semibold"
                    required
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
                    className="w-full bg-[#FAF6F0] border-2 border-dark rounded-xl px-3.5 py-2 font-mono text-xs text-dark focus:outline-none focus:border-orange font-semibold"
                    required
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
                    onChange={(e) =>
                      handleStudentOrPriceChange(Number(e.target.value), pricePerStudent)
                    }
                    className="w-full bg-[#FAF6F0] border-2 border-dark rounded-xl px-3 py-2 font-mono text-xs text-dark focus:outline-none focus:border-orange font-bold"
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
                    className="w-full bg-[#FAF6F0] border-2 border-dark rounded-xl px-3 py-2 font-mono text-xs text-dark focus:outline-none focus:border-orange font-bold"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase text-dark/70 mb-1">
                    Tipe Cover
                  </label>
                  <select
                    value={coverType}
                    onChange={(e) =>
                      setCoverType(e.target.value as "hardcover" | "leather" | "acrylic")
                    }
                    className="w-full bg-[#FAF6F0] border-2 border-dark rounded-xl px-3 py-2 font-mono text-xs text-dark focus:outline-none focus:border-orange font-bold uppercase"
                  >
                    <option value="hardcover">Hardcover</option>
                    <option value="leather">Leather</option>
                    <option value="acrylic">Acrylic</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase text-dark/70 mb-1">
                    Kota Asal
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#FAF6F0] border-2 border-dark rounded-xl px-3 py-2 font-sans text-xs text-dark focus:outline-none focus:border-orange font-semibold"
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
                    placeholder="Mei 2026"
                    className="w-full bg-[#FAF6F0] border-2 border-dark rounded-xl px-3 py-2 font-mono text-xs text-dark focus:outline-none focus:border-orange font-semibold"
                  />
                </div>
              </div>

              {/* OVERRIDE HARGA DEAL & PEMBAGIAN 3 TERMIN */}
              <div className="p-4 rounded-xl bg-orange/5 border-2 border-orange/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-headline font-black text-xs uppercase text-orange tracking-wider">
                    Override Kesepakatan Harga Deal &amp; Termin Kas
                  </span>
                  <span className="font-mono text-[10px] text-dark/60 font-bold">
                    Otomatis dibagi 30% / 40% / 30%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase text-dark/70 mb-1">
                      Harga / Siswa (Rp)
                    </label>
                    <input
                      type="number"
                      value={pricePerStudent}
                      onChange={(e) =>
                        handleStudentOrPriceChange(studentCount, Number(e.target.value))
                      }
                      className="w-full bg-white border-2 border-dark rounded-xl px-3 py-1.5 font-mono text-xs text-dark font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase text-dark/70 mb-1">
                      Total Deal Akhir (Rp)
                    </label>
                    <input
                      type="number"
                      value={totalPriceDeal}
                      onChange={(e) => handleDealPriceChange(Number(e.target.value))}
                      className="w-full bg-white border-2 border-dark rounded-xl px-3 py-1.5 font-mono text-xs text-orange font-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-orange/20">
                  <div>
                    <label className="block font-mono text-[9px] font-bold uppercase text-dark/70 mb-1">
                      Termin 1 (DP 30%)
                    </label>
                    <input
                      type="number"
                      value={dpAmount}
                      onChange={(e) => setDpAmount(Number(e.target.value))}
                      className="w-full bg-white border border-dark/20 rounded-lg px-2.5 py-1 font-mono text-[11px] font-bold text-dark"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] font-bold uppercase text-dark/70 mb-1">
                      Termin 2 (ACC Dummy 40%)
                    </label>
                    <input
                      type="number"
                      value={midAmount}
                      onChange={(e) => setMidAmount(Number(e.target.value))}
                      className="w-full bg-white border border-dark/20 rounded-lg px-2.5 py-1 font-mono text-[11px] font-bold text-dark"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] font-bold uppercase text-dark/70 mb-1">
                      Termin 3 (Pelunasan 30%)
                    </label>
                    <input
                      type="number"
                      value={finalAmount}
                      onChange={(e) => setFinalAmount(Number(e.target.value))}
                      className="w-full bg-white border border-dark/20 rounded-lg px-2.5 py-1 font-mono text-[11px] font-bold text-dark"
                    />
                  </div>
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
                  {isSubmitting
                    ? "Menerbitkan..."
                    : sourceProspectId
                    ? "Konversi & Kunci MOU"
                    : "Terbitkan Kode Akses"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
