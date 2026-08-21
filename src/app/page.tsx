import Hero from '@/components/sections/Hero';
import SocialProof from '@/components/sections/SocialProof';
import WhyEnterprise from '@/components/sections/WhyEnterprise';
import ProductsBento from '@/components/sections/ProductsBento';
import Problems from '@/components/sections/Problems';
import Services from '@/components/sections/Services';
import DeveloperKits from '@/components/sections/DeveloperKits';
import RoiCalculator from '@/components/sections/RoiCalculator';
import Manifesto from '@/components/sections/Manifesto';
import Process from '@/components/sections/Process';
import EngineeringStandards from '@/components/sections/EngineeringStandards';
import CaseStudies from '@/components/sections/CaseStudies';
import ContactSection from '@/components/sections/ContactSection';
import FinalCTA from '@/components/sections/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <WhyEnterprise />
      <ProductsBento />
      <Problems />
      <Services />
      <DeveloperKits />
      <RoiCalculator />
      <Manifesto />
      <Process />
      <EngineeringStandards />
      <CaseStudies />
      <ContactSection />
      <FinalCTA />
    </>
  );
}
