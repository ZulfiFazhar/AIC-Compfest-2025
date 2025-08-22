"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Codesandbox } from "lucide-react";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { AuthButton } from "../auth/auth-button";

export function Navbar() {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  return (
    <header className="fixed top-4 left-0 right-0 z-1">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <nav className="flex gap-4 bg-foreground/30 backdrop-blur-md text-background rounded-full px-4 py-2">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="RAKSHA.svg"
              alt="Raksha AI Logo"
              height={80}
              width={80}
            />
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            {isMobile ? (
              pathname === "/" ? (
                <Link
                  href="/pricing"
                  className="text-sm font-medium hover:underline hover:underline-offset-4"
                >
                  Pricing
                </Link>
              ) : (
                <Link
                  href="/"
                  className="text-sm font-medium hover:underline hover:underline-offset-4"
                >
                  Home
                </Link>
              )
            ) : (
              <>
                <Link
                  href="/"
                  className="text-sm font-medium hover:underline hover:underline-offset-4"
                >
                  Home
                </Link>
                <Link
                  href="/pricing"
                  className="text-sm font-medium hover:underline hover:underline-offset-4"
                >
                  Pricing
                </Link>
              </>
            )}
          </div>
        </nav>

        <AuthButton className="rounded-full bg-foreground/30 backdrop-blur-sm">
          Get Started
        </AuthButton>
      </div>
    </header>
  );
}
