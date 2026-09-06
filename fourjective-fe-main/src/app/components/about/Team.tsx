"use client";

import React, { useState, useEffect } from "react";
import Model1 from "../../../../public/images/about/model1.png";
import Model2 from "../../../../public/images/about/model2.png";
import Model3 from "../../../../public/images/about/model3.png";
import Model4 from "../../../../public/images/about/model4.png";
import Dropdown from "../../../../public/images/about/dropdown.svg";
import Image from "next/image";

export default function Team() {
  const [activeButton, setActiveButton] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const buttons = ["CEO", "Project Manager", "Manager", "HRD"];
  const slides = [
    [
      { name: "Kasmira Maharani - Manager", image: Model1 },
      { name: "M. Hamzah Nuresa - CEO", image: Model2 },
      { name: "Venny Meilinda - Project Manager", image: Model3 },
      { name: "Nabila Regita - HRD", image: Model4 },
    ],
    [
      { name: "Kasmira Maharani - Manager", image: Model1 },
      { name: "M. Hamzah Nuresa - CEO", image: Model2 },
      { name: "Venny Meilinda - Project Manager", image: Model3 },
      { name: "Nabila Regita - HRD", image: Model4 },
    ],
    [
      { name: "Kasmira Maharani - Manager", image: Model1 },
      { name: "M. Hamzah Nuresa - CEO", image: Model2 },
      { name: "Venny Meilinda - Project Manager", image: Model3 },
      { name: "Nabila Regita - HRD", image: Model4 },
    ],
    [
      { name: "Kasmira Maharani - Manager", image: Model1 },
      { name: "M. Hamzah Nuresa - CEO", image: Model2 },
      { name: "Venny Meilinda - Project Manager", image: Model3 },
      { name: "Nabila Regita - HRD", image: Model4 },
    ],
  ];
  const handleDropdownClick = (index: number) => {
    setActiveButton(index);
    setIsDropdownOpen(false);
  };

  const handleButtonClick = (index: number) => {
    setActiveButton(index);
    setCurrentSlide(0);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides[activeButton].length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides[activeButton].length - 1 : prev - 1,
    );
  };

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

  const slidesToDisplay = Array.from({ length: 3 }, (_, index) => {
    const slideIndex = (currentSlide + index) % slides[activeButton].length;
    return slides[activeButton][slideIndex];
  });

  return (
    <div className="border-b-8 border-black bg-[#FF6E00] pb-12">
      <h1
        className="py-16 text-center font-lexendZetta text-4xl text-white md:text-5xl lg:text-6xl"
        style={{
          WebkitTextStroke: isLargeScreen ? "7px black" : "4px black",
          paintOrder: "stroke fill",
        }}
      >
        FOURJECTIV TEAM
      </h1>
      {isLargeScreen ? (
        <div className="mx-auto flex w-[90%] flex-row gap-4">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(index)}
              className={`flex-1 items-center rounded-lg border-4 border-black px-4 py-5 text-center text-xl font-bold ${
                activeButton === index ? "bg-[#437EFF] text-white" : "bg-white"
              }`}
            >
              {button}
            </button>
          ))}
        </div>
      ) : (
        <div className="relative mx-auto w-[90%]">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex w-full items-center justify-between rounded-lg border-4 border-black bg-[#437EFF] px-4 py-5 text-center text-xl font-bold"
          >
            {buttons[activeButton]} <Image src={Dropdown} alt="Dropdown" />
          </button>
          {isDropdownOpen && (
            <div className="absolute left-0 z-10 w-full rounded-lg border-4 border-black bg-[#437EFF] shadow-md">
              {buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => handleDropdownClick(index)}
                  className={`w-full px-4 py-3 text-left text-xl font-bold ${
                    activeButton === index ? "bg-[#437EFF]" : "bg-white"
                  } hover:bg-gray-200`}
                >
                  {button}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      {/* Image Carousel Mobile*/}
      <div className="flex w-full items-center justify-center md:hidden">
        <button
          onClick={handlePrevSlide}
          className="h-10 w-10 rounded-lg border-[3px] border-black bg-[#FFD800] text-2xl text-black"
        >
          &lt;
        </button>

        <div className="flex basis-1/2 flex-col items-center">
          <img
            src={slides[activeButton][currentSlide].image.src}
            alt={slides[activeButton][currentSlide].name}
            className="h-64 w-48 sm:w-64 sm:h-80 rounded object-cover"
          />
          <p className="mt-2 w-64 rounded-lg border-4 border-black bg-[#FFD800] py-3 text-center font-bold">
            {slides[activeButton][currentSlide].name}
          </p>
        </div>

        <button
          onClick={handleNextSlide}
          className="h-10 w-10 rounded-lg border-[3px] border-black bg-[#FFD800] text-2xl text-black"
        >
          &gt;
        </button>
      </div>
      {/* Image Carousel */}
      <div className="hidden w-full grid-cols-12 items-center justify-center px-8 md:grid">
        <button
          onClick={handlePrevSlide}
          className="col-span-1 h-10 w-10 rounded-lg border-[3px] border-black bg-[#FFD800] text-2xl text-black lg:h-12 lg:w-12"
        >
          &lt;
        </button>

        <div className="col-span-10 flex flex-row justify-center">
          {slidesToDisplay.map((slide, index) => (
            <div
              key={index}
              className="flex flex-col items-center transition-transform duration-300 md:scale-75 lg:scale-90"
            >
              <img
                src={slide.image.src}
                alt={slide.name}
                className="h-64 w-48 rounded object-cover md:h-56 md:w-40 lg:h-64 lg:w-48 xl:h-72 xl:w-56"
              />
              <p
                className={`w-56 rounded-lg border-4 border-black bg-[#FFD800] py-3 text-center text-sm font-bold lg:w-[300px] lg:text-base xl:w-80`}
              >
                {slide.name}
              </p>
            </div>
          ))}
        </div>

        <div className="col-span-1 flex items-end justify-end">
          <button
            onClick={handleNextSlide}
            className="h-10 w-10 rounded-lg border-[3px] border-black bg-[#FFD800] text-2xl text-black lg:h-12 lg:w-12"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
