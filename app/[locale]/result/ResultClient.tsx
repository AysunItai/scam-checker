"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { evaluate } from "@/lib/riskEngine";
import { RiskResultCard } from "@/components/RiskResultCard";
import {
  ASKED_FOR_KEY,
  CHANNEL_KEY,
  PROMISE_KEY,
} from "@/lib/options";
import type { CheckInput, CheckResult } from "@/lib/types";

const STORAGE_KEY = "scam_check_input";

export function ResultClient() {
  const t = useTranslations("result");
  const tChannels = useTranslations("check.channels");
  const tAsked = useTranslations("check.askedFor");
  const tPromises = useTranslations("check.promises");
  const tHome = useTranslations("homeFeatures");

  const [state, setState] = useState<{ input: CheckInput; result: CheckResult } | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setLoaded(true);
        return;
      }
      const input = JSON.parse(raw) as CheckInput;
      const result = evaluate(input);
      setState({ input, result });
    } catch {
      // ignore
    } finally {
      setLoaded(true);
    }
  }, []);

  if (!loaded) {
    return (
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-24">
        <div className="h-8 w-44 rounded bg-[color:var(--surface-2)] animate-pulse" />
        <div className="mt-6 h-64 rounded-3xl bg-[color:var(--surface-2)] animate-pulse" />
      </div>
    );
  }

  if (!state) {
    return (
      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-24 text-center">
        <h1 className="text-3xl sm:text-4xl tracking-tight font-medium">
          {t("noInputTitle")}
        </h1>
        <p className="mt-3 text-[color:var(--muted)]">{t("noInputBody")}</p>
        <Link href="/check" className="btn-primary mt-7">
          {t("noInputCta")}
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
            className="rtl:rotate-180"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    );
  }

  const { input, result } = state;

  const channelLabel = input.channel
    ? tChannels(CHANNEL_KEY[input.channel])
    : t("readBackNone");
  const promiseLabel = input.promise
    ? tPromises(PROMISE_KEY[input.promise])
    : t("readBackNone");
  const askedForLabel =
    input.askedFor.length === 0
      ? t("readBackNone")
      : input.askedFor.map((k) => tAsked(ASKED_FOR_KEY[k])).join(" · ");

  // matched guide label is "label" key from homeFeatures (per-guide)
  let matchedGuideLabel: string | undefined;
  if (result.matchedGuideSlug) {
    try {
      matchedGuideLabel = tHome(`${result.matchedGuideSlug}.label`);
    } catch {
      matchedGuideLabel = undefined;
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-12 sm:pt-16 pb-20">
      {/* RiskResultCard renders the page H1 (the risk level). */}
      <RiskResultCard
        input={input}
        result={result}
        matchedGuideLabel={matchedGuideLabel}
      />

      {/* What we read from your answers */}
      <section className="mt-10">
        <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--muted-2)]">
          {t("readBackTitle")}
        </p>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <Detail label={t("readBackChannel")} value={channelLabel} />
          <Detail label={t("readBackPromise")} value={promiseLabel} />
          <Detail label={t("readBackAskedFor")} value={askedForLabel} />
        </div>
      </section>

      {/* Reminder */}
      <div className="mt-10 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-2)] p-7 sm:p-9">
        <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--muted-2)]">
          {t("reminderTitle")}
        </p>
        <p className="mt-3 text-[15px] sm:text-base leading-7 text-[color:var(--foreground)]">
          {t("reminderBody")}
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link href="/check" className="btn-ghost">
            {t("tryAgain")}
          </Link>
          <Link href="/scams" className="btn-ghost">
            {t("browseScams")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="card">
      <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--muted-2)]">
        {label}
      </p>
      <p className="mt-2 text-[15px] leading-6 text-[color:var(--foreground)]">
        {value}
      </p>
    </div>
  );
}
