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
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
      {
        protocol: "https",
        hostname: "*.apple.com",
      },
      {
        protocol: "https",
        hostname: "*.dawn.com",
      },
      {
        protocol: "https",
        hostname: "*.brecorder.com",
      },
      {
        protocol: "https",
        hostname: "*.tribune.com.pk",
      },
      {
        protocol: "https",
        hostname: "propakistani.pk",
      },
      {
        protocol: "https",
        hostname: "*.propakistani.pk",
      },
      {
        protocol: "https",
        hostname: "*.google.com",
      },
      {
        protocol: "https",
        hostname: "*.nvidia.com",
      },
      {
        protocol: "https",
        hostname: "*.microsoft.com",
      },
      {
        protocol: "https",
        hostname: "*.intel.com",
      },
      {
        protocol: "https",
        hostname: "about.fb.com",
      },
      {
        protocol: "https",
        hostname: "*.fb.com",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "*.openai.com",
      },
      {
        protocol: "https",
        hostname: "*.anthropic.com",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "*.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "iprsoftwaremedia.com",
      },
      {
        protocol: "https",
        hostname: "*.iprsoftwaremedia.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          // Note: 'unsafe-inline' and 'unsafe-eval' in script-src weaken XSS protection and should be replaced with a nonce-based CSP once dangerouslySetInnerHTML usage in the admin article modules is sanitized.
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.accounts.dev https://clerk.com https://challenges.cloudflare.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://images.unsplash.com https://img.freepik.com https://img.clerk.com https://images.clerk.dev https://*.apple.com https://*.dawn.com https://*.brecorder.com https://*.tribune.com.pk https://propakistani.pk https://*.propakistani.pk https://*.google.com https://storage.googleapis.com https://*.googleapis.com https://*.nvidia.com https://*.microsoft.com https://*.intel.com https://about.fb.com https://*.fb.com https://images.ctfassets.net https://*.openai.com https://*.anthropic.com https://iprsoftwaremedia.com https://*.iprsoftwaremedia.com",
              "font-src 'self' data:",
              "connect-src 'self' https://*.clerk.accounts.dev https://api.clerk.com https://clerk.com wss://*.clerk.accounts.dev",
              "frame-src 'self' https://challenges.cloudflare.com https://www.youtube.com https://player.vimeo.com",
              "media-src 'self' https: data: blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
            ].join("; "),
          },
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