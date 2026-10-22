"use client";

import { DashboardSidebar } from "../components/dashboard/DashboardSidebar";
import withAuth from "@/lib/withAuth";
import { HardDrive, ShieldCheck, Sparkles } from "lucide-react";

export default withAuth(function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-[#F5F3EF]">
      {/* Fixed-width Sidebar Column */}
      <DashboardSidebar />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col min-h-screen overflow-x-hidden">
        {/* Header Bar matching Image 1 Cloud Dock */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-dark/10 bg-[#FAF6F0]/90 px-6 backdrop-blur-md">
          {/* Left: Breadcrumb & Title */}
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-orange animate-pulse"></span>
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-dark/50 font-bold uppercase tracking-wider">
                <span>Dashboard</span>
                <span>/</span>
                <span className="text-orange">Direktori Sekolah</span>
              </div>
            </div>
          </div>

          {/* Right: Storage Quota Bar (matching Image 1 Cloud Dock) */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 bg-white border border-dark/10 rounded-full px-4 py-1.5 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-dark/70">
                <HardDrive className="w-3.5 h-3.5 text-orange" />
                <span>Cloud Storage</span>
              </div>
              <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange rounded-full" style={{ width: "48%" }} />
              </div>
              <span className="text-[10px] font-mono font-bold text-dark/60">
                48.5 GB / 100 GB
              </span>
            </div>

            <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-mono font-bold text-dark border border-dark/10 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Dev SQLite Synced</span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">{children}</div>
      </main>
    </div>
  );
});
