import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";

const footerLinks = {
  product: [
    { name: "Live Monitoring", href: "/event" },
    { name: "AI Detection", href: "#features" },
    { name: "Alert System", href: "#features" },
    { name: "Analytics", href: "#analytics" },
  ],
  support: [
    { name: "Documentation", href: "/docs" },
    { name: "Help Center", href: "/help" },
    { name: "Contact Support", href: "/contact" },
    { name: "Emergency", href: "tel:112" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/tos" },
    { name: "Data Security", href: "/security" },
    { name: "License", href: "/license" },
  ],
};

const contactInfo = [
  { icon: Phone, text: "+62 22 4264-4264", href: "tel:+622242644264" },
  { icon: Mail, text: "info@raksha.ai", href: "mailto:info@raksha.ai" },
  { icon: MapPin, text: "Bandung, Jawa Barat", href: "#" },
];

const socialLinks = [
  { icon: Twitter, name: "Twitter", href: "#" },
  { icon: Instagram, name: "Instagram", href: "#" },
  { icon: Youtube, name: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer id="footer" className="w-full pt-20 md:pt-32 pb-12">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="px-10 py-10 rounded-lg md:py-12 bg-primary/5">
          <div className="flex flex-col md:py-0">
            <div className="flex flex-col gap-8 md:flex-row md:justify-between">
              {/* Brand Section */}
              <div className="space-y-4 md:max-w-sm">
                <Link href="/" className="flex items-center gap-2 text-primary">
                  <Image
                    src="/globe.svg"
                    alt="Raksha.ai Logo"
                    width={32}
                    height={32}
                  />
                  <span className="text-xl font-bold">Raksha.ai</span>
                </Link>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sistem keamanan berbasis AI untuk melindungi Kota Bandung
                  dengan teknologi deteksi real-time yang canggih dan akurat.
                </p>

                {/* Contact Info */}
                <div className="space-y-2">
                  {contactInfo.map(({ icon: Icon, text, href }, idx) => (
                    <Link
                      key={idx}
                      href={href}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{text}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Links Grid */}
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-12">
                <div className="space-y-4">
                  <h4 className="text-base font-semibold text-foreground">
                    FITUR
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks.product.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-base font-semibold text-foreground">
                    DUKUNGAN
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks.support.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-base font-semibold text-foreground">
                    LEGAL
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks.legal.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <Separator className="my-8 bg-accent" />

            {/* Bottom Section */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                <p className="text-sm text-muted-foreground">
                  © 2025 Raksha.ai. Semua hak cipta dilindungi.
                </p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Shield className="w-3 h-3" />
                  <span>Powered by AI Technology</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground hidden sm:block">
                  Ikuti kami:
                </span>
                <ul className="flex items-center gap-4">
                  {socialLinks.map(({ icon: Icon, name, href }, idx) => (
                    <li key={idx}>
                      <a
                        href={href}
                        className="group inline-flex cursor-pointer items-center justify-center w-8 h-8 rounded-full border border-muted-foreground/20 text-muted-foreground duration-200 hover:text-foreground hover:border-foreground/20 hover:bg-foreground/5"
                        rel="noopener noreferrer"
                        aria-label={`Ikuti di ${name}`}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
