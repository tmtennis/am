import fs from 'fs';
import path from 'path';

/**
 * Read and parse a CSV file from the data/csv directory
 * @param filename - The CSV filename (e.g., 'projects.csv')
 * @returns Promise<any[]> - Array of parsed CSV records
 */
export async function readCSV(filename: string): Promise<any[]> {
  try {
    const csvPath = path.join(process.cwd(), 'data/csv', filename);
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    
    // More robust CSV parser that handles multiline quoted fields
    const records: any[] = [];
    let currentRecord: string[] = [];
    let currentField = '';
    let inQuotes = false;
    let isFirstRow = true;
    let headers: string[] = [];
    
    for (let i = 0; i < csvContent.length; i++) {
      const char = csvContent[i];
      const nextChar = csvContent[i + 1];
      
      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Escaped quote
          currentField += '"';
          i++; // Skip next quote
        } else {
          // Start or end of quoted field
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        // Field separator
        currentRecord.push(currentField.trim());
        currentField = '';
      } else if ((char === '\n' || char === '\r') && !inQuotes) {
        // End of record
        if (currentField || currentRecord.length > 0) {
          currentRecord.push(currentField.trim());
          
          if (isFirstRow) {
            headers = currentRecord.map(h => h.replace(/\r$/, ''));
            isFirstRow = false;
          } else if (currentRecord.some(field => field.trim())) {
            // Only add non-empty records
            const record: any = {};
            headers.forEach((header: string, index: number) => {
              record[header] = currentRecord[index] || '';
            });
            records.push(record);
          }
          
          currentRecord = [];
          currentField = '';
        }
      } else {
        currentField += char;
      }
    }
    
    // Handle last record if file doesn't end with newline
    if (currentField || currentRecord.length > 0) {
      currentRecord.push(currentField.trim());
      if (!isFirstRow && currentRecord.some(field => field.trim())) {
        const record: any = {};
        headers.forEach((header: string, index: number) => {
          record[header] = currentRecord[index] || '';
        });
        records.push(record);
      }
    }
    
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
