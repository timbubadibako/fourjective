import React from "react";
import Image from "next/image";
import Photo from "../../../../../public/images/services/service-type/photo.svg";
import PhotoMobile from "../../../../../public/images/services/service-type/photo-mobile.svg";

const PhotoService = () => {
  return (
    <section className="flex max-w-full flex-col gap-4 overflow-hidden md:flex-row-reverse">
      {/* Image */}
      <div className="relative">
        {/* Photo */}
        <div className="h-full w-full overflow-hidden">
          <Image
            src={Photo}
            alt="Photo Service"
            className="relative left-1/2 h-full -translate-x-1/2 transform hidden md:block"
          />
          <Image
            src={PhotoMobile}
            alt="Photo Service"
            className="relative left-1/2 h-full -translate-x-1/2 transform block md:hidden"
          />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col bg-[#217044] px-4 py-16 md:w-[960px]">
        {/* Content */}
        <div className="relative flex flex-col gap-3 md:px-4 md:gap-10">
          <h2
            className="font-leagueSpartan text-2xl font-extrabold text-white md:text-[64px]"
            style={{
              WebkitTextStroke: "4px black",
              paintOrder: "stroke fill",
            }}
          >
            Photoshoot Service
          </h2>
          <div className="relative left-4 flex gap-6">
            <ul className="font-leagueSpartan w-full pr-4 text-sm text-white md:text-xl">
              <p>• Indoor Photo</p>
              <p>• Outdoor photo</p>
              <p>• Studio Delivery</p>
              <br/>
              <h3 className="font-bold">1. Properti Foto dari Vendor (S&K)</h3>
              <p>Kita sediain properti biar lo gak ribet bawa. Tapi kalo mau bawa sendiri? Lebih oke lagi.</p>
              <h3 className="font-bold">2. Tema Sesuai Request</h3>
              <p>Mau konsep apa aja? Kita siap. Kita paham tiap angkatan beda- beda, makanya kita
              sediain ide fresh, update, dan kekinian. Atau bisa juga request tema sendiri.</p>
              <h3 className="font-bold">3. Team 3-4 Orang di Lapangan</h3>
              <p>Bukan cuma fotografer, tapi ada:</p>
              <p>• Leader buat ngatur kondisi lapangan.</p>
              <p>• Style Director buat arahin gaya & pose.</p>
              <p>• Equipment Specialist buat lighting & set properti.</p>
              <p>• Biar lo tinggal fokus tampil pede, mood tetep fun, hasil lebih maksimal.</p>
              <h3 className="font-bold">4. Lighting professional (three point lighting)</h3>
              <p>Mau foto sore, malem, atau indoor, hasil tetep cerah & estetik. Kita dukung dengan lighting profesional (favorit kita: seri Godox)</p>
              <h3 className="font-bold">5. Free additional Photo (S&K)</h3>
              <p>Butuh tambahan foto lain? Fasilitas sekolah, outfit, nominasi, dll- bisa kita sediain gratis</p>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoService;
