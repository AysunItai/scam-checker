import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 14,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 40,
            height: 40,
            borderRadius: 999,
            border: "2px solid rgba(255,255,255,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 6,
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#fb923c",
              boxShadow: "0 0 14px 4px rgba(251, 146, 60, 0.55)",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
