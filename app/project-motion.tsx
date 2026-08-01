"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactNode, useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ProjectMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;
    root.classList.add("is-gsap-ready");
    const media = gsap.matchMedia();

    media.add(
      {
        isDesktop: "(min-width: 900px)",
        isMobile: "(max-width: 899px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop, reduceMotion } = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
          reduceMotion: boolean;
        };
        const hero = root.querySelector<HTMLElement>(".project-page-hero");
        const heroImage = root.querySelector<HTMLElement>(".project-page-image img");
        const entrance = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll(".project-page-nav, .project-breadcrumb, .project-section-nav, .project-page-hero > p, .project-page-hero h1, .project-page-hero h2, .project-page-image"),
        );

        if (reduceMotion) {
          gsap.set(entrance, { autoAlpha: 1, clearProps: "transform,clipPath" });
          return;
        }

        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        timeline
          .fromTo(entrance.slice(0, 3), { autoAlpha: 0, y: -10 }, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.07 })
          .fromTo(entrance.slice(3, 6), { autoAlpha: 0, y: isDesktop ? 42 : 22 }, { autoAlpha: 1, y: 0, duration: 0.78, stagger: 0.08 }, 0.12)
          .fromTo(
            entrance[6],
            { autoAlpha: 0, y: 28, clipPath: "inset(0 0 100% 0)" },
            { autoAlpha: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.92 },
            0.34,
          );

        if (hero && heroImage) {
          gsap.fromTo(
            heroImage,
            { scale: isDesktop ? 1.055 : 1.025 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: isDesktop ? 0.75 : 0.4,
                invalidateOnRefresh: true,
              },
            },
          );
        }

        const sections = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll(".project-page-intro, .project-page-facts, .project-page-credits, .project-page-process, .project-page-links, .related-projects, .project-pagination, .project-page-footer"),
        );
        sections.forEach((section) => {
          const children = gsap.utils.toArray<HTMLElement>(section.children);
          gsap.fromTo(
            children,
            { opacity: 0, y: isDesktop ? 34 : 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.72,
              stagger: 0.07,
              ease: "power3.out",
              clearProps: "transform,opacity",
              scrollTrigger: { trigger: section, start: "clamp(top 88%)", once: true },
            },
          );
        });

        const figures = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".project-page-gallery figure"));
        figures.forEach((figure, index) => {
          const image = figure.querySelector<HTMLElement>("img");
          const itemTimeline = gsap.timeline({
            scrollTrigger: { trigger: figure, start: "clamp(top 90%)", once: true },
          });
          itemTimeline.fromTo(
            figure,
            { opacity: 0, y: isDesktop ? 38 : 18, clipPath: index % 2 === 0 ? "inset(0 0 100% 0)" : "inset(0 100% 0 0)" },
            { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.82, ease: "power3.out", clearProps: "transform,opacity,clipPath" },
          );
          if (image) itemTimeline.fromTo(image, { scale: isDesktop ? 1.08 : 1.04 }, { scale: 1, duration: 1, ease: "power3.out", clearProps: "transform" }, 0);
        });
      },
    );

    let active = true;
    const refresh = () => active && ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh, { once: true });
    return () => {
      active = false;
      media.revert();
      window.removeEventListener("load", refresh);
      root.classList.remove("is-gsap-ready");
    };
  }, { scope: rootRef });

  return <div className="project-motion-root" ref={rootRef}>{children}</div>;
}
