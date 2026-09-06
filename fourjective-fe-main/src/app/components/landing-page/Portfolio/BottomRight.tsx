import React, { useState, useEffect } from "react";
import Image from "next/image";
import Mascot from "../../../../../public/images/landing-page/portfolio/bottom-right.svg";
import Zombie from "../../../../../public/images/landing-page/portfolio/zombie.png";

const BottomRight = () => {
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
        alt="Bottom Right Content"
        className="absolute -left-16 -top-60 -rotate-[30deg] scale-50 md:-top-80 md:left-4 md:scale-100"
      />
      {/* Image */}
      <div className="flex w-[200px] -rotate-[15deg] flex-col items-center gap-6 md:w-[400px]">
        <div className="h-[300px] w-full md:h-[600px]">
          <Image
            src={Zombie}
            alt="Zombie"
            className="h-full w-full scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default BottomRight;
