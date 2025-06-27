import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_IMAGE_PROTOCOL as 'http' | 'https' | undefined,
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME || 'localhost',
        port: process.env.NEXT_PUBLIC_IMAGE_PORT,
      },
    ],
  },
}

export default nextConfig
