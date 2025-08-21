"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Play, Pause, RotateCcw, Wifi, Battery, MapPin } from "lucide-react";
import { useState } from "react";

interface CameraDetail {
  id: string;
  name: string;
  location: string;
  status: "active" | "offline" | "maintenance";
  ipAddress: string;
}

interface LiveCameraViewDialogProps {
  camera: CameraDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LiveCameraViewDialog({ camera, isOpen, onClose }: LiveCameraViewDialogProps) {
  if (!camera) return null;

  const getStatusBadgeVariant = (status: CameraDetail['status']) => {
    switch (status) {
      case "active": return "default";
      case "offline": return "destructive";
      case "maintenance": return "secondary";
      default: return "default";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-6 w-6" />
            Live Feed: {camera.name}
          </DialogTitle>
          <DialogDescription>
            Real-time view and details for {camera.name}.
          </DialogDescription>
        </DialogHeader>

        <div className="relative bg-black aspect-video flex items-center justify-center text-white text-lg font-medium">
          {camera.status === "active" ? (
            <>
              {/* Placeholder for actual video stream */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-green-500 rounded-full w-4 h-4 animate-pulse mx-auto mb-2"></div>
                  <p className="text-white font-medium">Live Stream Active</p>
                  <p className="text-green-400 text-sm mt-1">Connecting...</p>
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
            </>
          ) : (
            <div className="text-center text-gray-400">
              <Camera className="h-12 w-12 mx-auto mb-2" />
              <p>Camera {camera.status}</p>
              <p className="text-sm">Cannot display live feed.</p>
            </div>
          )}
        </div>

        <div className="p-6 pt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium flex items-center gap-1"><MapPin className="h-4 w-4" /> {camera.location}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">IP Address</p>
              <p className="font-medium">{camera.ipAddress}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant={getStatusBadgeVariant(camera.status)}>
                {camera.status.charAt(0).toUpperCase() + camera.status.slice(1)}
              </Badge>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button disabled={camera.status !== "active"}>
              <Play className="h-4 w-4 mr-2" /> Play
            </Button>
            <Button variant="secondary" disabled={camera.status !== "active"}>
              <RotateCcw className="h-4 w-4 mr-2" /> Refresh
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}