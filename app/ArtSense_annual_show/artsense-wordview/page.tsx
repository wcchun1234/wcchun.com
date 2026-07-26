import type { Metadata } from "next";
import LegacyRedirect from "../../legacy-redirect";

export const metadata: Metadata = {
  title: "WordView moved | Wong Chun",
  alternates: { canonical: "https://wcchun.com/work/wordview" },
  robots: { index: false, follow: true },
};

export default function OldWordViewPage() {
  return <LegacyRedirect destination="/work/wordview" />;
}
