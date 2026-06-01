"use client";

import { useState } from "react";
import type { CheckInput, CheckResult } from "@/lib/types";

function buildMessage(input: CheckInput, result: CheckResult) {
  const truncated =
    input.description.length > 280
      ? input.description.slice(0, 280).trim() + "…"
      : input.description.trim();

  const reasons = result.reasons.slice(0, 4).map((r) => `• ${r}`).join("\n");

  return [
    `Hi — can you help me check this before I do anything?`,
    ``,
    `Someone contacted me and said:`,
    `"${truncated}"`,
    ``,
    `A scam checker rated this as: ${result.title}.`,
    `Why:`,
    reasons,
    ``,
    `Can you look at it with me before I send money or share information?`,
  ].join("\n");
}

export function ShareToTrustedPerson({
  input,
  result,
}: {
  input: CheckInput;
  result: CheckResult;
}) {
  const [copied, setCopied] = useState(false);
  const message = buildMessage(input, result);
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(message)}`;
  const sms = `sms:?&body=${encodeURIComponent(message)}`;
  const mailto = `mailto:?subject=${encodeURIComponent(
    "Can you check this with me before I send money?",
  )}&body=${encodeURIComponent(message)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="card relative overflow-hidden">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--border-strong)] text-[color:var(--foreground)]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 11h-6" />
            <path d="M19 8v6" />
          </svg>
        </span>
        <div className="flex-1">
          <p className="font-medium">Send to someone you trust</p>
          <p className="mt-1 text-sm text-[color:var(--muted)] leading-6">
            Scams work best when you decide alone. Show this to a friend or family member
            before you send anything.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary justify-center w-full"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M20.52 3.48A11.84 11.84 0 0 0 12.04 0C5.42 0 .02 5.4.02 12.02c0 2.12.55 4.18 1.6 6L0 24l6.16-1.6a11.97 11.97 0 0 0 5.87 1.49h.01c6.62 0 12.02-5.4 12.02-12.02 0-3.21-1.25-6.23-3.54-8.39ZM12.04 21.8h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.21-3.65.95.98-3.55-.24-.37a9.85 9.85 0 1 1 18.31-5.23c0 5.44-4.43 9.78-9.99 9.78Zm5.47-7.32c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.49-.88-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.1 4.49.71.31 1.27.5 1.7.64.71.23 1.36.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
          </svg>
          Share via WhatsApp
        </a>
        <div className="grid grid-cols-3 gap-2">
          <a href={sms} className="btn-ghost justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" />
            </svg>
            SMS
          </a>
          <a href={mailto} className="btn-ghost justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-10 5L2 7" />
            </svg>
            Email
          </a>
          <button type="button" onClick={copy} className="btn-ghost justify-center">
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect width="14" height="14" x="8" y="8" rx="2" />
                  <path d="M4 16V4a2 2 0 0 1 2-2h12" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      <details className="mt-4 group">
        <summary className="cursor-pointer text-xs uppercase tracking-[0.14em] text-[color:var(--muted-2)] hover:text-[color:var(--foreground)]">
          Preview the message
        </summary>
        <pre className="mt-3 max-h-48 overflow-auto whitespace-pre-wrap rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-2)] p-3 text-xs leading-6 text-[color:var(--muted)] font-mono">
{message}
        </pre>
      </details>
    </div>
  );
}
