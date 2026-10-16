import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    // Add the host of your real property photos here (CDN, Cloudinary, etc.)
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default config;
