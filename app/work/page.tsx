import type { Metadata } from "next";
import ArtArchive from "./art-archive";

export const metadata: Metadata = {
  title: "Art archive — 29 works",
  description: "Explore Wong Chun (Sunny)'s photography, installations, moving images, creative coding and earlier experiments.",
  alternates: { canonical: "https://wcchun.com/work" },
};

export default function WorkIndexPage() {
  return <ArtArchive />;
}
