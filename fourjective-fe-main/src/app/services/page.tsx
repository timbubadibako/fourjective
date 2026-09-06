"use client";

import dynamic from "next/dynamic";
import Hero from "../components/services/Hero";
import ErrorBoundary from "@/components/ErrorBoundary";

// Lazy load service components dengan error handling
const ServiceType = dynamic(
  () =>
    import("../components/services/ServiceType").catch((err) => {
      console.error("Failed to load ServiceType:", err);
      return {
        default: () => (
          <div className="min-h-[600px]">Failed to load Service Type</div>
        ),
      };
    }),
  {
    loading: () => <div className="min-h-[600px]" />,
    ssr: true,
  },
);

const ContactUs = dynamic(
  () =>
    import("../components/ContactUs").catch((err) => {
      console.error("Failed to load ContactUs:", err);
      return {
        default: () => (
          <div className="min-h-[200px]">Failed to load Contact Us</div>
        ),
      };
    }),
  {
    loading: () => <div className="min-h-[200px]" />,
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

export default function Services() {
  return (
    <main>
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      <ErrorBoundary>
        <ServiceType />
      </ErrorBoundary>
      <ErrorBoundary>
        <ContactUs />
      </ErrorBoundary>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </main>
  );
}
