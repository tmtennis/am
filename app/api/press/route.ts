import { readCSV } from '@/lib/csv-utils';
import { NextResponse } from 'next/server';

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

export async function GET() {
  try {
    const pressData = await loadPressData();
    return NextResponse.json(pressData);
  } catch (error) {
    console.error('Error in press API:', error);
    return NextResponse.json({ error: 'Failed to load press data' }, { status: 500 });
  }
}
