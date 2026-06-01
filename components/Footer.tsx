import Link from "next/link";
import { Logo } from "./Logo";
import { BUILT_BY, POWERED_BY, SITE_NAME } from "@/lib/seo";

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
          <p className="max-w-2xl leading-5">
            This tool gives general guidance, not legal or financial advice. We never tell
            you a message is &quot;safe&quot;. When in doubt — verify with the official source.
          </p>
          <p>© {new Date().getFullYear()} {SITE_NAME}</p>
        </div>
      </div>

      <div className="border-t border-[color:var(--border)]">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-[color:var(--muted-2)]">
          <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>Built by</span>
            <Attribution name={BUILT_BY.name} url={BUILT_BY.url} />
            <span className="opacity-60">·</span>
            <span>Powered by</span>
            <Attribution name={POWERED_BY.name} url={POWERED_BY.url} />
          </p>
          <p className="inline-flex items-center gap-1.5 opacity-80">
            <span className="h-1 w-1 rounded-full bg-[color:var(--accent)] animate-pulse-dot" />
            Made with care
          </p>
        </div>
      </div>
    </footer>
  );
}

function Attribution({ name, url }: { name: string; url?: string }) {
  if (!url) {
    return (
      <span className="text-[color:var(--foreground)]/85 font-medium tracking-tight">
        {name}
      </span>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="link-anim text-[color:var(--foreground)]/85 font-medium tracking-tight"
    >
      {name}
    </a>
  );
}
