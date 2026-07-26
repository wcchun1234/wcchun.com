import type { Metadata } from "next";
import LegacyRedirect from "../../../legacy-redirect";

export const metadata: Metadata = {
  title: "Digital Echoes moved | Wong Chun",
  alternates: { canonical: "https://wcchun.com/work/digital-echoes" },
  robots: { index: false, follow: true },
};

export default function OldDigitalEchoesPage() {
  return <LegacyRedirect destination="/work/digital-echoes" />;
}
