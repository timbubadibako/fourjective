"use client";

import React, { useState } from "react";
import {
  GanttMilestone,
  MONTH_NAMES,
  REAL_EXCEL_GANTT_MILESTONES,
} from "@/lib/gantt-data";
import {
  Save,
  Building,
  UserCheck,
  Layers,
  ListTodo,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertCircle,
  FileSpreadsheet,
  Check,
} from "lucide-react";

// Palet pemisah background tabel per bulan (subtle, clean & high readability)
const MONTH_BG_MAP: Record<string, { bg: string; badge: string; border: string }> = {
  "November 2025": {
    bg: "bg-amber-500/[0.04]",
    badge: "bg-amber-100/90 text-amber-900 border-amber-300/80",
    border: "border-amber-500/20",
  },
  "Desember 2025": {
    bg: "bg-sky-500/[0.04]",
    badge: "bg-sky-100/90 text-sky-900 border-sky-300/80",
    border: "border-sky-500/20",
  },
  "Januari 2026": {
    bg: "bg-purple-500/[0.04]",
    badge: "bg-purple-100/90 text-purple-900 border-purple-300/80",
    border: "border-purple-500/20",
  },
  "Februari 2026": {
    bg: "bg-emerald-500/[0.04]",
    badge: "bg-emerald-100/90 text-emerald-900 border-emerald-300/80",
    border: "border-emerald-500/20",
  },
  "Maret 2026": {
    bg: "bg-teal-500/[0.04]",
    badge: "bg-teal-100/90 text-teal-900 border-teal-300/80",
    border: "border-teal-500/20",
  },
  "April 2026": {
    bg: "bg-rose-500/[0.04]",
    badge: "bg-rose-100/90 text-rose-900 border-rose-300/80",
    border: "border-rose-500/20",
  },
  "Mei 2026": {
    bg: "bg-orange-500/[0.04]",
    badge: "bg-orange-100/90 text-orange-900 border-orange-300/80",
    border: "border-orange-500/20",
  },
};

export function AdminTimelineScheduler() {
  const [activeStep, setActiveStep] = useState<1 | 2>(1); // Step 1: Generator Gantt (PO), Step 2: Live Tracking Checklist
  const [milestones, setMilestones] = useState<GanttMilestone[]>(
    REAL_EXCEL_GANTT_MILESTONES
  );
  const [activeMonthFilter, setActiveMonthFilter] = useState<string>("ALL");
  const [isSaved, setIsSaved] = useState(false);

  // Form State Tambah / Edit Task oleh PO
  const [formTask, setFormTask] = useState<{
    id?: string;
    title: string;
    category: GanttMilestone["category"];
    assignedTo: GanttMilestone["assignedTo"];
    month: string;
    startDay: number;
    endDay: number;
    color: string;
    notes: string;
  }>({
    title: "",
    category: "Photoshoot & Video",
    assignedTo: "Fourjective",
    month: "Januari 2026",
    startDay: 1,
    endDay: 5,
    color: "#FF9900",
    notes: "",
  });

  const [isEditingId, setIsEditingId] = useState<string | null>(null);

  // Toggle checklist status di Step 1 maupun Step 2
  const handleToggleDone = (id: string) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, done: !m.done } : m))
    );
    setIsSaved(false);
  };

  // Simpan/Submit Milestone oleh PO
  const handleSubmitTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTask.title.trim()) return;

    if (isEditingId) {
      setMilestones((prev) =>
        prev.map((m) =>
          m.id === isEditingId
            ? {
                ...m,
                title: formTask.title,
                category: formTask.category,
                assignedTo: formTask.assignedTo,
                month: formTask.month,
                startDay: Number(formTask.startDay),
                endDay: Math.max(Number(formTask.startDay), Number(formTask.endDay)),
                color: formTask.color,
                notes: formTask.notes,
                duration: `${Math.max(1, formTask.endDay - formTask.startDay + 1)} hari`,
              }
            : m
        )
      );
      setIsEditingId(null);
    } else {
      const newTask: GanttMilestone = {
        id: `custom-${Date.now()}`,
        title: formTask.title,
        category: formTask.category,
        assignedTo: formTask.assignedTo,
        month: formTask.month,
        monthIndex: MONTH_NAMES.indexOf(formTask.month),
        startDay: Number(formTask.startDay),
        endDay: Math.max(Number(formTask.startDay), Number(formTask.endDay)),
        color: formTask.color,
        notes: formTask.notes,
        duration: `${Math.max(1, formTask.endDay - formTask.startDay + 1)} hari`,
        done: false,
      };
      setMilestones((prev) => [...prev, newTask]);
    }

    // Reset Form
    setFormTask({
      title: "",
      category: "Photoshoot & Video",
      assignedTo: "Fourjective",
      month: "Januari 2026",
      startDay: 1,
      endDay: 5,
      color: "#FF9900",
      notes: "",
    });
    setIsSaved(false);
  };

  const handleEditClick = (m: GanttMilestone) => {
    setIsEditingId(m.id);
    setFormTask({
      title: m.title,
      category: m.category,
      assignedTo: m.assignedTo,
      month: m.month,
      startDay: m.startDay,
      endDay: m.endDay,
      color: m.color,
      notes: m.notes || "",
    });
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleDeleteTask = (id: string) => {
    setMilestones((prev) => prev.filter((m) => m.id !== id));
    if (isEditingId === id) setIsEditingId(null);
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const completedCount = milestones.filter((m) => m.done).length;
  const progressPercent = Math.round((completedCount / milestones.length) * 100);

  const filteredMilestones =
    activeMonthFilter === "ALL"
      ? milestones
      : milestones.filter((m) => m.month === activeMonthFilter);

  // Grouping Milestones per bulan untuk rendering pemisahan warna tabel yang tegas
  const displayedMonths =
    activeMonthFilter === "ALL"
      ? MONTH_NAMES.filter((m) => milestones.some((item) => item.month === m))
      : [activeMonthFilter];

  return (
    <div className="rounded-xl border border-dark/15 bg-white p-6 shadow-sm space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-orange">
              Project Officer Scheduling Engine
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-900 text-white">
              By System
            </span>
          </div>
          <h3 className="font-headline font-black text-xl text-dark mt-0.5">
            Sistem Alur Timeline & Eksekusi Checklist Angkatan
          </h3>
          <p className="font-sans text-xs font-semibold text-dark/70 mt-0.5">
            Dua tahap operasional PO: Pembuatan Gantt Matrix Range tanggal dan Checklist operasional live.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 bg-orange hover:bg-orange/90 text-white font-mono text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaved ? "Tersimpan di Cloud!" : "Simpan Jadwal PO"}</span>
          </button>
        </div>
      </div>

      {/* 2 STEP OPERASIONAL OLEH PO (WIZARD HEADER) */}
      <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#FAF6F0] rounded-2xl border border-dark/15">
        <button
          onClick={() => setActiveStep(1)}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all font-mono text-xs font-bold cursor-pointer ${
            activeStep === 1
              ? "bg-dark text-white shadow-sm"
              : "text-dark/70 hover:text-dark hover:bg-white/50"
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-orange text-white flex items-center justify-center text-[10px] font-black">
            1
          </span>
          <span className="font-headline font-black uppercase text-sm tracking-wide">
            STEP 1: Buat Gantt & Plotting Range (PO)
          </span>
        </button>

        <button
          onClick={() => setActiveStep(2)}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all font-mono text-xs font-bold cursor-pointer ${
            activeStep === 2
              ? "bg-dark text-white shadow-sm"
              : "text-dark/70 hover:text-dark hover:bg-white/50"
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black">
            2
          </span>
          <span className="font-headline font-black uppercase text-sm tracking-wide">
            STEP 2: Checklist Operasional Live ({completedCount}/{milestones.length})
          </span>
        </button>
      </div>

      {/* Info Header Proyek Acuan */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[#FAF6F0] border border-dark/15">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-dark text-white flex items-center justify-center font-mono font-bold text-xs shadow-sm">
            <Building className="w-4 h-4" />
          </div>
          <div>
            <div className="font-headline font-black text-sm text-dark flex items-center gap-2">
              <span>Pesantren Al-Hamidiyah</span>
              <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white border border-dark/15 text-orange">
                ALHAM-2026
              </span>
            </div>
            <div className="font-mono text-[10px] font-bold text-dark/60 uppercase mt-0.5">
              Periode 2025/2026 • Standar 22 Milestone Terisi
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-mono font-bold bg-white border border-dark/15 text-dark">
            <UserCheck className="w-3.5 h-3.5 text-orange" />
            <span>Project Officer: <strong>Veny Meilinda</strong></span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-900 text-white border border-zinc-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Live Sync Siswa</span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* STEP 1: PEMBUATAN TIMELINE BY PO BY SYSTEM (GANTT & RANGE) */}
      {/* ======================================================== */}
      {activeStep === 1 && (
        <div className="space-y-6">
          {/* Panel Form Selector Range From - To */}
          <div className="p-5 rounded-2xl bg-[#FAF6F0] border-2 border-dark/15 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange" />
                <span className="font-headline font-black text-sm text-dark uppercase tracking-wide">
                  {isEditingId ? "Edit Range Milestone Terpilih" : "Tambah Milestone / Task Baru oleh PO"}
                </span>
              </div>
              {isEditingId && (
                <button
                  onClick={() => {
                    setIsEditingId(null);
                    setFormTask({
                      title: "",
                      category: "Photoshoot & Video",
                      assignedTo: "Fourjective",
                      month: "Januari 2026",
                      startDay: 1,
                      endDay: 5,
                      color: "#FF9900",
                      notes: "",
                    });
                  }}
                  className="font-mono text-xs font-bold text-dark/60 hover:text-dark cursor-pointer"
                >
                  Batal Edit ✕
                </button>
              )}
            </div>

            <form onSubmit={handleSubmitTask} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {/* Nama Kegiatan */}
                <div className="sm:col-span-2">
                  <label className="block font-mono text-[10px] font-bold uppercase text-dark/70 mb-1">
                    Nama Kegiatan / Milestone
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Photoshoot Sesi 2 Kelas XII..."
                    value={formTask.title}
                    onChange={(e) =>
                      setFormTask({ ...formTask, title: e.target.value })
                    }
                    className="w-full bg-white border border-dark/20 rounded-xl px-3 py-2 font-sans font-bold text-xs text-dark outline-none focus:border-orange"
                  />
                </div>

                {/* Kategori Tahapan */}
                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase text-dark/70 mb-1">
                    Kategori Alur
                  </label>
                  <select
                    value={formTask.category}
                    onChange={(e) =>
                      setFormTask({
                        ...formTask,
                        category: e.target.value as GanttMilestone["category"],
                      })
                    }
                    className="w-full bg-white border border-dark/20 rounded-xl px-3 py-2 font-mono text-xs font-bold text-dark outline-none focus:border-orange cursor-pointer"
                  >
                    <option>Pra-Produksi</option>
                    <option>Photoshoot & Video</option>
                    <option>Desain Cover</option>
                    <option>Editing & Grading</option>
                    <option>Layout & Dummy</option>
                    <option>Cetak & Packaging</option>
                  </select>
                </div>

                {/* Penanggung Jawab (PIC) */}
                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase text-dark/70 mb-1">
                    Penanggung Jawab (PIC)
                  </label>
                  <select
                    value={formTask.assignedTo}
                    onChange={(e) =>
                      setFormTask({
                        ...formTask,
                        assignedTo: e.target.value as GanttMilestone["assignedTo"],
                      })
                    }
                    className="w-full bg-white border border-dark/20 rounded-xl px-3 py-2 font-mono text-xs font-bold text-dark outline-none focus:border-orange cursor-pointer"
                  >
                    <option value="Fourjective">Fourjective (Studio)</option>
                    <option value="Client">Client (Sekolah/Panitia)</option>
                    <option value="Vendor">Vendor Percetakan</option>
                  </select>
                </div>
              </div>

              {/* Selector Range Penanggalan From - To & Warna */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
                {/* Bulan Target */}
                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase text-dark/70 mb-1">
                    Bulan Target
                  </label>
                  <select
                    value={formTask.month}
                    onChange={(e) =>
                      setFormTask({ ...formTask, month: e.target.value })
                    }
                    className="w-full bg-white border border-dark/20 rounded-xl px-3 py-2 font-mono text-xs font-bold text-dark outline-none focus:border-orange cursor-pointer"
                  >
                    {MONTH_NAMES.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* From (Tanggal Mulai) */}
                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase text-dark/70 mb-1">
                    From (Mulai)
                  </label>
                  <select
                    value={formTask.startDay}
                    onChange={(e) =>
                      setFormTask({
                        ...formTask,
                        startDay: Number(e.target.value),
                        endDay: Math.max(Number(e.target.value), formTask.endDay),
                      })
                    }
                    className="w-full bg-white border border-dark/20 rounded-xl px-3 py-2 font-mono text-xs font-bold text-dark outline-none focus:border-orange cursor-pointer"
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>
                        Tgl {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* To (Tanggal Selesai) */}
                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase text-dark/70 mb-1">
                    To (Selesai)
                  </label>
                  <select
                    value={formTask.endDay}
                    onChange={(e) =>
                      setFormTask({
                        ...formTask,
                        endDay: Math.max(Number(e.target.value), formTask.startDay),
                      })
                    }
                    className="w-full bg-white border border-dark/20 rounded-xl px-3 py-2 font-mono text-xs font-bold text-dark outline-none focus:border-orange cursor-pointer"
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>
                        Tgl {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Warna Strip Bar XLSX */}
                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase text-dark/70 mb-1">
                    Warna Bar (XLSX)
                  </label>
                  <div className="flex items-center gap-2 bg-white border border-dark/20 rounded-xl px-2 py-1.5">
                    <input
                      type="color"
                      value={formTask.color}
                      onChange={(e) =>
                        setFormTask({ ...formTask, color: e.target.value })
                      }
                      className="w-6 h-6 border-0 rounded cursor-pointer"
                    />
                    <span className="font-mono text-xs font-bold uppercase text-dark/80">
                      {formTask.color}
                    </span>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-orange hover:bg-orange/90 text-white font-headline font-black text-xs uppercase tracking-wider py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
                  >
                    {isEditingId ? "Update Range" : "+ Plot ke Matriks"}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Filter Bulan Cepat */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-y border-dark/10 py-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-mono text-[10px] font-bold uppercase text-dark/60 mr-1">
                Filter Kalender:
              </span>
              <button
                onClick={() => setActiveMonthFilter("ALL")}
                className={`font-mono text-[10px] font-bold px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  activeMonthFilter === "ALL"
                    ? "bg-dark text-white"
                    : "bg-[#FAF6F0] text-dark/70 hover:bg-dark/10"
                }`}
              >
                Semua Bulan
              </button>
              {MONTH_NAMES.map((m) => (
                <button
                  key={m}
                  onClick={() => setActiveMonthFilter(m)}
                  className={`font-mono text-[10px] font-bold px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    activeMonthFilter === m
                      ? "bg-dark text-white"
                      : "bg-[#FAF6F0] text-dark/70 hover:bg-dark/10"
                  }`}
                >
                  {m.split(" ")[0]}
                </button>
              ))}
            </div>

            <div className="font-mono text-[10px] font-bold text-dark/60">
              Tabel dikelompokkan dengan warna background berbeda per bulan
            </div>
          </div>

          {/* Tabel Gantt Chart 31 Hari Berdasarkan Pengelompokan & Pemisahan Warna Bulan */}
          <div className="overflow-x-auto border border-dark/15 rounded-xl bg-white shadow-inner">
            <table className="w-full border-collapse text-left text-xs min-w-[980px]">
              <thead>
                <tr className="bg-[#FAF6F0] border-b border-dark/15">
                  <th className="p-2.5 font-mono text-[10px] font-bold uppercase tracking-wider text-dark/70 w-64 min-w-[240px] sticky left-0 bg-[#FAF6F0] z-20 border-r border-dark/15">
                    Kegiatan & Bulan
                  </th>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <th
                      key={day}
                      className="p-0 font-mono text-[9px] font-bold text-center text-dark/60 border-r border-dark/10 w-[24px] min-w-[24px] h-7"
                    >
                      {day}
                    </th>
                  ))}
                  <th className="p-2 font-mono text-[10px] font-bold uppercase text-center text-dark/70 w-24 min-w-[90px]">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="font-sans">
                {displayedMonths.map((month) => {
                  const monthTasks = filteredMilestones.filter(
                    (m) => m.month === month
                  );
                  if (monthTasks.length === 0) return null;

                  const monthStyle = MONTH_BG_MAP[month] || {
                    bg: "bg-slate-50/50",
                    badge: "bg-slate-200 text-dark border-slate-300",
                    border: "border-slate-300",
                  };

                  return (
                    <React.Fragment key={month}>
                      {/* Section Separator Bar per Bulan */}
                      <tr className="border-t-2 border-dark/20">
                        <td
                          colSpan={33}
                          className={`py-2 px-3 font-mono text-[11px] font-bold uppercase tracking-wider ${monthStyle.bg} border-b border-dark/15`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2.5 py-0.5 rounded-md border text-[10px] font-bold ${monthStyle.badge}`}
                              >
                                {month}
                              </span>
                              <span className="text-dark/60 text-[10px]">
                                ({monthTasks.length} milestone terplot)
                              </span>
                            </div>
                            <span className="text-[10px] text-dark/50 font-normal">
                              {monthTasks.filter((t) => t.done).length} Selesai / {monthTasks.length} Total
                            </span>
                          </div>
                        </td>
                      </tr>

                      {/* Baris Task dalam Bulan Tersebut */}
                      {monthTasks.map((m) => {
                        return (
                          <tr
                            key={m.id}
                            className={`border-b border-dark/10 transition-colors group cursor-pointer ${
                              m.done
                                ? "bg-emerald-500/[0.08]"
                                : monthStyle.bg
                            } hover:bg-orange-500/[0.08]`}
                            onClick={() => handleEditClick(m)}
                          >
                            {/* Sticky Kolom Kiri: Nama & Info */}
                            <td
                              className={`p-2.5 sticky left-0 z-10 border-r border-dark/15 ${
                                m.done ? "bg-[#FAF6F0]" : "bg-white"
                              } group-hover:bg-[#FAF6F0]`}
                            >
                              <div className="flex items-center justify-between gap-1.5">
                                <div className="flex items-center gap-2 truncate">
                                  <span
                                    className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                                    style={{ backgroundColor: m.color }}
                                  />
                                  <span
                                    className={`font-sans font-bold text-xs truncate ${
                                      m.done
                                        ? "text-emerald-900 line-through font-semibold"
                                        : "text-dark"
                                    }`}
                                  >
                                    {m.title}
                                  </span>
                                </div>
                                <span className="font-mono text-[9px] font-bold text-orange flex-shrink-0">
                                  Tgl {m.startDay}-{m.endDay}
                                </span>
                              </div>
                            </td>

                            {/* 31 Hari Bar Strip: Full-Bleed Cell Fill seperti Excel Asli */}
                            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                              const isInRange = day >= m.startDay && day <= m.endDay;

                              return (
                                <td
                                  key={day}
                                  className="p-0 border-r border-dark/10 h-7 text-center relative"
                                  style={{
                                    backgroundColor: isInRange ? m.color : undefined,
                                    opacity: isInRange && m.done ? 0.45 : 1,
                                  }}
                                  title={`${m.title}: ${m.month} tgl ${m.startDay} - ${m.endDay}`}
                                />
                              );
                            })}

                            {/* Status Chip / Toggle Done */}
                            <td
                              className="p-2 text-center"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                onClick={() => handleToggleDone(m.id)}
                                className={`inline-flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                                  m.done
                                    ? "bg-dark text-white border border-dark hover:bg-dark/85"
                                    : "bg-[#FAF6F0] text-dark/70 border border-dark/20 hover:border-dark hover:text-dark"
                                }`}
                              >
                                {m.done ? (
                                  <>
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                    <span>Done</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="w-1.5 h-1.5 rounded-full bg-dark/30" />
                                    <span>Pending</span>
                                  </>
                                )}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 2: CHECKLIST OPERASIONAL LIVE (UNTUK TIM & KLIEN) */}
      {/* ======================================================== */}
      {activeStep === 2 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAF6F0] border border-dark/15">
            <div>
              <h4 className="font-headline font-black text-base text-dark">
                Checklist Live Status Pelaksanaan Angkatan
              </h4>
              <p className="font-sans text-xs font-semibold text-dark/70">
                Pemisahan warna latar per bulan memudahkan verifikasi jadwal mingguan.
              </p>
            </div>
            <div className="font-headline font-black text-2xl text-orange">
              {progressPercent}% <span className="font-mono text-xs font-bold text-dark/50">SELESAI</span>
            </div>
          </div>

          <div className="overflow-x-auto border border-dark/15 rounded-xl bg-white shadow-inner">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#FAF6F0] border-b border-dark/15 font-mono text-[10px] font-bold uppercase tracking-wider text-dark/70">
                  <th className="p-3 font-bold w-12 text-center">Centang</th>
                  <th className="p-3 font-bold">Warna</th>
                  <th className="p-3 font-bold">Nama Kegiatan</th>
                  <th className="p-3 font-bold">Bulan Target</th>
                  <th className="p-3 font-bold">Jadwal Range</th>
                  <th className="p-3 font-bold">Durasi</th>
                  <th className="p-3 font-bold">Penanggung Jawab</th>
                  <th className="p-3 font-bold text-center">Status Done</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark/10 font-sans">
                {displayedMonths.map((month) => {
                  const monthTasks = filteredMilestones.filter(
                    (m) => m.month === month
                  );
                  if (monthTasks.length === 0) return null;

                  const monthStyle = MONTH_BG_MAP[month] || {
                    bg: "bg-slate-50/50",
                    badge: "bg-slate-200 text-dark border-slate-300",
                    border: "border-slate-300",
                  };

                  return (
                    <React.Fragment key={month}>
                      {/* Pemisah Bulan di Checklist Table */}
                      <tr className="border-t-2 border-dark/20">
                        <td
                          colSpan={8}
                          className={`py-2 px-3 font-mono text-[11px] font-bold uppercase tracking-wider ${monthStyle.bg} border-b border-dark/15`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2.5 py-0.5 rounded-md border text-[10px] font-bold ${monthStyle.badge}`}
                            >
                              {month}
                            </span>
                            <span className="text-dark/60 text-[10px]">
                              ({monthTasks.length} Task)
                            </span>
                          </div>
                        </td>
                      </tr>

                      {/* Task Rows */}
                      {monthTasks.map((m) => (
                        <tr
                          key={m.id}
                          className={`transition-colors cursor-pointer ${
                            m.done
                              ? "bg-emerald-500/[0.08]"
                              : monthStyle.bg
                          } hover:bg-orange-500/[0.08]`}
                          onClick={() => handleToggleDone(m.id)}
                        >
                          <td
                            className="p-3 text-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input
                              type="checkbox"
                              checked={m.done}
                              onChange={() => handleToggleDone(m.id)}
                              className="accent-orange w-4 h-4 cursor-pointer"
                            />
                          </td>
                          <td className="p-3">
                            <span
                              className="w-3.5 h-3.5 rounded-md inline-block border border-dark/20 shadow-xs"
                              style={{ backgroundColor: m.color }}
                            />
                          </td>
                          <td className="p-3 font-sans font-bold text-dark">
                            <span
                              className={
                                m.done
                                  ? "line-through text-emerald-900 font-semibold"
                                  : "text-dark"
                              }
                            >
                              {m.title}
                            </span>
                          </td>
                          <td className="p-3 font-mono text-[10px] font-bold text-dark/70 uppercase">
                            <span
                              className={`px-2 py-0.5 rounded border text-[9px] font-bold ${monthStyle.badge}`}
                            >
                              {m.month.split(" ")[0]}
                            </span>
                          </td>
                          <td className="p-3 font-mono font-bold text-xs text-orange">
                            Tgl {m.startDay} - {m.endDay}
                          </td>
                          <td className="p-3 font-mono font-bold text-xs text-dark/70">
                            {m.duration}
                          </td>
                          <td className="p-3 font-mono font-bold text-xs">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                                m.assignedTo === "Fourjective"
                                  ? "bg-dark text-white"
                                  : m.assignedTo === "Client"
                                  ? "bg-orange text-white"
                                  : "bg-white border border-dark/20 text-dark"
                              }`}
                            >
                              {m.assignedTo}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <span
                              className={`inline-flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase px-2.5 py-1 rounded-md ${
                                m.done
                                  ? "bg-dark text-white border border-dark"
                                  : "bg-[#FAF6F0] text-dark/70 border border-dark/20"
                              }`}
                            >
                              {m.done ? (
                                <>
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                  <span>Done</span>
                                </>
                              ) : (
                                <>
                                  <span className="w-1.5 h-1.5 rounded-full bg-dark/30" />
                                  <span>Pending</span>
                                </>
                              )}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
