'use client';

import { useEffect, useState } from 'react';

interface ScrollFadeMapProps {
  children: React.ReactNode;
}

export default function ScrollFadeMap({ children }: ScrollFadeMapProps) {
  const [scrollY, setScrollY] = useState(0);
  const [mapOpacity, setMapOpacity] = useState(0.05); // Starting opacity (opacity-5 = 0.05)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Calculate opacity based on scroll position
      // Fade out over the first 300px of scroll
      const fadeDistance = 300;
      const newOpacity = Math.max(0, 0.05 - (currentScrollY / fadeDistance) * 0.05);
      setMapOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Set initial scroll position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Map overlay background with scroll-based fade */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300 ease-out"
        style={{
          backgroundImage: 'url(/images/studio/map.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: mapOpacity
        }}
      />
      
      {/* Content */}
      {children}
    </div>
  );
}
