# CSV Data Files

This folder contains CSV files that are used throughout the Alexander May portfolio project.

## Structure

- `/data/csv/` - Main CSV files directory
- Place your CSV files here and reference them in components and pages

## Usage

You can read CSV files in your Next.js components using various methods:

### Method 1: Static Import (for build-time data)
```javascript
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// In a server component or API route
const csvPath = path.join(process.cwd(), 'data/csv/your-file.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const records = parse(csvContent, {
  columns: true,
  skip_empty_lines: true
});
```

### Method 2: Public Folder (for client-side access)
If you need client-side access, you can also place CSV files in `/public/data/` and fetch them:

```javascript
// Client-side fetch
const response = await fetch('/data/your-file.csv');
const csvText = await response.text();
// Parse with a CSV library
```

### Recommended Libraries
- `csv-parse` - For parsing CSV data
- `papaparse` - Alternative CSV parser with browser support

## File Naming Convention
- Use lowercase
- Use hyphens for spaces
- Include descriptive names
- Consider versioning if data changes frequently

Examples:
- `projects.csv`
- `client-list.csv`
- `press-coverage.csv`
- `team-members.csv`
