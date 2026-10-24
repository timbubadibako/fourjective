import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fourjective.com";

  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/portofolio",
        "/paket",
        "/services",
        "/about",
        "/faq",
        "/testimoni",
        "/portal",
      ],
      disallow: [
        "/dashboard",
        "/dashboard/*",
        "/api/*",
        "/track/*",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
