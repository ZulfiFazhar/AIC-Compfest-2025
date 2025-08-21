"use client";

import { useState, useEffect } from "react";
import { SignoutButton } from "@/components/auth/signout-button";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
}

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/session", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center loader"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/user" className="text-xl font-bold text-primary">
                My App
              </Link>
              <nav className="hidden md:flex space-x-4">
                <Link
                  href="/user"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/user/profile"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Profile
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              {user && (
                <div className="hidden sm:flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    Welcome, {user.name}
                  </span>
                </div>
              )}
              <SignoutButton variant="outline" size="sm" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
