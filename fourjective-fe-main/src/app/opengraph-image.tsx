import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FOURJECTIVE - Vendor Buku Tahunan Sekolah #1";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#14161C",
          padding: "56px 64px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          position: "relative",
        }}
      >
        {/* Neobrutal border frame accent */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: "2px solid #2A2E39",
            pointerEvents: "none",
          }}
        />

        {/* Top bar: Badge & Est */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#FAF6F0",
              color: "#14161C",
              padding: "10px 22px",
              fontWeight: 900,
              fontSize: 18,
              letterSpacing: "0.15em",
              border: "3px solid #14161C",
              boxShadow: "5px 5px 0px #FF4D00",
              textTransform: "uppercase",
            }}
          >
            // Neobrutal badge
            FOURJECTIVE STUDIO
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "#FAF6F0",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.1em",
              opacity: 0.8,
            }}
          >
            <span>EST. 2021</span>
            <span>•</span>
            <span>INDONESIA</span>
          </div>
        </div>

        {/* Center: Main Neobrutal Typography */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            zIndex: 1,
          }}
        >
          {/* Main Brand */}
          <div
            style={{
              fontSize: 94,
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              color: "#FAF6F0",
              display: "flex",
              alignItems: "baseline",
            }}
          >
            <span>FOURJECTIVE</span>
            <span style={{ color: "#FF4D00", marginLeft: 4 }}>.</span>
          </div>

          {/* Subtag / Value Proposition Banner */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#FF4D00",
                color: "#FAF6F0",
                padding: "12px 24px",
                fontSize: 26,
                fontWeight: 900,
                letterSpacing: "0.06em",
                border: "3px solid #FAF6F0",
                boxShadow: "6px 6px 0px #000000",
                textTransform: "uppercase",
              }}
            >
              VENDOR BUKU TAHUNAN SEKOLAH #1
            </div>
          </div>
        </div>

        {/* Bottom bar: Pillars & Tagline */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
            zIndex: 1,
            borderTop: "2px solid #2A2E39",
            paddingTop: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              color: "#FAF6F0",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            <span style={{ color: "#FF4D00", fontWeight: 900 }}>*</span>
            <span>Photoshoot</span>
            <span style={{ opacity: 0.35 }}>•</span>
            <span>Cetak Premium</span>
            <span style={{ opacity: 0.35 }}>•</span>
            <span>3D Flipbook</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#20242D",
              color: "#FAF6F0",
              padding: "8px 18px",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.08em",
              border: "2px solid #FF4D00",
            }}
          >
            fourjective.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
