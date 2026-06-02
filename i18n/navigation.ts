import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation helpers.
 * Use these instead of `next/link` / `next/navigation` inside the app so
 * locale prefixes are applied automatically (and never doubled).
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
