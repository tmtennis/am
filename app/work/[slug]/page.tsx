import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/Container';
import { loadProjectDetails, getProjectDetailBySlug } from '@/lib/project-details';
import { projects } from '@/data/projects';
import fs from 'fs';
import path from 'path';

// Function to get available gallery images for a project
function getProjectGalleryImages(slug: string): number[] {
  const galleryPath = path.join(process.cwd(), 'public/images/am-work');
  const availableImages: number[] = [];
  
  for (let i = 1; i <= 3; i++) {
    const imagePath = path.join(galleryPath, `${slug}-${i}.png`);
    if (fs.existsSync(imagePath)) {
      availableImages.push(i);
    }
  }
  
  return availableImages;
}

export async function generateStaticParams() {
  // Use the curated projects list to avoid any CSV parsing issues
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
  
  // Get project from curated list
  const project = projects.find(p => p.slug === slug);
  if (!project) {
    notFound();
  }

  // Get detailed project data from CSV
  const projectDetail = await getProjectDetailBySlug(slug);
  
  // Get gallery images for this project
  const galleryImages = getProjectGalleryImages(slug);

  const currentIndex = projects.findIndex(p => p.slug === project.slug);
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1919' }}>
      {/* Hero Image */}
      <div className="h-[70vh] bg-neutral-900 relative overflow-hidden">
        <Image
          src={project.image}
          alt={project.client}
          fill
          className="object-cover"
          priority
        />
      </div>

      <Container>
        <div className="py-16 md:py-24">
          {/* Project Title & Summary */}
          <div className="mb-20">
            <h1 className="text-white text-5xl md:text-7xl font-extrabold mb-8 tracking-tight uppercase">{project.client}</h1>
            <p className="text-white text-xl md:text-2xl font-light leading-relaxed max-w-4xl">
              {project.summary}
            </p>
          </div>

          {projectDetail && (
            <>
              {/* Description & First Image */}
              <div className="mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                  <div>
                    <h2 className="text-white text-2xl font-extrabold mb-8 uppercase tracking-wide">Description</h2>
                    <div className="prose prose-invert prose-xl max-w-none">
                      <div className="text-white font-light leading-relaxed whitespace-pre-wrap">
                        {projectDetail.description}
                      </div>
                    </div>
                  </div>
                  <div>
                    {galleryImages[0] && (
                      <div className="aspect-[4/5] bg-neutral-900 relative overflow-hidden">
                        <Image
                          src={`/images/am-work/${slug}-${galleryImages[0]}.png`}
                          alt={`${project.client} detail`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Second Image - Full Width */}
              {galleryImages[1] && (
                <div className="mb-32">
                  <div className="aspect-[21/9] bg-neutral-900 relative overflow-hidden">
                    <Image
                      src={`/images/am-work/${slug}-${galleryImages[1]}.png`}
                      alt={`${project.client} detail`}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                </div>
              )}

              {/* Services & Third Image */}
              <div className="mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                  <div>
                    {galleryImages[2] && (
                      <div className="aspect-square bg-neutral-900 relative overflow-hidden">
                        <Image
                          src={`/images/am-work/${slug}-${galleryImages[2]}.png`}
                          alt={`${project.client} detail`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    {projectDetail.stack && (
                      <div>
                        <h3 className="text-white text-2xl font-extrabold mb-8 uppercase tracking-wide">
                          Services
                        </h3>
                        <p className="text-white text-xl font-light leading-relaxed">
                          {projectDetail.stack}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Navigation */}
          <div className="pt-20 border-t border-neutral-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                {previousProject && (
                  <Link 
                    href={`/work/${previousProject.slug}`}
                    className="group block"
                  >
                    <div className="text-neutral-400 text-sm font-extrabold uppercase tracking-wider mb-4">Previous Project</div>
                    <div className="text-white text-2xl font-extrabold uppercase transition-opacity duration-300 group-hover:opacity-60">
                      {previousProject.client}
                    </div>
                  </Link>
                )}
              </div>
              <div className="md:text-right">
                {nextProject && (
                  <Link 
                    href={`/work/${nextProject.slug}`}
                    className="group block"
                  >
                    <div className="text-neutral-400 text-sm font-extrabold uppercase tracking-wider mb-4">Next Project</div>
                    <div className="text-white text-2xl font-extrabold uppercase transition-opacity duration-300 group-hover:opacity-60">
                      {nextProject.client}
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
