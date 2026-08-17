import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { publicationSlugs, projectSlugs } from "@/lib/detail";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { url: siteConfig.url, priority: 1 },
    ...publicationSlugs.map((slug) => ({ url: `${siteConfig.url}/publications/${slug}`, priority: 0.7 })),
    ...projectSlugs.map((slug) => ({ url: `${siteConfig.url}/work/${slug}`, priority: 0.6 })),
  ];

  return routes.map((route) => ({ ...route, lastModified: new Date() }));
}
