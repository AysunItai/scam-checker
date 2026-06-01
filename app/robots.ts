import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { SITE_URL } from "@/lib/seo";

/**
 * Robots is rendered per-request so the sitemap URL it points to always
 * matches the host that served robots.txt.
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = await resolveBaseUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/result", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
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
    /* fall through */
  }
  return SITE_URL;
}
