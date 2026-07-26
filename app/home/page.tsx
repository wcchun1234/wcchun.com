import type { Metadata } from "next";
import LegacyRedirect from "../legacy-redirect";

export const metadata: Metadata = {
  title: "Portfolio moved | Wong Chun",
  alternates: { canonical: "https://wcchun.com/" },
  robots: { index: false, follow: true },
};

export default function OldHomePage() {
  return <LegacyRedirect destination="/" />;
}
