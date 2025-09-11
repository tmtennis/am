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
    <div className="min-h-screen bg-black">
      {/* Hero Image */}
      <div className="bg-black relative">
        <Image
          src={project.image}
          alt={project.client}
          width={1920}
          height={1080}
          className="w-full h-auto"
          priority
        />
      </div>

      <Container>
        <div className="py-16 md:py-24">
          {/* Gallery Section */}
          {galleryImages.length > 0 && (
            <div className="mb-20 md:mb-24 space-y-4">
              {galleryImages.length === 1 && (
                <div className="max-w-5xl mx-auto">
                  <Image
                    src={`/images/work/gallery-folders/${slug}/${galleryImages[0]}`}
                    alt={`${project.client} 1`}
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                    sizes="100vw"
                  />
                </div>
              )}

              {galleryImages.length === 2 && (
                <div className="space-y-4">
                  <Image
                    src={`/images/work/gallery-folders/${slug}/${galleryImages[0]}`}
                    alt={`${project.client} 1`}
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                    sizes="100vw"
                  />
                  <Image
                    src={`/images/work/gallery-folders/${slug}/${galleryImages[1]}`}
                    alt={`${project.client} 2`}
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                    sizes="100vw"
                  />
                </div>
              )}

              {galleryImages.length >= 3 && (
                <div className="space-y-4">
                  {galleryImages.map((imageName, index) => (
                    <Image
                      key={index}
                      src={`/images/work/gallery-folders/${slug}/${imageName}`}
                      alt={`${project.client} ${index + 1}`}
                      width={1920}
                      height={1080}
                      className="w-full h-auto"
                      sizes="100vw"
                    />
                  ))}
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
