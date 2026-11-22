import type { Metadata } from "next";
import CommerceLabClient from "@/components/commerce/CommerceLabClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Laboratorio Producto Estrella & Feeds | ARBIZU LABS",
  description:
    "Panel operativo de validación de demanda sin stock muerto, métricas conversion_score, feeds Mercado Libre/Meta y simulador anti-inflación +18%.",
};

async function fetchInitialLab() {
  const urls = [
    "http://127.0.0.1:3070/v1/commerce/lab/metrics",
    "https://arbizulabs.com/api/v1/commerce/lab/metrics",
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

export default async function TiendaLabPage() {
  const initialLab = await fetchInitialLab();
  return <CommerceLabClient initialLab={initialLab} />;
}
