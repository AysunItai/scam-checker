import { useTranslations } from "next-intl";

export function DisclaimerBox({ className = "" }: { className?: string }) {
  const t = useTranslations("disclaimer");
  return (
    <aside
      className={`rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)] p-5 text-sm leading-6 text-[color:var(--muted)] ${className}`}
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[color:var(--border-strong)] bg-[color:var(--surface)] text-[color:var(--foreground)]"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5" />
            <path d="M12 16h.01" />
          </svg>
        </span>
        <div>
          <p className="text-[color:var(--foreground)] font-medium">{t("title")}</p>
          <p className="mt-1">{t("body")}</p>
        </div>
      </div>
    </aside>
  );
}
