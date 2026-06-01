import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { GlowBg } from "@/components/GlowBg";
import { ScamTypeCard } from "@/components/ScamTypeCard";
import { SCAM_TYPES } from "@/lib/scamTypes";
import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  ScamCatalogJsonLd,
} from "@/components/JsonLd";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Common scams",
  description:
    "Fake bank calls, money-waiting fees, delivery scams, romance scams, fake investment groups, government impersonation — the seven scam playbooks scammers reuse, explained in plain words with the warning signs to look for.",
  alternates: { canonical: "/scams" },
  keywords: [
    "common scams",
    "phone scam types",
    "WhatsApp scams",
    "fake bank call",
    "advance fee scam",
    "money waiting scam",
    "delivery fee scam",
    "romance scam",
    "investment scam",
    "government impersonation scam",
  ],
  openGraph: {
    title: "Common scams — the same playbooks, on repeat",
    description:
      "Seven scam patterns scammers reuse. Recognise them before they reach someone you love.",
    url: "/scams",
  },
  twitter: {
    title: "Common scams — the same playbooks, on repeat",
    description:
      "Seven scam patterns scammers reuse, explained in plain words.",
  },
};

export default function ScamsPage() {
  return (
    <div className="relative">
      <ScamCatalogJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Common scams", href: "/scams" },
        ]}
      />
      <FaqJsonLd
        questions={SCAM_TYPES.map((s) => ({
          q: `What is the ${s.title.toLowerCase()}?`,
          a: `${s.body} Warning signs: ${s.signs.join("; ")}.`,
        }))}
      />
      <section className="relative overflow-hidden border-b border-[color:var(--border)]">
        <GlowBg variant="cool" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-16 sm:pt-24 pb-16">
          <Reveal>
            <span className="chip">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] animate-pulse-dot" />
              Common scams
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 text-[32px] sm:text-5xl md:text-6xl tracking-tight font-medium leading-[1.08] max-w-4xl">
              The same playbooks,{" "}
              <span className="font-serif-display text-[color:var(--muted)]">on repeat.</span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 max-w-2xl text-[17px] leading-8 text-[color:var(--muted)]">
              Scams change the names, the numbers, the stories. The structure
              almost never changes. Once you see the shape, you cannot unsee it.
            </p>
          </Reveal>

          {/* TOC */}
          <Reveal delay={200}>
            <ul className="mt-9 flex flex-wrap gap-2">
              {SCAM_TYPES.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`#${s.id}`}
                    className="chip hover:text-[color:var(--foreground)] hover:border-[color:var(--foreground)] transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-5 sm:px-8 py-16 grid gap-6">
          {SCAM_TYPES.map((s, i) => (
            <Reveal key={s.id} delay={i * 60}>
              <ScamTypeCard scam={s} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden">
        <GlowBg variant="warm" />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8 py-24 text-center">
          <Reveal>
            <h2 className="text-[30px] sm:text-4xl md:text-5xl tracking-tight font-medium leading-[1.08]">
              Saw something familiar?{" "}
              <span className="font-serif-display text-[color:var(--muted)]">
                Run the check.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-5 text-[17px] leading-8 text-[color:var(--muted)] max-w-xl mx-auto">
              Paste what you received. We will tell you which patterns match —
              and what to do before sending anything.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-9">
              <Link href="/check" className="btn-primary">
                Check a message
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
