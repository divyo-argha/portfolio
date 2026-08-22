import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Deployed on Vercel as a fully static export: the site has no server-rendered
  // or revalidated routes, so a static build is the simplest thing that works and
  // stays portable to any static host. Trade-off: `export` also switches off
  // Vercel's on-demand image optimization, so every image in `public/` is served
  // exactly as committed — which is why they are pre-encoded to WebP at their real
  // display sizes rather than left as source PNGs. Cache headers for those live in
  // `vercel.json`, since Vercel serves `public/` with `max-age=0` by default.
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
