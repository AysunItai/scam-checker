"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  localeLabels,
  type Locale,
  routing,
} from "@/i18n/routing";

/**
 * Minimal, text-based language switcher.
 *
 * Design rules:
 *   - No flags (avoids political mapping; some users speak a language outside
 *     their flag's country).
 *   - Native language names ("English", "עברית", "Türkçe").
 *   - Server preserves the current path when switching — a user on
 *     /he/fake-bank-call who picks Turkish lands on /tr/fake-bank-call.
 *   - Accessible: aria-haspopup menu, focus rings, ESC and outside-click close.
 */
export function LanguageSwitcher() {
  const t = useTranslations("languageSwitcher");
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  function changeLocale(nextLocale: Locale) {
    setIsOpen(false);
    if (nextLocale === currentLocale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t("label")}
        className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1.5 text-[13px] text-[color:var(--muted)] transition-colors hover:text-[color:var(--foreground)] hover:border-[color:var(--border-strong)] min-h-[40px] sm:min-h-0"
        disabled={isPending}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a14.5 14.5 0 0 1 0 18 14.5 14.5 0 0 1 0-18z" />
        </svg>
        <span>{localeLabels[currentLocale]}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label={t("label")}
          className="absolute end-0 mt-2 min-w-[160px] overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-lg z-50"
        >
          {routing.locales.map((locale) => {
            const isCurrent = locale === currentLocale;
            return (
              <li key={locale} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={isCurrent}
                  onClick={() => changeLocale(locale)}
                  className={`block w-full text-start px-4 py-2.5 text-sm transition-colors ${
                    isCurrent
                      ? "bg-[color:var(--surface-2)] text-[color:var(--foreground)] font-medium"
                      : "text-[color:var(--muted)] hover:bg-[color:var(--surface-2)] hover:text-[color:var(--foreground)]"
                  }`}
                  disabled={isPending}
                >
                  {localeLabels[locale]}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
