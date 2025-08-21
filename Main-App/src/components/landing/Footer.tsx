"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Youtube, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="px-5 pb-10 bg-transparent border-muted">
      <Separator className="mb-5" />
      <div className="flex flex-col items-center justify-center text-muted text-sm space-y-4">
        <div className="flex gap-4 items-center">
          <a href="https://www.youtube.com/">
            <Youtube className="h-8 w-8" />
          </a>
          <a href="https://www.instagram.com/">
            <Instagram className="h-6 w-6" />
          </a>
          <a href="https://x.com/">
            <Twitter className="h-6 w-6" />
          </a>
        </div>
        <div className="flex gap-4">
          <Link href="#">Terms of Service</Link>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Cookies</Link>
        </div>
        <div>
          <p>© 2025 Raksha.ai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
