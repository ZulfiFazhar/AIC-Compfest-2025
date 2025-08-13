"use client";

import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  SidebarIcon,
} from "lucide-react";

// import { SearchForm } from "@/components/search-form";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";

export function SiteHeader() {
  //   const { toggleSidebar } = useSidebar();
  const teams = [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ];

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-fit items-center gap-2 px-4">
        <TeamSwitcher teams={teams} />
        {/* <SearchForm className="w-full sm:ml-auto sm:w-auto" /> */}
      </div>
    </header>
  );
}
