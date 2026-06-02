import { defineRouting } from "next-intl/routing";

/**
 * Locales supported by Don't Pay Yet.
 *
 * Slug URLs (e.g. `/is-this-a-scam`) intentionally stay in English across all
 * locales. The slug is the SEO anchor and is shared verbatim when a user
 * forwards a guide to a trusted person. Page CONTENT is translated.
 */
export const routing = defineRouting({
  locales: ["en", "he", "tr"] as const,
  defaultLocale: "en",
  // English keeps clean root URLs (e.g. /is-this-a-scam) — preserves existing
  // SEO and inbound links. Hebrew / Turkish are always prefixed (e.g. /he, /tr).
  localePrefix: "as-needed",
  // No localized pathnames — slugs are English everywhere by design.
});

export type Locale = (typeof routing.locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  he: "עברית",
  tr: "Türkçe",
};

/** Hebrew is right-to-left. English and Turkish are left-to-right. */
export const localeDirection: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  he: "rtl",
  tr: "ltr",
};

/** HTML `lang` attribute values. */
export const htmlLang: Record<Locale, string> = {
  en: "en",
  he: "he",
  tr: "tr",
};

export function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}
