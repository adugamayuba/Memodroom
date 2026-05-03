import type { Metadata } from "next";
import "./globals.css";
import { MemodroomProvider } from "@/lib/context";

const BASE_URL = "https://www.memodroom.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Memodroom — Turn a Photo into a Cinematic AI Video Message",
    template: "%s | Memodroom",
  },
  description:
    "Upload a photo, pick a vibe, and receive a 4K cinematic AI-directed video message in under 10 minutes. The most personal gift you can give.",
  keywords: [
    "AI video message",
    "photo to video AI",
    "cinematic gift",
    "personalised video gift",
    "AI avatar video",
    "video message generator",
    "Memodroom",
    "Reelin AI",
    "AI gift",
    "digital twin gift",
  ],
  authors: [{ name: "Reelin AI Inc.", url: BASE_URL }],
  creator: "Reelin AI Inc.",
  publisher: "Reelin AI Inc.",
  category: "technology",

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

  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Memodroom",
    title: "Memodroom — Turn a Photo into a Cinematic AI Video Message",
    description:
      "Upload a photo, pick a vibe, and receive a 4K cinematic AI-directed video message in under 10 minutes. The most personal gift you can give.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Memodroom — Your Memory, Directed by AI.",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    site: "@memodroom",
    creator: "@reelinai",
    title: "Memodroom — Turn a Photo into a Cinematic AI Video Message",
    description:
      "Upload a photo, pick a vibe, and receive a 4K cinematic AI-directed video message in under 10 minutes.",
    images: ["/twitter-image.png"],
  },

  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
    shortcut: "/icon.png",
  },

  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Memodroom",
    description:
      "AI-directed cinematic video messages. Upload a photo, pick a vibe, receive a 4K video gift in under 10 minutes.",
    url: BASE_URL,
    brand: { "@type": "Brand", name: "Reelin AI Inc." },
    offers: [
      { "@type": "Offer", name: "Single Memo",     price: "14.99", priceCurrency: "USD", availability: "https://schema.org/InStock", url: `${BASE_URL}/create` },
      { "@type": "Offer", name: "Premium Bundle",  price: "24.99", priceCurrency: "USD", availability: "https://schema.org/InStock", url: `${BASE_URL}/create` },
      { "@type": "Offer", name: "Apex Gift",       price: "49.99", priceCurrency: "USD", availability: "https://schema.org/InStock", url: `${BASE_URL}/create` },
    ],
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Memodroom",
    url: BASE_URL,
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
        />
      </head>
      <body>
        <MemodroomProvider>{children}</MemodroomProvider>
      </body>
    </html>
  );
}
