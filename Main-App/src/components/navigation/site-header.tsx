"use client";

import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";

import { TeamSwitcher } from "@/components/sidebar/team-switcher";
import { NavUser } from "@/components/sidebar/nav-user";
import { NavData } from "@/types/nav-data";
import { useIsMobile } from "@/hooks/use-mobile";

export function SiteHeader() {
  const isMobile = useIsMobile();

  return (
    <header className="bg-background sticky top-0 z-100 flex flex-col w-full items-center">
      <div className="h-(--header-height) w-full flex items-center justify-between px-4 border-b">
        <TeamSwitcher />
        <NavUser user={NavData.user} />
      </div>

      {isMobile && (
        <div className="bg-background sticky top-14 z-50 w-full border-b px-4 py-3 h-fit">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar">
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
    </header>
  );
}
