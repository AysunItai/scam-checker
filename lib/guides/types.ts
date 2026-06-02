import type {
  ChannelKind,
  ScamGuideSeverity,
  ScamGuideSlug,
} from "../scamGuides";

export interface ExampleMessage {
  sender: string;
  timestamp: string;
  bubbles: string[];
}

export interface ScamGuideContent {
  category: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  h1: string;
  subhead: string;
  example: ExampleMessage;
  plain: string[];
  redFlags: string[];
  whatToDo: { dont: string[]; do: string[] };
  shareMessage: string;
}

/** A fully resolved guide = structure + locale content. */
export interface Guide extends ScamGuideContent {
  slug: ScamGuideSlug;
  channel: ChannelKind;
  severity: ScamGuideSeverity;
  related: ScamGuideSlug[];
}

export type GuideCatalog = Record<ScamGuideSlug, ScamGuideContent>;
