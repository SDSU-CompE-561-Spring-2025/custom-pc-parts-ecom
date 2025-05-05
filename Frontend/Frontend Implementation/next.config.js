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
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "assets.corsair.com",
      },
      {
        protocol: "https",
        hostname: "www.datocms-assets.com",
      },
      {
        protocol: "https",
        hostname: "c1.neweggimages.com",
      },
      {
        protocol: "https",
        hostname: "www.lg.com",
      },
      {
        protocol: "https",
        hostname: "www.masterfolo.lv",
      },
      {
        protocol: "https",
        hostname: "dlcdnwebimgs.asus.com",
      },
      {
        protocol: "https",
        hostname: "storage.aoc.com",
      },
      {
        protocol: "https",
        hostname: "asset.msi.com",
      },
      {
        protocol: "https",
        hostname: "media.croma.com",
      },
      {
        protocol: "https",
        hostname: "storage-asset.msi.com",
      },
      {
        protocol: "https",
        hostname: "asset-us-store.msi.com",
      },
      {
        protocol: "https",
        hostname: "altex.com",
      },
    ],
  },
}

module.exports = nextConfig
