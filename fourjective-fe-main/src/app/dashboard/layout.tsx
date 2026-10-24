"use client";

import { DashboardSidebar } from "../components/dashboard/DashboardSidebar";
import withAuth from "@/lib/withAuth";
import { FolderGit2, ShieldCheck } from "lucide-react";

export default withAuth(function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-[#FAF6F0]">
      {/* Fixed-width Sidebar Column */}
      <DashboardSidebar />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col min-h-screen overflow-x-hidden">
        {/* Clean Header Bar */}
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-zinc-200/80 bg-white/80 px-6 backdrop-blur-md">
          {/* Left: Breadcrumb & Title */}
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-orange"></span>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-dark/50">
              <span className="text-dark/40">Fourjective</span>
              <span className="text-dark/30">/</span>
              <span className="text-dark font-black">Admin Panel</span>
            </div>
          </div>

          {/* Right: Quick Portal Link & DB Status */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-dark/70 border border-dark/15 bg-white">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>PostgreSQL 16 Live</span>
            </span>

            <a
              href="/portal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-dark hover:bg-orange text-white px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors shadow-sm cursor-pointer"
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Portal Siswa</span>
            </a>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">{children}</div>
      </main>
    </div>
  );
});

