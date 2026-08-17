import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Ships to divyo-argha.github.io as a static export — no Node server on GitHub Pages,
  // and no basePath needed since it serves from the domain root.
  output: "export",
  images: {
    unoptimized: true,
  },
  // Pins Turbopack's workspace root to this repo, avoiding an unrelated
  // package-lock.json elsewhere on the machine from being picked up.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
