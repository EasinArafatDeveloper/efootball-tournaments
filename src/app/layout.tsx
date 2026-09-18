import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

const fontJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "eFCOB — Bangladesh National eFootball Community & Championship",
    template: "%s | eFCOB Bangladesh",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "eFootball Bangladesh",
    "eFCOB",
    "eFootball Tournament",
    "Bangladesh Esports",
    "Konami eFootball Mobile",
    "Player Rankings",
    "Esports Clubs Bangladesh",
  ],
  authors: [{ name: "eFCOB Esports Organization" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://necobbd.com",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: "eFCOB Bangladesh",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${fontJakarta.variable} font-sans bg-[#FFFFFF] text-[#111111] min-h-screen flex flex-col antialiased selection:bg-[#111111] selection:text-white`}>
        {/* Global Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 relative z-10 pt-16">{children}</main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
