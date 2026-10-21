import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT = "Bodies and Pilates, boutique reformer Pilates studio in North Hollywood. First class $25.";

/**
 * Branded typographic share card.
 * TODO(owner): once real photography exists, replace this with a 1200x630
 * photo of the reformer room (photo slot 1) with the studio name overlaid:
 * save it as app/opengraph-image.jpg and delete opengraph-image.tsx and
 * twitter-image.tsx.
 */
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFCF0",
          padding: "72px 80px",
          color: "#534745",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 6, color: "#A2876E", textTransform: "uppercase" }}>
          Woman-owned · North Hollywood
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, lineHeight: 1.05 }}>Bodies and Pilates</div>
          <div style={{ fontSize: 40, marginTop: 24, color: "#534745" }}>Boutique reformer Pilates studio</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", fontSize: 30, color: "#534745" }}>Your first class is $25</div>
          <div style={{ display: "flex", fontSize: 24, color: "#A2876E" }}>bodiesandpilates.com</div>
        </div>
      </div>
    ),
    OG_SIZE
  );
}
