import { ImageResponse } from "next/og";
import { OgFrame } from "@/components/og/OgFrame";

export const alt = "Common scams — Is this a scam?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <OgFrame
        eyebrow="The playbooks"
        title={
          <span>
            The same scams,
            <br />
            <span style={{ fontFamily: "serif", fontStyle: "italic" }}>
              on repeat.
            </span>
          </span>
        }
        subtitle="Fake bank calls, money-waiting fees, romance scams, package fees, investment groups — all explained in plain words."
        accent="red"
      />
    ),
    { ...size },
  );
}
