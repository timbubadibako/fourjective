"use client";

import { CardTitle, Card, CardContent, CardHeader } from "@/components/ui/card";
import { columns } from "../components/dashboard/DashboardColumn";
import { DashboardTable } from "../components/dashboard/DashboardTable";
import { OverviewCards } from "../components/dashboard/OverviewCards";
import { ProductionTracker } from "../components/dashboard/ProductionTracker";
import { QuotationEstimator } from "../components/dashboard/QuotationEstimator";
import { CmsSandbox } from "../components/dashboard/CmsSandbox";
import { SchoolFolderCard } from "../components/dashboard/SchoolFolderCard";
import { MOUProjectManager, AdminProject } from "../components/dashboard/MOUProjectManager";
import { ProspectOrdersManager } from "../components/dashboard/ProspectOrdersManager";
import { AdminTimelineScheduler } from "../components/dashboard/AdminTimelineScheduler";
import { ExecutiveCockpit } from "../components/dashboard/ExecutiveCockpit";
import { DeliverableHandoff } from "../components/dashboard/DeliverableHandoff";
import { PortfolioManager } from "../components/dashboard/PortfolioManager";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Plus,
  Search,
  BookOpen,
  Clock,
  Calculator,
  Layout,
  Folder,
  Table as TableIcon,
  Sparkles,
  Layers,
  Filter,
  Inbox,
} from "lucide-react";
import { getAllData, Portfolio } from "@/services/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

const PRESET_FOLDERS: Array<{
  id: number;
  folderName: string;
  year: number;
  studentCount: number;
  pageCount: number;
  fileSize: string;
  isLocked: boolean;
  theme: "orange-liquid" | "amber-fire" | "dark-marble" | "frosted-glass";
  portfolio?: Portfolio;
}> = [
  {
    id: 101,
    folderName: "SMAN 1 Jakarta",
    year: 2025,
    studentCount: 320,
    pageCount: 120,
    fileSize: "2.8 GB",
    isLocked: true,
    theme: "orange-liquid",
  },
  {
    id: 102,
    folderName: "SMA Labschool Kebayoran",
    year: 2025,
    studentCount: 280,
    pageCount: 140,
    fileSize: "3.2 GB",
    isLocked: false,
    theme: "amber-fire",
  },
  {
    id: 103,
    folderName: "SMA Taruna Nusantara",
    year: 2025,
    studentCount: 450,
    pageCount: 160,
    fileSize: "4.1 GB",
    isLocked: true,
    theme: "dark-marble",
  },
  {
    id: 104,
    folderName: "SMAK Petra 1 Surabaya",
    year: 2024,
    studentCount: 240,
    pageCount: 110,
    fileSize: "2.1 GB",
    isLocked: false,
    theme: "frosted-glass",
  },
  {
    id: 105,
    folderName: "MAN 1 Kota Serang",
    year: 2024,
    studentCount: 310,
    pageCount: 130,
    fileSize: "2.9 GB",
    isLocked: true,
    theme: "orange-liquid",
  },
  {
    id: 106,
    folderName: "SMA Mondial Batam",
    year: 2024,
    studentCount: 190,
    pageCount: 96,
    fileSize: "1.9 GB",
    isLocked: false,
    theme: "amber-fire",
  },
];

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-xs font-mono text-dark/40">Memuat dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as
    | "overview"
    | "mou"
    | "handoff"
    | "prospects"
    | "timeline"
    | "portfolios"
    | "quotation"
    | null;
  const [data, setData] = useState<Portfolio[]>([]);
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "mou" | "handoff" | "prospects" | "timeline" | "portfolios" | "quotation"
  >("overview");
  const [viewMode, setViewMode] = useState<"split" | "folders" | "table">("split");

  const fetchAdminProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      if (res.ok) {
        const json = await res.json();
        setProjects(json.projects || []);
      }
    } catch (e) {
      console.error("Gagal load admin projects:", e);
    }
  };

  useEffect(() => {
    fetchAdminProjects();
  }, []);

  useEffect(() => {
    if (
      tabParam &&
      [
        "overview",
        "mou",
        "handoff",
        "prospects",
        "timeline",
        "portfolios",
        "quotation",
      ].includes(tabParam)
    ) {
      setActiveTab(tabParam as any);
    }
  }, [tabParam]);

  const loadPortfolios = () => {
    setIsLoading(true);
    getAllData()
      .then((data) => setData(data))
      .catch((err) => console.error(err.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadPortfolios();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredData(data);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = data.filter(
        (portfolio) =>
          portfolio.namaSekolah.toLowerCase().includes(query) ||
          portfolio.namaAkun.toLowerCase().includes(query),
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, data]);

  const handleCreatePortfolio = () => {
    router.push("/dashboard/create-portfolio");
  };

  // Combine real portfolios with presets for visual folder presentation
  const realFolderItems = data.map((p, idx) => {
    let pageCount = 0;
    try {
      const parsed = typeof p.images === "string" ? JSON.parse(p.images) : p.images;
      if (Array.isArray(parsed)) pageCount = parsed.length;
    } catch (e) {}

    const themes: Array<"orange-liquid" | "amber-fire" | "dark-marble" | "frosted-glass"> = [
      "orange-liquid",
      "amber-fire",
      "dark-marble",
      "frosted-glass",
    ];

    return {
      portfolio: p,
      folderName: p.namaSekolah,
      year: p.tahun,
      studentCount: 250,
      pageCount: pageCount > 0 ? pageCount : 120,
      fileSize: "2.5 GB",
      isLocked: !!(p.password && p.password.trim() !== ""),
      theme: themes[idx % themes.length],
    };
  });

  const displayFolders = realFolderItems.length > 0 ? realFolderItems : PRESET_FOLDERS;
  const filteredFolders = searchQuery.trim()
    ? displayFolders.filter((f) =>
        f.folderName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : displayFolders;

  return (
    <div className="flex h-full flex-col space-y-6">
      {/* Tab 1: Ringkasan Studio (Executive Overview) */}
      {activeTab === "overview" && (
        <ExecutiveCockpit
          projects={projects}
          onNavigateTab={(tab) => router.push(`/dashboard?tab=${tab}`)}
        />
      )}

      {/* Tab 2: Proyek Mitra & Kode Akses (Supabase Live) */}
      {activeTab === "mou" && <MOUProjectManager />}

      {/* Tab 3: Input Berkas Handoff (Cloudflare R2) */}
      {activeTab === "handoff" && (
        <DeliverableHandoff
          projects={projects}
          onRefresh={fetchAdminProjects}
        />
      )}

      {/* Tab 4: Permohonan Masuk (Live Supabase) */}
      {activeTab === "prospects" && <ProspectOrdersManager />}

      {/* Tab 5: Jadwal Produksi 2026 (Live Gantt/Checklist) */}
      {activeTab === "timeline" && <AdminTimelineScheduler />}

      {/* Tab 6: Katalog Portofolio Buku & File Manager (Single Source + Form Ekspansi) */}
      {activeTab === "portfolios" && (
        <PortfolioManager portfolios={data} onRefresh={loadPortfolios} />
      )}

      {/* Tab 3: Permohonan Penawaran Masuk (Live Supabase) */}
      {activeTab === "prospects" && <ProspectOrdersManager />}

      {/* Tab 4: Quotation Price Estimator HPP */}
      {activeTab === "quotation" && <QuotationEstimator />}
    </div>
  );
}
