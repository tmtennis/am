export interface Project {
  slug: string;
  client: string;
  summary: string;
  year: number;
}

export const projects: Project[] = [
  {
    slug: "nordic-knot",
    client: "NORDIC KNOT",
    summary: "A comprehensive brand identity for Scandinavian design collective",
    year: 2025
  },
  {
    slug: "pierre-augustin-rose",
    client: "PIERRE AUGUSTINUS ROSE",
    summary: "Architectural portfolio and digital presence for emerging talent",
    year: 2024
  },
  {
    slug: "meridian-gallery",
    client: "MERIDIAN GALLERY",
    summary: "Exhibition design and wayfinding for contemporary art space",
    year: 2024
  },
  {
    slug: "atlas-ventures",
    client: "ATLAS VENTURES",
    summary: "Strategic positioning and visual identity for venture capital firm",
    year: 2024
  },
  {
    slug: "cascade-institute",
    client: "CASCADE INSTITUTE",
    summary: "Research publication design and institutional brand guidelines",
    year: 2023
  },
  {
    slug: "terra-firma",
    client: "TERRA FIRMA",
    summary: "Sustainable architecture firm brand and digital platform",
    year: 2023
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}
