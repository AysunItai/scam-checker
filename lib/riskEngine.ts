import type {
  ActionKey,
  AskedFor,
  CheckInput,
  CheckResult,
  MatchedGuideSlug,
  Promise,
  ReasonKey,
  RiskLevel,
} from "./types";

/**
 * Rule-based risk engine.
 *
 * Design rules:
 *   1. We NEVER tell the user "this is safe". Even at the lowest level we say
 *      "Lower risk, but still verify".
 *   2. Outputs are translation *keys*, not raw strings. The page resolves them
 *      via next-intl. This guarantees safety-critical wording is identical
 *      across en/he/tr — no machine translation can sneak in "safe".
 *
 * Scoring: each hit adds points. Then we map to a level.
 *   high       >= 8
 *   suspicious >= 4
 *   unclear    >= 1
 *   low        == 0
 *
 * Plus, certain combinations always force `high` (hard-high override).
 */

interface ReasonHit {
  key: ReasonKey;
  points: number;
}

const HARD_HIGH_RISK_KEYS: AskedFor[] = [
  "otp",
  "gift_cards",
  "crypto",
  "password",
  "install_app",
];

// ─── Pattern matchers (regex-based, applied to free text) ────────────────────

interface TextPattern {
  match: RegExp;
  key: ReasonKey;
  points: number;
}

const TEXT_PATTERNS: TextPattern[] = [
  {
    match:
      /\b(otp|one[- ]?time|verification code|security code|6[- ]?digit)\b/,
    key: "otpRequest",
    points: 5,
  },
  {
    match: /\b(gift card|itunes|google play card|steam card|amazon card)\b/,
    key: "giftcards",
    points: 5,
  },
  {
    match: /\b(crypto|bitcoin|btc|usdt|eth|tether|binance)\b/,
    key: "crypto",
    points: 4,
  },
  {
    match: /\b(anydesk|teamviewer|quick assist|remote (access|desktop))\b/,
    key: "remoteApp",
    points: 5,
  },
  {
    match:
      /\b(urgent|immediately|right now|within \d+ (minute|hour|day)|today only|expire|expir(es|ing))\b/,
    key: "urgent",
    points: 2,
  },
  {
    match:
      /\b(don'?t tell|do not tell|keep (this|it) (a )?secret|confidential|just between us)\b/,
    key: "secret",
    points: 4,
  },
  {
    match:
      /\b(processing fee|advance fee|clearance fee|release fee|customs fee|tax fee|small fee)\b/,
    key: "payFirst",
    points: 5,
  },
  {
    match: /\b(bank account .*(suspend|block|frozen|compromis))|((suspend|block|frozen|compromis).*(bank|account|card))\b/,
    key: "bankCredentials",
    points: 4,
  },
  {
    match: /\b(package|parcel|courier|dhl|fedex|ups|customs).*(fee|payment|pay)\b/,
    key: "linkPlusUrgency",
    points: 4,
  },
  {
    match: /\b(won|winner|congratulations|lottery|prize|inheritance|unclaimed|refund waiting)\b/,
    key: "unexpectedMoney",
    points: 3,
  },
];

function checkPaste(description: string): ReasonHit[] {
  const text = description.toLowerCase();
  if (!text.trim()) return [];
  const hits: ReasonHit[] = [];
  for (const p of TEXT_PATTERNS) {
    if (p.match.test(text)) hits.push({ key: p.key, points: p.points });
  }
  return hits;
}

// ─── Asked-for checkbox mapping ──────────────────────────────────────────────

const ASKED_FOR_MAP: Record<AskedFor, { key: ReasonKey; points: number } | null> = {
  send_money: { key: "payFirst", points: 3 },
  gift_cards: { key: "giftcards", points: 6 },
  crypto: { key: "crypto", points: 5 },
  bank_details: { key: "bankCredentials", points: 4 },
  password: { key: "bankCredentials", points: 6 },
  otp: { key: "otpRequest", points: 6 },
  id_photo: { key: "idPhotos", points: 3 },
  click_link: { key: "linkPlusUrgency", points: 2 },
  install_app: { key: "remoteApp", points: 6 },
  keep_secret: { key: "secret", points: 4 },
  act_urgently: { key: "urgent", points: 2 },
};

function checkAskedFor(askedFor: AskedFor[]): ReasonHit[] {
  const hits: ReasonHit[] = [];
  for (const k of askedFor) {
    const m = ASKED_FOR_MAP[k];
    if (m) hits.push(m);
  }
  return hits;
}

// ─── Promise → reason mapping ────────────────────────────────────────────────

const PROMISE_MAP: Record<Promise, { key: ReasonKey; points: number } | null> = {
  prize: { key: "unexpectedMoney", points: 3 },
  money_waiting: { key: "payFirst", points: 4 },
  job: { key: "unexpectedMoney", points: 2 },
  investment: { key: "unexpectedMoney", points: 3 },
  loan: { key: "payFirst", points: 3 },
  delivery: { key: "linkPlusUrgency", points: 3 },
  bank_help: { key: "patternBank", points: 3 },
  romance: { key: "unexpectedMoney", points: 3 },
  family_emergency: { key: "urgent", points: 4 },
  government: { key: "unexpectedMoney", points: 3 },
  other: null,
};

function checkPromise(promise: Promise | null): ReasonHit[] {
  if (!promise) return [];
  const m = PROMISE_MAP[promise];
  return m ? [m] : [];
}

// ─── Known pattern matching → maps to a guide slug ───────────────────────────

interface KnownPattern {
  slug: MatchedGuideSlug;
  match: (i: CheckInput) => boolean;
}

const KNOWN_PATTERNS: KnownPattern[] = [
  {
    slug: "pay-fee-to-receive-money-scam",
    match: (i) =>
      (i.promise === "money_waiting" ||
        i.promise === "prize" ||
        i.promise === "loan") &&
      (i.askedFor.includes("send_money") ||
        /fee|deposit|clearance|processing/i.test(i.description)),
  },
  {
    slug: "fake-bank-call",
    match: (i) =>
      i.promise === "bank_help" &&
      (i.askedFor.includes("otp") ||
        i.askedFor.includes("password") ||
        i.askedFor.includes("install_app")),
  },
  {
    slug: "otp-code-scam",
    match: (i) => i.askedFor.includes("otp"),
  },
  {
    slug: "package-delivery-fee-scam",
    match: (i) =>
      i.promise === "delivery" &&
      (i.askedFor.includes("click_link") || i.askedFor.includes("send_money")),
  },
  {
    slug: "fake-job-task-scam",
    match: (i) =>
      i.promise === "job" &&
      (i.askedFor.includes("send_money") ||
        i.askedFor.includes("crypto") ||
        i.askedFor.includes("id_photo")),
  },
  {
    slug: "romance-money-scam",
    match: (i) =>
      i.promise === "romance" &&
      (i.askedFor.includes("send_money") || i.askedFor.includes("crypto")),
  },
  {
    slug: "whatsapp-scam",
    match: (i) =>
      i.channel === "whatsapp" &&
      (i.askedFor.includes("send_money") ||
        i.askedFor.includes("otp") ||
        i.askedFor.includes("click_link")),
  },
];

// ─── Level mapping ───────────────────────────────────────────────────────────

function levelFor(score: number): RiskLevel {
  if (score >= 8) return "high";
  if (score >= 4) return "suspicious";
  if (score >= 1) return "unclear";
  return "low";
}

// ─── Public entry point ──────────────────────────────────────────────────────

export function evaluate(input: CheckInput): CheckResult {
  const all: ReasonHit[] = [
    ...checkPaste(input.description),
    ...checkAskedFor(input.askedFor),
    ...checkPromise(input.promise),
  ];

  let score = all.reduce((acc, h) => acc + h.points, 0);

  // Hard-high overrides
  const hasHardHigh =
    input.askedFor.some((a) => HARD_HIGH_RISK_KEYS.includes(a)) ||
    /\b(otp|one[- ]?time|verification code|security code)\b/i.test(input.description) ||
    /\b(anydesk|teamviewer|quick assist)\b/i.test(input.description) ||
    /\b(gift card|itunes card|google play card)\b/i.test(input.description) ||
    (input.promise === "money_waiting" && input.askedFor.includes("send_money")) ||
    (input.promise === "prize" && input.askedFor.includes("send_money")) ||
    (input.promise === "loan" && input.askedFor.includes("send_money")) ||
    (input.askedFor.includes("keep_secret") && input.askedFor.includes("send_money"));

  if (hasHardHigh && score < 8) score = 8;

  const level = levelFor(score);

  // De-duplicate reason keys, preserve order
  const seen = new Set<ReasonKey>();
  const reasonKeys: ReasonKey[] = [];
  for (const h of all) {
    if (!seen.has(h.key)) {
      seen.add(h.key);
      reasonKeys.push(h.key);
    }
  }

  // Build dynamic action list based on what hit
  const actionKeys: ActionKey[] = ["doNotSend", "askTrusted", "verifyOfficial"];
  if (
    reasonKeys.includes("remoteApp") ||
    input.askedFor.includes("install_app") ||
    input.askedFor.includes("click_link")
  ) {
    actionKeys.splice(1, 0, "doNotInstall");
  }
  if (level === "high") {
    actionKeys.push("callBank", "reportLocal", "blockNumber");
  } else if (level === "suspicious") {
    actionKeys.push("blockNumber");
  }

  const matched = KNOWN_PATTERNS.find((p) => p.match(input));

  return {
    level,
    score,
    reasonKeys,
    actionKeys,
    matchedGuideSlug: matched?.slug,
  };
}
