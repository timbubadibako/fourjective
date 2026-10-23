"use client";

import React, { useState } from "react";
import {
  FOURJECTIVE_PRODUCTION_TASKS,
  TimelineTask,
} from "@/lib/timeline-data";
import {
  CheckCircle2,
  Clock,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Calendar,
  AlertCircle,
} from "lucide-react";

export function AdminTimelineScheduler() {
  const [tasks, setTasks] = useState<TimelineTask[]>(
    FOURJECTIVE_PRODUCTION_TASKS
  );
  const [isSaved, setIsSaved] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState("SMAN 1 Kuningan (2026)");

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const completedCount = tasks.filter((t) => t.done).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="rounded-xl border border-dark/15 bg-white p-6 shadow-sm space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark/10 pb-4">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-orange">
            Production Scheduling Tool
          </span>
          <h3 className="font-headline font-bold text-xl text-dark mt-0.5">
            Manajemen Timeline Produksi Angkatan
          </h3>
          <p className="font-sans text-xs text-dark/60 mt-0.5">
            Sinkronisasi jadwal kerja riil harian, sesi photoshoot, revisi, hingga proses cetak vendor ke portal siswa.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            className="bg-[#FAF6F0] border border-dark/15 rounded-lg px-3 py-2 text-xs font-mono font-bold text-dark outline-none focus:border-orange"
          >
            <option>SMAN 1 Kuningan (2026)</option>
            <option>SMAIT Nurul Ilmi Jambi (2026)</option>
            <option>SMK Kesehatan Riksa Indriya</option>
            <option>SMA Labschool Kebayoran</option>
          </select>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 bg-orange hover:bg-orange/90 text-white font-mono text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaved ? "Tersimpan!" : "Simpan Perubahan"}</span>
          </button>
        </div>
      </div>

      {/* Progress & Overview */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-[#FAF6F0] border border-dark/10 p-4 rounded-lg">
          <span className="font-mono text-[10px] uppercase text-dark/40 font-bold">
            Total Kegiatan
          </span>
          <div className="font-headline font-bold text-2xl text-dark mt-1">
            {tasks.length} Milestone
          </div>
          <div className="font-mono text-[10px] text-dark/50 mt-0.5">
            Dari Pra-Produksi hingga Ekspedisi
          </div>
        </div>

        <div className="bg-[#FAF6F0] border border-dark/10 p-4 rounded-lg">
          <span className="font-mono text-[10px] uppercase text-dark/40 font-bold">
            Kegiatan Selesai
          </span>
          <div className="font-headline font-bold text-2xl text-emerald-600 mt-1">
            {completedCount} Selesai
          </div>
          <div className="font-mono text-[10px] text-dark/50 mt-0.5">
            {tasks.length - completedCount} kegiatan tersisa
          </div>
        </div>

        <div className="bg-[#FAF6F0] border border-dark/10 p-4 rounded-lg">
          <span className="font-mono text-[10px] uppercase text-dark/40 font-bold">
            Persentase Progres
          </span>
          <div className="font-headline font-bold text-2xl text-orange mt-1">
            {progressPercent}%
          </div>
          <div className="w-full bg-white h-1.5 rounded-full overflow-hidden mt-1.5 border border-dark/10">
            <div
              className="bg-orange h-full rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Checklist Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-dark/10 font-mono text-[10px] text-dark/50 uppercase">
              <th className="pb-3 font-bold w-12 text-center">Status</th>
              <th className="pb-3 font-bold">Nama Kegiatan</th>
              <th className="pb-3 font-bold">Kategori</th>
              <th className="pb-3 font-bold">Durasi</th>
              <th className="pb-3 font-bold">Penanggung Jawab</th>
              <th className="pb-3 font-bold">Keterangan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark/5 font-sans">
            {tasks.map((task) => (
              <tr
                key={task.id}
                className={`hover:bg-[#FAF6F0] transition-colors cursor-pointer ${
                  task.done ? "bg-[#FAF6F0]/40" : ""
                }`}
                onClick={() => handleToggleTask(task.id)}
              >
                <td className="py-3 text-center">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => handleToggleTask(task.id)}
                    className="accent-orange w-4 h-4 cursor-pointer"
                  />
                </td>
                <td className="py-3 font-bold text-dark">
                  {task.title}
                </td>
                <td className="py-3 font-mono text-[10px] text-dark/60 uppercase">
                  {task.category}
                </td>
                <td className="py-3 font-mono text-dark/70">
                  {task.duration}
                </td>
                <td className="py-3 font-mono text-[10px] font-bold">
                  <span
                    className={`px-2 py-0.5 rounded ${
                      task.assignedTo === "Fourjective"
                        ? "bg-dark text-white"
                        : task.assignedTo === "Client"
                        ? "bg-orange text-white"
                        : "bg-slate-200 text-dark"
                    }`}
                  >
                    {task.assignedTo}
                  </span>
                </td>
                <td className="py-3 text-dark/60 text-xs">
                  {task.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
