import Header from "@/components/navigation/header";
import { Hero } from "@/components/landing-page/hero";
import { About } from "@/components/landing-page/about";
import { Features } from "@/components/landing-page/features";
import { Privacy } from "@/components/landing-page/privacy";
import Footer from "@/components/navigation/footer";

export default function MainPage() {
  return (
    <div className="min-h-screen p-8">
      <Header />
      <Hero />
      <About />
      <Features />
      <Privacy />
      <Footer />
    </div>
  );
}
