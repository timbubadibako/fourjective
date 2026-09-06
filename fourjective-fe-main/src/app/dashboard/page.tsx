"use client";

import { CardTitle, Card, CardContent, CardHeader } from "@/components/ui/card";
import { columns } from "../components/dashboard/DashboardColumn";
import { DashboardTable } from "../components/dashboard/DashboardTable";
import { OverviewCards } from "../components/dashboard/OverviewCards";
import { ProductionTracker } from "../components/dashboard/ProductionTracker";
import { QuotationEstimator } from "../components/dashboard/QuotationEstimator";
import { CmsSandbox } from "../components/dashboard/CmsSandbox";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Plus, Search, BookOpen, Clock, Calculator, Layout } from "lucide-react";
import { getAllData, Portfolio } from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<Portfolio[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"portfolios" | "pipeline" | "quotation" | "cms">("portfolios");

  useEffect(() => {
    setIsLoading(true);
    getAllData()
      .then((data) => setData(data))
      .catch((err) => console.error(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  // Filter data based on search query
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

  // Navigate to Create Page Handle
  const handleCreatePortfolio = () => {
    router.push("/dashboard/create-portfolio");
  };

  return (
    <div className="flex h-full flex-col space-y-6">
      {/* Overview Metric Cards */}
      <OverviewCards portfolios={data} />

      {/* Tabs Navigation */}
      <div className="flex items-center space-x-2 border-b border-slate-200/80 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab("portfolios")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
            activeTab === "portfolios"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
              : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          Katalog Portofolio ({data.length})
        </button>

        <button
          onClick={() => setActiveTab("pipeline")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
            activeTab === "pipeline"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
              : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
          }`}
        >
          <Clock className="h-4 w-4" />
          Status Alur Produksi (Pipeline)
        </button>

        <button
          onClick={() => setActiveTab("quotation")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
            activeTab === "quotation"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
              : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
          }`}
        >
          <Calculator className="h-4 w-4" />
          Kalkulator Penawaran Paket
        </button>

        <button
          onClick={() => setActiveTab("cms")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
            activeTab === "cms"
              ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
              : "bg-white text-purple-700 border border-purple-200 hover:bg-purple-50"
          }`}
        >
          <Layout className="h-4 w-4" />
          CMS Halaman Depan & Sandbox
        </button>
      </div>

      {/* Tab 1: Portfolios Management */}
      {activeTab === "portfolios" && (
        <Card className="flex-grow shadow-sm border-slate-200/80 rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-slate-900">Manajemen Portofolio Sekolah</CardTitle>
                <p className="text-xs text-slate-500 mt-1">Kelola data buku tahunan, password proteksi, dan hasil konversi PDF flipbook.</p>
              </div>

              <Button
                className="bg-blue-600 text-white hover:bg-blue-700 font-bold text-xs"
                onClick={handleCreatePortfolio}
              >
                <Plus size={18} className="mr-1" />
                Tambah Portofolio Baru
              </Button>
            </div>

            {/* Search Bar */}
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Cari berdasarkan nama sekolah atau nama akun..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-xs"
              />
            </div>
          </CardHeader>

          <CardContent className="w-full">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                <p className="mt-4 text-xs font-medium text-gray-600">Memuat data portfolio...</p>
              </div>
            ) : (
              <DashboardTable columns={columns} data={filteredData} />
            )}
          </CardContent>
        </Card>
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
