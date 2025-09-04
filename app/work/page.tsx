import Container from '@/components/Container';
import ProjectCard from '@/components/ProjectCard';
import SectionHeading from '@/components/SectionHeading';
import { projects } from '@/data/projects';

export default function WorkPage() {
  return (
    <Container>
      <div className="py-16 md:py-24">
        <SectionHeading className="mb-12">Selected Work</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </Container>
  );
}
