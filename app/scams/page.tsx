import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { GlowBg } from "@/components/GlowBg";
import { SCAM_GUIDES, allGuideSlugs } from "@/lib/scamGuides";
import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  ScamCatalogJsonLd,
} from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Common scams",
  description:
    "Eleven plain-language scam guides — fake bank calls, money-waiting fees, OTP theft, WhatsApp impersonation, delivery phishing, romance scams, fake jobs, marketplace tricks, and more. The signs to look for and what to do.",
  alternates: { canonical: "/scams" },
  keywords: [
    "common scams",
    "scam guide",
    "WhatsApp scams",
    "fake bank call",
    "advance fee scam",
    "money waiting scam",
    "OTP code scam",
    "delivery fee scam",
    "romance scam",
    "fake job scam",
    "Facebook Marketplace scam",
    "crypto recovery scam",
  ],
  openGraph: {
    title: "Common scams — the same playbooks, on repeat",
    description:
      "Eleven scam guides scammers reuse, explained calmly. Spot the pattern before you reply or send anything.",
    url: "/scams",
  },
  twitter: {
    title: "Common scams — the same playbooks, on repeat",
    description: "Eleven scam guides explained calmly. Spot the pattern.",
  },
};

export default function ScamsPage() {
  const slugs = allGuideSlugs();

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
        questions={slugs.map((s) => {
          const g = SCAM_GUIDES[s];
          return {
            q: `What is the ${g.category.toLowerCase()}?`,
            a: `${g.plain.join(" ")} Warning signs: ${g.redFlags.join(" ")}`,
          };
        })}
      />

      {/* Hero */}
      <section
        aria-labelledby="scams-heading"
        className="relative overflow-hidden border-b border-[color:var(--border)]"
      >
        <GlowBg variant="cool" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-16 sm:pt-24 pb-14 sm:pb-16">
          <Reveal>
            <span className="chip">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] animate-pulse-dot" />
              Scam guide hub
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1
              id="scams-heading"
              className="mt-5 text-[32px] sm:text-5xl md:text-6xl tracking-tight font-medium leading-[1.08] max-w-4xl"
            >
              The same playbooks,{" "}
              <span className="font-serif-display text-[color:var(--muted)]">
                on repeat.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 max-w-2xl text-[17px] leading-8 text-[color:var(--muted)]">
              Eleven plain-language guides. Scammers change the names, the
              numbers, the stories. The structure almost never changes. Once
              you see the shape, you cannot unsee it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Primary content — all 11 guides */}
      <section
        aria-labelledby="all-guides-heading"
        className="relative"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
          <div className="flex items-end justify-between flex-wrap gap-3">
            <div>
              <Reveal>
                <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted-2)]">
                  All scam guides
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h2
                  id="all-guides-heading"
                  className="mt-3 text-[26px] sm:text-3xl md:text-4xl tracking-tight font-medium leading-[1.12] max-w-3xl"
                >
                  One page per scam — with a real example, the signs, and what
                  to do.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <Link href="/check" className="link-anim text-sm">
                Check your own message →
              </Link>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <ul
              role="list"
              className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {slugs.map((slug, i) => {
                const g = SCAM_GUIDES[slug];
                return (
                  <li key={slug}>
                    <Link
                      href={`/${slug}`}
                      aria-label={`Read the ${g.category.toLowerCase()} guide`}
                      className="card group h-full block transition-transform hover:-translate-y-0.5"
                    >
                      <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--muted-2)]">
                        {String(i + 1).padStart(2, "0")} · {g.category}
                      </p>
                      <h3 className="mt-2 text-lg sm:text-xl tracking-tight font-medium leading-snug">
                        {g.h1}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[color:var(--muted)] line-clamp-3">
                        {g.subhead}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-[color:var(--foreground)]">
                        Read the guide
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition-transform group-hover:translate-x-0.5"
                          aria-hidden
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-[color:var(--border)]">
        <GlowBg variant="warm" />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8 py-20 sm:py-24 text-center">
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
