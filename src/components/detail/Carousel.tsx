"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./Carousel.module.css";

type CarouselItem = { src: string; alt: string; caption?: string };

export function Carousel({ items }: { items: CarouselItem[] }) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const dragStartX = useRef<number | null>(null);

  const goTo = (next: number) => {
    setIndex((next + items.length) % items.length);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) < 40) return;
    goTo(delta > 0 ? index - 1 : index + 1);
  };

  return (
    <div className={styles.carousel}>
      <div
        className={styles.viewport}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        role="group"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") goTo(index - 1);
          if (e.key === "ArrowRight") goTo(index + 1);
        }}
      >
        <div
          className={styles.track}
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: reducedMotion ? "none" : undefined,
          }}
        >
          {items.map((item) => (
            <figure key={item.src} className={styles.slide}>
              <Image src={item.src} alt={item.alt} width={1200} height={800} className={styles.image} />
              {item.caption ? <figcaption className={styles.caption}>{item.caption}</figcaption> : null}
            </figure>
          ))}
        </div>

        <button
          type="button"
          className={[styles.arrow, styles.arrowPrev].join(" ")}
          onClick={() => goTo(index - 1)}
          aria-label="Previous photo"
        >
          ‹
        </button>
        <button
          type="button"
          className={[styles.arrow, styles.arrowNext].join(" ")}
          onClick={() => goTo(index + 1)}
          aria-label="Next photo"
        >
          ›
        </button>
      </div>

      <div className={styles.dots}>
        {items.map((item, i) => (
          <button
            key={item.src}
            type="button"
            className={i === index ? styles.dotActive : styles.dot}
            onClick={() => goTo(i)}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
