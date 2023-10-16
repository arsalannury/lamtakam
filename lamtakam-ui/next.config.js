/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  
  env: {
    GITHUB_ID: "af007aaf112ad7e96fa7",
    GITHUB_SECRET: "2861bfc904d9de6d8742924ea5adb7797ca5098b",
  },
  staticPageGenerationTimeout: 100,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

module.exports = nextConfig;
