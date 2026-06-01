"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ASKED_FOR_OPTIONS,
  CHANNEL_OPTIONS,
  PROMISE_OPTIONS,
} from "@/lib/options";
import type {
  AskedFor,
  CheckInput,
  ContactChannel,
  Promise as PromiseType,
} from "@/lib/types";

const STORAGE_KEY = "scam_check_input";

const STEP_LABELS = [
  "What happened",
  "How they contacted you",
  "What they asked for",
  "What they promised",
];

export function ScamCheckForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [description, setDescription] = useState("");
  const [channel, setChannel] = useState<ContactChannel | null>(null);
  const [askedFor, setAskedFor] = useState<AskedFor[]>([]);
  const [promise, setPromise] = useState<PromiseType | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<CheckInput>;
        if (parsed.description) setDescription(parsed.description);
        if (parsed.channel) setChannel(parsed.channel);
        if (parsed.askedFor) setAskedFor(parsed.askedFor);
        if (parsed.promise) setPromise(parsed.promise);
      }
    } catch {
      // ignore
    }
  }, []);

  const progress = useMemo(() => ((step + 1) / STEP_LABELS.length) * 100, [step]);

  const canContinue = useMemo(() => {
    if (step === 0) return description.trim().length > 4;
    if (step === 1) return channel !== null;
    if (step === 2) return true;
    if (step === 3) return promise !== null;
    return false;
  }, [step, description, channel, promise]);

  function toggleAskedFor(v: AskedFor) {
    setAskedFor((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v],
    );
  }

  function next() {
    if (!canContinue) return;
    if (step < STEP_LABELS.length - 1) setStep(step + 1);
    else submit();
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  function submit() {
    if (submitting) return;
    setSubmitting(true);
    const payload: CheckInput = {
      description: description.trim(),
      channel,
      askedFor,
      promise,
    };
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // sessionStorage may be blocked — fall back to URL query
    }
    router.push("/result");
  }

  return (
    <div className="form-card relative">
      {/* progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] text-[color:var(--muted-2)]">
          <span>
            Step {step + 1} / {STEP_LABELS.length}
          </span>
          <span>{STEP_LABELS[step]}</span>
        </div>
        <div className="mt-2 h-[2px] w-full overflow-hidden rounded-full bg-[color:var(--border)]">
          <div
            className="h-full bg-[color:var(--foreground)] transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {step === 0 && (
        <Step title="What happened?" hint="Paste the message or describe the call in your own words. The more detail, the better.">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            placeholder="Example: Someone called me from a Turkish number and said I have 4,200 euros in social insurance waiting. But first I need to send 200 euros as a processing fee. They said I shouldn't tell my family."
            className="input-base"
            autoFocus
          />
          <p className="mt-2 text-xs text-[color:var(--muted-2)]">
            We don't store this. Everything stays in your browser.
          </p>
        </Step>
      )}

      {step === 1 && (
        <Step title="How did they contact you?" hint="Pick the closest one.">
          <div className="grid gap-2 sm:grid-cols-2">
            {CHANNEL_OPTIONS.map((o) => {
              const selected = channel === o.value;
              return (
                <button
                  key={o.value}
                  type="button"
                  className="option"
                  data-selected={selected}
                  aria-pressed={selected}
                  onClick={() => setChannel(o.value)}
                >
                  <span className="dot" />
                  <span>{o.label}</span>
                </button>
              );
            })}
          </div>
        </Step>
      )}

      {step === 2 && (
        <Step
          title="Did they ask for any of these?"
          hint="Check everything that applies. You can skip if none apply."
        >
          <div className="grid gap-2 sm:grid-cols-2">
            {ASKED_FOR_OPTIONS.map((o) => {
              const checked = askedFor.includes(o.value);
              return (
                <label
                  key={o.value}
                  className="check-tile"
                  data-checked={checked}
                >
                  <span className="box">
                    {checked && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </span>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={() => toggleAskedFor(o.value)}
                  />
                  <span>{o.label}</span>
                </label>
              );
            })}
          </div>
        </Step>
      )}

      {step === 3 && (
        <Step
          title="What are they promising you?"
          hint="The closest fit is enough."
        >
          <div className="grid gap-2 sm:grid-cols-2">
            {PROMISE_OPTIONS.map((o) => {
              const selected = promise === o.value;
              return (
                <button
                  key={o.value}
                  type="button"
                  className="option"
                  data-selected={selected}
                  aria-pressed={selected}
                  onClick={() => setPromise(o.value)}
                >
                  <span className="dot" />
                  <span>{o.label}</span>
                </button>
              );
            })}
          </div>
        </Step>
      )}

      <div className="mt-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="btn-ghost disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          Back
        </button>
        <button
          type="button"
          onClick={next}
          disabled={!canContinue || submitting}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {step === STEP_LABELS.length - 1 ? (submitting ? "Checking…" : "Check risk") : "Continue"}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Step({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-[fadein_400ms_ease-out] [--tw-enter-translate-y:8px]">
      <h2 className="text-xl sm:text-2xl font-medium tracking-tight">{title}</h2>
      {hint && (
        <p className="mt-1.5 text-sm text-[color:var(--muted)]">{hint}</p>
      )}
      <div className="mt-5">{children}</div>
    </div>
  );
}
