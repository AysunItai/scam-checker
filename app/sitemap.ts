import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { allGuideSlugs } from "@/lib/scamGuides";
import { SITE_URL } from "@/lib/seo";

/**
 * Sitemap is rendered per-request and uses the actual host header the
 * sitemap was fetched on. This guarantees URLs inside the sitemap match
 * the domain serving it — required by Google Search Console.
 *
 * Falls back to SITE_URL (env-driven) if no request headers are present
 * (e.g. local node tools).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = await resolveBaseUrl();
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/check`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/scams`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const guides: MetadataRoute.Sitemap = allGuideSlugs().map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: slug === "is-this-a-scam" ? 0.92 : 0.85,
  }));

  return [...core, ...guides];
}

async function resolveBaseUrl(): Promise<string> {
  try {
    const h = await headers();
    const host =
      h.get("x-forwarded-host") ?? h.get("host") ?? null;
    const protoRaw =
      h.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
    const proto = protoRaw.split(",")[0].trim();
    if (host) return `${proto}://${host}`.replace(/\/+$/, "");
  } catch {
    // headers() may throw at build time if called in an unsupported context
  }
  return SITE_URL;
}
