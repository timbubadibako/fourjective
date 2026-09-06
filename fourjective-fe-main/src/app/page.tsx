"use client";

import dynamic from "next/dynamic";
import Hero from "./components/landing-page/Hero";
import ErrorBoundary from "@/components/ErrorBoundary";

const LoadingSpinner = () => (
  <div className="flex min-h-[400px] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
  </div>
);

// Lazy load components yang tidak critical dengan error handling
const OurServices = dynamic(
  () =>
    import("./components/landing-page/OurServices").catch((err) => {
      console.error("Failed to load OurServices:", err);
      return { default: () => <div>Failed to load Our Services</div> };
    }),
  {
    loading: LoadingSpinner,
    ssr: true,
  },
);

const Portfolio = dynamic(
  () =>
    import("./components/landing-page/Portfolio").catch((err) => {
      console.error("Failed to load Portfolio:", err);
      return { default: () => <div>Failed to load Portfolio</div> };
    }),
  {
    loading: LoadingSpinner,
    ssr: true,
  },
);

const Testimoni = dynamic(
  () =>
    import("./components/landing-page/Testimoni").catch((err) => {
      console.error("Failed to load Testimoni:", err);
      return { default: () => <div>Failed to load Testimoni</div> };
    }),
  {
    loading: LoadingSpinner,
    ssr: true,
  },
);

const ContactUs = dynamic(
  () =>
    import("./components/ContactUs").catch((err) => {
      console.error("Failed to load ContactUs:", err);
      return { default: () => <div>Failed to load Contact Us</div> };
    }),
  {
    loading: () => (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    ),
    ssr: true,
  },
);

const Footer = dynamic(
  () =>
    import("./components/Footer").catch((err) => {
      console.error("Failed to load Footer:", err);
      return { default: () => <div>Failed to load Footer</div> };
    }),
  {
    ssr: true,
  },
);

export default function Home() {
  return (
    <main>
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      <ErrorBoundary>
        <OurServices />
      </ErrorBoundary>
      <ErrorBoundary>
        <Portfolio />
      </ErrorBoundary>
      <ErrorBoundary>
        <Testimoni />
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
