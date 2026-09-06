import Image from "next/image";
import Box from "./faq-box";
import Question from "./question";
import WhatsappButton2 from "./whatsapp-button-2";
import Faq from "../../../../public/images/faq/faq.svg";
import FaqMascot from "../../../../public/images/faq/faq-mascot.svg";
import FaqBackground from "../../../../public/images/faq/faq-background.svg";

export default function Hero() {
  return (
    <main className="mx-auto w-[93%] pt-28 md:pt-40 lg:pt-52">
      <Image
        src={Faq}
        alt="Frequently Asked Questions"
        width={800}
        height={800}
        className="mx-auto h-auto w-full md:w-[85%] lg:w-[90%]"
      />
      <div className="mt-12 flex w-full flex-col gap-4 lg:mt-16">
        <Box
          title="Apa itu Fourjectiv?"
          message="Fourjectiv adalah vendor kreatif yang berdiri sejak 2021 dengan moto “Do the Best for the Best Moment”. Fokus pada pembuatan yearbook, short movie, dan dokumentasi angkatan dengan pendekatan estetik, personal, dan penuh makna. Kami bukan sekadar dokumentasi, tapi partner kreatif untuk mengabadikan cerita perjalananmu."
        />
        <Box
          title="Layanan apa saja yang tersedia?"
          message={`• Photoshoot Service: Indoor, outdoor, studio delivery.
                  • Video Service: Dokumentasi, short movie, video kreatif.
                  • Editing Service: Retouch, grading, desain layout.
                  • Book Service: Cover design, layout yearbook, cetak dengan berbagai spesifikasi.
                  • Special Service: Augmented Reality (AR), yearbook digital/e-book.
                  • Merchandise: Beragam produk pendukung angkatan.`}
        />
        <Box
          title="Apa keunggulan Fourjectiv dibanding vendor lain?"
          message={`• Pendekatan personal & emosional, bukan sekadar dokumentasi standar.
                  • Menggunakan teknologi terbaru (termasuk AR & e-book digital).
                  • Desain cover & layout yang modern, variatif, dan bisa custom.
                  • Layanan lengkap (foto, video, editing, cetak, merchandise).
                  • Tim profesional dengan standar kualitas tinggi.`}
        />
        <Box
          title="Berapa harga paket yearbook di Fourjectiv?"
          message={`• Harga yearbook bervariasi, tergantung:
                  • Jumlah halaman (40, 60, 80, 120, 150, 180 halaman).
                  • Ukuran buku (A4, A5, B5, atau custom).
                  • Jenis cover (soft, hard, 3D).
                  • Pilihan desain (basic, minimalist, modern, ilustrasi, atau request).
                  • Tambahan (pop up, spot UV, emboss, AR, dll).`}
        />
        <Box
          title="Bisa request desain sesuai identitas angkatan?"
          message="Ya, klien bisa request desain cover, layout, maupun konsep foto/video sesuai tema & karakteristik angkatan."
        />
        <Box
          title="Apakah ada layanan digital selain buku cetak?"
          message="Ada. Kami menyediakan Yearbook Digital (E-book) dan Augmented Reality (AR) agar dokumentasi bisa lebih interaktif dan modern."
        />
        <Box
          title="Bagaimana sistem pembayaran & alur kerja?"
          message={`• Meeting & kesepakatan proposal.
                  • MOU (kontrak kerja sama).
                  • Pembayaran bertahap (DP – produksi – pelunasan).
                  • Produksi (photoshoot, editing, desain, cetak).
                  • Pengiriman hasil akhir.`}
        />
        <Box
          title="Berapa lama proses produksi yearbook?"
          message="Durasi menyesuaikan paket & jumlah halaman. Timeline produksi akan disepakati bersama klien saat meeting awal agar hasil tepat waktu."
        />
        <Box
          title="Apakah ada revisi jika hasil tidak sesuai?"
          message="Ada. Kami memberikan kesempatan revisi di tahap desain & editing sebelum masuk cetak, agar hasil benar-benar sesuai ekspektasi angkatan."
        />
      </div>
      <div className="relative mb-8 mt-16 flex h-44 w-full rounded-3xl overflow-hidden border-4 border-black bg-[#F9C1C0] md:h-56 md:border-[6px] lg:h-64 lg:border-[10px]">
        <Image
          src={FaqBackground}
          alt="FAQ Background"
          fill
          className="absolute inset-0 object-cover z-0 hidden md:block"
        />
        <div className="flex flex-col my-auto gap-4 z-10">
          <Question />
          <WhatsappButton2 />
        </div>
        <div className="hidden overflow-hidden md:block z-10">
          <Image
            src={FaqMascot}
            alt="FAQ"
            width={400}
            height={400}
            className="h-auto w-full translate-x-1/5 md:-translate-y-[20%] lg:w-[92%] lg:translate-x-[10%]"
          />
        </div>
      </div>
    </main>
  );
}
