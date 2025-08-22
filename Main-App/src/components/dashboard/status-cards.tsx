"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Camera, Bell, Clock } from "lucide-react";

interface SystemStatus {
  _id?: string;
  systemStatus: string;
  activeCameras: number;
  totalCameras: number;
  alertsToday: number;
  highPriorityAlerts: number;
  averageResponseTime: number;
  lastUpdatedAt: string;
}

export function StatusCards() {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSystemStatus = async () => {
      try {
        const res = await fetch('/api/system-status');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setSystemStatus(data);
      } catch (error) {
        console.error("Failed to fetch system status:", error);
        // Optionally set an error state here
      } finally {
        setLoading(false);
      }
    };

    fetchSystemStatus();
  }, []);

  if (loading) {
    return <div>Loading status cards...</div>; // Or a skeleton loader
  }

  if (!systemStatus) {
    return <div>Failed to load system status.</div>; // Or a message indicating no data
  }

  // Transform systemStatus into a format suitable for rendering
  const displayData = [
    {
      title: "System Status",
      value: systemStatus.systemStatus,
      description: "All systems operational", // This description is static, consider making it dynamic
      icon: <Shield className="h-4 w-4 text-muted-foreground" />,
      color: systemStatus.systemStatus === "Secure" ? "text-green-600" : "text-red-600" // Example dynamic color
    },
    {
      title: "Active Cameras",
      value: `${systemStatus.activeCameras}/${systemStatus.totalCameras}`,
      description: `${systemStatus.totalCameras - systemStatus.activeCameras} offline`,
      icon: <Camera className="h-4 w-4 text-muted-foreground" />,
      badge: systemStatus.totalCameras - systemStatus.activeCameras > 0 ? <Badge variant="destructive" className="text-xs">${systemStatus.totalCameras - systemStatus.activeCameras} offline</Badge> : null
    },
    {
      title: "Today's Alerts",
      value: systemStatus.alertsToday.toString(),
      description: `${systemStatus.highPriorityAlerts} high priority`,
      icon: <Bell className="h-4 w-4 text-muted-foreground" />,
      badge: systemStatus.highPriorityAlerts > 0 ? <Badge variant="destructive" className="text-xs">${systemStatus.highPriorityAlerts} high priority</Badge> : null
    },
    {
      title: "Response Time",
      value: `${systemStatus.averageResponseTime}s`,
      description: "Average detection time",
      icon: <Clock className="h-4 w-4 text-muted-foreground" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {displayData.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            {item.icon}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${item.color || ''}`}>{item.value}</div>
            <p className="text-xs text-muted-foreground">{item.description}</p>
            {item.badge && <div className="flex items-center mt-1">{item.badge}</div>}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
