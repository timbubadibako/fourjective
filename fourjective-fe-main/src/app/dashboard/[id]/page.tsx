"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CardTitle, Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Edit, X } from "lucide-react";
import { Portfolio, getDataById, updateDataById } from "@/services/api";

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

export default function PortfolioDetail() {
  const router = useRouter();
  const { id } = useParams();
  const [token, setToken] = useState<string>("");
  const [data, setData] = useState<Portfolio | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [requiresPassword, setRequiresPassword] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<Portfolio>>({});
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [pdfFile, setpdfFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [password, setPassword] = useState("");
  const [removePassword, setRemovePassword] = useState(false);

  const formatDate = (dateString: string | null | undefined) => {
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
    const jam = String(date.getHours()).padStart(2, "0");
    const menit = String(date.getMinutes()).padStart(2, "0");
    const detik = String(date.getSeconds()).padStart(2, "0");

    return `${tanggal} ${namaBulan} ${tahun}, ${jam}:${menit}:${detik}`;
  };

  useEffect(() => {
    if (!id) return;
    const tokenData = localStorage.getItem("jwtToken") || "";
    setToken(tokenData);
    setIsFetchingData(true);

    getDataById(id as string, tokenData)
      .then((portfolio) => {
        setData(portfolio);
        setFormData(portfolio);
      })
      .catch((_) => {
        setRequiresPassword(true);
      })
      .finally(() => {
        setIsFetchingData(false);
      });
  }, [id]);

  const handleVerifyPassword = async () => {
    setIsVerifying(true);
    try {
      const res = await fetch(
        `https://api.fourjectiv.com/api/portfolios/${id}/view`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: inputPassword }),
        },
      );

      if (!res.ok) throw new Error("Password salah atau akses ditolak");

      const portfolio = await res.json();
      setData(portfolio);
      setFormData(portfolio);
      setRequiresPassword(false);
      setError(null);
      setShowErrorModal(false);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
      setShowErrorModal(true);
    } finally {
      setIsVerifying(false);
    }
  };

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
      if (type === "cover") {
        // Validasi untuk cover: harus image (PNG, JPG, JPEG)
        if (!file.type.startsWith("image/")) {
          setError("Cover harus berupa gambar (PNG, JPG, atau JPEG)");
          setShowErrorModal(true);
          return;
        }
      } else if (type === "pdf") {
        // Validasi untuk PDF: harus PDF
        if (file.type !== "application/pdf") {
          setError("File harus berupa PDF");
          setShowErrorModal(true);
          return;
        }
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
    if (type === "cover") setCoverFile(file);
    if (type === "pdf") setpdfFile(file);
  };

  const handleSave = async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    setUploadProgress(0);

    const updatedData = new FormData();

    if (formData.namaSekolah)
      updatedData.append("namaSekolah", formData.namaSekolah);
    if (formData.tahun) updatedData.append("tahun", formData.tahun.toString());

    if (removePassword) {
      updatedData.append("removePassword", "true");
    } else if (password) {
      updatedData.append("password", password);
    }

    if (coverFile) updatedData.append("cover", coverFile);
    if (pdfFile) updatedData.append("pdf", pdfFile);

    try {
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

        xhr.open("PUT", `https://api.fourjectiv.com/api/portfolios/${id}`);
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        xhr.send(updatedData);
      });

      // Refresh data dari server untuk memastikan data terbaru (termasuk images hasil konversi)
      const refreshedData = await getDataById(id as string, token);
      setData(refreshedData);
      setFormData(refreshedData);

      // Reset file inputs
      setCoverFile(null);
      setpdfFile(null);
      setPassword("");
      setRemovePassword(false);
      setUploadProgress(0);

      setEditMode(false);
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

  const handleBack = () => {
    router.back();
    setTimeout(() => router.refresh(), 100);
  };

  const handlePrevImage = () => {
    if (!data?.images || data.images.length === 0) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? data.images.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    if (!data?.images || data.images.length === 0) return;
    setCurrentImageIndex((prev) =>
      prev === data.images.length - 1 ? 0 : prev + 1,
    );
  };

  if (requiresPassword)
    return (
      <section className="flex h-screen items-center justify-center bg-black/50">
        <Card className="w-[400px] p-6">
          <CardHeader>
            <CardTitle>Masukkan Password</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Label>Password Portofolio</Label>
            <Input
              type="password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              placeholder="Masukkan password"
            />
            <Button
              onClick={handleVerifyPassword}
              disabled={isVerifying || !inputPassword}
            >
              {isVerifying ? "Memverifikasi..." : "Kirim"}
            </Button>
          </CardContent>
        </Card>
      </section>
    );

  if (!data)
    return (
      <section className="flex h-full flex-col p-6">
        <Card className="flex-grow">
          <CardContent className="flex h-full flex-col items-center justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Memuat detail portfolio...</p>
          </CardContent>
        </Card>
      </section>
    );

  return (
    <section className="flex h-full flex-col p-6">
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
          <Button onClick={editMode ? () => setEditMode(false) : handleBack}>
            <ArrowLeft />
          </Button>
        </CardContent>

        <CardHeader className="w-full">
          <CardTitle>Portfolio #{id}</CardTitle>
        </CardHeader>

        <CardContent className="w-full">
          {editMode ? (
            <form className="flex flex-col gap-4">
              {isLoading && (
                <div className="rounded-md bg-blue-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-blue-700">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-700 border-t-transparent"></div>
                    <span>Sedang mengupdate file, mohon tunggu...</span>
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

              <Label>
                Nama Sekolah <span className="text-red-500">*</span>
              </Label>
              <Input
                name="namaSekolah"
                value={formData.namaSekolah || ""}
                onChange={handleInputChange}
                required
              />

              <Label>
                Tahun <span className="text-red-500">*</span>
              </Label>
              <Input
                name="tahun"
                type="number"
                value={formData.tahun?.toString() || ""}
                onChange={handleInputChange}
                required
              />

              <div className="flex flex-col gap-2">
                <Label>Password (Opsional - untuk ganti password)</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Kosongkan jika tidak ingin mengubah password"
                  disabled={removePassword}
                />

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="removePassword"
                    checked={removePassword}
                    onChange={(e) => {
                      setRemovePassword(e.target.checked);
                      if (e.target.checked) setPassword("");
                    }}
                    className="h-4 w-4"
                  />
                  <label htmlFor="removePassword" className="text-sm">
                    Hapus password dari portfolio ini
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Cover (PNG/JPG/JPEG)</Label>
                {data?.cover && !coverFile && (
                  <div className="rounded-md border p-3">
                    <p className="mb-2 text-sm text-gray-600">File saat ini:</p>
                    <a
                      href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${data.cover}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {data.cover}
                    </a>
                  </div>
                )}
                <Input
                  type="file"
                  accept="image/png,image/jpg,image/jpeg"
                  onChange={(e) => handleFileChange(e, "cover")}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Maksimal ukuran file: {FILE_SIZE_LIMITS.COVER} MB
                </p>
                {coverFile && (
                  <p className="text-sm text-green-600">
                    File baru dipilih: {coverFile.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label>Image (PDF saja)</Label>
                {data?.pdf && !pdfFile && (
                  <div className="rounded-md border p-3">
                    <p className="mb-2 text-sm text-gray-600">File saat ini:</p>
                    <a
                      href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${data.pdf}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {data.pdf}
                    </a>
                  </div>
                )}
                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => handleFileChange(e, "pdf")}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Maksimal ukuran file: {FILE_SIZE_LIMITS.PDF} MB
                </p>
                {pdfFile && (
                  <p className="text-sm text-green-600">
                    File baru dipilih: {pdfFile.name}
                  </p>
                )}
              </div>

              <Button
                variant="secondary"
                onClick={() => setEditMode(false)}
                disabled={isLoading}
              >
                Batal
              </Button>
              <Button type="button" onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Menyimpan..." : "Simpan"}
              </Button>
            </form>
          ) : (
            <div className="flex flex-col gap-4">
              <Button onClick={() => setEditMode(true)} className="w-fit">
                <Edit /> Edit
              </Button>

              <div className="flex flex-col gap-2">
                <p>
                  <strong>ID:</strong> {data.id}
                </p>
                <p>
                  <strong>Nama Sekolah:</strong> {data.namaSekolah}
                </p>
                <p>
                  <strong>Tahun:</strong> {data.tahun}
                </p>
                <p>
                  <strong>Nama Akun:</strong> {data.namaAkun}
                </p>
                <p>
                  <strong>Tanggal Dibuat:</strong>{" "}
                  {formatDate(data.tanggalCreate)}
                </p>

                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <strong>Cover:</strong>
                    {data.cover ? (
                      <img
                        src={`https://api.fourjectiv.com/uploads/${data.cover}`}
                        alt={`${data.namaSekolah} - Cover`}
                        className="h-[600px] w-[500px] rounded-lg object-contain"
                      />
                    ) : (
                      <p>No Cover</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <strong>Images ({data.images?.length || 0} gambar):</strong>
                    {data.images && data.images.length > 0 ? (
                      <div className="relative">
                        <img
                          src={`https://api.fourjectiv.com/uploads/${data.images[currentImageIndex]}`}
                          alt={`${data.namaSekolah} - ${currentImageIndex + 1}`}
                          className="h-[600px] w-[500px] object-contain"
                        />

                        {/* Navigation buttons */}
                        {data.images.length > 1 && (
                          <>
                            <button
                              onClick={handlePrevImage}
                              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                              aria-label="Previous image"
                            >
                              ‹
                            </button>
                            <button
                              onClick={handleNextImage}
                              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                              aria-label="Next image"
                            >
                              ›
                            </button>

                            {/* Image counter */}
                            <div className="mt-2 text-center text-sm text-gray-600">
                              {currentImageIndex + 1} / {data.images.length}
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <p>No Images</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
