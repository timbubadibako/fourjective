"use client";

import { DashboardSidebar } from "../components/dashboard/DashboardSidebar";
import withAuth from "@/lib/withAuth";

export default withAuth(function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-slate-50/50">
      {/* Fixed-width Sidebar Column */}
      <DashboardSidebar />

      {/* Main Content Area filling the remaining width */}
      <main className="flex-1 min-w-0 flex flex-col min-h-screen overflow-x-hidden">
        {/* Header Bar */}
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/95 px-6 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Fourjective Agency Backpanel & CMS Sandbox
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600 border border-blue-100">
              Dev Mode (SQLite)
            </span>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 p-6">{children}</div>
      </main>
    </div>
  );
});
