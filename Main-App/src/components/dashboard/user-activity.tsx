"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

interface UserActivityItem {
  user: string;
  action: string;
  time: string;
}

interface UserActivityProps {
  activities: UserActivityItem[];
}

export function UserActivity({ activities }: UserActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Activity</CardTitle>
        <CardDescription>Recent user actions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs mr-3">
                {item.user.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.user}</p>
                <p className="text-xs text-muted-foreground">{item.action}</p>
              </div>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}