"use client";

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface ThreatData {
  name: string;
  value: number;
}

const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e"];

export function ThreatDistribution() {
  const [threatData, setThreatData] = useState<ThreatData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThreatData = async () => {
      try {
        const res = await fetch('/api/events');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const events = await res.json();

        // Aggregate data: count occurrences of each event type
        const counts: { [key: string]: number } = {};
        events.forEach((event: { type: string }) => {
          counts[event.type] = (counts[event.type] || 0) + 1;
        });

        const aggregatedData: ThreatData[] = Object.keys(counts).map(type => ({
          name: type,
          value: counts[type],
        }));

        setThreatData(aggregatedData);
      } catch (error) {
        console.error("Failed to fetch threat data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchThreatData();
  }, []);

  if (loading) {
    return <div>Loading threat distribution...</div>; // Or a skeleton loader
  }

  if (threatData.length === 0) {
    return <div>No threat data available.</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Threat Distribution</CardTitle>
        <CardDescription>Types of incidents detected</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={threatData} // Use the fetched and aggregated data
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                }
              >
                {threatData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}