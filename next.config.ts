import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "pro-firefly-7024.clerk.accounts.dev",
    "*.clerk.accounts.dev",
    "*.accounts.dev",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thdylodefuiqmneblxko.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  turbopack: {
    resolveAlias: {
      "@clerk/nextjs/server": "./lib/clerkMock/server.ts",
      "@clerk/nextjs": "./lib/clerkMock/index.tsx",
    },
  },
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@clerk/nextjs/server": "./lib/clerkMock/server.ts",
      "@clerk/nextjs": "./lib/clerkMock/index.tsx",
    };
    return config;
  },
  async redirects() {
    return [
      {
        source: "/woman",
        destination: "/women",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
