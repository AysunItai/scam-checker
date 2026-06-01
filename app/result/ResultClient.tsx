"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { evaluate } from "@/lib/riskEngine";
import { RiskResultCard } from "@/components/RiskResultCard";
import { CHANNEL_LABEL, ASKED_FOR_LABEL, PROMISE_LABEL } from "@/lib/options";
import type { CheckInput, CheckResult } from "@/lib/types";

const STORAGE_KEY = "scam_check_input";

export function ResultClient() {
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
          No check found.
        </h1>
        <p className="mt-3 text-[color:var(--muted)]">
          Looks like you opened the result page directly. Start by checking a
          message.
        </p>
        <Link href="/check" className="btn-primary mt-7">
          Check a message
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    );
  }

  const { input, result } = state;

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-12 sm:pt-16 pb-20">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[color:var(--muted-2)]">
        <Link href="/check" className="link-anim">Check</Link>
        <span>/</span>
        <span>Result</span>
      </div>

      <h1 className="mt-4 sr-only">Risk result</h1>

      <RiskResultCard input={input} result={result} />

      {/* What we read from your answers */}
      <section className="mt-10">
        <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--muted-2)]">
          What we read from your answers
        </p>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <Detail
            label="How they contacted"
            value={input.channel ? CHANNEL_LABEL[input.channel] : "Not specified"}
          />
          <Detail
            label="They promised"
            value={input.promise ? PROMISE_LABEL[input.promise] : "Not specified"}
          />
          <Detail
            label="They asked for"
            value={
              input.askedFor.length === 0
                ? "Nothing selected"
                : input.askedFor.map((k) => ASKED_FOR_LABEL[k]).join(" · ")
            }
          />
        </div>

        {input.description && (
          <details className="mt-3 group">
            <summary className="cursor-pointer text-xs uppercase tracking-[0.14em] text-[color:var(--muted-2)] hover:text-[color:var(--foreground)]">
              Your description
            </summary>
            <p className="mt-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)] p-4 text-[15px] leading-7 text-[color:var(--foreground)] whitespace-pre-wrap">
              {input.description}
            </p>
          </details>
        )}
      </section>

      {/* Reminder */}
      <div className="mt-10 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-2)] p-7 sm:p-9">
        <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--muted-2)]">
          Remember
        </p>
        <p className="mt-3 text-xl sm:text-2xl md:text-3xl tracking-tight font-medium leading-[1.18]">
          We do not say <span className="font-serif-display italic">&quot;safe.&quot;</span>{" "}
          <span className="text-[color:var(--muted)]">
            Even a lower risk result is not a green light.
          </span>
        </p>
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[color:var(--muted)]">
          If you&apos;re still unsure — call the company or bank directly using
          the number on your card or their official website. Never the number
          someone gave you on the phone.
        </p>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="card">
      <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--muted-2)]">{label}</p>
      <p className="mt-2 text-[15px] leading-6 text-[color:var(--foreground)]">{value}</p>
    </div>
  );
}
