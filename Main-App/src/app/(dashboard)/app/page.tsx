"use client";

import { StatusCards } from "@/components/dashboard/status-cards";
import { CameraFeed } from "@/components/dashboard/camera-feed";
import { RecentAlerts } from "@/components/dashboard/recent-alerts";
import { ActivityChart } from "@/components/dashboard/activity-chart";
import { ThreatDistribution } from "@/components/dashboard/threat-distribution";
import { WeeklyActivity } from "@/components/dashboard/weekly-activity";
import { useState, useEffect } from "react";
import { toast } from "sonner";

// Define Camera interface (consistent with other files)
interface Camera {
  id: number;
  name: string;
  location: string;
  status: "active" | "offline";
  ipAddress: string;
}

// Define Alert interface (consistent with other files)
interface Alert {
  id: number;
  type: string;
  camera: string;
  time: string;
  severity: "high" | "medium" | "low";
  status: "new" | "reviewed";
  location: string;
  description: string;
  mediaType: "video" | "image";
  mediaUrl: string;
  confidenceScore?: number;
}

export default function Dashboard() {
  // Mock data
  const cameras: Camera[] = [
    {
      id: 1,
      name: "Main Entrance",
      status: "active",
      location: "Front Building",
      ipAddress: "192.168.1.101",
    },
    {
      id: 2,
      name: "Parking Lot",
      status: "active",
      location: "East Wing",
      ipAddress: "192.168.1.102",
    },
    {
      id: 3,
      name: "Back Door",
      status: "offline",
      location: "Rear Entrance",
      ipAddress: "192.168.1.103",
    },
    {
      id: 4,
      name: "Lobby",
      status: "active",
      location: "Ground Floor",
      ipAddress: "192.168.1.104",
    },
  ];

  const [activeCameraIndex, setActiveCameraIndex] = useState(0); // State for active camera in CameraFeed

  const [recentAlerts, setRecentAlerts] = useState<Alert[]>([
    {
      id: 1,
      type: "Violence Detected",
      camera: "Main Entrance",
      time: "2 min ago",
      severity: "high",
      status: "new",
      location: "Front Building",
      description:
        "System detected physical violence in the main entrance area.",
      mediaType: "video",
      mediaUrl: "/mock-video-violence.mp4",
      confidenceScore: 95,
    },
    {
      id: 2,
      type: "Suspicious Activity",
      camera: "Parking Lot",
      time: "15 min ago",
      severity: "medium",
      status: "new",
      location: "East Wing Parking",
      description:
        "Someone was seen peeking into several cars in the parking area.",
      mediaType: "image",
      mediaUrl: "/mock-image-suspicious.jpg",
      confidenceScore: 80,
    },
    {
      id: 3,
      type: "Loitering",
      camera: "Lobby",
      time: "1 hour ago",
      severity: "low",
      status: "reviewed",
      location: "Main Lobby",
      description:
        "Several individuals loitering in the lobby after operating hours.",
      mediaType: "video",
      mediaUrl: "/mock-video-loitering.mp4",
      confidenceScore: 65,
    },
    {
      id: 4,
      type: "Break-in Attempt",
      camera: "Back Door",
      time: "3 hours ago",
      severity: "high",
      status: "new",
      location: "Rear Entrance",
      description: "Forced attempt to open the back door detected.",
      mediaType: "image",
      mediaUrl: "/mock-image-breakin.jpg",
      confidenceScore: 98,
    },
  ]);

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

  // Removed: systemHealthItems, userActivities, performanceMetrics

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
        id: Date.now(),
        type: randomType,
        camera: randomCamera,
        time: "just now",
        severity: randomSeverity,
        status: "new",
        location: "Simulated Location",
        description: `Simulated alert: ${randomType} at ${randomCamera}.`,
        mediaType: Math.random() > 0.5 ? "video" : "image",
        mediaUrl: "/mock-media.mp4", // Placeholder
        confidenceScore: Math.floor(Math.random() * (99 - 70 + 1)) + 70, // Random score between 70-99
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
            cameras={cameras}
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
