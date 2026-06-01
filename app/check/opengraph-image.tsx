import { ImageResponse } from "next/og";
import { OgFrame } from "@/components/og/OgFrame";

export const alt = "Check a message — Is this a scam?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <OgFrame
        eyebrow="Step by step"
        title={
          <span>
            Let&apos;s look at it
            <br />
            <span style={{ fontFamily: "serif", fontStyle: "italic" }}>
              together.
            </span>
          </span>
        }
        subtitle="Four quick questions. Honest read. One tap to forward it to someone you trust."
        accent="cool"
      />
    ),
    { ...size },
  );
}
