import React from "react";
import Image from "next/image";
import Book2 from "../../../../../public/images/services/service-type/book2.svg"; 
import Book2Mobile from "../../../../../public/images/services/service-type/book2-mobile.svg"; 

const BookService2 = () => {
  return (
    <section className="flex max-w-full flex-col gap-1 overflow-hidden md:flex-row">
      {/* Image */}
      <div className="relative bg-[#6030D9]">
        {/* Photo */}
        <div className="h-full w-full overflow-hidden">
          <Image
            src={Book2}
            alt="Book Service"
            className="relative left-1/2 h-full -translate-x-1/2 scale-[105%] transform hidden md:block"
          />
        </div>
        <div className="h-full w-full overflow-hidden">
          <Image
            src={Book2Mobile}
            alt="Book Service"
            className="relative left-1/2 h-full w-full -translate-x-1/2 transform block md:hidden"
          />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col bg-[#6030D9] py-12 px-6 md:w-[960px]">
        {/* Content */}
        <div className="relative flex flex-col gap-3 md:px-4 md:gap-10">
          <h2
            className="font-leagueSpartan text-2xl font-extrabold text-white md:text-[64px]"
            style={{
              WebkitTextStroke: "4px black",
              paintOrder: "stroke fill",
            }}
          >
            Book Service
          </h2>
          <h2
            className="font-leagueSpartan text-xl font-extrabold text-white md:text-[50px]"
            style={{
              WebkitTextStroke: "4px black",
              paintOrder: "stroke fill",
            }}
          >
            (Design Layout)
          </h2>
          <div className="relative left-4 flex gap-6">
            <ul className="font-leagueSpartan w-full pr-4 list-disc text-sm text-white md:text-xl">
              <li>Foto dominan, lebih clean & modern, biar moment kamu yang jadi spotlight</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookService2;
