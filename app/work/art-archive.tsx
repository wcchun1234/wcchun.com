"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { projectSlug, projects } from "../portfolio-data";

const filters = ["All", "Photography", "Installation", "Creative Coding", "Moving Image", "Graphic", "Research & Experiments"] as const;
type Filter = (typeof filters)[number];

export default function ArtArchive() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = filter === "All"
    ? projects
    : projects.filter((project) => project.medium === (filter === "Research & Experiments" ? "Other" : filter));

  return (
    <main className="art-archive-page">
      <a className="skip-link" href="#archive-grid">Skip to artworks</a>
      <header className="art-archive-nav">
        <Link href="/" className="project-page-brand">WCCHUN</Link>
        <Link href="/#work">Back to portfolio ↙</Link>
      </header>
      <section className="art-archive-hero">
        <p className="eyebrow">Wong Chun (Sunny) / Art</p>
        <h1>Works to<br /><em>explore.</em></h1>
        <div>
          <p>Images, moving pictures and installations shaped by memory, language and the systems around us.</p>
          <span>29 artworks · 2020—2024</span>
        </div>
      </section>
      <section className="art-archive-content" aria-label="Art archive">
        <div className="art-archive-toolbar">
          <p aria-live="polite">{String(visible.length).padStart(2, "0")} works</p>
          <div className="filter-bar" role="group" aria-label="Filter artworks by medium">
            {filters.map((item) => (
              <button type="button" key={item} className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)} aria-pressed={filter === item}>
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="project-grid art-archive-grid" id="archive-grid">
          {visible.map((project, index) => (
            <article className="project-card" key={project.title}>
              <Link className="project-primary-action" href={`/work/${projectSlug(project.title)}`}
                aria-label={`View ${project.title}, ${project.medium}, ${project.year}`}>
                <span className="project-image">
                  <Image src={project.image} alt={project.alt} width={1280} height={1280}
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw" loading="lazy" unoptimized />
                  <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="view-project">View project ↗</span>
                </span>
                <span className="project-meta">
                  <span><strong>{project.title}</strong>{project.zh && <small lang="zh-Hant">{project.zh}</small>}</span>
                  <span>{project.medium}</span>
                  <span>{project.year}</span>
                </span>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <footer className="art-archive-footer">
        <p>See the ideas behind the work and where it has been shown.</p>
        <div><Link href="/#practice">Artist practice ↗</Link><Link href="/#exhibitions">Exhibitions ↗</Link><Link href="/#contact">Get in touch ↗</Link></div>
      </footer>
    </main>
  );
}
