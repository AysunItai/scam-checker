import type { Locale } from "@/i18n/routing";
import {
  SCAM_GUIDE_STRUCTURES,
  type ScamGuideSlug,
  type ScamGuideStructure,
} from "../scamGuides";
import { GUIDES_EN } from "./en";
import { GUIDES_HE } from "./he";
import { GUIDES_TR } from "./tr";
import type { Guide, GuideCatalog, ScamGuideContent } from "./types";

export type { Guide, ScamGuideContent } from "./types";

const CATALOGS: Record<Locale, GuideCatalog> = {
  en: GUIDES_EN,
  he: GUIDES_HE,
  tr: GUIDES_TR,
};

/**
 * Fetch the localised content for a single guide. Falls back to English if
 * the locale catalog is missing the slug (it never should — tests cover this).
 */
export function getGuideContent(
  slug: ScamGuideSlug,
  locale: Locale,
): ScamGuideContent {
  return CATALOGS[locale][slug] ?? CATALOGS.en[slug];
}

/** Combine structure + locale content into a fully-resolved guide. */
export function resolveGuide(
  slug: ScamGuideSlug,
  locale: Locale,
): Guide {
  const structure: ScamGuideStructure = SCAM_GUIDE_STRUCTURES[slug];
  const content = getGuideContent(slug, locale);
  return {
    slug: structure.slug,
    channel: structure.channel,
    severity: structure.severity,
    related: structure.related,
    ...content,
  };
}

/** Localised list of related guides for a given slug. */
export function getRelatedGuides(
  slug: ScamGuideSlug,
  locale: Locale,
): Guide[] {
  const structure = SCAM_GUIDE_STRUCTURES[slug];
  if (!structure) return [];
  return structure.related.map((s) => resolveGuide(s, locale));
}
