import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // workshop.miandari.dev is a short alias for the workshop page. Not
        // permanent, so browsers don't cache it if the alias changes later.
        source: "/:path*",
        has: [{ type: "host", value: "workshop.miandari.dev" }],
        destination: "https://miandari.dev/utsc-ai-coding-workshop/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
