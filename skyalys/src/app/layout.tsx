import type { Metadata, Viewport } from "next";
import { Outfit, Syne } from "next/font/google";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { CartDrawer } from "@/components/CartDrawer";
import { CartProvider } from "@/components/CartProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { ProGate } from "@/components/ProGate";
import { organizationLd, websiteLd } from "@/lib/jsonld";
import { site } from "@/lib/site";
import "./globals.css";

const body = Outfit({ subsets: ["latin"], variable: "--font-body", weight: ["300", "400", "500", "600"], display: "swap" });
const heading = Syne({ subsets: ["latin"], variable: "--font-heading", weight: ["500", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Peptides de grade recherche pour laboratoires`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/", types: { "application/rss+xml": "/blog/rss.xml" } },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: `${site.name} | Peptides de grade recherche pour laboratoires`,
    description: site.description,
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#14192b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${body.variable} ${heading.variable}`}>
      <body>
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main id="contenu">{children}</main>
          <Footer />
          <CartDrawer />
          <ProGate />
        </CartProvider>
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </body>
    </html>
  );
}
