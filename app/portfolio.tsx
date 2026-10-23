"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePortfolioMotion } from "./portfolio-motion";
import {
  assetPath,
  projectSlug,
  projects,
  galleryByTitle,
  archiveNarrativeByTitle,
  videoByTitle,
  readyLoopGallery,
  type Project,
} from "./portfolio-data";

const featuredTitles = new Set([
  "Scanned Memories",
  "Digital Echoes",
  "MemoryGrid",
  "WordView",
  "TechCore",
  "The Blue Countdown",
  "Aware",
  "ArtSense",
]);

export default function Portfolio() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [readyLoopOpen, setReadyLoopOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [roboticsOpen, setRoboticsOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [activeTechnology, setActiveTechnology] = useState("readyloop");
  const portfolioRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const dialogPanelRef = useRef<HTMLDivElement>(null);
  const readyLoopDialogRef = useRef<HTMLDivElement>(null);
  const dashboardDialogRef = useRef<HTMLDivElement>(null);
  const roboticsDialogRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const lastLightboxTriggerRef = useRef<HTMLElement | null>(null);
  const visible = projects.filter((project) => featuredTitles.has(project.title));
  const selectedIndex = selected ? projects.findIndex((project) => project.title === selected.title) : -1;
  const selectedGallery = selected
    ? galleryByTitle[selected.title] ?? [selected.image]
    : [];
  const selectedArchiveNarrative = selected
    ? archiveNarrativeByTitle[selected.title] ?? []
    : [];
  const selectedVideo = selected ? videoByTitle[selected.title] : undefined;
  const chapterLabels: Record<string, [string, string]> = {
    top: ["01", "Introduction"],
    recognition: ["02", "Recognition"],
    work: ["03", "Featured Art"],
    practice: ["04", "Practice"],
    exhibitions: ["05", "Exhibitions"],
    technology: ["06", "Technology & Education"],
    tools: ["07", "Selected Tools"],
    about: ["08", "About"],
    contact: ["09", "Contact"],
  };
  const activeChapter = chapterLabels[activeSection] ?? chapterLabels.top;
  const technologyNarrative: Record<string, [string, string, string]> = {
    readyloop: ["01", "ReadyLoop", "AI-supported learning before fabrication"],
    dashboard: ["02", "DT Fabrication Dashboard", "Human-led workshop operations at school scale"],
    robotics: ["03", "Robotics & Physical Computing", "Build, diagnose, test and reflect"],
  };
  const dialogKey = lightboxIndex !== null
    ? `lightbox-${lightboxIndex}`
    : selected
      ? `project-${selected.title}`
      : readyLoopOpen
        ? "readyloop"
        : dashboardOpen
          ? "dashboard"
          : roboticsOpen
            ? "robotics"
            : "";
  usePortfolioMotion({
    scope: portfolioRef,
    filterKey: "featured",
    showArchive: false,
    menuOpen,
    dialogKey,
    onScrolledChange: setIsScrolled,
    onSectionChange: setActiveSection,
    onTechnologyChange: setActiveTechnology,
  });

  const openProject = (project: Project) => {
    lastTriggerRef.current = document.activeElement as HTMLElement;
    setMenuOpen(false);
    setLightboxIndex(null);
    setSelected(project);
  };

  const closeProject = useCallback(() => {
    setLightboxIndex(null);
    setSelected(null);
    window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
  }, []);

  const openReadyLoop = () => {
    lastTriggerRef.current = document.activeElement as HTMLElement;
    setMenuOpen(false);
    setReadyLoopOpen(true);
  };

  const closeReadyLoop = useCallback(() => {
    setReadyLoopOpen(false);
    window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
  }, []);

  const openDashboard = () => {
    lastTriggerRef.current = document.activeElement as HTMLElement;
    setMenuOpen(false);
    setDashboardOpen(true);
  };

  const closeDashboard = useCallback(() => {
    setDashboardOpen(false);
    window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
  }, []);

  const openRobotics = () => {
    lastTriggerRef.current = document.activeElement as HTMLElement;
    setMenuOpen(false);
    setRoboticsOpen(true);
  };

  const closeRobotics = useCallback(() => {
    setRoboticsOpen(false);
    window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
  }, []);

  const moveProject = useCallback((direction: -1 | 1) => {
    const nextIndex = (selectedIndex + direction + projects.length) % projects.length;
    setLightboxIndex(null);
    setSelected(projects[nextIndex]);
    window.requestAnimationFrame(() => dialogPanelRef.current?.scrollTo({ top: 0 }));
  }, [selectedIndex]);

  const moveLightbox = useCallback((direction: -1 | 1) => {
    setLightboxIndex((current) => {
      if (current === null || selectedGallery.length === 0) return current;
      return (current + direction + selectedGallery.length) % selectedGallery.length;
    });
  }, [selectedGallery.length]);

  const openLightbox = (index: number) => {
    lastLightboxTriggerRef.current = document.activeElement as HTMLElement;
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    window.requestAnimationFrame(() => lastLightboxTriggerRef.current?.focus());
  }, []);

  const jumpToProjectSection = (sectionId: string) => {
    const section = dialogPanelRef.current?.querySelector<HTMLElement>(`#${sectionId}`);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  useEffect(() => {
    document.body.style.overflow = selected || readyLoopOpen || dashboardOpen || roboticsOpen || menuOpen ? "hidden" : "";
    if (menuOpen) {
      const focusNavigation = window.setTimeout(() => {
        document.querySelector<HTMLElement>("#main-navigation a")?.focus({ preventScroll: true });
      }, 80);
      return () => {
        window.clearTimeout(focusNavigation);
        document.body.style.overflow = "";
      };
    }
    if (selected) {
      window.requestAnimationFrame(() => {
        dialogPanelRef.current?.scrollTo({ top: 0 });
        dialogRef.current?.focus({ preventScroll: true });
      });
    }
    if (readyLoopOpen) {
      window.requestAnimationFrame(() => readyLoopDialogRef.current?.focus({ preventScroll: true }));
    }
    if (dashboardOpen) {
      window.requestAnimationFrame(() => dashboardDialogRef.current?.focus({ preventScroll: true }));
    }
    if (roboticsOpen) {
      window.requestAnimationFrame(() => roboticsDialogRef.current?.focus({ preventScroll: true }));
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [dashboardOpen, menuOpen, readyLoopOpen, roboticsOpen, selected]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      window.requestAnimationFrame(() => lightboxRef.current?.focus());
    }
  }, [lightboxIndex]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowLeft") moveLightbox(-1);
        if (event.key === "ArrowRight") moveLightbox(1);
        if (event.key === "Tab" && lightboxRef.current) {
          const focusable = lightboxRef.current.querySelectorAll<HTMLElement>(
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
        if (["Escape", "ArrowLeft", "ArrowRight"].includes(event.key)) event.preventDefault();
        return;
      }
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        window.requestAnimationFrame(() => {
          document.querySelector<HTMLElement>(".mobile-menu-toggle")?.focus({ preventScroll: true });
        });
      }
      if (event.key === "Tab" && menuOpen) {
        const navigation = document.getElementById("main-navigation");
        const toggle = document.querySelector<HTMLElement>(".mobile-menu-toggle");
        const links = navigation?.querySelectorAll<HTMLElement>('a[href]') ?? [];
        const focusable = [toggle, ...Array.from(links)].filter((item): item is HTMLElement => Boolean(item));
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
      if (event.key === "Escape" && roboticsOpen) closeRobotics();
      if (event.key === "Escape" && dashboardOpen) closeDashboard();
      if (event.key === "Escape" && readyLoopOpen) closeReadyLoop();
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
  }, [closeDashboard, closeLightbox, closeProject, closeReadyLoop, closeRobotics, dashboardOpen, lightboxIndex, menuOpen, moveLightbox, moveProject, readyLoopOpen, roboticsOpen, selected]);

  return (
    <>
      <a className="skip-link" href="#work">Skip to selected work</a>
      <div className="scroll-line" aria-hidden="true" />
      <main id="content" ref={portfolioRef}>
      <aside className="chapter-indicator" aria-hidden="true">
        <span>{activeChapter[0]} / 09</span>
        <strong>{activeChapter[1]}</strong>
      </aside>
      <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
        <a className="wordmark" href="#top" aria-label="WCCHUN home">
          <Image
            src={assetPath("/wc-monogram.png")}
            alt=""
            width={1024}
            height={1024}
            unoptimized
          />
          <span>WCCHUN</span>
        </a>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          Menu <span aria-hidden="true">{menuOpen ? "×" : "+"}</span>
        </button>
        <nav
          id="main-navigation"
          className={menuOpen ? "is-open" : ""}
          aria-label="Main navigation"
        >
          {[
            ["work", "Art"],
            ["practice", "Practice"],
            ["exhibitions", "Exhibitions"],
            ["technology", "Technology"],
            ["about", "About"],
            ["contact", "Contact"],
          ].map(([id, label]) => (
            <a
              href={`#${id}`}
              key={id}
              className={activeSection === id ? "is-active" : ""}
              aria-current={activeSection === id ? "location" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="header-index">HK — 22.3193° N</div>
      </header>

      <section className="figma-hero" id="top">
        <p className="hero-byline">Wong Chun (Sunny) / Hong Kong artist &amp; creative technologist</p>
        <h1 className="hero-title" aria-label="Memory becomes material">
          <span className="hero-title-line"><span>Memory</span></span>
          <span className="hero-title-line"><span>Becomes</span></span>
          <span className="hero-title-line"><span>Material</span></span>
        </h1>
        <a
          className="hero-thumbnail intro-motion delay-4"
          href="#technology"
          aria-label="View technology systems"
        >
          <Image
            src={assetPath("/technology/dashboard/admin.webp")}
            alt="DT Fabrication Dashboard interface"
            width={1338}
            height={912}
            loading="lazy"
            unoptimized
          />
        </a>
        <Link
          className="hero-artwork intro-motion delay-5"
          href="/work/digital-echoes"
          aria-label="View Digital Echoes project"
        >
          <Image
            src={assetPath(projects[1].image)}
            alt={projects[1].alt}
            width={1280}
            height={1280}
            sizes="(max-width: 700px) 100vw, 64vw"
            priority
            unoptimized
          />
        </Link>
        <div className="hero-intro intro-motion delay-6">
          <p className="eyebrow">Images × systems × learning</p>
          <p>
            Wong Chun (Sunny) is a Hong Kong artist and creative technologist working across
            computational images, interactive systems and learning technology.
          </p>
          <div className="hero-actions">
            <a className="archive-cta" href="#work">Explore selected art <span>↘</span></a>
            <a className="archive-cta hero-tech-cta" href="#technology">View technology systems <span>↘</span></a>
          </div>
        </div>
        <p className="hero-scroll">Scroll / 01—09</p>
      </section>

      <section className="recognition recognition-top" id="recognition" aria-label="Selected recognition and impact">
        {[
          ["Award", "AIREA 2026", "Outstanding Innovation and Creativity Award", "/technology/readyloop"],
          ["Impact", "1,500+", "Fabrication submissions supported", "/technology/dt-fabrication-dashboard"],
          ["Exhibitions", "2025—2026", "Collect Hong Kong Art Fair", "#exhibitions"],
        ].map(([label, value, detail, href]) => (
          <a href={href} key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <p>{detail}</p>
          </a>
        ))}
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A focused entry point</p>
            <h2>Featured art</h2>
          </div>
          <p>{String(visible.length).padStart(2, "0")} works selected</p>
        </div>

        <div className="project-grid">
          {visible.map((project, index) => {
            const permanentUrl = `/work/${projectSlug(project.title)}`;
            const cardContent = (
              <>
                <span className="project-image">
                  <Image
                    src={assetPath(project.image)}
                    alt={project.alt}
                    width={1280}
                    height={1280}
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 42vw"
                    loading="lazy"
                    unoptimized
                  />
                  <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
                  {videoByTitle[project.title] && (
                    <span className="project-video-badge">Film ▶</span>
                  )}
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
              </>
            );

            return (
              <article
                className={`project-card reveal ${project.featured ? "featured" : ""}`}
                key={project.title}
              >
                {permanentUrl ? (
                  <Link
                    className="project-primary-action"
                    href={permanentUrl}
                    aria-label={`View ${project.title}, ${project.medium}, ${project.year}`}
                  >
                    {cardContent}
                  </Link>
                ) : (
                  <button
                    className="project-primary-action"
                    type="button"
                    onClick={() => openProject(project)}
                    aria-label={`View ${project.title}, ${project.medium}, ${project.year}`}
                    aria-haspopup="dialog"
                  >
                    {cardContent}
                  </button>
                )}
                {permanentUrl && (
                  <button className="project-quick-view" type="button" onClick={() => openProject(project)} aria-haspopup="dialog">
                    Quick view
                  </button>
                )}
              </article>
            );
          })}
        </div>
        <div className="archive-switch">
          <p>Explore the full chronology of 29 artworks, studies and experiments, with filters by medium.</p>
          <Link href="/work">Explore all 29 works →</Link>
        </div>
      </section>

      <section className="practice" id="practice">
        <p className="section-number">02 — Practice</p>
        <div className="practice-copy">
          <h2>
            I treat images as <em>living systems</em>—not fixed records. Photographs are scanned,
            classified, connected and reassembled until new emotional structures appear.
          </h2>
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
        <div className="practice-pillars" aria-label="Four parts of the practice">
          {[
            ["Art", "Transforming memory, language and experience into visual form."],
            ["Technology", "Designing useful and human-centred systems."],
            ["Teaching", "Helping learners understand, test and improve ideas."],
            ["Making", "Turning code and concepts into physical outcomes."],
          ].map(([title, text], index) => (
            <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
        <aside className="curator-tools" aria-label="Professional information">
          <p>For curators, galleries and collaborators</p>
          <div>
            <a href="mailto:wcchun1234@gmail.com">
              <span>Email</span>
              <strong>wcchun1234@gmail.com ↗</strong>
            </a>
            <a href={assetPath("/Wong-Chun-Sunny-CV.pdf")} download>
              <span>Artist CV</span>
              <strong>Download PDF ↓</strong>
            </a>
          </div>
        </aside>
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
            { year: "2026", event: "Collect Hong Kong Art Fair", work: "Light Trace: Scanned Memories", place: "Hong Kong", href: "/work/scanned-memories" },
            { year: "2025", event: "Collect Hong Kong Art Fair", work: "Digital Echoes", place: "Hong Kong", href: "/work/digital-echoes" },
            { year: "2024", event: "The Unseen Realm", work: "Digital Echoes · CityU SCM Cameraless Photography Exhibition", place: "Hong Kong", href: "/work/digital-echoes" },
            { year: "2024", event: "CityU SCM Annual Show", work: "Scanned Memories", place: "Hong Kong", href: "/work/scanned-memories" },
          ].map(({ year, event, work, place, href }) => (
            <article key={`${year}-${event}`}>
              <span>{year}</span>
              <h3>{event}</h3>
              <p>{work}</p>
              <span>{place}</span>
              <Link href={href} aria-label={`Explore ${work} from ${event}`}>Explore exhibited work ↗</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="technology" id="technology">
        <div className={`technology-case-layout technology-active-${activeTechnology}`}>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Systems with real-world consequence</p>
            <h2>Technology &amp;<br />education</h2>
          </div>
          <p>03 applied case studies</p>
          <div className="technology-active-label" aria-hidden="true">
            <span>{technologyNarrative[activeTechnology][0]} / 03</span>
            <strong>{technologyNarrative[activeTechnology][1]}</strong>
            <p>{technologyNarrative[activeTechnology][2]}</p>
          </div>
        </div>
        <div className="technology-intro">
          <p>
            Alongside the art practice, I design learning systems, fabrication workflows and
            robotics programmes that connect technical infrastructure with human guidance.
          </p>
        </div>
        <div className="technology-grid">
          {[
            {
              index: "01",
              title: "ReadyLoop",
              subtitle: "AI-supported IB Design Technology learning before fabrication",
              statement:
                "A safe pre-fabrication learning and workflow platform combining student guidance, revision support, bounded file analysis and role-specific views for technicians, teachers and administrators.",
              meta: ["Project lead", "Learning technology", "Responsible AI"],
              impact: "Outstanding Innovation and Creativity Award · AIREA 2026",
              caseStudy: "readyloop",
            },
            {
              index: "02",
              title: "DT Fabrication Dashboard",
              subtitle: "A school-wide production workflow for Years 6–12",
              statement:
                "A live operational system for student submissions, technician review, teacher visibility and fabrication coordination across 3D printing, laser cutting and workshop production.",
              meta: ["System design", "Workflow automation", "Digital fabrication"],
              impact: "1,500+ student fabrication requests supported",
              caseStudy: "dashboard",
            },
            {
              index: "03",
              title: "Robotics & Physical Computing",
              subtitle: "Team development, prototyping and technical learning",
              statement:
                "Hands-on work spanning VEX Robotics, mechanical design, programming, electronics, testing and competition preparation—supported by calm coaching and iterative engineering practice.",
              meta: ["VEX Robotics", "Arduino", "Micro:bit · Raspberry Pi"],
              impact: "Robotics, programming and physical-computing education",
              caseStudy: "robotics",
            },
          ].map((project) => (
            <article
              className={`technology-card ${project.caseStudy ? "has-case-study" : ""} ${activeTechnology === project.caseStudy ? "is-active" : ""}`}
              data-technology-case={project.caseStudy}
              key={project.title}
            >
              <div className="technology-card-top">
                <span>{project.index}</span>
                <span>{project.caseStudy ? "Full case study" : "Applied practice"}</span>
              </div>
              {project.caseStudy && (
                <Link
                  className="technology-preview"
                  href={`/technology/${project.caseStudy === "dashboard" ? "dt-fabrication-dashboard" : project.caseStudy}`}
                  aria-label={`Open the permanent ${project.title} case study`}
                >
                  <Image
                    src={assetPath(
                      project.caseStudy === "readyloop"
                        ? "/technology/readyloop/15.webp"
                        : project.caseStudy === "dashboard"
                          ? "/technology/dashboard/admin.webp"
                          : "/technology/robotics/learning-wall.webp",
                    )}
                    alt={project.caseStudy === "readyloop"
                      ? "ReadyLoop case-study overview showing its learning platform and fabrication workflow."
                      : project.caseStudy === "dashboard"
                        ? "Design Fabrication Dashboard admin view showing 1,543 recorded workshop submissions."
                        : "A classroom robotics learning wall with student-designed coding and troubleshooting posters."}
                    width={project.caseStudy === "readyloop" ? 1920 : project.caseStudy === "dashboard" ? 1338 : 1600}
                    height={project.caseStudy === "readyloop" ? 1080 : project.caseStudy === "dashboard" ? 912 : 1200}
                    sizes="(max-width: 900px) 90vw, 31vw"
                    unoptimized
                  />
                  <span>View full project →</span>
                </Link>
              )}
              <h3>{project.title}</h3>
              <p className="technology-subtitle">{project.subtitle}</p>
              <p className="technology-statement">{project.statement}</p>
              <ul aria-label={`${project.title} capabilities`}>
                {project.meta.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p className="technology-impact">{project.impact}</p>
              {project.caseStudy && (
                <Link
                  className="technology-case-link"
                  href={`/technology/${project.caseStudy === "dashboard" ? "dt-fabrication-dashboard" : project.caseStudy}`}
                >
                  View full project →
                </Link>
              )}
              {project.caseStudy && (
                <button
                  className="technology-quick-overview"
                  type="button"
                  onClick={project.caseStudy === "readyloop" ? openReadyLoop : project.caseStudy === "dashboard" ? openDashboard : openRobotics}
                  aria-haspopup="dialog"
                >
                  Quick overview
                </button>
              )}
            </article>
          ))}
        </div>
        </div>
        <div className="tools-heading" id="tools">
          <div>
            <p className="eyebrow">Open-source practice</p>
            <h3>Selected tools &amp;<br />coding experiments</h3>
          </div>
          <p>
            Smaller open-source tools and prototypes developed through workshop practice,
            creative coding and educational problem-solving.
          </p>
        </div>
        <div className="tools-grid">
          {[
            {
              title: "CutCase",
              purpose:
                "Browser-based laser-cut finger-joint box designer with editable panels, real-time SVG output and a rotatable Three.js assembly preview.",
              stack: ["JavaScript", "Three.js", "SVG", "GitHub Pages"],
              status: "Open-source tool",
              repository: "https://github.com/wcchun1234/CutCase",
              demo: "https://wcchun1234.github.io/CutCase/",
            },
            {
              title: "CardBoxGen",
              purpose:
                "Python and Pyodide generator for laser-cut trays, boxes, dispensers, divider racks and calibration files, with deterministic geometry and blocking validation.",
              stack: ["Python", "Pyodide", "SVG", "CAD/CAM"],
              status: "Parametric fabrication system",
              repository: "https://github.com/wcchun1234/CardBoxGen",
              demo: "https://wcchun1234.github.io/CardBoxGen/",
            },
            {
              title: "D&T QR Inventory System",
              purpose:
                "Google Apps Script and Sheets workflow for scanning, locating, updating, labelling and auditing workshop stock.",
              stack: ["Apps Script", "Google Sheets", "QR", "Inventory"],
              status: "Workshop operations system",
              repository: "https://github.com/wcchun1234/dt-qr-inventory-system",
            },
            {
              title: "MOVE Motor Tracker",
              purpose:
                "Student-friendly micro:bit extension for Kitronik :MOVE Motor control and estimated wheel-rotation tracking rather than encoder-precise measurement.",
              stack: ["TypeScript", "MakeCode", "micro:bit", "Robotics"],
              status: "Educational extension",
              repository: "https://github.com/wcchun1234/MOVE-Motor-Tracker",
            },
            {
              title: "PDFPeak",
              purpose:
                "Experimental local Flask prototype that extracts PDF text, identifies topics with TF-IDF and NMF, and visualises the results.",
              stack: ["Python", "Flask", "scikit-learn", "NLP"],
              status: "Local prototype",
              repository: "https://github.com/wcchun1234/PDFPeak",
            },
          ].map((project, index) => (
            <article className={`tool-card ${index < 2 ? "featured-tool" : "compact-tool"}`} key={project.title}>
              <p className="tool-status">{project.status}</p>
              <h4>{project.title}</h4>
              <p className="tool-purpose">{project.purpose}</p>
              <ul aria-label={`${project.title} technology`}>
                {project.stack.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <div className="tool-links">
                <a href={project.repository} target="_blank" rel="noreferrer">
                  View project ↗
                </a>
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer">
                    Live demo ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
        <a
          className="tools-github-link"
          href="https://github.com/wcchun1234?tab=repositories"
          target="_blank"
          rel="noreferrer"
        >
          Explore all public repositories on GitHub ↗
        </a>
      </section>

      <section className="about" id="about">
        <div className="about-heading">
          <p className="eyebrow">About / Wong Chun (Sunny)</p>
          <h2>Artist, creative technologist<br />and learning-system designer.</h2>
        </div>
        <div className="about-body">
          <p>
            Wong Chun (Sunny) is a Hong Kong artist and creative technologist working across
            computational images, interactive installation and learning technology. His practice
            explores how memory, language and human experience are transformed through digital systems.
          </p>
          <p>
            His applied practice includes ReadyLoop, fabrication workflow systems, robotics and
            responsible AI in education. He holds a BAS in New Media from City University of Hong Kong.
          </p>
          <dl>
            <div><dt>Education</dt><dd>CityU BAS New Media · HKU MSc(TDLL), 2026—2028</dd></div>
            <div><dt>Capabilities</dt><dd>Creative coding · AI · Robotics · CAD/CAM · Digital fabrication</dd></div>
            <div><dt>Languages</dt><dd>Cantonese · English · Mandarin</dd></div>
          </dl>
        </div>
        <div className="about-practice-strip" aria-label="In-practice project evidence">
          {[
            ["/art/details/scanned-installation.webp", "Installing and presenting computational artwork"],
            ["/technology/dashboard/admin.webp", "Developing fabrication workflow systems"],
            ["/technology/robotics/learning-wall.webp", "Designing robotics learning resources"],
          ].map(([src, alt], index) => (
            <figure key={src}>
              <Image src={assetPath(src)} alt={alt} width={900} height={600} sizes="(max-width: 700px) 100vw, 33vw" loading="lazy" unoptimized />
              <figcaption>0{index + 1} / {alt}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <footer id="contact">
        <p className="eyebrow">Available for exhibitions · creative-technology collaborations · educational projects</p>
        <h2>Let&apos;s make the unseen <em>visible.</em></h2>
        <div className="footer-links">
          <a href="mailto:wcchun1234@gmail.com">
            Discuss an exhibition or collaboration ↗
          </a>
          <div>
            <a href="mailto:wcchun1234@gmail.com">Email</a>
            <a href={assetPath("/Wong-Chun-Sunny-CV.pdf")} download>CV</a>
            <a href="https://www.instagram.com/wongchunsunny/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.behance.net/wongchun" target="_blank" rel="noreferrer">Behance</a>
            <a href="https://www.youtube.com/channel/UCK2wPLfi_gLUpipjDqq3pnw" target="_blank" rel="noreferrer">YouTube</a>
            <a href="https://www.linkedin.com/in/wcchun/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} Wong Chun (Sunny) / WCCHUN</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>

      {roboticsOpen && (
        <div
          className="technology-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="robotics-case-title"
          aria-describedby="robotics-case-summary"
          ref={roboticsDialogRef}
          tabIndex={-1}
          onKeyDown={(event) => {
            if (event.key !== "Tab") return;
            const focusable = roboticsDialogRef.current?.querySelectorAll<HTMLElement>(
              'button, a[href], video[controls], [tabindex]:not([tabindex="-1"])',
            );
            if (!focusable?.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first.focus();
            }
          }}
        >
          <button
            className="technology-dialog-backdrop"
            type="button"
            tabIndex={-1}
            aria-label="Close Robotics and Physical Computing case study"
            onClick={closeRobotics}
          />
          <article className="technology-dialog-panel robotics-case">
            <div className="technology-dialog-bar">
              <span>Case study 03 / Creative Technology</span>
              <button type="button" onClick={closeRobotics}>Close ×</button>
            </div>

            <header className="robotics-case-hero">
              <div>
                <p className="eyebrow">Learning environments for making and debugging</p>
                <h2 id="robotics-case-title">Robotics &amp;<br /><span>Physical Computing</span></h2>
                <p id="robotics-case-summary">
                  A hands-on teaching practice connecting robotics, electronics, coding and
                  student-facing visual communication—designed to help learners test ideas,
                  diagnose problems and keep moving independently.
                </p>
              </div>
              <figure>
                <Image
                  src={assetPath("/technology/robotics/learning-wall.webp")}
                  alt="Robotics classroom with a wall of student learning posters about micro:bit, motors, line following and block-based coding."
                  width={1600}
                  height={1200}
                  sizes="(max-width: 900px) 100vw, 58vw"
                  unoptimized
                />
                <figcaption>Student learning wall · robotics classroom</figcaption>
              </figure>
            </header>

            <dl className="readyloop-metadata">
              <div><dt>Role</dt><dd>Programme coordination · coaching · technical support</dd></div>
              <div><dt>Learning design</dt><dd>Poster systems · troubleshooting prompts · demonstrations</dd></div>
              <div><dt>Platforms</dt><dd>VEX · micro:bit · Makeblock · ESP32 · Arduino</dd></div>
              <div><dt>Methods</dt><dd>Prototyping · coding · electronics · iterative testing</dd></div>
            </dl>

            <section className="readyloop-intro robotics-intro">
              <p className="technology-section-index">01 / Learning approach</p>
              <div>
                <h3>Teach students how to get unstuck.</h3>
                <p>
                  Robotics learning is strongest when technical support builds independence rather
                  than simply providing the answer. The environment combines visible reference
                  material, short demonstrations and structured debugging routines so students can
                  identify a problem, isolate one variable, test a hypothesis and explain what changed.
                </p>
              </div>
            </section>

            <section className="robotics-principles">
              {[
                ["Observe", "Describe what the robot is doing before changing code or hardware."],
                ["Isolate", "Separate power, connection, sensor, motor and program variables."],
                ["Test", "Change one part at a time and compare the result with the intended behaviour."],
                ["Reflect", "Record what worked so the learning transfers to the next prototype."],
              ].map(([title, text], index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </section>

            <section className="robotics-poster-story">
              <div className="technology-section-heading">
                <p className="technology-section-index">02 / Visual learning design</p>
                <h3>Technical knowledge<br />made visible.</h3>
                <p>
                  Large-format posters turn abstract coding and electronics concepts into
                  references students can use while they are building—not only after they ask for help.
                </p>
              </div>
              <div className="robotics-poster-grid">
                <figure>
                  <Image
                    src={assetPath("/technology/robotics/posters.webp")}
                    alt="Close view of four coordinated robotics posters covering a micro:bit robot, remote control, line following and block-based coding."
                    width={1600}
                    height={1200}
                    sizes="(max-width: 900px) 94vw, 56vw"
                    unoptimized
                  />
                  <figcaption>Coordinated wall system: hardware, control logic and coding concepts</figcaption>
                </figure>
                <figure className="poster-document">
                  <a
                    href={assetPath("/technology/robotics/robotics-get-unstuck-wall.pdf")}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open the full Robotics Get Unstuck Wall poster PDF"
                  >
                    <Image
                      src={assetPath("/technology/robotics/get-unstuck-wall.webp")}
                      alt="Tall Robotics Get Unstuck Wall poster guiding students through connections, power, code, sensors and debugging."
                      width={1200}
                      height={3000}
                      sizes="(max-width: 900px) 94vw, 30vw"
                      unoptimized
                    />
                    <span>Open full poster PDF ↗</span>
                  </a>
                  <figcaption>“Try 3 before asking me” troubleshooting framework</figcaption>
                </figure>
              </div>
            </section>

            <section className="robotics-video-section">
              <div className="technology-section-heading">
                <p className="technology-section-index">03 / Physical computing</p>
                <h3>Code becomes<br />physical behaviour.</h3>
                <p>
                  Short demonstrations connect browser interfaces to electronic outputs,
                  making input, state and control immediately visible.
                </p>
              </div>
              <div className="robotics-videos">
                <figure>
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    poster={assetPath("/technology/robotics/esp32-led-poster.webp")}
                  >
                    <source src={assetPath("/technology/robotics/esp32-led-demo.mp4")} type="video/mp4" />
                    Your browser does not support embedded video.
                  </video>
                  <figcaption><span>Demo 01</span>ESP32 web control driving two LED outputs</figcaption>
                </figure>
                <figure>
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    poster={assetPath("/technology/robotics/esp32-servo-poster.webp")}
                  >
                    <source src={assetPath("/technology/robotics/esp32-servo-demo.mp4")} type="video/mp4" />
                    Your browser does not support embedded video.
                  </video>
                  <figcaption><span>Demo 02</span>Browser-based ESP32 servo control</figcaption>
                </figure>
              </div>
            </section>

            <section className="robotics-gallery-section">
              <div className="technology-section-heading">
                <p className="technology-section-index">04 / Material practice</p>
                <h3>Boards, sensors,<br />motors and signals.</h3>
              </div>
              <div className="robotics-gallery">
                {[
                  {
                    image: "/technology/robotics/learning-wall.webp",
                    width: 1600,
                    height: 1200,
                    alt: "Wide classroom view showing the installed robotics learning poster system.",
                    caption: "Learning environment",
                  },
                  {
                    image: "/technology/robotics/physical-computing.webp",
                    width: 1200,
                    height: 900,
                    alt: "Makeblock controller, LED matrix and micro:bit components arranged for physical-computing experiments.",
                    caption: "Physical-computing hardware",
                  },
                ].map((item, index) => (
                  <a href={assetPath(item.image)} target="_blank" rel="noreferrer" key={item.image}>
                    <Image
                      src={assetPath(item.image)}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      sizes="(max-width: 900px) 94vw, 46vw"
                      loading="lazy"
                      unoptimized
                    />
                    <span><b>0{index + 1}</b>{item.caption}<i>Expand ↗</i></span>
                  </a>
                ))}
              </div>
            </section>

            <footer className="readyloop-footer robotics-footer">
              <div>
                <p className="technology-section-index">05 / Educational impact</p>
                <h3>Confidence through<br />structured iteration.</h3>
              </div>
              <p>
                The posters, demonstrations and coaching routines form one learning system:
                they make technical concepts available at the moment of need, reduce repeated
                blockers and help students develop the language and habits of independent debugging.
              </p>
              <a href={assetPath("/technology/robotics/robotics-get-unstuck-wall.pdf")} download>
                Download learning poster ↓
              </a>
            </footer>
          </article>
        </div>
      )}

      {dashboardOpen && (
        <div
          className="technology-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dashboard-case-title"
          aria-describedby="dashboard-case-summary"
          ref={dashboardDialogRef}
          tabIndex={-1}
          onKeyDown={(event) => {
            if (event.key !== "Tab") return;
            const focusable = dashboardDialogRef.current?.querySelectorAll<HTMLElement>(
              'button, a[href], [tabindex]:not([tabindex="-1"])',
            );
            if (!focusable?.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first.focus();
            }
          }}
        >
          <button
            className="technology-dialog-backdrop"
            type="button"
            tabIndex={-1}
            aria-label="Close DT Fabrication Dashboard case study"
            onClick={closeDashboard}
          />
          <article className="technology-dialog-panel dashboard-case">
            <div className="technology-dialog-bar">
              <span>Case study 02 / Creative Technology</span>
              <button type="button" onClick={closeDashboard}>Close ×</button>
            </div>

            <header className="dashboard-case-hero">
              <div>
                <p className="eyebrow">Live school production infrastructure</p>
                <h2 id="dashboard-case-title">DT Fabrication<br /><span>Dashboard</span></h2>
                <p id="dashboard-case-summary">
                  A working submission and operations system coordinating student files,
                  technician review, machine queues, production status and audit history
                  across laser cutting and 3D printing.
                </p>
              </div>
              <figure>
                <Image
                  src={assetPath("/technology/dashboard/operations.webp")}
                  alt="Design Fabrication Dashboard showing 1,543 recorded jobs, active workload and queue health."
                  width={1512}
                  height={896}
                  sizes="(max-width: 900px) 100vw, 58vw"
                  unoptimized
                />
                <figcaption>Live operations view · July 2026</figcaption>
              </figure>
            </header>

            <dl className="readyloop-metadata">
              <div><dt>Role</dt><dd>System design, development and workshop operations</dd></div>
              <div><dt>Users</dt><dd>Students · Teachers · Technicians · Administrators</dd></div>
              <div><dt>Production</dt><dd>Laser cutting · 3D printing · Special requests</dd></div>
              <div><dt>Platform</dt><dd>Google Apps Script · Google Workspace</dd></div>
            </dl>

            <section className="readyloop-intro">
              <p className="technology-section-index">01 / Operational challenge</p>
              <div>
                <h3>One workshop needed one dependable source of truth.</h3>
                <p>
                  The dashboard replaces a fragmented request process with a traceable workflow.
                  Students prepare and submit one working file, technicians review readiness,
                  teachers gain visibility, and every request receives a status trail before
                  production. Admin views group queue pressure, machine mix and repeat-submission
                  signals for day-to-day workshop decisions.
                </p>
              </div>
            </section>

            <div className="readyloop-evidence dashboard-evidence" aria-label="DT Fabrication Dashboard operational evidence">
              <article><span>Total requests</span><strong>1,543</strong><p>recorded fabrication submissions in the supplied live operations view</p></article>
              <article><span>Laser workload</span><strong>1,185</strong><p>laser-cutting jobs represented in the underlying production records</p></article>
              <article><span>3D print workload</span><strong>358</strong><p>3D-print requests represented in the underlying production records</p></article>
            </div>

            <section className="dashboard-workflow">
              <div className="technology-section-heading">
                <p className="technology-section-index">02 / Workflow</p>
                <h3>Prepare. Submit.<br />Review. Track.</h3>
              </div>
              <ol>
                {[
                  ["Prepare", "Check file type, dimensions, scale and preview before upload."],
                  ["Submit", "Upload one working fabrication file for each request."],
                  ["Review", "Technicians record readiness, issue codes and required fixes."],
                  ["Track", "Students use a case number or school email to follow progress."],
                ].map(([title, text], index) => (
                  <li key={title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h4>{title}</h4>
                    <p>{text}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="readyloop-gallery-section dashboard-gallery-section">
              <div className="technology-section-heading">
                <p className="technology-section-index">03 / Interface</p>
                <h3>Student clarity.<br />Operational control.</h3>
                <p>Open each uncropped interface view to inspect it at full size.</p>
              </div>
              <div className="dashboard-gallery">
                {[
                  {
                    image: "/technology/dashboard/submit.webp",
                    alt: "Student submission screen explaining file requirements, review and tracking.",
                    caption: "Student submission and guidance",
                  },
                  {
                    image: "/technology/dashboard/admin.webp",
                    alt: "Administrator dashboard with request totals, production breakdown and queue-health information.",
                    caption: "Admin submission dashboard",
                  },
                  {
                    image: "/technology/dashboard/operations.webp",
                    alt: "Wide Design Fabrication Dashboard operations view showing active jobs and workshop queue metrics.",
                    caption: "Live workshop operations",
                  },
                ].map((item, index) => (
                  <a href={assetPath(item.image)} target="_blank" rel="noreferrer" key={item.image}>
                    <Image
                      src={assetPath(item.image)}
                      alt={item.alt}
                      width={index === 2 ? 1512 : index === 1 ? 1338 : 1367}
                      height={index === 2 ? 896 : index === 1 ? 912 : 921}
                      sizes="(max-width: 900px) 94vw, 46vw"
                      loading="lazy"
                      unoptimized
                    />
                    <span><b>0{index + 1}</b>{item.caption}<i>Expand ↗</i></span>
                  </a>
                ))}
              </div>
            </section>

            <footer className="readyloop-footer dashboard-footer">
              <div>
                <p className="technology-section-index">04 / Live system</p>
                <h3>A real workflow,<br />used in practice.</h3>
              </div>
              <p>
                This is the operational system behind the 1,500+ fabrication-request figure.
                Access is managed through Victoria Shanghai Academy&apos;s Google Workspace,
                so visitors without an authorised VSA account may be asked to sign in.
              </p>
              <a
                href="https://script.google.com/a/macros/vsa.edu.hk/s/AKfycbwyurVHraoJy8ui23CCQ0bkN6Ade9fmF295XUZZ0IohFY38LjzZMUCmq1bJwJAV_YL8xg/exec"
                target="_blank"
                rel="noreferrer"
              >
                Open live dashboard ↗<br />VSA access required
              </a>
            </footer>
          </article>
        </div>
      )}

      {readyLoopOpen && (
        <div
          className="technology-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="readyloop-title"
          aria-describedby="readyloop-summary"
          ref={readyLoopDialogRef}
          tabIndex={-1}
          onKeyDown={(event) => {
            if (event.key !== "Tab") return;
            const focusable = readyLoopDialogRef.current?.querySelectorAll<HTMLElement>(
              'button, a[href], [tabindex]:not([tabindex="-1"])',
            );
            if (!focusable?.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first.focus();
            }
          }}
        >
          <button
            className="technology-dialog-backdrop"
            type="button"
            tabIndex={-1}
            aria-label="Close ReadyLoop case study"
            onClick={closeReadyLoop}
          />
          <article className="technology-dialog-panel">
            <div className="technology-dialog-bar">
              <span>Case study 01 / Creative Technology</span>
              <button type="button" onClick={closeReadyLoop}>Close ×</button>
            </div>

            <header className="readyloop-hero">
              <div>
                <p className="eyebrow">AI-supported learning before fabrication</p>
                <h2 id="readyloop-title">Ready<span>Loop</span></h2>
                <p id="readyloop-summary">
                  A school-based learning system that turns workshop feedback into a calm cycle:
                  learn, check, submit, revise and reflect—while keeping approval, safety and
                  judgement firmly human-led.
                </p>
              </div>
              <figure>
                <Image
                  src={assetPath("/technology/readyloop/1.webp")}
                  alt={readyLoopGallery[0].alt}
                  width={1920}
                  height={1080}
                  sizes="(max-width: 900px) 100vw, 58vw"
                  unoptimized
                />
                <figcaption>ReadyLoop · AIREA 2026 presentation</figcaption>
              </figure>
            </header>

            <dl className="readyloop-metadata">
              <div><dt>Year</dt><dd>2026</dd></div>
              <div><dt>Role</dt><dd>Concept, UX, system design and implementation</dd></div>
              <div><dt>Context</dt><dd>IB Design Technology · Victoria Shanghai Academy</dd></div>
              <div><dt>Stack</dt><dd>Google Apps Script · Workspace · ChatGPT · Codex</dd></div>
            </dl>

            <section className="readyloop-intro">
              <p className="technology-section-index">01 / Challenge</p>
              <div>
                <h3>Learning was happening after the mistake.</h3>
                <p>
                  Students submitted fabrication requests through a form, while statuses and feedback
                  were managed manually in a spreadsheet. The workflow moved jobs, but it did not
                  consistently help students understand open paths, vector files, dimensions, scale,
                  materials or design intention before machine time began.
                </p>
              </div>
            </section>

            <div className="readyloop-evidence" aria-label="ReadyLoop evidence and recognition">
              <article><span>Release validation</span><strong>497 / 0</strong><p>tests passed / failed in the documented public demo release</p></article>
              <article><span>Recognition</span><strong>AIREA 2026</strong><p>Outstanding Innovation and Creativity Award</p></article>
              <article><span>Special recognition</span><strong>Z.AI</strong><p>Special Award at the 2nd International Competition on AI in Education</p></article>
            </div>

            <section className="readyloop-loop">
              <div className="technology-section-heading">
                <p className="technology-section-index">02 / System</p>
                <h3>One learning loop.<br />Four coordinated roles.</h3>
              </div>
              <ol>
                {[
                  ["Learn", "Short Design Technology concepts at the moment they become useful."],
                  ["Check", "Calm pre-submission checks reveal likely issues before fabrication."],
                  ["Submit", "Guided evidence makes requirements and design intention explicit."],
                  ["Revise", "Returned work becomes a structured opportunity for improvement."],
                  ["Reflect", "Learning transfers from one build into the next."],
                ].map(([title, text], index) => (
                  <li key={title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h4>{title}</h4>
                    <p>{text}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="readyloop-boundaries">
              <div>
                <p className="technology-section-index">03 / Responsible AI</p>
                <h3>AI supports.<br />Humans decide.</h3>
              </div>
              <div className="boundary-columns">
                <article>
                  <span>AI Coach can</span>
                  <ul>
                    <li>Explain Design Technology concepts</li>
                    <li>Suggest one clear check</li>
                    <li>Support revision and reflection</li>
                    <li>Help students ask better questions</li>
                  </ul>
                </article>
                <article>
                  <span>Humans retain</span>
                  <ul>
                    <li>File approval and grading</li>
                    <li>Production and workshop safety</li>
                    <li>Access to private school files</li>
                    <li>Teaching, technical review and final judgement</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="readyloop-gallery-section">
              <div className="technology-section-heading">
                <p className="technology-section-index">04 / Visual record</p>
                <h3>From workshop problem<br />to working system.</h3>
                <p>Open any frame to inspect the full presentation image.</p>
              </div>
              <div className="readyloop-gallery">
                {readyLoopGallery.map((item, index) => (
                  <a
                    href={assetPath(item.image)}
                    target="_blank"
                    rel="noreferrer"
                    key={item.image}
                    className={index === 0 || index === 3 || index === 6 || index === 9 ? "is-wide" : ""}
                    aria-label={`Open full ReadyLoop image ${index + 1}: ${item.caption}`}
                  >
                    <Image
                      src={assetPath(item.image)}
                      alt={item.alt}
                      width={"width" in item ? item.width : 1920}
                      height={"height" in item ? item.height : 1080}
                      sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 30vw"
                      loading="lazy"
                      unoptimized
                    />
                    <span><b>{String(index + 1).padStart(2, "0")}</b>{item.caption}<i>Expand ↗</i></span>
                  </a>
                ))}
              </div>
            </section>

            <footer className="readyloop-footer">
              <div>
                <p className="technology-section-index">05 / Open project</p>
                <h3>Built for schools,<br />open to collaboration.</h3>
              </div>
              <p>
                ReadyLoop was ideated with ChatGPT, generated and refined with Codex, deployed through
                Google Apps Script and published openly on GitHub. The public version is a bounded,
                session-only demonstration—not a live student deployment.
              </p>
              <a href="https://github.com/sunnydesigntech/ReadyLoop" target="_blank" rel="noreferrer">
                Explore ReadyLoop on GitHub ↗
              </a>
            </footer>
          </article>
        </div>
      )}

      {selected && (
        <div
          className="project-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
          aria-hidden={lightboxIndex !== null ? true : undefined}
          inert={lightboxIndex !== null}
          ref={dialogRef}
          tabIndex={-1}
        >
          <button
            className="dialog-backdrop"
            type="button"
            tabIndex={-1}
            aria-label="Close project"
            onClick={closeProject}
          />
          <div
            className="dialog-panel"
            ref={dialogPanelRef}
            onScroll={(event) => {
              const panel = event.currentTarget;
              const scrollable = panel.scrollHeight - panel.clientHeight;
              panel.style.setProperty(
                "--dialog-progress",
                String(scrollable > 0 ? panel.scrollTop / scrollable : 0),
              );
            }}
          >
            <div className="dialog-progress" aria-hidden="true" />
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
              <p className="dialog-kicker">{selected.medium} · {selected.year}</p>
              <h2 id="dialog-title">{selected.title}</h2>
              {selected.zh && <p className="dialog-zh" lang="zh-Hant">{selected.zh}</p>}
              <p className="dialog-description" id="dialog-description">{selected.description}</p>
              <dl className="dialog-details">
                {selected.details.map((detail) => (
                  <div key={detail.label}>
                    <dt>{detail.label}</dt>
                    <dd>{detail.value}</dd>
                  </div>
                ))}
              </dl>
              <nav className="dialog-jump-nav" aria-label="Project detail sections">
                <span>Explore</span>
                <div>
                  {selectedVideo && (
                    <button type="button" onClick={() => jumpToProjectSection("project-film")}>
                      Film
                    </button>
                  )}
                  <button type="button" onClick={() => jumpToProjectSection("project-images")}>
                    Images
                  </button>
                  <button type="button" onClick={() => jumpToProjectSection("project-introduction")}>
                    Introduction
                  </button>
                  <button type="button" onClick={() => jumpToProjectSection("project-process")}>
                    Process
                  </button>
                </div>
              </nav>
              {selectedVideo && (
                <section className="dialog-section project-video-section" id="project-film">
                  <div className="video-heading">
                    <div>
                      <p className="dialog-section-label">{selectedVideo.kind}</p>
                      <h3>{selectedVideo.title}</h3>
                    </div>
                    <span aria-hidden="true">Play / 16:9</span>
                  </div>
                  <div className="video-frame">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?rel=0`}
                      title={`${selected.title} — ${selectedVideo.title}`}
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <div className="video-footer">
                    <p>
                      Original moving-image documentation preserved from WCCHUN&apos;s project archive.
                    </p>
                    <a
                      href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Watch on YouTube ↗
                    </a>
                  </div>
                </section>
              )}
              <section className="dialog-section project-gallery-section" id="project-images">
                <div className="gallery-heading">
                  <p className="dialog-section-label">Artwork preview</p>
                  <span>{String(selectedGallery.length).padStart(2, "0")} views</span>
                </div>
                <div className="project-gallery">
                  {selectedGallery.map((image, index) => (
                    <figure
                      className="gallery-item"
                      key={`${image}-${index}`}
                    >
                      <button
                        className="gallery-image gallery-open"
                        type="button"
                        onClick={() => openLightbox(index)}
                        aria-label={`Enlarge ${selected.title} documentation view ${index + 1}`}
                      >
                        <Image
                          src={assetPath(image)}
                          alt={`${selected.title} — documentation view ${index + 1}`}
                          width={1280}
                          height={960}
                          sizes="(max-width: 900px) 88vw, 38vw"
                          unoptimized
                        />
                        <span className="gallery-expand">Expand ↗</span>
                      </button>
                      <figcaption>
                        Documentation {String(index + 1).padStart(2, "0")}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
              <section className="dialog-section" id="project-introduction">
                <p className="dialog-section-label">Introduction</p>
                <p>{selected.statement}</p>
              </section>
              {selectedArchiveNarrative.length > 0 && (
                <section className="dialog-section">
                  <p className="dialog-section-label">From the original archive</p>
                  <p className="archive-provenance">
                    Preserved from WCCHUN’s original portfolio and surviving first-party project records.
                  </p>
                  <div className="archive-narrative">
                    {selectedArchiveNarrative.map((section) => (
                      <article key={section.title}>
                        <h3>{section.title}</h3>
                        <p>{section.text}</p>
                      </article>
                    ))}
                  </div>
                </section>
              )}
              <section className="dialog-section" id="project-process">
                <p className="dialog-section-label">Process</p>
                <div className="process-list">
                  {selected.process.map((step, index) => (
                    <article key={step.title}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <h3>{step.title}</h3>
                        <p>{step.text}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
              <section className="dialog-section">
                <p className="dialog-section-label">Themes</p>
                <ul className="theme-list" aria-label="Project themes">
                  {selected.themes.map((theme) => <li key={theme}>{theme}</li>)}
                </ul>
              </section>
              {selected.exhibition && (
                <section className="dialog-section exhibition-context">
                  <p className="dialog-section-label">Exhibition context</p>
                  <p>{selected.exhibition}</p>
                </section>
              )}
              {selected.codeUrl && (
                <a className="dialog-source" href={selected.codeUrl} target="_blank" rel="noreferrer">
                  Explore this project&apos;s code on GitHub ↗
                </a>
              )}
              <Link className="dialog-source" href={`/work/${projectSlug(selected.title)}`}>
                Open permanent project page ↗
              </Link>
              <div className="dialog-navigation">
                <button type="button" onClick={() => moveProject(-1)} aria-label="View previous project">← Previous</button>
                <button type="button" onClick={() => moveProject(1)} aria-label="View next project">Next →</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {selected && lightboxIndex !== null && (
        <div
          className="artwork-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.title} image viewer`}
          ref={lightboxRef}
          tabIndex={-1}
        >
          <button
            className="lightbox-backdrop"
            type="button"
            tabIndex={-1}
            aria-label="Close enlarged artwork"
            onClick={closeLightbox}
          />
          <div className="lightbox-stage">
            <div className="lightbox-topbar">
              <span>{selected.title}</span>
              <span>
                {String(lightboxIndex + 1).padStart(2, "0")} / {String(selectedGallery.length).padStart(2, "0")}
              </span>
              <button type="button" onClick={closeLightbox}>Close ×</button>
            </div>
            <figure>
              <Image
                src={assetPath(selectedGallery[lightboxIndex])}
                alt={`${selected.title} — enlarged documentation view ${lightboxIndex + 1}`}
                width={1920}
                height={1440}
                unoptimized
              />
            </figure>
            <div className="lightbox-navigation">
              <button type="button" onClick={() => moveLightbox(-1)}>← Previous</button>
              <span>Use arrow keys to explore</span>
              <button type="button" onClick={() => moveLightbox(1)}>Next →</button>
            </div>
          </div>
        </div>
      )}
      </main>
    </>
  );
}
