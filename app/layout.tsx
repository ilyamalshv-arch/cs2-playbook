import "./globals.css";
import type { Metadata, Viewport } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cs2playbook.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CS2 Playbook · technique · tactics · callouts · mental",
    template: "%s · CS2 Playbook",
  },
  description:
    "A field manual for Counter-Strike 2. Interactive callouts in EN/RU/ES, anti-tilt protocol, 25+ years of tactics.",
  keywords: [
    "CS2", "Counter-Strike 2", "callouts", "tactics",
    "mirage", "inferno", "tilt test", "esports", "IGL",
  ],
  authors: [{ name: "Ilya" }],
  creator: "Ilya",
  openGraph: {
    type: "website",
    title: "CS2 Playbook · technique · tactics · callouts · mental",
    description:
      "Interactive callouts · headshot challenge · tilt test · 25+ years of tactics. No ads. No tracking.",
    siteName: "CS2 Playbook",
    locale: "en_US",
    alternateLocale: ["ru_RU", "es_AR"],
  },
  twitter: {
    card: "summary_large_image",
    title: "CS2 Playbook",
    description: "Interactive field manual for CS2. Callouts, tilt test, tactics.",
    creator: "@ilya",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
