import React from "react";
import Image from "next/image";
import Book from "../../../../../public/images/services/service-type/book.svg";
import BookMobile from "../../../../../public/images/services/service-type/book-mobile.svg";

const BookService = () => {
  return (
    <section className="flex max-w-full flex-col gap-1 overflow-hidden md:flex-row-reverse">
      {/* Image */}
      <div className="relative bg-[#EC9005]">
        {/* Book */}
        <div className="h-full w-full overflow-hidden">
          <Image
            src={Book}
            alt="Book Service"
            className="relative left-1/2 h-full -translate-x-1/2 transform hidden md:block"
          />
          <Image
            src={BookMobile}
            alt="Book Service"
            className="relative left-1/2 h-full -translate-x-1/2 transform block md:hidden"
          />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col bg-[#EC9005] px-4 py-16 md:w-[960px]">
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
            (Design Cover)
          </h2>
          <div className="relative left-4 flex gap-6">
            <ul className="font-leagueSpartan w-full pr-4 text-sm list-disc text-white md:text-xl">
              <li>Essential</li>
              <p>Simple, clean, timeless. Cocok buat konsep minimalis.</p>
              <li>Elements</li>
              <p>Lebih rame, lebih berani main elemen visual. Cocok buat yang pengen desain lebih variatif tapi tetap estetik.</p>
              <li>Masterpiece</li>
              <p>Desain premium dengan sentuhan ilustrasi, digital imaging, atau artwork khusus. Lebin artistik, lebih eksklusif.</p>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookService;
