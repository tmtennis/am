'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectData {
  slug: string;
  client: string;
  description: string;
  stack: string;
  stackItems: string[];
  summary: string;
  year: number;
  image: string;
}

export default function WorkPage() {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set([0]));
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch projects'))
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (projects.length === 0) return;

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
  }, [projects]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="work-scroller">
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
            <div className="absolute top-4 left-4 right-4 md:top-8 md:left-8 md:right-8 lg:right-auto max-w-4xl">
              <motion.div 
                className="mb-1"
                initial={{ opacity: 0, y: 30 }}
                animate={visibleSections.has(index) ? { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 1.0,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.1
                  }
                } : {
                  opacity: 0,
                  y: 30
                }}
              >
                <div className="flex flex-col">
                  {project.stackItems && project.stackItems.map((stackItem, stackIndex) => (
                    <p key={stackIndex} className="text-[9px] sm:text-[10px] md:text-xs text-white/60 font-bold tracking-wider uppercase leading-none">
                      {stackItem}
                    </p>
                  ))}
                </div>
              </motion.div>

              <motion.h2 
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-white mb-1 sm:mb-1.5 leading-none"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={visibleSections.has(index) ? { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.2
                  }
                } : {
                  opacity: 0,
                  y: 40,
                  scale: 0.95
                }}
              >
                {project.client}
              </motion.h2>
              
              <motion.div 
                className="text-[9px] sm:text-[10px] md:text-xs text-white/85 leading-none max-w-full sm:max-w-2xl md:max-w-3xl"
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={visibleSections.has(index) ? {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration: 1.0,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.5
                  }
                } : {
                  opacity: 0,
                  y: 30,
                  filter: "blur(8px)"
                }}
              >
                <div className="whitespace-pre-wrap">
                  {project.description}
                </div>
              </motion.div>
            </div>
            
            {/* Project indicator */}
            <motion.div 
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white/60 text-xs md:text-sm font-medium tracking-wider"
              initial={{ opacity: 0, y: -20 }}
              animate={visibleSections.has(index) ? {
                opacity: 0.6,
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.6
                }
              } : {
                opacity: 0,
                y: -20
              }}
            >
              {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </motion.div>
            
            {/* Scroll hint for first project only */}
            {index === 0 && (
              <motion.div 
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 md:bottom-8 text-white/60 text-xs md:text-sm font-medium tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: [0.6, 0.3, 0.6],
                  y: 0,
                  transition: {
                    opacity: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    y: {
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 1.0
                    }
                  }
                }}
              >
                Scroll to explore
              </motion.div>
            )}
            
            {/* Year indicator */}
            <motion.div 
              className="absolute bottom-4 right-4 md:bottom-8 md:right-8 text-white/60 text-xs md:text-sm font-medium tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={visibleSections.has(index) ? {
                opacity: 0.6,
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.8
                }
              } : {
                opacity: 0,
                y: 20
              }}
            >
              {project.year}
            </motion.div>
          </div>
        </Link>
      ))}
    </div>
  );
}
