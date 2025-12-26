import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "6 Al Top | Luxury Holiday Home in Rome",
  description: "Experience unparalleled luxury in the heart of Rome. A prestigious rooftop retreat on the 6th floor, featuring panoramic views, designer interiors, and world-class amenities just steps from Termini Station.",
  keywords: ["Rome luxury apartment", "holiday home Rome", "Termini Station accommodation", "luxury rental Rome", "rooftop suite Rome"],
  authors: [{ name: "6 Al Top" }],
  openGraph: {
    title: "6 Al Top | Luxury Holiday Home in Rome",
    description: "Experience unparalleled luxury in the heart of Rome. A prestigious rooftop retreat featuring panoramic views and world-class amenities.",
    url: "https://www.6altop.com",
    siteName: "6 Al Top",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${dmSans.variable} dark`} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
