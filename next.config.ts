import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Ships to divyo-argha.github.io as a static export — no Node server on GitHub Pages,
  // and no basePath needed since it serves from the domain root.
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    // Default `true` merges nearly all CSS modules into one chunk, so the
    // homepage was downloading the styles for the ROC curve, confusion matrix,
    // game table and dice roller. `graph` prices an extra request against the
    // unused bytes a merge pushes onto a route; on GitHub Pages over HTTP/2 an
    // extra stylesheet request is cheap, so we bias well below the 20KB default.
    cssChunking: { type: "graph", requestCost: 4000 },
  },
  // Pins Turbopack's workspace root to this repo, avoiding an unrelated
  // package-lock.json elsewhere on the machine from being picked up.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
