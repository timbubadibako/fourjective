"use client";

import { useState } from "react";
import { Camera, FileEdit, Clock, Printer, Truck } from "lucide-react";

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
    deadline: "15 Okt 2025",
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
    deadline: "10 Des 2025",
  },
];

const STAGES = [
  { key: "PHOTOSHOOT", label: "Pemotretan", icon: Camera },
  { key: "LAYOUTING", label: "Desain Layout", icon: FileEdit },
  { key: "PROOFING", label: "Proofing Klien", icon: Clock },
  { key: "PRINTING", label: "Proses Cetak", icon: Printer },
  { key: "DELIVERY", label: "Pengiriman", icon: Truck },
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
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-bold text-slate-900">Alur Produksi Buku Tahunan</h2>
        <p className="text-xs text-slate-500">Status pengerjaan fisik & digital per sekolah.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {STAGES.map((stage) => {
          const stageOrders = orders.filter((o) => o.stage === stage.key);
          const StageIcon = stage.icon;

          return (
            <div key={stage.key} className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
              <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <StageIcon className="h-4 w-4 text-slate-600" />
                  <span className="text-xs font-bold text-slate-800">{stage.label}</span>
                </div>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600">
                  {stageOrders.length}
                </span>
              </div>

              <div className="space-y-2.5">
                {stageOrders.map((order) => (
                  <div key={order.id} className="rounded-lg border border-slate-200/80 bg-slate-50/50 p-3">
                    <h4 className="font-bold text-slate-900 text-xs">{order.namaSekolah}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{order.jumlahSiswa} Siswa • {order.tahun}</p>

                    <div className="mt-2.5">
                      <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 mb-1">
                        <span>Progres</span>
                        <span>{order.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                        <div
                          className="h-full bg-slate-900 transition-all duration-300"
                          style={{ width: `${order.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-200/60 pt-2">
                      <span>Target: {order.deadline}</span>
                    </div>

                    <select
                      value={order.stage}
                      onChange={(e) => handleStageChange(order.id, e.target.value as ProductionOrder["stage"])}
                      className="mt-2 w-full rounded border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-700 focus:outline-none"
                    >
                      {STAGES.map((s) => (
                        <option key={s.key} value={s.key}>
                          Pindah: {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                {stageOrders.length === 0 && (
                  <div className="rounded-lg border border-dashed border-slate-200 p-3 text-center text-[11px] text-slate-400">
                    Kosong
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
