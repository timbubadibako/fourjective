"use client";

import { BookOpen, Lock, Layers, Activity } from "lucide-react";
import { Portfolio } from "@/services/api";

export function OverviewCards({ portfolios }: { portfolios: Portfolio[] }) {
  const totalPortfolios = portfolios.length;
  const protectedPortfolios = portfolios.filter(
    (p) => p.password && p.password.trim() !== ""
  ).length;

  const totalImages = portfolios.reduce((acc, p) => {
    try {
      const parsed = typeof p.images === "string" ? JSON.parse(p.images) : p.images;
      return acc + (Array.isArray(parsed) ? parsed.length : 0);
    } catch (e) {
      return acc;
    }
  }, 0);

  const metrics = [
    {
      label: "Total Portofolio",
      value: totalPortfolios,
      caption: "Katalog sekolah terbit",
      icon: BookOpen,
    },
    {
      label: "Terproteksi Password",
      value: protectedPortfolios,
      caption: "Akses terbatas sekolah",
      icon: Lock,
    },
    {
      label: "Halaman Flipbook 3D",
      value: totalImages,
      caption: "File gambar terkonversi",
      icon: Layers,
    },
    {
      label: "Proyek Produksi",
      value: "4 Sekolah",
      caption: "Dalam alur pengerjaan",
      icon: Activity,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((m, i) => {
        const Icon = m.icon;
        return (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{m.label}</p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{m.value}</h3>
              <p className="mt-1 text-xs text-slate-400">{m.caption}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-100 bg-slate-50 text-slate-700">
              <Icon className="h-4 w-4" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
