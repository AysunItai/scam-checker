"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ShareToTrustedPerson } from "./ShareToTrustedPerson";
import type { CheckInput, CheckResult, RiskLevel } from "@/lib/types";

const STYLES: Record<
  RiskLevel,
  {
    badge: string;
    bg: string;
    border: string;
    icon: React.ReactNode;
    accent: string;
  }
> = {
  high: {
    badge: "text-[color:var(--risk-high)] bg-[color:var(--risk-high-soft)]",
    bg: "bg-[color:var(--risk-high-soft)]",
    border: "border-[color:var(--risk-high)]/30",
    accent: "var(--risk-high)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    ),
  },
  suspicious: {
    badge: "text-[color:var(--risk-sus)] bg-[color:var(--risk-sus-soft)]",
    bg: "bg-[color:var(--risk-sus-soft)]",
    border: "border-[color:var(--risk-sus)]/30",
    accent: "var(--risk-sus)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v5" />
        <path d="M12 16h.01" />
      </svg>
    ),
  },
  unclear: {
    badge: "text-[color:var(--risk-unclear)] bg-[color:var(--risk-unclear-soft)]",
    bg: "bg-[color:var(--risk-unclear-soft)]",
    border: "border-[color:var(--risk-unclear)]/30",
    accent: "var(--risk-unclear)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2-3 4" />
        <path d="M12 17h.01" />
      </svg>
    ),
  },
  low: {
    badge: "text-[color:var(--risk-low)] bg-[color:var(--risk-low-soft)]",
    bg: "bg-[color:var(--risk-low-soft)]",
    border: "border-[color:var(--risk-low)]/30",
    accent: "var(--risk-low)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
  },
};

export function RiskResultCard({
  result,
  input,
  matchedGuideLabel,
}: {
  result: CheckResult;
  input: CheckInput;
  /** Localised label for the matched guide, if any (resolved by the parent server component). */
  matchedGuideLabel?: string;
}) {
  const tLevels = useTranslations("risk.levels");
  const tReasons = useTranslations("risk.reasons");
  const tActions = useTranslations("risk.actions");
  const tRisk = useTranslations("risk");
  const tResult = useTranslations("result");

  const s = STYLES[result.level];
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [reasonsRevealed, setReasonsRevealed] = useState(0);

  const localisedReasons = result.reasonKeys.map((k) => tReasons(k));
  const localisedActions = result.actionKeys.map((k) => tActions(k));

  useEffect(() => {
    let cancelled = false;
    const total = localisedReasons.length;
    let i = 0;
    const id = setInterval(() => {
      if (cancelled) return;
      i += 1;
      setReasonsRevealed((prev) => (prev < total ? prev + 1 : prev));
      if (i >= total) clearInterval(id);
    }, 120);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [localisedReasons.length]);

  return (
    <div ref={cardRef} className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div
        className={`relative overflow-hidden rounded-3xl border ${s.border} ${s.bg} p-6 sm:p-9`}
      >
        <div className="flex items-center gap-3">
          <span
            className="inline-flex h-9 w-9 items-center justify-center rounded-full"
            style={{ color: `color-mix(in oklab, ${s.accent} 90%, black)` }}
          >
            {s.icon}
          </span>
        </div>
        <h1 className="mt-4 text-[28px] sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.08]">
          {tLevels(`${result.level}.title`)}
        </h1>
        <p className="mt-3 max-w-xl text-[15px] sm:text-base leading-7 text-[color:var(--foreground)]/85">
          {tLevels(`${result.level}.summary`)}
        </p>

        {result.matchedGuideSlug && matchedGuideLabel && (
          <Link
            href={`/${result.matchedGuideSlug}`}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-[color:var(--foreground)]/20 bg-[color:var(--surface)] px-3.5 py-1.5 text-xs text-[color:var(--foreground)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] animate-pulse-dot" />
            {tResult("matchedPattern", { name: matchedGuideLabel })}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="rtl:rotate-180"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        )}

        {localisedReasons.length > 0 && (
          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--muted)]">
              {tRisk("reasonsHeading")}
            </p>
            <ul className="mt-3 space-y-2.5">
              {localisedReasons.map((r, i) => (
                <li
                  key={r}
                  className="flex items-start gap-3 transition-all duration-500"
                  style={{
                    opacity: i < reasonsRevealed ? 1 : 0,
                    transform:
                      i < reasonsRevealed ? "translateY(0)" : "translateY(6px)",
                  }}
                >
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: s.accent }}
                  />
                  <span className="text-[15px] leading-7">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="card">
          <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--muted)]">
            {tRisk("whatToDoHeading")}
          </p>
          <ul className="mt-3 space-y-3">
            {localisedActions.map((step, i) => (
              <li
                key={step}
                className="flex items-start gap-3 text-[15px] leading-7"
              >
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[color:var(--border-strong)] text-xs">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <ShareToTrustedPerson
          input={input}
          reasons={localisedReasons}
        />

        <Link
          href="/check"
          className="block text-center text-sm text-[color:var(--muted)] hover:text-[color:var(--foreground)] transition-colors"
        >
          ← {tResult("tryAgain")}
        </Link>
      </div>
    </div>
  );
}
