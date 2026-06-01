export type ContactChannel =
  | "phone"
  | "whatsapp"
  | "sms"
  | "email"
  | "social"
  | "website"
  | "in_person"
  | "other";

export type AskedFor =
  | "send_money"
  | "gift_cards"
  | "crypto"
  | "bank_details"
  | "password"
  | "otp"
  | "id_photo"
  | "click_link"
  | "install_app"
  | "keep_secret"
  | "act_urgently";

export type Promise =
  | "prize"
  | "money_waiting"
  | "job"
  | "investment"
  | "loan"
  | "delivery"
  | "bank_help"
  | "romance"
  | "family_emergency"
  | "government"
  | "other";

export type RiskLevel = "high" | "suspicious" | "unclear" | "low";

export interface CheckInput {
  description: string;
  channel: ContactChannel | null;
  askedFor: AskedFor[];
  promise: Promise | null;
}

export interface CheckResult {
  level: RiskLevel;
  score: number;
  title: string;
  summary: string;
  reasons: string[];
  whatToDo: string[];
  matchedPattern?: {
    id: string;
    label: string;
    href: string;
  };
}
