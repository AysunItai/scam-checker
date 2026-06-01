# Is this a scam?

A free, private scam checker. Users paste a suspicious message or describe a phone call, and the app tells them whether it shows scam warning signs — and what to verify before they pay.

Built with **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS v4**. No database. Pasted message content stays in the browser; only standard Google Analytics page-view data is collected (production only).

---

## Quick start

```bash
# Requires Node.js 20.9+
npm install
cp .env.example .env.local        # then fill in NEXT_PUBLIC_SITE_URL etc.
npm run dev                       # http://localhost:3000
```

```bash
npm run build && npm start        # production build
```

---

## Project structure

```
app/
  layout.tsx                root layout — metadata, viewport, JSON-LD
  page.tsx                  homepage
  check/page.tsx            4-step form
  result/page.tsx           reads sessionStorage, renders risk read
  scams/page.tsx            common scam playbooks
  about/page.tsx            mission + recovery steps
  icon.tsx                  generated 64×64 favicon
  apple-icon.tsx            generated 180×180 apple touch icon
  opengraph-image.tsx       generated 1200×630 OG card (root)
  twitter-image.tsx         generated 1200×630 Twitter card (root)
  {route}/opengraph-image.tsx   per-route OG cards
  sitemap.ts                programmatic XML sitemap
  robots.ts                 programmatic robots.txt
  manifest.ts               PWA web manifest
components/
  Header, Footer, Logo, Reveal, GlowBg, DisclaimerBox
  ScamCheckForm             4-step client form
  RiskResultCard            result card + reasons + side panel
  ShareToTrustedPerson      WhatsApp / SMS / Email / Copy share
  ScamTypeCard              common scam pattern card
  JsonLd                    Organization / WebSite / FAQ / Breadcrumb / ItemList
  og/OgFrame                shared OG layout
lib/
  seo.ts                    single source of truth for SEO config
  types.ts, options.ts      check input shape + labels
  riskEngine.ts             rule-based risk evaluator
  scamTypes.ts              scam-pattern catalogue
```

---

## SEO checklist (already wired up)

| Asset | Where | Notes |
| --- | --- | --- |
| Title template | `app/layout.tsx` | `%s · Is this a scam?` |
| Canonical URLs | Per page via `alternates.canonical` | |
| Description | Per page | Targeting high-intent scam keywords |
| OG image | `app/opengraph-image.tsx` + per-route | 1200×630, dynamically rendered, cached forever |
| Twitter card | `app/twitter-image.tsx` + per-route | `summary_large_image` |
| Favicon / Apple icon | `app/icon.tsx` + `app/apple-icon.tsx` | Custom brand mark, no Vercel logo |
| Sitemap | `/sitemap.xml` | `app/sitemap.ts` |
| Robots | `/robots.txt` | Disallows `/result` (private user data) |
| Web manifest | `/manifest.webmanifest` | PWA-installable, shortcuts to `/check` and `/scams` |
| Theme color | `app/layout.tsx` viewport | Light + dark variants |
| Skip-to-content link | `app/layout.tsx` | Accessibility |
| JSON-LD: Organization | Site-wide | Search engines understand the brand |
| JSON-LD: WebSite + SearchAction | Site-wide | Eligible for Google sitelinks search box |
| JSON-LD: FAQPage | `/scams` | Eligible for rich FAQ snippets in SERPs |
| JSON-LD: ItemList | `/scams` | Catalog of scam types |
| JSON-LD: BreadcrumbList | `/scams` | Pretty breadcrumb in SERPs |
| Security headers | `next.config.ts` | HSTS, XFO, Permissions-Policy, etc. |
| `noindex` on result | `app/result/page.tsx` | Never indexes user input |

---

## Setting up Google Search Console

1. Deploy the site (Vercel works out of the box — see below).
2. In **Google Search Console**: add your domain as a **URL prefix property** using the full `https://yourdomain.com`.
3. Choose **HTML tag** verification.
4. Copy ONLY the `content` value from the meta tag (the part inside the quotes after `content=`).
5. In Vercel → Project → **Environment Variables**, add:
   ```
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=YOUR_TOKEN_HERE
   ```
6. Redeploy.
7. Click **Verify** in Search Console.
8. Submit the sitemap: in Search Console → **Sitemaps** → enter `sitemap.xml`.

Repeat with `NEXT_PUBLIC_BING_SITE_VERIFICATION` for Bing Webmaster Tools and `NEXT_PUBLIC_YANDEX_VERIFICATION` for Yandex.

---

## Deploy to Vercel

```bash
npx vercel
```

Set the following environment variables in the Vercel dashboard:

```
NEXT_PUBLIC_SITE_URL              https://yourdomain.com   (required)
NEXT_PUBLIC_SITE_NAME             Is this a scam?
NEXT_PUBLIC_TWITTER_HANDLE        @yourhandle
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION   <verification token>
NEXT_PUBLIC_GA_MEASUREMENT_ID     G-XXXXXXXXXX            (Google Analytics 4)
```

### Google Analytics 4

Wired via `@next/third-parties/google` for lazy, non-blocking loading.

- Reads `NEXT_PUBLIC_GA_MEASUREMENT_ID` (default: `G-DG4ZK0TDPM`).
- **Only loads in production** (`NODE_ENV=production`) — your dev session won't pollute reports.
- Page-view tracking is automatic for App Router navigation.
- The Vercel deploy will pick this up the moment you set the env var.

To fire custom events later:

```ts
import { sendGAEvent } from "@next/third-parties/google";

sendGAEvent("event", "scam_check_submitted", {
  promise_type: "money_waiting",
  risk_level: "high",
});
```

> **Important:** `NEXT_PUBLIC_SITE_URL` must match your deployed domain exactly. The OG image, sitemap, canonical URLs, and JSON-LD all rely on it.

---

## Verifying SEO is working

After deploy:

| Check | URL |
| --- | --- |
| OG image renders | `https://yourdomain.com/opengraph-image` |
| Sitemap | `https://yourdomain.com/sitemap.xml` |
| Robots | `https://yourdomain.com/robots.txt` |
| Manifest | `https://yourdomain.com/manifest.webmanifest` |
| Rich result preview | https://search.google.com/test/rich-results |
| OG / Twitter preview | https://www.opengraph.xyz/ · https://cards-dev.twitter.com/validator |
| Lighthouse | Chrome DevTools → Lighthouse → run on production URL |

---

## Customising the risk engine

All rules live in `lib/riskEngine.ts`. Two layers:

1. **Pattern-matched scoring** over the pasted text (regex hits add points).
2. **Hard-high overrides** that force `high` regardless of score (OTP requested, gift cards, crypto, AnyDesk, "money waiting + pay first", "keep it secret + send money"…).

Edit the `KNOWN_PATTERNS` array to add new "matched playbook" labels for the result page.

To add a new scam playbook to `/scams`, append to `lib/scamTypes.ts`.

---

## License

Use it. Improve it. Share it. Make scams harder to run.
