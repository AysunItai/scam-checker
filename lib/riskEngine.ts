import type { AskedFor, CheckInput, CheckResult, Promise } from "./types";

/**
 * Rule-based risk engine.
 *
 * Design rule (from product spec):
 *   - We NEVER tell the user "this is safe".
 *   - Even at the lowest level we say "Lower risk, but still verify".
 *
 * Scoring: each hit adds points. Then we map to a level.
 *   high       >= 8
 *   suspicious >= 4
 *   unclear    >= 1
 *   low        == 0
 *
 * Plus, certain "automatic high risk" combinations always force `high`.
 */

const HARD_HIGH_RISK_KEYS: AskedFor[] = [
  "otp",
  "gift_cards",
  "crypto",
  "password",
  "install_app",
];

interface ReasonHit {
  reason: string;
  points: number;
}

function checkPaste(description: string): ReasonHit[] {
  const hits: ReasonHit[] = [];
  const text = description.toLowerCase();
  if (!text.trim()) return hits;

  const patterns: { match: RegExp; reason: string; points: number }[] = [
    {
      match: /\b(otp|one[- ]?time|verification code|security code|6[- ]?digit)\b/,
      reason: "They asked for a one-time / security code — real companies never ask for this.",
      points: 5,
    },
    {
      match: /\b(gift card|itunes|google play card|steam card|amazon card)\b/,
      reason: "They mentioned gift cards as payment — this is a classic scam signature.",
      points: 5,
    },
    {
      match: /\b(crypto|bitcoin|btc|usdt|eth|tether|binance)\b/,
      reason: "They mentioned crypto as payment — once sent, it cannot be reversed.",
      points: 4,
    },
    {
      match: /\b(anydesk|teamviewer|quick assist|remote (access|desktop))\b/,
      reason: "They wanted remote access to your device — this hands them your accounts.",
      points: 5,
    },
    {
      match: /\b(urgent|immediately|right now|within \d+ (minute|hour|day)|today only|expire|expir(es|ing))\b/,
      reason: "They created urgency to stop you from thinking or checking with anyone.",
      points: 2,
    },
    {
      match: /\b(don'?t tell|do not tell|keep (this|it) (a )?secret|confidential|just between us)\b/,
      reason: "They asked you to keep it secret — scammers isolate victims from people who would warn them.",
      points: 4,
    },
    {
      match: /\b(processing fee|advance fee|clearance fee|release fee|customs fee|tax fee|small fee)\b/,
      reason: "They asked for a fee to release money — this is the textbook 'advance-fee' scam.",
      points: 5,
    },
    {
      match: /\b(won|winner|congratulations|lottery|prize|inheritance|unclaimed|refund waiting)\b/,
      reason: "They claim you have money or a prize you never applied for.",
      points: 3,
    },
    {
      match: /\b(invest(ment)?|guaranteed (profit|return)|double your|trading signal|signal group)\b/,
      reason: "They promised guaranteed or unusually high returns — no real investment works that way.",
      points: 3,
    },
    {
      match: /\b(bank account .*(suspend|block|frozen|compromis))|((suspend|block|frozen|compromis).*(bank|account|card))\b/,
      reason: "They impersonated your bank with a scary warning — real banks never ask for codes or passwords.",
      points: 4,
    },
    {
      match: /\b(package|parcel|courier|dhl|fedex|ups|customs).*(fee|payment|pay)\b/,
      reason: "They want you to pay a small fee for a package — almost always a phishing link.",
      points: 4,
    },
    {
      match: /\b(government|tax office|hmrc|irs|police|interpol|migration|deport)\b/,
      reason: "They impersonated a government agency to scare you — real agencies don't call asking for money.",
      points: 3,
    },
    {
      match: /\b(verify your|confirm your).*(account|identity|card|bank)\b/,
      reason: "They asked you to 'verify' your account via a link or by sharing details.",
      points: 3,
    },
    {
      match: /\b(wrong number|sorry, who).*\b/,
      reason: "Conversation started from a 'wrong number' — a common entry point for romance/investment scams.",
      points: 2,
    },
    {
      match: /\b(easy money|work from home|earn .{0,20}(daily|weekly)|like videos|rate products)\b/,
      reason: "They offered easy online tasks for money — typical 'task scam' that ends with you depositing crypto.",
      points: 4,
    },
    {
      match: /\b(love|miss you|my dear|future together|marriage).{0,80}(money|help|send|wire|transfer)\b/,
      reason: "Romantic language combined with a money request — a hallmark of romance scams.",
      points: 4,
    },
  ];

  for (const p of patterns) {
    if (p.match.test(text)) {
      hits.push({ reason: p.reason, points: p.points });
    }
  }

  // Length penalty: very short input gives us little to go on
  if (text.length < 40 && hits.length === 0) {
    hits.push({
      reason:
        "We don't have enough detail to find specific signs — paste the full message or describe what they said.",
      points: 0,
    });
  }

  return hits;
}

function checkAskedFor(askedFor: AskedFor[]): ReasonHit[] {
  const hits: ReasonHit[] = [];

  const map: Record<AskedFor, { reason: string; points: number }> = {
    send_money: {
      reason: "They asked you to send money — once it leaves your account, it is very hard to get back.",
      points: 3,
    },
    gift_cards: {
      reason: "They asked you to buy gift cards — no legitimate business ever asks for this.",
      points: 6,
    },
    crypto: {
      reason: "They asked you to send crypto — crypto transfers cannot be reversed.",
      points: 5,
    },
    bank_details: {
      reason: "They asked for your full bank or card details — never share these with someone who contacted you.",
      points: 4,
    },
    password: {
      reason: "They asked for a password — no real company will ever ask for your password.",
      points: 6,
    },
    otp: {
      reason: "They asked for an OTP / security code — this hands them full access to your account.",
      points: 6,
    },
    id_photo: {
      reason: "They asked for a photo of your ID — this can be used to open accounts in your name.",
      points: 3,
    },
    click_link: {
      reason: "They pushed you to click a link — phishing pages look real but steal your details.",
      points: 2,
    },
    install_app: {
      reason: "They asked you to install an app (e.g. AnyDesk, TeamViewer) — this gives them full remote control.",
      points: 6,
    },
    keep_secret: {
      reason: "They asked you to keep it secret — scammers isolate victims so no one talks them out of it.",
      points: 4,
    },
    act_urgently: {
      reason: "They pressured you to act urgently — urgency is the scammer's most reliable tool.",
      points: 2,
    },
  };

  for (const k of askedFor) hits.push(map[k]);
  return hits;
}

function checkPromise(promise: Promise | null): ReasonHit[] {
  if (!promise) return [];
  const map: Record<Promise, { reason: string; points: number }> = {
    prize: {
      reason: "You were told you 'won' something you never entered.",
      points: 3,
    },
    money_waiting: {
      reason: "They claim money is waiting for you — this almost always comes with a fake fee to 'release' it.",
      points: 4,
    },
    job: {
      reason: "Job offers from strangers that ask for any payment or personal data are a known scam pattern.",
      points: 2,
    },
    investment: {
      reason: "They promised investment profit — real investing has risk; promised returns are a red flag.",
      points: 3,
    },
    loan: {
      reason: "They offered a loan but want a fee first — legitimate lenders never charge an upfront fee like this.",
      points: 3,
    },
    delivery: {
      reason: "A 'delivery' that demands a small payment by link is one of the most common phishing scams.",
      points: 3,
    },
    bank_help: {
      reason: "They claim to be from your bank's security team — a top impersonation scam right now.",
      points: 3,
    },
    romance: {
      reason: "They built an online relationship before asking for money — this is the romance scam playbook.",
      points: 3,
    },
    family_emergency: {
      reason:
        "They claim a family member is in trouble and need money fast — verify by calling that person directly first.",
      points: 4,
    },
    government: {
      reason: "They claim to be from the government — real agencies never call demanding immediate payment.",
      points: 3,
    },
    other: { reason: "", points: 0 },
  };

  const h = map[promise];
  return h && h.reason ? [h] : [];
}

interface KnownPattern {
  id: string;
  label: string;
  href: string;
  match: (i: CheckInput) => boolean;
}

const KNOWN_PATTERNS: KnownPattern[] = [
  {
    id: "advance_fee",
    label: "“Money waiting” / advance-fee scam",
    href: "/scams#advance-fee",
    match: (i) =>
      (i.promise === "money_waiting" ||
        i.promise === "prize" ||
        i.promise === "loan") &&
      (i.askedFor.includes("send_money") || /fee|deposit|clearance|processing/i.test(i.description)),
  },
  {
    id: "fake_bank",
    label: "Fake bank / security call",
    href: "/scams#fake-bank",
    match: (i) =>
      i.promise === "bank_help" &&
      (i.askedFor.includes("otp") ||
        i.askedFor.includes("password") ||
        i.askedFor.includes("install_app")),
  },
  {
    id: "delivery",
    label: "Fake delivery fee scam",
    href: "/scams#delivery",
    match: (i) =>
      i.promise === "delivery" &&
      (i.askedFor.includes("click_link") || i.askedFor.includes("send_money")),
  },
  {
    id: "job",
    label: "Fake job / task scam",
    href: "/scams#fake-job",
    match: (i) =>
      i.promise === "job" &&
      (i.askedFor.includes("send_money") ||
        i.askedFor.includes("crypto") ||
        i.askedFor.includes("id_photo")),
  },
  {
    id: "romance",
    label: "Romance scam",
    href: "/scams#romance",
    match: (i) =>
      i.promise === "romance" &&
      (i.askedFor.includes("send_money") || i.askedFor.includes("crypto")),
  },
  {
    id: "investment",
    label: "Investment / “signal group” scam",
    href: "/scams#investment",
    match: (i) =>
      i.promise === "investment" &&
      (i.askedFor.includes("send_money") || i.askedFor.includes("crypto")),
  },
  {
    id: "government",
    label: "Government / tax impersonation",
    href: "/scams#government",
    match: (i) =>
      i.promise === "government" &&
      (i.askedFor.includes("send_money") ||
        i.askedFor.includes("gift_cards") ||
        i.askedFor.includes("crypto")),
  },
];

function levelFor(score: number): "high" | "suspicious" | "unclear" | "low" {
  if (score >= 8) return "high";
  if (score >= 4) return "suspicious";
  if (score >= 1) return "unclear";
  return "low";
}

const TITLE: Record<ReturnType<typeof levelFor>, string> = {
  high: "High scam risk",
  suspicious: "Suspicious",
  unclear: "Unclear",
  low: "Lower risk — but still verify",
};

const SUMMARY: Record<ReturnType<typeof levelFor>, string> = {
  high: "Do not send money or share private information. This has strong scam warning signs.",
  suspicious: "Some details look risky. Verify independently before doing anything else.",
  unclear:
    "We cannot confirm this is safe. Do not pay or share sensitive information until you verify through an official source.",
  low: "We did not find strong scam signs — but this does not mean it is safe. Verify before acting.",
};

const WHAT_TO_DO_BASE = [
  "Do not send money, codes, gift cards, or remote access — even a small amount.",
  "Do not share bank details, passwords, OTP codes, or photos of your ID.",
  "Contact the company, bank, or government office directly using the number printed on their official website or your card.",
  "Talk to one trusted person before you act — scams rely on you staying alone with the decision.",
];

export function evaluate(input: CheckInput): CheckResult {
  const all: ReasonHit[] = [
    ...checkPaste(input.description),
    ...checkAskedFor(input.askedFor),
    ...checkPromise(input.promise),
  ];

  let score = all.reduce((acc, h) => acc + h.points, 0);
  const reasons = Array.from(new Set(all.filter((h) => h.reason).map((h) => h.reason)));

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

  const matched = KNOWN_PATTERNS.find((p) => p.match(input));

  return {
    level,
    score,
    title: TITLE[level],
    summary: SUMMARY[level],
    reasons:
      reasons.length > 0
        ? reasons
        : [
            "We didn't find specific warning signs from what you told us — but unsolicited contact is always worth verifying.",
          ],
    whatToDo: WHAT_TO_DO_BASE,
    matchedPattern: matched
      ? { id: matched.id, label: matched.label, href: matched.href }
      : undefined,
  };
}
