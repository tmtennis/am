// CSV utility functions for reading and parsing CSV data
import fs from 'fs';
import path from 'path';

/**
 * Parse a CSV line handling quoted fields with commas
 * @param line - CSV line to parse
 * @returns string[] - Array of field values
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

/**
 * Read and parse a CSV file from the data/csv directory
 * @param filename - The CSV filename (e.g., 'projects.csv')
 * @returns Promise<any[]> - Array of parsed CSV records
 */
export async function readCSV(filename: string): Promise<any[]> {
  try {
    const csvPath = path.join(process.cwd(), 'data/csv', filename);
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    
    // Robust CSV parser that handles quoted fields with commas
    const lines = csvContent.split('\n').filter(line => line.trim());
    const headers = parseCSVLine(lines[0]);
    
    const records = lines.slice(1).map(line => {
      const values = parseCSVLine(line);
      const record: any = {};
      headers.forEach((header: string, index: number) => {
        record[header] = values[index] || '';
      });
      return record;
    });
    
    return records;
  } catch (error) {
    console.error(`Error reading CSV file ${filename}:`, error);
    return [];
  }
}

/**
 * Check if a CSV file exists in the data/csv directory
 * @param filename - The CSV filename
 * @returns boolean
 */
export function csvExists(filename: string): boolean {
  const csvPath = path.join(process.cwd(), 'data/csv', filename);
  return fs.existsSync(csvPath);
}

/**
 * Get list of all CSV files in the data/csv directory
 * @returns string[] - Array of CSV filenames
 */
export function listCSVFiles(): string[] {
  try {
    const csvDir = path.join(process.cwd(), 'data/csv');
    return fs.readdirSync(csvDir).filter(file => file.endsWith('.csv'));
  } catch (error) {
    console.error('Error listing CSV files:', error);
    return [];
  }
}
