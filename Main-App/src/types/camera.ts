export interface Camera {
  id: number;
  name: string;
  location: string;
  status: "active" | "offline" | "maintenance";
  ipAddress: string;
}

export interface CameraFeedProps {
  cameras: Camera[];
  activeCamera: number;
  setActiveCamera: (index: number) => void;
}

export interface LiveCameraViewDialogProps {
  camera: Camera | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface MultiCameraGridProps {
  cameras: Camera[];
  onViewLive: (camera: Camera) => void;
}

export const cameras: Camera[] = [
  {
    id: 1,
    name: "Main Entrance",
    location: "Front Building",
    status: "active",
    ipAddress: "192.168.1.101",
  },
  {
    id: 2,
    name: "Parking Lot",
    location: "East Wing",
    status: "active",
    ipAddress: "192.168.1.102",
  },
  {
    id: 3,
    name: "Back Door",
    location: "Rear Entrance",
    status: "offline",
    ipAddress: "192.168.1.103",
  },
  {
    id: 4,
    name: "Lobby",
    location: "Ground Floor",
    status: "maintenance",
    ipAddress: "192.168.1.104",
  },
];
