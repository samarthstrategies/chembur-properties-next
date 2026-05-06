import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chembur Properties | Roopam Estate Agency — Est. 1965",
  description:
    "61 years of trusted real estate services in Chembur, Mumbai. Buy, sell, rent residential & commercial properties. NRI concierge, property management, redevelopment advisory. Call 98201 82285.",
  keywords:
    "Chembur real estate, property in Chembur Mumbai, 2BHK 3BHK Chembur, NRI property investment Mumbai, Roopam Estate Agency",
  openGraph: {
    title: "Chembur Properties | Roopam Estate Agency — Est. 1965",
    description:
      "Chembur's most trusted real estate agency since 1965. Residential, commercial, NRI services.",
    siteName: "Chembur Properties",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body bg-white text-navy antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
