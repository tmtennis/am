import { NextResponse } from 'next/server';
import { readCSV } from '@/lib/csv-utils';

export interface ProjectData {
  slug: string;
  client: string;
  description: string;
  stack: string;
  stackItems: string[];
  summary: string;
  year: number;
  image: string;
}

// Helper function to generate slug from client name
function generateSlug(client: string): string {
  // Handle special case for DIAGEO -> diaego to match image filename
  if (client.toUpperCase() === 'DIAGEO') {
    return 'diaego';
  }
  
  return client
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Helper function to extract a short summary from the description
function extractSummary(description: string): string {
  // Take the first sentence or up to 100 characters
  const firstSentence = description.split('.')[0];
  if (firstSentence.length > 100) {
    return firstSentence.substring(0, 97) + '...';
  }
  return firstSentence;
}

// Predefined years for each project (since CSV doesn't include years)
const projectYears: Record<string, number> = {
  'nordic-knots': 2025,
  'warhol-foundation': 2022,
  'usm-haller': 2023,
  'torre-velesca': 2023,
  'studioette': 2023,
  'pierre-augustin-rose': 2024,
  'nm3': 2024,
  'dries-van-noten': 2023,
  'carpenters-workshop-gallery': 2023,
  'bocci': 2023,
  'diaego': 2024,
  'fondazione-converso': 2023
};

export async function GET() {
  try {
    const csvData = await readCSV('AM-PROJECTS.csv');
    
    const projects: ProjectData[] = csvData.map((row) => {
      const slug = generateSlug(row.PROJECT);
      const summary = extractSummary(row.DESCRIPTION);
      
      // Collect all stack items from separate columns
      const stackItems: string[] = [];
      for (let i = 1; i <= 5; i++) {
        const stackKey = `STACK-${i}`;
        if (row[stackKey] && row[stackKey].trim()) {
          stackItems.push(row[stackKey].trim());
        }
      }
      
      return {
        slug,
        client: row.PROJECT,
        description: row.DESCRIPTION,
        stack: stackItems.join(' / '), // For backward compatibility, join with separator
        stackItems, // New property for vertical display
        summary,
        year: projectYears[slug] || 2024,
        image: `/images/work/work-heros/${slug}.png`
      };
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error reading projects CSV:', error);
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 });
  }
}
