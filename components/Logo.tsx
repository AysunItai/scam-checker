import Link from "next/link";

export function Logo({
  className = "",
  withWordmark = true,
}: {
  className?: string;
  withWordmark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Is this a scam? — home"
      className={`group inline-flex items-center gap-2 ${className}`}
    >
      <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--border-strong)] bg-[color:var(--surface)]">
        <span className="absolute h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] animate-pulse-dot" />
        <span className="absolute inset-1 rounded-full border border-[color:var(--border)] opacity-70" />
      </span>
      {withWordmark && (
        <span className="text-[15px] font-medium tracking-tight">
          is this a <span className="font-serif-display text-[17px]">scam</span>?
        </span>
      )}
    </Link>
  );
}
