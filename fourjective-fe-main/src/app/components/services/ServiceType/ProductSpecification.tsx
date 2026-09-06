import React from "react";
import Image from "next/image";
import Product from "../../../../../public/images/services/service-type/product.svg";
import ProductMobile from "../../../../../public/images/services/service-type/product-mobile.svg";

const ProductSpecification = () => {
  return (
    <section className="flex max-w-full flex-col gap-1 overflow-hidden md:flex-row-reverse">
      {/* Image */}
      <div className="relative">
        {/* Photo */}
        <div className="h-full w-full overflow-hidden bg-[#C90731]">
          <Image
            src={Product}
            alt="Product Specification"
            className="relative left-1/2 h-full -translate-x-1/2 transform hidden md:block"
          />
          <Image
            src={ProductMobile}
            alt="Product Specification"
            className="relative left-1/2 h-full -translate-x-1/2 transform block md:hidden"
          />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col bg-[#C90731] px-4 py-16 md:w-[960px]">
        {/* Content */}
        <div className="relative flex flex-col gap-3 md:px-4 md:gap-10">
          <h2
            className="font-leagueSpartan text-2xl font-extrabold text-white md:text-[64px]"
            style={{
              WebkitTextStroke: "4px black",
              paintOrder: "stroke fill",
            }}
          >
            Product Specification
          </h2>
          <div className="relative left-4 flex gap-6">
            <ul className="font-leagueSpartan w-full pr-4 text-sm text-white md:text-xl">
              <h3 className="font-bold">1. Halaman</h3>
              <p>• Mengikuti jumlah pax</p>
              <h3 className="font-bold">2. Jenis Kertas</h3>
              <p>• Art/Matte Papper 150gsm</p>
              <p>• Cetak Fullcolor</p>
              <h3 className="font-bold">3. Ukuran buku</h3>
              <p>• A4/A5/B5</p>  
            </ul>
            <ul className="font-leagueSpartan w-full pr-4 text-sm text-white md:text-xl">
              <h3 className="font-bold">4. Jenis Bahan Packaging</h3>
              <p>• Hardcover MDF + Ivory 190gsm</p>
              <p>• Varnish</p>
              <p>• Laminasi</p>
              <p>• Art/ matte papper 160gsm</p>
              <h3 className="font-bold">5. Additional</h3>
              <p>• Pop Up</p>
              <p>• Spot Uv</p>
              <p>• Emboost</p>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSpecification;
