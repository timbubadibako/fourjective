"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2, ShieldCheck, Lock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Portfolio, deleteDataById } from "@/services/api";

export const columns: ColumnDef<Portfolio>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="font-mono text-xs text-slate-500">#{row.original.id}</span>,
  },
  {
    accessorKey: "namaSekolah",
    header: "Nama Sekolah",
    cell: ({ row }) => (
      <div>
        <p className="font-bold text-slate-800 text-sm">{row.original.namaSekolah}</p>
        <p className="text-[11px] text-slate-400">Angkatan {row.original.tahun}</p>
      </div>
    ),
  },
  {
    accessorKey: "password",
    header: "Akses & Status",
    cell: ({ row }) => {
      const hasPassword = row.original.password && row.original.password.trim() !== "";
      return hasPassword ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 border border-amber-200/60">
          <Lock className="h-3 w-3" /> Password Kunci
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200/60">
          <Globe className="h-3 w-3" /> Akses Publik
        </span>
      );
    },
  },
  {
    accessorKey: "images",
    header: "Jumlah Halaman",
    cell: ({ row }) => {
      const imagesRaw = row.original.images;
      let pageCount = 0;
      if (Array.isArray(imagesRaw)) {
        pageCount = imagesRaw.length;
      } else if (typeof imagesRaw === "string") {
        try {
          const parsed = JSON.parse(imagesRaw);
          if (Array.isArray(parsed)) pageCount = parsed.length;
        } catch (e) {}
      }
      return (
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
          {pageCount} Halaman 3D
        </span>
      );
    },
  },
  {
    accessorKey: "namaAkun",
    header: "Dibuat Oleh",
    cell: ({ row }) => <span className="text-xs font-medium text-slate-600">{row.original.namaAkun || "Admin"}</span>,
  },
  {
    accessorKey: "tanggalCreate",
    header: "Tanggal Dibuat",
    cell: ({ row }) => {
      const dateString = row.original.tanggalCreate;
      if (!dateString) return <span className="text-xs text-slate-400">-</span>;

      const date = new Date(dateString);
      const bulan = [
        "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
        "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
      ];

      return (
        <span className="text-xs font-medium text-slate-600">
          {date.getDate()} {bulan[date.getMonth()]} {date.getFullYear()}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Aksi</div>,
    cell: ({ row }) => {
      const router = useRouter();
      const [isDeleting, setIsDeleting] = useState(false);
      const [showDeleteModal, setShowDeleteModal] = useState(false);
      const [token, setToken] = useState<string>("");

      useEffect(() => {
        const tokenData = localStorage.getItem("jwtToken") || "";
        setToken(tokenData);
      }, []);

      const handleView = () => {
        router.push(`/dashboard/${row.original.id}`);
      };

      const handleDelete = async () => {
        setIsDeleting(true);
        try {
          await deleteDataById(row.original.id, token);
          window.location.reload();
        } catch (error) {
          console.error(error);
          alert("An error occurred while deleting the portfolio.");
        } finally {
          setIsDeleting(false);
          setShowDeleteModal(false);
        }
      };

      return (
        <>
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleView}
              className="h-8 gap-1 border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Eye className="h-3.5 w-3.5" />
              Detail
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDeleteModal(true)}
              disabled={isDeleting}
              className="h-8 gap-1 text-xs font-semibold"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Hapus
            </Button>
          </div>

          {showDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
              <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100">
                <h2 className="mb-2 text-lg font-extrabold text-slate-900">
                  Konfirmasi Hapus Portofolio
                </h2>
                <p className="mb-6 text-sm text-slate-600 leading-relaxed">
                  Apakah Anda yakin ingin menghapus portofolio{" "}
                  <strong className="text-slate-900">{row.original.namaSekolah}</strong>? Seluruh file gambar halaman hasil konversi PDF di server juga akan dihapus secara permanen.
                </p>

                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteModal(false)}
                    disabled={isDeleting}
                  >
                    Batal
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Menghapus..." : "Hapus Permanen"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      );
    },
  },
];
