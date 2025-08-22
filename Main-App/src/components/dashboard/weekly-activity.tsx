"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface WeeklyData {
  day: string;
  events: number;
}

export function WeeklyActivity() {
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const res = await fetch('/api/events');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const events = await res.json();

        // Aggregate data: count events per day of the week
        const dayCounts: { [key: string]: number } = {
          "Sunday": 0,
          "Monday": 0,
          "Tuesday": 0,
          "Wednesday": 0,
          "Thursday": 0,
          "Friday": 0,
          "Saturday": 0,
        };

        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        events.forEach((event: { timestamp: string }) => {
          const eventDate = new Date(event.timestamp);
          const dayName = daysOfWeek[eventDate.getDay()];
          dayCounts[dayName] = (dayCounts[dayName] || 0) + 1;
        });

        const aggregatedData: WeeklyData[] = daysOfWeek.map(day => ({
          day: day,
          events: dayCounts[day],
        }));

        setWeeklyData(aggregatedData);
      } catch (error) {
        console.error("Failed to fetch weekly data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyData();
  }, []);

  if (loading) {
    return <div>Loading weekly activity...</div>; // Or a skeleton loader
  }

  if (weeklyData.length === 0) {
    return <div>No weekly activity data available.</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Activity</CardTitle>
        <CardDescription>Events detected this week</CardDescription>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="events" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
