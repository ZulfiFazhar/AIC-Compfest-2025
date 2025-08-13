import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Blocks,
  Cctv,
  TriangleAlert,
  FileChartColumnIncreasing,
} from "lucide-react";

const BASE_URL = "/app";

export const NavData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Overview",
      url: `${BASE_URL}/`,
      icon: Blocks,
      isActive: true,
    },
    {
      title: "Live Feeds",
      url: `${BASE_URL}/live`,
      icon: Cctv,
    },
    {
      title: "Alerts",
      url: `${BASE_URL}/alerts`,
      icon: TriangleAlert,
    },
    {
      title: "Reports",
      url: `${BASE_URL}/reports`,
      icon: FileChartColumnIncreasing,
    },
  ],
};
