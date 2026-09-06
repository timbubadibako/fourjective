import Image from "next/image";
import WhatsappLogo from "../../../../public/images/faq/whatsapp-logo.svg";

export default function WhatsappButton1() {
  return (
    <a
      href="https://wa.me/6285157386631"
      target="_blank"
      rel="noopener noreferrer"
      className="box-border flex h-full w-full items-center justify-center rounded-xl border-[3px] border-black bg-[#FF6E00] p-2 md:gap-2 xl:gap-3"
    >
      <h2 className="font-[family-name:var(--font-poppins-medium)] font-medium text-white md:text-xs lg:text-xs xl:text-xl">
        CONTACT
      </h2>
    </a>
  );
}
