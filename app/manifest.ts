import type { MetadataRoute } from "next";
import {
  BRAND_BG,
  BRAND_COLOR,
  SITE_DESCRIPTION_SHORT,
  SITE_NAME,
  SITE_SHORT_NAME,
} from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_SHORT_NAME,
    description: SITE_DESCRIPTION_SHORT,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: BRAND_BG,
    theme_color: BRAND_COLOR,
    categories: ["utilities", "lifestyle", "education"],
    icons: [
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Check a message",
        short_name: "Check",
        description: "Run a new scam check",
        url: "/check",
      },
      {
        name: "Common scams",
        short_name: "Scams",
        description: "Browse common scam patterns",
        url: "/scams",
      },
    ],
  };
}
