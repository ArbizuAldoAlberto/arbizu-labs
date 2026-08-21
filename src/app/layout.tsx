import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono, Space_Mono, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

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

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Arbizu Labs | Boutique de Ingeniería de Software — Offline-First, B2B SaaS & AI Automation",
  description: "Boutique de ingeniería de producto híbrido fundada por Aldo Arbizu. Especialistas en arquitecturas móviles Offline-First (React Native, SQLite WAL), plataformas SaaS B2B, automatizaciones de misión crítica con n8n/IA y prototipado físico 3D.",
  keywords: [
    "Arbizu Labs",
    "Aldo Arbizu",
    "Boutique de Ingeniería de Software",
    "Offline-First Development",
    "React Native SQLite WAL",
    "B2B SaaS Architecture",
    "n8n Automation Agency",
    "Ciberseguridad Móvil OWASP",
    "AgTech Software",
    "TitanFlow Trading Bot",
    "SentinelOS",
    "Base L2 Blockchain"
  ],
  authors: [{ name: "Aldo Alberto Arbizu", url: "https://aldoarbizu.com" }],
  creator: "Aldo Alberto Arbizu",
  publisher: "Arbizu Labs",
  metadataBase: new URL("https://arbizulabs.com"),
  alternates: {
    canonical: "https://arbizulabs.com",
  },
  openGraph: {
    title: "Arbizu Labs — Software de Alta Resiliencia para Operaciones Críticas",
    description: "Diseñamos y desplegamos sistemas móviles Offline-First, plataformas SaaS B2B y pipelines autónomos de IA que sobreviven al estrés del mundo real. Del bit al átomo.",
    url: "https://arbizulabs.com",
    siteName: "Arbizu Labs",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arbizu Labs — High-Resiliency Software Engineering",
    description: "Sistemas móviles Offline-First, SaaS B2B y automatización inteligente.",
    creator: "@ArbizuAldo",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${jetbrains.variable} ${space.variable} ${inter.variable}`}>
      <body className="bg-[var(--color-space-black)] text-[var(--color-mist-gray)] font-mono antialiased selection:bg-[var(--color-arbizu-teal)]/30">
        {process.env.NEXT_PUBLIC_GA_ID_ARBIZU && (
          <>
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
          </>
        )}
        <LanguageProvider>
          {/* WCAG 2.2 AA Skip to content link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-[var(--color-arbizu-teal)] focus:text-black focus:font-space focus:text-xs focus:font-bold focus:uppercase focus:rounded-lg focus:shadow-[0_0_25px_rgba(29,158,117,0.6)] focus:outline-none"
          >
            Saltar al contenido principal / Skip to content
          </a>
          <Navigation />
          <main id="main-content">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
