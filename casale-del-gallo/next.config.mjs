/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 80],
  },
  // Old Wix URLs without a language keep working through src/proxy.js.
};

export default nextConfig;
