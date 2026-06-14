import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicreatortools.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AICreatorTools – Best AI Tools for YouTube & Video Creators",
    template: "%s | AICreatorTools",
  },
  description:
    "Honest reviews, comparisons, and tutorials of the best AI tools for content creators, YouTubers, and faceless video channels. Updated regularly.",
  keywords: ["AI tools for content creators", "AI video tools", "YouTube AI tools", "AI for YouTubers"],
  authors: [{ name: "AICreatorTools Editorial" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AICreatorTools",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    site: "@aicreatortools",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
