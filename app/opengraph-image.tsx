import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Bodies and Pilates — boutique Pilates studio in North Hollywood";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand tokens (must match tailwind.config.ts).
const CREAM_50 = "#FDFCFA";
const CREAM_100 = "#FAF7F2";
const SAGE_500 = "#7D8A6D";
const SAGE_700 = "#5A6B4A";
const TAUPE_300 = "#D4C5B5";
const CHARCOAL_900 = "#1A1A1A";

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
          backgroundColor: CREAM_100,
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: SAGE_700,
            fontSize: 22,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <span
            style={{
              display: "block",
              width: 56,
              height: 1,
              backgroundColor: SAGE_500,
            }}
          />
          North Hollywood &middot; Est. 2024
        </div>

        {/* Main type stack */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              fontSize: 104,
              lineHeight: 1.0,
              color: CHARCOAL_900,
              letterSpacing: "-0.01em",
            }}
          >
            Bodies and Pilates
          </div>
          <div
            style={{
              fontSize: 40,
              color: CHARCOAL_900,
              opacity: 0.78,
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "-0.005em",
            }}
          >
            Pilates Studio in North Hollywood
          </div>

          <div
            style={{
              marginTop: 20,
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: SAGE_700,
                color: CREAM_50,
                fontFamily: "system-ui, sans-serif",
                fontSize: 30,
                fontWeight: 600,
                letterSpacing: "0.04em",
                padding: "16px 32px",
                borderRadius: 999,
              }}
            >
              $25 First Class
            </div>
            <div
              style={{
                color: SAGE_700,
                fontSize: 22,
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Reformer · Mat · Private
            </div>
          </div>
        </div>

        {/* Bottom address strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 24,
            borderTop: `1px solid ${TAUPE_300}`,
            color: CHARCOAL_900,
            opacity: 0.7,
            fontSize: 22,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <span>5251 Vineland Ave &middot; NoHo, CA</span>
          <span style={{ color: SAGE_700, letterSpacing: "0.22em", textTransform: "uppercase" }}>
            bodiesandpilates.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
