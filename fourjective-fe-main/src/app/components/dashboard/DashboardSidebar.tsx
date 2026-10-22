"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  Sparkles,
  ExternalLink,
  LogOut,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  Search,
  Zap,
  HardDrive,
} from "lucide-react";

export function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    "2026": true,
    "2025": false,
    "2024": false,
  });

  const toggleFolder = (key: string) => {
    setOpenFolders((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    router.push("/portal");
  };

  const navBackpanel = [
    {
      title: "Dashboard & Direktori",
      url: "/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      title: "Tambah Portofolio Baru",
      url: "/dashboard/create-portfolio",
      icon: PlusCircle,
      active: pathname === "/dashboard/create-portfolio",
    },
  ];

  const navPublic = [
    {
      title: "Katalog Publik 3D",
      url: "/portofolio",
      icon: BookOpen,
    },
    {
      title: "Layanan & Package",
      url: "/paket",
      icon: Sparkles,
    },
  ];

  // Tree directory matching Image 1 Cloud Dock hierarchy
  const schoolTree = [
    {
      year: "2026",
      label: "Angkatan 2026 (Aktif)",
      schools: ["SMAN 1 Jakarta", "SMA Labschool Kebayoran", "SMA Taruna Nusantara"],
    },
    {
      year: "2025",
      label: "Angkatan 2025 (Arsip)",
      schools: ["SMAK Petra 1 Surabaya", "SMAN 5 Samarinda", "SMAN 5 Makassar"],
    },
    {
      year: "2024",
      label: "Angkatan 2024 (Arsip)",
      schools: ["MAN 1 Kota Serang", "SMA Mondial Batam", "SMAN 1 Nabire"],
    },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-[#222530] bg-[#121318] text-white flex flex-col h-screen sticky top-0 select-none">
      {/* Sidebar Header with 4J Brand Mark */}
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
              Cloud Dock & Admin
            </p>
          </div>
        </div>

        {/* Quick Search Bar with ⌘K Badge (matching Image 1) */}
        <div className="mt-3.5 relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
          <input
            type="text"
            placeholder="Cari folder..."
            className="w-full bg-[#1A1C24] border border-white/10 rounded-lg pl-8 pr-8 py-1.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-orange transition-colors"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-white/40 bg-white/5 px-1 py-0.5 rounded border border-white/10">
            ⌘K
          </span>
        </div>
      </div>

      {/* Sidebar Scrollable Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin scrollbar-thumb-white/10">
        {/* Main Menu */}
        <div>
          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/40 mb-2 px-2">
            Menu Utama
          </p>
          <nav className="space-y-1">
            {navBackpanel.map((item) => (
              <a
                key={item.title}
                href={item.url}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                  item.active
                    ? "bg-orange text-white shadow-md shadow-orange/20"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span>{item.title}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Folder Hierarchy Tree (matching Image 1 "Starred Files / UI & UX Design") */}
        <div>
          <div className="flex items-center justify-between mb-2 px-2">
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/40">
              Direktori Folder
            </p>
            <span className="text-[10px] text-orange font-bold font-mono">Arsip</span>
          </div>

          <div className="space-y-1">
            {schoolTree.map((group) => {
              const isOpen = !!openFolders[group.year];
              return (
                <div key={group.year} className="rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleFolder(group.year)}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/5 hover:text-white rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2 truncate">
                      {isOpen ? (
                        <FolderOpen className="w-3.5 h-3.5 text-orange shrink-0" />
                      ) : (
                        <Folder className="w-3.5 h-3.5 text-white/50 shrink-0" />
                      )}
                      <span className="truncate">{group.label}</span>
                    </div>
                    {isOpen ? (
                      <ChevronDown className="w-3 h-3 text-white/40 shrink-0" />
                    ) : (
                      <ChevronRight className="w-3 h-3 text-white/40 shrink-0" />
                    )}
                  </button>

                  {/* Sub-tree links */}
                  {isOpen && (
                    <div className="ml-4 pl-2.5 border-l border-white/10 my-1 space-y-1">
                      {group.schools.map((school) => (
                        <a
                          key={school}
                          href="/dashboard"
                          className="block px-2 py-1 text-[11px] font-medium text-white/60 hover:text-orange hover:bg-white/5 rounded transition-colors truncate"
                        >
                          {school}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Public Links Group */}
        <div>
          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/40 mb-2 px-2">
            Akses Publik
          </p>
          <nav className="space-y-1">
            {navPublic.map((item) => (
              <a
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className="h-4 w-4 shrink-0 text-white/40" />
                  <span>{item.title}</span>
                </div>
                <ExternalLink className="h-3 w-3 text-white/30" />
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom Engine Widget (matching Image 1 Rocket Card) */}
        <div className="rounded-2xl bg-gradient-to-br from-[#1E202B] to-[#14151C] border border-white/10 p-3.5 relative overflow-hidden shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-orange/20 border border-orange/40 flex items-center justify-center text-orange">
              <Zap className="w-4 h-4 fill-orange" />
            </div>
            <div>
              <p className="font-headline font-bold text-xs text-white leading-tight">
                Production Engine
              </p>
              <p className="text-[10px] font-mono text-orange">Online & Synced</p>
            </div>
          </div>
          <p className="text-[10px] text-white/60 font-mono leading-relaxed mb-3">
            Mesin offset Heidelberg & rasterisasi Poppler siap memproses PDF.
          </p>
          <a
            href="/dashboard/create-portfolio"
            className="block text-center bg-orange hover:bg-orange/90 text-white font-mono text-[11px] font-bold py-1.5 rounded-lg border border-white/20 transition-all shadow-sm"
          >
            + Unggah Berkas Baru
          </a>
        </div>
      </div>

      {/* Sidebar Footer with Admin Profile & Logout */}
      <div className="border-t border-white/10 p-3 bg-[#0D0E12]">
        <div className="mb-2.5 flex items-center gap-2.5 px-1">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange font-bold text-white text-[10px] border border-white/20">
            AD
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold text-white truncate font-headline">Admin Fourjective</p>
            <p className="text-[10px] font-mono text-white/40 truncate">admin@fourjective.com</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-white/80 transition-all hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/30 cursor-pointer"
        >
          <LogOut className="h-3.5 w-3.5 shrink-0 text-white/50" />
          <span>Keluar Sesi</span>
        </button>
      </div>
    </aside>
  );
}
