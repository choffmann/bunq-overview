import type { NextConfig } from "next";
import { execSync } from "child_process";

function getGitInfo() {
  try {
    return {
      commitHash: execSync("git rev-parse --short HEAD").toString().trim(),
      branch: execSync("git rev-parse --abbrev-ref HEAD").toString().trim(),
      buildTime: new Date().toISOString(),
    };
  } catch {
    return { commitHash: "unknown", branch: "unknown", buildTime: new Date().toISOString() };
  }
}

const git = getGitInfo();

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_COMMIT_HASH: git.commitHash,
    NEXT_PUBLIC_BRANCH: git.branch,
    NEXT_PUBLIC_BUILD_TIME: git.buildTime,
  },
};

export default nextConfig;
