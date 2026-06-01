import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Is this a scam? — Check before you pay",
  description:
    "Paste a suspicious message or describe a phone call. We look for scam warning signs and tell you what to verify before sending money or sharing details.",
  applicationName: "Is this a scam?",
  authors: [{ name: "Is this a scam?" }],
  keywords: [
    "scam checker",
    "fraud detector",
    "phishing check",
    "WhatsApp scam",
    "phone scam",
    "is this a scam",
  ],
  openGraph: {
    title: "Is this a scam? — Check before you pay",
    description:
      "A calm second opinion before you send money or share details with strangers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
