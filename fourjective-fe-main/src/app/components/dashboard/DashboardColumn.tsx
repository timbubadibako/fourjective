"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Portfolio, deleteDataById } from "@/services/api";

export const columns: ColumnDef<Portfolio>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "namaSekolah",
    header: "Nama Sekolah",
  },
  {
    accessorKey: "tahun",
    header: "Tahun",
  },
  {
    accessorKey: "cover",
    header: "Cover",
  },
  {
    accessorKey: "images",
    header: "Jumlah Images",
    cell: ({ row }) => {
      const images = row.original.images;
      return <div>{images?.length || 0} halaman</div>;
    },
  },
  {
    accessorKey: "namaAkun",
    header: "Nama Akun",
  },
  {
    accessorKey: "tanggalCreate",
    header: "Tanggal Dibuat",
    cell: ({ row }) => {
      const dateString = row.original.tanggalCreate;
      if (!dateString) return "-";

      const date = new Date(dateString);
      const bulan = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];

      const tanggal = date.getDate();
      const namaBulan = bulan[date.getMonth()];
      const tahun = date.getFullYear();

      return `${tanggal} ${namaBulan} ${tahun}`;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      const router = useRouter();
      const [isDeleting, setIsDeleting] = useState(false);
      const [showDeleteModal, setShowDeleteModal] = useState(false);
      const [token, setToken] = useState<string>("");

      useEffect(() => {
        const tokenData = localStorage.getItem("jwtToken") || "{}";
        setToken(tokenData);
      }, []);

      // View Handle
      const handleView = () => {
        router.push(`/dashboard/${row.original.id}`);
      };

      // Delete Handle
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

      // JSX Return
      return (
        <>
          <div className="flex justify-center gap-2">
            {/* View */}
            <Button variant="outline" size="icon" onClick={handleView}>
              <Eye />
            </Button>

            {/* Delete */}
            <Button
              variant="destructive"
              size="icon"
              onClick={() => setShowDeleteModal(true)}
              disabled={isDeleting}
            >
              <Trash2 />
            </Button>
          </div>

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                <h2 className="mb-4 text-xl font-bold text-gray-900">
                  Konfirmasi Hapus
                </h2>
                <p className="mb-6 text-gray-600">
                  Apakah Anda yakin ingin menghapus portfolio{" "}
                  <strong>{row.original.namaSekolah}</strong>?
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
                    {isDeleting ? "Menghapus..." : "Hapus"}
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
