import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from any hostname for future use
  images: {
    remotePatterns: [],
  },
  // Mark bcryptjs and Prisma as Node.js-only — prevents Edge Runtime bundling errors
  serverExternalPackages: ["bcryptjs", "@prisma/client", "prisma"],
};

export default nextConfig;
