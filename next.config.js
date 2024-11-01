/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASE_PATH || "",
  images: {
    domains: ["res.cloudinary.com"],
  },
  output: "standalone",
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
