import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { InternalLinks } from "@/components/Blog";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/JsonLd";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  ...createMetadata({
    title: siteConfig.name,
    description: siteConfig.description,
    path: "/",
  }),
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0a0e17",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${inter.variable} h-full scroll-smooth`}>
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <InternalLinks />
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
