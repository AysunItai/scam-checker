import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { GlowBg } from "@/components/GlowBg";
import { GuideShareButton } from "./GuideShareButton";
import type { ScamGuide } from "@/lib/scamGuides";

export function ScamGuideHero({ guide }: { guide: ScamGuide }) {
  return (
    <section className="relative overflow-hidden">
      <GlowBg variant="warm" />
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8 pt-14 sm:pt-20 pb-14 sm:pb-20">
        <Reveal>
          <Link
            href="/scams"
            className="chip group hover:text-[color:var(--foreground)] hover:border-[color:var(--foreground)] transition-colors"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] animate-pulse-dot" />
            {guide.category}
            <span className="text-[color:var(--muted-2)] group-hover:text-[color:var(--foreground)] transition-colors">
              · all guides
            </span>
          </Link>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-6 max-w-4xl text-[34px] sm:text-[52px] md:text-[64px] tracking-[-0.025em] font-medium leading-[1.05]">
            {guide.h1}
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-6 max-w-2xl text-[17px] sm:text-lg leading-8 text-[color:var(--muted)]">
            {guide.subhead}
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Link href="/check" className="btn-primary">
              Check your message
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
            <GuideShareButton guide={guide} variant="ghost" />
          </div>
        </Reveal>

        <Reveal delay={280}>
          <p className="mt-7 max-w-xl text-xs text-[color:var(--muted-2)] leading-6">
            We never tell you a message is &quot;safe.&quot; This is a guide — when in
            doubt, verify with the official source and ask one person you
            trust.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
