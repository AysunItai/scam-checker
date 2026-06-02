import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Logo({
  className = "",
  withWordmark = true,
}: {
  className?: string;
  withWordmark?: boolean;
}) {
  const t = useTranslations("meta");
  return (
    <Link
      href="/"
      aria-label={`${t("siteName")} — home`}
      className={`group inline-flex items-center gap-2 ${className}`}
    >
      <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--border-strong)] bg-[color:var(--surface)]">
        <span className="absolute h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] animate-pulse-dot" />
        <span className="absolute inset-1 rounded-full border border-[color:var(--border)] opacity-70" />
      </span>
      {withWordmark && (
        <span className="text-[15px] font-medium tracking-tight">
          Don&apos;t Pay <span className="font-serif-display text-[17px]">Yet</span>
        </span>
      )}
    </Link>
  );
}
