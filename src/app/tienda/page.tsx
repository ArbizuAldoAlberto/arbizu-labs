import type { Metadata } from "next";
import HybridStorefrontClient from "@/components/commerce/HybridStorefrontClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tienda Híbrida — Minorista & Mayorista | ARBIZU LABS",
  description:
    "Catálogo oficial Arbizu Labs con doble lista Minorista/Mayorista, descuento por transferencia, logística regional (Bolívar, Olavarría, Pehuajó, Daireaux, Henderson) y pedido directo WhatsApp.",
};

async function fetchInitialCatalog() {
  const urls = [
    "http://127.0.0.1:3070/v1/commerce/catalog",
    "https://arbizulabs.com/api/v1/commerce/catalog",
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) return await res.json();
    } catch {
      // Fallback to next origin
    }
  }
  return null;
}

export default async function TiendaPage() {
  const initialCatalog = await fetchInitialCatalog();
  return <HybridStorefrontClient initialCatalog={initialCatalog} />;
}
