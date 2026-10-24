import type { Metadata } from "next";
import RootLayoutClient from "./layout-client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fourjective.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FOURJECTIVE | Vendor Buku Tahunan Sekolah #1",
    template: "%s | FOURJECTIVE",
  },
  description:
    "Vendor Buku Tahunan Sekolah (BTS) #1 terpercaya sejak 2021. Konsep kreatif, sesi photoshoot tematik, cetak hardcover premium, dan 3D interactive flipbook.",
  keywords: [
    "buku tahunan sekolah",
    "bts organizer",
    "vendor buku tahunan",
    "yearbook photoshoot",
    "cetak buku tahunan",
    "fourjective",
    "fourjective creative studio",
    "buku tahunan kuningan",
    "buku tahunan cirebon",
    "buku tahunan jabodetabek",
    "3d flipbook yearbook",
  ],
  authors: [{ name: "Fourjective Creative Studio", url: siteUrl }],
  creator: "Fourjective Creative Studio",
  publisher: "Fourjective Creative Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "FOURJECTIVE",
    title: "FOURJECTIVE | Vendor Buku Tahunan Sekolah #1",
    description:
      "Vendor Buku Tahunan Sekolah (BTS) #1 terpercaya sejak 2021. Konsep kreatif, photoshoot tematik, cetak hardcover premium, dan 3D flipbook.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FOURJECTIVE | Vendor Buku Tahunan Sekolah #1",
    description:
      "Vendor Buku Tahunan Sekolah #1 terpercaya sejak 2021. Photoshoot tematik, cetak hardcover premium, dan 3D interactive flipbook.",
    creator: "@fourjectiv",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* Preconnect to API domain */}
        <link rel="preconnect" href="https://api.fourjectiv.com" />
        <link rel="dns-prefetch" href="https://api.fourjectiv.com" />

        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/Poppins/Poppins-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Poppins/Poppins-SemiBold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <RootLayoutClient>{children}</RootLayoutClient>
    </html>
  );
}
