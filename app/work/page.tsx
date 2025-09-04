import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/data/projects';

export default function WorkPage() {
  return (
    <div className="work-scroller pt-16 h-screen overflow-y-scroll">
      {projects.map((project, index) => (
        <Link 
          key={project.slug} 
          href={`/work/${project.slug}`} 
          className="work-section group block h-screen w-full"
        >
          <div className="relative h-full w-full overflow-hidden bg-neutral-100">
            <Image
              src={project.image}
              alt={project.client}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="100vw"
              priority={index < 3}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white text-center px-8 transform transition-all duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-2">
                {project.client}
              </h2>
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
