import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { OgFrame } from "@/components/og/OgFrame";
import { routing } from "@/i18n/routing";

export const alt = "Don't Pay Yet — pause before you pay.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safe = (routing.locales as readonly string[]).includes(locale)
    ? locale
    : routing.defaultLocale;
  const t = await getTranslations({ locale: safe, namespace: "home" });
  const meta = await getTranslations({ locale: safe, namespace: "meta" });

  return new ImageResponse(
    (
      <OgFrame
        eyebrow={meta("tagline")}
        title={<span>{`${t("h1Pre")} ${t("h1Mid")} ${t("h1Post")}`}</span>}
        subtitle={t("subhead")}
        accent="warm"
      />
    ),
    { ...size },
  );
}
