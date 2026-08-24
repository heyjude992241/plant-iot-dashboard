import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repoName = "plant-iot-dashboard";

const nextConfig: NextConfig = {
  output: "export",
  assetPrefix: isGitHubPages ? `/${repoName}` : "",
  trailingSlash: true,
};

export default nextConfig;
