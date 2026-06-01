import { ImageResponse } from "next/og";
import { OgFrame } from "@/components/og/OgFrame";

export const alt =
  "Is this a scam? — A free scam checker that tells you what to verify before you pay.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <OgFrame
        eyebrow="Check before you pay"
        title={
          <span>
            Not sure if a message
            <br />
            is a{" "}
            <span style={{ fontFamily: "serif", fontStyle: "italic" }}>
              scam?
            </span>
          </span>
        }
        subtitle="Paste the message. Get a clear read on scam warning signs in seconds."
        accent="warm"
      />
    ),
    { ...size },
  );
}
