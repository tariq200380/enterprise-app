import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  // Allow ngrok domain to connect to dev server, HMR, WebSockets, and static chunks
  allowedDevOrigins: [
    "runt-royal-reps.ngrok-free.dev",
    "*.ngrok-free.dev",
    "*.ngrok-free.app",
    "localhost:3001",
    "0.0.0.0",
  ],
  experimental: {
    serverActions: {
      allowedOrigins: [
        "runt-royal-reps.ngrok-free.dev",
        "*.ngrok-free.dev",
        "*.ngrok-free.app",
        "localhost:3001",
      ],
    },
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,OPTIONS" },
          { key: "ngrok-skip-browser-warning", value: "69420" },
        ],
      },
      {
        source: "/uploads/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=3600",
          },
        ],
      },
      {
        source: "/:all*(jpg|jpeg|png|webp|avif|svg|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=3600",
          },
        ],
      },
    ];
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.infrastructureLogging = {
        level: "error",
      };
    }
    return config;
  },
};

export default nextConfig;