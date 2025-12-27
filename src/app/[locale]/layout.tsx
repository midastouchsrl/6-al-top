import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing, Locale } from "@/i18n/routing";
import { ThemeProvider } from "@/context/ThemeContext";
import "../globals.css";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const isItalian = locale === 'it';

  return {
    title: isItalian
      ? "6 Al Top | Appartamento di Lusso a Roma"
      : "6 Al Top | Luxury Apartment in Rome",
    description: isItalian
      ? "Una suite di design al 6° piano, a pochi passi dai monumenti iconici di Roma."
      : "A designer suite on the 6th floor, steps from Rome's iconic landmarks.",
    keywords: isItalian
      ? ["appartamento lusso Roma", "casa vacanze Roma", "alloggio Stazione Termini", "affitto lusso Roma", "suite rooftop Roma"]
      : ["Rome luxury apartment", "holiday home Rome", "Termini Station accommodation", "luxury rental Rome", "rooftop suite Rome"],
    authors: [{ name: "6 Al Top" }],
    alternates: {
      canonical: `https://www.6altop.com/${locale === 'it' ? '' : 'en'}`,
      languages: {
        'it': 'https://www.6altop.com/',
        'en': 'https://www.6altop.com/en',
      },
    },
    openGraph: {
      title: isItalian
        ? "6 Al Top | Appartamento di Lusso a Roma"
        : "6 Al Top | Luxury Apartment in Rome",
      description: isItalian
        ? "Una suite di design al 6° piano con servizi di prima classe, a pochi passi dai monumenti iconici di Roma."
        : "A designer suite on the 6th floor with world-class amenities, steps from Rome's iconic landmarks.",
      url: `https://www.6altop.com/${locale === 'it' ? '' : 'en'}`,
      siteName: "6 Al Top",
      locale: isItalian ? "it_IT" : "en_US",
      type: "website",
      images: [
        {
          url: "https://www.6altop.com/hero-bg.png",
          width: 1200,
          height: 630,
          alt: isItalian ? "6 Al Top - Appartamento di Lusso a Roma" : "6 Al Top - Luxury Apartment in Rome",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isItalian
        ? "6 Al Top | Appartamento di Lusso a Roma"
        : "6 Al Top | Luxury Apartment in Rome",
      description: isItalian
        ? "Una suite di design al 6° piano, a pochi passi dai monumenti iconici di Roma."
        : "A designer suite on the 6th floor, steps from Rome's iconic landmarks.",
      images: ["https://www.6altop.com/hero-bg.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

function generateJsonLd(locale: string) {
  const isItalian = locale === 'it';

  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": "https://www.6altop.com/#lodging",
    name: "6 Al Top",
    description: isItalian
      ? "Appartamento di lusso al 6° piano nel cuore di Roma, a pochi passi dalla Stazione Termini. Suite di design con jacuzzi e servizi premium."
      : "Luxury apartment on the 6th floor in the heart of Rome, steps from Termini Station. Designer suite with jacuzzi and premium amenities.",
    url: `https://www.6altop.com/${locale === 'it' ? '' : 'en'}`,
    telephone: "+39 327 7293 390",
    email: "info@6altop.com",
    image: [
      "https://www.6altop.com/hero-bg.png",
      "https://www.6altop.com/IMG_0599.jpeg",
      "https://www.6altop.com/IMG_0857.jpeg"
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via Milazzo, 14",
      addressLocality: "Roma",
      addressRegion: "RM",
      postalCode: "00185",
      addressCountry: "IT"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.9035,
      longitude: 12.498833
    },
    starRating: {
      "@type": "Rating",
      ratingValue: "4.9",
      bestRating: "5"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "50",
      bestRating: "5"
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Jacuzzi", value: true },
      { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "Smart TV", value: true },
      { "@type": "LocationFeatureSpecification", name: "Fireplace", value: true },
      { "@type": "LocationFeatureSpecification", name: "Kitchen", value: true }
    ],
    priceRange: "€€€",
    checkinTime: "15:00",
    checkoutTime: "10:00",
    numberOfRooms: 1,
    petsAllowed: false,
    sameAs: [
      "https://www.booking.com/Share-IoeoDd8"
    ]
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the locale
  const messages = await getMessages();

  const jsonLd = generateJsonLd(locale);

  return (
    <html lang={locale} className={`${sora.variable} ${dmSans.variable} dark`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
        <link rel="icon" href="/icon-512.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preload" href="/hero-bg.webp" as="image" type="image/webp" />
        <link rel="alternate" hrefLang="it" href="https://www.6altop.com/" />
        <link rel="alternate" hrefLang="en" href="https://www.6altop.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://www.6altop.com/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
