import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    domains: ["images.unsplash.com"],
  },
}

export default nextConfig
