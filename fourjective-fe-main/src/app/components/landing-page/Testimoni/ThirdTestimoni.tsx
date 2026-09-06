import React, { useState, useEffect } from "react";
import Image from "next/image";
import testi1 from "../../../../../public/images/landing-page/testimoni/testi-1.svg";
import testi2 from "../../../../../public/images/landing-page/testimoni/testi-2.svg";
import testi3 from "../../../../../public/images/landing-page/testimoni/testi-3.svg";
import testi4 from "../../../../../public/images/landing-page/testimoni/testi-4.svg";
import testi5 from "../../../../../public/images/landing-page/testimoni/testi-5.svg";
import testi6 from "../../../../../public/images/landing-page/testimoni/testi-6.svg";
import testi8 from "../../../../../public/images/landing-page/testimoni/testi-7.svg";

const ThirdTestimoni = () => {
  const testimonials = [
    { src: testi1, alt: "Testimonial 1" },
    { src: testi2, alt: "Testimonial 2" },
    { src: testi3, alt: "Testimonial 3" },
    { src: testi4, alt: "Testimonial 4" },
    { src: testi5, alt: "Testimonial 5" },
    { src: testi6, alt: "Testimonial 6" },
    { src: testi8, alt: "Testimonial 7" },
  ];

  const [currentIndex, setCurrentIndex] = useState(3); // Start at position 3 (first real item)
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Create extended array for seamless looping
  const extendedTestimonials = [
    ...testimonials.slice(-3), // Last 3 items at the beginning
    ...testimonials,
    ...testimonials.slice(0, 3), // First 3 items at the end
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 3000); // Auto slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex === testimonials.length + 3) {
      // Reset to start after showing the duplicated items
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(3);
      }, 300);
    } else if (currentIndex === 2) {
      // Reset to end after showing the duplicated items
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(testimonials.length + 2);
      }, 300);
    }
  }, [currentIndex, testimonials.length]);

  return (
    <section className="col-span-3 flex max-w-full flex-col gap-4">
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div
          className={`flex ${
            isTransitioning
              ? "transition-transform duration-300 ease-in-out"
              : ""
          }`}
          style={{
            transform: `translateX(-${currentIndex * (100 / 3)}%)`,
          }}
        >
          {extendedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.alt}-${index}`}
              className="relative h-64 w-1/2 flex-shrink-0 overflow-hidden bg-[#A6FFDB] md:h-full md:w-1/3"
              style={{
                marginRight:
                  index < extendedTestimonials.length - 1 ? "1rem" : "0",
              }}
            >
              <Image
                src={testimonial.src}
                alt={testimonial.alt}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setCurrentIndex(index + 3);
            }}
            className={`h-3 w-3 rounded-full transition-colors ${
              (currentIndex - 3 + testimonials.length) % testimonials.length ===
              index
                ? "bg-blue-500"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default ThirdTestimoni;
