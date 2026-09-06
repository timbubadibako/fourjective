"use client";

import dynamic from "next/dynamic";
import Hero from "../components/portofolio/Hero";
import ErrorBoundary from "@/components/ErrorBoundary";

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

export default function Portofolio() {
  return (
    <main>
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </main>
  );
}
