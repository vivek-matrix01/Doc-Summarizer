import CtaSection from "@/components/ui/HomePage/ctaSection";
import DemoSection from "@/components/ui/HomePage/demoSection";
import HeroSection from "@/components/ui/HomePage/heroSection";
import HowItWorksSection from "@/components/ui/HomePage/howItWorksSection";
import Pricing from "@/components/ui/HomePage/Pricing";

export default function Home() {
  return (
    <>
      <div className="relative w-full">
        <div className="flex flex-col"></div>
        <HeroSection />
        <DemoSection />
        <HowItWorksSection />
        <Pricing />
        <CtaSection />
      </div>
    </>
  );
}
