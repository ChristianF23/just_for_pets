import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fotos de productos guardadas en Vercel Blob.
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;
