import { ImageResponse } from "next/og";
import { OgFrame } from "@/components/og/OgFrame";

export const alt = "About — Is this a scam?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <OgFrame
        eyebrow="About"
        title={
          <span>
            Built to interrupt
            <br />
            the moment{" "}
            <span style={{ fontFamily: "serif", fontStyle: "italic" }}>
              before it&apos;s too late.
            </span>
          </span>
        }
        subtitle="Free, private, no account. A second opinion in the moments that matter."
        accent="cool"
      />
    ),
    { ...size },
  );
}
