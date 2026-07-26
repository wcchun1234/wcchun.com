import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = "https://wcchun.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
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
