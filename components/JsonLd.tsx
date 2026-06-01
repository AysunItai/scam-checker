import { ORG, SITE_NAME, SITE_URL, WEBSITE_SCHEMA } from "@/lib/seo";
import { SCAM_TYPES } from "@/lib/scamTypes";

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function OrganizationJsonLd() {
  return <JsonLd data={ORG} />;
}

export function WebSiteJsonLd() {
  return <JsonLd data={WEBSITE_SCHEMA} />;
}

export function FaqJsonLd({
  questions,
}: {
  questions: { q: string; a: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: questions.map((x) => ({
          "@type": "Question",
          name: x.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: x.a,
          },
        })),
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((x, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: x.name,
          item: x.href.startsWith("http") ? x.href : `${SITE_URL}${x.href}`,
        })),
      }}
    />
  );
}

export function ScamCatalogJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `Common scams — ${SITE_NAME}`,
        itemListElement: SCAM_TYPES.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: s.title,
          description: s.short,
          url: `${SITE_URL}/scams#${s.id}`,
        })),
      }}
    />
  );
}
