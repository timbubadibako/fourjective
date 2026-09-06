"use client";

import dynamic from "next/dynamic";
import Hero from "../components/faq/Hero";
import Background from "../../../public/images/faq/background.svg";
import ErrorBoundary from "@/components/ErrorBoundary";

const Line = dynamic(
  () =>
    import("../components/faq/line").catch((err) => {
      console.error("Failed to load Line:", err);
      return {
        default: () => <div className="min-h-[100px]">Failed to load Line</div>,
      };
    }),
  {
    loading: () => <div className="min-h-[100px]" />,
    ssr: true,
  },
);

const Footer = dynamic(
  () =>
    import("../components/Footer").catch((err) => {
      console.error("Failed to load Footer:", err);
      return { default: () => <div>Failed to load Footer</div> };
    }),
  {
    ssr: true,
  },
);

export default function FAQ() {
  return (
    <main
      style={{
        backgroundImage: `url(${Background.src})`,
        backgroundSize: "cover",
        backgroundPositionX: "center",
        backgroundPositionY: "top",
        backgroundAttachment: "fixed",
      }}
    >
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      <ErrorBoundary>
        <Line />
      </ErrorBoundary>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </main>
  );
}
