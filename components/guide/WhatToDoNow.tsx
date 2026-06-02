import { useTranslations } from "next-intl";

export function WhatToDoNow({
  dont,
  doList,
}: {
  dont: string[];
  doList: string[];
}) {
  const t = useTranslations("guides.common");
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Column eyebrow={t("dontTitle")} tone="danger" items={dont} />
      <Column eyebrow={t("doTitle")} tone="verify" items={doList} />
    </div>
  );
}

function Column({
  eyebrow,
  tone,
  items,
}: {
  eyebrow: string;
  tone: "danger" | "verify";
  items: string[];
}) {
  const accent =
    tone === "danger" ? "var(--risk-high)" : "var(--risk-low)";
  const accentSoft =
    tone === "danger" ? "var(--risk-high-soft)" : "var(--risk-low-soft)";

  return (
    <div
      className="rounded-3xl border p-6 sm:p-7"
      style={{
        background: accentSoft,
        borderColor: `color-mix(in oklab, ${accent} 30%, transparent)`,
      }}
    >
      <p
        className="text-xs uppercase tracking-[0.16em]"
        style={{ color: `color-mix(in oklab, ${accent} 85%, black)` }}
      >
        {eyebrow}
      </p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-[15px] leading-7 text-[color:var(--foreground)]"
          >
            {tone === "danger" ? (
              <span
                aria-hidden
                className="mt-2 inline-flex h-3 w-3 shrink-0 items-center justify-center"
              >
                <span
                  className="block h-[2px] w-3 rounded-full"
                  style={{ background: accent }}
                />
              </span>
            ) : (
              <svg
                aria-hidden
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke={`color-mix(in oklab, ${accent} 90%, black)`}
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-1.5 shrink-0"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            )}
            <span className="break-anywhere">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
