import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
      },
      {
        hostname: "picsum.photos",
        protocol: "https",
      }, {
        hostname: "images.unsplash.com",
        protocol: "https",
      }, {
        hostname: "api.qrserver.com",
        protocol: "https",
      }
    ]
  }
};

export default nextConfig;
