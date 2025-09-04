import { readCSV } from './csv-utils';

export interface ProjectDetail {
  slug: string;
  name: string;
  description: string;
  stack: string;
}

// Convert project name to slug format
function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Load detailed project data from CSV
export async function loadProjectDetails(): Promise<ProjectDetail[]> {
  try {
    const csvData = await readCSV('AM-PROJECTS.csv');
    
    return csvData.map((row: any) => ({
      slug: nameToSlug(row.PROJECT),
      name: row.PROJECT,
      description: row.DESCRIPTION,
      stack: row.STACK
    }));
  } catch (error) {
    console.error('Error loading project details:', error);
    return [];
  }
}

export async function getProjectDetailBySlug(slug: string): Promise<ProjectDetail | undefined> {
  // Import here to avoid circular dependency
  const { projects } = await import('@/data/projects');
  
  // First check if this slug exists in our curated projects list
  const validProject = projects.find(p => p.slug === slug);
  if (!validProject) {
    return undefined;
  }
  
  // Then get the details from CSV
  const projectDetails = await loadProjectDetails();
  return projectDetails.find(project => project.slug === slug);
}
