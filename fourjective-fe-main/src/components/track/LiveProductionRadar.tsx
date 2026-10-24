"use client";

import React, { useState } from "react";
import {
  REAL_EXCEL_GANTT_MILESTONES,
  GanttMilestone,
} from "@/lib/gantt-data";
import {
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  UserCheck,
  Flame,
  Layers,
  ChevronRight,
  Activity,
  CalendarDays,
} from "lucide-react";

interface LiveProductionRadarProps {
  schoolName?: string;
  targetGraduation?: string;
  schedule?: GanttMilestone[];
}

export function LiveProductionRadar({
  schoolName = "Pesantren Al-Hamidiyah",
  targetGraduation = "Mei 2026",
  schedule = REAL_EXCEL_GANTT_MILESTONES,
}: LiveProductionRadarProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>("Januari 2026");

  // Dua task aktif paralel yang sedang berlangsung di Januari 2026
  const liveTasks: GanttMilestone[] = [
    {
      id: "live-1",
      title: "Sesi Foto Angkatan & Kelas Outdoor",
      color: "#0B5394",
      category: "Photoshoot & Video",
      assignedTo: "Fourjective",
      month: "Januari 2026",
      monthIndex: 2,
      startDay: 10,
      endDay: 20,
      duration: "10 hari",
      done: false,
      notes: "Sesi foto outdoor konsep per kelas & sesi studio foto guru.",
    },
    {
      id: "live-2",
      title: "Penyusunan Draft Grid & Kurasi Foto",
      color: "#38761D",
      category: "Layout & Dummy",
      assignedTo: "Fourjective",
      month: "Januari 2026",
      monthIndex: 2,
      startDay: 15,
      endDay: 23,
      duration: "8 hari",
      done: false,
      notes: "Pemilihan foto terbaik kelas & penataan komposisi buku sebelum dummy.",
    },
  ];

  // Hitung progres global
  const totalTasks = schedule.length;
  const completedTasks = schedule.filter((t) => t.done).length;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  // Ambil daftar bulan unik dari jadwal
  const availableMonths = [
    "November 2025",
    "Desember 2025",
    "Januari 2026",
    "Februari 2026",
    "Maret 2026",
    "April 2026",
    "Mei 2026",
  ];

  // Task sesuai bulan yang dipilih
  const monthTasks = schedule.filter((t) => t.month === selectedMonth);

  return (
    <div className="space-y-6">
      {/* ======================================================== */}
      {/* 1. HERO COCKPIT: LIVE PRODUCTION RADAR (PARALEL BERIRIRAN) */}
      {/* ======================================================== */}
      <div className="rounded-2xl border border-dark/15 bg-white p-6 shadow-sm relative overflow-hidden">
        {/* Glow oranye aksen halus */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Header Baris 1: Judul & Target Wisuda */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 font-mono text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Production Radar
                </span>
                <span className="font-mono text-[10px] font-bold text-dark/40">
                  Update Realtime Siswa
                </span>
              </div>
              <h3 className="font-headline font-black text-2xl text-dark tracking-tight mt-1">
                Aktivitas Produksi Berjalan Hari Ini
              </h3>
              <p className="font-sans text-xs text-dark/65 mt-0.5">
                Pemantauan langsung proses kreatif buku tahunan <strong>{schoolName}</strong> dari studio Fourjective.
              </p>
            </div>

            <div className="bg-[#FAF6F0] border border-dark/15 px-4 py-2 rounded-xl text-left sm:text-right shrink-0">
              <span className="block font-mono text-[9px] uppercase tracking-wider text-dark/50 font-bold">
                Target Distribusi Wisuda
              </span>
              <span className="font-mono text-sm font-black text-orange">
                {targetGraduation}
              </span>
            </div>
          </div>

          {/* KARTU PARALEL: 2 KEGIATAN BERIRIRAN SEKALIGUS */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-dark">
                  2 Kegiatan Aktif Beririsan (Paralel)
                </span>
              </div>
              <span className="font-mono text-[10px] font-bold text-orange">
                Bulan Aktif: Januari 2026
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {liveTasks.map((task, idx) => {
                // Simulasi progress bar hari (misal hari ini tgl 18)
                const currentDay = 18;
                const totalSpan = task.endDay - task.startDay + 1;
                const daysPassed = Math.max(0, Math.min(totalSpan, currentDay - task.startDay + 1));
                const percentPassed = Math.round((daysPassed / totalSpan) * 100);
                const daysLeft = Math.max(0, task.endDay - currentDay);

                return (
                  <div
                    key={task.id}
                    className="rounded-xl border-2 border-dark/15 bg-[#FAF6F0] p-5 relative overflow-hidden shadow-xs hover:border-orange transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Baris Kartu: Badge Kategori & Rentang Tanggal */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider text-white shadow-2xs"
                          style={{ backgroundColor: task.color || "#FF4D00" }}
                        >
                          {task.category}
                        </span>

                        <span className="font-mono text-[11px] font-black text-orange bg-white px-2.5 py-1 rounded-lg border border-dark/15 flex items-center gap-1 shadow-2xs">
                          <Clock className="w-3.5 h-3.5 text-orange" />
                          <span>Tgl {task.startDay} - {task.endDay} Jan</span>
                        </span>
                      </div>

                      {/* Judul & Catatan */}
                      <h4 className="font-headline font-black text-lg text-dark group-hover:text-orange transition-colors">
                        {task.title}
                      </h4>
                      <p className="font-sans text-xs text-dark/70 mt-1.5 leading-relaxed">
                        {task.notes}
                      </p>
                    </div>

                    {/* Progress Bar Timeline Hari Ini */}
                    <div className="pt-4 mt-4 border-t border-dark/10 space-y-2">
                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <span className="text-dark/60 font-bold">
                          Hari ke-{daysPassed} dari {totalSpan} hari
                        </span>
                        <span className="font-black text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                          {daysLeft > 0 ? `Sisa ${daysLeft} hari lagi` : "Deadline tercapai"}
                        </span>
                      </div>

                      <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-dark/15">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${percentPassed}%`,
                            backgroundColor: task.color || "#FF4D00",
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono pt-1 text-dark/50">
                        <span>Mulai: 10 Jan</span>
                        <span>Selesai: {task.endDay} Jan</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* PROGRESS BAR GLOBAL */}
          <div className="pt-2 border-t border-dark/10">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-dark/60 font-bold uppercase text-[10px]">
                Akumulasi Total Milestone Angkatan
              </span>
              <span className="font-bold text-dark">
                <span className="text-orange">{completedTasks} Selesai</span> / {totalTasks} Total ({progressPercent}%)
              </span>
            </div>
            <div className="w-full bg-[#FAF6F0] h-2.5 rounded-full overflow-hidden border border-dark/15">
              <div
                className="bg-orange h-full rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. TABEL MATRIX TIMELINE BULANAN (ADAPTASI DARI GANTT ADMIN) */}
      {/* ======================================================== */}
      <div className="rounded-2xl border border-dark/15 bg-white p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-dark/10 pb-4">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-orange">
              Jadwal Lengkap Angkatan
            </span>
            <h3 className="font-headline font-black text-xl text-dark mt-0.5">
              Kalender Milestone Per Bulan
            </h3>
          </div>

          {/* Switcher Tab Bulan */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {availableMonths.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMonth(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedMonth === m
                    ? "bg-dark text-white shadow-xs"
                    : "bg-[#FAF6F0] text-dark/70 hover:text-dark border border-dark/15"
                }`}
              >
                {m.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* List Checklist Milestone untuk Bulan Terpilih */}
        <div className="space-y-3">
          {monthTasks.length === 0 ? (
            <div className="p-8 text-center text-dark/40 font-mono text-xs">
              Tidak ada agenda milestone di bulan {selectedMonth}.
            </div>
          ) : (
            monthTasks.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                  item.done
                    ? "bg-[#FAF6F0]/50 border-dark/10 opacity-75"
                    : "bg-[#FAF6F0] border-dark/15 hover:border-orange hover:bg-white"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-white ${
                      item.done
                        ? "bg-dark border border-dark"
                        : "bg-white border-2 border-dark/25"
                    }`}
                  >
                    {item.done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-dark/30" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-sm shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <h5
                        className={`font-sans font-bold text-sm ${
                          item.done ? "text-dark/60 line-through" : "text-dark"
                        }`}
                      >
                        {item.title}
                      </h5>
                    </div>
                    {item.notes && (
                      <p className="font-sans text-xs text-dark/60 mt-0.5 pl-4.5">
                        {item.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Kolom Kanan: Tanggal & Badge Status */}
                <div className="flex items-center justify-between sm:justify-end gap-3 pl-9 sm:pl-0 shrink-0">
                  <span className="font-mono text-xs font-black text-orange bg-white px-2.5 py-1 rounded-md border border-dark/10">
                    Tgl {item.startDay} - {item.endDay}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase px-2.5 py-1 rounded-md ${
                      item.done
                        ? "bg-dark text-white border border-dark"
                        : "bg-white text-dark/70 border border-dark/20"
                    }`}
                  >
                    {item.done ? (
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
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
