"use client";

import dynamic from "next/dynamic";
import ErrorBoundary from "@/components/ErrorBoundary";

// Lazy load gallery components dengan error handling
const YearbookResult = dynamic(
  () =>
    import("../components/gallery/YearbookResult").catch((err) => {
      console.error("Failed to load YearbookResult:", err);
      return {
        default: () => (
          <div className="min-h-[500px]">Failed to load Yearbook Result</div>
        ),
      };
    }),
  {
    loading: () => <div className="min-h-[500px]" />,
    ssr: true,
  },
);

const AfterMovie = dynamic(
  () =>
    import("../components/gallery/AfterMovie").catch((err) => {
      console.error("Failed to load AfterMovie:", err);
      return {
        default: () => (
          <div className="min-h-[500px]">Failed to load After Movie</div>
        ),
      };
    }),
  {
    loading: () => <div className="min-h-[500px]" />,
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

export default function Gallery() {
  return (
    <main>
      <ErrorBoundary>
        <YearbookResult />
      </ErrorBoundary>
      <ErrorBoundary>
        <AfterMovie />
      </ErrorBoundary>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </main>
  );
}
