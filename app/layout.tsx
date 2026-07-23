import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.wcchun.com"),
  title: "WCCHUN — Artist & Creative Technologist",
  description:
    "The portfolio of Hong Kong artist and creative technologist WCCHUN, working across computational image-making, photography and installation.",
  keywords: ["WCCHUN", "Wong Chun Sunny", "Hong Kong artist", "creative technology", "new media art"],
  openGraph: {
    title: "WCCHUN — Memory becomes material",
    description: "Art, technology and memory by Hong Kong artist WCCHUN.",
    type: "website",
    locale: "en_HK",
    url: "https://www.wcchun.com",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "WCCHUN — Memory becomes material" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WCCHUN — Memory becomes material",
    description: "Art, technology and memory by Hong Kong artist WCCHUN.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
