# Public Images Folder

This folder contains static images for the Alexander May portfolio site.

## Structure

- `/public/images/` - Main images directory
- `/public/images/projects/` - Project-specific images
- `/public/images/hero/` - Hero/banner images
- `/public/images/studio/` - Studio-related images

## Usage

Images placed in the public folder can be referenced directly in your components:

```jsx
// For an image at /public/images/hero/main.jpg
<img src="/images/hero/main.jpg" alt="Description" />

// Or with Next.js Image component
import Image from 'next/image'
<Image src="/images/projects/project-name.jpg" alt="Project" width={800} height={600} />
```

## File Naming Convention

- Use lowercase
- Use hyphens for spaces
- Include descriptive names
- Consider including dimensions for different breakpoints

Examples:
- `hero-main-desktop.jpg`
- `project-nordic-knot-hero.jpg`
- `studio-team-photo.jpg`
