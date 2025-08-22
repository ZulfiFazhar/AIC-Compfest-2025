"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ThreatDistribution } from "@/components/dashboard/threat-distribution";
import { WeeklyActivity } from "@/components/dashboard/weekly-activity";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { AlertTriangle, Camera, Users } from "lucide-react";

export default function AnalyticsPage() {
  // Mock data for various charts
  const dailyAlertsData = [
    { hour: "00:00", high: 1, medium: 0, low: 0 },
    { hour: "04:00", high: 0, medium: 1, low: 0 },
    { hour: "08:00", high: 2, medium: 3, low: 1 },
    { hour: "12:00", high: 3, medium: 5, low: 2 },
    { hour: "16:00", high: 1, medium: 2, low: 3 },
    { hour: "20:00", high: 4, medium: 2, low: 1 },
    { hour: "24:00", high: 0, medium: 1, low: 0 },
  ];

  const cameraPerformanceData = [
    { name: "Main Entrance", uptime: 99.8, alerts: 15 },
    { name: "Parking Lot", uptime: 95.2, alerts: 22 },
    { name: "Back Door", uptime: 80.5, alerts: 8, offline: true },
    { name: "Lobby", uptime: 99.9, alerts: 10 },
  ];

  const userActivityTrend = [
    { month: "Jan", logins: 120, actions: 300 },
    { month: "Feb", logins: 150, actions: 350 },
    { month: "Mar", logins: 130, actions: 320 },
    { month: "Apr", logins: 180, actions: 400 },
    { month: "May", logins: 160, actions: 380 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Security Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Alerts by Severity</CardTitle>
            <CardDescription>
              Alerts detected today, categorized by severity.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyAlertsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="high" fill="#ef4444" name="High Severity" />
                <Bar dataKey="medium" fill="#f97316" name="Medium Severity" />
                <Bar dataKey="low" fill="#eab308" name="Low Severity" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <ThreatDistribution />
        <WeeklyActivity />

        <Card>
          <CardHeader>
            <CardTitle>Camera Performance</CardTitle>
            <CardDescription>
              Uptime and alert count per camera.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cameraPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  stroke="#8884d8"
                  label={{
                    value: "Uptime (%)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#82ca9d"
                  label={{
                    value: "Alerts",
                    angle: 90,
                    position: "insideRight",
                  }}
                />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="uptime"
                  fill="#8884d8"
                  name="Uptime"
                />
                <Bar
                  yAxisId="right"
                  dataKey="alerts"
                  fill="#82ca9d"
                  name="Alerts"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Activity Trend</CardTitle>
            <CardDescription>
              Monthly trend of user logins and actions.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userActivityTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="logins"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="actions" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Alerts (Last 30 Days)
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124</div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Cameras
              </CardTitle>
              <Camera className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3/4</div>
              <p className="text-xs text-muted-foreground">1 camera offline</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">
                Currently logged in
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
