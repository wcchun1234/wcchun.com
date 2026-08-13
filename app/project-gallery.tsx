"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type GalleryItem = { src: string; alt: string; caption: string };

export function ProjectGallery({ items, title }: { items: GalleryItem[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const close = useCallback(() => {
    const trigger = activeIndex === null ? null : triggerRefs.current[activeIndex];
    setActiveIndex(null);
    requestAnimationFrame(() => trigger?.focus());
  }, [activeIndex]);

  const move = useCallback((direction: -1 | 1) => {
    setActiveIndex((current) => current === null ? current : (current + direction + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
      if (event.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLButtonElement>("button:not([disabled])");
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
    document.body.classList.add("dialog-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("dialog-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, move]);

  const activeItem = activeIndex === null ? null : items[activeIndex];

  return (
    <>
      <section className="project-page-gallery" id="gallery" aria-label={`${title} image gallery`}>
        {items.map((item, index) => (
          <figure key={`${item.src}-${item.caption}`}>
            <button
              className="project-gallery-trigger"
              type="button"
              onClick={() => setActiveIndex(index)}
              ref={(element) => { triggerRefs.current[index] = element; }}
              aria-label={`Enlarge image ${index + 1} of ${items.length}: ${item.caption}`}
            >
              <Image src={item.src} alt={item.alt} width={1920} height={1080} sizes="(max-width: 760px) 100vw, 50vw" unoptimized />
              <span aria-hidden="true">View larger +</span>
            </button>
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </section>

      {activeItem && activeIndex !== null && (
        <div className="project-lightbox" role="dialog" aria-modal="true" aria-label={`${title} image viewer`}>
          <button className="project-lightbox-backdrop" type="button" onClick={close} aria-label="Close image viewer" />
          <div className="project-lightbox-panel" ref={panelRef}>
            <div className="project-lightbox-bar">
              <p>{String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")} · {activeItem.caption}</p>
              <button ref={closeButtonRef} type="button" onClick={close}>Close ×</button>
            </div>
            <div className="project-lightbox-image">
              <Image src={activeItem.src} alt={activeItem.alt} width={1920} height={1080} sizes="100vw" unoptimized priority />
            </div>
            {items.length > 1 && (
              <div className="project-lightbox-controls" aria-label="Image navigation">
                <button type="button" onClick={() => move(-1)}>← Previous</button>
                <button type="button" onClick={() => move(1)}>Next →</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
