import React, { useState, useEffect } from "react";
import Image from "next/image";
import Mascot from "../../../../../public/images/landing-page/portfolio/bottom-left.svg";
import Colorfull from "../../../../../public/images/landing-page/portfolio/colorfull.png";

const BottomLeft = () => {
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
        alt="Bottom Left Content"
        className="absolute -right-14 -top-56 rotate-[15deg] scale-[0.6] md:-top-96 md:right-32 md:scale-100"
      />
      {/* Image */}
      <div className="flex w-[200px] rotate-[15deg] flex-col items-center gap-6 md:w-[400px]">
        <div className="h-[300px] w-full md:h-[600px] md:rounded-3xl">
          <Image
            src={Colorfull}
            alt="Colorfull"
            className="h-full w-full scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default BottomLeft;
