"use client";

import { useState, useEffect, useRef } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import Image from "next/image";
import { PageFlip } from "page-flip";

import { Portfolio } from "../../../hooks/useGetAllPortfolios";

type SchoolData = Portfolio & {
  image: string | null;
};

export default function Carousel({
  searchQuery,
  currentPage,
  setCurrentPage,
  portfolios,
}: {
  searchQuery: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  portfolios?: Portfolio[] | null;
}) {
  const [schoolData, setSchoolData] = useState<SchoolData[]>([]);
  const [selectedId, setSelectedId] = useState<number | string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [tempSelectedId, setTempSelectedId] = useState<number | string | null>(
    null,
  );
  const [portfolioDetail, setPortfolioDetail] = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<any>(null);
  const [verifiedPasswords, setVerifiedPasswords] = useState<
    Record<string, string>
  >({});

  console.log(selectedId, portfolioDetail);

  useEffect(() => {
    if (Array.isArray(portfolios)) {
      const mapped = portfolios.map((p) => ({
        ...p,
        image: p.image ?? p.cover,
      }));
      setSchoolData(mapped as SchoolData[]);
    }
  }, [portfolios]);

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth > 768);
      setIsLargeScreen(window.innerWidth > 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [portfolioDetail]);

  // Fetch portfolio detail when selectedId changes
  useEffect(() => {
    if (!selectedId) {
      setPortfolioDetail(null);
      return;
    }

    const fetchPortfolio = async () => {
      setDetailLoading(true);
      setDetailError(null);

      try {
        const base = process.env.NEXT_PUBLIC_BACKEND_URL || "";
        const url = `${base.replace(/\/$/, "")}/api/portfolios/${selectedId}/view`;

        // Use verified password if exists, otherwise empty
        const password = verifiedPasswords[selectedId.toString()] || "";

        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        });

        if (!res.ok) {
          throw new Error("Failed to load portfolio");
        }

        const data = await res.json();
        setPortfolioDetail(data);
      } catch (err) {
        setDetailError(err);
        setPortfolioDetail(null);
      } finally {
        setDetailLoading(false);
      }
    };

    fetchPortfolio();
  }, [selectedId, verifiedPasswords]);

  const pageFlipRef = useRef<PageFlip | null>(null);

  useEffect(() => {
    const bookElement = document.getElementById("book");
    if (!bookElement) return;

    if (
      selectedId &&
      portfolioDetail &&
      portfolioDetail.images &&
      portfolioDetail.images.length > 0
    ) {
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      let bookHeight, pageWidth;

      if (isFullscreen) {
        if (viewportWidth < 768) {
          bookHeight = viewportHeight * 0.98;
          pageWidth = viewportWidth * 0.95;
        } else {
          bookHeight = viewportHeight * 0.98;
          const bookWidth = bookHeight * 1.6;
          pageWidth = bookWidth / 2;
        }
      } else if (viewportWidth < 768) {
        bookHeight = viewportHeight * 0.7;
        pageWidth = viewportWidth * 0.85;
      } else if (viewportWidth < 1024) {
        bookHeight = viewportHeight * 0.8;
        const bookWidth = bookHeight * 1.2;
        pageWidth = bookWidth / 2;
      } else {
        bookHeight = viewportHeight * 0.9;
        const bookWidth = bookHeight * 1.4;
        pageWidth = bookWidth / 2;
      }

      const pageFlip = new PageFlip(bookElement, {
        width: pageWidth,
        height: bookHeight,
        showCover: true,
        startPage: 0,
        drawShadow: true,
        flippingTime: 1000,
        usePortrait: viewportWidth < 768, // Portrait for mobile, landscape for larger screens
        startZIndex: 0,
        autoSize: false,
        maxShadowOpacity: 0.5,
        mobileScrollSupport: viewportWidth < 768,
      });

      // load pages from .my-page elements
      pageFlip.loadFromHTML(document.querySelectorAll(".my-page"));
      pageFlipRef.current = pageFlip;

      return () => {
        try {
          pageFlip.destroy();
        } catch (e) {
          // ignore
        }
        pageFlipRef.current = null;
      };
    }
  }, [selectedId, portfolioDetail, isMediumScreen, isLargeScreen]);

  const filteredData = schoolData.filter((school) =>
    school.namaSekolah.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const itemsPerPage = isLargeScreen ? 16 : 12;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setCurrentPage(page);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#D3A1FD",
      },
    },
  });

  const openGallery = async (id: number | string) => {
    // Try to fetch without password first
    try {
      const base = process.env.NEXT_PUBLIC_BACKEND_URL || "";
      const url = `${base.replace(/\/$/, "")}/api/portfolios/${id}/view`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: "" }),
      });

      if (res.ok) {
        // No password required or empty password works
        setSelectedId(id);
      } else if (res.status === 401 || res.status === 403) {
        // Password required
        setTempSelectedId(id);
        setShowPasswordModal(true);
        setPasswordError("");
        setPasswordInput("");
      } else {
        throw new Error("Failed to load portfolio");
      }
    } catch (err) {
      console.error("Error opening gallery:", err);
    }
  };

  const closeGallery = () => {
    if (isFullscreen) {
      exitFullscreen();
    }
    setSelectedId(null);
    setCurrentImageIndex(0);
  };

  const handleVerifyPassword = async () => {
    if (!tempSelectedId) return;

    setIsVerifying(true);
    setPasswordError("");

    try {
      const base = process.env.NEXT_PUBLIC_BACKEND_URL || "";
      const url = `${base.replace(/\/$/, "")}/api/portfolios/${tempSelectedId}/view`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: passwordInput }),
      });

      if (res.ok) {
        // Password correct - save it and open portfolio
        setVerifiedPasswords((prev) => ({
          ...prev,
          [tempSelectedId.toString()]: passwordInput,
        }));
        setSelectedId(tempSelectedId);
        setShowPasswordModal(false);
        setPasswordInput("");
        setTempSelectedId(null);
      } else {
        setPasswordError("Password salah. Silakan coba lagi.");
      }
    } catch (err) {
      setPasswordError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsVerifying(false);
    }
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordInput("");
    setPasswordError("");
    setTempSelectedId(null);
  };

  const toggleFullscreen = () => {
    const modalElement = document.getElementById("portfolio-modal");
    if (!modalElement) return;

    if (!isFullscreen) {
      if (modalElement.requestFullscreen) {
        modalElement.requestFullscreen();
      } else if ((modalElement as any).webkitRequestFullscreen) {
        (modalElement as any).webkitRequestFullscreen();
      } else if ((modalElement as any).msRequestFullscreen) {
        (modalElement as any).msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      exitFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
    setIsFullscreen(false);
  };

  const prevImage = () => {
    if (!portfolioDetail?.images?.length) return;
    if (pageFlipRef.current) {
      try {
        pageFlipRef.current.flipPrev();
        return;
      } catch (e) {}
    }
    setCurrentImageIndex(
      (i) =>
        (i - 1 + portfolioDetail.images.length) % portfolioDetail.images.length,
    );
  };

  const nextImage = () => {
    if (!portfolioDetail?.images?.length) return;
    if (pageFlipRef.current) {
      try {
        pageFlipRef.current.flipNext();
        return;
      } catch (e) {}
    }
    setCurrentImageIndex((i) => (i + 1) % portfolioDetail.images.length);
  };

  return (
    <div className="mt-12 w-full px-4 md:px-12 lg:px-16">
      <div className="mb-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-8">
        {currentData.map((item) => (
          <div
            key={item.id}
            className="flex cursor-pointer flex-col rounded-lg border-4 border-black bg-white p-5 text-center shadow-lg transition-colors duration-500 hover:bg-[#D3A1FD] lg:border-[6px]"
            onClick={() => openGallery(item.id)}
          >
            <Image
              src={
                item.cover
                  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${item.cover}`
                  : "/images/portofolio/image.jpg"
              }
              alt={item.namaSekolah}
              width={200}
              height={200}
              className="mb-4 h-full w-full rounded-lg object-cover"
            />
            <h3 className="pb-4 text-sm font-bold lg:text-base">
              {item.namaSekolah}
            </h3>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center space-x-2">
        <ThemeProvider theme={theme}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            siblingCount={isLargeScreen ? 1 : 0}
            sx={{
              "& .MuiPaginationItem-root": {
                border: "none",
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                border: "3px solid black",
                color: "white",
              },
              "& .MuiPaginationItem-root.Mui-selected:hover": {
                backgroundColor: "#D3A1FD",
              },
              "& .MuiPaginationItem-previousNext": {
                border: "3px solid #000",
                backgroundColor: "#f5f5f5",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
              },
            }}
          />
        </ThemeProvider>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-bold">
              Portfolio Memerlukan Password
            </h2>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">Password</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && passwordInput) {
                    handleVerifyPassword();
                  }
                }}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Masukkan password"
                autoFocus
              />
            </div>

            {passwordError && (
              <p className="mb-4 text-sm text-red-500">{passwordError}</p>
            )}

            <div className="flex gap-2">
              <button
                onClick={closePasswordModal}
                className="flex-1 rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
                disabled={isVerifying}
              >
                Batal
              </button>
              <button
                onClick={handleVerifyPassword}
                disabled={!passwordInput || isVerifying}
                className="flex-1 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-300"
              >
                {isVerifying ? "Memverifikasi..." : "Kirim"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal gallery */}
      {selectedId && (
        <div
          id="portfolio-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
        >
          <button
            onClick={closeGallery}
            className="absolute right-4 top-4 z-[60] rounded-full bg-red-500 px-3 py-1 text-white hover:bg-red-700"
          >
            Close
          </button>

          <button
            onClick={toggleFullscreen}
            className="absolute right-24 top-4 z-[60] rounded-full bg-blue-500 px-3 py-1 text-white hover:bg-blue-700"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            )}
          </button>

          <div className="relative max-h-[90vh] w-full max-w-4xl">
            {detailLoading && (
              <div className="flex h-80 w-full flex-col items-center justify-center text-white">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
                <p className="mt-4 text-lg">Memuat gambar...</p>
              </div>
            )}

            {detailError && (
              <div className="flex h-80 w-full items-center justify-center text-white">
                Failed to load images
              </div>
            )}

            {portfolioDetail?.images && portfolioDetail.images.length > 0 && (
              <div className="flex items-center justify-center">
                <button
                  onClick={prevImage}
                  className="mx-2 rounded-full bg-white/20 p-2 text-white hover:bg-white/30"
                  aria-label="Previous page"
                >
                  ‹
                </button>

                <div className="flex-1">
                  <div className="flex h-[80vh] items-center justify-center">
                    <div id="book" className="w-full max-w-3xl">
                      {/* Front Cover - Use cover field */}
                      {portfolioDetail.cover && (
                        <div className="my-page cover" data-density="hard">
                          <img
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${portfolioDetail.cover}`}
                            alt={`${portfolioDetail.namaSekolah} - Cover`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}

                      {/* Portfolio Pages (all images from images array) */}
                      {portfolioDetail.images.map(
                        (img: string, idx: number) => (
                          <div key={idx} className="my-page">
                            <img
                              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${img}`}
                              alt={`${portfolioDetail.namaSekolah} - ${idx + 2}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ),
                      )}

                      {/* Back Cover - White */}
                      <div className="my-page cover" data-density="hard">
                        <div className="h-full w-full bg-white"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={nextImage}
                  className="mx-2 rounded-full bg-white/20 p-2 text-white hover:bg-white/30"
                  aria-label="Next page"
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
