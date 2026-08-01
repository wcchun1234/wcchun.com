"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject, useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, Flip);

const INTRO_SESSION_KEY = "wcchun-cinematic-intro-viewed";

type PortfolioMotionOptions = {
  scope: RefObject<HTMLElement | null>;
  filterKey: string;
  showArchive: boolean;
  menuOpen: boolean;
  dialogKey: string;
  onScrolledChange: (scrolled: boolean) => void;
  onSectionChange: (section: string) => void;
  onTechnologyChange: (technology: string) => void;
};

type MotionConditions = {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  canHover: boolean;
  reduceMotion: boolean;
};

const select = <T extends Element>(root: Element, selector: string) =>
  root.querySelector<T>(selector);

const selectAll = <T extends Element>(root: Element, selector: string) =>
  gsap.utils.toArray<T>(root.querySelectorAll<T>(selector));

function initNavigationState(
  root: HTMLElement,
  onScrolledChange: (scrolled: boolean) => void,
  onSectionChange: (section: string) => void,
) {
  ScrollTrigger.create({
    id: "portfolio-header-state",
    start: 34,
    end: "max",
    onEnter: () => onScrolledChange(true),
    onLeaveBack: () => onScrolledChange(false),
  });

  ScrollTrigger.create({
    id: "portfolio-progress",
    start: 0,
    end: "max",
    onUpdate: (self) => {
      document.documentElement.style.setProperty("--page-progress", String(self.progress));
    },
  });

  const sections = selectAll<HTMLElement>(
    root,
    "#recognition, #work, #technology, #tools, #practice, #exhibitions, #about, #contact",
  );

  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top 42%",
      end: "bottom 42%",
      onEnter: () => onSectionChange(section.id),
      onEnterBack: () => onSectionChange(section.id),
      onLeaveBack: section.id === "recognition" ? () => onSectionChange("top") : undefined,
    });
  });
}

function initHeroAnimation(root: HTMLElement, conditions: MotionConditions) {
  const header = select<HTMLElement>(root, ".site-header");
  const titleLines = selectAll<HTMLElement>(root, ".hero-title-line > span");
  const artwork = select<HTMLElement>(root, ".hero-artwork");
  const artworkImage = select<HTMLElement>(root, ".hero-artwork img");
  const thumbnail = select<HTMLElement>(root, ".hero-thumbnail");
  const intro = select<HTMLElement>(root, ".hero-intro");
  const scrollNote = select<HTMLElement>(root, ".hero-scroll");

  if (!header || !artwork || !artworkImage || !intro || titleLines.length === 0) return;

  const entranceTargets = [header, ...titleLines, artwork, intro, scrollNote, thumbnail].filter(Boolean);
  if (conditions.reduceMotion) {
    gsap.set(entranceTargets, { autoAlpha: 1, clearProps: "transform,clipPath" });
    return;
  }

  let playFullIntro = true;
  try {
    playFullIntro = sessionStorage.getItem(INTRO_SESSION_KEY) !== "true";
    sessionStorage.setItem(INTRO_SESSION_KEY, "true");
  } catch {
    // The animation remains functional if session storage is unavailable.
  }

  const introTimeline = gsap.timeline({
    defaults: { ease: "power3.out" },
  });

  gsap.set(artwork, { transformOrigin: "50% 55%" });
  gsap.set(artworkImage, { transformOrigin: "50% 50%" });

  if (playFullIntro) {
    introTimeline
      .fromTo(header, { autoAlpha: 0, y: -16 }, { autoAlpha: 1, y: 0, duration: 0.65 })
      .fromTo(
        titleLines,
        { autoAlpha: 0, yPercent: 112, scale: 0.975 },
        { autoAlpha: 1, yPercent: 0, scale: 1, duration: conditions.isMobile ? 0.68 : 0.9, stagger: 0.085 },
        0.12,
      )
      .fromTo(
        artwork,
        { autoAlpha: 0, y: conditions.isMobile ? 26 : 48, scale: 0.985, clipPath: "inset(0 0 100% 0)" },
        { autoAlpha: 1, y: 0, scale: 1, clipPath: "inset(0 0 0% 0)", duration: conditions.isMobile ? 0.82 : 1.05 },
        0.34,
      )
      .fromTo(
        [thumbnail, intro].filter(Boolean),
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.68, stagger: 0.12 },
        0.66,
      )
      .fromTo(scrollNote, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45 }, 0.94);
  } else {
    introTimeline
      .fromTo(titleLines, { autoAlpha: 0, yPercent: 28 }, { autoAlpha: 1, yPercent: 0, duration: 0.42, stagger: 0.045 })
      .fromTo(
        [header, artwork, thumbnail, intro, scrollNote].filter(Boolean),
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.04 },
        0.05,
      );
  }

  const heroTimeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      id: "portfolio-hero-depth",
      trigger: ".figma-hero",
      start: "top top",
      end: "bottom top",
      scrub: conditions.isDesktop ? 0.8 : 0.45,
      invalidateOnRefresh: true,
    },
  });

  heroTimeline
    .fromTo(
      artworkImage,
      { scale: conditions.isMobile ? 1.025 : 1.055 },
      { scale: 1, transformOrigin: "50% 50%" },
      0,
    )
    .to(titleLines, { yPercent: conditions.isMobile ? -2.5 : -7, stagger: 0.018 }, 0)
    .to(intro, { yPercent: conditions.isMobile ? -3 : -10, autoAlpha: conditions.isMobile ? 0.9 : 0.72 }, 0);

  if (thumbnail && !conditions.isMobile) {
    heroTimeline.to(thumbnail, { yPercent: 14 }, 0);
  }
}

function revealTimeline(trigger: HTMLElement, targets: Element[], distance: number, stagger = 0.08) {
  if (targets.length === 0) return;
  gsap.fromTo(
    targets,
    { opacity: 0, y: distance },
    {
      opacity: 1,
      y: 0,
      duration: 0.78,
      ease: "power3.out",
      stagger,
      clearProps: "transform,opacity",
      scrollTrigger: {
        trigger,
        start: "clamp(top 86%)",
        once: true,
      },
    },
  );
}

function revealMediaGroup(trigger: HTMLElement, figures: HTMLElement[], distance: number) {
  figures.forEach((figure, index) => {
    const image = select<HTMLElement>(figure, "img");
    const direction = index % 2 === 0 ? 1 : -1;
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: figure,
        start: "clamp(top 88%)",
        once: true,
      },
    });

    timeline.fromTo(
      figure,
      {
        opacity: 0,
        x: direction * Math.min(distance, 24),
        y: distance,
        clipPath: `inset(${index % 3 === 0 ? "0 0 100% 0" : "0 100% 0 0"})`,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        clipPath: "inset(0 0 0% 0)",
        duration: 0.82,
        ease: "power3.out",
        clearProps: "transform,opacity,clipPath",
      },
    );
    if (image) {
      timeline.fromTo(
        image,
        { scale: 1.075 },
        { scale: 1, duration: 1.05, ease: "power3.out", clearProps: "transform" },
        0,
      );
    }
  });
}

function initArtworkReveals(root: HTMLElement, conditions: MotionConditions) {
  if (conditions.reduceMotion) {
    gsap.set(
      selectAll(root, ".recognition a, .technology-card, .tool-card, .practice-pillars article, .exhibition-list article, .about-practice-strip figure"),
      { autoAlpha: 1, clearProps: "transform,clipPath" },
    );
    return;
  }

  const distance = conditions.isMobile ? 18 : conditions.isTablet ? 28 : 42;
  const recognition = select<HTMLElement>(root, "#recognition");
  if (recognition) revealTimeline(recognition, selectAll(recognition, "a"), distance, 0.09);

  const editorialSections = selectAll<HTMLElement>(
    root,
    "#work, #technology, #tools, #practice, #exhibitions, #about, #contact",
  );
  editorialSections.forEach((section) => {
    const headings = selectAll(
      section,
      ":scope > .section-heading > *, :scope > .tools-heading > *, :scope > .practice-copy > *, :scope > .about-heading > *, :scope > .eyebrow, :scope > h2",
    );
    revealTimeline(section, headings, distance, 0.075);
  });

  const technology = select<HTMLElement>(root, "#technology");
  if (technology) {
    const intro = selectAll(technology, ".technology-intro > *, .technology-active-label > *");
    revealTimeline(technology, intro, distance, 0.08);
    revealMediaGroup(technology, selectAll(technology, ".technology-card"), distance);
  }

  const tools = select<HTMLElement>(root, "#tools");
  if (tools) revealMediaGroup(tools, selectAll(root, ".tool-card"), distance * 0.75);

  const practice = select<HTMLElement>(root, "#practice");
  if (practice) {
    revealTimeline(practice, selectAll(practice, ".practice-index > div, .practice-pillars article, .curator-tools"), distance, 0.075);
  }

  const exhibitions = select<HTMLElement>(root, "#exhibitions");
  if (exhibitions) revealTimeline(exhibitions, selectAll(exhibitions, ".exhibition-list article"), distance, 0.065);

  const about = select<HTMLElement>(root, "#about");
  if (about) {
    revealTimeline(about, selectAll(about, ".about-body > *"), distance, 0.08);
    revealMediaGroup(about, selectAll(about, ".about-practice-strip figure"), distance * 0.7);
  }
}

function initTechnologyNarrative(
  root: HTMLElement,
  onTechnologyChange: (technology: string) => void,
) {
  selectAll<HTMLElement>(root, "[data-technology-case]").forEach((card) => {
    const technology = card.dataset.technologyCase;
    if (!technology) return;
    ScrollTrigger.create({
      trigger: card,
      start: "top 58%",
      end: "bottom 42%",
      onEnter: () => onTechnologyChange(technology),
      onEnterBack: () => onTechnologyChange(technology),
    });
  });
}

function initProjectCardInteractions(root: HTMLElement, canHover: boolean) {
  const cleanups: Array<() => void> = [];
  const cards = selectAll<HTMLElement>(root, ".project-card");

  cards.forEach((card) => {
    const image = select<HTMLElement>(card, ".project-image img");
    const metadata = selectAll<HTMLElement>(card, ".project-meta > span");
    const cue = select<HTMLElement>(card, ".view-project");
    if (!image) return;

    const enter = () => {
      image.style.willChange = "transform";
      gsap.to(image, { scale: 1.045, duration: 0.52, ease: "power3.out", overwrite: "auto" });
      gsap.to(metadata, { x: 4, duration: 0.38, ease: "power3.out", stagger: 0.025, overwrite: "auto" });
      if (cue) gsap.to(cue, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
    };
    const leave = () => {
      gsap.to(image, {
        scale: 1,
        duration: 0.56,
        ease: "power3.out",
        overwrite: "auto",
        onComplete: () => image.style.removeProperty("will-change"),
      });
      gsap.to(metadata, { x: 0, duration: 0.38, ease: "power3.out", stagger: 0.02, overwrite: "auto" });
      if (cue) gsap.to(cue, { autoAlpha: 0, y: 8, duration: 0.24, ease: "power2.out", overwrite: "auto" });
    };
    const onFocusOut = (event: FocusEvent) => {
      if (!card.contains(event.relatedTarget as Node | null)) leave();
    };

    if (canHover) {
      card.addEventListener("pointerenter", enter);
      card.addEventListener("pointerleave", leave);
    }
    card.addEventListener("focusin", enter);
    card.addEventListener("focusout", onFocusOut);
    cleanups.push(() => {
      card.removeEventListener("pointerenter", enter);
      card.removeEventListener("pointerleave", leave);
      card.removeEventListener("focusin", enter);
      card.removeEventListener("focusout", onFocusOut);
    });
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}

function initProjectCardReveals(root: HTMLElement, reduceMotion: boolean, isMobile: boolean) {
  const cards = selectAll<HTMLElement>(root, ".project-card");
  if (reduceMotion) {
    gsap.set(cards, { autoAlpha: 1, clearProps: "transform,clipPath" });
    return;
  }

  cards.forEach((card, index) => {
    if (card.dataset.motionRevealed === "true") return;
    card.dataset.motionRevealed = "true";
    const imageFrame = select<HTMLElement>(card, ".project-image");
    const image = select<HTMLElement>(card, ".project-image img");
    const metadata = selectAll<HTMLElement>(card, ".project-meta > span");
    const direction = index % 3 === 1 ? 1 : -1;
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "clamp(top 88%)",
        once: true,
      },
    });

    timeline.fromTo(
      card,
      { opacity: 0, x: isMobile ? 0 : direction * 18, y: isMobile ? 18 : 34 },
      { opacity: 1, x: 0, y: 0, duration: 0.72, ease: "power3.out", clearProps: "transform,opacity" },
    );
    if (imageFrame) {
      timeline.fromTo(
        imageFrame,
        { clipPath: index % 2 === 0 ? "inset(0 0 100% 0)" : "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "power3.inOut", clearProps: "clipPath" },
        0,
      );
    }
    if (image) {
      timeline.fromTo(image, { scale: isMobile ? 1.045 : 1.085 }, { scale: 1, duration: 0.95, ease: "power3.out", clearProps: "transform" }, 0);
    }
    timeline.fromTo(
      metadata,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.42, ease: "power2.out", stagger: 0.04, clearProps: "transform,opacity" },
      0.38,
    );
  });
}

export function usePortfolioMotion({
  scope,
  filterKey,
  showArchive,
  menuOpen,
  dialogKey,
  onScrolledChange,
  onSectionChange,
  onTechnologyChange,
}: PortfolioMotionOptions) {
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null);

  const captureProjectGrid = () => {
    const root = scope.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = selectAll<HTMLElement>(root, ".project-card");
    if (cards.length) flipState.current = Flip.getState(cards, { props: "opacity" });
  };

  useGSAP(() => {
    const root = scope.current;
    if (!root) return;
    root.classList.add("is-gsap-ready");

    initNavigationState(root, onScrolledChange, onSectionChange);
    initTechnologyNarrative(root, onTechnologyChange);

    const media = gsap.matchMedia();
    media.add(
      {
        isDesktop: "(min-width: 1100px)",
        isTablet: "(min-width: 700px) and (max-width: 1099px)",
        isMobile: "(max-width: 699px)",
        canHover: "(hover: hover) and (pointer: fine)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const conditions = context.conditions as MotionConditions;
        initHeroAnimation(root, conditions);
        initArtworkReveals(root, conditions);
      },
    );

    let active = true;
    const refresh = () => {
      if (active) ScrollTrigger.refresh();
    };
    document.fonts?.ready.then(refresh);
    const pendingImages = selectAll<HTMLImageElement>(root, "img").filter((image) => !image.complete);
    pendingImages.forEach((image) => image.addEventListener("load", refresh, { once: true }));

    return () => {
      active = false;
      media.revert();
      pendingImages.forEach((image) => image.removeEventListener("load", refresh));
      root.classList.remove("is-gsap-ready");
      document.documentElement.style.removeProperty("--page-progress");
    };
  }, { scope });

  useGSAP(() => {
    const root = scope.current;
    if (!root) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 699px)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (flipState.current && !reduceMotion) {
      Flip.from(flipState.current, {
        absolute: true,
        simple: true,
        duration: isMobile ? 0.38 : 0.62,
        ease: "power3.inOut",
        prune: true,
        onEnter: (elements) => gsap.fromTo(elements, { autoAlpha: 0, scale: 0.98 }, { autoAlpha: 1, scale: 1, duration: 0.42 }),
        onLeave: (elements) => gsap.to(elements, { autoAlpha: 0, scale: 0.98, duration: 0.24 }),
        onComplete: () => ScrollTrigger.refresh(),
      });
      flipState.current = null;
    }

    initProjectCardReveals(root, reduceMotion, isMobile);
    const removeInteractions = initProjectCardInteractions(root, canHover && !reduceMotion);
    window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return removeInteractions;
  }, { dependencies: [filterKey, showArchive], scope, revertOnUpdate: true });

  useGSAP(() => {
    const root = scope.current;
    const navigation = root ? select<HTMLElement>(root, "#main-navigation") : null;
    if (!navigation || window.matchMedia("(min-width: 601px)").matches) return;
    const links = selectAll<HTMLElement>(navigation, "a");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(links, { clearProps: "all" });
      return;
    }
    if (menuOpen) {
      gsap.fromTo(links, { autoAlpha: 0, x: -12 }, { autoAlpha: 1, x: 0, duration: 0.36, stagger: 0.045, ease: "power3.out", clearProps: "transform,opacity,visibility" });
    } else {
      gsap.set(links, { clearProps: "transform,opacity,visibility" });
    }
  }, { dependencies: [menuOpen], scope, revertOnUpdate: true });

  useGSAP(() => {
    if (!dialogKey || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = scope.current;
    if (!root) return;
    const dialog = select<HTMLElement>(root, ".project-dialog, .technology-dialog, .artwork-lightbox");
    if (!dialog) return;
    const backdrop = select<HTMLElement>(dialog, ".dialog-backdrop, .technology-dialog-backdrop, .lightbox-backdrop");
    const panel = select<HTMLElement>(dialog, ".dialog-panel, .technology-dialog-panel, .lightbox-stage");
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    if (backdrop) timeline.fromTo(backdrop, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.32 });
    if (panel) timeline.fromTo(panel, { autoAlpha: 0, y: 24, scale: 0.992 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.58 }, 0.06);
  }, { dependencies: [dialogKey], scope, revertOnUpdate: true });

  return { captureProjectGrid };
}
