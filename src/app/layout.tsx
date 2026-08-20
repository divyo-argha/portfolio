import type { Metadata } from "next";
import { PT_Serif, Public_Sans, JetBrains_Mono } from "next/font/google";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { themeInitScript } from "@/lib/theme";
import { siteConfig } from "@/lib/site";
import { personJsonLd } from "@/lib/jsonld";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

// A plain, institutional pairing rather than a trendy grotesk/mono system —
// PT Serif for anything actually read, Public Sans for UI chrome. The one
// monospace face left (--font-code) is reserved for literal code/commands,
// not used for labels or dates (see tokens.css).
const serif = PT_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const sans = Public_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const code = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Argha Pratim Saha",
    template: "%s — Argha Pratim Saha",
  },
  description:
    "Argha Pratim Saha — research in usable security & privacy, security education, and qualitative HCI. PhD applicant.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Argha Pratim Saha",
    description: "Research in usable security & privacy, security education, and qualitative HCI.",
    url: siteConfig.url,
    siteName: "Argha Pratim Saha",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Argha Pratim Saha",
    description: "Research in usable security & privacy, security education, and qualitative HCI.",
  },
  robots: {
    index: siteConfig.indexable,
    follow: siteConfig.indexable,
    googleBot: {
      index: siteConfig.indexable,
      follow: siteConfig.indexable,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${code.variable}`} suppressHydrationWarning>
      <head>
        {/* Blocking, pre-hydration: reads the stored theme before first paint so there's no flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
      </head>
      <body>
        <SkipLink />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <BackToTop />
        <Analytics />
      </body>
    </html>
  );
}
