"use client";

import { useEffect, useState } from "react";
import type { ScamGuide } from "@/lib/scamGuides";

interface GuideShareButtonProps {
  guide: ScamGuide;
  variant?: "primary" | "ghost";
  className?: string;
  /** When true, render a richer block with preview + copy fallback. */
  featured?: boolean;
}

function useShareUrl(guide: ScamGuide) {
  const [url, setUrl] = useState<string>("");
  useEffect(() => {
    if (typeof window === "undefined") return;
    setUrl(`${window.location.origin}/${guide.slug}`);
  }, [guide.slug]);
  return url;
}

export function GuideShareButton({
  guide,
  variant = "ghost",
  className = "",
  featured = false,
}: GuideShareButtonProps) {
  const url = useShareUrl(guide);
  const message = `${guide.shareMessage}\n\n${url}`.trim();
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(message)}`;
  const sms = `sms:?&body=${encodeURIComponent(message)}`;
  const mailto = `mailto:?subject=${encodeURIComponent(
    "Please read before you reply to anything suspicious",
  )}&body=${encodeURIComponent(message)}`;

  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard may be blocked — silently no-op */
    }
  }

  async function handleNativeShare() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await (navigator as Navigator).share({
          title: guide.h1,
          text: guide.shareMessage,
          url,
        });
      } catch {
        /* user dismissed */
      }
    } else {
      window.open(whatsapp, "_blank", "noopener,noreferrer");
    }
  }

  if (!featured) {
    return (
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          if (typeof navigator !== "undefined" && "share" in navigator) {
            e.preventDefault();
            handleNativeShare();
          }
        }}
        className={`${variant === "primary" ? "btn-primary" : "btn-ghost"} ${className}`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M20.52 3.48A11.84 11.84 0 0 0 12.04 0C5.42 0 .02 5.4.02 12.02c0 2.12.55 4.18 1.6 6L0 24l6.16-1.6a11.97 11.97 0 0 0 5.87 1.49h.01c6.62 0 12.02-5.4 12.02-12.02 0-3.21-1.25-6.23-3.54-8.39ZM12.04 21.8h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.21-3.65.95.98-3.55-.24-.37a9.85 9.85 0 1 1 18.31-5.23c0 5.44-4.43 9.78-9.99 9.78Z" />
        </svg>
        Send this warning to someone
      </a>
    );
  }

  return (
    <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <span
          aria-hidden
          className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--border-strong)] text-[color:var(--foreground)]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 11h-6" />
            <path d="M19 8v6" />
          </svg>
        </span>
        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl tracking-tight font-medium leading-tight">
            Forward this to someone who might be receiving it too.
          </h3>
          <p className="mt-2 text-[15px] leading-7 text-[color:var(--muted)] break-anywhere">
            One tap. Scams work best when people are alone with the decision —
            this is the fastest way to interrupt that.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-2">
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (typeof navigator !== "undefined" && "share" in navigator) {
              e.preventDefault();
              handleNativeShare();
            }
          }}
          className="btn-primary justify-center w-full"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M20.52 3.48A11.84 11.84 0 0 0 12.04 0C5.42 0 .02 5.4.02 12.02c0 2.12.55 4.18 1.6 6L0 24l6.16-1.6a11.97 11.97 0 0 0 5.87 1.49h.01c6.62 0 12.02-5.4 12.02-12.02 0-3.21-1.25-6.23-3.54-8.39ZM12.04 21.8h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.21-3.65.95.98-3.55-.24-.37a9.85 9.85 0 1 1 18.31-5.23c0 5.44-4.43 9.78-9.99 9.78Z" />
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
          <button type="button" onClick={handleCopy} className="btn-ghost justify-center">
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
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

      <details className="mt-5 group">
        <summary className="cursor-pointer text-xs uppercase tracking-[0.14em] text-[color:var(--muted-2)] hover:text-[color:var(--foreground)] transition-colors">
          Preview the message
        </summary>
        <pre className="mt-3 max-h-44 overflow-auto whitespace-pre-wrap rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)] p-4 text-[13px] leading-6 text-[color:var(--muted)] font-mono break-anywhere">
{message || `${guide.shareMessage}\n\n[link to this page]`}
        </pre>
      </details>
    </div>
  );
}
