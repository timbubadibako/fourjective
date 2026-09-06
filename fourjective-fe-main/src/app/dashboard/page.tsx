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

  return (
    <div className="flex h-full flex-col space-y-6">
      {/* Overview Metric Cards */}
      <OverviewCards portfolios={data} />

      {/* Clean Minimalist Tabs Navigation */}
      <div className="flex items-center space-x-1.5 border-b border-slate-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab("portfolios")}
          className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
            activeTab === "portfolios"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
          }`}
        >
          <BookOpen className="h-3.5 w-3.5" />
          Katalog Portofolio ({data.length})
        </button>

        <button
          onClick={() => setActiveTab("pipeline")}
          className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
            activeTab === "pipeline"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
          }`}
        >
          <Clock className="h-3.5 w-3.5" />
          Alur Produksi
        </button>

        <button
          onClick={() => setActiveTab("quotation")}
          className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
            activeTab === "quotation"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
          }`}
        >
          <Calculator className="h-3.5 w-3.5" />
          Kalkulator Penawaran
        </button>

        <button
          onClick={() => setActiveTab("cms")}
          className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
            activeTab === "cms"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
          }`}
        >
          <Layout className="h-3.5 w-3.5" />
          CMS Sandbox
        </button>
      </div>

      {/* Tab 1: Portfolios Management */}
      {activeTab === "portfolios" && (
        <Card className="flex-grow shadow-sm border-slate-200 rounded-xl">
          <CardHeader className="p-5 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-slate-900">Manajemen Portofolio Sekolah</CardTitle>
                <p className="text-xs text-slate-500 mt-0.5">Kelola data buku tahunan, password proteksi, dan hasil konversi PDF flipbook.</p>
              </div>

              <Button
                className="bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs"
                onClick={handleCreatePortfolio}
              >
                <Plus size={16} className="mr-1" />
                Tambah Portofolio Baru
              </Button>
            </div>

            {/* Search Bar */}
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Cari berdasarkan nama sekolah atau nama akun..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>
          </CardHeader>

          <CardContent className="w-full p-5">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-900 border-t-transparent"></div>
                <p className="mt-3 text-xs font-medium text-slate-500">Memuat data portfolio...</p>
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
