"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

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
    image: "/art/art-01.webp",
    alt: "Nine framed monochrome generative images installed in a gallery.",
    featured: true,
    description:
      "A photographic and computational archive where remembered surfaces become dense fields of trace, noise and reconstruction.",
  },
  {
    title: "Digital Echoes",
    year: "2024",
    medium: "Photography",
    image: "/art/art-02.webp",
    alt: "Three framed blue photographic works installed vertically on a gallery wall.",
    featured: true,
    description:
      "Fragments of urban experience return as luminous repetitions—images suspended between recognition and disappearance.",
  },
  {
    title: "MemoryGrid",
    year: "2024",
    medium: "Installation",
    image: "/art/art-08.webp",
    alt: "A visitor viewing a projected network of image fragments in an exhibition space.",
    featured: true,
    description:
      "An immersive map of personal image archives, translating memory into an explorable spatial system.",
  },
  {
    title: "WordView",
    year: "2024",
    medium: "Creative Coding",
    image: "/art/art-09.webp",
    alt: "A room-scale projection filled with interlaced coloured lines and floating words.",
    featured: true,
    description:
      "Language becomes architecture: a live field of associations, semantic collisions and shifting attention.",
  },
  {
    title: "TechCore",
    year: "2024",
    medium: "Creative Coding",
    image: "/art/art-10.webp",
    alt: "A dense generative composition of coloured lines and layered words.",
    description:
      "A visual excavation of technical vocabulary, exposing the linguistic systems that shape digital life.",
  },
  {
    title: "The Blue Countdown",
    year: "2023",
    medium: "Moving Image",
    image: "/art/art-07.webp",
    alt: "A blue distorted panoramic image glowing against black.",
    description:
      "A moving-image meditation on anticipation, distance and the unstable texture of digital time.",
  },
  {
    title: "EcoSyntax",
    year: "2023",
    medium: "Creative Coding",
    image: "/art/art-12.webp",
    alt: "Magenta and blue generative lines crossing in a dense abstract field.",
    description:
      "Ecological relationships are translated into an unruly visual grammar of connection, pressure and adaptation.",
  },
  {
    title: "Aware",
    year: "2023",
    medium: "Installation",
    image: "/art/art-11.webp",
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const visible = filter === "All" ? projects : projects.filter((project) => project.medium === filter);
  const selectedIndex = selected ? projects.findIndex((project) => project.title === selected.title) : -1;

  const openProject = (project: Project) => {
    lastTriggerRef.current = document.activeElement as HTMLElement;
    setSelected(project);
  };

  const closeProject = useCallback(() => {
    setSelected(null);
    window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
  }, []);

  const moveProject = useCallback((direction: -1 | 1) => {
    const nextIndex = (selectedIndex + direction + projects.length) % projects.length;
    setSelected(projects[nextIndex]);
  }, [selectedIndex]);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    if (selected) window.requestAnimationFrame(() => dialogRef.current?.focus());
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && selected) closeProject();
      if (event.key === "ArrowLeft" && selected) moveProject(-1);
      if (event.key === "ArrowRight" && selected) moveProject(1);
      if (event.key === "Tab" && selected && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeProject, moveProject, selected]);

  return (
    <>
      <a className="skip-link" href="#content">Skip to selected work</a>
      <div className="scroll-line" aria-hidden="true" />
      <main id="content">
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
          onClick={() => openProject(projects[0])}
          aria-label="Open Scanned Memories project"
          aria-haspopup="dialog"
        >
          <Image
            src={assetPath("/art/art-01.webp")}
            alt={projects[0].alt}
            width={1280}
            height={1280}
            sizes="(max-width: 900px) 100vw, 55vw"
            priority
            unoptimized
          />
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
          <p aria-live="polite">{String(visible.length).padStart(2, "0")} projects</p>
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
              <button
                type="button"
                onClick={() => openProject(project)}
                aria-label={`Open ${project.title}, ${project.medium}, ${project.year}`}
                aria-haspopup="dialog"
              >
                <span className="project-image">
                  <Image
                    src={assetPath(project.image)}
                    alt={project.alt}
                    width={1280}
                    height={1280}
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 42vw"
                    loading={index > 2 ? "lazy" : undefined}
                    unoptimized
                  />
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
        <div
          className="project-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
          ref={dialogRef}
          tabIndex={-1}
        >
          <button className="dialog-backdrop" type="button" aria-label="Close project" onClick={closeProject} />
          <div className="dialog-panel">
            <button className="dialog-close" type="button" onClick={closeProject} aria-label="Close project">
              Close ×
            </button>
            <figure className="dialog-image">
              <Image
                src={assetPath(selected.image)}
                alt={selected.alt}
                width={1280}
                height={1280}
                sizes="(max-width: 900px) 95vw, 65vw"
                unoptimized
              />
              <figcaption>{String(selectedIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</figcaption>
            </figure>
            <div className="dialog-copy">
              <p>{selected.medium} · {selected.year}</p>
              <h2 id="dialog-title">{selected.title}</h2>
              {selected.zh && <p className="dialog-zh" lang="zh-Hant">{selected.zh}</p>}
              <p className="dialog-description" id="dialog-description">{selected.description}</p>
              <p className="dialog-note">
                Selected work from the WCCHUN archive · Hong Kong
              </p>
              <div className="dialog-navigation">
                <button type="button" onClick={() => moveProject(-1)} aria-label="View previous project">← Previous</button>
                <button type="button" onClick={() => moveProject(1)} aria-label="View next project">Next →</button>
              </div>
            </div>
          </div>
        </div>
      )}
      </main>
    </>
  );
}
