import Image from "next/image";
import Link from "next/link";
import WhatsappLogo from "../../../../public/images/faq/whatsapp-logo.svg";
import WhatsappMascot from "../../../../public/images/faq/whatsapp-mascot.svg";
import FaqMascotCrop from "../../../../public/images/faq/faq-mascot-crop.svg";

export default function WhatsappButton2() {
  return (
    <Link
      href="https://wa.me/6285157386631"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center px-8"
    >
      <div className="flex h-20 max-h-24 w-full overflow-hidden rounded-2xl border-[6px] border-black bg-[#FF6E00] md:h-24 md:w-full lg:w-[90%]">
        <div className="flex max-h-24 w-full justify-between px-4">
          <div className="flex items-center gap-2 md:pl-4">
            <Image
              src={WhatsappLogo}
              alt="whatsapp"
              width={32}
              height={32}
              className="h-auto w-6 lg:w-8 xl:w-10"
            />
            <h2 className="font-kronaOne text-xs text-white md:text-base lg:text-xl">
              Contact Us
            </h2>
          </div>
          <div className="flex justify-end">
            <Image
              src={WhatsappMascot}
              alt="Whatsapp"
              width={40}
              height={40}
              className="hidden h-auto w-40 md:block"
            />
            <Image
              src={FaqMascotCrop}
              alt="faq"
              width={40}
              height={40}
              className="h-auto w-20 md:hidden"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
