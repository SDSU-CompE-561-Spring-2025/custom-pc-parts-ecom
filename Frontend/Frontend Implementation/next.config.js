/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'www.nvidia.com',
      },
      {
        protocol: 'https',
        hostname: 'tpucdn.com',
      },
      {
        protocol: 'https',
        hostname: 'c1.neweggimages.com',
      },
    ],
  },
}

module.exports = nextConfig
