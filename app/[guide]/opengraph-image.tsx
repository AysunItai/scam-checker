import { ImageResponse } from "next/og";
import { OgFrame } from "@/components/og/OgFrame";
import { allGuideSlugs, getGuide } from "@/lib/scamGuides";

export const alt = "Scam guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return allGuideSlugs().map((guide) => ({ guide }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ guide: string }>;
}) {
  const { guide } = await params;
  const g = getGuide(guide);
  if (!g) {
    return new ImageResponse(
      (
        <OgFrame
          eyebrow="Scam guide"
          title={<span>Pause before you pay.</span>}
        />
      ),
      { ...size },
    );
  }

  const headline = trimToTwoLines(g.h1);
  const accent = g.severity === "sus" ? "warm" : "red";

  return new ImageResponse(
    (
      <OgFrame
        eyebrow={g.category}
        title={<span>{headline}</span>}
        subtitle={g.subhead}
        accent={accent}
      />
    ),
    { ...size },
  );
}

function trimToTwoLines(s: string): string {
  // OG art doesn't truncate text gracefully; soft cap.
  if (s.length <= 70) return s;
  return s.slice(0, 67).trimEnd() + "…";
}
