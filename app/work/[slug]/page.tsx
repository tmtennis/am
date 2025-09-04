import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/Container';
import { getProjectBySlug, projects } from '@/data/projects';

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex(p => p.slug === project.slug);
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div>
      {/* Hero Image */}
      <div className="aspect-[3/2] bg-neutral-200" />

      <Container>
        <div className="py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="mb-6">{project.client}</h1>
            <p className="text-lg md:text-xl text-neutral-600 mb-8 leading-relaxed">
              This project exemplifies our approach to {project.client.toLowerCase()}, 
              where strategic thinking meets visual execution to create meaningful connections 
              between brand and audience.
            </p>
            
            <div className="prose prose-neutral">
              <p>
                The challenge was to develop a comprehensive identity system that could 
                scale across multiple touchpoints while maintaining conceptual coherence. 
                Our solution balances flexibility with consistency, allowing for creative 
                expression within a structured framework.
              </p>
              <p>
                Through careful consideration of typography, color, and spatial relationships, 
                we created a visual language that speaks to the brand's core values while 
                positioning them for future growth. The result is a system that feels both 
                timeless and contemporary.
              </p>
              <p>
                This project demonstrates our commitment to design that serves both aesthetic 
                and strategic purposes, creating lasting value for our clients and meaningful 
                experiences for their audiences.
              </p>
            </div>

            {/* Navigation */}
            <div className="mt-16 pt-8 border-t border-neutral-200">
              <div className="flex justify-between items-center">
                <div>
                  {previousProject && (
                    <Link 
                      href={`/work/${previousProject.slug}`}
                      className="text-sm transition-colors duration-150 hover:text-neutral-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                    >
                      ← Previous: {previousProject.client}
                    </Link>
                  )}
                </div>
                <div>
                  {nextProject && (
                    <Link 
                      href={`/work/${nextProject.slug}`}
                      className="text-sm transition-colors duration-150 hover:text-neutral-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                    >
                      Next: {nextProject.client} →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
