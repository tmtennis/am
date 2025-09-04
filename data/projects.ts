export interface Project {
  slug: string;
  client: string;
  summary: string;
  year: number;
  image: string;
}

export const projects: Project[] = [
  {
    slug: "nordic-knots",
    client: "NORDIC KNOTS",
    summary: "A comprehensive brand identity for Scandinavian design collective",
    year: 2025,
    image: "/images/work/nordic-knots.png"
  },
  {
    slug: "pierre-augustin-rose",
    client: "PIERRE AUGUSTIN ROSE",
    summary: "Architectural portfolio and digital presence for emerging talent",
    year: 2024,
    image: "/images/work/pierre-augustin-rose.png"
  },
  {
    slug: "dries-van-noten",
    client: "DRIES VAN NOTEN",
    summary: "Creative direction and brand storytelling for luxury fashion house",
    year: 2024,
    image: "/images/work/dries-van-noten.png"
  },
  {
    slug: "skims",
    client: "SKIMS",
    summary: "Product design and visual identity for shapewear brand",
    year: 2024,
    image: "/images/work/skims.png"
  },
  {
    slug: "ssense",
    client: "SSENSE",
    summary: "Digital platform design and luxury e-commerce experience",
    year: 2023,
    image: "/images/work/ssense.png"
  },
  {
    slug: "bocci",
    client: "BOCCI",
    summary: "Lighting design and spatial installations for contemporary brand",
    year: 2023,
    image: "/images/work/bocci.png"
  },
  {
    slug: "zara",
    client: "ZARA",
    summary: "Retail space design and brand positioning for global fashion retailer",
    year: 2023,
    image: "/images/work/zara.png"
  },
  {
    slug: "usm-modular-furniture",
    client: "USM MODULAR FURNITURE",
    summary: "Furniture system design and brand guidelines for modular solutions",
    year: 2022,
    image: "/images/work/usm-modular-furniture.png"
  },
  {
    slug: "pin-up",
    client: "PIN–UP",
    summary: "Editorial design and publication layout for architecture magazine",
    year: 2022,
    image: "/images/work/pin-up.png"
  },
  {
    slug: "carpenters-workshop-gallery",
    client: "CARPENTERS WORKSHOP GALLERY",
    summary: "Gallery identity and exhibition design for contemporary art space",
    year: 2022,
    image: "/images/work/carpenters-workshop-gallery.png"
  },
  {
    slug: "warhol-foundation",
    client: "WARHOL FOUNDATION",
    summary: "Foundation branding and cultural programming for arts organization",
    year: 2021,
    image: "/images/work/warhol-foundation.png"
  },
  {
    slug: "vans",
    client: "VANS",
    summary: "Brand collaboration and product design for skateboarding culture",
    year: 2021,
    image: "/images/work/vans.png"
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}
