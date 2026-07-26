import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = "https://wcchun.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  title: {
    default: "Wong Chun (Sunny) — Artist & Creative Technologist | WCCHUN",
    template: "%s | Wong Chun (Sunny) · WCCHUN",
  },
  description:
    "Portfolio of Hong Kong artist and creative technologist Wong Chun (Sunny), spanning computational art, interactive systems, learning technology, robotics and digital fabrication.",
  keywords: [
    "Wong Chun",
    "Sunny Wong",
    "WCCHUN",
    "Hong Kong artist",
    "creative technologist",
    "new media art",
    "learning technology",
    "digital fabrication",
  ],
  openGraph: {
    title: "Wong Chun (Sunny) — Artist & Creative Technologist | WCCHUN",
    description:
      "Portfolio of Hong Kong artist and creative technologist Wong Chun (Sunny), spanning computational art, interactive systems, learning technology, robotics and digital fabrication.",
    type: "website",
    locale: "en_HK",
    url: siteUrl,
    images: [{ url: `${siteUrl}/og.png`, width: 1200, height: 630, alt: "WCCHUN — Memory becomes material" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wong Chun (Sunny) — Artist & Creative Technologist | WCCHUN",
    description:
      "Portfolio of Hong Kong artist and creative technologist Wong Chun (Sunny), spanning computational art, interactive systems, learning technology, robotics and digital fabrication.",
    images: [`${siteUrl}/og.png`],
  },
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, sizes: "any" },
      { url: `${basePath}/favicon-32.png`, type: "image/png", sizes: "32x32" },
      { url: `${basePath}/favicon-16.png`, type: "image/png", sizes: "16x16" },
    ],
    shortcut: `${basePath}/favicon.ico`,
    apple: [{ url: `${basePath}/apple-touch-icon.png`, sizes: "180x180", type: "image/png" }],
  },
  manifest: `${basePath}/site.webmanifest`,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Wong Chun (Sunny)",
    alternateName: ["WCCHUN", "Sunny Wong"],
    url: siteUrl,
    image: `${siteUrl}/og.png`,
    email: "mailto:wcchun1234@gmail.com",
    jobTitle: "Artist and Creative Technologist",
    homeLocation: {
      "@type": "Place",
      name: "Hong Kong",
    },
    sameAs: [
      "https://www.instagram.com/wongchunsunny/",
      "https://www.behance.net/wongchun",
      "https://www.youtube.com/channel/UCK2wPLfi_gLUpipjDqq3pnw",
      "https://www.linkedin.com/in/wcchun/",
      "https://github.com/wcchun1234",
    ],
  };

  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
