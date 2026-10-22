"use client";

import { CardTitle, Card, CardContent, CardHeader } from "@/components/ui/card";
import { columns } from "../components/dashboard/DashboardColumn";
import { DashboardTable } from "../components/dashboard/DashboardTable";
import { OverviewCards } from "../components/dashboard/OverviewCards";
import { ProductionTracker } from "../components/dashboard/ProductionTracker";
import { QuotationEstimator } from "../components/dashboard/QuotationEstimator";
import { CmsSandbox } from "../components/dashboard/CmsSandbox";
import { SchoolFolderCard } from "../components/dashboard/SchoolFolderCard";
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
  const [activeTab, setActiveTab] = useState<"portfolios" | "pipeline" | "quotation" | "cms">("portfolios");
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
          onClick={() => setActiveTab("portfolios")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
            activeTab === "portfolios"
              ? "bg-orange text-white shadow-md shadow-orange/20"
              : "bg-white text-dark/70 border border-dark/10 hover:bg-slate-100"
          }`}
        >
          <BookOpen className="h-3.5 w-3.5" />
          Katalog &amp; Folder Sekolah ({data.length > 0 ? data.length : displayFolders.length})
        </button>

        <button
          onClick={() => setActiveTab("pipeline")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
            activeTab === "pipeline"
              ? "bg-orange text-white shadow-md shadow-orange/20"
              : "bg-white text-dark/70 border border-dark/10 hover:bg-slate-100"
          }`}
        >
          <Clock className="h-3.5 w-3.5" />
          Alur Produksi
        </button>

        <button
          onClick={() => setActiveTab("quotation")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
            activeTab === "quotation"
              ? "bg-orange text-white shadow-md shadow-orange/20"
              : "bg-white text-dark/70 border border-dark/10 hover:bg-slate-100"
          }`}
        >
          <Calculator className="h-3.5 w-3.5" />
          Kalkulator Penawaran
        </button>

        <button
          onClick={() => setActiveTab("cms")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
            activeTab === "cms"
              ? "bg-orange text-white shadow-md shadow-orange/20"
              : "bg-white text-dark/70 border border-dark/10 hover:bg-slate-100"
          }`}
        >
          <Layout className="h-3.5 w-3.5" />
          CMS Sandbox
        </button>
      </div>

      {/* Tab 1: Portfolios Management & Tactile Folder Dock */}
      {activeTab === "portfolios" && (
        <div className="space-y-6">
          {/* Top Control Bar: Search, View Mode & Add Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-dark/10 p-4 sm:p-5 rounded-2xl shadow-sm">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-dark/40" />
              <Input
                type="text"
                placeholder="Cari nama sekolah, angkatan, atau berkas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-xs rounded-xl border-dark/15 focus:border-orange focus:ring-orange/20 h-10"
              />
            </div>

            {/* Controls: View Switcher & Create Button */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
              {/* View Mode Switcher (Folders vs Table vs Split) */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-dark/10 text-xs font-mono font-bold">
                <button
                  type="button"
                  onClick={() => setViewMode("split")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === "split"
                      ? "bg-white text-orange shadow-sm font-black"
                      : "text-dark/60 hover:text-dark"
                  }`}
                  title="Tampilan Gabungan"
                >
                  Semua
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("folders")}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === "folders"
                      ? "bg-white text-orange shadow-sm font-black"
                      : "text-dark/60 hover:text-dark"
                  }`}
                  title="Hanya Grid Folder"
                >
                  <Folder className="w-3 h-3" />
                  <span>Folder</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === "table"
                      ? "bg-white text-orange shadow-sm font-black"
                      : "text-dark/60 hover:text-dark"
                  }`}
                  title="Hanya Tabel Data"
                >
                  <TableIcon className="w-3 h-3" />
                  <span>Tabel</span>
                </button>
              </div>

              {/* Add New Button */}
              <Button
                onClick={handleCreatePortfolio}
                className="bg-orange hover:bg-orange/90 text-white font-bold text-xs h-10 px-4 rounded-xl shadow-md shadow-orange/25 cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                <Plus size={16} />
                <span>Tambah Portofolio</span>
              </Button>
            </div>
          </div>

          {/* ================= FOLDER VIEW (TACTILE CLOUD DOCK FOLDERS) ================= */}
          {(viewMode === "split" || viewMode === "folders") && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-headline font-black text-lg text-dark tracking-tight uppercase flex items-center gap-2">
                    <Folder className="w-4 h-4 text-orange" />
                    <span>Direktori Folder Sekolah ({filteredFolders.length})</span>
                  </h3>
                  <p className="font-mono text-xs text-dark/60">
                    Bentuk folder taktil untuk akses cepat arsip flipbook 3D, password kunci, dan alur cetak.
                  </p>
                </div>
              </div>

              {/* Grid of Tactile Folder Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

          {/* ================= TABLE VIEW (FILE & DOCUMENT LIST) ================= */}
          {(viewMode === "split" || viewMode === "table") && (
            <Card className="flex-grow shadow-sm border-dark/10 rounded-2xl bg-white overflow-hidden">
              <CardHeader className="p-5 border-b border-dark/10 bg-[#FAF6F0]/60">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-headline font-black text-dark tracking-tight uppercase flex items-center gap-2">
                      <TableIcon className="w-4 h-4 text-orange" />
                      <span>Daftar Berkas &amp; Halaman Flipbook 3D</span>
                    </CardTitle>
                    <p className="font-mono text-xs text-dark/60 mt-0.5">
                      Tabel manajemen status enkripsi password, jumlah gambar halaman, dan aksi detail.
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="w-full p-5">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange border-t-transparent"></div>
                    <p className="mt-3 font-mono text-xs font-bold text-dark/60">
                      Memuat data portofolio...
                    </p>
                  </div>
                ) : (
                  <DashboardTable columns={columns} data={filteredData} />
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Tab 2: Production Pipeline Tracker */}
      {activeTab === "pipeline" && <ProductionTracker />}

      {/* Tab 3: Quotation Price Estimator */}
      {activeTab === "quotation" && <QuotationEstimator />}

      {/* Tab 4: CMS Landing Page & Sandbox Manager */}
      {activeTab === "cms" && <CmsSandbox />}
    </div>
  );
}
