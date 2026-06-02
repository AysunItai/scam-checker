import { ImageResponse } from "next/og";
import { OgFrame } from "@/components/og/OgFrame";
import { allGuideSlugs, isScamGuideSlug } from "@/lib/scamGuides";
import { resolveGuide } from "@/lib/guides";
import { routing, type Locale } from "@/i18n/routing";

export const alt = "Scam guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  const slugs = allGuideSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((guide) => ({ locale, guide })),
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; guide: string }>;
}) {
  const { locale, guide } = await params;
  if (!isScamGuideSlug(guide)) {
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

  const safeLocale = (routing.locales as readonly string[]).includes(locale)
    ? (locale as Locale)
    : routing.defaultLocale;

  const g = resolveGuide(guide, safeLocale);
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
  if (s.length <= 70) return s;
  return s.slice(0, 67).trimEnd() + "…";
}
