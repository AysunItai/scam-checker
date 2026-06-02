import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { GoogleAnalytics } from "@next/third-parties/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/JsonLd";
import { htmlLang, localeDirection, routing, type Locale } from "@/i18n/routing";
import {
  ANALYTICS_ENABLED,
  BRAND_BG,
  BRAND_COLOR,
  BUILT_BY,
  GA_MEASUREMENT_ID,
  KEYWORDS,
  POWERED_BY,
  SITE_URL,
  TWITTER_HANDLE,
  VERIFICATION,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: "meta" });
  const siteName = t("siteName");
  const tagline = t("tagline");
  const description = t("siteDescription");
  const descriptionShort = t("siteDescriptionShort");
  const ogLocale =
    locale === "en" ? "en_US" : locale === "he" ? "he_IL" : "tr_TR";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${siteName} — ${tagline}`,
      template: `%s · ${siteName}`,
    },
    description,
    applicationName: siteName,
    generator: "Next.js",
    keywords: KEYWORDS,
    authors: [{ name: BUILT_BY.name, url: BUILT_BY.url }],
    creator: BUILT_BY.name,
    publisher: siteName,
    other: {
      designer: BUILT_BY.name,
      "powered-by": POWERED_BY.name,
    },
    category: "Safety",
    referrer: "origin-when-cross-origin",
    formatDetection: { email: false, address: false, telephone: false },
    // NB: alternates (canonical + hreflang) are set per-page. Every page
    // explicitly owns its own canonical and hreflang map so search engines
    // never see the layout's defaults leaking into a sub-route.
    openGraph: {
      type: "website",
      siteName,
      title: `${siteName} — ${tagline}`,
      description: descriptionShort,
      locale: ogLocale,
      alternateLocale: ["en_US", "he_IL", "tr_TR"].filter((l) => l !== ogLocale),
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: `${siteName} — ${tagline}`,
      description: descriptionShort,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: {
      google: VERIFICATION.google,
      yandex: VERIFICATION.yandex,
      other: Object.fromEntries(
        Object.entries(VERIFICATION.other).filter(([, v]) => Boolean(v)),
      ) as Record<string, string>,
    },
    appleWebApp: {
      capable: true,
      title: siteName,
      statusBarStyle: "black-translucent",
    },
    manifest: "/manifest.webmanifest",
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: BRAND_BG },
    { media: "(prefers-color-scheme: dark)", color: BRAND_COLOR },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Enables static rendering for this locale
  setRequestLocale(locale);

  const messages = await getMessages();
  const lang = htmlLang[locale as Locale];
  const dir = localeDirection[locale as Locale];

  // Localised "skip to content" — fetched via translations for accessibility.
  const t = await getTranslations({ locale, namespace: "common" });
  const skipLabel = t("skipToContent");

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <OrganizationJsonLd />
          <WebSiteJsonLd />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-50 focus:rounded-full focus:bg-[color:var(--foreground)] focus:text-[color:var(--background)] focus:px-4 focus:py-2 focus:text-sm"
          >
            {skipLabel}
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
        {ANALYTICS_ENABLED && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
      </body>
    </html>
  );
}
