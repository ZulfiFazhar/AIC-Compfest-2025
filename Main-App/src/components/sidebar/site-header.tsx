"use client";

import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";

import { TeamSwitcher } from "./team-switcher";
import { NavUser } from "./nav-user";
import { NavData } from "@/types/nav-data";

export function SiteHeader() {
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
    <header className="bg-background sticky top-0 z-100 flex w-full items-center border-b">
      <div className="h-(--header-height) w-full flex items-center justify-between px-4">
        <TeamSwitcher teams={teams} />
        <NavUser user={NavData.user} />
      </div>
    </header>
  );
}
