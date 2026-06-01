import Link from "next/link";
import { GlowBg } from "@/components/GlowBg";

export function CtaBlock() {
  return (
    <section className="relative overflow-hidden">
      <GlowBg variant="cool" />
      <div className="relative mx-auto max-w-3xl px-5 sm:px-8 py-20 sm:py-24 text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted-2)]">
          When in doubt
        </p>
        <h2 className="mt-3 text-[28px] sm:text-4xl md:text-5xl tracking-tight font-medium leading-[1.08]">
          Not sure yet?{" "}
          <span className="font-serif-display text-[color:var(--muted)]">
            Check the message before you reply.
          </span>
        </h2>
        <p className="mt-5 text-[16px] sm:text-lg leading-8 text-[color:var(--muted)] max-w-xl mx-auto">
          Paste what you received. We&apos;ll look for the warning signs and
          tell you what to verify — without storing anything you write.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3">
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
          <Link href="/scams" className="btn-ghost">
            Browse all scams
          </Link>
        </div>
      </div>
    </section>
  );
}
