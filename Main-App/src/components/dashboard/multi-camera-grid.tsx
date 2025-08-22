"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Play, Wifi, Battery } from "lucide-react";

// Updated CameraType interface to match the database schema
interface CameraType {
  _id: string;
  name: string;
  location: string;
  ipAddress: string;
  status: "online" | "offline" | "maintenance"; // Assuming these are the statuses
  streamUrl: string;
  addedAt: string; // Assuming it's stored as a string
}

interface MultiCameraGridProps {
  onViewLive: (camera: CameraType) => void;
}

export function MultiCameraGrid({ onViewLive }: MultiCameraGridProps) {
  const [cameras, setCameras] = useState<CameraType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const res = await fetch('/api/cameras');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setCameras(data);
      } catch (error) {
        console.error("Failed to fetch cameras:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCameras();
  }, []);

  const getStatusBadgeVariant = (status: CameraType["status"]) => {
    switch (status) {
      case "online": // Changed from "active" to "online"
        return "default";
      case "offline":
        return "destructive";
      case "maintenance":
        return "secondary";
      default:
        return "default";
    }
  };

  if (loading) {
    return <div>Loading cameras...</div>; // Or a skeleton loader
  }

  if (cameras.length === 0) {
    return <div>No cameras available.</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Camera Feeds</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cameras.map((camera) => (
            <div
              key={camera._id} // Changed from camera.id to camera._id
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              <div className="bg-black aspect-video relative flex items-center justify-center text-white text-sm">
                {camera.status === "online" ? ( // Changed from "active" to "online"
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="bg-green-500 rounded-full w-3 h-3 animate-pulse mx-auto mb-1"></div>
                        <p className="font-medium">{camera.name}</p>
                        <p className="text-green-400 text-xs mt-0.5">Live</p>
                      </div>
                    </div>
                    <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded-full">
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                        <span className="text-white text-xs">REC</span>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 bg-black/70 px-2 py-0.5 rounded-full">
                      <div className="flex items-center text-white text-xs">
                        <Wifi className="h-3 w-3 mr-1" />
                        <Battery className="h-3 w-3" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-gray-400">
                    <Camera className="h-8 w-8 mx-auto mb-2" />
                    <p>{camera.name}</p>
                    <p className="text-xs">
                      {camera.status.charAt(0).toUpperCase() +
                        camera.status.slice(1)}
                    </p>
                  </div>
                )}
              </div>
              <div className="p-3 bg-background">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-sm">{camera.name}</h3>
                  <Badge variant={getStatusBadgeVariant(camera.status)}>
                    {camera.status.charAt(0).toUpperCase() +
                      camera.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  {camera.location}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  disabled={camera.status !== "online"} // Changed from "active" to "online"
                  onClick={() => onViewLive(camera)}
                >
                  <Play className="h-3 w-3 mr-1" /> View Live
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}