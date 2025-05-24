import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.isbndb.com",
      },
    ],
  },
};

export default nextConfig;
