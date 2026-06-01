import { Reveal } from "@/components/Reveal";
import { ScamCheckForm } from "@/components/ScamCheckForm";
import { DisclaimerBox } from "@/components/DisclaimerBox";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check a message",
  description:
    "Answer four quick questions and find out if the message or call you received shows scam warning signs. Free, private, no account required.",
  alternates: { canonical: "/check" },
  openGraph: {
    title: "Check a message — Is this a scam?",
    description:
      "Answer four quick questions and find out if the message you received shows scam warning signs.",
    url: "/check",
  },
  twitter: {
    title: "Check a message — Is this a scam?",
    description:
      "Answer four quick questions. Get a clear read on scam risk.",
  },
};

export default function CheckPage() {
  return (
    <div className="relative">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 pt-14 sm:pt-20 pb-16">
        <Reveal>
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] animate-pulse-dot" />
            Step by step
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-5 text-[32px] sm:text-5xl md:text-6xl tracking-tight font-medium leading-[1.08]">
            Let&apos;s look at it{" "}
            <span className="font-serif-display text-[color:var(--muted)]">together.</span>
          </h1>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-4 text-[17px] leading-8 text-[color:var(--muted)] max-w-2xl">
            Four short questions. We will not store anything you write, and you
            never need to share who contacted you. The more you tell us, the
            better the read.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-10">
            <ScamCheckForm />
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-8">
            <DisclaimerBox />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
