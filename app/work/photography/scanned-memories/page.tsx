import type { Metadata } from "next";
import LegacyRedirect from "../../../legacy-redirect";

export const metadata: Metadata = {
  title: "Scanned Memories moved | Wong Chun",
  alternates: { canonical: "https://wcchun.com/work/scanned-memories" },
  robots: { index: false, follow: true },
};

export default function OldScannedMemoriesPage() {
  return <LegacyRedirect destination="/work/scanned-memories" />;
}
