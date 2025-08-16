import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Dumbbell design */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Left weight */}
          <div
            style={{
              width: "8px",
              height: "18px",
              background: "#e5e7eb",
              borderRadius: "2px",
              border: "1px solid #9ca3af",
            }}
          />

          {/* Handle */}
          <div
            style={{
              width: "12px",
              height: "3px",
              background: "#6b7280",
              margin: "0 1px",
              borderRadius: "1px",
            }}
          />

          {/* Right weight */}
          <div
            style={{
              width: "8px",
              height: "18px",
              background: "#e5e7eb",
              borderRadius: "2px",
              border: "1px solid #9ca3af",
            }}
          />
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
