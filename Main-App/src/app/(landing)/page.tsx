"use client";

import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { WhyChooseUsSection } from "@/components/landing/WhyChooseUsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CallToActionSection } from "@/components/landing/CallToActionSection";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <CallToActionSection />
    </>
  );
}
