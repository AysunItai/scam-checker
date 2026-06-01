import Link from "next/link";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--background)]/70 bg-[color:var(--background)]/95 border-b border-[color:var(--border)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-8 h-14 gap-2">
        <Logo />
        <nav className="flex items-center gap-0.5 sm:gap-1 text-sm">
          <Link
            href="/scams"
            className="px-2.5 sm:px-3 py-2 sm:py-1.5 rounded-full text-[color:var(--muted)] hover:text-[color:var(--foreground)] transition-colors text-[13px] sm:text-sm min-h-[44px] sm:min-h-0 inline-flex items-center"
          >
            <span className="hidden sm:inline">Common scams</span>
            <span className="sm:hidden">Scams</span>
          </Link>
          <Link
            href="/about"
            className="hidden sm:inline-flex px-3 py-1.5 rounded-full text-[color:var(--muted)] hover:text-[color:var(--foreground)] transition-colors items-center"
          >
            About
          </Link>
          <Link
            href="/check"
            className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--foreground)] text-[color:var(--background)] px-3 sm:px-3.5 py-2 sm:py-1.5 text-[13px] sm:text-sm font-medium transition-transform hover:-translate-y-px min-h-[40px] sm:min-h-0"
          >
            <span className="hidden sm:inline">Check a message</span>
            <span className="sm:hidden">Check</span>
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
        </nav>
      </div>
    </header>
  );
}
