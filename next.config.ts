import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  serverExternalPackages: ["bcryptjs", "@prisma/client", "prisma"],
};

export default nextConfig;
