import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Shield, Twitter, Instagram, Youtube, Mail } from "lucide-react";

const footerLinks = {
  product: [
    { name: "Fitur", href: "#features" },
    { name: "Cara Kerja", href: "#how-it-works" },
    { name: "Harga", href: "#pricing" },
    { name: "Login", href: "/auth/signin" },
  ],
  legal: [
    { name: "Kebijakan Privasi", href: "/privacy-policy" },
    { name: "Ketentuan Layanan", href: "/tos" },
  ],
};

const contactInfo = [
  {
    icon: Mail,
    text: "support@raksha-ai.com",
    href: "mailto:support@raksha-ai.com",
  },
];

const socialLinks = [
  { icon: Twitter, name: "Twitter", href: "#" },
  { icon: Instagram, name: "Instagram", href: "#" },
  { icon: Youtube, name: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer id="footer" className="w-full pt-20 md:pt-32 pb-12 bg-background">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="px-10 py-10 rounded-lg md:py-12 bg-muted/30">
          <div className="flex flex-col md:py-0">
            <div className="flex flex-col gap-8 md:flex-row md:justify-between">
              {/* Brand Section */}
              <div className="space-y-4 md:max-w-sm">
                <Link href="/" className="flex items-center gap-2 text-primary">
                  <Shield className="size-8 text-primary" />
                  <span className="text-xl font-bold">GuardianAI</span>
                </Link>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Platform keamanan cerdas untuk melindungi properti Anda dengan
                  deteksi AI real-time dan notifikasi instan.
                </p>

                {/* Contact Info */}
                <div className="space-y-2 pt-2">
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
                    PRODUK
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
                  © 2025 GuardianAI. Semua hak cipta dilindungi.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
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
