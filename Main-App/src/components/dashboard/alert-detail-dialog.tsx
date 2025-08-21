"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Camera, Clock, MapPin, Video, Image, Siren } from "lucide-react"; // Import Siren icon
import { toast } from "sonner"; // Import toast for notifications

interface AlertDetail {
  id: string;
  type: string;
  camera: string;
  time: string;
  severity: "high" | "medium" | "low";
  status: "new" | "reviewed";
  location: string;
  description: string;
  mediaType: "video" | "image";
  mediaUrl: string;
  confidenceScore?: number; // Added confidence score
}

interface AlertDetailDialogProps {
  alert: AlertDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onMarkAsReviewed: (id: string) => void;
}

export function AlertDetailDialog({ alert, isOpen, onClose, onMarkAsReviewed }: AlertDetailDialogProps) {
  if (!alert) return null;

  const getSeverityBadgeVariant = (severity: AlertDetail['severity']) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const getSeverityIconColor = (severity: AlertDetail['severity']) => {
    switch (severity) {
      case "high": return "text-red-600";
      case "medium": return "text-yellow-600";
      default: return "text-blue-600";
    }
  };

  const handleNotifyPolice = () => {
    toast.info("Police have been notified for this incident (simulated).");
    // In a real app, this would trigger an actual API call to emergency services
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className={`h-6 w-6 ${getSeverityIconColor(alert.severity)}`} />
            {alert.type}
          </DialogTitle>
          <DialogDescription>
            Incident details detected by the Raksha.ai system.
          </DialogDescription>
        </DialogHeader>

        <div className="relative bg-black aspect-video flex items-center justify-center text-white text-lg font-medium">
          {alert.mediaType === "video" ? (
            <Video className="h-12 w-12 text-gray-400" />
          ) : (
            <Image className="h-12 w-12 text-gray-400" />
          )}
          <span className="ml-2">Incident Preview (Mock)</span>
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">LIVE</div>
        </div>

        <div className="p-6 pt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Camera</p>
              <p className="font-medium flex items-center gap-1"><Camera className="h-4 w-4" /> {alert.camera}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="font-medium flex items-center gap-1"><Clock className="h-4 w-4" /> {alert.time}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium flex items-center gap-1"><MapPin className="h-4 w-4" /> {alert.location}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Severity Level</p>
              <Badge variant={getSeverityBadgeVariant(alert.severity)}>
                {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
              </Badge>
            </div>
            {alert.confidenceScore !== undefined && (
              <div>
                <p className="text-sm text-muted-foreground">AI Confidence</p>
                <p className="font-medium">{alert.confidenceScore}%</p>
              </div>
            )}
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Incident Description</p>
            <p className="font-medium">{alert.description}</p>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="destructive" onClick={handleNotifyPolice}>
              <Siren className="h-4 w-4 mr-2" /> Notify Police
            </Button>
            {alert.status === "new" && (
              <Button onClick={() => { onMarkAsReviewed(alert.id); onClose(); }}>
                Mark as Reviewed
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}