import React, { useState, useEffect } from "react";
import Image from "next/image";
import Mascot from "../../../../../public/images/landing-page/portfolio/top-right.svg";
import Dark from "../../../../../public/images/landing-page/portfolio/dark.png";

const TopRight = () => {
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
        alt="Top Right Content"
        className="md:-left-42 absolute -left-20 -top-60 scale-50 md:-top-80 md:scale-100"
      />
      {/* Image */}
      <div className="flex w-[200px] -rotate-[15deg] flex-col items-center gap-6 md:w-[400px]">
        <div className="h-[300px] w-full md:h-[630px]">
          <Image src={Dark} alt="Dark" className="h-full w-full scale-105" />
        </div>
      </div>
    </section>
  );
};

export default TopRight;
