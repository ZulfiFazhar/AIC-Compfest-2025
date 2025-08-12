import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/pelindung/:path*",
        destination: "https://pelindung.bandung.go.id:3443/video/DAHUA/:path*",
      },
    ];
  },
};

export default nextConfig;
