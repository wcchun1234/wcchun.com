"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

const assetPath = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

type Project = {
  title: string;
  zh?: string;
  year: string;
  medium: string;
  image: string;
  alt: string;
  featured?: boolean;
  description: string;
  statement: string;
  details: { label: string; value: string }[];
  process: { title: string; text: string }[];
  themes: string[];
  exhibition?: string;
  codeUrl?: string;
};

type ArchiveSection = {
  title: string;
  text: string;
};

type ProjectVideo = {
  youtubeId: string;
  title: string;
  kind: "Artwork film" | "Documentation" | "Process film";
};

type LegacyProjectInput = {
  title: string;
  year: string;
  medium: string;
  image: string;
  description: string;
  codeUrl?: string;
  zh?: string;
};

const legacyProject = ({
  title,
  year,
  medium,
  image,
  description,
  codeUrl,
  zh,
}: LegacyProjectInput): Project => ({
  title,
  zh,
  year,
  medium,
  image,
  alt: `${title}, an artwork by Wong Chun Sunny.`,
  description,
  statement: `${title} belongs to WCCHUN’s continuing investigation of memory, perception and technology. The project uses ${medium.toLowerCase()} as a way to translate an idea into an encounter—retaining the visual and conceptual identity of the original work while making its documentation accessible as part of this complete archive.`,
  details: [
    { label: "Artist", value: "Wong Chun Sunny / WCCHUN" },
    { label: "Medium", value: medium },
    { label: "Year", value: year },
    { label: "Status", value: "Legacy archive entry" },
  ],
  process: [
    {
      title: "Concept",
      text: "The project begins with a specific observation, memory or social question and develops it through visual research.",
    },
    {
      title: "Making",
      text: `Material and technical tests shape the final ${medium.toLowerCase()} work through an iterative studio process.`,
    },
    {
      title: "Archive",
      text: "The surviving image and project metadata are retained here so the work remains part of the artist’s complete practice.",
    },
  ],
  themes: ["Archive", "Memory", "Technology", "Visual culture"],
  codeUrl,
});

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
    codeUrl: "https://github.com/wcchun1234/ArtSense",
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
    codeUrl: "https://github.com/wcchun1234/ArtSense",
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
    codeUrl: "https://github.com/wcchun1234/ArtSense",
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
    codeUrl: "https://github.com/wcchun1234/Aware",
  },
  legacyProject({
    title: "ArtSense",
    year: "2024",
    medium: "Installation",
    image: "/art/legacy/artsense.webp",
    description:
      "The exhibition framework bringing MemoryGrid, WordView and TechCore together as an interconnected portrait of four years of creative-media study.",
    codeUrl: "https://github.com/wcchun1234/ArtSense",
  }),
  legacyProject({
    title: "MindPixel",
    year: "2023",
    medium: "Creative Coding",
    image: "/art/legacy/mindpixel.webp",
    description:
      "An immersive computational image environment exploring how fragments of thought can be recomposed into a luminous architectural memory.",
    codeUrl: "https://github.com/wcchun1234/MindPixel",
  }),
  legacyProject({
    title: "MindScape",
    year: "2023",
    medium: "Installation",
    image: "/art/legacy/mindscape.webp",
    description:
      "A sculptural installation that externalises an internal landscape through suspended structure, shadow and technological material.",
  }),
  legacyProject({
    title: "Aware (Exhibition)",
    year: "2023",
    medium: "Installation",
    image: "/art/legacy/aware-exhibition.webp",
    description:
      "The exhibition configuration of Aware, extending the interactive system into a shared spatial encounter.",
    codeUrl: "https://github.com/wcchun1234/Aware",
  }),
  legacyProject({
    title: "布達佩斯 / Budapest",
    year: "2022",
    medium: "Moving Image",
    image: "/art/legacy/budapest.webp",
    description:
      "A moving-image study of Budapest shaped through travel, observation and the unstable persistence of place in memory.",
  }),
  legacyProject({
    title: "CAR",
    year: "2022",
    medium: "Creative Coding",
    image: "/art/legacy/car.webp",
    description:
      "A concise computational experiment using the visual language of digital counters, symbols and responsive systems.",
  }),
  legacyProject({
    title: "I Am the Son of the Sun",
    year: "2022",
    medium: "Moving Image",
    image: "/art/legacy/son-of-the-sun.webp",
    description:
      "A performative moving-image work examining identity, exposure and the symbolic relationship between the body and light.",
  }),
  legacyProject({
    title: "ownvalue",
    year: "2021",
    medium: "Creative Coding",
    image: "/art/legacy/ownvalue.webp",
    description:
      "An interactive work asking viewers to confront how personal worth is measured, entered and displayed by digital interfaces.",
  }),
  legacyProject({
    title: "正確揀釘 營唔會飛",
    year: "2021",
    medium: "Graphic",
    image: "/art/legacy/correct-nail.webp",
    description:
      "A Cantonese-language graphic campaign using humour and direct visual communication to engage a local audience.",
  }),
  legacyProject({
    title: "Dictionary of Colour",
    year: "2020",
    medium: "Graphic",
    image: "/art/legacy/dictionary-colour.webp",
    description:
      "A graphic system treating colour as a navigable language of association, location and personal interpretation.",
  }),
  legacyProject({
    title: "Who Am I?",
    year: "2020",
    medium: "Graphic",
    image: "/art/legacy/who-am-i.webp",
    description:
      "A typographic identity study that turns a direct personal question into a layered visual composition.",
  }),
  legacyProject({
    title: "60HKG Promotion Campaign",
    year: "2020",
    medium: "Graphic",
    image: "/art/legacy/60hkg.webp",
    description:
      "A promotional identity developed for a Hong Kong-focused campaign across compact digital and graphic formats.",
  }),
  legacyProject({
    title: "Spaghetti",
    year: "2021",
    medium: "Moving Image",
    image: "/art/legacy/spaghetti.webp",
    description:
      "A short moving-image experiment turning an ordinary material and familiar word into a cinematic visual study.",
  }),
  legacyProject({
    title: "Enchanted Landscape",
    year: "2022",
    medium: "Photography",
    image: "/art/legacy/enchanted-landscape.webp",
    description:
      "A photographic exploration of landscape as an imagined, remembered and emotionally reconstructed place.",
  }),
  legacyProject({
    title: "Indecisive Moment",
    year: "2022",
    medium: "Photography",
    image: "/art/legacy/indecisive-moment.webp",
    description:
      "A photographic series concerned with hesitation, timing and the visual tension immediately before a decision.",
  }),
  legacyProject({
    title: "Film",
    year: "2022",
    medium: "Photography",
    image: "/art/legacy/film.webp",
    description:
      "A stripped-back photographic study reflecting on the material and conceptual language of film.",
  }),
  legacyProject({
    title: "Night City",
    year: "2022",
    medium: "Photography",
    image: "/art/legacy/night-city.webp",
    description:
      "A nocturnal photographic observation of artificial light, urban movement and the city as an image-making machine.",
  }),
  legacyProject({
    title: "Digitdeath",
    year: "2022",
    medium: "Creative Coding",
    image: "/art/legacy/digitdeath.webp",
    description:
      "A computational work reflecting on disappearance, obsolescence and mortality inside digital culture.",
  }),
  legacyProject({
    title: "sweeTabot",
    year: "2021",
    medium: "Creative Coding",
    image: "/art/legacy/sweetabot.webp",
    description:
      "A friendly networked-object concept combining communication, play and a deliberately approachable technological identity.",
  }),
  legacyProject({
    title: "Capturing Time",
    year: "2021",
    medium: "Other",
    image: "/art/legacy/capturing-time.webp",
    description:
      "An early experimental work considering how a fleeting duration can be represented, stored and revisited.",
  }),
  legacyProject({
    title: "Protect Hongkonger",
    year: "2021",
    medium: "Other",
    image: "/art/legacy/protect-hongkonger.webp",
    description:
      "A concise visual statement shaped by care, civic identity and the desire to protect a local community.",
  }),
];

const archiveSeries = (slug: string, count: number, exclude: number[] = []) =>
  Array.from({ length: count }, (_, index) => index + 1)
    .filter((index) => !exclude.includes(index))
    .map((index) => `/art/archive/${slug}/${String(index).padStart(2, "0")}.webp`);

const galleryByTitle: Record<string, string[]> = {
  "Scanned Memories": [
    "/art/art-01.webp",
    "/art/details/art-03.webp",
    "/art/details/scanned-installation.webp",
    "/art/details/scanned-alternate.webp",
    ...archiveSeries("scanned-memories", 7),
    ...archiveSeries("light-trace-scanned-memories", 5),
  ],
  "Digital Echoes": [
    "/art/art-02.webp",
    "/art/details/art-04.webp",
    "/art/details/digital-installation.webp",
    ...archiveSeries("digital-echoes", 8),
  ],
  MemoryGrid: [
    "/art/art-08.webp",
    "/art/legacy/artsense.webp",
    "/art/art-09.webp",
    ...archiveSeries("memorygrid", 1),
  ],
  WordView: [
    "/art/art-09.webp",
    "/art/art-10.webp",
    "/art/legacy/artsense.webp",
    ...archiveSeries("wordview", 1),
  ],
  TechCore: [
    "/art/art-10.webp",
    "/art/details/art-05.webp",
    "/art/legacy/artsense.webp",
    ...archiveSeries("techcore", 1),
  ],
  Aware: [
    "/art/art-07.webp",
    "/art/details/art-06.webp",
    "/art/legacy/aware-exhibition.webp",
    ...archiveSeries("aware-exhibition", 11),
  ],
  "Aware (Exhibition)": [
    "/art/legacy/aware-exhibition.webp",
    "/art/details/art-06.webp",
    "/art/art-07.webp",
    ...archiveSeries("aware-exhibition", 11),
  ],
  ArtSense: [
    "/art/legacy/artsense.webp",
    "/art/art-08.webp",
    "/art/art-09.webp",
    "/art/details/art-05.webp",
    ...archiveSeries("artsense", 3),
  ],
  MindPixel: [
    "/art/legacy/mindpixel.webp",
    "/art/archive/mindpixel/outcome-sample.webp",
  ],
  "The Blue Countdown": archiveSeries("blue-countdown", 14),
  CAR: archiveSeries("car", 6),
  ownvalue: archiveSeries("ownvalue", 3),
  "正確揀釘 營唔會飛": archiveSeries("correct-nail", 14),
  "Dictionary of Colour": archiveSeries("dictionary-colour", 4),
  "Who Am I?": archiveSeries("who-am-i", 1),
  "60HKG Promotion Campaign": archiveSeries("60hkg", 9, [4]),
  "Enchanted Landscape": archiveSeries("enchanted-landscape", 5),
  "Indecisive Moment": archiveSeries("indecisive-moment", 7),
  Film: archiveSeries("film", 24),
  "Night City": archiveSeries("night-city", 18),
  Digitdeath: archiveSeries("digitdeath", 5),
  sweeTabot: archiveSeries("sweetabot", 4),
  "Capturing Time": archiveSeries("capturing-time", 11),
  "Protect Hongkonger": archiveSeries("protect-hongkonger", 4),
};

const archiveNarrativeByTitle: Record<string, ArchiveSection[]> = {
  "Scanned Memories": [
    {
      title: "Original project context",
      text: "Scanned Memories explores the interplay between technology, identity and memory. A scanner records shifting digital images displayed on an iPad, creating physical traces of images that are simultaneously tangible and ephemeral. The lines and distortions stand for the way experience is fragmented, preserved and reconstructed in the digital age.",
    },
    {
      title: "Capturing digital memory",
      text: "The scanner does not capture a stable picture. It records movement, delay and distortion across a changing screen. This process reflects a contemporary identity mediated by devices: memories may persist, but their form changes as they move between a hand, an interface, a machine and a print.",
    },
    {
      title: "Exhibition presentation",
      text: "The scans are presented as framed images in a grid. Each work remains an individual fragment while contributing to a collective narrative. The tactile prints and their digital origin create a dialogue between physical permanence and technological instability.",
    },
    {
      title: "Light Trace, 2026",
      text: "The later presentation, Light Trace: Scanned Memories, uses a home document scanner as both slit-camera and brush of light. It compresses screen time, hand movement, software processing and print output into one image. Machine-learning visual scores derived from digitised lecture notes and ECG traces guide the image bands, connecting learning, bodily data and computational translation.",
    },
  ],
  "Digital Echoes": [
    {
      title: "Technology, memory and creativity",
      text: "Digital Echoes transforms personal photographs and text through machine-learning models. The generated images are new, yet retain echoes of the memories from which they were made. The project creates a dialogue between past experience and its present computational reinterpretation.",
    },
    {
      title: "From personal data to physical print",
      text: "Photographs from a London study trip form the project’s personal dataset. Machine learning analyses and recombines their visual information before the resulting images are printed and framed. Moving the images from code into a gallery asks whether a photograph must begin with a camera, and how technology changes the way memory is stored and reconstructed.",
    },
    {
      title: "The Unseen Realm",
      text: "For the SCM Cameraless Photography Exhibition 2024, the works were installed in a repeated grid. The format reflects the echoing and pattern-based logic of both memory and machine learning. The exhibition ran at City University of Hong Kong’s Run Run Shaw Creative Media Centre from 26 August to 5 October 2024.",
    },
    {
      title: "Collect Hong Kong 2025",
      text: "The series was subsequently presented at Collect Hong Kong Art Fair 2025 at the Hong Kong Arts Centre. This version emphasised that creative machine-learning processes can be directed by artists without a conventional programming background, opening technical systems to experimentation and personal expression.",
    },
    {
      title: "Project evolution",
      text: "Digital Echoes developed from MindPixel, an earlier project combining textual knowledge from lecture notes with personal visual memories. The later work translates that research into physical prints and extends its questions about authorship, authenticity and machine-mediated recollection.",
    },
  ],
  MemoryGrid: [
    {
      title: "Artist’s statement",
      text: "MemoryGrid reflects a journey through London. Six hundred photographs document places, emotions and thoughts from a summer study trip, then become an AI-generated digital tapestry. By looking at art and technology outside Hong Kong, the work presents a wider perspective on creative practice and innovation.",
    },
    {
      title: "Concept and inspiration",
      text: "The project merges personal experience with technological transformation. It is not a chronological travel diary; it explores how memories can be reorganised by computational systems into new forms of expression.",
    },
    {
      title: "Process and techniques",
      text: "Six hundred images were selected from a much larger travel archive, ranging from landmarks to ordinary moments. Image recognition, clustering and generative techniques were used to find relationships across the collection. Smooth transitions and a carefully chosen colour language evoke the fluid atmosphere of recollection.",
    },
    {
      title: "Viewing context",
      text: "The five-minute silent video is displayed on a 65-inch 4K UHD television. Its interactive dimension comes from the viewer’s active reading of transitions and visual connections, prompting reflection on personal experience and technology’s role in shaping memory.",
    },
  ],
  TechCore: [
    {
      title: "Artist’s statement",
      text: "TechCore represents the technical heart of four years of artistic exploration. The hardware that powered earlier projects is brought forward as visible material, making the hours of experimentation, learning and building tangible.",
    },
    {
      title: "Concept and materials",
      text: "Microcontrollers, sensors, electronic components, cables and computing devices form a sculptural archive of the artist’s education. A wooden vessel and white plinth support the arrangement, while their exposed structure highlights both the functional and aesthetic character of the equipment.",
    },
    {
      title: "Interactive display",
      text: "A small monitor connected to a Raspberry Pi cycles through images and videos of projects made with the displayed components. Visitors can connect each physical tool to the artworks it enabled and follow the evolution of the practice.",
    },
    {
      title: "Exhibition context",
      text: "Presented on a different floor from the other ArtSense works, TechCore foregrounds technical learning as a distinct part of the wider series. Its placement underlines how artistic growth can be distributed across many media, skills and spaces.",
    },
  ],
  WordView: [
    {
      title: "Artist’s statement",
      text: "WordView bridges technology, health and education. It transforms lecture notes and Apple Watch ECG records into a dynamic visual narrative, projecting the relationship between academic life and personal well-being back onto the architecture of the school.",
    },
    {
      title: "Concept and data",
      text: "The project begins with two parts of everyday life that are rarely viewed together: what the artist learned and how the artist’s body responded through time. Their convergence asks what personal data can reveal, and how data systems influence the way people understand themselves.",
    },
    {
      title: "Process and techniques",
      text: "Lecture notes were digitised and prepared for language analysis while ECG readings were collected through an Apple Watch. TF-IDF and word2vec methods reveal patterns and associations in the text. Custom software maps the processed language and health data into a projection that can update dynamically.",
    },
    {
      title: "Interaction and display",
      text: "The approximately two-by-two-metre projection allows viewers to explore connections between lecture topics and health metrics. Installed on a separate floor within ArtSense, it represents the embodied and educational dimension of the series.",
    },
  ],
  ArtSense: [
    {
      title: "Series overview",
      text: "ArtSense brings together MemoryGrid, TechCore and WordView as three perspectives on a four-year journey through art and technology. Travel photographs, lecture notes, physiological data and accumulated hardware become a connected archive of learning.",
    },
    {
      title: "Exhibition structure",
      text: "The works were intentionally distributed across different floors during the CityU School of Creative Media Annual Show 2024. Moving between them allowed visitors to encounter the visual, embodied and technical dimensions of the artist’s education as separate but related experiences.",
    },
  ],
  MindPixel: [
    {
      title: "Text and image memory",
      text: "MindPixel combines the artist’s lecture-note archive with personal photographs. Text was extracted from PDF documents, cleaned and converted into TF-IDF features; the image collection supplied a parallel visual record. A custom fusion model was then trained to generate new images from those two forms of memory.",
    },
    {
      title: "Machine-learning process",
      text: "The project uses a PyTorch convolutional network to process image features and join them with a 100-feature textual representation. Training images are resized to a cinematic 16:9 format and augmented through rotation, flipping and colour variation before the model learns to reconstruct and transform their combined information.",
    },
    {
      title: "Topics within the archive",
      text: "Topic analysis of the lecture material surfaced recurring clusters around data visualisation and Arduino, self and relationships, image systems and noise, convolution and information, and design, learning and space. These themes form a conceptual index of the artist’s studies rather than a manually written prompt.",
    },
    {
      title: "From MindPixel to later works",
      text: "The generated output became a foundation for later investigations including Digital Echoes. MindPixel established the central method: personal data can be treated as artistic material, and a machine-learning system can reveal unfamiliar visual relationships between knowledge and lived experience.",
    },
  ],
  MindScape: [
    {
      title: "Immersive memory environment",
      text: "MindScape combines artificial intelligence, personal photographs and Microsoft Kinect tracking to produce an interactive three-dimensional visual space. Instead of viewing memory as a fixed image, visitors move through and influence a field built from transformed photographic data.",
    },
    {
      title: "Image intelligence",
      text: "A convolutional neural network analyses the source photographs and reduces their image embeddings into coordinates suitable for a spatial composition. The resulting dataset becomes the structure of the visual environment, connecting machine interpretation with the emotional associations of the original images.",
    },
    {
      title: "Body-based interaction",
      text: "The work is built in Processing with KinectPV2, PeasyCam and ControlP5. A Kinect sensor reads the visitor’s body movement and allows them to navigate the particle-based 3D space. Interaction therefore happens through physical presence rather than a conventional mouse or touchscreen.",
    },
    {
      title: "Technical archive",
      text: "The surviving project record includes the Processing particle-cloud system, reduced image embeddings and data-conversion tools. Together they document how the photographic archive was translated from image files into a responsive spatial experience.",
    },
  ],
  "Aware (Exhibition)": [
    {
      title: "Exhibition version",
      text: "Visitors engage with a large-scale digital projection exploring awareness through interactive technology. Graphical content evolves in response to sequences entered on a number pad, unlocking visual and textual narratives that blend art and digital media.",
    },
    {
      title: "Collective interaction",
      text: "Every input changes the projection and becomes part of a larger, continually evolving digital tapestry. The installation shifts attention between individual choice and collective experience, asking participants to reflect on how they interact with both digital and physical worlds.",
    },
  ],
  Aware: [
    {
      title: "Interactive system",
      text: "Aware uses a deliberately familiar number-pad interface to control an immersive projection. Different sequences reveal changing graphic and textual states, making each visitor an active contributor to the work.",
    },
    {
      title: "Perception and participation",
      text: "The project examines awareness through the intersection of technology, art and human perception. Its evolving image field records successive actions, turning a private gesture into part of a shared spatial encounter.",
    },
    {
      title: "From lecture notes to word cloud",
      text: "Lecture-note PDFs are converted into text and divided into individual words. Repeated or meaningless terms are filtered before word embedding maps the remaining language into 300-dimensional vectors. Dimensionality reduction then prepares the data for a three-dimensional word cloud in Processing.",
    },
    {
      title: "Infinity-mirror form",
      text: "The original version places the interactive 3D word cloud inside an infinity-mirror box. Repeated reflections extend the generated language beyond the physical enclosure, turning an academic text database into an apparently limitless environment shaped by colour, scale and movement.",
    },
  ],
  EcoSyntax: [
    {
      title: "Image-led archive",
      text: "EcoSyntax is presented on the original portfolio as a generative creative-coding work from 2023. Its surviving public record is primarily visual: a dense field of coloured paths suggests an ecosystem whose meaning emerges from connection, overlap and continual change.",
    },
    {
      title: "Archive status",
      text: "The original project card linked to a longer external record that is no longer publicly readable. This portfolio therefore preserves the verified title, year, medium and artwork image while clearly separating surviving documentation from later curatorial interpretation.",
    },
  ],
  "The Blue Countdown": [
    {
      title: "Original statement",
      text: "The Blue Countdown represents the effects of rising temperatures on the Arctic. Wax polar bears slowly lose their form while the glacier beneath them melts into water, visualising an ecosystem warming at roughly twice the global average.",
    },
    {
      title: "Material behaviour",
      text: "The base is coated with thermochromic pigment that changes from white to blue when the ceramic heater is activated. As the wax melts, the sound of dripping water resembles a countdown timer. The work asks how much time remains—and what action is still possible before the process becomes irreversible.",
    },
  ],
  CAR: [
    {
      title: "Project idea",
      text: "CAR creates a playful interactive model car park. Six infrared sensors detect whether parking spaces are occupied and the display recommends the closest available position, beginning at P2 and continuing through P7 before displaying “All full.”",
    },
    {
      title: "Information design",
      text: "Because drivers have very little time to read a sign, the system does not present every sensor state equally. Its logic prioritises one clear recommendation, translating multiple live signals into the fastest useful instruction.",
    },
    {
      title: "Automated lift",
      text: "The original lift rotated continuously from a simple on/off control. Connecting its motor and infrared sensor to an Arduino allowed it to run only when a car crosses the detection point, adding responsive automation to the physical model.",
    },
  ],
  Digitdeath: [
    {
      title: "Memorial purpose",
      text: "Digitdeath is a web memorial for people who died during Hong Kong’s fifth wave of COVID-19. Conceived as a shared digital home, it creates a place for remembrance while asking society to reflect on the public-health crisis and prepare for future emergencies.",
    },
    {
      title: "Background",
      text: "During the fifth wave, hospitals were overloaded and many patients faced poor conditions without contact with relatives. The project responds to the helplessness visible in contemporary news images by creating a gathering place where those deaths can be acknowledged rather than reduced to statistics.",
    },
    {
      title: "Data and generative process",
      text: "Government COVID-19 statistics supplied the recorded death count. Layered pixel-art components were combined programmatically to generate more than 10,000 individual profile images, which are arranged into a large cemetery grid.",
    },
    {
      title: "User experience",
      text: "The website contains a homepage, background information and the cemetery. Its restrained visual language avoids spectacular effects: the mood remains deliberately heavy so visitors can focus on documentation, mourning and reflection.",
    },
  ],
  sweeTabot: [
    {
      title: "Project idea",
      text: "Inspired by a drinks dispenser, sweeTabot brings a small automated candy machine into the home. It is designed to organise snacks, reduce clutter and make a familiar storage object playful and convenient for users of any age.",
    },
    {
      title: "RFID interaction",
      text: "Each user receives a branded RFID card. An authorised card triggers a green light and commands a servo motor to release candy; an unrecognised card triggers a red light and the machine remains locked. The RFID interface replaces a conventional push button with a personalised interaction.",
    },
    {
      title: "Home automation context",
      text: "The project considers robotics as part of everyday life. Like washing machines and automated climate systems, the dispenser simplifies a domestic task while also functioning as a compact piece of furniture and a visible technological object.",
    },
  ],
  "60HKG Promotion Campaign": [
    {
      title: "Campaign system",
      text: "A branding and social-media package created for the 60th Hong Kong Scout anniversary. The original project includes the central identity, a YouTube channel banner and fixed-image Facebook and Instagram Story promotions.",
    },
  ],
  "Dictionary of Colour": [
    {
      title: "Book-cover concept",
      text: "The 125 × 170 mm cover uses cyan, magenta, yellow and black—the core colours of print—as its visual system. Their overlap suggests an infinite field of possible combinations, while four linked colour rings connect the CMYK system to the broader world of mixed colour.",
    },
    {
      title: "Locate your identity",
      text: "The phrase “Locate your identity” positions the book as more than a reference tool. Readers are invited to locate a creative identity within a complex colour field and select a palette that matches the intended tone, mood and meaning of a project.",
    },
    {
      title: "Design research",
      text: "Colour communicates emotion, atmosphere, function and identity across photography, illustration, installation and branding. The redesign argues for establishing a project name and palette early so later decisions remain coherent, much as a brand identity guides a consistent visual language.",
    },
  ],
  "Who Am I?": [
    {
      title: "Poster study",
      text: "Who Am I? is a typographic poster and identity exercise developed in Adobe Illustrator. The surviving original page presents the finished visual work without an extended written statement.",
    },
  ],
  "正確揀釘 營唔會飛": [
    {
      title: "Campaign concept",
      text: "This Cantonese-language campaign introduces two types of camping pegs sold by TRITON. Two “power-ranger” characters communicate the importance of choosing a peg suited to the ground and show what can happen when the wrong equipment is used.",
    },
    {
      title: "Background and objective",
      text: "As Hong Kong’s dense urban environment grew, outdoor activity became a way to escape pressure and pursue a healthier work-life balance. With more first-time campers, the project identifies tent safety—and correct peg selection—as a practical communication problem.",
    },
    {
      title: "Campaign outputs",
      text: "The work includes a 45-second promotional video designed for social media and print advertisements simulated in MTR stations. Together they distinguish the two products while raising general awareness of safe tent setup.",
    },
  ],
  ownvalue: [
    {
      title: "Situation and research",
      text: "ownvalue began with the artist’s experience of different pay levels among restaurant workers performing similar duties. It asks who establishes those differences, whether time and effort are valued consistently, and why salary becomes such a dominant measure of socioeconomic worth.",
    },
    {
      title: "Participatory campaign",
      text: "Participants answer a direct question: “How much do you think you are valued at in your workplace?” Entering an hourly value forces consideration of age, education, experience and social expectations. The work does not promise a correct number; it makes the standards behind that number visible.",
    },
    {
      title: "Interview outcomes",
      text: "Responses ranged from HK$55 per hour to more than HK$100. One participant connected HK$60 per hour with being a fresh graduate. These answers reveal that people carry internal standards for valuing themselves, even when the origin of those standards is difficult to explain.",
    },
  ],
  "Capturing Time": [
    {
      title: "Creative idea",
      text: "Capturing Time proposes that time should be quantified and visualised as clearly as money. The project creates “one second of water”—a physical unit captured, stored, compressed, measured or spent through different materials and photographic actions.",
    },
    {
      title: "Production",
      text: "Wooden sticks, plates and sponge were used to absorb and contain water released over one second. The resulting objects make a duration tangible and form the basis of works titled Time in Wallet, Tower of Time, Compression of Time, Burning Time and Measuring Time.",
    },
    {
      title: "Show Time exhibition proposal",
      text: "The exhibition was designed for Hysan Place and Lee Theatre in Causeway Bay. A shopping centre connects time and money directly: visitors spend both while moving through the space. Installing the photographs in its busy central lobby would place the project inside that everyday exchange.",
    },
  ],
  "Protect Hongkonger": [
    {
      title: "Exhibition proposal",
      text: "Protect Hongkonger is an art, anthropology and sociology project proposing an exhibition of iconic toys from different stages of Hong Kong’s social development. It treats toys as material culture and collective memory through which the identity and core values of Hongkongers can be maintained.",
    },
    {
      title: "Community collaboration",
      text: "The proposal invites the Sham Shui Po vintage shop thegoodthebad&thecreative (雅俗共想) to contribute objects and knowledge. The shop’s collections, the artist’s film photographs of its environment and direct interaction with its staff connect museum display to a living local archive.",
    },
    {
      title: "Three-part structure",
      text: "The exhibition contains a timeline of Hong Kong toys and social change, a photographic portrait of the vintage shop, and a display of objects selected from its collection. Paper, tin, plastic, vehicle, film-related, doll and stuffed toys trace changing design and everyday life.",
    },
    {
      title: "Proposed venue",
      text: "Designed as a simulation for the Hong Kong Museum of Art, the exhibition combines explanatory boards, chronological displays, a promotional poster and a dedicated shop presentation. Its objective is to protect collective memory by encouraging visitors to recognise, discuss and inherit local material culture.",
    },
  ],
  "Enchanted Landscape": [
    {
      title: "Original archive note",
      text: "A photographic series examining buildings as an enchanted landscape and the city as a concrete forest. The original project page is image-led and records the themes “building,” “photography” and “concrete forest.”",
    },
  ],
  "Indecisive Moment": [
    {
      title: "Original archive note",
      text: "A COVID-era photographic series organised around hesitation and the indecisive moment. The original project page presents the photographs without a longer written statement.",
    },
  ],
  Film: [
    {
      title: "Original archive note",
      text: "An ongoing collection of daily observations made on film between 2020 and 2022. The original project is intentionally image-led.",
    },
  ],
  "Night City": [
    {
      title: "Original archive note",
      text: "A photographic study of artificial light and urban atmosphere at night, originally accompanied by a slideshow video. The archive identifies the themes “night city,” “light city” and “photography.”",
    },
  ],
  "I Am the Son of the Sun": [
    {
      title: "Statement",
      text: "Inspired by “Ode to the Sun,” the work treats the sun as a god and the performer as one of its sons. Repeated physical salutations mirror repeated language in a poem and demonstrate sincerity, mindfulness and loyalty beneath the sun.",
    },
    {
      title: "Three movements",
      text: "The first movement is a bodily salute. The second internalises devotion through mindful attention beneath the sun. The third extends the address outward, reminding other people to recognise and offer their own ode to the sun.",
    },
  ],
  Spaghetti: [
    {
      title: "Production credit",
      text: "A collaborative video production. Wong Chun Sunny worked as boom operator and production assistant. The original archive page contains the completed moving image and production role rather than an extended artist statement.",
    },
  ],
  "布達佩斯 / Budapest": [
    {
      title: "Production credit",
      text: "A collaborative video production for which Wong Chun Sunny served as production assistant and boom operator, and contributed the draft video edit. The original archive page records these roles alongside the finished work.",
    },
  ],
};

const videoByTitle: Record<string, ProjectVideo> = {
  "Scanned Memories": {
    youtubeId: "AILqiTSOSW4",
    title: "Scanned Memories process",
    kind: "Process film",
  },
  MemoryGrid: {
    youtubeId: "zm12B8OHP_Q",
    title: "ArtSense: MemoryGrid",
    kind: "Artwork film",
  },
  "Aware (Exhibition)": {
    youtubeId: "cUj9yXOKMcg",
    title: "Aware — exhibition version",
    kind: "Documentation",
  },
  "布達佩斯 / Budapest": {
    youtubeId: "KG09yb2sTfc",
    title: "布達佩斯",
    kind: "Artwork film",
  },
  CAR: {
    youtubeId: "VWzUvAR9_BI",
    title: "CAR — demo video",
    kind: "Documentation",
  },
  "I Am the Son of the Sun": {
    youtubeId: "6bpJPuAMy-c",
    title: "I Am the Son of the Sun — Ode to the Sun",
    kind: "Artwork film",
  },
  ownvalue: {
    youtubeId: "kJhXQMtfb-o",
    title: "ownvalue — full record",
    kind: "Documentation",
  },
  "正確揀釘 營唔會飛": {
    youtubeId: "joseXNOdMv8",
    title: "正確揀釘 營唔會飛 — TVC",
    kind: "Artwork film",
  },
  Spaghetti: {
    youtubeId: "0VDvqKqXYdw",
    title: "Spaghetti",
    kind: "Artwork film",
  },
  "Night City": {
    youtubeId: "5LVQepVxgHQ",
    title: "Night City — slideshow project",
    kind: "Artwork film",
  },
  Digitdeath: {
    youtubeId: "pxGxF_v1bk4",
    title: "Digitdeath",
    kind: "Artwork film",
  },
  sweeTabot: {
    youtubeId: "VRpoQwF1XvY",
    title: "sweeTabot — demo video",
    kind: "Documentation",
  },
  "Capturing Time": {
    youtubeId: "ogPW-hIcUao",
    title: "Capturing Time — making process",
    kind: "Process film",
  },
};

const readyLoopGallery = [
  { image: "/technology/readyloop/1.webp", alt: "ReadyLoop presentation cover introducing AI-supported IB Design Technology learning before fabrication.", caption: "Project identity and AIREA 2026 presentation" },
  { image: "/technology/readyloop/2.webp", alt: "Workshop scene surrounded by examples of common laser-cutting and fabrication file problems.", caption: "The workshop problem: errors surface too late" },
  { image: "/technology/readyloop/3.webp", alt: "Student using a laptop with a fabrication dashboard during an independent learning moment.", caption: "The hidden learning moment before fabrication" },
  { image: "/technology/readyloop/4.webp", alt: "Three-stage workflow showing a Google Form, spreadsheet and AI-assisted Design Technology jobs dashboard.", caption: "Evolution from request form to learning system" },
  { image: "/technology/readyloop/5.webp", alt: "Diagram showing how ReadyLoop integrates learning tools, teaching methods, curriculum concepts, online learning, submissions and reflection.", caption: "AI integrated into pedagogy—not added as a chatbot" },
  { image: "/technology/readyloop/6.webp", alt: "Five-step ReadyLoop learning cycle: Learn, Check, Submit, Revise and Reflect.", caption: "The core learning loop" },
  { image: "/technology/readyloop/7.webp", alt: "ReadyLoop student interface showing one clear next move and a five-stage learning path.", caption: "A calm, student-facing learning path" },
  { image: "/technology/readyloop/8.webp", alt: "ReadyLoop AI Coach interface with short questions and quick concept checks.", caption: "Short questions become revision moments" },
  { image: "/technology/readyloop/9.webp", alt: "ReadyLoop AI Coach explaining open paths while refusing to approve a fabrication file.", caption: "AI explains; humans approve" },
  { image: "/technology/readyloop/10.webp", alt: "ReadyLoop system diagram connecting student, teacher, technician and administrator roles.", caption: "One learning loop, four coordinated roles" },
  { image: "/technology/readyloop/11.webp", alt: "Responsible AI diagram listing what the AI Coach can support and what remains a human decision.", caption: "Bounded AI with human oversight" },
  { image: "/technology/readyloop/12.webp", alt: "ReadyLoop development workflow using ChatGPT, Codex, Google Apps Script and GitHub.", caption: "AI-assisted development and open-source delivery" },
  { image: "/technology/readyloop/13.webp", alt: "ReadyLoop release status showing a working public demo and school deployment gates.", caption: "Working demo with responsible deployment gates" },
  { image: "/technology/readyloop/14.webp", alt: "Diagram showing how the ReadyLoop pattern can extend to six project-based learning disciplines.", caption: "A scalable pattern for project-based learning" },
  { image: "/technology/readyloop/15.webp", alt: "ReadyLoop project summary poster with student, teacher, technician and administrator benefits.", caption: "Project summary and public demo" },
  { image: "/technology/readyloop/16.webp", alt: "ReadyLoop project poster describing AI-guided Design Technology learning before fabrication.", caption: "ReadyLoop: from potential errors to reflective improvement" },
];

const filters = ["All", "Photography", "Installation", "Creative Coding", "Moving Image", "Graphic", "Research & Experiments"] as const;
type Filter = (typeof filters)[number];
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
  const [filter, setFilter] = useState<Filter>("All");
  const [showArchive, setShowArchive] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [readyLoopOpen, setReadyLoopOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const dialogRef = useRef<HTMLDivElement>(null);
  const dialogPanelRef = useRef<HTMLDivElement>(null);
  const readyLoopDialogRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const lastLightboxTriggerRef = useRef<HTMLElement | null>(null);
  const archivePool = showArchive ? projects : projects.filter((project) => featuredTitles.has(project.title));
  const visible = filter === "All"
    ? archivePool
    : archivePool.filter((project) => project.medium === (filter === "Research & Experiments" ? "Other" : filter));
  const selectedIndex = selected ? projects.findIndex((project) => project.title === selected.title) : -1;
  const selectedGallery = selected
    ? galleryByTitle[selected.title] ?? [selected.image]
    : [];
  const selectedArchiveNarrative = selected
    ? archiveNarrativeByTitle[selected.title] ?? []
    : [];
  const selectedVideo = selected ? videoByTitle[selected.title] : undefined;

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

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;
    event.currentTarget.style.setProperty("--pointer-x", `${x}%`);
    event.currentTarget.style.setProperty("--pointer-y", `${y}%`);
    event.currentTarget.style.setProperty("--pointer-shift-x", String((x - 50) / 50));
    event.currentTarget.style.setProperty("--pointer-shift-y", String((y - 50) / 50));
  };

  useEffect(() => {
    document.body.style.overflow = selected || readyLoopOpen ? "hidden" : "";
    if (selected) {
      window.requestAnimationFrame(() => {
        dialogPanelRef.current?.scrollTo({ top: 0 });
        dialogRef.current?.focus({ preventScroll: true });
      });
    }
    if (readyLoopOpen) {
      window.requestAnimationFrame(() => readyLoopDialogRef.current?.focus({ preventScroll: true }));
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [readyLoopOpen, selected]);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 34);
        const sectionIds = ["work", "technology", "practice", "exhibitions", "about", "contact"];
        let currentSection = "top";
        for (const id of sectionIds) {
          const section = document.getElementById(id);
          if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.42) {
            currentSection = id;
          }
        }
        setActiveSection(currentSection);
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
        document.documentElement.style.setProperty("--page-progress", String(progress));
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [filter]);

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
      if (event.key === "Escape" && menuOpen) setMenuOpen(false);
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
  }, [closeLightbox, closeProject, closeReadyLoop, lightboxIndex, menuOpen, moveLightbox, moveProject, readyLoopOpen, selected]);

  return (
    <>
      <a className="skip-link" href="#work">Skip to selected work</a>
      <div className="scroll-line" aria-hidden="true" />
      <main id="content" onPointerMove={handlePointerMove}>
      <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
        <a className="wordmark" href="#top" aria-label="WCCHUN home">
          WC<span>CHUN</span>
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
            ["work", "Work"],
            ["technology", "Technology & Education"],
            ["practice", "Practice"],
            ["exhibitions", "Exhibitions"],
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
        <div className="hero-title" aria-label="Memory becomes material">
          <span>Memory</span>
          <span>Becomes</span>
          <span>Material</span>
        </div>
        <button
          className="hero-thumbnail intro-motion delay-4"
          type="button"
          onClick={() => openProject(projects[1])}
          aria-label="Open Digital Echoes project"
          aria-haspopup="dialog"
        >
          <Image
            src={assetPath(projects[1].image)}
            alt={projects[1].alt}
            width={720}
            height={960}
            priority
            unoptimized
          />
        </button>
        <button
          className="hero-artwork intro-motion delay-5"
          type="button"
          onClick={() => openProject(projects[1])}
          aria-label="Open Digital Echoes project"
          aria-haspopup="dialog"
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
        </button>
        <div className="hero-intro intro-motion delay-6">
          <p className="eyebrow">Art × technology × memory</p>
          <p>
            Wong Chun (Sunny) is a Hong Kong artist and creative technologist working across
            computational images, interactive systems and learning technology.
          </p>
          <a className="archive-cta" href="#work">Enter the archive <span>↘</span></a>
        </div>
        <p className="hero-scroll">Scroll / 01—06</p>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{showArchive ? "Complete visual archive" : "A focused entry point"}</p>
            <h2>{showArchive ? "Art archive" : "Featured art"}</h2>
          </div>
          <p aria-live="polite">{String(visible.length).padStart(2, "0")} works {showArchive ? "retained" : "selected"}</p>
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
              className={`project-card reveal ${project.featured ? "featured" : ""}`}
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
              </button>
            </article>
          ))}
        </div>
        <div className="archive-switch">
          <p>
            {showArchive
              ? "Showing the complete chronology from current practice to early experiments."
              : "Continue into the full chronology of 29 artworks, studies and experiments."}
          </p>
          <button
            type="button"
            onClick={() => {
              setFilter("All");
              setShowArchive((current) => !current);
            }}
            aria-expanded={showArchive}
          >
            {showArchive ? "Return to featured art ↑" : "View complete archive →"}
          </button>
        </div>
      </section>

      <section className="technology" id="technology">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Systems with real-world consequence</p>
            <h2>Technology &amp;<br />education</h2>
          </div>
          <p>03 applied case studies</p>
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
              impact: "Outstanding Innovation & Creativity Award · AIREA 2026",
              caseStudy: true,
            },
            {
              index: "02",
              title: "DT Fabrication Dashboard",
              subtitle: "A school-wide production workflow for Years 6–12",
              statement:
                "A live operational system for student submissions, technician review, teacher visibility and fabrication coordination across 3D printing, laser cutting and workshop production.",
              meta: ["System design", "Workflow automation", "Digital fabrication"],
              impact: "1,500+ student fabrication requests supported",
              caseStudy: false,
            },
            {
              index: "03",
              title: "Robotics & Physical Computing",
              subtitle: "Team development, prototyping and technical learning",
              statement:
                "Hands-on work spanning VEX Robotics, mechanical design, programming, electronics, testing and competition preparation—supported by calm coaching and iterative engineering practice.",
              meta: ["VEX Robotics", "Arduino", "Micro:bit · Raspberry Pi"],
              impact: "Secondary Robotics ASA Teams Coordinator · 2026",
              caseStudy: false,
            },
          ].map((project) => (
            <article className={`technology-card ${project.caseStudy ? "has-case-study" : ""}`} key={project.title}>
              <div className="technology-card-top">
                <span>{project.index}</span>
                <span>{project.caseStudy ? "Full case study" : "Applied practice"}</span>
              </div>
              {project.caseStudy && (
                <button
                  className="technology-preview"
                  type="button"
                  onClick={openReadyLoop}
                  aria-label="Open the complete ReadyLoop case study"
                  aria-haspopup="dialog"
                >
                  <Image
                    src={assetPath("/technology/readyloop/15.webp")}
                    alt="ReadyLoop case-study overview showing its learning platform and fabrication workflow."
                    width={1920}
                    height={1080}
                    sizes="(max-width: 900px) 90vw, 31vw"
                    unoptimized
                  />
                  <span>Open case study ↗</span>
                </button>
              )}
              <h3>{project.title}</h3>
              <p className="technology-subtitle">{project.subtitle}</p>
              <p className="technology-statement">{project.statement}</p>
              <ul aria-label={`${project.title} capabilities`}>
                {project.meta.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p className="technology-impact">{project.impact}</p>
              {project.caseStudy && (
                <button className="technology-case-link" type="button" onClick={openReadyLoop}>
                  View process, evidence and interface →
                </button>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="recognition" aria-label="Selected recognition and impact">
        {[
          ["Award", "AIREA 2026", "Outstanding Innovation & Creativity"],
          ["Exhibitions", "2025—2026", "Collect Hong Kong Art Fair"],
          ["Impact", "1,500+", "Fabrication submissions supported"],
          ["Education", "CityU SCM", "New Media graduate"],
        ].map(([label, value, detail]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <p>{detail}</p>
          </article>
        ))}
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
            ["2026", "Collect Hong Kong Art Fair", "Light Trace: Scanned Memories", "Hong Kong"],
            ["2025", "Collect Hong Kong Art Fair", "Digital Echoes", "Hong Kong"],
            ["2024", "The Unseen Realm", "Digital Echoes · CityU SCM Cameraless Photography Exhibition", "Hong Kong"],
            ["2024", "CityU SCM Annual Show", "Scanned Memories", "Hong Kong"],
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

      <section className="about" id="about">
        <div className="about-heading">
          <p className="eyebrow">About / Wong Chun (Sunny)</p>
          <h2>Artist, technologist<br />and educator.</h2>
        </div>
        <div className="about-body">
          <p>
            Wong Chun (Sunny) is a Hong Kong artist and creative technologist working across
            computational images, interactive installation and learning technology. His practice
            explores how memory, language and human experience are transformed through digital systems.
          </p>
          <p>
            He is a Design Technology Technician and Secondary Robotics ASA Teams Coordinator at
            Victoria Shanghai Academy. His applied practice includes ReadyLoop, fabrication workflow
            systems supporting more than 1,500 student requests, robotics and responsible AI in
            education. He holds a BAS in New Media from City University of Hong Kong and begins the
            MSc in Technology, Design and Leadership for Learning at the University of Hong Kong in 2026.
          </p>
          <dl>
            <div><dt>Education</dt><dd>CityU BAS New Media · HKU MSc(TDLL), 2026—2028</dd></div>
            <div><dt>Capabilities</dt><dd>Creative coding · AI · Robotics · CAD/CAM · Digital fabrication</dd></div>
            <div><dt>Languages</dt><dd>Cantonese · English · Mandarin</dd></div>
          </dl>
        </div>
      </section>

      <footer id="contact">
        <p className="eyebrow">Available for exhibitions · creative-technology collaborations · educational projects</p>
        <h2>Let&apos;s make the unseen <em>visible.</em></h2>
        <div className="footer-links">
          <a href="mailto:wcchun1234@gmail.com">
            Start a conversation ↗
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
              <article><span>Operational evidence</span><strong>1,500+</strong><p>owner-reported student fabrication requests handled by the underlying workflow</p></article>
              <article><span>Release validation</span><strong>497 / 0</strong><p>tests passed / failed in the documented public demo release</p></article>
              <article><span>Recognition</span><strong>AIREA 2026</strong><p>Outstanding Innovation &amp; Creativity Award</p></article>
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
                      width={1920}
                      height={1080}
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
