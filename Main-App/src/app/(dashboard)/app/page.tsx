"use client";

import { StatusCards } from "@/components/dashboard/status-cards";
import { CameraFeed } from "@/components/dashboard/camera-feed";
import { RecentAlerts } from "@/components/dashboard/recent-alerts";
import { ActivityChart } from "@/components/dashboard/activity-chart";
import { ThreatDistribution } from "@/components/dashboard/threat-distribution";
import { WeeklyActivity } from "@/components/dashboard/weekly-activity";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Alert, alerts as defaultAlerts } from "@/types/alert";

export default function Dashboard() {
  const [recentAlerts, setRecentAlerts] = useState<Alert[]>(defaultAlerts);

  useEffect(() => {
    const alertTypes = [
      "Violence Detected",
      "Suspicious Activity",
      "Break-in Attempt",
      "Unauthorized Access",
    ];
    const camerasForAlerts = [
      "Main Entrance",
      "Parking Lot",
      "Lobby",
      "Back Door",
    ];
    const severities = ["high", "medium", "low"];

    const interval = setInterval(() => {
      const randomType =
        alertTypes[Math.floor(Math.random() * alertTypes.length)];
      const randomCamera =
        camerasForAlerts[Math.floor(Math.random() * camerasForAlerts.length)];
      const randomSeverity = severities[
        Math.floor(Math.random() * severities.length)
      ] as "high" | "medium" | "low";
      const newAlert: Alert = {
        id: Date.now(),
        type: randomType,
        camera: randomCamera,
        time: "just now",
        severity: randomSeverity,
        status: "new",
        location: "Simulated Location",
        description: `Simulated alert: ${randomType} at ${randomCamera}.`,
        mediaType: Math.random() > 0.5 ? "video" : "image",
        mediaUrl: "/mock-media.mp4",
        confidenceScore: Math.floor(Math.random() * (99 - 70 + 1)) + 70,
      };

      setRecentAlerts((prev) => [newAlert, ...prev].slice(0, 4));
      toast.error(
        `New Alert: ${newAlert.type} at ${
          newAlert.camera
        } (${newAlert.severity.toUpperCase()})`
      );
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <StatusCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <CameraFeed />
          <RecentAlerts alerts={recentAlerts} />
        </div>

        <div className="space-y-6">
          <ActivityChart />
          <ThreatDistribution />
          <WeeklyActivity />
        </div>
      </div>
    </>
  );
}
