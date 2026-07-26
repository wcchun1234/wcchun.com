import type { Metadata } from "next";
import LegacyRedirect from "../legacy-redirect";

export const metadata: Metadata = {
  title: "ArtSense moved | Wong Chun",
  alternates: { canonical: "https://wcchun.com/work/memorygrid" },
  robots: { index: false, follow: true },
};

export default function OldArtSensePage() {
  return <LegacyRedirect destination="/work/memorygrid" />;
}
