import { ImageResponse } from "next/og";

// Home-screen icon for iOS (Add to Home Screen) and Android shortcuts.
// Monogram on the brand cream; swap for the real logo file when supplied.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FDFCFA",
          color: "#1B6B3F",
          fontFamily: "serif",
          fontStyle: "italic",
          fontSize: 52,
          letterSpacing: -2,
        }}
      >
        <div
          style={{
            width: 148,
            height: 148,
            borderRadius: 74,
            border: "2px solid #1B6B3F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          B&P
        </div>
      </div>
    ),
    size
  );
}
