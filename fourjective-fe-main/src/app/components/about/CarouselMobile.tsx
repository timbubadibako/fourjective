"use client";

import React, { useState, useEffect } from "react";
import Model2 from "../../../../public/images/about/model2.svg";
import Button from "./Button";

export default function Team() {
  const [activeButton, setActiveButton] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const buttons = ["Founder", "Art Media", "Art Event", "Percetakan"];
  const slides = [
    [
      {
        name: "Cristian - CoFounder",
        image: Model2,
      },
      { name: "Reynal - Founder", image: Model2 },
      { name: "Bryln - CoFounder", image: Model2 },
    ],
  ];

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

  return (
    <div className="flex w-full items-center justify-center">
      <button
        onClick={handlePrevSlide}
        className="rounded-lg border-[3px] border-black bg-[#FFD800] px-4 py-2 text-4xl text-black"
      >
        &lt;
      </button>

      <div className="mx-6 flex basis-2/3 flex-col items-center">
        <img
          src={slides[activeButton][currentSlide].image.src}
          alt={slides[activeButton][currentSlide].name}
          className="scale-100 rounded object-cover"
        />
        <p className="mt-2 rounded-lg border-4 border-black bg-[#FFD800] px-24 py-3 text-center font-bold">
          {slides[activeButton][currentSlide].name}
        </p>
      </div>

      <button
        onClick={handleNextSlide}
        className="rounded-lg border-[3px] border-black bg-[#FFD800] px-4 py-2 text-4xl text-black"
      >
        &gt;
      </button>
    </div>
  );
}
