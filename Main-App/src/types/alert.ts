export interface Alert {
  id: number;
  type: string;
  camera: string;
  time: string;
  severity: "high" | "medium" | "low";
  status: "new" | "reviewed";
  location: string;
  description: string;
  mediaType: "video" | "image";
  mediaUrl: string;
  confidenceScore?: number;
}

export interface AlertDetailDialogProps {
  alert: Alert | null;
  isOpen: boolean;
  onClose: () => void;
  onMarkAsReviewed: (id: string) => void;
}

export interface RecentAlertsProps {
  alerts: Alert[];
}

export const alerts: Alert[] = [
  {
    id: 1,
    type: "Violence Detected",
    camera: "Main Entrance",
    time: "2 min ago",
    severity: "high",
    status: "new",
    location: "Front Building",
    description: "System detected physical violence in the main entrance area.",
    mediaType: "video",
    mediaUrl: "/mock-video-violence.mp4",
    confidenceScore: 95,
  },
  {
    id: 2,
    type: "Suspicious Activity",
    camera: "Parking Lot",
    time: "15 min ago",
    severity: "medium",
    status: "new",
    location: "East Wing Parking",
    description:
      "Someone was seen peeking into several cars in the parking area.",
    mediaType: "image",
    mediaUrl: "/mock-image-suspicious.jpg",
    confidenceScore: 80,
  },
  {
    id: 3,
    type: "Loitering",
    camera: "Lobby",
    time: "1 hour ago",
    severity: "low",
    status: "reviewed",
    location: "Main Lobby",
    description:
      "Several individuals loitering in the lobby after operating hours.",
    mediaType: "video",
    mediaUrl: "/mock-video-loitering.mp4",
    confidenceScore: 65,
  },
  {
    id: 4,
    type: "Break-in Attempt",
    camera: "Back Door",
    time: "3 hours ago",
    severity: "high",
    status: "new",
    location: "Rear Entrance",
    description: "Forced attempt to open the back door detected.",
    mediaType: "image",
    mediaUrl: "/mock-image-breakin.jpg",
    confidenceScore: 98,
  },
];
