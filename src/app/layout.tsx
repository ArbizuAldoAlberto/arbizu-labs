import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono, Space_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-cormorant",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const space = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "Arbizu Labs | Enterprise Software Agency — Offline-First & B2B SaaS",
  description: "Agencia de desarrollo de software enterprise especializada en arquitecturas Offline-First, SaaS B2B, y automatizaciones con IA. Soluciones resilientes que resisten el mundo real.",
  keywords: [
    "Arbizu Labs",
    "Enterprise Software Agency",
    "Offline-First Development",
    "B2B SaaS",
    "React Native Agency",
    "Mobile App Development Argentina",
    "SQLite WAL Expert",
    "n8n Automation",
    "Stripe Integration",
    "Base L2 Payments"
  ],
  authors: [{ name: "Aldo Arbizu", url: "https://arbizulabs.com" }],
  metadataBase: new URL("https://arbizulabs.com"),
  openGraph: {
    title: "Arbizu Labs — Enterprise Software Agency",
    description: "Software que resiste el mundo real. Arquitecturas Offline-First, SaaS B2B, y automatizaciones con IA.",
    url: "https://arbizulabs.com",
    siteName: "Arbizu Labs",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arbizu Labs — Enterprise Software Agency",
    description: "Software resiliente para negocios que no pueden permitirse fallar.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${jetbrains.variable} ${space.variable}`}>
      <body className="bg-[var(--color-space-black)] text-[var(--color-mist-gray)] font-mono antialiased selection:bg-[var(--color-arbizu-teal)]/30">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID_ARBIZU}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID_ARBIZU}');
          `}
        </Script>
        <Script
          src="https://plausible.io/js/script.js"
          data-domain="arbizulabs.com"
          strategy="afterInteractive"
        />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
