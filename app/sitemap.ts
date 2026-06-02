import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { allGuideSlugs } from "@/lib/scamGuides";
import { SITE_URL } from "@/lib/seo";
import { routing } from "@/i18n/routing";

/**
 * Sitemap is rendered per-request and uses the actual host header the
 * sitemap was fetched on. This guarantees URLs inside the sitemap match
 * the domain serving it — required by Google Search Console.
 *
 * Each entry advertises hreflang alternates for en/he/tr per Google's
 * "sitemap alternates" spec so search engines pick the right locale.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = await resolveBaseUrl();
  const now = new Date();
  const defaultLocale = routing.defaultLocale;

  function localized(path: string) {
    // path is "" (home) or "/something". Home always renders as just the
    // locale prefix (or "/" for English). Subpages get the path appended.
    const languages: Record<string, string> = {};
    for (const l of routing.locales) {
      const prefix = l === defaultLocale ? "" : `/${l}`;
      languages[l] = path
        ? `${baseUrl}${prefix}${path}`
        : prefix
          ? `${baseUrl}${prefix}`
          : `${baseUrl}/`;
    }
    languages["x-default"] = path ? `${baseUrl}${path}` : `${baseUrl}/`;
    const selfUrl = path ? `${baseUrl}${path}` : `${baseUrl}/`;
    return {
      url: selfUrl,
      lastModified: now,
      alternates: { languages },
    };
  }

  const core: MetadataRoute.Sitemap = [
    { ...localized(""), changeFrequency: "weekly", priority: 1.0 },
    { ...localized("/check"), changeFrequency: "monthly", priority: 0.95 },
    { ...localized("/scams"), changeFrequency: "weekly", priority: 0.9 },
    { ...localized("/about"), changeFrequency: "monthly", priority: 0.5 },
  ];

  const guides: MetadataRoute.Sitemap = allGuideSlugs().map((slug) => ({
    ...localized(`/${slug}`),
    changeFrequency: "monthly",
    priority: slug === "is-this-a-scam" ? 0.92 : 0.85,
  }));

  return [...core, ...guides];
}

async function resolveBaseUrl(): Promise<string> {
  try {
    const h = await headers();
    const host = h.get("x-forwarded-host") ?? h.get("host") ?? null;
    const protoRaw =
      h.get("x-forwarded-proto") ??
      (host?.startsWith("localhost") ? "http" : "https");
    const proto = protoRaw.split(",")[0].trim();
    if (host) return `${proto}://${host}`.replace(/\/+$/, "");
  } catch {
    /* fall through */
  }
  return SITE_URL;
}
