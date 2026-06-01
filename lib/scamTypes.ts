export interface ScamType {
  id: string;
  title: string;
  short: string;
  body: string;
  signs: string[];
  example: string;
}

export const SCAM_TYPES: ScamType[] = [
  {
    id: "advance-fee",
    title: "“Money waiting” scam",
    short: "Pay a small fee to receive a big amount that doesn't exist.",
    body:
      "Someone says you have money, a prize, an inheritance, a refund, or social-insurance payment waiting — but first you must pay a 'small' fee, tax, or clearance charge. After you pay, there is always another fee. The money you were promised never arrives.",
    signs: [
      "They contacted you first — you didn't apply for anything",
      "There is always a fee before you can 'release' the money",
      "They push you to act today",
      "The amount waiting is suspiciously large",
    ],
    example:
      "“You have €4,200 in social insurance waiting. To release it, please send a €200 processing fee to this account.”",
  },
  {
    id: "fake-bank",
    title: "Fake bank / security call",
    short: "A 'bank security officer' asks for your code, password, or remote access.",
    body:
      "Someone calls or messages claiming your bank account is at risk. They ask you to 'verify' yourself with an OTP code, password, or to install a remote-control app like AnyDesk or TeamViewer. The moment you share any of these, they empty your account.",
    signs: [
      "They ask for an OTP, PIN, or password",
      "They ask you to install AnyDesk, TeamViewer or 'quick assist'",
      "They want you to move money to a 'safe account'",
      "Caller ID may look real — it can be spoofed",
    ],
    example:
      "“We detected suspicious activity. To protect your account, please read the 6-digit code we just sent you.”",
  },
  {
    id: "delivery",
    title: "Fake delivery fee scam",
    short: "A small payment by link to 'release' your package.",
    body:
      "An SMS or message claims a package is stuck at customs or needs a tiny redelivery fee (often €1–€3). The link leads to a fake page that steals your card details — and quietly enrolls your card in recurring charges.",
    signs: [
      "Unexpected delivery you don't remember ordering",
      "Suspiciously small fee with urgency",
      "Link looks almost like the real courier — but slightly wrong",
      "Asks for full card details just to 'pay' the fee",
    ],
    example:
      "“DHL: Your parcel is on hold. Pay €2.99 customs fee here to release: dh1-customs-eu.com/track”",
  },
  {
    id: "fake-job",
    title: "Fake job / task scam",
    short: "Easy online tasks that turn into 'deposit crypto to unlock earnings'.",
    body:
      "You're offered easy work-from-home tasks — liking videos, rating products, simple data entry. You earn fake 'balance' on a website. Then they say you must deposit money or crypto to unlock your earnings. You never see the money again.",
    signs: [
      "Job offer arrives unsolicited on WhatsApp or Telegram",
      "Pay seems way too high for the work",
      "You must deposit your own money to continue",
      "They direct you off the platform into a private group",
    ],
    example:
      "“Hi, we saw your CV. We pay €80/day for simple tasks. Add me on Telegram and I'll show you.”",
  },
  {
    id: "romance",
    title: "Romance scam",
    short: "Someone builds trust online, then asks for money in an 'emergency'.",
    body:
      "Over weeks or months they build a deep emotional connection — often refusing to meet or video-call clearly. Then something urgent 'happens': a medical bill, a stuck shipment, a frozen account abroad — and they need you to send money.",
    signs: [
      "Refuses to video-call or meet in person",
      "Quickly says they love you / wants a future together",
      "Lives or works abroad — military, oil rig, doctor",
      "An emergency conveniently requires your money",
    ],
    example:
      "“My darling, the hospital won't release me until I pay €1,500. You are the only one I can trust.”",
  },
  {
    id: "investment",
    title: "Investment / “signal group” scam",
    short: "Guaranteed profits, screenshots of wins, and a friendly 'mentor'.",
    body:
      "You're added to a WhatsApp/Telegram group full of 'students' showing huge profits. A mentor walks you through a trading platform. Your fake balance grows beautifully — until you try to withdraw and are asked to pay 'tax' or 'verification' fees.",
    signs: [
      "Guaranteed or unusually high returns",
      "All the screenshots look perfect",
      "You can only deposit, never freely withdraw",
      "Withdrawal blocked by sudden 'tax' or 'fee'",
    ],
    example:
      "“My students made $2,400 today following my signals. Start with $250 and I'll guide you personally.”",
  },
  {
    id: "government",
    title: "Government / tax impersonation",
    short: "A scary call from 'police' or 'tax office' demanding immediate payment.",
    body:
      "A caller claims to be from the police, tax office, immigration, or social services. They say there's a fine, a warrant, or that you'll be deported — and they demand payment by bank transfer, crypto, or gift cards within hours. Real government offices never do this.",
    signs: [
      "Threats of arrest, fines, or deportation",
      "Payment demanded immediately",
      "Payment must be in crypto, gift cards, or wire transfer",
      "You're told not to tell anyone",
    ],
    example:
      "“This is the tax office. There is a warrant for your arrest. Pay €1,800 today to clear it.”",
  },
];
