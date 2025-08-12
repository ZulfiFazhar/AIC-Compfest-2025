import { Hero } from "@/components/landing-page/hero";
import { About } from "@/components/landing-page/about";
import { Features } from "@/components/landing-page/features";
import { Privacy } from "@/components/landing-page/privacy";

export default function MainPage() {
  return (
    <div className="min-h-screen p-8">
      <Hero />
      <About />
      <Features />
      <Privacy />
    </div>
  );
}
