import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "go-work-dev-bucket.s3.eu-south-2.amazonaws.com",
      "t3.ftcdn.net",
      "media.istockphoto.com",
      "example.com",
    ],
    unoptimized: true,
  },
};

export default nextConfig;
