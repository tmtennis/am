import Link from 'next/link';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link 
      href={`/work/${project.slug}`}
      className="group block transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
      aria-label={`View ${project.client} project`}
    >
      <div className="space-y-4">
        <div className="aspect-[16/10] bg-neutral-200 transition-colors duration-150 group-hover:bg-neutral-50" />
        <div>
          <h3 className="font-medium">{project.client}</h3>
          <p className="text-neutral-600 text-sm mt-1">{project.summary}</p>
          <p className="label-wide text-neutral-400 mt-2">{project.year}</p>
        </div>
      </div>
    </Link>
  );
}
