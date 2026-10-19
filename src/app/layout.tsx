import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sammac.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SAMMAC | Centro Técnico de Treinamento",
    template: "%s | SAMMAC",
  },
  description:
    "Formação técnica e soluções industriais em automação industrial, electricidade residencial e industrial, soldadura industrial e áreas afins.",
  keywords: [
    "SAMMAC",
    "centro técnico de treinamento",
    "automação industrial",
    "electricidade residencial",
    "electricidade industrial",
    "soldadura industrial",
    "formação técnica",
    "soluções industriais",
  ],
  applicationName: "SAMMAC",
  authors: [{ name: "SAMMAC" }],
  creator: "SAMMAC",
  publisher: "SAMMAC",
  category: "Educação técnica e serviços industriais",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_AO",
    url: "/",
    siteName: "SAMMAC",
    title: "SAMMAC | Formação Técnica e Soluções Industriais",
    description:
      "Capacitação prática e soluções técnicas em automação, electricidade e soldadura industrial.",
    images: [
      {
        url: "/brand/sammac-logo-horizontal.png",
        width: 948,
        height: 238,
        alt: "SAMMAC Centro Técnico de Treinamento",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAMMAC | Formação Técnica e Soluções Industriais",
    description:
      "Capacitação prática e soluções técnicas em automação, electricidade e soldadura industrial.",
    images: ["/brand/sammac-logo-horizontal.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/brand/sammac-mark.png",
    apple: "/brand/sammac-mark.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-AO" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
