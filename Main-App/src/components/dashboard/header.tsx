"use client";

import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

interface DashboardHeaderProps {
  sidebarOpen: boolean;
  title: string;
}

export function DashboardHeader({ sidebarOpen, title }: DashboardHeaderProps) {
  return (
    <header
      className={`fixed top-0 right-0 bg-white z-[10] border-b h-16 transition-all duration-300 ease-in-out ${
        sidebarOpen ? "md:left-64" : "md:left-20"
      } left-0`}
    >
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="pl-8 pr-4 py-2 rounded-lg border bg-background text-sm w-64"
            />
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Filter</span>
          </Button>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <span className="text-sm font-medium">U</span>
          </div>
        </div>
      </div>
    </header>
  );
}
