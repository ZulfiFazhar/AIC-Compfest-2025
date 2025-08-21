"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HealthItem {
  name: string;
  status: string;
  variant: "default" | "destructive";
}

interface SystemHealthProps {
  items: HealthItem[];
}

export function SystemHealth({ items }: SystemHealthProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Health</CardTitle>
        <CardDescription>Current system status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm">{item.name}</span>
              <Badge variant={item.variant}>{item.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}