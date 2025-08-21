"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Codesandbox } from "lucide-react";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

export function Navbar() {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  return (
    <header className="fixed top-4 left-0 right-0 z-1">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <nav className="flex gap-4 bg-foreground/30 text-background rounded-full px-4 py-2">
          <Link href="/" className="flex items-center gap-1">
            <Codesandbox className="h-5 w-5 text-primary-foreground" />
            <span className="text-base md:text-xl font-bold">Raksha.ai</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            {isMobile ? (
              pathname === "/" ? (
                <Link
                  href="/pricing"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Pricing
                </Link>
              ) : (
                <Link
                  href="/"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Home
                </Link>
              )
            ) : (
              <>
                <Link
                  href="/"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/pricing"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Pricing
                </Link>
              </>
            )}
          </div>
        </nav>

        <Link href="/auth">
          <Button className="rounded-full bg-foreground/30">Get Started</Button>
        </Link>
      </div>
    </header>
  );
}
