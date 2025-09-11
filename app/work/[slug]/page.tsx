import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/Container';
import { getProjectsFromCSV, getProjectBySlug } from '@/lib/projects-csv';
import fs from 'fs';
import path from 'path';

// Function to get available gallery images for a project
function getProjectGalleryImages(slug: string): string[] {
  const galleryPath = path.join(process.cwd(), 'public/images/work/gallery-folders', slug);
  const availableImages: string[] = [];
  
  try {
    if (fs.existsSync(galleryPath)) {
      const files = fs.readdirSync(galleryPath);
      // Filter for image files and sort them
      const imageFiles = files
        .filter(file => file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg'))
        .sort();
      
      return imageFiles;
    }
  } catch (error) {
    console.error(`Error reading gallery images for ${slug}:`, error);
  }
  
  return availableImages;
}

export async function generateStaticParams() {
  // Use the CSV projects list
  const projects = await getProjectsFromCSV();
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
  
  // Get project from CSV data
  const project = await getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  // Get all projects for navigation
  const allProjects = await getProjectsFromCSV();
  
  // Get gallery images for this project
  const galleryImages = getProjectGalleryImages(slug);

  const currentIndex = allProjects.findIndex(p => p.slug === project.slug);
  const previousProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

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
          {/* Gallery Section */}
          {galleryImages.length > 0 && (
            <div className="mb-20 md:mb-24">
              {galleryImages.length === 1 && (
                <div className="max-w-5xl mx-auto">
                  <div className="aspect-[3/2] bg-neutral-900 relative overflow-hidden">
                    <Image
                      src={`/images/work/gallery-folders/${slug}/${galleryImages[0]}`}
                      alt={`${project.client} 1`}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                </div>
              )}

              {galleryImages.length === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                  <div className="md:col-span-2 aspect-[3/2] bg-neutral-900 relative overflow-hidden">
                    <Image
                      src={`/images/work/gallery-folders/${slug}/${galleryImages[0]}`}
                      alt={`${project.client} 1`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 66vw"
                    />
                  </div>
                  <div className="aspect-[3/4] bg-neutral-900 relative overflow-hidden">
                    <Image
                      src={`/images/work/gallery-folders/${slug}/${galleryImages[1]}`}
                      alt={`${project.client} 2`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>
              )}

              {galleryImages.length === 3 && (
                <div className="grid grid-cols-2 gap-1">
                  <div className="aspect-[4/5] bg-neutral-900 relative overflow-hidden">
                    <Image
                      src={`/images/work/gallery-folders/${slug}/${galleryImages[0]}`}
                      alt={`${project.client} 1`}
                      fill
                      className="object-cover"
                      sizes="50vw"
                    />
                  </div>
                  <div className="grid grid-rows-2 gap-1">
                    <div className="aspect-[4/3] bg-neutral-900 relative overflow-hidden">
                      <Image
                        src={`/images/work/gallery-folders/${slug}/${galleryImages[1]}`}
                        alt={`${project.client} 2`}
                        fill
                        className="object-cover"
                        sizes="50vw"
                      />
                    </div>
                    <div className="aspect-[4/3] bg-neutral-900 relative overflow-hidden">
                      <Image
                        src={`/images/work/gallery-folders/${slug}/${galleryImages[2]}`}
                        alt={`${project.client} 3`}
                        fill
                        className="object-cover"
                        sizes="50vw"
                      />
                    </div>
                  </div>
                </div>
              )}

              {galleryImages.length === 4 && (
                <div className="space-y-1">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-1">
                    <div className="md:col-span-3 aspect-[3/2] bg-neutral-900 relative overflow-hidden">
                      <Image
                        src={`/images/work/gallery-folders/${slug}/${galleryImages[0]}`}
                        alt={`${project.client} 1`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 60vw"
                      />
                    </div>
                    <div className="md:col-span-2 aspect-[3/4] bg-neutral-900 relative overflow-hidden">
                      <Image
                        src={`/images/work/gallery-folders/${slug}/${galleryImages[1]}`}
                        alt={`${project.client} 2`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="aspect-square bg-neutral-900 relative overflow-hidden">
                      <Image
                        src={`/images/work/gallery-folders/${slug}/${galleryImages[2]}`}
                        alt={`${project.client} 3`}
                        fill
                        className="object-cover"
                        sizes="50vw"
                      />
                    </div>
                    <div className="aspect-square bg-neutral-900 relative overflow-hidden">
                      <Image
                        src={`/images/work/gallery-folders/${slug}/${galleryImages[3]}`}
                        alt={`${project.client} 4`}
                        fill
                        className="object-cover"
                        sizes="50vw"
                      />
                    </div>
                  </div>
                </div>
              )}

              {galleryImages.length >= 5 && (
                <div className="space-y-1">
                  {/* First row - Hero image */}
                  <div className="aspect-[21/9] bg-neutral-900 relative overflow-hidden">
                    <Image
                      src={`/images/work/gallery-folders/${slug}/${galleryImages[0]}`}
                      alt={`${project.client} 1`}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                  
                  {/* Second row - Three images */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                    <div className="aspect-[4/5] bg-neutral-900 relative overflow-hidden">
                      <Image
                        src={`/images/work/gallery-folders/${slug}/${galleryImages[1]}`}
                        alt={`${project.client} 2`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="aspect-[4/5] bg-neutral-900 relative overflow-hidden">
                      <Image
                        src={`/images/work/gallery-folders/${slug}/${galleryImages[2]}`}
                        alt={`${project.client} 3`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="aspect-[4/5] bg-neutral-900 relative overflow-hidden">
                      <Image
                        src={`/images/work/gallery-folders/${slug}/${galleryImages[3]}`}
                        alt={`${project.client} 4`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </div>
                  
                  {/* Third row - Two large images */}
                  {galleryImages.length > 4 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                      <div className="aspect-[4/3] bg-neutral-900 relative overflow-hidden">
                        <Image
                          src={`/images/work/gallery-folders/${slug}/${galleryImages[4]}`}
                          alt={`${project.client} 5`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      {galleryImages[5] && (
                        <div className="aspect-[4/3] bg-neutral-900 relative overflow-hidden">
                          <Image
                            src={`/images/work/gallery-folders/${slug}/${galleryImages[5]}`}
                            alt={`${project.client} 6`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Additional rows for remaining images */}
                  {galleryImages.length > 6 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                      {galleryImages.slice(6).map((imageName, index) => (
                        <div key={index + 6} className="aspect-square bg-neutral-900 relative overflow-hidden">
                          <Image
                            src={`/images/work/gallery-folders/${slug}/${imageName}`}
                            alt={`${project.client} ${index + 7}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
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
