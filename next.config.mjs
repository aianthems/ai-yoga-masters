/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Isolate the two local test builds; production keeps the default directory.
  distDir: process.env.AYM_TEST_DIST_DIR || ".next",
  async redirects() {
    return [
      { source: "/evidence", destination: "/curriculum", permanent: true },
      {
        source: "/practice",
        has: [{ type: "query", key: "practice", value: "clarity-discernment" }],
        destination: "/lessons/clarity-and-discernment",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
