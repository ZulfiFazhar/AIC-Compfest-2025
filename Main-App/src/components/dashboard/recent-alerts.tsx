"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { Alert, RecentAlertsProps } from "@/types/alert";

export function RecentAlerts({ alerts }: RecentAlertsProps) {
  const getSeverityColor = (severity: Alert["severity"]) => {
    switch (severity) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      default:
        return "secondary";
    }
  };

  const getSeverityIconColor = (severity: Alert["severity"]) => {
    switch (severity) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      default:
        return "text-blue-600";
    }
  };

  const getSeverityBgColor = (severity: Alert["severity"]) => {
    switch (severity) {
      case "high":
        return "bg-red-100";
      case "medium":
        return "bg-yellow-100";
      default:
        return "bg-blue-100";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
        <CardDescription>Latest security incidents detected</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start p-3 border rounded-lg hover:bg-muted"
            >
              <div
                className={`p-2 rounded-full mr-3 ${getSeverityBgColor(
                  alert.severity
                )}`}
              >
                <AlertTriangle
                  className={`h-5 w-5 ${getSeverityIconColor(alert.severity)}`}
                />
              </div>
              <div className="flex-1">
                <div className="font-medium">{alert.type}</div>
                <div className="text-sm text-muted-foreground">
                  {alert.camera} • {alert.time}
                </div>
              </div>
              <Badge variant={getSeverityColor(alert.severity)}>
                {alert.severity}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
