"use client";

import Link from "next/link";
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Raksha<span className="text-primary">.ai</span></span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Advanced AI-powered security solutions for modern surveillance needs.
            </p>
            <div className="flex space-x-4">
              <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-xs font-bold">f</span>
              </div>
              <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-xs font-bold">t</span>
              </div>
              <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-xs font-bold">in</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Product</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Integrations</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Roadmap</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Tutorials</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Partners</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 text-center text-muted-foreground text-sm">
          <p>© 2023 Raksha.ai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}