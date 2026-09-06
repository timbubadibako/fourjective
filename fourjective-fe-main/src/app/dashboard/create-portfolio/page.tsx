"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CardTitle, Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, X } from "lucide-react";

const BASE_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000").replace(/\/$/, "");

async function createData(newData: FormData) {
  const token = localStorage.getItem("jwtToken");

  const response = await fetch(`${BASE_URL}/api/portfolios`, {
    method: "POST",
    body: newData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create data");
  }

  return response.json();
}

// File size limits in MB
const FILE_SIZE_LIMITS = {
  COVER: 250, // 250MB
  PDF: 250, // 250MB
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

export default function CreatePortfolio() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    namaSekolah: "",
    tahun: "",
    password: "",
  });
  const [cover, setCover] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "cover" | "pdf",
  ) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      // Validasi tipe file
      if (type === "cover" && !file.type.startsWith("image/")) {
        setError("Cover harus berupa file gambar (PNG/JPG/JPEG)");
        setShowErrorModal(true);
        return;
      }
      if (type === "pdf" && file.type !== "application/pdf") {
        setError("Image harus berupa file PDF");
        setShowErrorModal(true);
        return;
      }

      // Validasi ukuran file
      const fileSizeMB = file.size / (1024 * 1024);
      const limit =
        type === "cover" ? FILE_SIZE_LIMITS.COVER : FILE_SIZE_LIMITS.PDF;

      if (fileSizeMB > limit) {
        setError(
          `Ukuran file terlalu besar!\n\n` +
            `File: ${file.name}\n` +
            `Ukuran: ${formatFileSize(file.size)}\n` +
            `Maksimal: ${limit} MB\n\n` +
            `Silakan kompres atau pilih file yang lebih kecil.`,
        );
        setShowErrorModal(true);
        e.target.value = ""; // Reset input
        return;
      }
    }
    setError(null);
    setShowErrorModal(false);

    if (type === "cover") setCover(file);
    if (type === "pdf") setPdf(file);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setUploadProgress(0);

    const newData = new FormData();
    newData.append("namaSekolah", formData.namaSekolah);
    newData.append("tahun", formData.tahun);
    if (formData.password) {
      newData.append("password", formData.password);
    }

    if (cover) newData.append("cover", cover);
    if (pdf) newData.append("pdf", pdf);

    try {
      const token = localStorage.getItem("jwtToken");

      // Menggunakan XMLHttpRequest untuk tracking progress
      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable) {
            const percentComplete = Math.round((e.loaded / e.total) * 100);
            setUploadProgress(percentComplete);
          }
        });

        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.response);
          } else {
            reject(new Error(`Upload gagal dengan status ${xhr.status}`));
          }
        });

        xhr.addEventListener("error", () => {
          reject(new Error("Terjadi kesalahan saat upload"));
        });

        xhr.open("POST", "https://api.fourjectiv.com/api/portfolios");
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        xhr.send(newData);
      });

      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setShowErrorModal(true);
      setUploadProgress(0);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col p-6">
      {/* Modal Error */}
      {showErrorModal && error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-[400px] rounded-lg bg-white p-6 shadow-xl">
            <button
              onClick={() => {
                setShowErrorModal(false);
                setError(null);
              }}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <span className="text-xl text-red-600">✕</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Error</h3>
            </div>
            <p className="mb-6 whitespace-pre-line text-gray-600">{error}</p>
            <Button
              onClick={() => {
                setShowErrorModal(false);
                setError(null);
              }}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              Tutup
            </Button>
          </div>
        </div>
      )}

      <Card className="flex-grow">
        <CardContent className="w-full pb-0 pt-6">
          <Button onClick={() => router.back()}>
            <ArrowLeft />
          </Button>
        </CardContent>

        <CardHeader className="w-full">
          <CardTitle>Create New Portfolio</CardTitle>
        </CardHeader>

        <CardContent className="w-full">
          {isLoading && (
            <div className="mb-4 rounded-md bg-blue-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-blue-700">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-700 border-t-transparent"></div>
                <span>Sedang mengupload file, mohon tunggu...</span>
              </div>
              {uploadProgress > 0 && (
                <div className="mt-3">
                  <div className="mb-1 flex justify-between text-sm text-blue-600">
                    <span>Progress Upload</span>
                    <span className="font-semibold">{uploadProgress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-blue-200">
                    <div
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex flex-col gap-4"
          >
            <Label>
              Nama Sekolah <span className="text-red-500">*</span>
            </Label>
            <Input
              name="namaSekolah"
              value={formData.namaSekolah}
              onChange={handleInputChange}
              required
            />

            <Label>
              Tahun <span className="text-red-500">*</span>
            </Label>
            <Input
              name="tahun"
              type="number"
              value={formData.tahun}
              onChange={handleInputChange}
              required
            />

            <Label>Password (Opsional)</Label>
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Kosongkan jika tidak ingin menggunakan password"
            />

            <Label>
              Cover (PNG/JPG/JPEG) <span className="text-red-500">*</span>
            </Label>
            <Input
              type="file"
              accept="image/png,image/jpg,image/jpeg"
              onChange={(e) => handleFileChange(e, "cover")}
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Maksimal ukuran file: {FILE_SIZE_LIMITS.COVER} MB
            </p>

            <Label>
              Image (pdf) <span className="text-red-500">*</span>
            </Label>
            <Input
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFileChange(e, "pdf")}
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Maksimal ukuran file: {FILE_SIZE_LIMITS.PDF} MB
            </p>

            <Button type="submit" className="mt-4" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
