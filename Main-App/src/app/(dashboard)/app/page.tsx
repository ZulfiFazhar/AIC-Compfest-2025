"use client";

import { StatusCards } from "@/components/dashboard/status-cards";
import { CameraFeed } from "@/components/dashboard/camera-feed";
import { RecentAlerts } from "@/components/dashboard/recent-alerts";
import { ActivityChart } from "@/components/dashboard/activity-chart";
import { ThreatDistribution } from "@/components/dashboard/threat-distribution";
import { WeeklyActivity } from "@/components/dashboard/weekly-activity";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Camera, cameras } from "@/types/camera";
import { Alert, alerts as defaultAlerts } from "@/types/alert";

export default function Dashboard() {
  const dashboardCameras = cameras;
  const [activeCameraIndex, setActiveCameraIndex] = useState(0);
  const [recentAlerts, setRecentAlerts] = useState<Alert[]>(defaultAlerts);

  const activityData = [
    { time: "00:00", events: 2 },
    { time: "04:00", events: 1 },
    { time: "08:00", events: 8 },
    { time: "12:00", events: 15 },
    { time: "16:00", events: 12 },
    { time: "20:00", events: 22 },
    { time: "24:00", events: 6 },
  ];

  const eventData = [
    { name: "Violence", value: 3 },
    { name: "Break-in", value: 5 },
    { name: "Suspicious", value: 12 },
    { name: "Loitering", value: 8 },
  ];

  const weeklyData = [
    { day: "Mon", events: 12 },
    { day: "Tue", events: 8 },
    { day: "Wed", events: 15 },
    { day: "Thu", events: 18 },
    { day: "Fri", events: 22 },
    { day: "Sat", events: 9 },
    { day: "Sun", events: 6 },
  ];

  // Function to simulate new alerts and trigger toasts
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
        id: Date.now(), // Use number instead of string
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

      setRecentAlerts((prev) => [newAlert, ...prev].slice(0, 4)); // Keep only latest 4 alerts
      toast.error(
        `New Alert: ${newAlert.type} at ${
          newAlert.camera
        } (${newAlert.severity.toUpperCase()})`
      );
    }, 15000); // Simulate a new alert every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <StatusCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <CameraFeed
            cameras={dashboardCameras}
            activeCamera={activeCameraIndex}
            setActiveCamera={setActiveCameraIndex}
          />
          <RecentAlerts alerts={recentAlerts} />
        </div>

        <div className="space-y-6">
          <ActivityChart data={activityData} />
          <ThreatDistribution data={eventData} />
          <WeeklyActivity data={weeklyData} />
          {/* Removed: SystemHealth, UserActivity, SystemPerformance */}
        </div>
      </div>

      {/* Removed the second grid for UserActivity and SystemPerformance */}
    </>
  );
}
