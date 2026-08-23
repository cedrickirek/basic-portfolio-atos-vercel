import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: builds to ./out, deployable to Vercel or any static host.
  output: "export",
  // Static export cannot run the default image optimizer, so images are served as-is.
  images: { unoptimized: true },
};

export default nextConfig;
