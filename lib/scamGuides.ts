/**
 * Scam guide content. Each entry powers one SEO landing page.
 *
 * Editorial rules (do not break):
 *   - Never say "safe".
 *   - Never say "not a scam".
 *   - Always frame results as: high risk / suspicious / unclear / lower risk — verify.
 *   - Tone: calm, protective, plain English. No fearmongering, no sales talk.
 */

export type ScamGuideSlug =
  | "is-this-a-scam"
  | "pay-fee-to-receive-money-scam"
  | "money-waiting-scam"
  | "fake-bank-call"
  | "otp-code-scam"
  | "whatsapp-scam"
  | "facebook-marketplace-scam"
  | "romance-money-scam"
  | "fake-job-task-scam"
  | "package-delivery-fee-scam"
  | "crypto-recovery-scam";

export type ChannelKind =
  | "phone"
  | "whatsapp"
  | "sms"
  | "email"
  | "website"
  | "social";

export interface ExampleMessage {
  channel: ChannelKind;
  sender: string;
  timestamp: string;
  bubbles: string[];
}

export interface ScamGuide {
  slug: ScamGuideSlug;
  category: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  h1: string;
  subhead: string;
  example: ExampleMessage;
  plain: string[];
  redFlags: string[];
  whatToDo: { dont: string[]; do: string[] };
  shareMessage: string;
  related: ScamGuideSlug[];
  severity: "high" | "sus" | "unclear";
}

export const SCAM_GUIDES: Record<ScamGuideSlug, ScamGuide> = {
  /* -------------------------------------------------------------- */
  "is-this-a-scam": {
    slug: "is-this-a-scam",
    category: "Start here",
    title: "Is this a scam? Pause and check before you pay",
    description:
      "Got an unexpected message, call, or payment request? Here are the warning signs to check before you send money, share a code, or click a link.",
    ogTitle: "Is this a scam? Pause before you pay or share.",
    ogDescription:
      "If you feel rushed, isolated, or asked to pay first — pause. That feeling is usually right.",
    h1: "Is this a scam? Pause before you pay or share.",
    subhead:
      "If you feel rushed, isolated, or asked to pay before you receive anything — pause. That feeling is usually right. Take two minutes to check it properly.",
    example: {
      channel: "phone",
      sender: "Unknown number",
      timestamp: "Today · 14:02",
      bubbles: [
        "Good afternoon, I am calling from the social insurance office.",
        "You have €4,200 waiting in your name. Please confirm your ID number so we can release it.",
        "There is a one-time admin fee of €200 to process the transfer today.",
      ],
    },
    plain: [
      "A scam is when someone you don't know contacts you, builds urgency or trust, and asks you to pay or share something private. They change the story each time — a refund, a job, a parcel, a romance, a bank security warning — but the pressure is always the same.",
      "If you feel rushed, isolated, or asked to pay before you receive anything: pause. Real institutions never need you to act inside the next ten minutes.",
    ],
    redFlags: [
      "They contacted you first, out of the blue.",
      "There is urgency — pay today, act in the next hour, before it expires.",
      "You're asked to send money, share an OTP / security code, or send a photo of your ID.",
      "You're asked to install AnyDesk, TeamViewer, Quick Assist, or any 'support' app.",
      "You're told to keep it private from your family or friends.",
      "You're promised money you didn't apply for — a prize, refund, inheritance, profit, or job.",
      "Payment is pushed toward methods you can't reverse: bank transfer, gift cards, or crypto.",
    ],
    whatToDo: {
      dont: [
        "Don't send money or share details based only on this call or message.",
        "Don't share OTP / security codes, passwords, PINs, or photos of your ID.",
        "Don't install AnyDesk, TeamViewer, or any remote-access app.",
        "Don't let them keep you on the line — you can hang up at any moment.",
      ],
      do: [
        "Verify by calling the company or bank directly using the number printed on your card or their official website.",
        "Ask one person you trust before you act — most scams collapse the moment a second person is involved.",
        "If money, codes, or details were already shared, call your bank now and report it.",
      ],
    },
    shareMessage:
      "Hey — please pause for a moment. Someone may be trying to scam you. Read this before you send any money, OTP codes, or ID photos:",
    related: [
      "pay-fee-to-receive-money-scam",
      "fake-bank-call",
      "otp-code-scam",
    ],
    severity: "high",
  },

  /* -------------------------------------------------------------- */
  "pay-fee-to-receive-money-scam": {
    slug: "pay-fee-to-receive-money-scam",
    category: "Advance-fee scam",
    title: "Asked to pay a fee to receive money? It's a scam",
    description:
      "If you're told to pay a 'small fee' to release a refund, prize, inheritance, or social insurance payment — don't. Here's why and what to do.",
    ogTitle: "Pay a fee to receive money? It's a scam",
    ogDescription:
      "No real institution ever asks you to send money first in order to receive money later.",
    h1: "Asked to pay a fee to receive money? Don't pay.",
    subhead:
      "No real institution will ever ask you to send money first to receive money later. This is one of the oldest and most reliable scams in the world.",
    example: {
      channel: "whatsapp",
      sender: "+234 80 *** ****",
      timestamp: "Today · 09:14",
      bubbles: [
        "Hello, you have been selected for a transfer of $8,500 USD.",
        "To release the funds, please pay a $180 clearance fee via this link.",
        "After payment we will send your money within 30 minutes.",
      ],
    },
    plain: [
      "This is called the advance-fee scam. The scammer dangles a large amount — a prize, refund, inheritance, payout, social-insurance claim — but you must pay a 'small' fee to unlock it. Once you pay, another fee appears. And another. The money you were promised never arrives.",
      "It works because the promised amount is much larger than the fee, so paying feels rational. It isn't. The fee is the entire point of the scam.",
    ],
    redFlags: [
      "You were contacted about money you didn't apply for.",
      "There is a fee — clearance, processing, tax, customs, admin — before you can receive anything.",
      "The promised amount is suspiciously large.",
      "Payment is requested by bank transfer, crypto, or gift cards — not back to the original sender.",
      "You're pushed to act today.",
      "When you hesitate, the story changes or a new fee appears.",
    ],
    whatToDo: {
      dont: [
        "Don't pay any fee — there is no real transfer waiting for you.",
        "Don't share your bank or card details with the sender.",
        "Don't send a photo of your ID 'for verification'.",
        "Don't reply trying to negotiate or ask questions — it only deepens the contact.",
      ],
      do: [
        "Block the sender and report the message inside the app (WhatsApp, SMS, email).",
        "If they impersonated a real organisation, contact that organisation directly through their official website.",
        "Tell one trusted person — talking about it out loud is the fastest way to clear your head.",
      ],
    },
    shareMessage:
      "Quick heads up — if anyone asks you to pay a small 'fee' to release a bigger amount of money, it's a scam. Please read this before you do anything:",
    related: ["money-waiting-scam", "crypto-recovery-scam", "is-this-a-scam"],
    severity: "high",
  },

  /* -------------------------------------------------------------- */
  "money-waiting-scam": {
    slug: "money-waiting-scam",
    category: "“Money waiting” scam",
    title: "“You have money waiting” — what to do if you get this call",
    description:
      "Someone says you have unclaimed money, social insurance, an inheritance, or a refund — but you must pay first. Here's what's really going on.",
    ogTitle: "“You have money waiting” — it's not real",
    ogDescription:
      "The waiting money doesn't exist. The fee they want is the whole scam.",
    h1: "“You have money waiting.” It almost certainly doesn't exist.",
    subhead:
      "Someone has told you there is money in your name — social insurance, a refund, an inheritance, a lottery, an old account. Then they ask you to pay something small to release it. The money is not real.",
    example: {
      channel: "phone",
      sender: "Caller ID withheld",
      timestamp: "Today · 11:38",
      bubbles: [
        "Hello, I am calling from the social insurance office.",
        "There is €4,200 in your name that was never claimed. We can release it today.",
        "We just need to verify your identity and process a €200 administrative fee.",
        "Please don't discuss this with anyone — it is a private government matter.",
      ],
    },
    plain: [
      "The 'money waiting' scam works on a simple trick: the amount they promise is much bigger than what they ask you to pay. Your brain treats it like a good trade. It isn't a trade — the waiting money was never real.",
      "Real institutions don't cold-call you about unclaimed money, don't ask for a fee to release it, and never ask you to keep it secret from your family.",
    ],
    redFlags: [
      "You're told there's a sum of money in your name, but you never applied for it.",
      "There's an upfront fee, tax, or 'verification charge' before they release it.",
      "You're asked to keep it private from your family.",
      "They created urgency — 'today only', 'before the file closes'.",
      "They asked for your ID number, bank details, or a photo of your ID.",
      "The caller ID looks foreign, hidden, or strangely official.",
    ],
    whatToDo: {
      dont: [
        "Don't send the fee — no matter how small or 'one-time' it sounds.",
        "Don't share your ID number, banking details, or photos of documents.",
        "Don't agree to keep it secret from your family — that request alone confirms the scam.",
      ],
      do: [
        "Hang up and call the agency or bank directly using a number you trust (printed on your card, their website, a previous letter).",
        "Tell one person you trust what you've been told.",
        "Block the number so they can't call you back to apply pressure.",
      ],
    },
    shareMessage:
      "Someone may be calling you about 'money waiting' in your name. It's a known scam — please don't pay or share anything. Read this first:",
    related: [
      "pay-fee-to-receive-money-scam",
      "fake-bank-call",
      "is-this-a-scam",
    ],
    severity: "high",
  },

  /* -------------------------------------------------------------- */
  "fake-bank-call": {
    slug: "fake-bank-call",
    category: "Fake bank call",
    title: "Fake bank call — what real banks never ask you to do",
    description:
      "If someone claims to be from your bank's security team and asks for an OTP, password, or to install an app — hang up. Here's how to verify safely.",
    ogTitle: "Fake bank call — what real banks never ask",
    ogDescription:
      "Real banks never ask for your OTP, password, or remote access to your phone.",
    h1: "Fake bank call: real banks never ask for these.",
    subhead:
      "Someone calls or messages saying your account is at risk and they need to 'protect' it. The moment they ask for a code, password, or to install an app — it stops being your bank.",
    example: {
      channel: "phone",
      sender: "“Bank Security”",
      timestamp: "Today · 21:04",
      bubbles: [
        "Good evening, we detected an unauthorised login on your account from another country.",
        "To stop the transaction, please read out the 6-digit code we just sent you.",
        "Then we'll move your funds into a secure account temporarily.",
      ],
    },
    plain: [
      "Bank impersonation works because the script is well-rehearsed and the urgency feels real. The caller already knows enough about you (often from public data or earlier phishing) to sound legitimate. Then they push you to share a code, a password, or to install a remote-access app — that's the trap.",
      "The 'safe account' they want you to move money to is theirs. Once the transfer is made, it is extremely hard to recover.",
    ],
    redFlags: [
      "They called you — you didn't call them.",
      "They ask for an OTP / verification code, PIN, password, or full card number.",
      "They ask you to install AnyDesk, TeamViewer, Quick Assist, or to share your screen.",
      "They want you to move money into a 'safe' or 'holding' account.",
      "Caller ID matches your bank — caller ID can be faked.",
      "They pressure you to stay on the line and not consult anyone.",
    ],
    whatToDo: {
      dont: [
        "Don't read out any code, OTP, or password — your bank never asks for these.",
        "Don't install any app at their request, even if it 'looks official'.",
        "Don't move money 'to keep it safe' — that's the scam.",
        "Don't stay on the call if you feel pressured. You can hang up and call back yourself.",
      ],
      do: [
        "Hang up. Wait a minute. Then call your bank using the number printed on your bank card or their official app.",
        "Report the call to your bank's fraud line and to your country's anti-fraud authority.",
        "If anything was shared or transferred, contact your bank immediately to attempt recall and freeze cards.",
      ],
    },
    shareMessage:
      "If anyone calls saying they're from your bank's security team and asks for a code, password, or to install an app — hang up. Please read this:",
    related: ["otp-code-scam", "is-this-a-scam", "money-waiting-scam"],
    severity: "high",
  },

  /* -------------------------------------------------------------- */
  "otp-code-scam": {
    slug: "otp-code-scam",
    category: "OTP / security code",
    title: "OTP code scam — never share the code, even with “your bank”",
    description:
      "An OTP, verification code, or one-time password is the key to your account. Real companies never ask for it. Here's why and how to react.",
    ogTitle: "OTP code scam — never share the code",
    ogDescription:
      "If someone is asking for the 6-digit code they just sent you — they are not your bank.",
    h1: "Never share the code. Not with your bank, not with anyone.",
    subhead:
      "The 6-digit code that just arrived on your phone is a key. Anyone who asks you for it — bank, courier, official, 'support agent' — is trying to open a door you'd never voluntarily open.",
    example: {
      channel: "sms",
      sender: "+1 (***) *** 3148",
      timestamp: "Today · 17:21",
      bubbles: [
        "Your verification code is 248-371. Do not share it with anyone.",
        "(a few seconds later, a phone call)",
        "Hi, this is account security — to confirm it's really you, please read me the 6-digit code we just sent.",
      ],
    },
    plain: [
      "An OTP — one-time password, SMS code, authenticator code — is the second factor that proves it's you logging in or approving a payment. The whole system depends on you never giving it to another person.",
      "If someone asks you for that code, no matter how official they sound, they are trying to log in as you or move your money. Read the SMS itself: it usually says 'do not share this with anyone'.",
    ],
    redFlags: [
      "Someone — even claiming to be from your bank — is asking for an OTP / verification code.",
      "The code arrived without you requesting it.",
      "The caller is talking you through 'verifying your identity' over the phone.",
      "They want it 'urgently' so the code doesn't expire.",
      "They sound calm and professional — scammers train for this.",
    ],
    whatToDo: {
      dont: [
        "Don't read the code out loud, type it into a chat, or paste it on a website they sent you.",
        "Don't trust caller ID or email sender names — both can be spoofed.",
        "Don't worry about being rude. Hang up.",
      ],
      do: [
        "If you didn't request the code, change the password on that account immediately.",
        "Call your bank using the official number on your card if anything feels off.",
        "Turn on app-based authentication (Authenticator apps, security keys) where available — they're harder to phish than SMS codes.",
      ],
    },
    shareMessage:
      "Quick reminder: never share an OTP / 6-digit code with anyone — not even someone who says they're from your bank. Please read this:",
    related: ["fake-bank-call", "whatsapp-scam", "is-this-a-scam"],
    severity: "high",
  },

  /* -------------------------------------------------------------- */
  "whatsapp-scam": {
    slug: "whatsapp-scam",
    category: "WhatsApp scams",
    title: "WhatsApp scam — how to spot the common patterns",
    description:
      "Impersonation, 'Hi mum' messages, fake job offers, investment groups, prize wins. The most common WhatsApp scams and how to handle them.",
    ogTitle: "WhatsApp scam — spot the common patterns",
    ogDescription:
      "Same script, different number. Here's how WhatsApp scams really work.",
    h1: "WhatsApp scam — same script, different number.",
    subhead:
      "Most WhatsApp scams reuse a small set of patterns: impersonating someone you know, offering easy money, promising prizes, or pretending to be a bank. Once you see the patterns, you can spot them in seconds.",
    example: {
      channel: "whatsapp",
      sender: "Unknown · +44 7*** *** ***",
      timestamp: "Today · 19:46",
      bubbles: [
        "Hi mum, this is my new number — I dropped my phone in the bath.",
        "Can you do me a favour? I need to pay something urgent and my banking app isn't working yet.",
        "Can you send €620 to this account? I'll pay you back tomorrow.",
      ],
    },
    plain: [
      "WhatsApp scams almost always start the same way: a message from a number you don't recognise, with a familiar-sounding hook. 'Hi mum, new number.' 'Hi, I saw your profile, are you free for some easy work?' 'Congratulations, you've won.' 'I'm from our bank.'",
      "If you don't recognise the number, treat anything they say as a stranger telling you a story. Verify through a channel you already trust before you act.",
    ],
    redFlags: [
      "A message from a number you don't have in your contacts.",
      "They claim to be a family member or friend who 'lost their phone' or 'has a new number'.",
      "They quickly move to asking for money, a code, or a payment 'on their behalf'.",
      "They offer a job paying unusually well for simple tasks.",
      "They add you to a group full of 'students' showing huge profits.",
      "They send a link to verify, claim a prize, or pay a small fee.",
    ],
    whatToDo: {
      dont: [
        "Don't send money based only on a WhatsApp message.",
        "Don't share OTP codes, passwords, or banking details.",
        "Don't click links from unknown contacts — even short ones.",
      ],
      do: [
        "If it says it's a family member, call their old number first to confirm. Or video-call from a known account.",
        "Report and block the number inside WhatsApp (tap their name → Report).",
        "If you suspect your own WhatsApp was hijacked, log out of all devices in WhatsApp settings and re-verify your number.",
      ],
    },
    shareMessage:
      "Quick warning — there's a wave of WhatsApp scams pretending to be family members, banks, or job offers. Please read this before replying to anything unusual:",
    related: ["otp-code-scam", "fake-job-task-scam", "is-this-a-scam"],
    severity: "high",
  },

  /* -------------------------------------------------------------- */
  "facebook-marketplace-scam": {
    slug: "facebook-marketplace-scam",
    category: "Marketplace scam",
    title: "Facebook Marketplace scam — buyer and seller red flags",
    description:
      "Fake couriers, overpayment, off-platform deals, prepaid 'shipping fees'. The most common Facebook Marketplace scams, in plain English.",
    ogTitle: "Facebook Marketplace scam — red flags",
    ogDescription:
      "Off-platform, overpayment, fake courier — the patterns to know.",
    h1: "Facebook Marketplace scam — buyer and seller patterns.",
    subhead:
      "Marketplace scams use the same handful of moves: overpayment, fake courier links, off-platform pressure, and 'verification' phone calls. Knowing the patterns is most of the protection.",
    example: {
      channel: "social",
      sender: "Interested buyer · Messenger",
      timestamp: "Today · 12:08",
      bubbles: [
        "Hi! I'll take it at your asking price.",
        "I'll send a courier to pick it up. They will charge a small €18 shipping fee on your side — I'll refund it through PayPal with the item price.",
        "Can you send me your card details so I can refund you?",
      ],
    },
    plain: [
      "Marketplace scams break down into a few recognisable shapes. Buyer-side: a 'buyer' pays too much by mistake and asks for the difference back — usually with a fake receipt. Seller-side: a 'seller' offers a great deal but pressures you off-platform to pay a deposit, a shipping fee, or a verification charge.",
      "If a deal feels strangely smooth and the other person quickly wants to leave the platform — slow down. Marketplace's protection only exists while you stay on it.",
    ],
    redFlags: [
      "They want to move the conversation off Marketplace immediately (to WhatsApp, SMS, email).",
      "They send a screenshot of a payment that 'just hasn't cleared yet'.",
      "They ask for your card details, bank login, or a one-time code 'for verification'.",
      "They use an unknown courier link that asks you to enter your card to 'release the parcel'.",
      "The deal price is much better than anywhere else.",
      "They want a deposit before you can see the item.",
    ],
    whatToDo: {
      dont: [
        "Don't share your card details, bank login, or OTP codes with another user.",
        "Don't pay deposits or 'shipping fees' to unknown courier links.",
        "Don't ship items before payment has actually cleared in your account.",
        "Don't move sensitive negotiations off-platform.",
      ],
      do: [
        "For high-value items, meet in person in a public place during the day, or use a courier you choose yourself.",
        "Check the buyer or seller's profile — new accounts with no history or photos are a red flag.",
        "Report suspicious messages to Facebook through the chat itself (tap the message → Report).",
      ],
    },
    shareMessage:
      "If you're buying or selling on Facebook Marketplace, please read this before you accept any deal or share any details:",
    related: ["package-delivery-fee-scam", "whatsapp-scam", "is-this-a-scam"],
    severity: "sus",
  },

  /* -------------------------------------------------------------- */
  "romance-money-scam": {
    slug: "romance-money-scam",
    category: "Romance scam",
    title: "Romance scam — when love turns into a money request",
    description:
      "Someone built a relationship with you online, then asked for money in an emergency. Here's how romance scams work, and how to step back safely.",
    ogTitle: "Romance scam — when love turns into a money request",
    ogDescription:
      "A relationship that lives only online, plus an urgent money request, is the romance scam pattern.",
    h1: "Romance scam — when love turns into a money request.",
    subhead:
      "Romance scams aren't about being naive. They're about months of patient connection followed by one specific moment of pressure. If you're feeling that moment right now, please pause before you send anything.",
    example: {
      channel: "whatsapp",
      sender: "Daniel · 5 months",
      timestamp: "Today · 23:14",
      bubbles: [
        "My darling, I miss you so much. Can't wait to finally meet.",
        "But something has happened. The hospital is keeping me here until I clear a €1,800 bill.",
        "You are the only one I can trust. Please send it tonight — I'll pay you back when I'm home.",
      ],
    },
    plain: [
      "The romance scam playbook is long and deliberate. Weeks or months of warmth. Future plans together. Refusal to video-call clearly or meet in person, always with a believable reason. Then a sudden crisis: a medical bill, a stuck shipment, a frozen account abroad, a customs fee. The 'love' becomes a money request.",
      "This isn't about how smart you are. It's about how human you are. The scam works precisely because the connection felt real.",
    ],
    redFlags: [
      "You met online and they've avoided clear video calls or meeting in person.",
      "They live or work somewhere conveniently far — military, oil rig, doctor abroad, traveling executive.",
      "They quickly said they love you or talked about a future together.",
      "A sudden emergency requires your money — medical, legal, customs, frozen account.",
      "They ask you to keep it private from your family.",
      "If you refuse, the tone shifts to guilt or anger.",
    ],
    whatToDo: {
      dont: [
        "Don't send money, gift cards, or crypto — no matter how urgent the story sounds.",
        "Don't take a loan, borrow from your family, or sell anything to help them.",
        "Don't share photos that could be used to pressure you later.",
        "Don't promise to keep it a secret from people who care about you.",
      ],
      do: [
        "Tell one trusted person what's happening. Read the messages out loud together.",
        "Reverse-image search their photos — many romance scammers reuse the same pictures.",
        "If you've already sent money, contact your bank immediately. You haven't done anything wrong, and you are not alone.",
      ],
    },
    shareMessage:
      "Hi — I want to share something gently. If someone you've met online is asking for money in an emergency, please read this before you send anything:",
    related: ["is-this-a-scam", "crypto-recovery-scam", "whatsapp-scam"],
    severity: "high",
  },

  /* -------------------------------------------------------------- */
  "fake-job-task-scam": {
    slug: "fake-job-task-scam",
    category: "Fake job / task scam",
    title: "Fake job task scam — “easy work” that asks for your money",
    description:
      "A WhatsApp or Telegram 'job' offers easy daily pay for liking videos or rating products — until you're asked to deposit money to unlock earnings.",
    ogTitle: "Fake job task scam — when easy work asks for money",
    ogDescription:
      "If a job asks you to deposit money to keep earning, it's not a job.",
    h1: "Fake job task scam — when easy work asks for your money.",
    subhead:
      "These start as friendly part-time offers on WhatsApp or Telegram and end with you being asked to deposit your own money — often in crypto — to unlock the salary you 'already earned'.",
    example: {
      channel: "whatsapp",
      sender: "HR · Maria",
      timestamp: "Today · 10:32",
      bubbles: [
        "Hi! We saw your CV. We pay €70 per day for simple online tasks — rating products, liking videos.",
        "After your first 30 tasks, you'll need to deposit €120 to activate your account and unlock earnings.",
        "Everyone is doing it — it pays back in 2 days.",
      ],
    },
    plain: [
      "These scams imitate real part-time work. You're given simple tasks and shown a growing 'balance' on a dashboard. Then a wall appears: deposit money — often crypto — to unlock the next level, or to withdraw earnings. The dashboard is fake. Your deposit is gone.",
      "A real employer never asks you to send them money in order to receive a salary. Ever.",
    ],
    redFlags: [
      "Job offer arrives unsolicited on WhatsApp or Telegram.",
      "Pay is unusually high for very simple work.",
      "You're moved off the platform into a private group with an 'instructor'.",
      "After some tasks, you must deposit money — often crypto — to continue or to withdraw.",
      "The dashboard shows large pending earnings you can't yet withdraw.",
      "Other 'happy workers' in the group post screenshots of their earnings.",
    ],
    whatToDo: {
      dont: [
        "Don't deposit any money to 'activate' an account or 'unlock' earnings.",
        "Don't send crypto to anyone you met through a job offer.",
        "Don't share a photo of your ID, bank details, or your card.",
        "Don't recruit friends or family to the group — that's how the scam scales.",
      ],
      do: [
        "Block the contact and leave any related group.",
        "Report the message inside WhatsApp / Telegram.",
        "If you already deposited, contact your bank or exchange — the sooner, the better the chance of recovery.",
      ],
    },
    shareMessage:
      "Quick warning about a job scam pattern going around — if a 'job' asks you to deposit money to unlock earnings, it isn't a job. Please read this:",
    related: ["whatsapp-scam", "crypto-recovery-scam", "is-this-a-scam"],
    severity: "high",
  },

  /* -------------------------------------------------------------- */
  "package-delivery-fee-scam": {
    slug: "package-delivery-fee-scam",
    category: "Delivery scam",
    title: "Package delivery fee scam — that small charge is a phishing trap",
    description:
      "An SMS or email says your package is stuck at customs or needs a small redelivery fee. The link steals your card details. Here's how to verify safely.",
    ogTitle: "Delivery fee scam — that small charge is a trap",
    ogDescription:
      "If a courier wants you to pay €1.50 via a link, the link is the scam.",
    h1: "Package delivery fee scam — the link is the scam.",
    subhead:
      "It's nearly always the same: a tiny payment to 'release' a parcel. The amount feels harmless. The page steals your card and quietly signs you up for recurring charges.",
    example: {
      channel: "sms",
      sender: "DHL-Customs",
      timestamp: "Today · 08:11",
      bubbles: [
        "DHL: Your parcel is on hold at customs.",
        "Please pay the €2.99 customs fee to release delivery:",
        "https://dh1-customs-eu[.]com/track",
      ],
    },
    plain: [
      "These messages are aimed at everyone, knowing that someone, somewhere, just ordered something. The page on the other end of the link looks like a real courier. It asks for your card details to pay the small fee — and uses the same details to sign you up for monthly charges, or to make larger purchases.",
      "The fee is tiny on purpose. It bypasses your suspicion.",
    ],
    redFlags: [
      "You're not expecting a delivery — or you're not sure if you are.",
      "The URL is almost the courier's name, but slightly off (dhl-vs-dh1, .com.eu, extra dashes).",
      "It asks for full card details — including CVV — just to pay €1–€3.",
      "Urgency: 'last attempt', 'will be returned today'.",
      "The message uses your phone number but doesn't address you by name.",
      "The sender ID looks slightly wrong (e.g. 'DHL-Customs' instead of just 'DHL').",
    ],
    whatToDo: {
      dont: [
        "Don't click the link in the SMS, even just to 'check'.",
        "Don't enter card details on any page reached from a delivery SMS.",
        "Don't trust the small fee — that's the entire psychological trick.",
      ],
      do: [
        "Go to the courier's official website yourself and paste your tracking number there. Or use the app you originally installed when ordering.",
        "Block and report the SMS sender.",
        "If you entered your card, freeze it inside your banking app and request a new one.",
      ],
    },
    shareMessage:
      "Heads up — there's a delivery-fee phishing SMS going around. The €1–€3 fee is the trap. Please read this before clicking any link:",
    related: ["facebook-marketplace-scam", "is-this-a-scam", "fake-bank-call"],
    severity: "high",
  },

  /* -------------------------------------------------------------- */
  "crypto-recovery-scam": {
    slug: "crypto-recovery-scam",
    category: "Recovery scam",
    title: "Crypto recovery scam — when “we can get your money back” is the scam",
    description:
      "Lost money to a scam and now someone offers to recover it? Recovery scams target victims a second time. Here's how to spot and avoid them.",
    ogTitle: "Crypto recovery scam — the second scam after the first",
    ogDescription:
      "Anyone promising to recover scammed crypto for a fee is almost always running the second scam.",
    h1: "Crypto recovery scam — the second scam after the first.",
    subhead:
      "If you've already lost money to a crypto or investment scam, expect to be contacted by 'recovery experts'. They are not lawyers, hackers, or government officials. They are the same playbook, second act.",
    example: {
      channel: "email",
      sender: "Crypto Recovery Bureau",
      timestamp: "Today · 16:02",
      bubbles: [
        "We have located the wallets that received your funds.",
        "We can recover 92% of the amount within 7 business days.",
        "There is a small upfront fee for blockchain analysis: $480 in USDT.",
      ],
    },
    plain: [
      "Recovery scams target people who've already been scammed. The scammers buy or trade victim lists, then approach you as a 'specialist', 'lawyer', or 'blockchain investigator'. They ask for an upfront fee and disappear with it — sometimes after extracting another round of details from you.",
      "Real recovery, when it happens at all, is slow, legal, and routed through your bank, your country's fraud authority, or licensed lawyers — never via WhatsApp messages or upfront crypto fees.",
    ],
    redFlags: [
      "They contacted you out of the blue after a loss you didn't report publicly.",
      "They promise a specific recovery percentage (90%+, guaranteed, etc).",
      "They want an upfront fee — especially in crypto or by wire transfer.",
      "They claim insider access to exchanges, wallets, or 'blockchain analysts'.",
      "They ask for access to your wallet, seed phrase, or exchange login.",
      "They pressure you to act fast 'while the wallet is still active'.",
    ],
    whatToDo: {
      dont: [
        "Don't pay any upfront fee, especially in crypto.",
        "Don't share your wallet seed phrase, private key, or exchange password — ever.",
        "Don't install remote-access tools to 'help with recovery'.",
        "Don't keep speaking to them in private — scammers rely on isolation.",
      ],
      do: [
        "Report the original scam to your country's fraud reporting service and to the exchange or platform involved.",
        "If you used a card or bank, your bank's fraud team is the right starting point.",
        "Tell one trusted person what happened. Recovery scams work by catching you when you're alone with the shame.",
      ],
    },
    shareMessage:
      "If you've lost money in a crypto or investment scam, please be careful with anyone offering to recover it. Recovery scams target victims a second time. Read this first:",
    related: [
      "romance-money-scam",
      "fake-job-task-scam",
      "pay-fee-to-receive-money-scam",
    ],
    severity: "high",
  },
};

/**
 * The six guides we feature on the homepage. Hand-curated, in order.
 * Each has a tight card-friendly label and a one-sentence blurb so the
 * homepage stays calm and scannable. Keeping the source of truth here
 * means we can swap the lineup in one place.
 */
export interface HomepageFeature {
  slug: ScamGuideSlug;
  label: string;
  blurb: string;
}

export const HOMEPAGE_FEATURES: HomepageFeature[] = [
  {
    slug: "pay-fee-to-receive-money-scam",
    label: "Pay a fee to receive money",
    blurb:
      "If they ask you to pay first to release a bigger amount — don't.",
  },
  {
    slug: "fake-bank-call",
    label: "Fake bank call",
    blurb:
      "Real banks never ask for codes, passwords, or to install an app.",
  },
  {
    slug: "otp-code-scam",
    label: "OTP / security code scam",
    blurb:
      "Never share the 6-digit code — not even with someone from “your bank.”",
  },
  {
    slug: "whatsapp-scam",
    label: "WhatsApp scam",
    blurb:
      "“Hi mum, new number” and easy job offers are scripts, not coincidences.",
  },
  {
    slug: "package-delivery-fee-scam",
    label: "Package delivery fee scam",
    blurb:
      "That tiny “customs fee” link is a phishing trap dressed as a courier.",
  },
  {
    slug: "fake-job-task-scam",
    label: "Fake job task scam",
    blurb:
      "If a job asks you to deposit money to unlock earnings, it isn't a job.",
  },
];

export function allGuideSlugs(): ScamGuideSlug[] {
  return Object.keys(SCAM_GUIDES) as ScamGuideSlug[];
}

export function getGuide(slug: string): ScamGuide | undefined {
  return SCAM_GUIDES[slug as ScamGuideSlug];
}

export function getRelatedGuides(slug: ScamGuideSlug): ScamGuide[] {
  const g = SCAM_GUIDES[slug];
  if (!g) return [];
  return g.related.map((s) => SCAM_GUIDES[s]).filter(Boolean);
}
