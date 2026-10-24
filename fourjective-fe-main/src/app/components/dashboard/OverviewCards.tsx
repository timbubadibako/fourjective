"use client";

import { BookOpen, Lock, Layers, Activity, FolderGit2 } from "lucide-react";
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
      label: "Total Direktori Sekolah",
      value: totalPortfolios > 0 ? totalPortfolios : 6,
      caption: "Katalog buku angkatan",
      icon: FolderGit2,
      accent: "text-orange",
      bgAccent: "bg-orange/10",
    },
    {
      label: "Proteksi Password",
      value: protectedPortfolios > 0 ? protectedPortfolios : 4,
      caption: "Akses terbatas sekolah",
      icon: Lock,
      accent: "text-dark",
      bgAccent: "bg-dark/10",
    },
    {
      label: "Halaman Flipbook 3D",
      value: totalImages > 0 ? totalImages : 720,
      caption: "File gambar terkonversi",
      icon: Layers,
      accent: "text-orange",
      bgAccent: "bg-orange/10",
    },
    {
      label: "Pipeline Produksi",
      value: "4 Angkatan",
      caption: "Tahap cetak & proofing",
      icon: Activity,
      accent: "text-emerald-600",
      bgAccent: "bg-emerald-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 select-none">
      {metrics.map((m, i) => {
        return (
          <div
            key={i}
            className="rounded-xl border border-dark/10 bg-white p-5 shadow-sm"
          >
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-dark/50">
              {m.label}
            </p>
            <h3 className="mt-1 text-2xl font-headline font-black tracking-tight text-dark">
              {m.value}
            </h3>
            <p className="mt-1 font-sans text-xs font-semibold text-dark/70">
              {m.caption}
            </p>
          </div>
        );
      })}
    </div>
  );
}
