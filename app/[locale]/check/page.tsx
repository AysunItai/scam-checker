import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { ScamCheckForm } from "@/components/ScamCheckForm";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { routing } from "@/i18n/routing";

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
  const t = await getTranslations({ locale, namespace: "check" });
  const meta = await getTranslations({ locale, namespace: "meta" });
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const title = `${t("h1Pre")} ${t("h1Accent")}`;
  return {
    title: t("eyebrow"),
    description: t("subhead"),
    alternates: {
      canonical: `${prefix}/check`,
      languages: {
        en: "/check",
        he: "/he/check",
        tr: "/tr/check",
        "x-default": "/check",
      },
    },
    openGraph: {
      title: `${title} — ${meta("siteName")}`,
      description: t("subhead"),
      url: `${prefix}/check`,
    },
    twitter: {
      title: `${title} — ${meta("siteName")}`,
      description: t("subhead"),
    },
  };
}

export default async function CheckPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <CheckContent />;
}

function CheckContent() {
  const t = useTranslations("check");
  return (
    <div className="relative">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 pt-14 sm:pt-20 pb-16">
        <Reveal>
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] animate-pulse-dot" />
            {t("eyebrow")}
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-5 text-[32px] sm:text-5xl md:text-6xl tracking-tight font-medium leading-[1.08]">
            {t("h1Pre")}{" "}
            <span className="font-serif-display text-[color:var(--muted)]">
              {t("h1Accent")}
            </span>
          </h1>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-4 text-[17px] leading-8 text-[color:var(--muted)] max-w-2xl">
            {t("subhead")}
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-10">
            <ScamCheckForm />
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-8">
            <DisclaimerBox />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
