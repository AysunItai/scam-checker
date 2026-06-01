import Link from "next/link";
import type { ScamGuide } from "@/lib/scamGuides";

export function RelatedGuides({ guides }: { guides: ScamGuide[] }) {
  if (guides.length === 0) return null;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {guides.map((g) => (
        <Link
          key={g.slug}
          href={`/${g.slug}`}
          className="card group h-full block transition-transform hover:-translate-y-0.5"
        >
          <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--muted-2)]">
            {g.category}
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
      ))}
    </div>
  );
}
