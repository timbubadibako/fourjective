"use client";

import { useState, useEffect } from "react";

export default function History() {
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
    <div className="flex min-h-[55vh] w-full flex-col items-center overflow-hidden border-b-8 border-black bg-[#437EFF] px-8 md:px-12 text-white md:min-h-[80vh]">
      <h1
        className="pt-16 text-center font-lexendZetta text-4xl text-white md:text-5xl lg:text-6xl"
        style={{
          WebkitTextStroke: isLargeScreen ? "7px black" : "4px black",
          paintOrder: "stroke fill",
        }}
      >
        Do The Best <br />
      </h1>
      <h1
          className="mb-10 mt-3 md:mt-5 text-center font-lexendZetta text-4xl text-white md:text-5xl lg:text-6xl"
          style={{
            WebkitTextStroke: isLargeScreen ? "7px black" : "4px black",
            paintOrder: "stroke fill",
          }}
        >
          For The Moment
        </h1>
      <p className="text-lg md:text-2xl mb-5">
        Berdiri sejak 2021, Fourjectiv hadir sebagai vendor kreatif yang
        berfokus pada pembuatan yearbook dengan pendekatan berbeda. Bagi kami,
        sebuah yearbook bukan sekadar kumpulan foto dan nama, tapi ruang untuk
        merangkai cerita, menghadirkan kenangan, dan membangkitkan emosi yang
        autentik melalui desain dan narasi yang modern.
      </p>
      <p className="text-lg md:text-2xl mb-12">
        Lebih dari sekadar dokumentasi, Fourjectiv menjadi partner kreatif yang
        membantu mengabadikan perjalanan sekolah lewat yearbook, short movie,
        dan rewind yang personal, estetik, dan penuh makna. Karena setiap momen
        berharga layak dikenang dengan cara terbaik.
      </p>
    </div>
  );
}
