export function RedFlagList({ flags }: { flags: string[] }) {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {flags.map((f, i) => (
        <li
          key={f}
          className="group flex items-start gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3.5 text-[15px] leading-7"
        >
          <span
            aria-hidden
            className="mt-1.5 inline-flex h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: "var(--risk-high)" }}
          />
          <span className="flex-1 break-anywhere">{f}</span>
          <span
            aria-hidden
            className="hidden sm:inline-block text-[10px] tabular-nums text-[color:var(--muted-2)] mt-1"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
        </li>
      ))}
    </ul>
  );
}
