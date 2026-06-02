import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { GlowBg } from "@/components/GlowBg";
import { Link } from "@/i18n/navigation";
import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  ScamCatalogJsonLd,
} from "@/components/JsonLd";
import { allGuideSlugs } from "@/lib/scamGuides";
import { resolveGuide } from "@/lib/guides";
import { routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "scams" });
  const meta = await getTranslations({ locale, namespace: "meta" });
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return {
    title: t("eyebrow"),
    description: t("subhead"),
    alternates: {
      canonical: `${prefix}/scams`,
      languages: {
        en: "/scams",
        he: "/he/scams",
        tr: "/tr/scams",
        "x-default": "/scams",
      },
    },
    openGraph: {
      title: `${t("h1Pre")} ${t("h1Accent")} — ${meta("siteName")}`,
      description: t("subhead"),
      url: `${prefix}/scams`,
    },
    twitter: {
      title: `${t("h1Pre")} ${t("h1Accent")} — ${meta("siteName")}`,
      description: t("subhead"),
    },
  };
}

export default async function ScamsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;

  const t = await getTranslations({ locale, namespace: "scams" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const slugs = allGuideSlugs();
  const guides = slugs.map((slug) => resolveGuide(slug, locale));

  return (
    <div className="relative">
      <ScamCatalogJsonLd
        name={t("eyebrow")}
        items={guides.map((g) => ({
          name: g.h1,
          description: g.subhead,
          slug: g.slug,
        }))}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: locale === routing.defaultLocale ? "/" : `/${locale}` },
          {
            name: t("eyebrow"),
            href: locale === routing.defaultLocale ? "/scams" : `/${locale}/scams`,
          },
        ]}
      />
      <FaqJsonLd
        questions={guides.map((g) => ({
          q: `${g.h1}?`,
          a: `${g.plain.join(" ")} ${g.redFlags.join(" ")}`,
        }))}
      />

      {/* Hero */}
      <section
        aria-labelledby="scams-heading"
        className="relative overflow-hidden border-b border-[color:var(--border)]"
      >
        <GlowBg variant="cool" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-16 sm:pt-24 pb-14 sm:pb-16">
          <Reveal>
            <span className="chip">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] animate-pulse-dot" />
              {t("eyebrow")}
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1
              id="scams-heading"
              className="mt-5 text-[32px] sm:text-5xl md:text-6xl tracking-tight font-medium leading-[1.08] max-w-4xl"
            >
              {t("h1Pre")}{" "}
              <span className="font-serif-display text-[color:var(--muted)]">
                {t("h1Accent")}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 max-w-2xl text-[17px] leading-8 text-[color:var(--muted)]">
              {t("subhead")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Primary content — all guides */}
      <section aria-labelledby="all-guides-heading" className="relative">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
          <div className="flex items-end justify-between flex-wrap gap-3">
            <div>
              <Reveal>
                <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted-2)]">
                  {t("allGuidesEyebrow")}
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h2
                  id="all-guides-heading"
                  className="mt-3 text-[26px] sm:text-3xl md:text-4xl tracking-tight font-medium leading-[1.12] max-w-3xl"
                >
                  {t("allGuidesTitle")}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <Link href="/check" className="link-anim text-sm">
                {tCommon("checkOwnMessage")}
              </Link>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <ul
              role="list"
              className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {guides.map((g, i) => (
                <li key={g.slug}>
                  <Link
                    href={`/${g.slug}`}
                    aria-label={`${tCommon("readGuide")}: ${g.category}`}
                    className="card group h-full block transition-transform hover:-translate-y-0.5"
                  >
                    <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--muted-2)]">
                      {String(i + 1).padStart(2, "0")} · {g.category}
                    </p>
                    <h3 className="mt-2 text-lg sm:text-xl tracking-tight font-medium leading-snug">
                      {g.h1}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--muted)] line-clamp-3">
                      {g.subhead}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-[color:var(--foreground)]">
                      {tCommon("readGuide")}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180"
                        aria-hidden
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-[color:var(--border)]">
        <GlowBg variant="warm" />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8 py-20 sm:py-24 text-center">
          <Reveal>
            <h2 className="text-[30px] sm:text-4xl md:text-5xl tracking-tight font-medium leading-[1.08]">
              {t("finalCtaTitle")}{" "}
              <span className="font-serif-display text-[color:var(--muted)]">
                {t("finalCtaAccent")}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-5 text-[17px] leading-8 text-[color:var(--muted)] max-w-xl mx-auto">
              {t("finalCtaBody")}
            </p>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-9">
              <Link href="/check" className="btn-primary">
                {tCommon("checkMessage")}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="rtl:rotate-180"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
