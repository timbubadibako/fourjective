"use client";

import { CardTitle, Card, CardContent, CardHeader } from "@/components/ui/card";
import { columns } from "../components/dashboard/DashboardColumn";
import { DashboardTable } from "../components/dashboard/DashboardTable";
import { OverviewCards } from "../components/dashboard/OverviewCards";
import { ProductionTracker } from "../components/dashboard/ProductionTracker";
import { QuotationEstimator } from "../components/dashboard/QuotationEstimator";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Plus, Search, BookOpen, Clock, Calculator } from "lucide-react";
import { getAllData, Portfolio } from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<Portfolio[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"portfolios" | "pipeline" | "quotation">("portfolios");

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
    <div className="flex h-full flex-col p-6 space-y-6 bg-slate-50/50 min-h-screen">
      {/* Overview Metric Cards */}
      <OverviewCards portfolios={data} />

      {/* Tabs Navigation */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("portfolios")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
            activeTab === "portfolios"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          Katalog Portofolio ({data.length})
        </button>

        <button
          onClick={() => setActiveTab("pipeline")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
            activeTab === "pipeline"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Clock className="h-4 w-4" />
          Status Alur Produksi (Pipeline)
        </button>

        <button
          onClick={() => setActiveTab("quotation")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
            activeTab === "quotation"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Calculator className="h-4 w-4" />
          Kalkulator Penawaran Paket
        </button>
      </div>

      {/* Tab 1: Portfolios Management */}
      {activeTab === "portfolios" && (
        <Card className="flex-grow shadow-sm border-slate-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-slate-800">Manajemen Portofolio Sekolah</CardTitle>
                <p className="text-xs text-slate-500 mt-1">Kelola data buku tahunan, password proteksi, dan hasil konversi PDF flipbook.</p>
              </div>

              <Button
                className="bg-blue-600 text-white hover:bg-blue-700 font-semibold"
                onClick={handleCreatePortfolio}
              >
                <Plus size={20} className="mr-1" />
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
                className="pl-10"
              />
            </div>
          </CardHeader>

          <CardContent className="w-full">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                <p className="mt-4 text-gray-600">Memuat data portfolio...</p>
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
    </div>
  );
}
