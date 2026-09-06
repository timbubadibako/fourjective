"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  Sparkles,
  ExternalLink,
  LogOut,
  Database,
} from "lucide-react";

export function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    router.push("/login");
  };

  const navBackpanel = [
    {
      title: "Dashboard & Katalog",
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
      url: "/services",
      icon: Sparkles,
    },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 bg-white flex flex-col h-screen sticky top-0">
      {/* Sidebar Header */}
      <div className="border-b border-slate-100 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white font-bold text-sm tracking-tight shadow-sm">
            4J
          </div>
          <div className="overflow-hidden">
            <h1 className="text-xs font-bold text-slate-900 tracking-tight truncate uppercase">Fourjective Studio</h1>
            <p className="text-[10px] text-slate-400 truncate">Agency Backpanel & CMS</p>
          </div>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className="flex-1 overflow-y-auto px-3.5 py-5 space-y-6">
        {/* Backpanel Group */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">
            Menu Backpanel
          </p>
          <nav className="space-y-1">
            {navBackpanel.map((item) => (
              <a
                key={item.title}
                href={item.url}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                  item.active
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <item.icon className={`h-4 w-4 shrink-0 ${item.active ? "text-white" : "text-slate-400"}`} />
                <span>{item.title}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Public Links Group */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">
            Preview Publik
          </p>
          <nav className="space-y-1">
            {navPublic.map((item) => (
              <a
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 shrink-0 text-slate-400" />
                  <span>{item.title}</span>
                </div>
                <ExternalLink className="h-3 w-3 text-slate-300" />
              </a>
            ))}
          </nav>
        </div>

        {/* System Status Box */}
        <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3">
          <div className="flex items-center gap-2 text-slate-700 font-bold text-[11px]">
            <Database className="h-3.5 w-3.5 text-slate-500 shrink-0" />
            <span>SQLite Connected</span>
          </div>
          <p className="mt-1 text-[10px] text-slate-400 leading-relaxed">
            Local Dev Server • Auth Bypass Active
          </p>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="border-t border-slate-100 p-3.5 bg-slate-50/30">
        <div className="mb-2.5 flex items-center gap-3 px-1">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 font-bold text-slate-700 text-[10px]">
            AD
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold text-slate-800 truncate">Admin Fourjective</p>
            <p className="text-[10px] text-slate-400 truncate">admin@fourjective.com</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900"
        >
          <LogOut className="h-3.5 w-3.5 shrink-0 text-slate-500" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
