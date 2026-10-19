import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileDock } from "@/components/mobile-dock";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
export const metadata: Metadata = {
  metadataBase: new URL("https://sammac.ao"),
  title: {
    default: "SAMMAC | Formação Técnica & Soluções Industriais",
    template: "%s | SAMMAC",
  },
  description:
    "Centro Técnico de Treinamento em automação industrial, electricidade residencial e industrial, soldadura e soluções técnicas em Angola.",
  applicationName: "SAMMAC",
  openGraph: {
    type: "website",
    locale: "pt_AO",
    siteName: "SAMMAC",
    title: "SAMMAC — Centro Técnico de Treinamento",
    description: "Formação Técnica & Soluções Industriais",
    images: ["/brand/sammac-logo-horizontal.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAMMAC",
    description: "Formação Técnica & Soluções Industriais",
  },
  icons: { icon: "/brand/sammac-mark.png", apple: "/brand/sammac-mark.png" },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#07132f",
  colorScheme: "light",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-scroll-behavior="smooth" lang="pt-AO" className={geist.variable}>
      <body>
        <a className="skip-link" href="#conteudo">
          Saltar para o conteúdo
        </a>
        <SiteHeader />
        <main id="conteudo" className="min-h-dvh">
          {children}
        </main>
        <SiteFooter />
        <MobileDock />
      </body>
    </html>
  );
}
