import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=()",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Content-Security-Policy",
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' blob: https://app.cal.com https://static.cloudflareinsights.com; script-src-elem 'self' 'unsafe-inline' blob: https://app.cal.com https://static.cloudflareinsights.com; worker-src 'self' blob:; child-src 'self' blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https:; media-src 'self' data: blob: https:; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https: wss: blob: https://cloudflareinsights.com https://static.cloudflareinsights.com; frame-src 'self' https://app.cal.com https://arbizualdo.gumroad.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self';",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/compare.html",
        destination: "/compare",
      },
      {
        source: "/api/v1/health",
        destination: "http://127.0.0.1:3070/health",
      },
      {
        source: "/api/v1/:path*",
        destination: "http://127.0.0.1:3070/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
