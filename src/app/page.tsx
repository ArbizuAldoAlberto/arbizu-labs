import Hero from '@/components/sections/Hero';
import SocialProof from '@/components/sections/SocialProof';
import WhyEnterprise from '@/components/sections/WhyEnterprise';
import Manifesto from '@/components/sections/Manifesto';
import Problems from '@/components/sections/Problems';
import CaseStudies from '@/components/sections/CaseStudies';
import DeveloperKits from '@/components/sections/DeveloperKits';
import Services from '@/components/sections/Services';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import EnterpriseTestimonials from '@/components/sections/EnterpriseTestimonials';
import FinalCTA from '@/components/sections/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <WhyEnterprise />
      <Manifesto />
      <Problems />
      <CaseStudies />
      <DeveloperKits />
      <Services />
      <Process />
      <EnterpriseTestimonials />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
