import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <HowItWorksSection />
      <FeaturesSection />
    </>
  );
}
