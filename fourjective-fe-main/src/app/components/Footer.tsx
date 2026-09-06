"use client";

import { useState, useEffect } from "react";

const Footer = () => {
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

  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="mx-auto max-w-full px-4 py-8 md:max-w-[1440px] md:px-14 md:py-16">
        <div className="flex flex-col gap-8">
          {/* Content */}
          <div className="flex w-full flex-col items-center gap-8 rounded-md bg-[#F54500] px-4 py-8 md:flex-row md:items-start md:gap-16 md:px-12 md:py-12">
            {/* Fourjectiv */}
            <div className="h-fit w-fit flex-1 flex-col items-center gap-y-4">
              <div className="relative h-16 w-full md:h-28">
                <h2
                  className="font-leagueSpartan absolute left-1 w-full text-center text-5xl font-black text-[#F54500] md:left-2 md:text-start md:text-8xl"
                  style={{
                    WebkitTextStroke: isLargeScreen ? "4px black" : "2px black",
                    paintOrder: "stroke fill",
                  }}
                >
                  FOURJECTIV
                </h2>
                <h2
                  className="font-leagueSpartan absolute w-full text-center text-5xl font-black text-[#FF7700] md:text-start md:text-8xl"
                  style={{
                    WebkitTextStroke: isLargeScreen ? "4px black" : "2px black",
                    paintOrder: "stroke fill",
                  }}
                >
                  FOUR<span className="text-white">JECTIV</span>
                </h2>
              </div>
              <p className="w-full text-center font-poppins text-xl font-semibold text-white md:w-[600px] md:text-start md:text-[32px]">
                Yearbook Organizer Indonesia
                <br />
                <span className="block md:mt-2">
                  Melayani Seluruh Indonesia
                </span>
              </p>
            </div>

            {/* List */}
            <div className="flex-1">
              <div className="flex flex-col items-center gap-2 md:items-start md:gap-6">
                {[
                  { text: "About", href: "/about" },
                  { text: "Services", href: "/services" },
                  { text: "Portofolio", href: "/portofolio" },
                  { text: "Gallery", href: "/gallery" },
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="font-poppins text-xl font-semibold text-white transition-colors hover:text-[#ffdcce] md:text-[32px]"
                  >
                    {item.text}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex w-full flex-col items-start gap-y-4">
            <hr className="w-full border border-white md:border-[2px]" />
            <p className="font-leagueSpartan text-sm font-semibold text-[#7E7E7E] md:text-2xl">
              © 2025 Fourjectiv. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
