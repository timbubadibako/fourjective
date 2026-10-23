"use client";

import React, { useState } from "react";
import {
  FOURJECTIVE_PRODUCTION_TASKS,
  TimelineTask,
} from "@/lib/timeline-data";
import {
  CheckCircle2,
  Clock,
  Calendar,
  Layers,
  ChevronRight,
  Filter,
  Sparkles,
} from "lucide-react";

interface ProductionTimelineProps {
  schoolName?: string;
  targetGraduation?: string;
  isGuest?: boolean;
}

export function ProductionTimeline({
  schoolName = "Angkatan 2026",
  targetGraduation = "Mei 2026",
  isGuest = false,
}: ProductionTimelineProps) {
  const [tasks, setTasks] = useState<TimelineTask[]>(
    FOURJECTIVE_PRODUCTION_TASKS
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const categories = [
    "Semua",
    "Pra-Produksi",
    "Photoshoot & Video",
    "Desain Cover",
    "Editing & Grading",
    "Layout & Dummy",
    "Cetak & Packaging",
  ];

  const filteredTasks =
    selectedCategory === "Semua"
      ? tasks
      : tasks.filter((t) => t.category === selectedCategory);

  const completedCount = tasks.filter((t) => t.done).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  // Month bars visualization matching Excel TIMELINE 2026
  const monthSchedule = [
    { month: "Okt 25", label: "Brief & Moodboard", active: true },
    { month: "Nov 25", label: "Photoshoot & Video", active: true },
    { month: "Des 25", label: "Grading & Cover", active: true },
    { month: "Jan 26", label: "Layout & Aftermovie", active: false },
    { month: "Feb 26", label: "ACC Dummy & Proof", active: false },
    { month: "Mar 26", label: "Cetak Mesin Offset", active: false },
    { month: "Apr 26", label: "Finishing & Packaging", active: false },
    { month: "Mei 26", label: "Distribusi Wisuda", active: false },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="rounded-xl border border-dark/15 bg-white p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark/10 pb-4">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-orange">
              Sistem Alur Kerja Produksi Studio
            </span>
            <h3 className="font-headline font-bold text-xl text-dark mt-0.5">
              Jadwal Timeline Detail • {schoolName}
            </h3>
            <p className="font-sans text-xs text-dark/65 mt-0.5">
              Transparansi tiap tahap pengerjaan buku tahunan mulai dari pra-produksi, sesi studio, hingga mesin cetak.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-[#FAF6F0] border border-dark/10 px-3 py-1.5 rounded-lg text-right">
              <span className="block font-mono text-[9px] uppercase text-dark/40">
                Target Selesai
              </span>
              <span className="font-mono text-xs font-bold text-dark">
                {targetGraduation}
              </span>
            </div>
          </div>
        </div>

        {/* Visual Roadmap Bar (Bulan) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-dark/60 font-bold uppercase text-[10px]">
              Progres Timeline Pengerjaan
            </span>
            <span className="text-orange font-bold">
              {completedCount} dari {tasks.length} Kegiatan Selesai ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-[#FAF6F0] h-2 rounded-full overflow-hidden border border-dark/10">
            <div
              className="bg-orange h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Month Step Badges */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 pt-2">
            {monthSchedule.map((m, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg border text-center transition-colors ${
                  m.active
                    ? "bg-dark text-white border-dark"
                    : "bg-[#FAF6F0] text-dark/60 border-dark/10"
                }`}
              >
                <div className="font-mono text-[10px] font-bold uppercase">
                  {m.month}
                </div>
                <div className="font-sans text-[9px] truncate mt-0.5 opacity-80">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Category & Tasks List */}
      <div className="rounded-xl border border-dark/15 bg-white p-6 shadow-sm space-y-4">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === c
                  ? "bg-dark text-white"
                  : "bg-[#FAF6F0] text-dark/70 hover:bg-dark/10 border border-dark/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Task Items Table / List */}
        <div className="divide-y divide-dark/10">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`py-3.5 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                task.done ? "opacity-90" : "bg-white"
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="mt-0.5 shrink-0">
                  {task.done ? (
                    <div className="w-5 h-5 rounded bg-dark text-white flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded border border-dark/30 flex items-center justify-center">
                      <Clock className="w-3 h-3 text-dark/40" />
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-headline font-bold text-xs sm:text-sm text-dark">
                      {task.title}
                    </span>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#FAF6F0] text-dark/60 border border-dark/10 uppercase">
                      {task.category}
                    </span>
                  </div>
                  {task.notes && (
                    <p className="font-sans text-xs text-dark/60 mt-0.5">
                      {task.notes}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <span className="font-mono text-[10px] text-dark/50 bg-[#FAF6F0] px-2 py-1 rounded border border-dark/10">
                  Durasi: {task.duration}
                </span>

                <span
                  className={`font-mono text-[10px] font-bold px-2 py-1 rounded ${
                    task.done
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-[#FAF6F0] text-dark/50 border border-dark/10"
                  }`}
                >
                  {task.done ? "Selesai" : "Menunggu"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
