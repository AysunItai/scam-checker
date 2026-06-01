import type { ScamType } from "@/lib/scamTypes";

export function ScamTypeCard({ scam, index }: { scam: ScamType; index: number }) {
  return (
    <article
      id={scam.id}
      className="group card relative overflow-hidden"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-[color:var(--muted-2)]">
            Pattern {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-1 text-2xl font-medium tracking-tight">
            {scam.title}
          </h3>
          <p className="mt-2 text-[color:var(--muted)] leading-7">{scam.short}</p>
        </div>
      </div>
      <p className="mt-4 text-[15px] leading-7 text-[color:var(--foreground)]">{scam.body}</p>

      <div className="mt-5 rounded-xl border border-dashed border-[color:var(--border-strong)] bg-[color:var(--surface-2)] p-4">
        <p className="text-xs uppercase tracking-[0.12em] text-[color:var(--muted-2)]">
          Sounds like
        </p>
        <p className="mt-1 font-serif-display text-lg leading-7 text-[color:var(--foreground)]">
          “{scam.example}”
        </p>
      </div>

      <div className="mt-5">
        <p className="text-xs uppercase tracking-[0.12em] text-[color:var(--muted-2)]">
          Warning signs
        </p>
        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
          {scam.signs.map((s) => (
            <li key={s} className="flex items-start gap-2 text-sm text-[color:var(--foreground)]">
              <span
                aria-hidden
                className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]"
              />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
