"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Sparkles,
  BookOpen,
  Inbox,
  Calculator,
  PlusCircle,
  ExternalLink,
  LogOut,
  FolderGit2,
} from "lucide-react";

interface AdminSidebarProps {
  activeTab?: string;
  onTabChange?: (tab: "mou" | "portfolios" | "prospects" | "quotation") => void;
}

export function DashboardSidebar({ activeTab = "mou", onTabChange }: AdminSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/admin-logout", { method: "POST" });
    } catch (e) {}
    localStorage.removeItem("jwtToken");
    router.push("/portal");
  };

  const navItems: Array<{
    key: "mou" | "portfolios" | "prospects" | "quotation";
    title: string;
    icon: any;
  }> = [
    {
      key: "mou",
      title: "Proyek MOU & Token",
      icon: Sparkles,
    },
    {
      key: "portfolios",
      title: "Katalog Portofolio",
      icon: BookOpen,
    },
    {
      key: "prospects",
      title: "Permohonan Masuk",
      icon: Inbox,
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
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange text-white font-headline font-black text-base shadow-[2px_2px_0px_#000] border border-white/20">
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
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    if (pathname !== "/dashboard") {
                      router.push("/dashboard");
                    } else if (onTabChange) {
                      onTabChange(item.key);
                    }
                  }}
                  className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                    isActive && pathname === "/dashboard"
                      ? "bg-orange text-white shadow-md shadow-orange/20"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="font-headline">{item.title}</span>
                  </div>
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
              href="/dashboard/create-portfolio"
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold transition-colors ${
                pathname === "/dashboard/create-portfolio"
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <PlusCircle className="h-4 w-4 text-orange" />
              <span>Upload Buku Baru</span>
            </a>
            <a
              href="/portofolio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold text-white/70 hover:bg-white/5 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="h-4 w-4 text-white/40" />
                <span>Katalog Publik</span>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-white/30" />
            </a>
            <a
              href="/portal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold text-white/70 hover:bg-white/5 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <FolderGit2 className="h-4 w-4 text-white/40" />
                <span>Portal Siswa</span>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-white/30" />
            </a>
          </nav>
        </div>
      </div>

      {/* Admin Profile & Logout */}
      <div className="border-t border-white/10 p-4 bg-[#0E0F13]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-orange text-white flex items-center justify-center font-headline font-black text-xs">
              AD
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate font-headline">
                Admin Studio
              </div>
              <div className="text-[10px] font-mono text-emerald-400">
                ● Master Live
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Keluar Sesi Admin"
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
