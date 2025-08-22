import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="gradient">
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
