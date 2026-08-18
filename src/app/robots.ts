import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.indexable) {
    return {
      rules: [
        { userAgent: "ChatGPT-User", allow: "/" },
        { userAgent: "*", disallow: "/" },
      ],
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
