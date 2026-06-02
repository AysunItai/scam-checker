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

/**
 * Translation keys (NOT raw strings) returned by the risk engine.
 *
 * Why keys?  Safety-critical wording must stay 100% under our control. The
 * engine signals which reason / action applies; the UI looks up the localized
 * string from `messages/<locale>.json` — never machine-translated at runtime.
 */
export type ReasonKey =
  | "payFirst"
  | "otpRequest"
  | "giftcards"
  | "crypto"
  | "remoteApp"
  | "secret"
  | "urgent"
  | "bankCredentials"
  | "unexpectedMoney"
  | "linkPlusUrgency"
  | "idPhotos"
  | "patternPayFee"
  | "patternBank";

export type ActionKey =
  | "doNotSend"
  | "doNotInstall"
  | "askTrusted"
  | "verifyOfficial"
  | "callBank"
  | "reportLocal"
  | "blockNumber";

/**
 * The known scam guide slug a result was matched against (if any). Used to
 * deep-link the user to the relevant /<slug> guide. Kept as a string union of
 * existing guide slugs.
 */
export type MatchedGuideSlug =
  | "pay-fee-to-receive-money-scam"
  | "money-waiting-scam"
  | "fake-bank-call"
  | "otp-code-scam"
  | "whatsapp-scam"
  | "package-delivery-fee-scam"
  | "fake-job-task-scam"
  | "romance-money-scam"
  | "facebook-marketplace-scam"
  | "crypto-recovery-scam";

export interface CheckResult {
  level: RiskLevel;
  score: number;
  reasonKeys: ReasonKey[];
  actionKeys: ActionKey[];
  matchedGuideSlug?: MatchedGuideSlug;
}
