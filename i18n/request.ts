import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

/**
 * next-intl request config. Loads the message catalog for the requested locale
 * on the server. Catalogs are static JSON files in /messages so safety wording
 * is fully controlled — never machine-translated at runtime.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    // Static dates everywhere — no time zone surprises.
    timeZone: "Europe/Istanbul",
    now: new Date(),
  };
});
