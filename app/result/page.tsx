import type { Metadata } from "next";
import { ResultClient } from "./ResultClient";

export const metadata: Metadata = {
  title: "Your result",
  description:
    "Your scam-risk read, the reasons behind it, and what to do next.",
  alternates: { canonical: "/result" },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function ResultPage() {
  return <ResultClient />;
}
