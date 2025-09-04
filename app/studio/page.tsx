import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import { readCSV } from '@/lib/csv-utils';

interface PressEntry {
  outlet: string;
  title: string;
  month: string;
}

interface PressYear {
  year: number;
  entries: PressEntry[];
}

// Helper function to extract month from the ABOUT field
function extractMonth(about: string): string {
  const monthMatch = about.match(/(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}/i);
  if (monthMatch) {
    return monthMatch[1].toUpperCase();
  }
  return '';
}

// Helper function to extract title from the ABOUT field (everything before the month)
function extractTitle(about: string): string {
  const monthMatch = about.match(/,\s*(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}/i);
  if (monthMatch) {
    return about.substring(0, monthMatch.index).trim();
  }
  return about;
}

// Load press data from CSV
async function loadPressData(): Promise<PressYear[]> {
  try {
    const csvData = await readCSV('AM-PRESS-2025-2021.csv');
    
    // Group by year
    const pressMap = new Map<number, PressEntry[]>();
    
    csvData.forEach((row: any) => {
      const year = parseInt(row.YEAR);
      const outlet = row.TITLE; // This is actually the outlet name
      const about = row.ABOUT;
      
      const entry: PressEntry = {
        outlet: outlet,
        title: extractTitle(about),
        month: extractMonth(about)
      };
      
      if (!pressMap.has(year)) {
        pressMap.set(year, []);
      }
      pressMap.get(year)!.push(entry);
    });
    
    // Convert to PressYear array and sort by year (descending)
    const pressYears: PressYear[] = Array.from(pressMap.entries())
      .map(([year, entries]) => ({ year, entries }))
      .sort((a, b) => b.year - a.year);
    
    return pressYears;
  } catch (error) {
    console.error('Error loading press data:', error);
    return [];
  }
}

export default async function StudioPage() {
  const pressData = await loadPressData();

  return (
    <Container>
      <div className="py-16 md:py-24 space-y-16">
        <section>
          <div className="space-y-4">
            <h1 className="text-xl font-extrabold">ALEXANDER MAY STUDIO</h1>
            <div className="prose prose-neutral max-w-none">
              <p>
                Defined by a precise and architectural approach to design. Founded by Alexander May, the studio operates at the meeting point of space, object, and 
                image, where every project is treated as a structure, measured, intentional, and complete.
              </p>
              <p>
                May's career has been shaped by an insistence on clarity and proportion. His work ranges from interiors and exhibitions to furniture and curatorial 
                projects, always returning to the same principles: a disciplined use of material, a deep engagement with scale, and a refusal of excess. Each space or 
                object is stripped to its essential form, revealing the logic of its construction and the integrity of its presence.
              </p>
              <p>
                The studio's ethos is rooted in authorship. Projects are not styled but built, approached with the rigour of architecture and the sensibility of art. Light, 
                surface, and proportion are not secondary concerns but the foundations of meaning. The results are environments and objects that stand with quiet 
                authority, at once minimal and resonant.
              </p>
              <p>
                Alexander May Studio works across disciplines yet maintains a singular vision: to create forms that are exact, enduring, and unembellished, where 
                nothing is arbitrary and every decision carries weight.
              </p>
              
              <div className="mt-6">
                <h2 className="text-xl font-extrabold mb-2">THE STUDIO OPERATES THROUGH THREE CORE PRACTICES</h2>
                <p>
                  Creative direction, spatial design, and curation. Creative direction establishes the conceptual and visual framework of a project, defining its identity 
                  with precision and restraint. Spatial design translates this framework into built form, where proportion, material, and light are orchestrated to create 
                  environments of clarity and permanence. Curation extends these principles into the selection and arrangement of objects, artworks, and ideas, framing them within contexts that reveal their structural and aesthetic significance.
                </p>
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-extrabold mb-2">CLIENTS</h2>
                <p>
                  Alexander May Studio collaborates with leading figures and institutions across design, fashion, art, and architecture. Clients include Rick Owens, Dries 
                  Van Noten, Frieze, Carpenters Workshop Gallery, SKIMS, Design Miami, Bocci, Art Basel, USM Modular Furniture, SSENSE, ZARA, Edition Hotels, 
                  Lemaire, Pierre Augustin Rose, NM3, Inez & Vinoodh, North Six, Locatelli Partners, PIN–UP, Proper Hospitality, among others. Each partnership is 
                  approached with the same discipline: to create work of structural clarity and lasting resonance, regardless of scale or medium.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-extrabold mb-4">PRESS</h2>
          <div className="space-y-4">
            {pressData.map((yearGroup: PressYear) => (
              <div key={yearGroup.year}>
                <h3 className="text-sm font-medium text-neutral-400 mb-2">{yearGroup.year}</h3>
                <div className="space-y-1">
                  {yearGroup.entries.map((entry, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 py-1">
                      <div className="flex-1">
                        <span className="text-sm font-medium">{entry.outlet}</span>
                        <span className="text-sm text-neutral-600 ml-2">{entry.title}</span>
                      </div>
                      <span className="text-xs text-neutral-400 sm:text-right">{entry.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Container>
  );
}
