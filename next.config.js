const hostnames = [
  "images.unsplash.com",
  "images.pexels.com",
  "api.wallstreetlens.com",
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: hostnames.map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  },
};

module.exports = nextConfig;
