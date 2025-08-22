"use client";

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ActivityData {
  time: string;
  events: number;
}

export function ActivityChart() {
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const res = await fetch('/api/events');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const events = await res.json();

        // Aggregate data: count events per hour for the last 24 hours
        const hourlyCounts: { [key: string]: number } = {};
        const now = new Date();
        
        // Initialize counts for the last 24 hours
        for (let i = 23; i >= 0; i--) {
          const date = new Date(now.getTime() - i * 60 * 60 * 1000);
          const hour = date.getHours();
          hourlyCounts[`${hour}:00`] = 0;
        }

        events.forEach((event: { timestamp: string }) => {
          const eventDate = new Date(event.timestamp);
          // Only consider events from the last 24 hours
          if (now.getTime() - eventDate.getTime() <= 24 * 60 * 60 * 1000) {
            const hour = eventDate.getHours();
            hourlyCounts[`${hour}:00`] = (hourlyCounts[`${hour}:00`] || 0) + 1;
          }
        });

        const aggregatedData: ActivityData[] = Object.keys(hourlyCounts)
          .sort((a, b) => {
            const hourA = parseInt(a.split(':')[0]);
            const hourB = parseInt(b.split(':')[0]);
            return hourA - hourB;
          })
          .map(time => ({
            time: time,
            events: hourlyCounts[time],
          }));

        setActivityData(aggregatedData);
      } catch (error) {
        console.error("Failed to fetch activity data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivityData();
  }, []);

  if (loading) {
    return <div>Loading activity chart...</div>; // Or a skeleton loader
  }

  if (activityData.length === 0) {
    return <div>No activity data available.</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Overview</CardTitle>
        <CardDescription>Today&apos;s security events</CardDescription>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="events"
              stroke="#3b82f6"
              fill="#93c5fd"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}