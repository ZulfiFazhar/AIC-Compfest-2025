"use client";

import * as React from "react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { CollapsedButton } from "./collapsed-button";
import { NavData } from "@/types/nav-data";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]! data-[state=collapsed]:mx-2"
      {...props}
    >
      <SidebarHeader className="pb-0">
        <CollapsedButton />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={NavData.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
