"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface SessionData {
  user: {
    id: string;
    email: string;
    name: string;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
    image?: string | null;
  };
  session: {
    id: string;
    userId: string;
    expiresAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

export function SessionInfo() {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSessionInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/session", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setSessionData(data);
        setError("");
      } else {
        setError("Failed to fetch session info");
      }
    } catch (error) {
      console.error("Session fetch error:", error);
      setError("Error fetching session information");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessionInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="animate-pulse">Loading session information...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4">
          {error}
        </div>
        <Button onClick={fetchSessionInfo} variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  if (!sessionData) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-muted-foreground">No session data available</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary">Welcome Back!</h1>
        <p className="text-muted-foreground mt-2">
          Here&apos;s your current session information
        </p>
      </div>

      {/* User Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          User Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Name
            </label>
            <p className="text-lg">{sessionData.user.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Email
            </label>
            <p className="text-lg">{sessionData.user.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              User ID
            </label>
            <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
              {sessionData.user.id}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Email Verified
            </label>
            <p className="text-lg">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  sessionData.user.emailVerified
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                }`}
              >
                {sessionData.user.emailVerified ? "Verified" : "Not Verified"}
              </span>
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Account Created
            </label>
            <p className="text-sm">{formatDate(sessionData.user.createdAt)}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Last Updated
            </label>
            <p className="text-sm">{formatDate(sessionData.user.updatedAt)}</p>
          </div>
        </div>
      </div>

      {/* Session Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Session Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Session ID
            </label>
            <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
              {sessionData.session.id}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Expires At
            </label>
            <p className="text-sm">
              {formatDate(sessionData.session.expiresAt)}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Session Created
            </label>
            <p className="text-sm">
              {formatDate(sessionData.session.createdAt)}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Session Updated
            </label>
            <p className="text-sm">
              {formatDate(sessionData.session.updatedAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Button onClick={fetchSessionInfo} variant="outline">
          Refresh Session
        </Button>
        <Button onClick={handleLogout} variant="destructive">
          Logout
        </Button>
      </div>
    </div>
  );
}
