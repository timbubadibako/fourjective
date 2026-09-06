"use client";

import { BookOpen, ShieldCheck, Layers, Sparkles } from "lucide-react";
import { Portfolio } from "@/services/api";

export function OverviewCards({ portfolios }: { portfolios: Portfolio[] }) {
  const totalPortfolios = portfolios.length;
  const protectedPortfolios = portfolios.filter(p => p.password && p.password.trim() !== "").length;
  const totalImages = portfolios.reduce((acc, p) => {
    try {
      const parsed = typeof p.images === "string" ? JSON.parse(p.images) : p.images;
      return acc + (Array.isArray(parsed) ? parsed.length : 0);
    } catch (e) {
      return acc;
    }
  }, 0);

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Portfolios Card */}
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Portofolio</p>
          <h3 className="mt-1 text-2xl font-extrabold text-slate-800">{totalPortfolios}</h3>
          <p className="mt-1 text-xs text-slate-400">Tersedia di katalog</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <BookOpen className="h-6 w-6" />
        </div>
      </div>

      {/* Protected Portfolios Card */}
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Portofolio Terproteksi</p>
          <h3 className="mt-1 text-2xl font-extrabold text-slate-800">{protectedPortfolios}</h3>
          <p className="mt-1 text-xs text-amber-600 font-medium">Kunci Password Sekolah</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
          <ShieldCheck className="h-6 w-6" />
        </div>
      </div>

      {/* Total Converted Pages Card */}
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Halaman Flipbook</p>
          <h3 className="mt-1 text-2xl font-extrabold text-slate-800">{totalImages}</h3>
          <p className="mt-1 text-xs text-emerald-600 font-medium">Render 3D Pembalik Majalah</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          <Layers className="h-6 w-6" />
        </div>
      </div>

      {/* Production Status Card */}
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Proyek Produksi Aktif</p>
          <h3 className="mt-1 text-2xl font-extrabold text-slate-800">4 Sekolah</h3>
          <p className="mt-1 text-xs text-purple-600 font-medium">Dalam Alur Produksi</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
          <Sparkles className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
