import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { BUILT_BY, POWERED_BY } from "@/lib/seo";

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
  const t = await getTranslations({ locale, namespace: "about" });
  const meta = await getTranslations({ locale, namespace: "meta" });
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const title = `${t("h1Pre")} ${t("h1Accent")}`;
  return {
    title: t("eyebrow"),
    description: t("intro"),
    alternates: {
      canonical: `${prefix}/about`,
      languages: {
        en: "/about",
        he: "/he/about",
        tr: "/tr/about",
        "x-default": "/about",
      },
    },
    openGraph: {
      title: `${title} — ${meta("siteName")}`,
      description: t("intro"),
      url: `${prefix}/about`,
    },
    twitter: {
      title: `${title} — ${meta("siteName")}`,
      description: t("intro"),
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations("about");
  const tCommon = useTranslations("common");
  return (
    <div className="relative">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 pt-16 sm:pt-24 pb-20">
        <Reveal>
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] animate-pulse-dot" />
            {t("eyebrow")}
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-5 text-[30px] sm:text-5xl md:text-6xl tracking-tight font-medium leading-[1.08]">
            {t("h1Pre")}{" "}
            <span className="font-serif-display text-[color:var(--muted)]">
              {t("h1Accent")}
            </span>
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-7 text-[17px] leading-8 text-[color:var(--muted)]">
            {t("intro")}
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-12">
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted-2)]">
              {t("principlesEyebrow")}
            </p>
            <div className="mt-5 grid gap-4">
              <Block
                title={t("principleOneTitle")}
                body={t("principleOneBody")}
              />
              <Block
                title={t("principleTwoTitle")}
                body={t("principleTwoBody")}
              />
              <Block
                title={t("principleThreeTitle")}
                body={t("principleThreeBody")}
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-12 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-2)] p-7">
            <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--muted-2)]">
              {t("recoveryEyebrow")}
            </p>
            <p className="mt-3 text-[15px] leading-7 text-[color:var(--muted)]">
              {t("recoveryIntro")}
            </p>
            <ol className="mt-4 space-y-3 text-[15px] leading-7">
              <Step n={1}>{t("recoveryStep1")}</Step>
              <Step n={2}>{t("recoveryStep2")}</Step>
              <Step n={3}>{t("recoveryStep3")}</Step>
              <Step n={4}>{t("recoveryStep4")}</Step>
            </ol>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-12 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-7">
            <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--muted-2)]">
              {t("creditEyebrow")}
            </p>
            <p className="mt-3 text-[15px] leading-7 text-[color:var(--muted)]">
              {t("creditBody", {
                builtBy: BUILT_BY.name,
                poweredBy: POWERED_BY.name,
              })}
            </p>
          </div>
        </Reveal>

        <Reveal delay={340}>
          <div className="mt-12 flex flex-col sm:flex-row gap-3">
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
            <Link href="/scams" className="btn-ghost">
              {tCommon("browseScams")}
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div className="card">
      <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--muted-2)]">
        {title}
      </p>
      <p className="mt-2 text-[15px] leading-7 text-[color:var(--foreground)]">
        {body}
      </p>
    </div>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[color:var(--border-strong)] text-xs">
        {n}
      </span>
      <span>{children}</span>
    </li>
  );
}
