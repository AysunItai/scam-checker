import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { GlowBg } from "@/components/GlowBg";
import { HOMEPAGE_FEATURES, SCAM_GUIDES } from "@/lib/scamGuides";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE_NAME} — ${SITE_TAGLINE}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: `${SITE_NAME} — ${SITE_TAGLINE}` },
};

export default function Home() {
  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <GlowBg variant="warm" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-16 sm:pt-24 pb-20 sm:pb-28">
          <Reveal>
            <span className="chip">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] animate-pulse-dot" />
              A calm second opinion — before you pay
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 max-w-4xl text-[36px] sm:text-[56px] md:text-[68px] lg:text-[84px] leading-[1.04] sm:leading-[1.02] tracking-[-0.025em] font-medium">
              Not sure if a message or call
              <br className="hidden sm:block" />{" "}
              <span className="font-serif-display text-[color:var(--foreground)]">is a scam?</span>{" "}
              <span className="text-[color:var(--muted)]">Check before you pay.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
              Paste the message or describe the call. We look for scam warning
              signs and tell you what to verify before sending money or sharing
              personal details. Built for the moment you feel uncertain — the
              moment that matters.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link href="/check" className="btn-primary">
                Check a message
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <Link href="/scams" className="btn-ghost">
                Learn common scams
              </Link>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-[color:var(--muted-2)]">
              <span className="inline-flex items-center gap-2">
                <Tick />
                Works without an account
              </span>
              <span className="inline-flex items-center gap-2">
                <Tick />
                Nothing leaves your browser
              </span>
              <span className="inline-flex items-center gap-2">
                <Tick />
                Free — always
              </span>
            </div>
          </Reveal>

          {/* Floating sample chat card */}
          <Reveal delay={380}>
            <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_1fr] items-start">
              <SampleChat />
              <SampleResult />
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted-2)]">
              How it works
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-3 max-w-3xl text-[28px] sm:text-4xl md:text-5xl tracking-tight font-medium leading-[1.08]">
              Three quiet questions.{" "}
              <span className="font-serif-display text-[color:var(--muted)]">One honest answer.</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={100 + i * 100}>
                <div className="card h-full">
                  <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--muted-2)]">
                    Step {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-xl font-medium tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-[color:var(--muted)]">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RED FLAGS STRIP */}
      <section className="relative bg-[color:var(--surface-2)] border-y border-[color:var(--border)]">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] items-start">
            <div>
              <Reveal>
                <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted-2)]">
                  What we look for
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-3 text-[28px] sm:text-3xl md:text-4xl tracking-tight font-medium leading-[1.12]">
                  The patterns scammers always reuse.
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-4 text-[color:var(--muted)] leading-7">
                  Real fraud rarely surprises us — it just disguises itself.
                  Different stories, same machinery: urgency, secrecy, an
                  unusual payment method, and a promise that sounds too good.
                </p>
              </Reveal>
            </div>

            <ul className="grid grid-cols-2 sm:grid-cols-2 gap-3">
              {RED_FLAGS.map((f, i) => (
                <Reveal key={f} delay={i * 60}>
                  <li className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3.5 text-sm flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]"
                    />
                    <span>{f}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* COMMON SCAMS PEOPLE CHECK */}
      <section
        aria-labelledby="home-guides-heading"
        className="relative"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted-2)]">
              Scam guides
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              id="home-guides-heading"
              className="mt-3 max-w-3xl text-[28px] sm:text-4xl md:text-5xl tracking-tight font-medium leading-[1.08]"
            >
              Common scams{" "}
              <span className="font-serif-display text-[color:var(--muted)]">
                people check.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 max-w-2xl text-[16px] sm:text-[17px] leading-8 text-[color:var(--muted)]">
              A short, plain-language explainer for each — with a real example,
              the warning signs, and what to do before you reply or send
              anything.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HOMEPAGE_FEATURES.map((feature, i) => {
              const guide = SCAM_GUIDES[feature.slug];
              return (
                <li key={feature.slug}>
                  <Reveal delay={120 + i * 70}>
                    <Link
                      href={`/${feature.slug}`}
                      aria-label={`Read the ${feature.label.toLowerCase()} guide`}
                      className="card group relative h-full block"
                    >
                      <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--muted-2)]">
                        {guide.category}
                      </p>
                      <h3 className="mt-2 text-xl sm:text-[22px] font-medium tracking-tight leading-snug">
                        {feature.label}
                      </h3>
                      <p className="mt-2.5 text-[15px] leading-7 text-[color:var(--muted)]">
                        {feature.blurb}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-[color:var(--foreground)]">
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
                  </Reveal>
                </li>
              );
            })}
          </ul>

          <Reveal delay={120 + HOMEPAGE_FEATURES.length * 70 + 80}>
            <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Link href="/scams" className="btn-ghost">
                View all scam guides
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
              <p className="text-xs text-[color:var(--muted-2)] sm:ml-2">
                One page per scam, no fluff — just the example, the signs, and
                what to do.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden">
        <GlowBg variant="cool" />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8 py-24 text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted-2)]">
              If you feel rushed — stop here.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 text-[32px] sm:text-5xl md:text-6xl tracking-tight font-medium leading-[1.08]">
              No real institution will ever{" "}
              <span className="font-serif-display text-[color:var(--accent)]">
                hurry you
              </span>{" "}
              into paying.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 text-lg text-[color:var(--muted)] leading-8 max-w-2xl mx-auto">
              Take two minutes. Run the check. Talk to one person you trust.
              That's all it takes to interrupt almost every scam.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/check" className="btn-primary">
                Run the check
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <Link href="/scams" className="btn-ghost">
                Browse common scams
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function Tick() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

const STEPS = [
  {
    title: "Tell us what happened",
    body: "Paste the message or describe the call in your own words. The more detail, the more accurate.",
  },
  {
    title: "Answer a few quick questions",
    body: "How they contacted you, what they asked for, what they promised. Takes under a minute.",
  },
  {
    title: "Get a clear, honest read",
    body: "A risk level, the exact reasons, what to do next — and a one-tap way to send it to someone you trust.",
  },
];

const RED_FLAGS = [
  "Pay first to receive money later",
  "Asks for an OTP or security code",
  "Buy gift cards as payment",
  "Send crypto urgently",
  "Install AnyDesk or TeamViewer",
  '"Don\'t tell your family"',
  "A small fee for a stuck package",
  "Guaranteed investment returns",
  "Family emergency, money now",
  "Bank security asking for your password",
];

function SampleChat() {
  return (
    <div className="relative">
      <div className="absolute -inset-2 rounded-[28px] bg-[color:var(--surface-2)] opacity-60 blur-md" />
      <div className="relative rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.18)]">
        <div className="flex items-center justify-between text-xs text-[color:var(--muted-2)]">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--surface-2)] border border-[color:var(--border)] font-medium text-[color:var(--foreground)]">
              +90
            </span>
            <div>
              <p className="text-[color:var(--foreground)] text-sm font-medium">Unknown number</p>
              <p className="text-[10px] uppercase tracking-[0.14em]">today · 14:02</p>
            </div>
          </div>
          <span className="chip text-[10px]">incoming</span>
        </div>

        <div className="mt-5 space-y-2.5">
          <Bubble side="them">
            Hello, congratulations. You have <b>€4,200</b> in social insurance
            waiting in your name.
          </Bubble>
          <Bubble side="them">
            To release the payment today, please send a <b>€200</b> processing
            fee to the account I will share. This must be done now.
          </Bubble>
          <Bubble side="them">
            Please don&apos;t discuss this with anyone — it is a private
            government matter.
          </Bubble>
        </div>

        <div className="mt-5 flex items-center justify-between text-[11px] text-[color:var(--muted-2)]">
          <span>Pasted into the checker</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] animate-pulse-dot" />
            Analysing
          </span>
        </div>
      </div>
    </div>
  );
}

function SampleResult() {
  return (
    <div className="relative animate-float-soft">
      <div className="rounded-[24px] border border-[color:var(--risk-high)]/25 bg-[color:var(--risk-high-soft)] p-7">
        <div className="flex items-center gap-2">
          <span className="risk-pill text-[color:var(--risk-high)] bg-white/60">
            Risk level
          </span>
        </div>
        <h3 className="mt-3 text-3xl font-medium tracking-tight leading-tight">
          High scam risk
        </h3>
        <p className="mt-2 text-sm text-[color:var(--foreground)]/80 leading-6">
          Do not send money or share private information. This has strong scam
          warning signs.
        </p>
        <ul className="mt-5 space-y-2 text-sm leading-6">
          {[
            "They promised money but asked you to pay first.",
            "They created urgency to stop you from checking.",
            "They asked you to keep it secret.",
            "They contacted you out of the blue.",
          ].map((r) => (
            <li key={r} className="flex items-start gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--risk-high)]" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Bubble({
  side,
  children,
}: {
  side: "them" | "me";
  children: React.ReactNode;
}) {
  const me = side === "me";
  return (
    <div className={`flex ${me ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[14px] leading-6 ${
          me
            ? "bg-[color:var(--foreground)] text-[color:var(--background)] rounded-br-md"
            : "bg-[color:var(--surface-2)] border border-[color:var(--border)] text-[color:var(--foreground)] rounded-bl-md"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
