/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Isolate the two local test builds; production keeps the default directory.
  distDir: process.env.AYM_TEST_DIST_DIR || ".next",
};

export default nextConfig;
