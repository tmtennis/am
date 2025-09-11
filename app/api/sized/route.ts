import { NextResponse } from 'next/server';
import { readCSV } from '@/lib/csv-utils';

export async function GET() {
  try {
    const csvData = await readCSV('AM-SIZED-PREVIEW.csv');
    
    if (!csvData || csvData.length === 0) {
      return NextResponse.json({ error: 'No sized data found' }, { status: 404 });
    }

    // The CSV has a simple structure with a title and description
    // First row should contain the title, second row the description
    const sizedData = {
      title: csvData[0] ? Object.keys(csvData[0])[0] : 'SIZED PREVIEW',
      description: csvData[0] ? Object.values(csvData[0])[0] as string : ''
    };

    return NextResponse.json(sizedData);
  } catch (error) {
    console.error('Error loading sized data:', error);
    return NextResponse.json({ error: 'Failed to load sized data' }, { status: 500 });
  }
}
