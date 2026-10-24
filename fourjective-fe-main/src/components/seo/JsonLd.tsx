export function JsonLd() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "name": "FOURJECTIVE - Vendor Buku Tahunan Sekolah",
    "image": "https://fourjective.com/images/logo/logo-fourjective.png",
    "@id": "https://fourjective.com/#localbusiness",
    "url": "https://fourjective.com",
    "telephone": "+6285157386631",
    "priceRange": "Rp 150.000 - Rp 350.000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kuningan",
      "addressRegion": "Jawa Barat",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.9765,
      "longitude": 108.4831
    },
    "description": "Vendor buku tahunan sekolah, yearbook organizer, cetak album kenangan sekolah, photoshoot tematik & e-book 3D.",
    "areaServed": [
      { "@type": "Country", "name": "Indonesia" },
      { "@type": "City", "name": "Jabodetabek" },
      { "@type": "City", "name": "Bandung" },
      { "@type": "City", "name": "Surabaya" },
      { "@type": "City", "name": "Kuningan" },
      { "@type": "City", "name": "Cirebon" }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "128",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Paket Pembuatan Buku Tahunan Sekolah (Yearbook)",
    "image": "https://fourjective.com/images/logo/logo-fourjective.png",
    "description": "Paket all-in-one pembuatan buku tahunan sekolah, photoshoot konsep tematik, layout editorial majalah, cetak offset bergaransi, dan 3D virtual flipbook.",
    "brand": {
      "@type": "Brand",
      "name": "Fourjective"
    },
    "category": "Yearbook Publishing Service",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": 150000,
      "highPrice": 350000,
      "priceCurrency": "IDR",
      "offerCount": "3",
      "availability": "https://schema.org/InStock",
      "url": "https://fourjective.com/paket"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "128"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Berapa lama proses pembuatan buku tahunan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Proses pembuatan buku tahunan rata-rata memakan waktu 2 hingga 4 bulan, mencakup tahap pra-produksi (brief & moodboard), sesi photoshoot, proses layout & revisi desain, hingga cetak dan finishing sebelum hari kelulusan."
        }
      },
      {
        "@type": "Question",
        "name": "Berapa minimal order buku tahunan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Minimal order buku tahunan sekolah di Fourjective fleksibel mulai dari 30 hingga 50 eksemplar per angkatan atau per kelas, dengan penyesuaian spesifikasi cetak dan harga terbaik."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah ada fasilitas e-book 3D flipbook?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ya, setiap paket buku tahunan Fourjective dilengkapi fasilitas Yearbook Digital (E-book / 3D Virtual Flipbook) dan dukungan interaktif yang bisa dibuka melalui smartphone maupun desktop."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

export default JsonLd;
