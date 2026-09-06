"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SearchBar from "./SearchBar";
import Carousel from "./Carousel";
import Star from "../../../../public/images/star.svg";
import useGetAllPortfolios from "../../../hooks/useGetAllPortfolios";

export default function Hero() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: portfolios, isLoading, error } = useGetAllPortfolios();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const resetSearch = () => {
    setSearchQuery("");
  };

  const handleReset = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <section className="flex w-full flex-col items-center bg-[#FF6E00] pb-12 pt-32 md:pt-64">
      <Image
        src={Star}
        alt="Star"
        className="absolute left-12 top-24 w-12 animate-spin md:left-16 md:top-48"
        style={{ animationDuration: "2.5s" }}
      />
      <div className="mb-12 w-full text-center md:px-16">
        <h1
          className="font-lexendZetta text-2xl font-extrabold text-white md:text-8xl"
          style={{
            WebkitTextStroke: isLargeScreen ? "8px black" : "4px black",
            paintOrder: "stroke fill",
            lineHeight: isLargeScreen ? "1.0" : "1.5",
          }}
        >
          OUR RESULTS
        </h1>
        <div className="flex w-full items-center gap-5 pt-2 md:gap-8 md:pb-6 md:pt-8">
          <div className="h-1 w-full bg-black md:h-2"></div>
          <h2
            className="font-lexendZetta whitespace-nowrap text-base font-bold text-white md:text-5xl"
            style={{
              WebkitTextStroke: isLargeScreen ? "8px black" : "2px black",
              paintOrder: "stroke fill",
              lineHeight: isLargeScreen ? "1.0" : "1.5",
            }}
          >
            FOURJECTIV PORTFOLIO
          </h2>
          <div className="h-1 w-full bg-black md:h-2"></div>
        </div>
      </div>
      <SearchBar
        onSearch={handleSearch}
        onReset={resetSearch}
        searchQuery={searchQuery}
      />
      <Carousel
        searchQuery={searchQuery}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        portfolios={portfolios}
      />
    </section>
  );
}
