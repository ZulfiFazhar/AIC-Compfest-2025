"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PerformanceMetric {
  name: string;
  value: number;
  max: number;
  unit: string;
  status: string;
}

interface SystemPerformanceProps {
  metrics: PerformanceMetric[];
}

export function SystemPerformance({ metrics }: SystemPerformanceProps) {
  const getColorClass = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage < 50) return "bg-green-500";
    if (percentage < 80) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Performance</CardTitle>
        <CardDescription>Current system metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm">{metric.name}</span>
                <span className="text-sm text-muted-foreground">
                  {metric.value}{metric.unit} {metric.max ? `/ ${metric.max}${metric.unit}` : ''}
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getColorClass(metric.value, metric.max || 100)}`} 
                  style={{ width: `${(metric.value / (metric.max || 100)) * 100}%` }}
                ></div>
              </div>
              {metric.status && (
                <div className="text-xs text-muted-foreground mt-1">{metric.status}</div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}