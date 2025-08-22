"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <DashboardHeader sidebarOpen={sidebarOpen} title="Dashboard" />

      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "md:ml-64" : "md:ml-20"
        } pt-16`}
      >
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
