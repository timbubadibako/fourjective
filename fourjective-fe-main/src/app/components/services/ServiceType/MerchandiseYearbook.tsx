import React from "react";
import Image from "next/image";
import Merch from "../../../../../public/images/services/service-type/merch.svg";
import MerchMobile from "../../../../../public/images/services/service-type/merch-mobile.svg";

const MerchandiseYearbook = () => {
  return (
    <section className="flex max-w-full flex-col gap-1 overflow-hidden md:flex-row">
      {/* Image */}
      <div className="relative bg-[#964400]">
        {/* Photo */}
        <div className="h-full w-full overflow-hidden">
          <Image
            src={Merch}
            alt="Merchandise Yearbook"
            className="relative left-1/2 hidden h-full -translate-x-1/2 scale-[105%] transform md:block"
          />
        </div>
        <div className="h-full w-full overflow-hidden">
          <Image
            src={MerchMobile}
            alt="Merchandise Yearbook"
            className="relative left-1/2 block h-full w-full -translate-x-1/2 transform md:hidden"
          />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col bg-[#964400] px-6 py-12 md:w-[960px]">
        {/* Content */}
        <div className="relative flex flex-col gap-3 md:gap-10 md:px-4">
          <h2
            className="font-leagueSpartan text-2xl font-extrabold text-white md:text-[64px]"
            style={{
              WebkitTextStroke: "4px black",
              paintOrder: "stroke fill",
            }}
          >
            Merchandise Yearbook
          </h2>
          <div className="relative left-4 flex gap-6">
            <ul className="w-full pr-4 font-leagueSpartan text-sm text-white md:text-xl">
              <h3 className="font-bold">1. Medali Angkatan</h3>
              <p>Biar makin eksklusif & memorable.</p>
              <h4 className="font-semibold">Classic:</h4>
              <p>Akrilik + Tali Garis-Garis</p>
              <h4 className="font-semibold">Premium:</h4>
              <p>Akrilik + Lanyard</p>
              <h4 className="font-semibold">Eksklusif:</h4>
              <p>Kuningan + Lanyard</p>
              <h4 className="font-semibold">Masterpiece:</h4>
              <p>Zinc Alloy + Lanyard</p>

              <h3 className="mt-4 font-bold">2. Totebag</h3>
              <p>Pilihan bahan totebag:</p>
              <p>• Spunbond</p>
              <p>• Blacu</p>
              <p>• Kanvas</p>
              <p>• Drill</p>
            </ul>
            <ul className="w-full pr-4 font-leagueSpartan text-sm text-white md:text-xl">
              <h3 className="font-bold">3. Photobooth</h3>
              <p>
                Lagi hype? Kita siapin buat acara Graduation atau Event
                Angkatan.
              </p>
              <p>• Printer DNP (Profesional)</p>
              <p>• Lighting & Background</p>
              <p>• Unlimited Cetak</p>
              <p>• Properti Foto</p>

              <h3 className="mt-4 font-bold">4. Baju Angkatan</h3>
              <p>Desain kita yang urusin, lo tinggal pake.</p>
              <h4 className="font-semibold">Bahan:</h4>
              <p>Premium Cotton Combed 24s/30s</p>
              <h4 className="font-semibold">Sablon:</h4>
              <p>Plastisol Premium</p>
              <p>Bisa juga DFT (by request)</p>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MerchandiseYearbook;
