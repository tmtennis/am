// This file is deprecated - press data is now loaded directly from CSV in components
// Keeping interfaces for type safety

export interface PressEntry {
  outlet: string;
  title: string;
  month: string;
}

export interface PressYear {
  year: number;
  entries: PressEntry[];
}

// Empty export for backwards compatibility
export const press: PressYear[] = [];
