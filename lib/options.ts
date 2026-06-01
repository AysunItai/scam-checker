import type { AskedFor, ContactChannel, Promise as PromiseType } from "./types";

export const CHANNEL_OPTIONS: { value: ContactChannel; label: string }[] = [
  { value: "phone", label: "Phone call" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "sms", label: "SMS / text" },
  { value: "email", label: "Email" },
  { value: "social", label: "Social media DM" },
  { value: "website", label: "Website / pop-up" },
  { value: "in_person", label: "In person" },
  { value: "other", label: "Other" },
];

export const ASKED_FOR_OPTIONS: { value: AskedFor; label: string }[] = [
  { value: "send_money", label: "Send money / bank transfer" },
  { value: "gift_cards", label: "Buy gift cards" },
  { value: "crypto", label: "Send crypto" },
  { value: "bank_details", label: "Share bank or card details" },
  { value: "password", label: "Share a password" },
  { value: "otp", label: "Share an OTP / security code" },
  { value: "id_photo", label: "Send ID or passport photo" },
  { value: "click_link", label: "Click a link" },
  { value: "install_app", label: "Install an app (AnyDesk, TeamViewer…)" },
  { value: "keep_secret", label: "Keep it secret from family" },
  { value: "act_urgently", label: "Act urgently / right now" },
];

export const PROMISE_OPTIONS: { value: PromiseType; label: string }[] = [
  { value: "prize", label: "Prize / lottery win" },
  { value: "money_waiting", label: "Money waiting for me" },
  { value: "job", label: "Job offer" },
  { value: "investment", label: "Investment profit" },
  { value: "loan", label: "Loan approval" },
  { value: "delivery", label: "Package delivery" },
  { value: "bank_help", label: "Bank / security help" },
  { value: "romance", label: "Love / relationship" },
  { value: "family_emergency", label: "Family emergency" },
  { value: "government", label: "Government / tax issue" },
  { value: "other", label: "Other" },
];

export const CHANNEL_LABEL: Record<ContactChannel, string> = Object.fromEntries(
  CHANNEL_OPTIONS.map((o) => [o.value, o.label]),
) as Record<ContactChannel, string>;

export const ASKED_FOR_LABEL: Record<AskedFor, string> = Object.fromEntries(
  ASKED_FOR_OPTIONS.map((o) => [o.value, o.label]),
) as Record<AskedFor, string>;

export const PROMISE_LABEL: Record<PromiseType, string> = Object.fromEntries(
  PROMISE_OPTIONS.map((o) => [o.value, o.label]),
) as Record<PromiseType, string>;
