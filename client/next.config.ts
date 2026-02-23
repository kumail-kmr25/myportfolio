import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  transpilePackages: ["@portfolio/shared"],
  async rewrites() {
    // In production (Vercel), vercel.json handles routing /api/* to the backend.
    if (process.env.NODE_ENV === 'production') {
      return [];
    }
    return [
      {
        source: "/api/:path*",
        destination: process.env.NEXT_PUBLIC_API_URL
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`
          : "http://localhost:5000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
