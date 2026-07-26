import Image from "next/image";
import Link from "next/link";

export type ProjectPage = {
  slug: string;
  section: "work" | "technology";
  title: string;
  subtitle: string;
  year: string;
  medium: string;
  description: string;
  statement: string;
  image: string;
  imageAlt: string;
  role: string;
  tools: string[];
  status: string;
  collaboration: string;
  facts: Array<[string, string]>;
  process: Array<[string, string]>;
  gallery: Array<{ src: string; alt: string; caption: string }>;
  links?: Array<{ label: string; href: string }>;
};

export const projectPages: ProjectPage[] = [
  {
    slug: "scanned-memories",
    section: "work",
    title: "Scanned Memories",
    subtitle: "Light, movement and machine time translated into physical prints.",
    year: "2024",
    medium: "Scanner-generated photography",
    description:
      "A scanner-generated photographic series exploring how images—and the memories attached to them—are preserved, transformed and cared for within constantly updating digital systems.",
    statement:
      "A home document scanner becomes both slit camera and brush of light. Dragged across an iPad mirroring a computer-based digital sculpture process, it compresses screen time, hand movement, software processing and print output into a single image. The resulting bands are visible traces of attention and technological mediation.",
    image: "/art/art-01.webp",
    imageAlt: "Nine framed monochrome generative images installed in a gallery.",
    role: "Artist · Research, image-making and installation",
    tools: ["Document scanner", "iPad", "Machine learning", "Digital print"],
    status: "Completed work · Exhibited 2024 and 2026",
    collaboration: "Produced as an independent artistic project; installed with exhibition teams.",
    facts: [
      ["Artist", "Wong Chun Sunny / 王浚"],
      ["Medium", "Scanner-generated digital print"],
      ["Dimensions", "80 × 100 cm"],
      ["Exhibitions", "The Unseen Realm, 2024 · Light Trace, Collect Hong Kong Art Fair 2026"],
    ],
    process: [
      ["Capture", "A document scanner records unstable digital images displayed on an iPad rather than a fixed paper original."],
      ["Visual score", "Image bands are guided by a machine-learning score derived from digitised study notes and ECG traces."],
      ["Material translation", "Screen light, hand movement and processing delay become physical prints and tangible records."],
    ],
    gallery: [
      { src: "/art/details/scanned-installation.webp", alt: "Scanned Memories installed as framed works in a gallery.", caption: "Exhibition installation" },
      { src: "/art/details/scanned-alternate.webp", alt: "Alternate view of a Scanned Memories print.", caption: "Scanner-generated print detail" },
    ],
  },
  {
    slug: "digital-echoes",
    section: "work",
    title: "Digital Echoes",
    subtitle: "Personal photographs and text reconstructed through machine learning.",
    year: "2024",
    medium: "Cameraless photography",
    description:
      "A cameraless photographic series in which machine-learning models reinterpret personal photographs and text, allowing new images to carry echoes of the memories from which they were generated.",
    statement:
      "Digital Echoes asks what happens when personal recollection becomes training material. Photographs from a London study trip are processed into unfamiliar but recognisable visual forms. Printed and framed, the outputs challenge where photography begins when no camera is used to make the final image.",
    image: "/art/art-02.webp",
    imageAlt: "Three framed blue photographic works installed vertically on a gallery wall.",
    role: "Artist · Dataset construction, model exploration and print production",
    tools: ["Machine learning", "Personal image archive", "Text processing", "Digital print"],
    status: "Completed work · Exhibited 2024 and 2025",
    collaboration: "Independent artistic research presented within curated group exhibitions.",
    facts: [
      ["Source", "Personal photographs and text"],
      ["Presentation", "Machine-learning generated digital prints"],
      ["Format", "Framed grid installation"],
      ["Exhibitions", "The Unseen Realm, 2024 · Collect Hong Kong Art Fair 2025"],
    ],
    process: [
      ["Personal dataset", "Photographs from significant experiences form the visual memory archive used by the process."],
      ["Reinterpretation", "The model recombines patterns into images that remain connected to their sources without copying them."],
      ["Physical archive", "Generated images become framed prints arranged in a repeated grid and move from computation into the gallery."],
    ],
    gallery: [
      { src: "/art/details/digital-installation.webp", alt: "Digital Echoes works displayed in a repeated gallery grid.", caption: "The Unseen Realm installation" },
      { src: "/art/art-02.webp", alt: "Digital Echoes framed blue prints.", caption: "Framed photographic series" },
    ],
  },
  {
    slug: "memorygrid",
    section: "work",
    title: "MemoryGrid",
    subtitle: "Six hundred travel photographs become an associative moving-image archive.",
    year: "2024",
    medium: "Moving image",
    description:
      "A five-minute moving-image work transforming 600 photographs from a London study trip into an AI-generated visual diary of travel, learning and cultural encounter.",
    statement:
      "Rather than presenting the trip chronologically, MemoryGrid uses computational analysis to reveal visual relationships across landmarks, everyday scenes and fleeting observations. Memory becomes a network: associative, layered and continually in motion.",
    image: "/art/art-08.webp",
    imageAlt: "A visitor viewing a projected network of image fragments.",
    role: "Artist and creative coder · Concept, data preparation and moving image",
    tools: ["Python", "Machine vision", "Image clustering", "4K video"],
    status: "Completed work · Five-minute exhibition version",
    collaboration: "Independent project developed for the ArtSense exhibition context.",
    facts: [
      ["Medium", "Single-channel digital video, colour, silent"],
      ["Duration", "5 minutes"],
      ["Display", "65-inch 4K UHD TV"],
      ["Exhibition", "ArtSense · CityU School of Creative Media Annual Show 2024"],
    ],
    process: [
      ["Image archive", "Six hundred photographs were selected from the artist’s London study-trip archive."],
      ["Machine vision", "Recognition, clustering and generative techniques reveal visual relationships across the collection."],
      ["Temporal composition", "Images flow as an associative narrative, mirroring the way recollections connect across time."],
    ],
    gallery: [
      { src: "/art/art-08.webp", alt: "MemoryGrid presented in an exhibition space.", caption: "Exhibition presentation" },
      { src: "/art/legacy/artsense.webp", alt: "ArtSense exhibition documentation.", caption: "ArtSense context" },
    ],
    links: [{ label: "View source archive on GitHub ↗", href: "https://github.com/wcchun1234/ArtSense" }],
  },
  {
    slug: "wordview",
    section: "work",
    title: "WordView",
    subtitle: "Academic language and physiological data form an immersive spatial field.",
    year: "2024",
    medium: "Interactive projection",
    description:
      "An interactive projection combining digitised lecture notes with ECG readings from an Apple Watch, turning academic language and bodily data into an evolving spatial word field.",
    statement:
      "WordView bridges technology, health and education by visualising the relationship between learning and the body. Lecture notes describe what was studied; ECG data records the physiological life unfolding alongside it. Together they form an immersive portrait of four years of learning.",
    image: "/art/art-09.webp",
    imageAlt: "A projection filled with interlaced coloured lines and floating words.",
    role: "Artist and creative coder · Data processing, visual system and installation",
    tools: ["Python", "TF-IDF", "word2vec", "Apple Watch ECG", "Projection"],
    status: "Completed interactive installation",
    collaboration: "Independent project presented as part of the ArtSense exhibition framework.",
    facts: [
      ["Medium", "Digital projection and interactive software"],
      ["Projection", "Approximately 2 × 2 metres"],
      ["Data", "Lecture notes and Apple Watch ECG"],
      ["Exhibition", "ArtSense · CityU School of Creative Media Annual Show 2024"],
    ],
    process: [
      ["Data collection", "Lecture notes are digitised while ECG records are gathered from an Apple Watch."],
      ["Language analysis", "TF-IDF and word2vec techniques reveal associations and patterns within the academic text."],
      ["Projection", "Custom software maps processed language and health data into a large-scale responsive visualisation."],
    ],
    gallery: [
      { src: "/art/art-09.webp", alt: "WordView projected across an exhibition wall.", caption: "Interactive projection" },
      { src: "/art/art-10.webp", alt: "Dense generative composition of lines and words.", caption: "Computational image field" },
    ],
    links: [{ label: "View source archive on GitHub ↗", href: "https://github.com/wcchun1234/ArtSense" }],
  },
  {
    slug: "readyloop",
    section: "technology",
    title: "ReadyLoop",
    subtitle: "AI-supported IB Design Technology learning before fabrication.",
    year: "2026",
    medium: "Learning technology · Responsible AI",
    description:
      "A safe pre-fabrication learning platform combining student guidance, revision support, bounded file analysis and role-specific views for technicians, teachers and administrators.",
    statement:
      "ReadyLoop turns workshop feedback into a calm learning cycle: Learn, Check, Submit, Revise and Reflect. AI supports explanations and self-checks, while teachers and technicians retain approval, safety and production decisions.",
    image: "/technology/readyloop/15.webp",
    imageAlt: "ReadyLoop project overview showing its learning platform and fabrication workflow.",
    role: "Project lead · Product strategy, UX, system design and implementation",
    tools: ["Google Apps Script", "React", "Responsible AI", "GitHub", "Codex"],
    status: "Working public demo · School deployment remains gated",
    collaboration: "Developed from real Design Technology workshop practice with teacher and technician workflows kept human-led.",
    facts: [
      ["Role", "Project lead and system designer"],
      ["Recognition", "Outstanding Innovation and Creativity Award · AIREA 2026"],
      ["Special recognition", "Z.AI Special Award"],
      ["Status", "Working public demo with school deployment gates"],
    ],
    process: [
      ["Learn", "Short, contextual explanations support understanding before machine time begins."],
      ["Check and submit", "Students complete bounded self-checks and provide clearer fabrication evidence."],
      ["Revise and reflect", "Human feedback becomes part of an iterative learning record rather than a final rejection."],
    ],
    gallery: [
      { src: "/technology/readyloop/7.webp", alt: "ReadyLoop student learning path interface.", caption: "A calm student-facing learning path" },
      { src: "/technology/readyloop/10.webp", alt: "ReadyLoop roles and learning-loop diagram.", caption: "One loop, four coordinated roles" },
      { src: "/technology/readyloop/award.webp", alt: "AIREA 2026 award certificate and Z.AI Special Award.", caption: "Award evidence" },
    ],
    links: [{ label: "Explore ReadyLoop on GitHub ↗", href: "https://github.com/sunnydesigntech/ReadyLoop" }],
  },
  {
    slug: "dt-fabrication-dashboard",
    section: "technology",
    title: "DT Fabrication Dashboard",
    subtitle: "A school-wide production workflow for Years 6–12.",
    year: "2025–2026",
    medium: "Workflow automation · Digital fabrication",
    description:
      "A live operational system for student submissions, technician review, teacher visibility and fabrication coordination across 3D printing, laser cutting and workshop production.",
    statement:
      "The dashboard transforms a request form and spreadsheet workflow into a role-aware operational system. It supports preparation, submission, review, queue management, production tracking and audit history without presenting ReadyLoop’s learning claims as operational evidence.",
    image: "/technology/dashboard/admin.webp",
    imageAlt: "Design Fabrication Dashboard admin view with workshop submission metrics.",
    role: "System designer and developer · Workflow, interface and operational logic",
    tools: ["Google Apps Script", "Google Sheets", "JavaScript", "Audit logging"],
    status: "Live operational system · 1,500+ recorded requests",
    collaboration: "Designed around student submissions, technician review and teacher visibility within a school workshop.",
    facts: [
      ["Role", "System design and workflow automation"],
      ["Operational record", "1,500+ student fabrication requests supported"],
      ["Processes", "Laser cutting, 3D printing and special requests"],
      ["Environment", "Google Apps Script and Google Workspace"],
    ],
    process: [
      ["Prepare", "Students see file-type, scale, material and evidence requirements before uploading."],
      ["Review", "Technicians assess readiness, record issue codes and return actionable feedback."],
      ["Track", "Role-specific queues, status history and audit tools coordinate the production workflow."],
    ],
    gallery: [
      { src: "/technology/dashboard/submit.webp", alt: "Student fabrication submission interface.", caption: "Student submission workflow" },
      { src: "/technology/dashboard/admin.webp", alt: "Admin submission dashboard.", caption: "Operational dashboard" },
      { src: "/technology/dashboard/operations.webp", alt: "Fabrication operations overview.", caption: "Queue and production evidence" },
    ],
  },
  {
    slug: "robotics",
    section: "technology",
    title: "Robotics & Physical Computing",
    subtitle: "Team development, prototyping and independent technical learning.",
    year: "2026",
    medium: "Robotics · Physical computing · Learning design",
    description:
      "Hands-on work spanning VEX Robotics, mechanical design, programming, electronics, testing and competition preparation, supported by calm coaching and iterative engineering practice.",
    statement:
      "The practice connects physical prototyping with visible learning support. Demonstrations, troubleshooting posters and student-friendly reference materials help learners move from a fault to a testable next step while retaining ownership of their solution.",
    image: "/technology/robotics/learning-wall.webp",
    imageAlt: "Robotics classroom learning wall with coding and troubleshooting posters.",
    role: "Technical educator and programme designer · Incoming team coordinator",
    tools: ["VEX Robotics", "micro:bit", "Arduino", "ESP32", "Raspberry Pi"],
    status: "Ongoing practice · Coordinator appointment effective September 2026",
    collaboration: "Developed with students through coached prototyping, testing and competition preparation.",
    facts: [
      ["Appointment", "Incoming Secondary Robotics ASA Teams Coordinator"],
      ["Effective", "From September 2026"],
      ["Platforms", "VEX Robotics, micro:bit, Arduino, ESP32 and Raspberry Pi"],
      ["Focus", "Independent debugging, iteration and competition preparation"],
    ],
    process: [
      ["Build", "Students assemble mechanical, electronic and software systems through guided prototyping."],
      ["Diagnose", "The Get Unstuck Wall turns common faults into a sequence of observable checks."],
      ["Iterate", "Testing evidence supports reflection, redesign and increasingly independent decisions."],
    ],
    gallery: [
      { src: "/technology/robotics/posters.webp", alt: "Student learning posters about robotics and block-based coding.", caption: "Student-facing learning posters" },
      { src: "/technology/robotics/physical-computing.webp", alt: "Physical-computing hardware with illuminated LED matrix.", caption: "Physical-computing prototype" },
      { src: "/technology/robotics/get-unstuck-wall.webp", alt: "Robotics Get Unstuck Wall troubleshooting poster.", caption: "Independent debugging framework" },
    ],
    links: [{ label: "Open the Robotics Get Unstuck Wall PDF ↗", href: "/technology/robotics/robotics-get-unstuck-wall.pdf" }],
  },
];

export function projectUrl(project: ProjectPage) {
  return `/${project.section}/${project.slug}`;
}

export function ProjectDetail({ project }: { project: ProjectPage }) {
  const url = `https://wcchun.com${projectUrl(project)}`;
  const projectIndex = projectPages.findIndex((item) => item.slug === project.slug);
  const previous = projectPages[(projectIndex - 1 + projectPages.length) % projectPages.length];
  const next = projectPages[(projectIndex + 1) % projectPages.length];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    creator: { "@type": "Person", name: "Wong Chun (Sunny)", url: "https://wcchun.com" },
    dateCreated: project.year,
    image: `https://wcchun.com${project.image}`,
    keywords: project.tools.join(", "),
    url,
  };
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://wcchun.com/" },
      { "@type": "ListItem", position: 2, name: project.section === "work" ? "Work" : "Technology", item: `https://wcchun.com/#${project.section}` },
      { "@type": "ListItem", position: 3, name: project.title, item: url },
    ],
  };

  return (
    <>
    <a className="skip-link project-skip-link" href="#project-main">Skip to project content</a>
    <main className="project-page" id="project-main">
      <header className="project-page-nav">
        <Link href="/" className="project-page-brand">WCCHUN</Link>
        <Link href={project.section === "work" ? "/#work" : "/#technology"}>
          Back to {project.section === "work" ? "selected work" : "technology"} ↙
        </Link>
      </header>
      <nav className="project-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span>/</span>
        <Link href={project.section === "work" ? "/#work" : "/#technology"}>{project.section === "work" ? "Work" : "Technology"}</Link>
        <span>/</span><span aria-current="page">{project.title}</span>
      </nav>
      <nav className="project-section-nav" aria-label="Project sections">
        <a href="#overview">Overview</a><a href="#role">Role</a><a href="#process">Process</a><a href="#gallery">Gallery</a>
      </nav>

      <section className="project-page-hero" id="overview">
        <p>{project.medium} · {project.year}</p>
        <h1>{project.title}</h1>
        <h2>{project.subtitle}</h2>
        <div className="project-page-image">
          <Image src={project.image} alt={project.imageAlt} width={1920} height={1080} sizes="100vw" priority unoptimized />
        </div>
      </section>

      <section className="project-page-intro">
        <p className="project-page-lede">{project.description}</p>
        <p>{project.statement}</p>
      </section>

      <dl className="project-page-facts">
        {project.facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
      </dl>

      <section className="project-page-credits" id="role" aria-labelledby="project-credits-title">
        <div>
          <p className="project-page-kicker">Project framework</p>
          <h2 id="project-credits-title">Role, tools and collaboration</h2>
        </div>
        <dl>
          <div><dt>Role</dt><dd>{project.role}</dd></div>
          <div><dt>Tools</dt><dd><ul>{project.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul></dd></div>
          <div><dt>Status</dt><dd>{project.status}</dd></div>
          <div><dt>Collaboration</dt><dd>{project.collaboration}</dd></div>
        </dl>
      </section>

      <section className="project-page-process" id="process">
        <p className="project-page-kicker">Process and approach</p>
        <div>
          {project.process.map(([title, text], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="project-page-gallery" id="gallery" aria-label={`${project.title} image gallery`}>
        {project.gallery.map((item) => (
          <figure key={`${item.src}-${item.caption}`}>
            <Image src={item.src} alt={item.alt} width={1920} height={1080} sizes="(max-width: 760px) 100vw, 50vw" unoptimized />
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </section>

      {project.links && (
        <nav className="project-page-links" aria-label={`${project.title} external links`}>
          {project.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>)}
        </nav>
      )}
      <nav className="project-pagination" aria-label="Adjacent projects">
        <Link href={projectUrl(previous)}><span>Previous project</span><strong>{previous.title}</strong></Link>
        <Link href={projectUrl(next)}><span>Next project</span><strong>{next.title}</strong></Link>
      </nav>

      <footer className="project-page-footer">
        <p>Wong Chun (Sunny) · Artist &amp; Creative Technologist</p>
        <Link href="/">Return to portfolio ↑</Link>
      </footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
    </main>
    </>
  );
}
