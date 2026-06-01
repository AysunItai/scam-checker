import type { ChannelKind, ExampleMessage } from "@/lib/scamGuides";

const CHANNEL_META: Record<
  ChannelKind,
  { label: string; icon: React.ReactNode }
> = {
  phone: {
    label: "Phone call",
    icon: <PhoneIcon />,
  },
  whatsapp: {
    label: "WhatsApp",
    icon: <WhatsAppIcon />,
  },
  sms: {
    label: "SMS",
    icon: <SmsIcon />,
  },
  email: {
    label: "Email",
    icon: <EmailIcon />,
  },
  website: {
    label: "Website / pop-up",
    icon: <GlobeIcon />,
  },
  social: {
    label: "Social DM",
    icon: <DmIcon />,
  },
};

export function ExampleMessageCard({
  example,
}: {
  example: ExampleMessage;
}) {
  const meta = CHANNEL_META[example.channel];
  return (
    <figure
      className="relative rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 sm:p-7 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.18)]"
      aria-label="Example of this type of scam message"
    >
      <figcaption className="sr-only">
        Example of how this scam typically appears.
      </figcaption>

      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span
            aria-hidden
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[color:var(--surface-2)] border border-[color:var(--border)] text-[color:var(--foreground)]"
          >
            {meta.icon}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[color:var(--foreground)]">
              {example.sender}
            </p>
            <p className="text-[10px] uppercase tracking-[0.14em] text-[color:var(--muted-2)]">
              {meta.label} · {example.timestamp}
            </p>
          </div>
        </div>
        <span className="chip text-[10px] shrink-0">incoming</span>
      </header>

      <div className="mt-5 space-y-2.5">
        {example.bubbles.map((b, i) => (
          <ExampleBubble key={i}>{b}</ExampleBubble>
        ))}
      </div>

      <footer className="mt-5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[color:var(--muted-2)]">
        <span>Example of how this scam appears in real life.</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
          Not a real conversation
        </span>
      </footer>
    </figure>
  );
}

function ExampleBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-[color:var(--surface-2)] border border-[color:var(--border)] px-3.5 py-2.5 text-[14px] leading-6 text-[color:var(--foreground)]">
        {children}
      </div>
    </div>
  );
}

/* --- icons (calm, line-weight only) --- */
function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.52 3.48A11.84 11.84 0 0 0 12.04 0C5.42 0 .02 5.4.02 12.02c0 2.12.55 4.18 1.6 6L0 24l6.16-1.6a11.97 11.97 0 0 0 5.87 1.49h.01c6.62 0 12.02-5.4 12.02-12.02 0-3.21-1.25-6.23-3.54-8.39ZM12.04 21.8h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.21-3.65.95.98-3.55-.24-.37a9.85 9.85 0 1 1 18.31-5.23c0 5.44-4.43 9.78-9.99 9.78Z" />
    </svg>
  );
}
function SmsIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" />
    </svg>
  );
}
function EmailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}
function DmIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 11.5a9 9 0 0 1-15.5 6.2L2 21l1.5-4.7A9 9 0 1 1 22 11.5Z" />
      <circle cx="9" cy="11.5" r="0.9" fill="currentColor" />
      <circle cx="13" cy="11.5" r="0.9" fill="currentColor" />
      <circle cx="17" cy="11.5" r="0.9" fill="currentColor" />
    </svg>
  );
}
