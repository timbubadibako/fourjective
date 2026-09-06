"use client";

import { useEffect, useState, useCallback } from "react";

export type Portfolio = {
  id: number | string;
  namaSekolah: string;
  tahun: number;
  cover: string | null;
  images: string[];
  namaAkun?: string;
  tanggalCreate?: string;
  password?: string | null;
  image?: string | null; // convenience: first image or cover
};

export default function useGetAllPortfolios() {
  const [data, setData] = useState<Portfolio[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const fetchPortfolios = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const base = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
      const url = `${base.replace(/\/$/, "")}/api/portfolios`;

      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch portfolios: ${res.status}`);
      }

      const json = await res.json();

      // Map response to Portfolio[] and add convenience `image` field
      const mapped: Portfolio[] = (json || []).map((p: any) => ({
        id: p.id,
        namaSekolah: p.namaSekolah,
        tahun: p.tahun,
        cover: p.cover ?? null,
        images: Array.isArray(p.images) ? p.images : [],
        namaAkun: p.namaAkun,
        tanggalCreate: p.tanggalCreate,
        password: p.password,
        image: p.cover ?? (Array.isArray(p.images) && p.images[0]) ?? null,
      }));

      setData(mapped);
    } catch (err) {
      setError(err);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  return { data, isLoading, error, refetch: fetchPortfolios };
}
