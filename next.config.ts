import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.viewmarket.in" }],
        destination: "https://viewmarket.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
