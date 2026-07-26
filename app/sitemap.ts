import type { MetadataRoute } from "next";
import { projectPages, projectUrl } from "./project-pages";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: "https://wcchun.com", lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...projectPages.map((project) => ({
      url: `https://wcchun.com${projectUrl(project)}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: project.section === "technology" ? 0.9 : 0.8,
      images: [`https://wcchun.com${project.image}`],
    })),
  ];
}
