import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ScamGuidePage } from "@/components/guide/ScamGuidePage";
import {
  BreadcrumbJsonLd,
  JsonLd,
} from "@/components/JsonLd";
import {
  allGuideSlugs,
  getGuide,
  type ScamGuideSlug,
} from "@/lib/scamGuides";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return allGuideSlugs().map((guide) => ({ guide }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ guide: string }>;
}): Promise<Metadata> {
  const { guide } = await params;
  const g = getGuide(guide);
  if (!g) return {};
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: `/${g.slug}` },
    openGraph: {
      title: g.ogTitle,
      description: g.ogDescription,
      url: `/${g.slug}`,
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
  params: Promise<{ guide: string }>;
}) {
  const { guide } = await params;
  const g = getGuide(guide);
  if (!g) notFound();

  const url = `${SITE_URL}/${g.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.h1,
    description: g.description,
    inLanguage: "en",
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
        name: `What is the ${g.category.toLowerCase()}?`,
        acceptedAnswer: { "@type": "Answer", text: g.plain.join(" ") },
      },
      {
        "@type": "Question",
        name: `What are the warning signs of the ${g.category.toLowerCase()}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: g.redFlags.join(" "),
        },
      },
      {
        "@type": "Question",
        name: `What should I do if I receive this type of message?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Do not send money, share codes, or install remote-access apps. " +
            g.whatToDo.do.join(" "),
        },
      },
    ],
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Common scams", href: "/scams" },
          { name: g.category, href: `/${g.slug}` },
        ]}
      />
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <ScamGuidePage guide={g as { slug: ScamGuideSlug } & typeof g} />
    </>
  );
}
