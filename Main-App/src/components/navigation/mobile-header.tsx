"use client";

import Link from "next/link";
import { NavData } from "@/types/nav-data";
import { useIsMobile } from "@/hooks/use-mobile";

export function MobileHeader() {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile && (
        <div className="bg-background sticky top-14 z-50 w-full border-b px-4 py-3">
          <div className="flex items-center justify-between overflow-x-scroll">
            <nav className="flex items-center space-x-6 whitespace-nowrap">
              {NavData.navMain.map((item, index) => (
                <div key={index} className="relative group">
                  <Link
                    href={item.url}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      item.isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.title}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
