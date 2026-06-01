import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[color:var(--border)] bg-[color:var(--surface-2)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm leading-6 text-[color:var(--muted)]">
            A calm second opinion before you send money or share details. Built to interrupt
            scams in the moments that matter.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-[color:var(--muted-2)]">
            Explore
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/check" className="link-anim">
                Check a message
              </Link>
            </li>
            <li>
              <Link href="/scams" className="link-anim">
                Common scams
              </Link>
            </li>
            <li>
              <Link href="/about" className="link-anim">
                About this tool
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-[color:var(--muted-2)]">
            If money was already sent
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[color:var(--muted)]">
            <li>1. Call your bank immediately and ask to recall the transfer.</li>
            <li>2. Report it to your local police / fraud line.</li>
            <li>3. Change passwords on important accounts.</li>
            <li>4. Tell one trusted person — you are not alone in this.</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[color:var(--border)]">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[color:var(--muted-2)]">
          <p>
            This tool gives general guidance, not legal or financial advice. We never tell
            you a message is &quot;safe&quot;. When in doubt — verify with the official source.
          </p>
          <p>© {new Date().getFullYear()} Is this a scam?</p>
        </div>
      </div>
    </footer>
  );
}
