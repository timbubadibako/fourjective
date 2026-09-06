"use client";

import { useEffect, useState, useCallback } from "react";

export type PortfolioDetail = {
  id: number | string;
  namaSekolah: string;
  tahun: number;
  cover: string | null;
  images: string[];
  namaAkun?: string;
  tanggalCreate?: string;
  password?: string | null;
};

export default function useGetPortfolioById(id?: number | string | null) {
  const [data, setData] = useState<PortfolioDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const fetchOnce = async (forId: number | string) => {
    setIsLoading(true);
    setError(null);
    try {
      const base = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
      const url = `${base.replace(/\/$/, "")}/api/portfolios/${forId}/view`;

      // send password in request body as JSON (hardcoded per request)
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ password: "rifqi" }),
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch portfolio: ${res.status}`);
      }

      const json = await res.json();
      setData(json || null);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof id === "undefined" || id === null) {
      setData(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    // fire-and-forget
    void fetchOnce(id);
  }, [id]);

  // Expose a refetch that will fetch again for the current id
  const refetch = async () => {
    if (typeof id === "undefined" || id === null) return;
    await fetchOnce(id);
  };

  return { data, isLoading, error, refetch };
}
