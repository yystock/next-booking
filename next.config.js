/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    experimental: {
      serverActions: true,
    },
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
    ],
  },
};

module.exports = nextConfig;
