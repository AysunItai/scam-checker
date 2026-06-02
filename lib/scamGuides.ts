/**
 * Scam guide registry — STRUCTURAL ONLY.
 *
 * This file holds the language-agnostic skeleton of each guide:
 *   - slug (URL — same across all locales for SEO continuity)
 *   - channel (which chat surface the example is rendered as)
 *   - severity (visual accent)
 *   - related slugs (internal linking)
 *   - homepage features (curated subset)
 *
 * All translatable copy (h1, subhead, example bubbles, red flags, etc.) lives
 * in `lib/guides/{en,he,tr}.ts`. Resolve a fully-typed guide via
 * `getGuide(slug, locale)`.
 *
 * Editorial rules (do not break in any language):
 *   - Never say "safe". Never say "not a scam".
 *   - Always frame results as: high risk / suspicious / unclear / lower risk — verify.
 *   - Calm, protective, plain language. No fearmongering, no sales talk.
 */

export type ScamGuideSlug =
  | "is-this-a-scam"
  | "pay-fee-to-receive-money-scam"
  | "money-waiting-scam"
  | "fake-bank-call"
  | "otp-code-scam"
  | "whatsapp-scam"
  | "facebook-marketplace-scam"
  | "romance-money-scam"
  | "fake-job-task-scam"
  | "package-delivery-fee-scam"
  | "crypto-recovery-scam";

export type ChannelKind =
  | "phone"
  | "whatsapp"
  | "sms"
  | "email"
  | "website"
  | "social";

export type ScamGuideSeverity = "high" | "sus" | "unclear";

export interface ScamGuideStructure {
  slug: ScamGuideSlug;
  channel: ChannelKind;
  severity: ScamGuideSeverity;
  related: ScamGuideSlug[];
}

export const SCAM_GUIDE_STRUCTURES: Record<ScamGuideSlug, ScamGuideStructure> = {
  "is-this-a-scam": {
    slug: "is-this-a-scam",
    channel: "phone",
    severity: "high",
    related: ["pay-fee-to-receive-money-scam", "fake-bank-call", "otp-code-scam"],
  },
  "pay-fee-to-receive-money-scam": {
    slug: "pay-fee-to-receive-money-scam",
    channel: "whatsapp",
    severity: "high",
    related: ["money-waiting-scam", "crypto-recovery-scam", "is-this-a-scam"],
  },
  "money-waiting-scam": {
    slug: "money-waiting-scam",
    channel: "phone",
    severity: "high",
    related: [
      "pay-fee-to-receive-money-scam",
      "fake-bank-call",
      "is-this-a-scam",
    ],
  },
  "fake-bank-call": {
    slug: "fake-bank-call",
    channel: "phone",
    severity: "high",
    related: ["otp-code-scam", "is-this-a-scam", "money-waiting-scam"],
  },
  "otp-code-scam": {
    slug: "otp-code-scam",
    channel: "sms",
    severity: "high",
    related: ["fake-bank-call", "whatsapp-scam", "is-this-a-scam"],
  },
  "whatsapp-scam": {
    slug: "whatsapp-scam",
    channel: "whatsapp",
    severity: "high",
    related: ["otp-code-scam", "fake-job-task-scam", "is-this-a-scam"],
  },
  "facebook-marketplace-scam": {
    slug: "facebook-marketplace-scam",
    channel: "social",
    severity: "sus",
    related: ["package-delivery-fee-scam", "whatsapp-scam", "is-this-a-scam"],
  },
  "romance-money-scam": {
    slug: "romance-money-scam",
    channel: "whatsapp",
    severity: "high",
    related: ["is-this-a-scam", "crypto-recovery-scam", "whatsapp-scam"],
  },
  "fake-job-task-scam": {
    slug: "fake-job-task-scam",
    channel: "whatsapp",
    severity: "high",
    related: ["whatsapp-scam", "crypto-recovery-scam", "is-this-a-scam"],
  },
  "package-delivery-fee-scam": {
    slug: "package-delivery-fee-scam",
    channel: "sms",
    severity: "high",
    related: ["facebook-marketplace-scam", "is-this-a-scam", "fake-bank-call"],
  },
  "crypto-recovery-scam": {
    slug: "crypto-recovery-scam",
    channel: "email",
    severity: "high",
    related: [
      "romance-money-scam",
      "fake-job-task-scam",
      "pay-fee-to-receive-money-scam",
    ],
  },
};

/**
 * Six curated slugs featured on the homepage, in display order.
 * The card label & blurb are translated in `messages/<locale>.json` under
 * `homeFeatures.<slug>`.
 */
export const HOMEPAGE_FEATURE_SLUGS: ScamGuideSlug[] = [
  "pay-fee-to-receive-money-scam",
  "fake-bank-call",
  "otp-code-scam",
  "whatsapp-scam",
  "package-delivery-fee-scam",
  "fake-job-task-scam",
];

export function allGuideSlugs(): ScamGuideSlug[] {
  return Object.keys(SCAM_GUIDE_STRUCTURES) as ScamGuideSlug[];
}

export function isScamGuideSlug(value: string): value is ScamGuideSlug {
  return value in SCAM_GUIDE_STRUCTURES;
}
