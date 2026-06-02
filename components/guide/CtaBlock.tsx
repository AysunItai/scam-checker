import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { GlowBg } from "@/components/GlowBg";

export function CtaBlock() {
  const t = useTranslations("guides.common");
  return (
    <section className="relative overflow-hidden">
      <GlowBg variant="cool" />
      <div className="relative mx-auto max-w-3xl px-5 sm:px-8 py-20 sm:py-24 text-center">
        <h2 className="text-[28px] sm:text-4xl md:text-5xl tracking-tight font-medium leading-[1.08]">
          {t("ctaTitle")}{" "}
          <span className="font-serif-display text-[color:var(--muted)]">
            {t("ctaAccent")}
          </span>
        </h2>
        <p className="mt-5 text-[16px] sm:text-lg leading-8 text-[color:var(--muted)] max-w-xl mx-auto">
          {t("ctaBody")}
        </p>
        <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3">
          <Link href="/check" className="btn-primary">
            {t("ctaPrimary")}
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
              className="rtl:rotate-180"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
          <Link href="/scams" className="btn-ghost">
            {t("ctaSecondary")}
          </Link>
        </div>
      </div>
    </section>
  );
}
