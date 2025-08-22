"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/components/dashboard/user-profile";
import {
  Activity,
  Camera,
  Bell,
  TrendingUp,
  Settings,
  PanelLeftOpen,
  PanelRightOpen,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserProfile as SessionData } from "@/types/user";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();
  const navItems = [
    { href: "/app", icon: Activity, label: "Dashboard" },
    { href: "/app/cameras", icon: Camera, label: "Cameras" },
    { href: "/app/alerts", icon: Bell, label: "Alerts" },
    { href: "/app/analytics", icon: TrendingUp, label: "Analytics" },
    { href: "/app/settings", icon: Settings, label: "Settings" },
  ];

  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/session", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setSessionData(data);
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };

    checkAuth();
  }, []);

  return (
    <aside
      className={`hidden sm:block fixed inset-y-0 left-0 z-50 bg-background border-r transition-all duration-300 ease-in-out ${
        sidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b">
        {sidebarOpen ? (
          <>
            <div className="flex items-center space-x-2">
              <Link href="/" className="text-xl font-bold">
                <Image
                  src="RAKSHA1.svg"
                  alt="Raksha AI Logo"
                  width={120}
                  height={120}
                />
              </Link>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex"
            >
              <PanelRightOpen className="h-8 w-8" />
            </Button>
          </>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex mx-auto"
          >
            <PanelLeftOpen className="h-8 w-8" />
          </Button>
        )}
      </div>
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <Icon className="h-5 w-5" />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Section */}
      {sidebarOpen && sessionData && (
        <div className="absolute bottom-4 left-4 right-4">
          <UserProfile />
        </div>
      )}
    </aside>
  );
}
