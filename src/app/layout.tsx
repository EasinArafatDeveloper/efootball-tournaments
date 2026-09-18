import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

const fontOutfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

const fontJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NEXA Football — Bangladesh National eFootball Community & Championship",
    template: "%s | NEXA Football Bangladesh",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "eFootball Bangladesh",
    "NEXA Football",
    "eFCOB",
    "eFootball Tournament",
    "Bangladesh Esports",
    "Konami eFootball Mobile",
    "Player Rankings",
    "Esports Clubs Bangladesh",
  ],
  authors: [{ name: "NEXA Football Organization" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://necobbd.com",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: "NEXA Football Bangladesh",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${fontOutfit.variable} ${fontJakarta.variable} ${fontMono.variable} font-sans bg-[#FFFFFF] text-[#111111] min-h-screen flex flex-col antialiased selection:bg-[#111111] selection:text-white`}>
        {/* Global Desktop & Mobile Navigation */}
        <Navbar />

        {/* Main Content Area with Bottom Padding for Mobile Bottom Bar */}
        <main className="flex-1 relative z-10 pt-16 pb-20 md:pb-0">{children}</main>

        {/* Global Footer */}
        <Footer />

        {/* Fixed Mobile Bottom Bar */}
        <MobileBottomNav />
      </body>
    </html>
  );
}
