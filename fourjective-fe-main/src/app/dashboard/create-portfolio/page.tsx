"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, BookPlus, UploadCloud, X, AlertCircle } from "lucide-react";

const BASE_URL = (
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.fourjectiv.com"
).replace(/\/$/, "");

// File size limits in MB
const FILE_SIZE_LIMITS = {
  COVER: 250,
  PDF: 250,
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
      if (type === "cover" && !file.type.startsWith("image/")) {
        setError("Cover harus berupa file gambar (PNG/JPG/JPEG)");
        setShowErrorModal(true);
        return;
      }
      if (type === "pdf" && file.type !== "application/pdf") {
        setError("File image harus berupa file PDF");
        setShowErrorModal(true);
        return;
      }

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
        e.target.value = "";
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

        xhr.open("POST", `${BASE_URL}/api/portfolios`);
        if (token) {
          xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        }
        xhr.send(newData);
      });

      router.push("/dashboard?tab=portfolios");
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
    <div className="flex h-full flex-col space-y-6">
      {/* Modal Error */}
      {showErrorModal && error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-md rounded-2xl border-2 border-dark bg-white p-6 shadow-[4px_4px_0px_#14161C]">
            <button
              onClick={() => {
                setShowErrorModal(false);
                setError(null);
              }}
              className="absolute right-4 top-4 text-dark/50 hover:text-dark cursor-pointer transition-colors"
            >
              <X size={20} />
            </button>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 border border-red-300">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-red-600">
                  Terjadi Kesalahan
                </span>
                <h3 className="font-headline font-black text-lg text-dark">
                  Upload Gagal
                </h3>
              </div>
            </div>
            <p className="mb-6 whitespace-pre-line font-mono text-xs text-dark/70 leading-relaxed">
              {error}
            </p>
            <button
              onClick={() => {
                setShowErrorModal(false);
                setError(null);
              }}
              className="w-full bg-dark hover:bg-dark/90 text-white font-headline font-black text-xs uppercase tracking-wider py-2.5 rounded-xl transition-all cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Header Card Putih */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-dark/15 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-dark/15 bg-[#FAF6F0] text-dark hover:bg-dark hover:text-white transition-all cursor-pointer"
            title="Kembali"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-orange">
              Portofolio Buku
            </span>
            <h1 className="font-headline font-black text-2xl text-dark">
              Tambah Buku Baru
            </h1>
            <p className="font-sans text-xs font-semibold text-dark/70 mt-0.5">
              Daftarkan katalog buku tahunan baru ke direktori studio Fourjective.
            </p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white border border-dark/15 rounded-2xl p-6 shadow-sm">
        {isLoading && (
          <div className="mb-6 rounded-xl border border-orange/20 bg-orange/5 p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-orange border-t-transparent" />
              <span className="font-mono text-xs font-bold text-orange">
                Sedang mengunggah file portofolio, mohon tunggu...
              </span>
            </div>
            {uploadProgress > 0 && (
              <div className="mt-3">
                <div className="mb-1 flex justify-between font-mono text-xs text-dark/70">
                  <span className="font-bold uppercase tracking-wider">
                    Progress Upload
                  </span>
                  <span className="font-bold text-orange">{uploadProgress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-dark/10">
                  <div
                    className="h-full bg-orange transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
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
          className="space-y-5"
        >
          {/* Field: Nama Sekolah */}
          <div className="space-y-1.5">
            <label className="block font-mono text-[11px] font-bold uppercase text-dark/70">
              Nama Sekolah <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="namaSekolah"
              value={formData.namaSekolah}
              onChange={handleInputChange}
              required
              placeholder="Contoh: SMA Negeri 1 Jakarta"
              className="w-full bg-[#FAF6F0] border-2 border-dark/20 focus:border-orange rounded-xl font-mono text-xs font-bold px-3.5 py-2.5 text-dark outline-none transition-colors"
            />
          </div>

          {/* Field: Tahun */}
          <div className="space-y-1.5">
            <label className="block font-mono text-[11px] font-bold uppercase text-dark/70">
              Tahun <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="tahun"
              value={formData.tahun}
              onChange={handleInputChange}
              required
              placeholder="Contoh: 2026"
              className="w-full bg-[#FAF6F0] border-2 border-dark/20 focus:border-orange rounded-xl font-mono text-xs font-bold px-3.5 py-2.5 text-dark outline-none transition-colors"
            />
          </div>

          {/* Field: Password */}
          <div className="space-y-1.5">
            <label className="block font-mono text-[11px] font-bold uppercase text-dark/70">
              Password Portofolio (Opsional)
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Kosongkan jika buku bisa diakses bebas tanpa sandi"
              className="w-full bg-[#FAF6F0] border-2 border-dark/20 focus:border-orange rounded-xl font-mono text-xs font-bold px-3.5 py-2.5 text-dark outline-none transition-colors"
            />
            <p className="font-mono text-[10px] text-dark/50">
              Jika diisi, tamu wajib memasukkan password ini untuk membuka PDF.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            {/* Field: Cover */}
            <div className="space-y-1.5">
              <label className="block font-mono text-[11px] font-bold uppercase text-dark/70">
                Cover (PNG/JPG/JPEG) <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="image/png,image/jpg,image/jpeg"
                onChange={(e) => handleFileChange(e, "cover")}
                required
                className="w-full bg-[#FAF6F0] border-2 border-dark/20 focus:border-orange rounded-xl font-mono text-xs font-bold px-3.5 py-2 text-dark file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-dark file:text-white file:font-mono file:text-[10px] file:font-bold file:uppercase cursor-pointer"
              />
              <p className="font-mono text-[10px] text-dark/50">
                Maksimal ukuran file: {FILE_SIZE_LIMITS.COVER} MB
              </p>
            </div>

            {/* Field: PDF */}
            <div className="space-y-1.5">
              <label className="block font-mono text-[11px] font-bold uppercase text-dark/70">
                File Buku PDF <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileChange(e, "pdf")}
                required
                className="w-full bg-[#FAF6F0] border-2 border-dark/20 focus:border-orange rounded-xl font-mono text-xs font-bold px-3.5 py-2 text-dark file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-dark file:text-white file:font-mono file:text-[10px] file:font-bold file:uppercase cursor-pointer"
              />
              <p className="font-mono text-[10px] text-dark/50">
                Maksimal ukuran file: {FILE_SIZE_LIMITS.PDF} MB
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-dark/10">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={isLoading}
              className="px-4 py-2.5 rounded-xl border border-dark/20 bg-white hover:bg-dark/5 text-dark font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white font-headline font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <BookPlus className="h-4 w-4" />
                  <span>Simpan Portofolio</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
