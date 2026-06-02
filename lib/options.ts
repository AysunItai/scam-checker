import type { AskedFor, ContactChannel, Promise as PromiseType } from "./types";

/**
 * Ordered form options. Values only — labels live in messages files under
 * `check.channels`, `check.askedFor`, `check.promises` so they can be
 * translated and safety-critical wording stays in our control.
 *
 * Translation-key form: replace underscores with hyphens for the JSON key
 * (e.g. `send_money` → `check.askedFor.money` via the LABEL_KEY map below).
 */

export const CHANNEL_VALUES: ContactChannel[] = [
  "phone",
  "whatsapp",
  "sms",
  "email",
  "social",
  "website",
  "in_person",
  "other",
];

export const ASKED_FOR_VALUES: AskedFor[] = [
  "send_money",
  "gift_cards",
  "crypto",
  "bank_details",
  "password",
  "otp",
  "id_photo",
  "click_link",
  "install_app",
  "keep_secret",
  "act_urgently",
];

export const PROMISE_VALUES: PromiseType[] = [
  "prize",
  "money_waiting",
  "job",
  "investment",
  "loan",
  "delivery",
  "bank_help",
  "romance",
  "family_emergency",
  "government",
  "other",
];

/** Maps internal enum value → translation key under `check.channels.*`. */
export const CHANNEL_KEY: Record<ContactChannel, string> = {
  phone: "phone",
  whatsapp: "whatsapp",
  sms: "sms",
  email: "email",
  social: "social",
  website: "website",
  in_person: "in-person",
  other: "other",
};

/** Maps internal enum value → translation key under `check.askedFor.*`. */
export const ASKED_FOR_KEY: Record<AskedFor, string> = {
  send_money: "money",
  gift_cards: "giftcards",
  crypto: "crypto",
  bank_details: "bank-details",
  password: "password",
  otp: "otp",
  id_photo: "id",
  click_link: "link",
  install_app: "install-app",
  keep_secret: "secret",
  act_urgently: "urgent",
};

/** Maps internal enum value → translation key under `check.promises.*`. */
export const PROMISE_KEY: Record<PromiseType, string> = {
  prize: "prize",
  money_waiting: "money-waiting",
  job: "job",
  investment: "investment",
  loan: "loan",
  delivery: "delivery",
  bank_help: "bank",
  romance: "love",
  family_emergency: "family",
  government: "government",
  other: "other",
};
