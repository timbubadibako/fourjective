"use client";

import { CardTitle, Card, CardContent, CardHeader } from "@/components/ui/card";
import { columns } from "../components/dashboard/DashboardColumn";
import { DashboardTable } from "../components/dashboard/DashboardTable";
import { OverviewCards } from "../components/dashboard/OverviewCards";
import { ProductionTracker } from "../components/dashboard/ProductionTracker";
import { QuotationEstimator } from "../components/dashboard/QuotationEstimator";
import { CmsSandbox } from "../components/dashboard/CmsSandbox";
import { SchoolFolderCard } from "../components/dashboard/SchoolFolderCard";
import { MOUProjectManager } from "../components/dashboard/MOUProjectManager";
import { ProspectOrdersManager } from "../components/dashboard/ProspectOrdersManager";
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const router = useRouter();
  const [data, setData] = useState<Portfolio[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"mou" | "portfolios" | "prospects" | "quotation">("mou");
  const [viewMode, setViewMode] = useState<"split" | "folders" | "table">("split");

  useEffect(() => {
    setIsLoading(true);
    getAllData()
      .then((data) => setData(data))
      .catch((err) => console.error(err.message))
      .finally(() => setIsLoading(false));
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
      {/* Overview Metric Cards with Fourjective Aesthetic */}
      <OverviewCards portfolios={data} />

      {/* Main Tabs Navigation */}
      <div className="flex items-center space-x-2 border-b border-dark/10 pb-3 overflow-x-auto select-none">
        <button
          onClick={() => setActiveTab("mou")}
          className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-mono font-bold transition-colors cursor-pointer ${
            activeTab === "mou"
              ? "bg-dark text-white"
              : "bg-white text-dark/70 border border-dark/10 hover:bg-[#FAF6F0]"
          }`}
        >
          <Sparkles className="h-3.5 w-3.5 text-orange" />
          <span>Proyek MOU &amp; Token</span>
        </button>

        <button
          onClick={() => setActiveTab("portfolios")}
          className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-mono font-bold transition-colors cursor-pointer ${
            activeTab === "portfolios"
              ? "bg-dark text-white"
              : "bg-white text-dark/70 border border-dark/10 hover:bg-[#FAF6F0]"
          }`}
        >
          <BookOpen className="h-3.5 w-3.5" />
          <span>Katalog Portofolio ({data.length > 0 ? data.length : displayFolders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("prospects")}
          className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-mono font-bold transition-colors cursor-pointer ${
            activeTab === "prospects"
              ? "bg-dark text-white"
              : "bg-white text-dark/70 border border-dark/10 hover:bg-[#FAF6F0]"
          }`}
        >
          <Inbox className="h-3.5 w-3.5" />
          <span>Permohonan Masuk</span>
        </button>

        <button
          onClick={() => setActiveTab("quotation")}
          className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-mono font-bold transition-colors cursor-pointer ${
            activeTab === "quotation"
              ? "bg-dark text-white"
              : "bg-white text-dark/70 border border-dark/10 hover:bg-[#FAF6F0]"
          }`}
        >
          <Calculator className="h-3.5 w-3.5" />
          <span>Kalkulator Kas HPP</span>
        </button>
      </div>

      {/* Tab 1: Angkatan MOU & Tracker (Supabase Live) */}
      {activeTab === "mou" && <MOUProjectManager />}

      {/* Tab 2: Portfolios Management & Tactile Folder Dock */}
      {activeTab === "portfolios" && (
        <div className="space-y-6">
          {/* Top Control Bar: Search, View Mode & Add Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-dark/10 p-4 rounded-xl shadow-sm">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-dark/40" />
              <Input
                type="text"
                placeholder="Cari nama sekolah atau tahun..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-xs rounded-lg border-dark/15 focus:border-orange h-9 bg-[#FAF6F0]"
              />
            </div>

            {/* Controls: View Switcher & Create Button */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
              {/* View Mode Switcher */}
              <div className="flex items-center bg-[#FAF6F0] p-1 rounded-lg border border-dark/10 text-xs font-mono font-bold">
                <button
                  type="button"
                  onClick={() => setViewMode("split")}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    viewMode === "split"
                      ? "bg-white text-dark shadow-sm"
                      : "text-dark/50 hover:text-dark"
                  }`}
                >
                  Semua
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("folders")}
                  className={`px-2.5 py-1 rounded flex items-center gap-1 transition-colors cursor-pointer ${
                    viewMode === "folders"
                      ? "bg-white text-dark shadow-sm"
                      : "text-dark/50 hover:text-dark"
                  }`}
                >
                  <Folder className="w-3 h-3" />
                  <span>Folder</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("table")}
                  className={`px-2.5 py-1 rounded flex items-center gap-1 transition-colors cursor-pointer ${
                    viewMode === "table"
                      ? "bg-white text-dark shadow-sm"
                      : "text-dark/50 hover:text-dark"
                  }`}
                >
                  <TableIcon className="w-3 h-3" />
                  <span>Tabel</span>
                </button>
              </div>

              {/* Add New Button */}
              <Button
                onClick={handleCreatePortfolio}
                className="bg-orange hover:bg-orange/90 text-white font-mono font-bold text-xs h-9 px-3.5 rounded-lg cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                <Plus size={14} />
                <span>Tambah Buku</span>
              </Button>
            </div>
          </div>

          {/* FOLDER VIEW */}
          {(viewMode === "split" || viewMode === "folders") && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-headline font-bold text-base text-dark tracking-tight uppercase flex items-center gap-2">
                    <Folder className="w-4 h-4 text-orange" />
                    <span>Direktori Folder ({filteredFolders.length})</span>
                  </h3>
                </div>
              </div>

              {/* Grid of Tactile Folder Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFolders.map((folder, idx) => (
                  <SchoolFolderCard
                    key={folder.folderName + idx}
                    folderName={folder.folderName}
                    year={folder.year}
                    studentCount={folder.studentCount}
                    pageCount={folder.pageCount}
                    fileSize={folder.fileSize}
                    isLocked={folder.isLocked}
                    theme={folder.theme}
                    portfolio={folder.portfolio}
                  />
                ))}
              </div>
            </div>
          )}

          {/* TABLE VIEW */}
          {(viewMode === "split" || viewMode === "table") && (
            <div className="space-y-3 pt-2">
              <h3 className="font-headline font-bold text-base text-dark tracking-tight uppercase flex items-center gap-2">
                <TableIcon className="w-4 h-4 text-dark/70" />
                <span>Tabel Data Lengkap</span>
              </h3>
              <div className="rounded-xl border border-dark/10 bg-white p-4 shadow-sm">
                <DashboardTable columns={columns} data={filteredData} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Permohonan Penawaran Masuk (Live Supabase) */}
      {activeTab === "prospects" && <ProspectOrdersManager />}

      {/* Tab 4: Quotation Price Estimator HPP */}
      {activeTab === "quotation" && <QuotationEstimator />}
    </div>
  );
}
