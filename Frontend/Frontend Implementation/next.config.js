/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "www.nvidia.com",
      },
      {
        protocol: "https",
        hostname: "tpucdn.com",
      },
      {
        protocol: "https",
        hostname: "c1.neweggimages.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
}

module.exports = nextConfig
