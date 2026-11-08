import type { NextConfig } from "next";

// Security headers applied to every response
const securityHeaders = [
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Block framing (clickjacking protection)
  { key: "X-Frame-Options", value: "DENY" },
  // Control referrer information leakage
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restrict powerful browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // DNS prefetch control
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Force HTTPS for 1 year once deployed (safe on Vercel / production CDN)
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // Content Security Policy — tightened for portfolio + Telegram API calls
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // 'unsafe-inline'/'eval' required by Next.js
      "style-src 'self' 'unsafe-inline'",                // Tailwind inline styles
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://api.telegram.org",     // only outbound API we call
      "frame-ancestors 'none'",                          // equivalent of X-Frame-Options: DENY
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  headers: async () => [
    {
      // Apply security headers to all routes
      source: "/(.*)",
      headers: securityHeaders,
    },
  ],
};

export default nextConfig;
