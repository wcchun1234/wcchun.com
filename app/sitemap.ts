import type { MetadataRoute } from "next";
import { projectPages, projectUrl } from "./project-pages";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated: Record<string, string> = {
    "scanned-memories": "2026-07-26",
    "digital-echoes": "2026-07-26",
    memorygrid: "2026-07-26",
    wordview: "2026-07-26",
    readyloop: "2026-07-26",
    "dt-fabrication-dashboard": "2026-07-26",
    robotics: "2026-07-26",
  };
  return [
    { url: "https://wcchun.com", lastModified: new Date("2026-07-27") },
    ...projectPages.map((project) => ({
      url: `https://wcchun.com${projectUrl(project)}`,
      lastModified: new Date(updated[project.slug]),
      images: [`https://wcchun.com${project.image}`],
    })),
  ];
}
