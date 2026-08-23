import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { publicationSlugs, projectSlugs } from "@/lib/detail";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { url: siteConfig.url, priority: 1 },
    { url: `${siteConfig.url}/research`, priority: 0.9 },
    { url: `${siteConfig.url}/publications`, priority: 0.9 },
    { url: `${siteConfig.url}/work`, priority: 0.7 },
    { url: `${siteConfig.url}/publications/cyqured/game`, priority: 0.8 },
    { url: `${siteConfig.url}/publications/cyqured/game/mechanics`, priority: 0.7 },
    { url: `${siteConfig.url}/publications/cyqured/game/publication`, priority: 0.7 },
    ...publicationSlugs.map((slug) => ({ url: `${siteConfig.url}/publications/${slug}`, priority: 0.7 })),
    ...projectSlugs.map((slug) => ({ url: `${siteConfig.url}/work/${slug}`, priority: 0.6 })),
  ];

  return routes.map((route) => ({ ...route, lastModified: new Date() }));
}
