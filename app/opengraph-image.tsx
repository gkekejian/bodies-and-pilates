import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Bodies and Pilates — boutique Pilates studio in North Hollywood";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand palette (mirrors tailwind.config.ts)
const CREAM = "#FAF7F2";
const CREAM_DARK = "#F5F0EB";
const SAGE = "#5A6B4A";
const SAGE_SOFT = "#7D8A6D";
const CHARCOAL = "#1A1A1A";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: CREAM,
          backgroundImage: `linear-gradient(135deg, ${CREAM} 55%, ${CREAM_DARK} 100%)`,
          padding: "72px 84px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top rule + eyebrow */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: 64,
              height: 2,
              backgroundColor: SAGE,
              marginBottom: 28,
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 10,
              color: SAGE_SOFT,
              textTransform: "uppercase",
            }}
          >
            Boutique Pilates Studio
          </div>
        </div>

        {/* Wordmark */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 104,
              fontWeight: 700,
              color: CHARCOAL,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            Bodies and Pilates
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 34,
              color: SAGE,
            }}
          >
            Empower Your Essence
          </div>
        </div>

        {/* Footer facts */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${SAGE_SOFT}55`,
            paddingTop: 28,
            fontSize: 26,
            color: "#2C2C2C",
          }}
        >
          <div style={{ display: "flex" }}>
            5251 Vineland Ave · North Hollywood, CA
          </div>
          <div
            style={{
              display: "flex",
              backgroundColor: SAGE,
              color: CREAM,
              borderRadius: 999,
              padding: "12px 32px",
              fontSize: 26,
            }}
          >
            First Class $25
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
