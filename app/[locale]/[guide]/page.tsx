import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ScamGuidePage } from "@/components/guide/ScamGuidePage";
import { BreadcrumbJsonLd, JsonLd } from "@/components/JsonLd";
import {
  allGuideSlugs,
  isScamGuideSlug,
} from "@/lib/scamGuides";
import { resolveGuide, getRelatedGuides } from "@/lib/guides";
import { routing, type Locale, htmlLang } from "@/i18n/routing";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = allGuideSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((guide) => ({ locale, guide })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; guide: string }>;
}): Promise<Metadata> {
  const { locale, guide } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  if (!isScamGuideSlug(guide)) return {};
  const g = resolveGuide(guide, locale as Locale);
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return {
    title: g.title,
    description: g.description,
    alternates: {
      canonical: `${prefix}/${g.slug}`,
      languages: {
        en: `/${g.slug}`,
        he: `/he/${g.slug}`,
        tr: `/tr/${g.slug}`,
        "x-default": `/${g.slug}`,
      },
    },
    openGraph: {
      title: g.ogTitle,
      description: g.ogDescription,
      url: `${prefix}/${g.slug}`,
      type: "article",
    },
    twitter: {
      title: g.ogTitle,
      description: g.ogDescription,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string; guide: string }>;
}) {
  const { locale: rawLocale, guide } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  if (!isScamGuideSlug(guide)) notFound();
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;
  const g = resolveGuide(guide, locale);
  const related = getRelatedGuides(guide, locale);

  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const url = `${SITE_URL}${prefix}/${g.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.h1,
    description: g.description,
    inLanguage: htmlLang[locale],
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    image: `${url}/opengraph-image`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon`,
    },
    about: g.category,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `${g.h1}?`,
        acceptedAnswer: { "@type": "Answer", text: g.plain.join(" ") },
      },
      {
        "@type": "Question",
        name: g.category,
        acceptedAnswer: { "@type": "Answer", text: g.redFlags.join(" ") },
      },
    ],
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: locale === routing.defaultLocale ? "/" : `/${locale}` },
          {
            name: g.category,
            href: locale === routing.defaultLocale ? "/scams" : `/${locale}/scams`,
          },
          { name: g.h1, href: `${prefix}/${g.slug}` },
        ]}
      />
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <ScamGuidePage guide={g} related={related} />
    </>
  );
}
