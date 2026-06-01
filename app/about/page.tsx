import Link from "next/link";
import { Reveal } from "@/components/Reveal";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why we built a scam checker, what it is — and what it isn't. A free, private second opinion in the moments that matter most.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Is this a scam?",
    description:
      "Built to interrupt the moment before it's too late. Free, private, no account.",
    url: "/about",
  },
  twitter: {
    title: "About — Is this a scam?",
    description: "Built to interrupt the moment before it's too late.",
  },
};

export default function AboutPage() {
  return (
    <div className="relative">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 pt-16 sm:pt-24 pb-20">
        <Reveal>
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] animate-pulse-dot" />
            About
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-5 text-[30px] sm:text-5xl md:text-6xl tracking-tight font-medium leading-[1.08]">
            Built to interrupt the moment{" "}
            <span className="font-serif-display text-[color:var(--muted)]">before it&apos;s too late.</span>
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-7 text-[17px] leading-8 text-[color:var(--muted)]">
            Most fraud doesn&apos;t fool people because they&apos;re naive. It works
            because it isolates them, rushes them, and convinces them not to
            check with anyone. This tool exists for the small window between
            &quot;something feels off&quot; and &quot;I need to send the money.&quot;
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-12 grid gap-4">
            <Block
              title="What this is"
              body="A simple, private second opinion. You describe what happened — we look for the patterns scammers reuse, and tell you what to verify."
            />
            <Block
              title="What this isn't"
              body="It is not a guarantee. We will never tell you a message is safe. Even a 'lower risk' result is not a green light."
            />
            <Block
              title="What we do with your data"
              body="Nothing. Your description never leaves your browser. We do not require an account, we do not run analytics on the message you paste."
            />
            <Block
              title="Why it's free"
              body="Because scams hurt the people who can least afford to lose. Charging for a safety net would defeat the point."
            />
          </div>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-12 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-2)] p-7">
            <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--muted-2)]">
              If money was already sent
            </p>
            <ol className="mt-3 space-y-3 text-[15px] leading-7">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[color:var(--border-strong)] text-xs">
                  1
                </span>
                <span>
                  Call your bank immediately — ask them to attempt recall and
                  freeze the destination account if possible.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[color:var(--border-strong)] text-xs">
                  2
                </span>
                <span>
                  Report it to your local police or national fraud reporting
                  line. Save every message and screenshot.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[color:var(--border-strong)] text-xs">
                  3
                </span>
                <span>
                  Change passwords on email, banking, and any account where you
                  share login details.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[color:var(--border-strong)] text-xs">
                  4
                </span>
                <span>
                  Tell someone you trust. Falling for a scam is not stupidity —
                  it is engineered to work. You are not alone.
                </span>
              </li>
            </ol>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <Link href="/check" className="btn-primary">
              Check a message
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
            <Link href="/scams" className="btn-ghost">
              Common scams
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div className="card">
      <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--muted-2)]">{title}</p>
      <p className="mt-2 text-[15px] leading-7 text-[color:var(--foreground)]">{body}</p>
    </div>
  );
}
