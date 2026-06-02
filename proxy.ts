import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Next.js 16 renamed `middleware` → `proxy`. next-intl's middleware factory
 * returns a function with the same `(req) => res` signature, so we just
 * re-export it as `proxy`.
 */
export const proxy = createIntlMiddleware(routing);

export const config = {
  // Skip Next internals, API routes, files with an extension, and the
  // metadata files we own at the root. Everything else passes through the
  // i18n middleware so /he/... and /tr/... resolve, and root URLs keep
  // serving English without rewrites.
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*|sitemap.xml|robots.txt|manifest.webmanifest|icon|apple-icon|opengraph-image|twitter-image).*)",
  ],
};
