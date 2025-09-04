# Alexander May Portfolio

A minimal portfolio site built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Clean Design**: Minimal, typography-focused design with careful attention to spacing and proportion
- **Responsive**: Mobile-first responsive design with clean breakpoints
- **Accessible**: ARIA labels, focus states, and semantic markup
- **Performance**: Static generation with Next.js App Router
- **Typography**: Inter font with consistent hierarchy and spacing

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Inter font via next/font

## Project Structure

```
app/
├── layout.tsx          # Root layout with Inter font and global styles
├── page.tsx            # Home page
├── studio/page.tsx     # About/Studio page
├── work/page.tsx       # Work index page
├── work/[slug]/page.tsx # Individual project pages
├── practice/page.tsx   # Practice areas page
├── contact/page.tsx    # Contact information
└── globals.css         # Global styles and Tailwind

components/
├── Header.tsx          # Fixed header with navigation
├── Footer.tsx          # Simple footer
├── Container.tsx       # Layout container with responsive padding
├── ProjectCard.tsx     # Project card component
└── SectionHeading.tsx  # Consistent section headings

data/
├── projects.ts         # Project data and types
└── press.ts           # Press coverage data
```

## Pages

- **Home** (`/`): Large hero with recent projects grid
- **Studio** (`/studio`): About section, client list, and press coverage
- **Work** (`/work`): Grid of all projects
- **Project Detail** (`/work/[slug]`): Individual project pages with navigation
- **Practice** (`/practice`): Three practice areas with detailed descriptions
- **Contact** (`/contact`): Contact information organized by category

## Design System

### Typography
- **H1**: text-5xl md:text-7xl font-medium
- **H2**: text-2xl md:text-3xl with tracking-wide
- **Labels**: uppercase with tracking-[.15em] or tracking-[.2em]
- **Body**: leading-relaxed for comfortable reading

### Colors
- Primary text: text-black
- Secondary text: text-neutral-600
- Muted text: text-neutral-400
- Borders: border-neutral-200
- Backgrounds: bg-white with hover:bg-neutral-50

### Layout
- Container: max-w-screen-lg with responsive padding
- Spacing: Consistent use of Tailwind spacing scale
- Grid: 1 column on mobile, 2 columns on md+ for project grids

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```

## License

All rights reserved © Alexander May Studio MMXXV.
