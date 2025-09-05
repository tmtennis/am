'use client';

import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/data/projects';
import { useEffect, useRef, useState } from 'react';

export default function WorkPage() {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set([0]));
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px'
      }
    );

    const sections = document.querySelectorAll('.work-section');
    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="work-scroller pt-16">
      {projects.map((project, index) => (
        <Link 
          key={project.slug} 
          href={`/work/${project.slug}`} 
          className="work-section group block h-screen w-full"
          data-index={index}
        >
          <div className="relative h-full w-full overflow-hidden bg-neutral-100">
            <Image
              src={project.image}
              alt={project.client}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index < 3}
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute top-6 left-6 right-6 md:top-8 md:left-8 md:right-auto max-w-2xl">
              <h2 className={`text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-3 md:mb-4 transform transition-transform duration-1000 ease-out ${
                visibleSections.has(index) ? 'translate-x-0' : '-translate-x-full'
              }`}>
                {project.client}
              </h2>
              <p className={`text-xs md:text-sm lg:text-base text-white/90 leading-relaxed transform transition-all duration-1000 ease-out delay-200 ${
                visibleSections.has(index) ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              }`}>
                {project.description.split('\n\n')[0]}
              </p>
            </div>
            
            {/* Project indicator */}
            <div className="absolute top-8 right-8 text-white/60 text-sm font-medium tracking-wider">
              {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </div>
            
            {/* Scroll hint for first project only */}
            {index === 0 && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm font-medium animate-pulse tracking-wider">
                Scroll to explore
              </div>
            )}
            
            {/* Year indicator */}
            <div className="absolute bottom-8 right-8 text-white/60 text-sm font-medium tracking-wider">
              {project.year}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
