/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACKEND: process.env.BACKEND,
    FRONTEND: process.env.FRONTEND
  },
  swcMinify: true,
}

module.exports = nextConfig