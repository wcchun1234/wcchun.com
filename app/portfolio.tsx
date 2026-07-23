"use client";

import { useEffect, useState } from "react";

const assetPath = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

type Project = {
  title: string;
  zh?: string;
  year: string;
  medium: "Photography" | "Installation" | "Creative Coding" | "Moving Image";
  image: string;
  alt: string;
  featured?: boolean;
  description: string;
};

const projects: Project[] = [
  {
    title: "Scanned Memories",
    zh: "掃描記憶",
    year: "2024",
    medium: "Photography",
    image: "/art/art-01.png",
    alt: "Nine framed monochrome generative images installed in a gallery.",
    featured: true,
    description:
      "A photographic and computational archive where remembered surfaces become dense fields of trace, noise and reconstruction.",
  },
  {
    title: "Digital Echoes",
    year: "2024",
    medium: "Photography",
    image: "/art/art-02.png",
    alt: "Three framed blue photographic works installed vertically on a gallery wall.",
    featured: true,
    description:
      "Fragments of urban experience return as luminous repetitions—images suspended between recognition and disappearance.",
  },
  {
    title: "MemoryGrid",
    year: "2024",
    medium: "Installation",
    image: "/art/art-08.jpg",
    alt: "A visitor viewing a projected network of image fragments in an exhibition space.",
    featured: true,
    description:
      "An immersive map of personal image archives, translating memory into an explorable spatial system.",
  },
  {
    title: "WordView",
    year: "2024",
    medium: "Creative Coding",
    image: "/art/art-09.jpg",
    alt: "A room-scale projection filled with interlaced coloured lines and floating words.",
    featured: true,
    description:
      "Language becomes architecture: a live field of associations, semantic collisions and shifting attention.",
  },
  {
    title: "TechCore",
    year: "2024",
    medium: "Creative Coding",
    image: "/art/art-10.png",
    alt: "A dense generative composition of coloured lines and layered words.",
    description:
      "A visual excavation of technical vocabulary, exposing the linguistic systems that shape digital life.",
  },
  {
    title: "The Blue Countdown",
    year: "2023",
    medium: "Moving Image",
    image: "/art/art-07.jpg",
    alt: "A blue distorted panoramic image glowing against black.",
    description:
      "A moving-image meditation on anticipation, distance and the unstable texture of digital time.",
  },
  {
    title: "EcoSyntax",
    year: "2023",
    medium: "Creative Coding",
    image: "/art/art-12.png",
    alt: "Magenta and blue generative lines crossing in a dense abstract field.",
    description:
      "Ecological relationships are translated into an unruly visual grammar of connection, pressure and adaptation.",
  },
  {
    title: "Aware",
    year: "2023",
    medium: "Installation",
    image: "/art/art-11.png",
    alt: "Small white polar-bear forms on a blue textured sculptural surface.",
    description:
      "An installation that turns environmental data into an intimate encounter with fragility and scale.",
  },
];

const filters = ["All", "Photography", "Installation", "Creative Coding", "Moving Image"] as const;
type Filter = (typeof filters)[number];

export default function Portfolio() {
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const visible = filter === "All" ? projects : projects.filter((project) => project.medium === filter);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="WCCHUN home">
          WC<span>CHUN</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#practice">Practice</a>
          <a href="#exhibitions">Exhibitions</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="header-index">HK — 22.3193° N</div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Artist &amp; creative technologist · Hong Kong</p>
          <h1>
            Memory becomes
            <br />
            <em>material.</em>
          </h1>
          <p className="hero-statement">
            WCCHUN works across computational image-making, photography and installation—tracing how
            technology reshapes memory, language and perception.
          </p>
          <a className="text-link" href="#work">
            Enter selected work <span aria-hidden="true">↘</span>
          </a>
        </div>
        <button
          className="hero-image"
          type="button"
          onClick={() => setSelected(projects[0])}
          aria-label="Open Scanned Memories project"
        >
          <img src={assetPath("/art/art-01.png")} alt={projects[0].alt} />
          <span className="image-code">01 / 08</span>
        </button>
        <div className="hero-side-note" aria-hidden="true">
          <span>BEYONDESIGN</span>
          <span>ART × SYSTEMS × MEMORY</span>
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected archive</p>
            <h2>Work, 2023—2024</h2>
          </div>
          <p>{String(visible.length).padStart(2, "0")} projects</p>
        </div>

        <div className="filter-bar" aria-label="Filter projects">
          {filters.map((item) => (
            <button
              type="button"
              key={item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
              aria-pressed={filter === item}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="project-grid">
          {visible.map((project, index) => (
            <article
              className={`project-card ${project.featured ? "featured" : ""}`}
              key={project.title}
            >
              <button type="button" onClick={() => setSelected(project)}>
                <span className="project-image">
                  <img src={assetPath(project.image)} alt={project.alt} loading={index > 2 ? "lazy" : undefined} />
                  <span className="view-project">View project ↗</span>
                </span>
                <span className="project-meta">
                  <span>
                    <strong>{project.title}</strong>
                    {project.zh && <small lang="zh-Hant">{project.zh}</small>}
                  </span>
                  <span>{project.medium}</span>
                  <span>{project.year}</span>
                </span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="practice" id="practice">
        <p className="section-number">02 — Practice</p>
        <div className="practice-copy">
          <p>
            I treat images as <em>living systems</em>—not fixed records. Photographs are scanned,
            classified, connected and reassembled until new emotional structures appear.
          </p>
          <p>
            The work moves between intimate memory and public technology, asking what remains human
            when experience is translated into data.
          </p>
        </div>
        <dl className="practice-index">
          <div><dt>Methods</dt><dd>Creative coding · Photography · Projection · Installation</dd></div>
          <div><dt>Recurring ideas</dt><dd>Memory · Attention · Language · Ecology</dd></div>
          <div><dt>Based in</dt><dd>Hong Kong</dd></div>
        </dl>
      </section>

      <section className="exhibitions" id="exhibitions">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected appearances</p>
            <h2>Exhibitions</h2>
          </div>
        </div>
        <div className="exhibition-list">
          {[
            ["2026", "Collect Hong Kong Art Fair", "Light Trace: Scanned Memories", "Hong Kong"],
            ["2025", "Collect Hong Kong Art Fair", "Digital Echoes", "Hong Kong"],
            ["2024", "The Unseen Realm", "SCM Cameraless Photography Exhibition", "Hong Kong"],
            ["2024", "CityU SCM Annual Show", "ArtSense", "Hong Kong"],
          ].map(([year, event, work, place]) => (
            <article key={`${year}-${event}`}>
              <span>{year}</span>
              <h3>{event}</h3>
              <p>{work}</p>
              <span>{place}</span>
            </article>
          ))}
        </div>
      </section>

      <footer id="contact">
        <p className="eyebrow">Commissions · exhibitions · collaborations</p>
        <h2>Let&apos;s make the unseen <em>visible.</em></h2>
        <div className="footer-links">
          <a href="https://www.instagram.com/wongchunsunny/" target="_blank" rel="noreferrer">
            Start a conversation ↗
          </a>
          <div>
            <a href="https://www.instagram.com/wongchunsunny/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.behance.net/wongchun" target="_blank" rel="noreferrer">Behance</a>
            <a href="https://www.youtube.com/channel/UCK2wPLfi_gLUpipjDqq3pnw" target="_blank" rel="noreferrer">YouTube</a>
            <a href="https://www.linkedin.com/in/wcchun/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} Wong Chun Sunny / WCCHUN</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>

      {selected && (
        <div className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
          <button className="dialog-backdrop" type="button" aria-label="Close project" onClick={() => setSelected(null)} />
          <div className="dialog-panel">
            <button className="dialog-close" type="button" onClick={() => setSelected(null)} aria-label="Close project">
              Close ×
            </button>
            <div className="dialog-image"><img src={assetPath(selected.image)} alt={selected.alt} /></div>
            <div className="dialog-copy">
              <p>{selected.medium} · {selected.year}</p>
              <h2 id="dialog-title">{selected.title}</h2>
              {selected.zh && <p className="dialog-zh" lang="zh-Hant">{selected.zh}</p>}
              <p className="dialog-description">{selected.description}</p>
              <p className="dialog-note">
                Full project documentation, process images, credits and exhibition history will be
                migrated into the complete archive.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
