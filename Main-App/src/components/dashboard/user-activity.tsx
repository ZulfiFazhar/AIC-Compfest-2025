/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UserActivityItem {
  user: string; // This will be the user's name
  action: string;
  time: string;
}

interface Event {
  _id: string;
  timestamp: string;
  type: string;
  severity: "high" | "medium" | "low" | "info";
  cameraId?: string;
  userId?: string; // This is the user's ID from the database
  details?: any;
}

interface UserData {
  _id: string; // Assuming _id is the user ID in the users collection
  name: string;
  email: string;
}

export function UserActivity() {
  const [activities, setActivities] = useState<UserActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserActivities = async () => {
      try {
        // Fetch all events
        const eventsRes = await fetch("/api/events");
        if (!eventsRes.ok) {
          throw new Error(`HTTP error! status: ${eventsRes.status}`);
        }
        const events: Event[] = await eventsRes.json();

        // Fetch all users to map user IDs to names
        const usersRes = await fetch("/api/users");
        let users: UserData[] = [];
        if (usersRes.ok) {
          users = await usersRes.json();
        } else {
          console.warn(
            "Could not fetch users. User names might not be displayed correctly."
          );
          // Fallback for dummy user data if /api/users doesn't exist
          users = [
            {
              _id: "68a7eb4bf6d83a2cfa472ccc",
              name: "John Doe",
              email: "john@email.com",
            },
          ];
        }

        const userMap = new Map<string, string>();
        users.forEach((user) => userMap.set(user._id, user.name));

        // Filter for events with a userId and map to UserActivityItem
        const userActivities: UserActivityItem[] = events
          .filter((event) => event.userId)
          .map((event) => ({
            user: userMap.get(event.userId!) || `User ${event.userId}`, // Use name if found, else show ID
            action: event.type,
            time: new Date(event.timestamp).toLocaleString(), // Format timestamp
          }));

        setActivities(userActivities);
      } catch (error) {
        console.error("Failed to fetch user activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserActivities();
  }, []);

  if (loading) {
    return <div>Loading user activity...</div>; // Or a skeleton loader
  }

  if (activities.length === 0) {
    return <div>No user activity available.</div>;
  }

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
