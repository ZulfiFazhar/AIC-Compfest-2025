"use client";

import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/hiw-section";
import { WhyChooseUsSection } from "@/components/landing/wcu-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { CallToActionSection } from "@/components/landing/cta-section";

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
