import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = basePath
  ? `https://wcchun1234.github.io${basePath}`
  : "https://www.wcchun.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "WCCHUN — Artist & Creative Technologist",
  description:
    "The portfolio of Hong Kong artist and creative technologist WCCHUN, working across computational image-making, photography and installation.",
  keywords: ["WCCHUN", "Wong Chun Sunny", "Hong Kong artist", "creative technology", "new media art"],
  openGraph: {
    title: "WCCHUN — Memory becomes material",
    description: "Art, technology and memory by Hong Kong artist WCCHUN.",
    type: "website",
    locale: "en_HK",
    url: siteUrl,
    images: [{ url: `${siteUrl}/og.png`, width: 1200, height: 630, alt: "WCCHUN — Memory becomes material" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WCCHUN — Memory becomes material",
    description: "Art, technology and memory by Hong Kong artist WCCHUN.",
    images: [`${siteUrl}/og.png`],
  },
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
