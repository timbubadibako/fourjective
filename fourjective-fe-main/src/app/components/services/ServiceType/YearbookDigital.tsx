import React from "react";
import Image from "next/image";
import Yearbook from "../../../../../public/images/services/service-type/yearbook.svg";
import YearbookMobile from "../../../../../public/images/services/service-type/yearbook-mobile.svg";

const YearbookDigital = () => {
  return (
    <section className="flex max-w-full flex-col gap-4 overflow-hidden md:flex-row-reverse">
      {/* Image */}
      <div className="relative bg-[#0FAB7F]">
        {/* Photo */}
        <div className="h-full w-full overflow-hidden">
          <Image
            src={Yearbook}
            alt="Yearbook Digital"
            className="relative left-1/2 hidden h-full -translate-x-1/2 transform md:block"
          />
          <Image
            src={YearbookMobile}
            alt="Yearbook Digital"
            className="relative left-1/2 block h-full -translate-x-1/2 transform md:hidden"
          />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col bg-[#0FAB7F] px-4 py-16 md:w-[960px]">
        {/* Content */}
        <div className="relative flex flex-col gap-3 md:gap-10 md:px-4">
          <div className="flex gap-2 md:gap-5">
            <h2
              className="font-leagueSpartan text-2xl font-extrabold text-white md:text-[64px]"
              style={{
                WebkitTextStroke: "4px black",
                paintOrder: "stroke fill",
              }}
            >
              Yearbook Digital
            </h2>
            <h2
              className="font-leagueSpartan text-xl font-extrabold text-white md:text-[50px]"
              style={{
                WebkitTextStroke: "4px black",
                paintOrder: "stroke fill",
              }}
            >
              (E-Book)
            </h2>
          </div>
          <div className="relative left-4 flex gap-6">
            <ul className="w-full pr-4 font-leagueSpartan text-sm text-white md:text-xl">
              <p>
                Buku tahunan kamu juga kita sediain versi digital (E-Book) yang
                bisa diakses kapan aja & di mana aja. Gak perlu takut file
                hilang, karena kita simpen arsip file kamu seumur hidup
                (Lifetime)
              </p>
            </ul>
            <ul className="w-full pr-4 font-leagueSpartan text-sm text-white md:text-xl">
              <h3 className="font-bold">1. Akses Praktis.</h3>
              <p>Bisa dibuka lewat HP, tablet, laptop.</p>
              <h3 className="font-bold">2. Lifetime Archive.</h3>
              <p>Data & file kamu aman. </p>
              <h3 className="font-bold">3. Nggak Takut Hilang.</h3>
              <p>Cetak ilang? Gak panik. File digital selalu ready.</p>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YearbookDigital;
