"use client";

import { useEffect, useState } from "react";

const sections = [["overview", "Overview"], ["role", "Framework"], ["process", "Process"], ["gallery", "Gallery"]] as const;

export function ProjectSectionNav() {
  const [active, setActive] = useState("overview");
  useEffect(() => {
    const nodes = sections.map(([id]) => document.getElementById(id)).filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (current?.target.id) setActive(current.target.id);
    }, { rootMargin: "-20% 0px -62% 0px", threshold: [0.01, 0.2, 0.5] });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return (
    <nav className="project-section-nav" aria-label="Project sections">
      {sections.map(([id, label]) => (
        <a href={`#${id}`} className={active === id ? "is-active" : ""} aria-current={active === id ? "location" : undefined} key={id}>{label}</a>
      ))}
    </nav>
  );
}
