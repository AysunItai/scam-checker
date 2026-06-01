import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ScamGuideHero } from "./ScamGuideHero";
import { ExampleMessageCard } from "./ExampleMessageCard";
import { RedFlagList } from "./RedFlagList";
import { WhatToDoNow } from "./WhatToDoNow";
import { GuideShareButton } from "./GuideShareButton";
import { RelatedGuides } from "./RelatedGuides";
import { CtaBlock } from "./CtaBlock";
import { getRelatedGuides, type ScamGuide } from "@/lib/scamGuides";

export function ScamGuidePage({ guide }: { guide: ScamGuide }) {
  const related = getRelatedGuides(guide.slug);

  return (
    <article className="relative">
      <ScamGuideHero guide={guide} />

      {/* Example + plain explanation */}
      <section className="relative">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 py-14 sm:py-20 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          <Reveal>
            <ExampleMessageCard example={guide.example} />
          </Reveal>
          <Reveal delay={120}>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted-2)]">
                What this scam really is
              </p>
              <h2 className="mt-3 text-[26px] sm:text-3xl md:text-4xl tracking-tight font-medium leading-[1.12]">
                In plain words.
              </h2>
              <div className="mt-5 space-y-4 text-[16px] sm:text-[17px] leading-8 text-[color:var(--foreground)] break-anywhere">
                {guide.plain.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Red flags */}
      <section className="relative border-t border-[color:var(--border)] bg-[color:var(--surface-2)]">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
            <Reveal>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted-2)]">
                  Red flags
                </p>
                <h2 className="mt-3 text-[26px] sm:text-3xl md:text-4xl tracking-tight font-medium leading-[1.12]">
                  Warning signs to take seriously.
                </h2>
                <p className="mt-4 text-[15px] leading-7 text-[color:var(--muted)] max-w-md">
                  Any one of these on its own should make you pause. Two or
                  more, and you should stop and check before doing anything.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <RedFlagList flags={guide.redFlags} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* What to do now */}
      <section className="relative">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 py-16 sm:py-20">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted-2)]">
              What to do now
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-3 text-[26px] sm:text-3xl md:text-4xl tracking-tight font-medium leading-[1.12]">
              Two short lists. That&apos;s the whole defence.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-10">
              <WhatToDoNow
                dont={guide.whatToDo.dont}
                doList={guide.whatToDo.do}
              />
            </div>
          </Reveal>

          <Reveal delay={220}>
            <p
              role="note"
              className="mt-8 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)] p-5 text-[15px] leading-7 text-[color:var(--muted)] max-w-3xl"
            >
              <strong className="text-[color:var(--foreground)] font-medium">
                Important:
              </strong>{" "}
              we never tell you a message is &quot;safe&quot;. Even a lower-risk
              result is not a green light to send money or share codes. When in
              doubt — verify with the official source.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured share */}
      <section className="relative border-t border-[color:var(--border)]">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-16 sm:py-20">
          <Reveal>
            <GuideShareButton guide={guide} featured />
          </Reveal>
        </div>
      </section>

      {/* Related guides */}
      {related.length > 0 && (
        <section className="relative border-t border-[color:var(--border)] bg-[color:var(--surface-2)]">
          <div className="mx-auto max-w-5xl px-5 sm:px-8 py-16 sm:py-20">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <Reveal>
                  <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted-2)]">
                    Related scams
                  </p>
                </Reveal>
                <Reveal delay={80}>
                  <h2 className="mt-3 text-[26px] sm:text-3xl md:text-4xl tracking-tight font-medium leading-[1.12]">
                    More patterns worth recognising.
                  </h2>
                </Reveal>
              </div>
              <Reveal delay={120}>
                <Link
                  href="/scams"
                  className="link-anim text-sm text-[color:var(--foreground)]"
                >
                  See all guides →
                </Link>
              </Reveal>
            </div>
            <Reveal delay={160}>
              <div className="mt-10">
                <RelatedGuides guides={related} />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <CtaBlock />
    </article>
  );
}
