"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "../components/dashboard/DashboardSidebar";
import withAuth from "@/lib/withAuth";

export default withAuth(function DashboardLayout({
// export default (function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen">
      <SidebarProvider>
        <div className="grid w-full lg:grid-cols-[auto_1fr]">
          <DashboardSidebar />
          <main className="flex h-screen flex-col overflow-auto">
            <SidebarTrigger />
            {children}
          </main>
        </div>
      </SidebarProvider>
    </section>
  );
});
