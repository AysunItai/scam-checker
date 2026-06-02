import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { BUILT_BY, POWERED_BY } from "@/lib/seo";

export function Footer() {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const tMeta = useTranslations("meta");
  const tAbout = useTranslations("about");

  return (
    <footer className="mt-24 border-t border-[color:var(--border)] bg-[color:var(--surface-2)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm leading-6 text-[color:var(--muted)]">
            {t("tagline")}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-[color:var(--muted-2)]">
            {tCommon("readGuide")}
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/check" className="link-anim">
                {tCommon("checkMessage")}
              </Link>
            </li>
            <li>
              <Link href="/scams" className="link-anim">
                {tCommon("browseScams")}
              </Link>
            </li>
            <li>
              <Link href="/about" className="link-anim">
                {tCommon("learnCommonScams")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-[color:var(--muted-2)]">
            {tAbout("recoveryEyebrow")}
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[color:var(--muted)]">
            <li>{tAbout("recoveryStep1")}</li>
            <li>{tAbout("recoveryStep2")}</li>
            <li>{tAbout("recoveryStep3")}</li>
            <li>{tAbout("recoveryStep4")}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[color:var(--border)]">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[color:var(--muted-2)]">
          <p className="max-w-2xl leading-5">{t("disclaimer")}</p>
          <p>
            © {new Date().getFullYear()} {tMeta("siteName")}
          </p>
        </div>
      </div>

      <div className="border-t border-[color:var(--border)]">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-[color:var(--muted-2)]">
          <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>{t("builtBy")}</span>
            <Attribution name={BUILT_BY.name} url={BUILT_BY.url} />
            <span className="opacity-60">·</span>
            <span>{t("poweredBy")}</span>
            <Attribution name={POWERED_BY.name} url={POWERED_BY.url} />
          </p>
          <p className="inline-flex items-center gap-1.5 opacity-80">
            <span className="h-1 w-1 rounded-full bg-[color:var(--accent)] animate-pulse-dot" />
            {t("madeWithCare")}
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
