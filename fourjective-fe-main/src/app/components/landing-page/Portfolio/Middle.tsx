import React, { useState, useEffect } from "react";
import Image from "next/image";
import Mascot from "../../../../../public/images/landing-page/portfolio/middle.svg";
import Jumanji from "../../../../../public/images/landing-page/portfolio/jumanji.png";

const Middle = () => {
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
    <section>
      {/* Mascot */}
      <Image
        src={Mascot}
        alt="Middle Content"
        className="absolute -top-40 left-0 scale-50 md:-top-72 md:scale-100"
      />

      {/* Image */}
      <div className="z-20 flex w-[200px] flex-col items-center gap-6 md:w-[400px]">
        <div className="h-[300px] w-full md:h-[600px]">
          <Image
            src={Jumanji}
            alt="Jumanji"
            className="h-full w-full scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default Middle;
