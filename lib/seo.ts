/**
 * Single source of truth for SEO and site identity.
 *
 * Override at deploy time:
 *   NEXT_PUBLIC_SITE_URL=https://isthisascam.app
 *   NEXT_PUBLIC_SITE_NAME="Is this a scam?"
 *   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=...
 *   NEXT_PUBLIC_BING_SITE_VERIFICATION=...
 *   NEXT_PUBLIC_YANDEX_VERIFICATION=...
 *   NEXT_PUBLIC_TWITTER_HANDLE=@isthisascam
 */

const stripTrailingSlash = (s: string) => s.replace(/\/+$/, "");

export const SITE_URL = stripTrailingSlash(
  process.env.NEXT_PUBLIC_SITE_URL || "https://isthisascam.app",
);

export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Is this a scam?";

export const SITE_SHORT_NAME = "scam check";

export const SITE_TAGLINE = "Check before you pay.";

export const SITE_DESCRIPTION =
  "A free scam checker. Paste a suspicious message or describe a phone call — we look for scam warning signs and tell you exactly what to verify before you send money or share private details.";

export const SITE_DESCRIPTION_SHORT =
  "Paste a suspicious message. Get a clear read on scam risk before you pay.";

export const TWITTER_HANDLE =
  process.env.NEXT_PUBLIC_TWITTER_HANDLE || "@isthisascam";

export const KEYWORDS = [
  "scam checker",
  "is this a scam",
  "scam detector",
  "fraud check",
  "phishing checker",
  "WhatsApp scam check",
  "phone scam checker",
  "SMS scam",
  "fake bank call",
  "advance fee scam",
  "money waiting scam",
  "social insurance scam",
  "romance scam",
  "investment scam",
  "package delivery scam",
  "gift card scam",
  "OTP scam",
  "AnyDesk scam",
  "scam warning signs",
  "stop a scam",
];

export const BRAND_COLOR = "#0b1220";
export const BRAND_ACCENT = "#c2410c";
export const BRAND_BG = "#fafaf7";

export const VERIFICATION = {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
  other: {
    "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || undefined,
  } as Record<string, string | undefined>,
};

export const BUILT_BY = {
  name: "ItaiWebSolutions",
  url: process.env.NEXT_PUBLIC_BUILT_BY_URL || "https://itaiwebsolutions.com",
};

export const POWERED_BY = {
  name: "ISOON AI tools",
  url: process.env.NEXT_PUBLIC_POWERED_BY_URL || "https://www.isoon.io/",
};

export const ORG = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  sameAs: [] as string[],
  creator: {
    "@type": "Organization",
    name: BUILT_BY.name,
    url: BUILT_BY.url,
  },
};

export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "en",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/check?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export function absoluteUrl(path: string = "/") {
  if (!path.startsWith("/")) path = "/" + path;
  return `${SITE_URL}${path}`;
}
