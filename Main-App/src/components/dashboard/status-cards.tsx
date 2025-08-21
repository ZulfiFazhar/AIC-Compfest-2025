"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Camera, Bell, Clock } from "lucide-react";

export function StatusCards() {
  const statusData = [
    {
      title: "System Status",
      value: "Secure",
      description: "All systems operational",
      icon: <Shield className="h-4 w-4 text-muted-foreground" />,
      color: "text-green-600"
    },
    {
      title: "Active Cameras",
      value: "3/4",
      description: "1 offline",
      icon: <Camera className="h-4 w-4 text-muted-foreground" />,
      badge: <Badge variant="destructive" className="text-xs">1 offline</Badge>
    },
    {
      title: "Today's Alerts",
      value: "12",
      description: "2 high priority",
      icon: <Bell className="h-4 w-4 text-muted-foreground" />,
      badge: <Badge variant="destructive" className="text-xs">2 high priority</Badge>
    },
    {
      title: "Response Time",
      value: "1.2s",
      description: "Average detection time",
      icon: <Clock className="h-4 w-4 text-muted-foreground" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statusData.map((item, index) => (
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