"use client";

import { useRouter } from "next/navigation";
import { Home, LogOut, Plus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Sidebar Menu Item
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
];

export function DashboardSidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    router.push("/login");
  };

  return (
    <Sidebar variant="sidebar">
      {/* Sidebar Header */}
      <SidebarHeader className="p-4">
        <h1 className="text-xl font-bold">Fourjectiv</h1>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        {/* Sidebar Group */}
        <SidebarGroup>
          {/* Group Label */}
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>

          {/* Group Content */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="mb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="flex items-center justify-center bg-red-600 hover:bg-red-700"
            >
              <LogOut className="text-white" />
              <span className="font-semibold text-white">Log Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
