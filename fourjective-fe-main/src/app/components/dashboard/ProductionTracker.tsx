"use client";

import { useState } from "react";
import { CheckCircle2, Clock, Camera, FileEdit, Printer, Truck, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ProductionOrder = {
  id: string;
  namaSekolah: string;
  tahun: number;
  jumlahSiswa: number;
  stage: "PHOTOSHOOT" | "LAYOUTING" | "PROOFING" | "PRINTING" | "DELIVERY";
  progress: number;
  deadline: string;
};

const initialOrders: ProductionOrder[] = [
  {
    id: "1",
    namaSekolah: "SMA Negeri 1 Jakarta",
    tahun: 2025,
    jumlahSiswa: 320,
    stage: "PROOFING",
    progress: 75,
    deadline: "15 Oct 2025",
  },
  {
    id: "2",
    namaSekolah: "SMA Labschool Kebayoran",
    tahun: 2025,
    jumlahSiswa: 280,
    stage: "LAYOUTING",
    progress: 45,
    deadline: "01 Nov 2025",
  },
  {
    id: "3",
    namaSekolah: "SMA Taruna Nusantara",
    tahun: 2025,
    jumlahSiswa: 450,
    stage: "PRINTING",
    progress: 90,
    deadline: "20 Sep 2025",
  },
  {
    id: "4",
    namaSekolah: "SMAN 8 Jakarta",
    tahun: 2025,
    jumlahSiswa: 360,
    stage: "PHOTOSHOOT",
    progress: 20,
    deadline: "10 Dec 2025",
  },
];

const STAGES = [
  { key: "PHOTOSHOOT", label: "Pemotretan", icon: Camera, color: "bg-blue-500" },
  { key: "LAYOUTING", label: "Desain & Layout", icon: FileEdit, color: "bg-indigo-500" },
  { key: "PROOFING", label: "Persetujuan Proofing", icon: Clock, color: "bg-amber-500" },
  { key: "PRINTING", label: "Proses Cetak", icon: Printer, color: "bg-purple-500" },
  { key: "DELIVERY", label: "Pengiriman & Flipbook", icon: Truck, color: "bg-emerald-500" },
];

export function ProductionTracker() {
  const [orders, setOrders] = useState<ProductionOrder[]>(initialOrders);

  const handleStageChange = (id: string, newStage: ProductionOrder["stage"]) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === id) {
          let progress = 20;
          if (newStage === "LAYOUTING") progress = 45;
          if (newStage === "PROOFING") progress = 75;
          if (newStage === "PRINTING") progress = 90;
          if (newStage === "DELIVERY") progress = 100;
          return { ...o, stage: newStage, progress };
        }
        return o;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Status Alur Produksi Buku Tahunan</h2>
          <p className="text-sm text-slate-500">Pantau tahapan pengerjaan buku sekolah dari Pemotretan hingga Pengiriman.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {STAGES.map((stage) => {
          const stageOrders = orders.filter((o) => o.stage === stage.key);
          const StageIcon = stage.icon;

          return (
            <div key={stage.key} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-md ${stage.color} text-white`}>
                    <StageIcon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{stage.label}</span>
                </div>
                <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-700">
                  {stageOrders.length}
                </span>
              </div>

              <div className="space-y-3">
                {stageOrders.map((order) => (
                  <div key={order.id} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-all hover:shadow-md">
                    <h4 className="font-bold text-slate-800 text-sm">{order.namaSekolah}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{order.jumlahSiswa} Siswa • Angkatan {order.tahun}</p>

                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-1">
                        <span>Progres</span>
                        <span>{order.progress}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
                          style={{ width: `${order.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-slate-400 border-t pt-2">
                      <span>Deadline: {order.deadline}</span>
                    </div>

                    <div className="mt-2 pt-1">
                      <select
                        value={order.stage}
                        onChange={(e) => handleStageChange(order.id, e.target.value as ProductionOrder["stage"])}
                        className="w-full rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700 font-medium focus:outline-none"
                      >
                        {STAGES.map((s) => (
                          <option key={s.key} value={s.key}>
                            Pindah ke: {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}

                {stageOrders.length === 0 && (
                  <div className="rounded-lg border border-dashed border-slate-200 p-4 text-center text-xs text-slate-400">
                    Tidak ada proyek di tahap ini
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
