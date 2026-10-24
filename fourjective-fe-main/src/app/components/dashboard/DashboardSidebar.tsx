"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Sparkles,
  BookOpen,
  Inbox,
  Calculator,
  PlusCircle,
  ExternalLink,
  LogOut,
  FolderGit2,
  CalendarDays,
  Layout,
} from "lucide-react";

export function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/admin-logout", { method: "POST" });
    } catch (e) {}
    localStorage.removeItem("jwtToken");
    router.push("/portal");
  };

  const navItems: Array<{
    key: "overview" | "mou" | "handoff" | "prospects" | "timeline" | "portfolios" | "quotation";
    title: string;
    icon: any;
    badge?: string;
  }> = [
    {
      key: "overview",
      title: "Ringkasan Studio",
      icon: Layout,
    },
    {
      key: "mou",
      title: "Proyek Sekolah & Token",
      icon: Sparkles,
    },
    {
      key: "handoff",
      title: "Kirim Berkas Akhir",
      icon: FolderGit2,
      badge: "R2",
    },
    {
      key: "prospects",
      title: "Permohonan Masuk",
      icon: Inbox,
    },
    {
      key: "timeline",
      title: "Jadwal Produksi 2026",
      icon: CalendarDays,
    },
    {
      key: "portfolios",
      title: "Tambah Buku",
      icon: BookOpen,
      badge: "Master",
    },
    {
      key: "quotation",
      title: "Kalkulator Kas HPP",
      icon: Calculator,
    },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-[#222530] bg-[#121318] text-white flex flex-col h-screen sticky top-0 select-none">
      {/* Brand Header */}
      <div className="border-b border-white/10 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange text-white font-headline font-black text-base shadow-sm border border-white/20">
            4J
          </div>
          <div className="overflow-hidden">
            <h1 className="text-xs font-black text-white tracking-wider uppercase font-headline">
              FOURJECTIVE
            </h1>
            <p className="text-[10px] text-orange font-mono font-bold tracking-tight">
              Master Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Main Menu Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
        <div>
          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/40 mb-2 px-2">
            Manajemen Inti
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === "/dashboard" && currentTab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    router.push(`/dashboard?tab=${item.key}`);
                  }}
                  className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-orange text-white shadow-md shadow-orange/20"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="font-headline tracking-wide">{item.title}</span>
                  </div>
                  {item.badge && (
                    <span className="font-mono text-[9px] font-black uppercase tracking-wider bg-white/15 px-1.5 py-0.5 rounded text-white/90">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Akses Pintas */}
        <div>
          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/40 mb-2 px-2">
            Tindakan Cepat
          </p>
          <nav className="space-y-1">
            <a
              href="/portofolio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold text-white/70 transition-colors hover:bg-white/5 hover:text-white"
            >
              <div className="flex items-center gap-2.5">
                <ExternalLink className="h-4 w-4 shrink-0" />
                <span className="font-headline">Lihat Portofolio</span>
              </div>
            </a>
          </nav>
        </div>
      </div>

      {/* User / Logout Footer */}
      <div className="border-t border-white/10 p-3">
        <div className="flex items-center justify-between rounded-xl bg-white/5 p-2.5">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange/20 text-orange text-xs font-headline font-black">
              AD
            </div>
            <div className="overflow-hidden">
              <p className="truncate text-xs font-headline font-bold text-white">Studio Admin</p>
              <p className="truncate text-[10px] font-mono text-white/40">Internal Root</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Keluar Akun"
            className="rounded-lg p-1.5 text-white/50 hover:bg-white/10 hover:text-rose-400 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
