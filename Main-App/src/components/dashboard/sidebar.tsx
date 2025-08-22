"use client";

import { Button } from "@/components/ui/button";
import {
  Activity,
  Camera,
  Bell,
  TrendingUp,
  Users,
  Settings,
  PanelLeftOpen,
  PanelRightOpen,
  User,
  Shield,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname(); // Get the current path

  const navItems = [
    { href: "/app", icon: Activity, label: "Dashboard" },
    { href: "/app/cameras", icon: Camera, label: "Cameras" },
    { href: "/app/alerts", icon: Bell, label: "Alerts" },
    { href: "/app/analytics", icon: TrendingUp, label: "Analytics" },
    { href: "/app/users", icon: Users, label: "Users" },
    { href: "/app/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 bg-background border-r transition-all duration-300 ease-in-out ${
        sidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b">
        {sidebarOpen ? (
          <>
            <div className="flex items-center space-x-2">
              {/* <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div> */}
              <Link href="/" className="text-xl font-bold">
                <Image
                  src="RAKSHA1.svg"
                  alt="Raksha AI Logo"
                  width={120}
                  height={120}
                />
                {/* Raksha<span className="text-primary">.ai</span> */}
              </Link>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden md:flex"
            >
              <PanelRightOpen className="h-8 w-8" />
            </Button>
          </>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden md:flex mx-auto"
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
      {sidebarOpen && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-muted">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
