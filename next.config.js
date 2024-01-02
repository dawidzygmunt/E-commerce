/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: '/e-commerce123',
  images: {
    domains: [
      "res.cloudinary.com"
    ]
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ]
      }
    ]
  }
}

module.exports = nextConfig
