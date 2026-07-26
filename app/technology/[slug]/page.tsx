import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail, projectPages, projectUrl } from "../../project-pages";

const technologyProjects = projectPages.filter((project) => project.section === "technology");

export function generateStaticParams() {
  return technologyProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = technologyProjects.find((item) => item.slug === slug);
  if (!project) return {};
  const canonical = `https://wcchun.com${projectUrl(project)}`;
  return {
    title: `${project.title} — ${project.subtitle} | Wong Chun`,
    description: project.description,
    alternates: { canonical },
    openGraph: {
      title: `${project.title} | Wong Chun`,
      description: project.description,
      url: canonical,
      type: "article",
      images: [{ url: project.image, alt: project.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: `${project.title} | Wong Chun`, description: project.description, images: [project.image] },
  };
}

export default async function TechnologyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = technologyProjects.find((item) => item.slug === slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
