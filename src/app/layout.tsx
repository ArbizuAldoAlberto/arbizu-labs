import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono, Space_Mono, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import FloatingExecutiveDock from "@/components/ui/FloatingExecutiveDock";
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
    "Aldo Alberto Arbizu",
    "Boutique de Ingeniería de Software",
    "Auditoría Termográfica FLIR Bolívar",
    "Termografía Industrial Olavarría Pehuajó",
    "Software Trazabilidad REPROCANN Buenos Aires",
    "Software Acopios AgroMarket SENASA",
    "Offline-First Development",
    "React Native SQLite WAL",
    "B2B SaaS Architecture",
    "n8n Automation Agency",
    "Ciberseguridad Móvil OWASP",
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
    title: "Arbizu Labs — Software de Alta Resiliencia & Auditorías Térmicas FLIR",
    description: "Diseñamos y desplegamos sistemas móviles Offline-First, plataformas SaaS B2B, auditorías termográficas FLIR y pipelines autónomos de IA. San Carlos de Bolívar, Buenos Aires.",
    url: "https://arbizulabs.com",
    siteName: "Arbizu Labs",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "/api/og?title=Software%20de%20Alta%20Resiliencia&subtitle=Offline-First%20%7C%20SaaS%20B2B%20%7C%20Zero-Downtime",
        width: 1200,
        height: 630,
        alt: "Arbizu Labs — Enterprise Software Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arbizu Labs — High-Resiliency Software Engineering & FLIR Audits",
    description: "Sistemas móviles Offline-First, SaaS B2B y automatización inteligente.",
    creator: "@ArbizuAldo",
    images: ["/api/og?title=High-Resiliency%20Software%20Engineering&subtitle=Offline-First%20Mobile%20%26%20Enterprise%20SaaS"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-theme="v1" className={`${cormorant.variable} ${jetbrains.variable} ${space.variable} ${inter.variable}`}>
      <body className="bg-[var(--bg-seam)] text-[var(--text-primary)] antialiased selection:bg-[var(--color-arbizu-teal)]/30">
        {process.env.NEXT_PUBLIC_GA_ID_ARBIZU &&
          !process.env.NEXT_PUBLIC_GA_ID_ARBIZU.includes("YYYY") &&
          !process.env.NEXT_PUBLIC_GA_ID_ARBIZU.includes("XXXX") && (
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

        {/* Schema.org ProfessionalService & LocalBusiness Geo-Targeted JSON-LD (GAP 4) */}
        <Script
          id="schema-professional-service"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["ProfessionalService", "LocalBusiness"],
              "name": "Arbizu Labs — Boutique de Ingeniería de Software & Auditorías Térmicas",
              "alternateName": "Arbizu Labs",
              "url": "https://arbizulabs.com",
              "logo": "https://arbizulabs.com/logo-arbizu.svg",
              "image": "https://arbizulabs.com/api/og?title=Arbizu%20Labs&subtitle=Ingenieria%20de%20Software%20Resiliente",
              "founder": {
                "@type": "Person",
                "name": "Aldo Alberto Arbizu",
                "url": "https://aldoarbizu.com",
                "taxID": "20-38362060-1",
                "jobTitle": "Lead Systems Architect & Fundador"
              },
              "telephone": "+54 9 2314 489197",
              "email": "aldo.arbizu@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "San Carlos de Bolívar",
                "addressRegion": "Provincia de Buenos Aires",
                "postalCode": "B6550",
                "addressCountry": "AR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -36.2307,
                "longitude": -61.1128
              },
              "areaServed": [
                "San Carlos de Bolívar",
                "Olavarría",
                "Pehuajó",
                "9 de Julio",
                "Azul",
                "Ciudad Autónoma de Buenos Aires",
                "Provincia de Buenos Aires",
                "Argentina"
              ],
              "priceRange": "$$$",
              "currenciesAccepted": "ARS, USD, USDT",
              "paymentAccepted": "Mercado Pago, Transferencia Bancaria Galicia, Cripto (Base L2 / BTC / SOL)",
              "sameAs": [
                "https://github.com/ArbizuAldoAlberto",
                "https://linkedin.com/in/aldoarbizu",
                "https://wa.me/5492314489197"
              ],
              "description": "Boutique de ingeniería de software de alta resiliencia fundada por Aldo Alberto Arbizu en San Carlos de Bolívar. Especialistas en aplicaciones móviles Offline-First, SaaS B2B, auditorías termográficas FLIR y ciberseguridad defensiva.",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Servicios B2B de Ingeniería & Auditoría",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Auditoría Termográfica FLIR Industrial",
                      "description": "Inspección termográfica de tableros eléctricos, acopios y plantas industriales para detección preventiva de fallas y prevención de incendios."
                    },
                    "price": "150000",
                    "priceCurrency": "ARS"
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Licencia Software Trazabilidad REPROCANN / Agro",
                      "description": "Plataforma de software Offline-First con persistencia SQLite WAL y cumplimiento regulatorio SENASA / INASE."
                    },
                    "price": "75000",
                    "priceCurrency": "ARS"
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Hardening Linux VPS & Setup Zero-Downtime",
                      "description": "Configuración perimetral de servidores, reverse proxy SSL A+, Cloudflare Tunnel y monitoreo SRE 24/7."
                    },
                    "price": "120000",
                    "priceCurrency": "ARS"
                  }
                ]
              }
            })
          }}
        />

        <LanguageProvider>
          {/* WCAG 2.2 AA Skip to content link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-[var(--bg-btn)] focus:text-[var(--text-primary)] focus:border focus:border-[var(--accent-border-strong)] focus:font-space focus:text-xs focus:font-bold focus:uppercase focus:rounded-lg focus:outline-none"
          >
            Saltar al contenido principal / Skip to content
          </a>
          <Navigation />
          <main id="main-content">{children}</main>
          <Footer />
          <FloatingExecutiveDock />
        </LanguageProvider>
      </body>
    </html>
  );
}
