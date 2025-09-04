"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ProjectScrollItem } from "@/data/projects";

type Props = {
  projects: ProjectScrollItem[];
  dateStamp?: string;
};

type TileState = {
  isVisible: boolean;
  direction: 'enter' | 'exit' | null;
  animationDirection: 'top' | 'bottom' | 'left' | 'right';
};

export default function WorksScrollGrid({ projects, dateStamp }: Props) {
  const [visibleCount, setVisibleCount] = useState(1);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [tileStates, setTileStates] = useState<TileState[]>(() =>
    projects.map((_, i) => ({
      isVisible: i === 0,
      direction: null,
      animationDirection: i % 4 === 0 ? 'left' : i % 4 === 1 ? 'top' : i % 4 === 2 ? 'right' : 'bottom'
    }))
  );
  const sentinelsRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Sentinel count determines how many scroll "steps" we have
  const sentinelSteps = useMemo(() => projects.length, [projects.length]);

  useEffect(() => {
    // Check for reduced motion preference
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, []);

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update tile states when visible count changes
  useEffect(() => {
    setTileStates(prev => prev.map((state, i) => {
      const shouldBeVisible = i < visibleCount;
      const wasVisible = state.isVisible;
      
      if (shouldBeVisible && !wasVisible) {
        // Tile should appear
        return {
          ...state,
          isVisible: true,
          direction: 'enter'
        };
      } else if (!shouldBeVisible && wasVisible) {
        // Tile should disappear
        return {
          ...state,
          isVisible: false,
          direction: 'exit'
        };
      }
      
      return state;
    }));
  }, [visibleCount]);

  useEffect(() => {
    const root = sentinelsRef.current;
    if (!root) return;

    const entries = Array.from(root.querySelectorAll("[data-sentinel]"));
    const io = new IntersectionObserver(
      (obsEntries) => {
        let newVisibleCount = visibleCount;
        
        // Process entries in order
        obsEntries.forEach((e) => {
          const idx = Number((e.target as HTMLElement).dataset.index);
          
          if (e.isIntersecting) {
            // Reveal items up to this index when scrolling down
            newVisibleCount = Math.max(newVisibleCount, idx + 1);
          } else {
            // When not intersecting, check if we should hide items
            const rect = e.boundingClientRect;
            const viewportHeight = window.innerHeight;
            const viewportTop = 0;
            
            // If sentinel is above viewport and we're scrolling up, hide items after this index
            if (rect.bottom < viewportTop && scrollDirection === 'up') {
              newVisibleCount = Math.min(newVisibleCount, idx + 1);
            }
            // If sentinel is below viewport and we're scrolling up, also consider hiding
            else if (rect.top > viewportHeight && scrollDirection === 'up') {
              newVisibleCount = Math.min(newVisibleCount, idx + 1);
            }
          }
        });

        if (newVisibleCount !== visibleCount) {
          setVisibleCount(newVisibleCount);
        }
      },
      { 
        rootMargin: "0px 0px -40% 0px", 
        threshold: [0, 0.25, 0.5, 0.75, 1] 
      }
    );

    entries.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sentinelSteps, visibleCount, scrollDirection]);

  const getAnimationClasses = (state: TileState, prefersReducedMotion: boolean) => {
    if (prefersReducedMotion) {
      return state.isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none";
    }

    const baseClasses = "transition-all duration-700 ease-out";
    
    if (state.isVisible) {
      return `${baseClasses} opacity-100 scale-100 translate-x-0 translate-y-0`;
    } else {
      // Exit animation - slide out based on the animation direction
      const exitTransform = {
        top: "-translate-y-8",
        bottom: "translate-y-8", 
        left: "-translate-x-8",
        right: "translate-x-8"
      }[state.animationDirection];
      
      return `${baseClasses} opacity-0 scale-90 ${exitTransform} pointer-events-none`;
    }
  };

  return (
    <section className="mx-auto max-w-[1400px] px-4 md:px-6 min-h-screen">
      {/* top-left datestamp */}
      {dateStamp && (
        <div className="pt-8 text-xs tracking-[0.2em] text-neutral-300">
          {dateStamp}
        </div>
      )}

      {/* Sticky canvas - no background color to prevent viewport jumping */}
      <div className="sticky top-0 z-10 pb-6 pt-6">
        <div
          className="
            grid gap-3 md:gap-4
            grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          "
        >
          {projects.map((p, i) => {
            const state = tileStates[i];
            return (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className={`
                  group relative block overflow-hidden rounded-sm bg-neutral-900
                  ${getAnimationClasses(state, prefersReducedMotion)}
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60
                  nojs-all
                `}
                aria-label={p.title}
                style={{
                  transitionDelay: `${(i % 4) * 50}ms`
                }}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
                    priority={i < 4}
                  />
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-2 px-2">
                  <span className="inline-block bg-black/50 px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-neutral-200 group-hover:text-white backdrop-blur-sm rounded-sm">
                    {p.title}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Scroll driver: invisible sentinels that advance visibleCount */}
      <div ref={sentinelsRef} aria-hidden className="relative">
        {projects.map((_, i) => (
          <div
            key={`sentinel-${i}`}
            data-sentinel
            data-index={i}
            className="h-[80vh]"
          />
        ))}
      </div>

      {/* Fallback controls for reduced-motion or keyboard users */}
      <noscript>
        <style>{`.nojs-all { opacity: 1 !important; transform: none !important; }`}</style>
      </noscript>
      {prefersReducedMotion && visibleCount < projects.length && (
        <div className="sticky bottom-4 z-20 flex justify-center">
          <button
            className="rounded border border-white/30 bg-neutral-950/80 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            onClick={() =>
              setVisibleCount((c) => Math.min(projects.length, c + 1))
            }
          >
            Reveal next
          </button>
        </div>
      )}
    </section>
  );
}
