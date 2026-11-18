import Hero from '@/components/sections/Hero';
import ProductsBento from '@/components/sections/ProductsBento';
import WhyEnterprise from '@/components/sections/WhyEnterprise';
import Telemetry3DSection from '@/components/sections/Telemetry3DSection';
import Services from '@/components/sections/Services';
import RoiCalculator from '@/components/sections/RoiCalculator';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      {/* Etapa 1: Command Hero 7:5 + Interactive Telemetry Tabs */}
      <Hero />
      {/* Etapa 2: Live Interactive Product Workbench (GAP-01) + Dynasty Catalog */}
      <ProductsBento />
      {/* Etapa 3: Bi-Luminance Editorial Doctrine en Papel Titanio #F2F0EA */}
      <WhyEnterprise />
      {/* Etapa 4: Telemetría Física 3D WebGL 60 FPS (PBR / CAD 1.5px / FLIR) */}
      <Telemetry3DSection />
      {/* Etapa 5: Geo-Aware B2B Packaging en 3 Tiers (GAP-06) */}
      <Services />
      {/* Etapa 6: Calculadora ROI & Instant Technical Dossier Engine (GAP-02) */}
      <RoiCalculator />
      {/* Etapa 7: Terminal de Contratación Idempotente + Verificador /security (GAP-07) */}
      <ContactSection />
    </>
  );
}
