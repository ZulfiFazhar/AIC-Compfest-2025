"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SessionData {
  user: {
    id: string;
    email: string;
    name: string;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
  };
  session: {
    id: string;
    userId: string;
    expiresAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

export default function AppDashboard() {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch("/api/auth/session", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setSessionData(data);
        }
      } catch (error) {
        console.error("Failed to fetch session data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Welcome to Your Dashboard
        </h1>
        <p className="text-muted-foreground">
          This is a protected area that requires authentication to access.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
          <div className="space-y-2">
            <Button asChild className="w-full" variant="outline">
              <Link href="/app/profile">View Profile</Link>
            </Button>
            <Button asChild className="w-full" variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Account Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Status:</span>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Email:</span>
              <span className="text-sm font-medium">
                {sessionData?.user.emailVerified ? (
                  <span className="text-green-600">Verified</span>
                ) : (
                  <span className="text-yellow-600">Unverified</span>
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Session Info</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Login:</span>
              <span className="text-sm font-medium">
                {sessionData?.session.createdAt
                  ? formatDate(sessionData.session.createdAt)
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Expires:</span>
              <span className="text-sm font-medium">
                {sessionData?.session.expiresAt
                  ? formatDate(sessionData.session.expiresAt)
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Session Information */}
      {sessionData && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Session Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">User Information</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Name:</span>
                  <p className="font-medium">{sessionData.user.name}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <p className="font-medium">{sessionData.user.email}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    User ID:
                  </span>
                  <p className="font-mono text-xs bg-muted px-2 py-1 rounded">
                    {sessionData.user.id}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    Account Created:
                  </span>
                  <p className="text-sm">
                    {formatDate(sessionData.user.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Session Information</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">
                    Session ID:
                  </span>
                  <p className="font-mono text-xs bg-muted px-2 py-1 rounded">
                    {sessionData.session.id}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    Session Created:
                  </span>
                  <p className="text-sm">
                    {formatDate(sessionData.session.createdAt)}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    Last Updated:
                  </span>
                  <p className="text-sm">
                    {formatDate(sessionData.session.updatedAt)}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    Session Expires:
                  </span>
                  <p className="text-sm">
                    {formatDate(sessionData.session.expiresAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
