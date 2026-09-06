"use client";

import dynamic from "next/dynamic";
import Hero from "../components/about/Hero";
import ErrorBoundary from "@/components/ErrorBoundary";

// Lazy load components dengan error handling
const History = dynamic(
  () =>
    import("../components/about/History").catch((err) => {
      console.error("Failed to load History:", err);
      return {
        default: () => (
          <div className="min-h-[300px]">Failed to load History</div>
        ),
      };
    }),
  {
    loading: () => <div className="min-h-[300px]" />,
    ssr: true,
  },
);

const Mission = dynamic(
  () =>
    import("../components/about/Mission").catch((err) => {
      console.error("Failed to load Mission:", err);
      return {
        default: () => (
          <div className="min-h-[300px]">Failed to load Mission</div>
        ),
      };
    }),
  {
    loading: () => <div className="min-h-[300px]" />,
    ssr: true,
  },
);

const Team = dynamic(
  () =>
    import("../components/about/Team").catch((err) => {
      console.error("Failed to load Team:", err);
      return {
        default: () => <div className="min-h-[400px]">Failed to load Team</div>,
      };
    }),
  {
    loading: () => <div className="min-h-[400px]" />,
    ssr: true,
  },
);

const Location = dynamic(
  () =>
    import("../components/about/Location").catch((err) => {
      console.error("Failed to load Location:", err);
      return {
        default: () => (
          <div className="min-h-[300px]">Failed to load Location</div>
        ),
      };
    }),
  {
    loading: () => <div className="min-h-[300px]" />,
    ssr: true,
  },
);

const ContactUs = dynamic(
  () =>
    import("../components/ContactUs").catch((err) => {
      console.error("Failed to load ContactUs:", err);
      return {
        default: () => (
          <div className="min-h-[200px]">Failed to load ContactUs</div>
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

export default function About() {
  return (
    <>
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      <ErrorBoundary>
        <History />
      </ErrorBoundary>
      <ErrorBoundary>
        <Mission />
      </ErrorBoundary>
      <ErrorBoundary>
        <Team />
      </ErrorBoundary>
      <ErrorBoundary>
        <Location />
      </ErrorBoundary>
      <ErrorBoundary>
        <ContactUs />
      </ErrorBoundary>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </>
  );
}
