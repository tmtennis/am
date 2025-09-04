'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Container from './Container';

const navigation = [
  { name: 'Studio', href: '/studio' },
  { name: 'Work', href: '/work' },
  { name: 'Practice', href: '/practice' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down & past initial scroll threshold
        setIsVisible(false);
        setMobileMenuOpen(false); // Close mobile menu when header hides
      } else {
        // Scrolling up or at top
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar, { passive: true });
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 border-b border-neutral-700 h-16 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`} 
      style={{ backgroundColor: '#1a1919' }}
    >
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="font-extrabold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            ALEXANDER MAY
          </Link>
          
          <div className="flex items-center space-x-8">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm transition-colors duration-150 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                    pathname === item.href 
                      ? 'text-white' 
                      : 'text-neutral-400'
                  }`}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* SIZED Brand */}
            <div className="hidden md:block font-extrabold text-white text-sm">
              SIZED
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden text-sm text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              Menu
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && isVisible && (
          <nav 
            id="mobile-menu"
            className="md:hidden py-4 border-t border-neutral-700"
            style={{ backgroundColor: '#1a1919' }}
          >
            <div className="space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block text-sm transition-colors duration-150 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                    pathname === item.href 
                      ? 'text-white' 
                      : 'text-neutral-400'
                  }`}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-neutral-700">
                <div className="font-extrabold text-white text-sm">
                  SIZED
                </div>
              </div>
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}
