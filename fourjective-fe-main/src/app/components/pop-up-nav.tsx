import Image from "next/image";
import Link from "next/link";
import WhatsappLogo from "../../../public/images/faq/whatsapp-logo.svg";
import Mascot2 from "../../../public/images/faq/faq-mascot-2.svg";

interface PopUpNavProps {
  isNavVisible: boolean;
  toggleNav: () => void;
}

export default function PopUpNav({ isNavVisible, toggleNav }: PopUpNavProps) {
  if (!isNavVisible) return null;

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-[#FFD271]">
      <Image
        src="/images/x-button.svg"
        alt="close"
        width={32}
        height={32}
        className="absolute right-6 top-10 h-auto w-1/12 min-[425px]:w-8"
        onClick={toggleNav}
      />
      <div className="flex h-3/4 w-[90%] flex-col items-center gap-8 font-[family-name:var(--font-poppins-bold)] text-xl">
        <Link href="/about">About</Link>
        <Link href="/services">Services</Link>
        <Link href="/portofolio">Portofolio</Link>
        <Link href="/gallery">Gallery</Link>
        <Link href="/faq">FAQ</Link>
        <a
          href="https://wa.me/6285157386631"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-[85%] items-center justify-center gap-2 rounded-lg border-[3px] border-black bg-[#00B00C] min-[425px]:w-52"
        >
          <Image
            src={WhatsappLogo}
            alt="whatsapp"
            width={32}
            height={32}
            className="h-auto w-7"
          />
          <h2 className="font-[family-name:var(--font-poppins-medium)] text-sm text-white">
            Chat Mimin
          </h2>
        </a>
        <Image
          src={Mascot2}
          alt="logo"
          width={32}
          height={32}
          className="absolute -bottom-16 h-auto w-[35%] min-[425px]:w-36"
        />
      </div>
    </div>
  );
}
