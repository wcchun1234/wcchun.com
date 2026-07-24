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
  statement: string;
  details: { label: string; value: string }[];
  process: { title: string; text: string }[];
  themes: string[];
  exhibition?: string;
  sourceUrl?: string;
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
      "A scanner-generated photographic series exploring how images—and the memories attached to them—are preserved, transformed and cared for within constantly updating digital systems.",
    statement:
      "A home document scanner becomes both slit camera and brush of light. Dragged across an iPad mirroring a computer-based digital sculpture process, it compresses screen time, hand movement, software processing and print output into a single image. The resulting bands are not accidental glitches: they are visible traces of attention and technological mediation.",
    details: [
      { label: "Artist", value: "Wong Chun Sunny / 王浚" },
      { label: "Medium", value: "Scanner-generated digital print" },
      { label: "Dimensions", value: "80 × 100 cm" },
      { label: "Year", value: "2024" },
    ],
    process: [
      { title: "Capture", text: "A document scanner records unstable digital images displayed on an iPad rather than a fixed paper original." },
      { title: "Visual score", text: "Image bands are guided by a machine-learning score derived from digitised study notes and ECG traces processed through word embeddings." },
      { title: "Material translation", text: "Screen light, hand movement and processing delay are translated into physical prints, turning temporal digital events into tangible records." },
    ],
    themes: ["Memory", "Identity", "Cameraless photography", "Digital preservation"],
    exhibition: "The Unseen Realm, SCM Cameraless Photography Exhibition 2024 · Light Trace, Collect Hong Kong Art Fair 2026",
    sourceUrl: "https://www.wcchun.com/Light-Trace-Scanned-Memories",
  },
  {
    title: "Digital Echoes",
    year: "2024",
    medium: "Photography",
    image: "/art/art-02.webp",
    alt: "Three framed blue photographic works installed vertically on a gallery wall.",
    featured: true,
    description:
      "A cameraless photographic series in which machine-learning models reinterpret personal photographs and text, allowing new images to carry echoes of the memories from which they were generated.",
    statement:
      "Digital Echoes asks what happens when personal recollection becomes training material. Photographs from a London study trip are processed into unfamiliar but recognisable visual forms, creating a dialogue between lived experience and computational reconstruction. Printed and framed, these digital outputs challenge where photography begins when no camera is used to make the final image.",
    details: [
      { label: "Medium", value: "Machine-learning generated digital prints" },
      { label: "Source material", value: "Personal photographs and text" },
      { label: "Presentation", value: "Framed grid installation" },
      { label: "Year", value: "2024" },
    ],
    process: [
      { title: "Personal dataset", text: "Photographs from significant experiences form the visual memory archive used by the machine-learning process." },
      { title: "Reinterpretation", text: "The model identifies and recombines patterns, producing images that remain connected to their sources without copying them." },
      { title: "Physical archive", text: "The generated images become framed prints arranged in a repeated grid, moving the work from computation into the gallery." },
    ],
    themes: ["Memory and perception", "AI authorship", "Authenticity", "Cameraless image-making"],
    exhibition: "The Unseen Realm, SCM Cameraless Photography Exhibition 2024 · Collect Hong Kong Art Fair 2025",
    sourceUrl: "https://www.wcchun.com/work/photography/digital-echoes",
  },
  {
    title: "MemoryGrid",
    year: "2024",
    medium: "Moving Image",
    image: "/art/art-08.webp",
    alt: "A visitor viewing a projected network of image fragments in an exhibition space.",
    featured: true,
    description:
      "A five-minute moving-image work transforming 600 photographs from a London study trip into an AI-generated visual diary of travel, learning and cultural encounter.",
    statement:
      "MemoryGrid reflects a journey through London by weaving hundreds of images into a fluid digital tapestry. Rather than presenting the trip chronologically, the work uses computational analysis to reveal visual relationships across landmarks, everyday scenes and fleeting observations. Memory becomes a network: associative, layered and continually in motion.",
    details: [
      { label: "Medium", value: "Single-channel digital video, colour, silent" },
      { label: "Duration", value: "5 minutes" },
      { label: "Display", value: "65-inch 4K UHD TV, 3840 × 2160" },
      { label: "Year", value: "2024" },
    ],
    process: [
      { title: "Image archive", text: "Six hundred photographs were selected from the artist’s London study-trip archive." },
      { title: "AI processing", text: "Image recognition, clustering and generative techniques analyse the collection and create new visual relationships." },
      { title: "Temporal composition", text: "Images flow and transition as an associative narrative, mirroring the way recollections connect across time." },
    ],
    themes: ["Travel archive", "Machine vision", "Learning", "Associative memory"],
    exhibition: "ArtSense · CityU School of Creative Media Annual Show 2024",
    sourceUrl: "https://www.wcchun.com/ArtSense_annual_show/artsense-memorygrid",
  },
  {
    title: "WordView",
    year: "2024",
    medium: "Creative Coding",
    image: "/art/art-09.webp",
    alt: "A room-scale projection filled with interlaced coloured lines and floating words.",
    featured: true,
    description:
      "An interactive projection combining digitised lecture notes with ECG readings from an Apple Watch, turning academic language and bodily data into an evolving spatial word field.",
    statement:
      "WordView bridges technology, health and education by visualising the relationship between learning and the body. Lecture notes describe what was studied; ECG data records the physiological life unfolding alongside it. Projected together on the school wall, these private data streams become a public and immersive portrait of four years of learning.",
    details: [
      { label: "Medium", value: "Digital projection and interactive software" },
      { label: "Projection area", value: "Approximately 2 × 2 metres" },
      { label: "Data", value: "Lecture notes and Apple Watch ECG" },
      { label: "Year", value: "2024" },
    ],
    process: [
      { title: "Data collection", text: "Lecture notes are digitised and preprocessed while ECG records are gathered from an Apple Watch." },
      { title: "Language model", text: "TF-IDF and word2vec techniques reveal associations and patterns within the academic text." },
      { title: "Interactive projection", text: "Custom software dynamically maps the processed language and health data into a large-scale responsive visualization." },
    ],
    themes: ["Embodied data", "Education", "Language", "Self-tracking"],
    exhibition: "ArtSense · CityU School of Creative Media Annual Show 2024",
    sourceUrl: "https://www.wcchun.com/ArtSense_annual_show/artsense-wordview",
  },
  {
    title: "TechCore",
    year: "2024",
    medium: "Installation",
    image: "/art/art-10.webp",
    alt: "A dense generative composition of coloured lines and layered words.",
    description:
      "A sculptural archive of the hardware, sensors and computing components used across four years of art-and-technology projects.",
    statement:
      "TechCore makes the normally hidden infrastructure of digital artwork visible. Microcontrollers, sensors, cables and computers are presented not as backstage equipment but as material evidence of experimentation and learning. A Raspberry Pi display connects these components to the projects they enabled, turning technical history into a physical self-portrait.",
    details: [
      { label: "Medium", value: "Electronics, wood vessel, white plinth, monitor, Raspberry Pi and cables" },
      { label: "Dimensions", value: "200 × 100 × 200 cm" },
      { label: "Requirement", value: "Electricity" },
      { label: "Year", value: "2024" },
    ],
    process: [
      { title: "Component archive", text: "Microcontrollers, sensors and electronics from earlier projects are selected as the installation’s sculptural material." },
      { title: "Structural composition", text: "Hardware and cables are arranged on a wooden vessel and white plinth to expose both function and visual form." },
      { title: "Living index", text: "A Raspberry Pi and small monitor cycle through documentation of the works created with the displayed components." },
    ],
    themes: ["Material technology", "Learning archive", "Creative process", "Electronic sculpture"],
    exhibition: "ArtSense · CityU School of Creative Media Annual Show 2024",
    sourceUrl: "https://www.wcchun.com/ArtSense_annual_show/artsense-techcore",
  },
  {
    title: "The Blue Countdown",
    year: "2023",
    medium: "Installation",
    image: "/art/art-11.webp",
    alt: "White polar-bear forms resting on a blue melting sculptural surface.",
    description:
      "A heat-activated installation in which wax polar bears and their glacier slowly melt, transforming climate data into a physical countdown.",
    statement:
      "The Arctic is warming at roughly twice the global average. The Blue Countdown renders that distant statistic as an intimate material event: wax bodies soften, the glacier becomes water and each drip sounds like a ticking clock. The work asks a direct question—how much time remains before the process can no longer be reversed?",
    details: [
      { label: "Medium", value: "Wax, thermochromic pigment and electric ceramic heater" },
      { label: "Behaviour", value: "Heat-activated melting installation" },
      { label: "Sound", value: "Amplified or naturally audible water drips" },
      { label: "Year", value: "2023" },
    ],
    process: [
      { title: "Wax figures", text: "Polar-bear models are cast in wax so that their form visibly changes as temperature rises." },
      { title: "Thermochromic ground", text: "The glacier base changes from white to blue when heat is activated, making temperature perceptible through colour." },
      { title: "Countdown", text: "Melting wax and dripping water create a ticking rhythm, linking irreversible material change to diminishing time." },
    ],
    themes: ["Climate crisis", "Arctic warming", "Fragility", "Time"],
    sourceUrl: "https://www.wcchun.com/work/other/The-Blue-Countdown",
  },
  {
    title: "EcoSyntax",
    year: "2023",
    medium: "Creative Coding",
    image: "/art/art-12.webp",
    alt: "Magenta and blue generative lines crossing in a dense abstract field.",
    description:
      "A generative visual system that treats ecology as a syntax—a shifting network in which every line exists through its relationship to another.",
    statement:
      "EcoSyntax approaches an ecosystem as a language without fixed sentences. Coloured paths accumulate, intersect and diverge, suggesting exchange, dependence, competition and adaptation. The composition is never read from a single starting point; meaning emerges through the density and behaviour of the whole network.",
    details: [
      { label: "Medium", value: "Generative digital artwork and custom software" },
      { label: "Format", value: "Real-time visual system" },
      { label: "Dimensions", value: "Variable" },
      { label: "Year", value: "2023" },
    ],
    process: [
      { title: "Rule system", text: "A custom generative system gives individual paths behaviours for movement, connection and response." },
      { title: "Accumulation", text: "Repeated interactions build a dense visual field whose structure emerges over time rather than from a fixed composition." },
      { title: "Ecological reading", text: "The evolving network becomes a metaphor for systems sustained by interdependence and continual adaptation." },
    ],
    themes: ["Ecology", "Generative systems", "Interdependence", "Emergence"],
    sourceUrl: "https://wcchun.notion.site/EcoSyntax-5cf1ab2e21af47daab6dbac64dcf5be1",
  },
  {
    title: "Aware",
    year: "2023",
    medium: "Installation",
    image: "/art/art-07.webp",
    alt: "A blue responsive projection forming an immersive architectural image field.",
    description:
      "An interactive digital projection in which visitors use a number pad to unlock changing visual and textual narratives about awareness.",
    statement:
      "Aware places the visitor inside an evolving digital tapestry. Each numerical sequence changes the projected environment and contributes another action to the collective experience. The interface is deliberately simple, allowing attention to shift from operating technology toward noticing how individual choices alter a shared visual world.",
    details: [
      { label: "Medium", value: "Interactive software, number pad and large-scale digital projection" },
      { label: "Interaction", value: "Visitor-controlled numerical input" },
      { label: "Dimensions", value: "Variable, site-responsive" },
      { label: "Year", value: "2023" },
    ],
    process: [
      { title: "Input", text: "Visitors enter sequences through a number pad, using a familiar interface to communicate with the artwork." },
      { title: "Responsive system", text: "Custom software maps each input to evolving graphic and textual content projected across the wall." },
      { title: "Collective image", text: "Successive interactions accumulate into a shared experience, connecting personal choice with a larger digital environment." },
    ],
    themes: ["Awareness", "Human–computer interaction", "Collective participation", "Perception"],
    exhibition: "Aware · Exhibition version",
    sourceUrl: "https://www.wcchun.com/work/coding/aware_exhibition",
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
              <section className="dialog-section">
                <p className="dialog-section-label">Introduction</p>
                <p>{selected.statement}</p>
              </section>
              <section className="dialog-section">
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
              {selected.sourceUrl && (
                <a className="dialog-source" href={selected.sourceUrl} target="_blank" rel="noreferrer">
                  View original project documentation ↗
                </a>
              )}
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
