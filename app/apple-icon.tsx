import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at 30% 25%, #1a2540 0%, #0b1220 60%, #07090f 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: 108,
            height: 108,
            borderRadius: 999,
            border: "4px solid rgba(255,255,255,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 16,
              borderRadius: 999,
              border: "2px solid rgba(255,255,255,0.10)",
            }}
          />
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 999,
              background: "#fb923c",
              boxShadow: "0 0 38px 10px rgba(251, 146, 60, 0.6)",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
