import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://image.tmdb.org/t/p/**'),
    ],
    qualities: [25, 50, 75, 100],
  },
};

export default nextConfig;
