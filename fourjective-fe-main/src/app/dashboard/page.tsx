"use client";

import { CardTitle, Card, CardContent, CardHeader } from "@/components/ui/card";
import { columns } from "../components/dashboard/DashboardColumn";
import { DashboardTable } from "../components/dashboard/DashboardTable";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Plus, Search } from "lucide-react";
import { getAllData, Portfolio } from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const router = useRouter();
  const [data, setData] = useState<Portfolio[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllData()
      .then((data) => setData(data))
      .catch((err) => console.error(err.messsage))
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
    <div className="flex h-full flex-col p-6">
      <Card className="flex-grow">
        {/* Card Header */}
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Welcome to Your Dashboard</CardTitle>

            {/* Create Page Button */}
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
              onClick={handleCreatePortfolio}
            >
              <Plus size={24} />
              Create Portfolio
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

        {/* Card Content */}
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
    </div>
  );
}
