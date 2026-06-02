import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { GlowBg } from "@/components/GlowBg";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { HOMEPAGE_FEATURE_SLUGS as HOMEPAGE_SLUGS } from "@/lib/scamGuides";
import { resolveGuide } from "@/lib/guides";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  // For the default locale (en) we serve the home at "/" without a prefix.
  // For other locales we use "/he" / "/tr" (no trailing slash) to stay
  // consistent with hreflang values across the whole site.
  const canonical = locale === routing.defaultLocale ? "/" : `/${locale}`;
  return {
    title: { absolute: `${t("siteName")} — ${t("tagline")}` },
    description: t("siteDescription"),
    alternates: {
      canonical,
      languages: {
        en: "/",
        he: "/he",
        tr: "/tr",
        "x-default": "/",
      },
    },
    openGraph: {
      title: `${t("siteName")} — ${t("tagline")}`,
      description: t("siteDescriptionShort"),
      url: canonical,
    },
    twitter: {
      title: `${t("siteName")} — ${t("tagline")}`,
      description: t("siteDescriptionShort"),
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <HomeContent locale={locale as Locale} />;
}

function HomeContent({ locale }: { locale: Locale }) {
  const t = useTranslations("home");
  const tFeatures = useTranslations("homeFeatures");

  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <GlowBg variant="warm" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-16 sm:pt-24 pb-20 sm:pb-28">
          <Reveal>
            <span className="chip">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] animate-pulse-dot" />
              {t("eyebrow")}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 max-w-4xl text-[36px] sm:text-[56px] md:text-[68px] lg:text-[84px] leading-[1.04] sm:leading-[1.02] tracking-[-0.025em] font-medium">
              {t("h1Pre")}{" "}
              <span className="font-serif-display text-[color:var(--foreground)]">
                {t("h1Mid")}
              </span>{" "}
              <span className="text-[color:var(--muted)]">{t("h1Post")}</span>{" "}
              <span className="font-serif-display text-[color:var(--accent)]">
                {t("h1Accent")}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
              {t("subhead")}
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link href="/check" className="btn-primary">
                {t("ctaPrimary")}
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
              <Link href="/scams" className="btn-ghost">
                {t("ctaSecondary")}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-[color:var(--muted-2)]">
              <span className="inline-flex items-center gap-2">
                <Tick />
                {t("trust.noAccount")}
              </span>
              <span className="inline-flex items-center gap-2">
                <Tick />
                {t("trust.freeAlways")}
              </span>
              <span className="inline-flex items-center gap-2">
                <Tick />
                {t("trust.saferTogether")}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted-2)]">
              {t("howEyebrow")}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-3 max-w-3xl text-[28px] sm:text-4xl md:text-5xl tracking-tight font-medium leading-[1.08]">
              {t("howTitle")}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 max-w-2xl text-[color:var(--muted)] leading-7">
              {t("howIntro")}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                title: t("stepOneTitle"),
                body: t("stepOneBody"),
              },
              {
                title: t("stepTwoTitle"),
                body: t("stepTwoBody"),
              },
              {
                title: t("stepThreeTitle"),
                body: t("stepThreeBody"),
              },
            ].map((s, i) => (
              <Reveal key={s.title} delay={100 + i * 100}>
                <div className="card h-full">
                  <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--muted-2)]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-xl font-medium tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-7 text-[color:var(--muted)]">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RED FLAGS STRIP */}
      <section className="relative bg-[color:var(--surface-2)] border-y border-[color:var(--border)]">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] items-start">
            <div>
              <Reveal>
                <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted-2)]">
                  {t("redFlagsEyebrow")}
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-3 text-[28px] sm:text-3xl md:text-4xl tracking-tight font-medium leading-[1.12]">
                  {t("redFlagsTitle")}
                </h2>
              </Reveal>
            </div>

            <RedFlagsList />
          </div>
        </div>
      </section>

      {/* COMMON SCAMS PEOPLE CHECK */}
      <section aria-labelledby="home-guides-heading" className="relative">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted-2)]">
              {t("guidesEyebrow")}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              id="home-guides-heading"
              className="mt-3 max-w-3xl text-[28px] sm:text-4xl md:text-5xl tracking-tight font-medium leading-[1.08]"
            >
              {t("guidesTitle")}{" "}
              <span className="font-serif-display text-[color:var(--muted)]">
                {t("guidesTitleAccent")}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 max-w-2xl text-[16px] sm:text-[17px] leading-8 text-[color:var(--muted)]">
              {t("guidesIntro")}
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HOMEPAGE_SLUGS.map((slug, i) => {
              const guide = resolveGuide(slug, locale);
              return (
                <li key={slug}>
                  <Reveal delay={120 + i * 70}>
                    <Link
                      href={`/${slug}`}
                      aria-label={`${tFeatures(`${slug}.label`)}`}
                      className="card group relative h-full block"
                    >
                      <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--muted-2)]">
                        {guide.category}
                      </p>
                      <h3 className="mt-2 text-xl sm:text-[22px] font-medium tracking-tight leading-snug">
                        {tFeatures(`${slug}.label`)}
                      </h3>
                      <p className="mt-2.5 text-[15px] leading-7 text-[color:var(--muted)]">
                        {tFeatures(`${slug}.blurb`)}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-[color:var(--foreground)]">
                        <ReadGuideLabel />
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
                  </Reveal>
                </li>
              );
            })}
          </ul>

          <Reveal delay={120 + HOMEPAGE_SLUGS.length * 70 + 80}>
            <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Link href="/scams" className="btn-ghost">
                <ViewAllLabel />
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
              <p className="text-xs text-[color:var(--muted-2)] sm:ms-2">
                {t("guidesNote")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden">
        <GlowBg variant="cool" />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8 py-24 text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted-2)]">
              {t("ctaEyebrow")}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 text-[32px] sm:text-5xl md:text-6xl tracking-tight font-medium leading-[1.08]">
              {t("ctaTitlePre")}{" "}
              <span className="font-serif-display text-[color:var(--accent)]">
                {t("ctaTitleAccent")}
              </span>{" "}
              {t("ctaTitlePost")}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 text-lg text-[color:var(--muted)] leading-8 max-w-2xl mx-auto">
              {t("ctaSubhead")}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/check" className="btn-primary">
                {t("ctaButtonPrimary")}
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
              <Link href="/scams" className="btn-ghost">
                {t("ctaButtonSecondary")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function RedFlagsList() {
  const t = useTranslations("home");
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {(t.raw("redFlags") as string[]).map((f, i) => (
        <Reveal key={f} delay={i * 60}>
          <li className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3.5 text-sm flex items-start gap-3">
            <span
              aria-hidden
              className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]"
            />
            <span>{f}</span>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}

function ReadGuideLabel() {
  const t = useTranslations("common");
  return <>{t("readGuide")}</>;
}

function ViewAllLabel() {
  const t = useTranslations("common");
  return <>{t("viewAllGuides")}</>;
}

function Tick() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
