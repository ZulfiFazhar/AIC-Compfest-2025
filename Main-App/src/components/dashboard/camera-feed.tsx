"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Play, Pause, RotateCcw, Wifi, Battery } from "lucide-react";
import { useState } from "react";
import { Camera as CameraType, CameraFeedProps } from "@/types/camera";

export function CameraFeed({
  cameras,
  activeCamera,
  setActiveCamera,
}: CameraFeedProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Live Camera Feed</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Play className="h-4 w-4 mr-1" />
              <span className="hidden md:inline">Play</span>
            </Button>
            <Button variant="outline" size="sm">
              <Pause className="h-4 w-4 mr-1" />
              <span className="hidden md:inline">Pause</span>
            </Button>
            <Button variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-1" />
              <span className="hidden md:inline">Refresh</span>
            </Button>
          </div>
        </div>
        <CardDescription>
          Currently viewing: {cameras[activeCamera].name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-black rounded-lg aspect-video relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center z-1">
            <div className="text-center">
              <div className="bg-red-500 rounded-full w-4 h-4 animate-pulse mx-auto mb-2"></div>
              <p className="text-white font-medium">
                Live Feed - {cameras[activeCamera].name}
              </p>
              <p className="text-green-400 text-sm mt-1">Status: Active</p>
            </div>
          </div>
          <div className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded-full">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-white text-sm">Recording</span>
            </div>
          </div>
          <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full">
            <div className="flex items-center text-white text-sm">
              <Wifi className="h-4 w-4 mr-1" />
              <Battery className="h-4 w-4 ml-2" />
            </div>
          </div>
        </div>

        {/* Camera Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {cameras.map((camera, index) => (
            <Button
              key={camera.id}
              variant={activeCamera === index ? "default" : "outline"}
              className="flex flex-col h-auto p-3"
              onClick={() => setActiveCamera(index)}
            >
              <Camera className="h-5 w-5 mb-1" />
              <span className="text-xs">{camera.name}</span>
              <Badge
                variant={camera.status === "active" ? "default" : "destructive"}
                className="mt-1 capitalize"
              >
                {camera.status}
              </Badge>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
